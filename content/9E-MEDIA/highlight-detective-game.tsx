    // Render results screen
    const renderResultsScreen = () => {
      if (!gameStats) return <div>No game statistics available</div>;
      
      return (
        <div className="space-y-6">
          <div className="bg-secondary/20 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Game Complete!</h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">{score} Points</p>
            
            <div className="flex justify-center space-x-8 mb-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-xl font-bold">{gameStats.accuracy.toFixed(1)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Correct</p>
                <p className="text-xl font-bold">{gameStats.correctAnswers}/{gameStats.totalAnswers}</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => setGameState('setup')}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </div>
      );
    };
    
    // Render game content based on state
    const renderGameContent = () => {
      switch(gameState) {
        case 'setup':
          return renderSetupScreen();
        case 'tutorial':
          return renderTutorialScreen();
        case 'playing':
          return renderGameplayScreen();
        case 'results':
          return renderResultsScreen();
        default:
          return renderSetupScreen();
      }
    };
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            <FileText className="w-6 h-6" />
            <span>Highlight Detective</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {renderGameContent()}
        </CardContent>
        
        <AlertDialog open={showFeedback}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                {feedbackData?.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                )}
                {feedbackData?.isCorrect ? 'Correct!' : 'Incorrect!'}
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                {!feedbackData?.isCorrect && feedbackData?.item && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      <p>What you saw:</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded text-sm">
                      {feedbackData.item.text}
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <p>The original highlight:</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded text-sm">
                      {feedbackData.item.originalText || feedbackData.item.text}
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Points earned:</span>
                    <span className="font-bold">{feedbackData?.pointsEarned || 0}</span>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={nextItem} className="w-full">
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    );
  };
  
  if (showGame) {
    return <HighlightDetective userHighlights={processedHighlights} />;
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2">
          <MessageSquare className="w-6 h-6" />
          <span>Highlight Detective</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/20 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Welcome to Highlight Detective!</h3>
          <p className="mb-4">
            Test your knowledge of book and podcast highlights by identifying which are real and which are cleverly disguised imposters.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="highlights">Paste Your Highlights (Optional)</Label>
            <Textarea
              id="highlights"
              placeholder="Paste your highlights here, one per line..."
              className="h-40"
              value={inputHighlights}
              onChange={(e) => setInputHighlights(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Leave blank to use sample highlights for demonstration.
            </p>
          </div>
        </div>
        
        <Button onClick={processInput} className="w-full">
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
};

export default HighlightDetectiveGame;    // Render tutorial screen
    const renderTutorialScreen = () => (
      <div className="space-y-6">
        <div className="bg-secondary/20 p-4 rounded-lg">
          <h3 className="text-lg font-bold flex items-center mb-2">
            <BookOpen className="w-5 h-5 mr-2" />
            How to Play Highlight Detective
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Game Objective</h4>
              <p>Distinguish between real highlights from your content and carefully crafted imposters. Test your knowledge and develop critical reading skills.</p>
            </div>
            
            <div>
              <h4 className="font-medium">Gameplay</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>You'll be shown highlights one at a time</li>
                <li>For each highlight, decide if it's "Real" or "Fake"</li>
                <li>Set your confidence level (1x-3x) to multiply points</li>
                <li>Maintain a streak of correct answers for bonus points</li>
                <li>Review feedback after each answer to improve</li>
              </ul>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" onClick={() => setGameState('setup')}>
                Back to Setup
              </Button>
              <Button onClick={startGame}>
                Start Game
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
    
    // Render setup screen
    const renderSetupScreen = () => (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="novice">Novice (Obvious fakes)</SelectItem>
              <SelectItem value="adept">Adept (Moderate changes)</SelectItem>
              <SelectItem value="expert">Expert (Subtle modifications)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gameMode">Game Mode</Label>
          <Select value={gameMode} onValueChange={setGameMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select game mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic Mode</SelectItem>
              <SelectItem value="speed">Speed Round</SelectItem>
              <SelectItem value="expert">Expert Challenge</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={() => setGameState('tutorial')} className="w-full">
          View Tutorial
        </Button>
        
        <Button onClick={startGame} className="w-full">
          Start Game
        </Button>
      </div>
    );
    
    // Render gameplay screen
    const renderGameplayScreen = () => {
      if (!gameItems.length || currentIndex >= gameItems.length) {
        return <div>No game items available</div>;
      }

      const currentItem = gameItems[currentIndex];
      const isSpeedMode = gameMode === 'speed';
      
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-2 py-1">
                {currentIndex + 1}/{gameItems.length}
              </Badge>
              <Badge variant="outline" className="px-2 py-1 bg-blue-100">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{score}</span>
              </div>
            </div>
          </div>
          
          <Card className="border-2 border-secondary/50">
            <CardContent className="pt-6">
              <div className="flex items-start mb-2">
                <BookMarked className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                <span className="text-sm text-muted-foreground">{currentItem.source}</span>
              </div>
              <p className="text-lg leading-relaxed">{currentItem.text}</p>
            </CardContent>
          </Card>
          
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Confidence Level (Multiplies Points)
            </h3>
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3].map((level) => (
                <Button
                  key={level}
                  variant={confidenceLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setConfidenceLevel(level)}
                  className="flex-1"
                >
                  {level}x
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="bg-green-100 hover:bg-green-200 py-8"
                onClick={() => handleAnswer(true)}
              >
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-6 h-6 mb-2 text-green-600" />
                  <span className="text-lg font-medium">Real</span>
                  <span className="text-xs text-green-800">Authentic Highlight</span>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-red-100 hover:bg-red-200 py-8"
                onClick={() => handleAnswer(false)}
              >
                <div className="flex flex-col items-center">
                  <AlertTriangle className="w-6 h-6 mb-2 text-red-600" />
                  <span className="text-lg font-medium">Fake</span>
                  <span className="text-xs text-red-800">Generated Imposter</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      );
    };
// Main component for Highlight Detective Game
const HighlightDetectiveGame = ({ highlights = [] }) => {
  const [inputHighlights, setInputHighlights] = useState('');
  const [processedHighlights, setProcessedHighlights] = useState([]);
  const [showGame, setShowGame] = useState(false);
  
  // Process input highlights or use sample data
  const processInput = () => {
    if (highlights.length > 0) {
      setProcessedHighlights(highlights);
    } else if (inputHighlights.trim()) {
      // Parse from text input
      const lines = inputHighlights.split('\n').filter(line => line.trim().length > 0);
      
      const parsedHighlights = lines.map((line, index) => ({
        id: `input-${index}`,
        text: line.trim(),
        source: 'User Input'
      }));
      
      setProcessedHighlights(parsedHighlights);
    } else {
      // Use sample data
      setProcessedHighlights(sampleHighlights);
    }
    setShowGame(true);
  };
  
  // Game component with game mechanics
  const HighlightDetective = ({ userHighlights = [] }) => {
    // Game configuration state
    const [gameState, setGameState] = useState('setup');
    const [difficulty, setDifficulty] = useState('novice');
    const [gameMode, setGameMode] = useState('classic');
    const [highlightInput, setHighlightInput] = useState('');
    
    // Game progress state
    const [gameItems, setGameItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [confidenceLevel, setConfidenceLevel] = useState(1);
    const [answers, setAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackData, setFeedbackData] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [answerTime, setAnswerTime] = useState(0);
    
    // Prepare game items when starting
    const startGame = () => {
      const highlights = userHighlights.length > 0 ? userHighlights : [];
      if (highlights.length < 3) {
        alert('Please provide at least 3 highlights to start the game.');
        return;
      }
      
      const items = processHighlights(highlights, difficulty);
      if (items.length < 4) {
        alert('Could not generate enough game items. Please provide more highlights.');
        return;
      }
      
      setGameItems(items);
      setCurrentIndex(0);
      setScore(0);
      setStreak(0);
      setAnswers({});
      setStartTime(Date.now());
      setGameState('playing');
    };
    
    // Handle player answer
    const handleAnswer = (isRealGuess) => {
      const currentItem = gameItems[currentIndex];
      const isCorrect = currentItem.isReal === isRealGuess;
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000; // in seconds
      setAnswerTime(timeElapsed);
      
      // Calculate score
      let pointsEarned = 0;
      if (isCorrect) {
        // Base points
        pointsEarned = 10;
        
        // Streak bonus
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak >= 3) {
          pointsEarned += Math.floor(newStreak / 3) * 2;
        }
        
        // Confidence multiplier
        pointsEarned *= confidenceLevel;
        
        // Time bonus for quick answers (max 5 points)
        if (gameMode === 'speed' && timeElapsed < 5) {
          pointsEarned += Math.max(0, 5 - Math.floor(timeElapsed));
        }
      } else {
        // Reset streak on incorrect answers
        setStreak(0);
        
        // In expert mode, you lose points for wrong answers proportional to confidence
        if (gameMode === 'expert') {
          pointsEarned = -5 * confidenceLevel;
        }
      }
      
      // Update score
      setScore(prevScore => prevScore + pointsEarned);
      
      // Save answer
      setAnswers(prev => ({
        ...prev,
        [currentItem.id]: {
          isCorrect,
          points: pointsEarned,
          confidence: confidenceLevel,
          time: timeElapsed
        }
      }));
      
      // Show feedback
      setFeedbackData({
        item: currentItem,
        isCorrect,
        pointsEarned,
        timeTaken: timeElapsed
      });
      setShowFeedback(true);
    };
    
    // Move to next item after feedback
    const nextItem = () => {
      setShowFeedback(false);
      
      if (currentIndex < gameItems.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setConfidenceLevel(1);
        setStartTime(Date.now());
      } else {
        // End of game
        setGameState('results');
      }
    };
    
    // Game statistics for results screen
    const gameStats = useMemo(() => {
      if (answers && Object.keys(answers).length) {
        const totalAnswers = Object.keys(answers).length;
        const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
        const accuracy = (correctAnswers / totalAnswers) * 100;
        
        // Average response time
        const avgTime = Object.values(answers).reduce((sum, a) => sum + a.time, 0) / totalAnswers;
        
        // Performance by confidence level
        const confidenceLevels = {1: {correct: 0, total: 0}, 2: {correct: 0, total: 0}, 3: {correct: 0, total: 0}};
        Object.values(answers).forEach(a => {
          confidenceLevels[a.confidence].total++;
          if (a.isCorrect) confidenceLevels[a.confidence].correct++;
        });
        
        return {
          totalAnswers,
          correctAnswers,
          accuracy,
          avgTime,
          confidenceLevels
        };
      }
      return null;
    }, [answers]);
// Process highlights and generate fake versions
const processHighlights = (highlights, difficulty) => {
  // Generate fake highlights
  const fakeHighlights = highlights.map(highlight => {
    return {
      ...highlight,
      ...generateFakeHighlight(highlight.text, difficulty)
    };
  });
  
  // Keep only the successfully modified fakes that are actually different
  const validFakes = fakeHighlights.filter(
    fake => !fake.isReal && fake.text !== fake.originalText
  );
  
  // Create the game items by combining real highlights and valid fakes
  const realItems = highlights.map(highlight => ({
    ...highlight,
    isReal: true
  }));
  
  // Create a balanced set of real and fake items
  const numItemsToInclude = Math.min(realItems.length, validFakes.length);
  const selectedReal = shuffleArray(realItems).slice(0, numItemsToInclude);
  const selectedFake = shuffleArray(validFakes).slice(0, numItemsToInclude);
  
  // Combine and shuffle for final game set
  const gameItems = shuffleArray([...selectedReal, ...selectedFake]);
  
  return gameItems;
};import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, AlertTriangle, CheckCircle, XCircle, 
  Award, Clock, Zap, RotateCcw, Star, 
  TrendingUp, BookMarked, MessageSquare, FileText
} from 'lucide-react';

// Sample data for demonstration purposes
const sampleHighlights = [
  {
    id: '1',
    text: 'The most efficient way to develop self-control is to practice habits that strengthen your willpower.',
    source: 'Atomic Habits'
  },
  {
    id: '2',
    text: 'Motivation comes and goes, but habits create systems that make change sustainable over the long term.',
    source: 'Atomic Habits'
  },
  {
    id: '3',
    text: 'Success is not just what you know, but how quickly you can adapt to what you don't know.',
    source: 'Principles'
  },
  {
    id: '4',
    text: 'Reflection turns experience into insight. It's the process by which we make sense of what we've learned.',
    source: 'The 15 Invaluable Laws of Growth'
  },
  {
    id: '5',
    text: 'Your level of success will rarely exceed your level of personal development.',
    source: 'The 15 Invaluable Laws of Growth'
  }
];

// Utility Functions
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get opposite or significantly different word
const getOppositeWord = (word) => {
  const opposites = {
    'good': 'bad',
    'bad': 'good',
    'high': 'low',
    'low': 'high',
    'large': 'small',
    'small': 'large',
    'increase': 'decrease',
    'decrease': 'increase',
    'positive': 'negative',
    'negative': 'positive',
    'always': 'never',
    'never': 'always',
    'everything': 'nothing',
    'nothing': 'everything',
    'everyone': 'no one',
    'important': 'trivial',
    'trivial': 'crucial',
    'true': 'false',
    'false': 'true',
    'right': 'wrong',
    'wrong': 'right',
    'correct': 'incorrect',
    'accurate': 'inaccurate',
    'precise': 'vague',
    'clear': 'unclear',
    'difficult': 'easy',
    'easy': 'difficult',
    'simple': 'complex',
    'complex': 'simple',
    'fast': 'slow',
    'slow': 'fast',
    'early': 'late',
    'late': 'early',
    'strong': 'weak',
    'weak': 'strong',
    'more': 'less',
    'less': 'more',
    'better': 'worse',
    'worse': 'better',
    'best': 'worst',
    'worst': 'best'
  };

  const lowerWord = word.toLowerCase();
  if (opposites[lowerWord]) {
    // Preserve capitalization
    if (word[0] === word[0].toUpperCase()) {
      return opposites[lowerWord].charAt(0).toUpperCase() + opposites[lowerWord].slice(1);
    }
    return opposites[lowerWord];
  }
  
  // If no direct opposite, try subtle changes
  if (word.length > 5) {
    // Create a slightly modified version (change a character)
    const charToChange = Math.floor(word.length / 2);
    return word.substring(0, charToChange) + 
           String.fromCharCode(word.charCodeAt(charToChange) + 1) + 
           word.substring(charToChange + 1);
  }
  
  return word;
};

// Generate fake highlights at different difficulty levels
const generateFakeHighlight = (originalText, difficulty) => {
  // Tokenize the text for manipulation
  const words = originalText.split(' ');
  const sentences = originalText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  let fakeText = '';
  
  // Skip very short highlights
  if (words.length < 3) {
    return {
      text: originalText,
      isReal: true
    };
  }
  
  switch(difficulty) {
    // Novice: Obvious changes - word replacements, opposites
    case 'novice':
      if (words.length > 5) {
        // Replace 20-30% of words with alternatives
        const wordsToChange = Math.max(2, Math.floor(words.length * 0.25));
        const indicesToChange = new Set();
        
        while (indicesToChange.size < wordsToChange) {
          const randomIndex = Math.floor(Math.random() * words.length);
          if (words[randomIndex].length > 3) { // Only change substantial words
            indicesToChange.add(randomIndex);
          }
        
        modifiedText = words.join(' ');
      }
      
      fakeText = modifiedText;
      break;
      
    default:
      // Default to moderate changes
      fakeText = originalText.split(' ').reverse().join(' ');
  }
  
  // Ensure the fake is actually different
  if (fakeText === originalText) {
    if (difficulty === 'expert') {
      // For expert level, make a minimal change to a single important word
      const words = originalText.split(' ');
      const importantWordIndex = words.findIndex(word => word.length > 5);
      if (importantWordIndex !== -1) {
        words[importantWordIndex] = getOppositeWord(words[importantWordIndex]);
      } else {
        // Add or remove a word
        const insertionPoint = Math.floor(words.length / 2);
        if (Math.random() > 0.5) {
          words.splice(insertionPoint, 0, 'not');
        } else {
          words.splice(insertionPoint, 1);
        }
      }
      fakeText = words.join(' ');
    } else {
      // For other levels, make more obvious changes
      fakeText = `The opposite is true: ${originalText}`;
    }
  }
  
  return {
    text: fakeText,
    isReal: false,
    originalText
  };
};        }
        
        const modifiedWords = words.map((word, index) => {
          if (indicesToChange.has(index)) {
            // Simple word replacements
            if (word.toLowerCase() === 'good') return 'bad';
            if (word.toLowerCase() === 'bad') return 'good';
            if (word.toLowerCase() === 'large') return 'small';
            if (word.toLowerCase() === 'small') return 'large';
            if (word.toLowerCase() === 'always') return 'never';
            if (word.toLowerCase() === 'never') return 'always';
            if (word.toLowerCase() === 'important') return 'trivial';
            
            // For other words, just change a letter or reverse it for obvious fakes
            if (Math.random() > 0.5 && word.length > 4) {
              return word.split('').reverse().join('');
            } else {
              return word.charAt(0) + '*' + word.substring(2);
            }
          }
          return word;
        });
        
        fakeText = modifiedWords.join(' ');
      } else {
        // For very short highlights, just reverse the whole thing
        fakeText = words.reverse().join(' ');
      }
      break;
      
    // Adept: Moderate changes - sentence restructuring, concept alterations
    case 'adept':
      if (sentences.length > 1) {
        // Reorder or modify sentences
        const modifiedSentences = sentences.map(sentence => {
          if (Math.random() > 0.5) {
            // Reorder words in the sentence
            const sentenceWords = sentence.trim().split(' ');
            if (sentenceWords.length > 3) {
              const midPoint = Math.floor(sentenceWords.length / 2);
              const firstHalf = sentenceWords.slice(0, midPoint);
              const secondHalf = sentenceWords.slice(midPoint);
              return [...secondHalf, ...firstHalf].join(' ');
            }
          }
          return sentence;
        });
        
        // Possibly change the order of sentences
        if (sentences.length > 2 && Math.random() > 0.5) {
          const firstSentence = modifiedSentences[0];
          modifiedSentences[0] = modifiedSentences[modifiedSentences.length - 1];
          modifiedSentences[modifiedSentences.length - 1] = firstSentence;
        }
        
        fakeText = modifiedSentences.join('. ') + '.';
      } else {
        // For single sentences, change the meaning more substantially
        const sentenceWords = sentences[0].trim().split(' ');
        
        // Insert or remove negations
        if (sentenceWords.includes('not') || sentenceWords.includes("don't") || sentenceWords.includes("doesn't")) {
          // Remove negation
          fakeText = sentences[0].replace(/\bnot\b|\bdon't\b|\bdoesn't\b/g, '');
        } else {
          // Add negation
          const verbPositions = sentenceWords.findIndex(word => 
            word.endsWith('s') || word === 'is' || word === 'are' || word === 'was' || word === 'were'
          );
          
          if (verbPositions !== -1 && verbPositions < sentenceWords.length - 1) {
            sentenceWords.splice(verbPositions + 1, 0, 'not');
            fakeText = sentenceWords.join(' ');
          } else {
            // If no clear verb, just swap a key term
            const wordsToChange = Math.max(1, Math.floor(sentenceWords.length * 0.2));
            for (let i = 0; i < wordsToChange; i++) {
              const randomIndex = Math.floor(Math.random() * sentenceWords.length);
              if (sentenceWords[randomIndex].length > 3) {
                sentenceWords[randomIndex] = getOppositeWord(sentenceWords[randomIndex]);
              }
            }
            fakeText = sentenceWords.join(' ');
          }
        }
      }
      break;
      
    // Expert: Subtle changes - nuanced meaning shifts, style preservation
    case 'expert':
      // Create subtle but meaningful changes
      // 1. Substitute similar but not identical concepts
      // 2. Change qualifiers (some/all, often/always)
      // 3. Shift emphasis while keeping main points
      
      const qualifierReplacements = {
        'all': 'most',
        'every': 'many',
        'always': 'usually',
        'never': 'rarely',
        'none': 'few',
        'must': 'should',
        'will': 'may',
        'certainly': 'probably',
        'definitely': 'likely',
        'completely': 'largely',
        'entirely': 'mostly',
        'exactly': 'approximately',
        'absolutely': 'generally'
      };
      
      // Look for qualifiers to replace
      let modifiedText = originalText;
      Object.keys(qualifierReplacements).forEach(qualifier => {
        const regex = new RegExp(`\\b${qualifier}\\b`, 'gi');
        if (regex.test(modifiedText)) {
          modifiedText = modifiedText.replace(regex, qualifierReplacements[qualifier]);
        }
      });
      
      // If no qualifiers were replaced, make a more subtle change
      if (modifiedText === originalText) {
        // Identify a key phrase and modify it slightly
        const words = originalText.split(' ');
        const phrasesToModify = Math.max(1, Math.floor(words.length * 0.15));
        let wordsChanged = 0;
        
        for (let i = 0; i < words.length && wordsChanged < phrasesToModify; i++) {
          if (words[i].length > 4 && !/^\d+$/.test(words[i]) && Math.random() > 0.7) {
            // Subtle word changes that preserve appearance but change meaning
            const subtleChanges = {
              'increase': 'decrease',
              'positive': 'negative',
              'beneficial': 'detrimental',
              'advantage': 'disadvantage',
              'success': 'failure',
              'effective': 'ineffective',
              'improve': 'impair',
              'enhance': 'diminish',
              'support': 'oppose',
              'confirm': 'contradict',
              'significant': 'insignificant',
              'important': 'unimportant',
              'remember': 'forget',
              'include': 'exclude',
              'enable': 'disable',
              'encourage': 'discourage'
            };
            
            const lowerWord = words[i].toLowerCase();
            if (subtleChanges[lowerWord]) {
              words[i] = subtleChanges[lowerWord];
              wordsChanged++;
            }
          }
        