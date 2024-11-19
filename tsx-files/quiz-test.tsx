import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const questions = [
  {
    question: "What does the book suggest is crucial for creating space to reason in our thoughts, feelings, and actions?",
    options: [
      "Emotional intelligence",
      "Clear thinking",
      "Social conformity",
      "Cognitive dissonance"
    ],
    correctAnswer: 1,
    explanation: "The book emphasizes that clear thinking is crucial for creating space to reason in our thoughts, feelings, and actions."
  },
  {
    question: "According to the author, which of the following is NOT one of the behavioral \"defaults\" discussed in the book?",
    options: [
      "The emotion default",
      "The ego default",
      "The social default",
      "The innovation default"
    ],
    correctAnswer: 3,
    explanation: "The book discusses the emotion default, ego default, social default, and inertia default. The innovation default is not mentioned as one of the behavioral defaults."
  },
  {
    question: "What does the book suggest is often mistaken for discipline when forming or breaking habits?",
    options: [
      "Willpower",
      "A carefully created environment",
      "Social pressure",
      "Self-confidence"
    ],
    correctAnswer: 1,
    explanation: "The book suggests that a carefully created environment is often mistaken for discipline when forming or breaking habits."
  },
  {
    question: "Which of the following is described as the strength of realizing that you control how you respond to everything, even if you don't control everything?",
    options: [
      "Self-knowledge",
      "Self-control",
      "Self-accountability",
      "Self-confidence"
    ],
    correctAnswer: 2,
    explanation: "Self-accountability is described as the strength of realizing that you control how you respond to everything, even if you don't control everything."
  },
  {
    question: "What does the author suggest is more important than the size of what you know?",
    options: [
      "The speed at which you learn",
      "Your ability to apply knowledge",
      "Having a sense of your knowledge's boundaries",
      "The diversity of your knowledge"
    ],
    correctAnswer: 2,
    explanation: "The author suggests that having a sense of your knowledge's boundaries is more important than the size of what you know."
  },
  {
    question: "According to the book, what empowers resilience in the aftermath of negative feedback?",
    options: [
      "Self-control",
      "Self-confidence",
      "Self-knowledge",
      "Self-accountability"
    ],
    correctAnswer: 1,
    explanation: "The book states that self-confidence empowers resilience in the aftermath of negative feedback."
  },
  {
    question: "What does the author suggest is a key factor in maintaining a good position for decision-making?",
    options: [
      "Always being right",
      "Avoiding difficult situations",
      "Constantly seeking others' approval",
      "Rarely being forced into decisions by circumstances"
    ],
    correctAnswer: 3,
    explanation: "The author suggests that rarely being forced into decisions by circumstances is a key factor in maintaining a good position for decision-making."
  },
  {
    question: "What does the book identify as a common mistake people make when dealing with the world?",
    options: [
      "Being too adaptable",
      "Bargaining with how the world should work instead of accepting how it does work",
      "Focusing too much on self-improvement",
      "Ignoring social norms"
    ],
    correctAnswer: 1,
    explanation: "The book identifies bargaining with how the world should work instead of accepting how it does work as a common mistake people make."
  },
  {
    question: "According to the author, what is often the real test of a person?",
    options: [
      "Their intelligence quotient",
      "Their social status",
      "Their willingness to nonconform to do the right thing",
      "Their ability to always avoid mistakes"
    ],
    correctAnswer: 2,
    explanation: "According to the author, a person's willingness to nonconform to do the right thing is often the real test of their character."
  },
  {
    question: "What does the book suggest is one of the most effective ways to raise your standards?",
    options: [
      "Setting unrealistic goals",
      "Constantly comparing yourself to others",
      "Working directly with a master in your field",
      "Focusing solely on your strengths"
    ],
    correctAnswer: 2,
    explanation: "The book suggests that working directly with a master in your field is one of the most effective ways to raise your standards."
  }
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ClearThinkingQuizGame = () => {
  const [gameState, setGameState] = useState('lobby');
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [cumulativeScores, setCumulativeScores] = useState({});
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerDuration, setTimerDuration] = useState(20);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [questionDistribution, setQuestionDistribution] = useState([]);

  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing' && !showPopup && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleAnswer(-1);
    }
  }, [timeLeft, gameState, showPopup, showExplanation]);

  const startGame = () => {
    if (players.length === 0) return;
    const shuffled = shuffleArray([...questions]);
    setShuffledQuestions(shuffled);
    
    // Create question distribution
    const distribution = shuffled.map((_, index) => ({
      questionIndex: index,
      playerIndex: index % players.length
    }));
    setQuestionDistribution(distribution);

    setScores(Object.fromEntries(players.map(player => [player, 0])));
    setGameState('playing');
    setTimeLeft(timerDuration);
    setCurrentQuestion(0);
    setCurrentPlayerIndex(0);
  };

  const handleAnswer = useCallback((selectedAnswer) => {
    const currentPlayer = players[currentPlayerIndex];
    const correct = selectedAnswer === shuffledQuestions[currentQuestion].correctAnswer;
    const pointsChange = correct ? 1 : -1;

    setScores(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + pointsChange
    }));

    setCumulativeScores(prev => ({
      ...prev,
      [currentPlayer]: (prev[currentPlayer] || 0) + pointsChange
    }));
    
    setPopupMessage(correct ? 'Correct!' : 'Incorrect. The correct answer was: ' + 
      shuffledQuestions[currentQuestion].options[shuffledQuestions[currentQuestion].correctAnswer]);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setShowExplanation(true);
    }, 2000);
  }, [currentPlayerIndex, currentQuestion, players, shuffledQuestions]);

  const nextTurn = useCallback(() => {
    setShowExplanation(false);
    if (currentQuestion === shuffledQuestions.length - 1) {
      setGameState('ended');
    } else {
      const nextQuestionIndex = currentQuestion + 1;
      const nextQuestion = questionDistribution[nextQuestionIndex];
      setCurrentQuestion(nextQuestionIndex);
      setCurrentPlayerIndex(nextQuestion.playerIndex);
      setTimeLeft(timerDuration);
    }
  }, [currentQuestion, questionDistribution, shuffledQuestions.length, timerDuration]);

  const resetGame = () => {
    setGameState('lobby');
    setPlayers([]);
    setCurrentQuestion(0);
    setScores({});
    setTimeLeft(timerDuration);
    setShuffledQuestions([]);
    setCurrentPlayerIndex(0);
    setQuestionDistribution([]);
  };

  const addPlayer = () => {
    if (playerName && !players.includes(playerName)) {
      setPlayers(prev => [...prev, playerName]);
      setPlayerName('');
    }
  };

  const renderExplanation = () => {
    const currentQ = shuffledQuestions[currentQuestion];
    return (
      <div className="mt-4">
        <h3 className="font-bold">Explanation:</h3>
        <p>{currentQ.explanation}</p>
        <Button onClick={nextTurn} className="mt-2">Next Question</Button>
      </div>
    );
  };

  const Scoreboard = ({ scores, cumulative = false }) => {
    const sortedScores = Object.entries(scores)
      .sort(([, a], [, b]) => b - a);
  
    return (
      <div className="mt-4">
        <h3 className="font-bold">{cumulative ? 'Cumulative Scoreboard' : 'Current Game Scores'}</h3>
        {sortedScores.map(([player, score], index) => (
          <p key={player}>
            {index + 1}. {player}: {score}
          </p>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-2xl font-bold text-center">
        Clear Thinking Quiz Game
      </CardHeader>
      <CardContent>
        {gameState === 'lobby' && (
          <>
            <div className="mb-4">
              <Label htmlFor="playerName">Player Name:</Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter player name"
              />
            </div>
            <Button onClick={addPlayer} className="w-full mb-2">
              Add Player
            </Button>
            <div className="mb-4">
              <Label htmlFor="timerDuration">Timer Duration (seconds):</Label>
              <Input
                id="timerDuration"
                type="number"
                value={timerDuration}
                onChange={(e) => setTimerDuration(Math.max(5, parseInt(e.target.value) || 20))}
                min="5"
              />
            </div>
            <Button onClick={startGame} className="w-full" disabled={players.length === 0}>
              Start Game
            </Button>
            <div className="mt-4">
              <h3 className="font-bold">Players:</h3>
              {players.map((player, index) => (
                <p key={index}>{player}</p>
              ))}
            </div>
          </>
        )}
        {gameState === 'playing' && shuffledQuestions.length > 0 && (
          <>
            <h2 className="text-xl mb-4">Question {currentQuestion + 1}</h2>
            <p className="mb-2 font-bold">Current Player: {players[currentPlayerIndex]}</p>
            <p className="mb-4">{shuffledQuestions[currentQuestion].question}</p>
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                className="w-full mb-2"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
            <Progress value={(timeLeft / timerDuration) * 100} className="mt-4" />
            <p className="mt-2">Time left: {timeLeft} seconds</p>
            {showExplanation && renderExplanation()}
            <Scoreboard scores={scores} />
            <Scoreboard scores={cumulativeScores} cumulative={true} />
          </>
        )}
        {gameState === 'ended' && (
          <div className="text-center">
            <h2 className="text-2xl mb-4">Game Over!</h2>
            <Scoreboard scores={scores} />
            <Scoreboard scores={cumulativeScores} cumulative={true} />
            <Button onClick={resetGame} className="mt-4">Play Again</Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        {gameState === 'playing' && (
          <>
            <p>Current Player: {players[currentPlayerIndex]}</p>
            <p>Question: {currentQuestion + 1}/{shuffledQuestions.length}</p>
          </>
        )}
      </CardFooter>

      <AlertDialog open={showPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{popupMessage.split('.')[0]}</AlertDialogTitle>
            <AlertDialogDescription>
              {popupMessage.split('.')[1]}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowPopup(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ClearThinkingQuizGame;