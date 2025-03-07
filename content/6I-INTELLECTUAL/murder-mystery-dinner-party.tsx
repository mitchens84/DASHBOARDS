import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { 
  Timer, Star, Trophy, RotateCcw, Users, Brain, 
  Award, Zap, Shield, User
} from 'lucide-react';

// Using a text input that doesn't require the Input component
const TextInput = ({ value, onChange, placeholder, maxLength, onKeyDown }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};

// Using a label that doesn't require the Label component
const TextLabel = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
};

// Utility function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Prepare question for display (shuffle options)
const prepareQuestion = (question) => {
  const options = question.options.map((text, index) => ({
    text,
    isCorrect: index === question.correctAnswer
  }));
  
  const shuffledOptions = shuffleArray(options);
  const correctAnswer = shuffledOptions.findIndex(option => option.isCorrect);
  
  return {
    ...question,
    shuffledOptions,
    correctAnswer
  };
};

const InteractivePubQuiz = ({ title = "Interactive Pub Quiz", questions = [], timePerQuestion = 15 }) => {
  // Game state
  const [gameState, setGameState] = useState('lobby');
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', explanation: '' });
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [streaks, setStreaks] = useState({});
  const [newPlayerName, setNewPlayerName] = useState('');
  const [powerUps, setPowerUps] = useState({});
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [questionPool, setQuestionPool] = useState(questions);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [timerDuration, setTimerDuration] = useState(timePerQuestion);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && !showFeedback) {
      handleAnswer(-1);
    }
  }, [timeLeft, gameState, showFeedback]);

  // Add player to the game
  const addPlayer = () => {
    if (newPlayerName.trim() && !players.includes(newPlayerName.trim())) {
      setPlayers(prev => [...prev, newPlayerName.trim()]);
      setScores(prev => ({ ...prev, [newPlayerName.trim()]: 0 }));
      setStreaks(prev => ({ ...prev, [newPlayerName.trim()]: 0 }));
      setPowerUps(prev => ({
        ...prev,
        [newPlayerName.trim()]: {
          timeBoost: 2,
          fiftyFifty: 1,
          hint: 2
        }
      }));
      setNewPlayerName('');
    }
  };

  // Start the game
  const startGame = () => {
    if (players.length === 0) return;
    
    // Prepare questions
    const prepared = questionPool.map(prepareQuestion);
    
    // Select 10 random questions or all if less than 10
    const selectedQuestions = shuffleArray(prepared).slice(0, Math.min(10, prepared.length));
    
    setShuffledQuestions(selectedQuestions);
    setAvailableQuestions(prepared.filter(q => !selectedQuestions.includes(q)));
    setGameState('playing');
    setTimeLeft(timerDuration);
    setCurrentQuestionIndex(0);
    setCurrentPlayerIndex(0);
    setShowLeaderboard(false);
  };

  // Handle player answer
  const handleAnswer = (selectedIndex) => {
    const currentPlayer = players[currentPlayerIndex];
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    
    // Update streak for current player
    const newStreaks = {
      ...streaks,
      [currentPlayer]: isCorrect ? streaks[currentPlayer] + 1 : 0
    };
    setStreaks(newStreaks);

    // Calculate points with streak bonus
    const streakBonus = Math.floor(newStreaks[currentPlayer] / 3) * 5;
    const pointsEarned = isCorrect ? 
      (10 + streakBonus) : 
      (selectedIndex === -1 ? 0 : -5);

    // Update scores
    setScores(prev => ({
      ...prev,
      [currentPlayer]: Math.max(0, prev[currentPlayer] + pointsEarned)
    }));

    // Set feedback
    setFeedback({
      message: isCorrect ? 'Correct!' : (selectedIndex === -1 ? 'Time\'s up!' : 'Incorrect!'),
      explanation: currentQuestion.explanation || 'No explanation available.',
      streakBonus: streakBonus,
      player: currentPlayer,
      correctAnswer: currentQuestion.shuffledOptions[currentQuestion.correctAnswer].text
    });
    setShowFeedback(true);
  };

  // Move to next question/player
  const nextTurn = () => {
    setShowFeedback(false);
    
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      setTimeLeft(timerDuration);
    } else {
      setShowLeaderboard(true);
      setGameState('completed');
    }
  };

  // Reset game to lobby
  const resetGame = () => {
    setGameState('lobby');
    setCurrentQuestionIndex(0);
    setCurrentPlayerIndex(0);
    setTimeLeft(timerDuration);
    setShowFeedback(false);
    setShuffledQuestions([]);
    
    // Keep player list but reset scores and streaks
    setScores(Object.fromEntries(players.map(player => [player, 0])));
    setStreaks(Object.fromEntries(players.map(player => [player, 0])));
    setPowerUps(Object.fromEntries(players.map(player => [
      player, 
      { timeBoost: 2, fiftyFifty: 1, hint: 2 }
    ])));
  };

  // Use a power-up
  const usePowerUp = (type) => {
    const currentPlayer = players[currentPlayerIndex];
    
    if (powerUps[currentPlayer][type] > 0) {
      setPowerUps(prev => ({
        ...prev,
        [currentPlayer]: {
          ...prev[currentPlayer],
          [type]: prev[currentPlayer][type] - 1
        }
      }));

      switch(type) {
        case 'timeBoost':
          setTimeLeft(prev => prev + 10);
          break;
        case 'fiftyFifty':
          // Filter out incorrect options but keep correct answer
          const currentQuestion = shuffledQuestions[currentQuestionIndex];
          const correctIndex = currentQuestion.correctAnswer;
          
          // Get an incorrect option to keep (different from correct answer)
          let incorrectToKeep;
          do {
            incorrectToKeep = Math.floor(Math.random() * 4);
          } while (incorrectToKeep === correctIndex);
          
          // Create new shuffled questions array with modified options
          const newQuestions = [...shuffledQuestions];
          const newOptions = newQuestions[currentQuestionIndex].shuffledOptions.map((option, idx) => {
            if (idx === correctIndex || idx === incorrectToKeep) {
              return option;
            }
            return { ...option, text: "---", isDisabled: true };
          });
          
          newQuestions[currentQuestionIndex] = {
            ...newQuestions[currentQuestionIndex],
            shuffledOptions: newOptions
          };
          
          setShuffledQuestions(newQuestions);
          break;
        case 'hint':
          // Show a hint based on the explanation
          const hint = "Hint: " + shuffledQuestions[currentQuestionIndex].explanation.split('.')[0] + ".";
          setFeedback({
            message: 'Hint Used',
            explanation: hint,
            player: currentPlayer
          });
          setShowFeedback(true);
          break;
        default:
          break;
      }
    }
  };

  // Get sorted leaderboard
  const getLeaderboard = () => {
    return Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([player, score], index) => ({
        player,
        score,
        streak: streaks[player],
        rank: index + 1
      }));
  };

  // Render game lobby
  const renderLobby = () => (
    <div className="space-y-6">
      <div className="bg-secondary/20 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5" />
          <h3 className="font-semibold">Players ({players.length})</h3>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <TextInput
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name"
              maxLength={15}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            />
            <Button 
              onClick={addPlayer}
              disabled={!newPlayerName.trim()}
            >
              Add Player
            </Button>
          </div>
          
          <div className="mb-4">
            <TextLabel htmlFor="timerDuration">Timer Duration (seconds):</TextLabel>
            <TextInput
              id="timerDuration"
              type="number"
              value={timerDuration}
              onChange={(e) => setTimerDuration(Math.max(5, parseInt(e.target.value) || 15))}
              placeholder="15"
              onKeyDown={() => {}}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {players.map((player, index) => (
              <div key={player} className="flex items-center space-x-2 bg-background p-2 rounded">
                <User className="w-4 h-4" />
                <span>{player}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button 
        onClick={startGame} 
        disabled={players.length === 0}
        className="w-full"
      >
        <Brain className="w-4 h-4 mr-2" />
        Start Quiz
      </Button>
    </div>
  );

  // Render current question
  const renderQuestion = () => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const currentPlayer = players[currentPlayerIndex];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{currentPlayer}'s Turn</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {scores[currentPlayer]}
            </span>
            {streaks[currentPlayer] >= 3 && (
              <span className="flex items-center text-orange-500">
                <Trophy className="w-4 h-4 mr-1" />
                {streaks[currentPlayer]}
              </span>
            )}
          </div>
        </div>

        <div className="bg-secondary/20 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Question {currentQuestionIndex + 1}/{shuffledQuestions.length}</h3>
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>
          
          <Progress value={(timeLeft / timerDuration) * 100} className="mb-4" />
          
          <p className="text-lg font-medium mb-4">{currentQuestion.text}</p>
          
          <div className="grid grid-cols-1 gap-2">
            {currentQuestion.shuffledOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant="secondary"
                className="h-auto py-3 px-4 text-left flex items-center justify-start"
                disabled={option.isDisabled}
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  {String.fromCharCode(65 + index)}
                </div>
                {option.text}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          {Object.entries(powerUps[currentPlayer]).map(([type, count]) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              disabled={count === 0}
              onClick={() => usePowerUp(type)}
              className="flex items-center"
            >
              {type === 'timeBoost' && <Timer className="w-4 h-4 mr-1" />}
              {type === 'fiftyFifty' && <Shield className="w-4 h-4 mr-1" />}
              {type === 'hint' && <Zap className="w-4 h-4 mr-1" />}
              {count}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // Render leaderboard
  const renderLeaderboard = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-center mb-4">Final Standings</h3>
      <div className="space-y-2">
        {getLeaderboard().map(({ player, score, streak, rank }) => (
          <div
            key={player}
            className={`flex items-center justify-between p-3 rounded-lg ${
              rank === 1 ? 'bg-yellow-500/10' : 'bg-secondary/20'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="font-medium">{rank}. {player}</span>
            </div>
            <div className="flex items-center space-x-4">
              {streak >= 3 && (
                <span className="flex items-center text-orange-500">
                  <Trophy className="w-4 h-4 mr-1" />
                  {streak}
                </span>
              )}
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {score}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Button onClick={resetGame} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2">
          <Brain className="w-6 h-6 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {gameState === 'lobby' && renderLobby()}
        {gameState === 'playing' && renderQuestion()}
        {gameState === 'completed' && renderLeaderboard()}
      </CardContent>

      <AlertDialog open={showFeedback}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={`flex items-center ${
              feedback.message === 'Correct!' ? 'text-green-500' : 
              feedback.message === 'Hint Used' ? 'text-blue-500' : 'text-red-500'
            }`}>
              {feedback.message}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {feedback.message === 'Incorrect!' && (
                <p className="mb-2">The correct answer was: {feedback.correctAnswer}</p>
              )}
              {feedback.explanation}
              {feedback.streakBonus > 0 && (
                <p className="mt-2 text-orange-500 flex items-center">
                  <Trophy className="w-4 h-4 mr-2" />
                  Streak bonus: +{feedback.streakBonus} points!
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={nextTurn}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

// Sample questions (can be replaced with custom content)
const sampleQuestions = [
  {
    text: "Which hook would you use to perform side effects in a React component?",
    options: [
      "useState",
      "useEffect",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 1,
    explanation: "useEffect is the React hook designed to handle side effects like data fetching, subscriptions, or manually changing the DOM."
  },
  {
    text: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "JavaScript Syntax",
      "Java Standard XML"
    ],
    correctAnswer: 0,
    explanation: "JSX stands for JavaScript XML. It's a syntax extension for JavaScript recommended by React for describing what the UI should look like."
  },
  {
    text: "Which of the following is NOT a React hook?",
    options: [
      "useEffect",
      "useState",
      "useHistory",
      "useComponent"
    ],
    correctAnswer: 3,
    explanation: "useComponent is not a standard React hook. The others (useEffect, useState, and useHistory from React Router) are valid hooks."
  },
  {
    text: "How do you conditionally render a component in React?",
    options: [
      "Using if-else statements inside JSX",
      "Using the conditional ? : operator",
      "Using && operator",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "In React, you can conditionally render elements using either the ternary operator (condition ? true : false) or the && operator (condition && element)."
  },
  {
    text: "Which method is used to update state in a class component?",
    options: [
      "this.state()",
      "this.setState()",
      "this.updateState()",
      "this.changeState()"
    ],
    correctAnswer: 1,
    explanation: "this.setState() is the correct method to update state in a React class component. Direct state mutation should be avoided."
  },
  {
    text: "What is the virtual DOM in React?",
    options: [
      "A direct copy of the real DOM",
      "A lightweight JavaScript representation of the DOM",
      "A browser-specific rendering engine",
      "A database for storing component state"
    ],
    correctAnswer: 1,
    explanation: "The virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to improve performance by minimizing direct DOM manipulations."
  },
  {
    text: "Which function allows you to render a React component?",
    options: [
      "ReactDOM.render()",
      "React.renderComponent()",
      "React.mount()",
      "ReactDOM.mount()"
    ],
    correctAnswer: 0,
    explanation: "ReactDOM.render() is the correct function to render a React component to the DOM. It takes the component to render and the DOM element to render it into."
  },
  {
    text: "What is the purpose of keys in React lists?",
    options: [
      "To style list items",
      "To uniquely identify elements",
      "To create references to list items",
      "To determine the order of elements"
    ],
    correctAnswer: 1,
    explanation: "Keys help React identify which items have changed, been added, or been removed. They should be unique among siblings to ensure proper rendering and updates."
  },
  {
    text: "Which lifecycle method is called after a component renders?",
    options: [
      "componentWillMount",
      "componentDidMount",
      "componentWillUpdate",
      "componentDidUpdate"
    ],
    correctAnswer: 1,
    explanation: "componentDidMount is called immediately after a component is mounted (inserted into the tree). It's often used for network requests or DOM initialization."
  },
  {
    text: "What tool can be used to create a React application?",
    options: [
      "create-react-app",
      "new-react-app",
      "initialize-react",
      "start-react"
    ],
    correctAnswer: 0,
    explanation: "create-react-app is a command-line utility that creates a new React project with a modern build setup with no configuration needed."
  }
];

// Main component
const PubQuizGame = ({ 
  title = "Interactive Pub Quiz",
  questions = sampleQuestions,
  timePerQuestion = 15
}) => {
  return (
    <InteractivePubQuiz 
      title={title} 
      questions={questions} 
      timePerQuestion={timePerQuestion} 
    />
  );
};

export default PubQuizGame;