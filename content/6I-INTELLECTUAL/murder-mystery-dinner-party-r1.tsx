import React, { useState, useEffect, useReducer, createContext, useContext, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
// Custom Input component since the actual UI component isn't available
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Custom Select components since the actual UI components aren't available
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Timer, Star, Trophy, RotateCcw, Users, Brain,
  Award, Zap, Shield, User, Crown, Settings, Play,
  Info, CheckCircle, XCircle, BookOpen, Heart, Sparkles,
  UserPlus, Clock, RadioTower, Lightbulb, AlertTriangle,
  Gauge, Music, Volume2, VolumeX, BookOpen as Book,
  BarChart, Menu, X, CheckCircle2, Layout
} from 'lucide-react';

// Custom Input component
const Input = ({ value, onChange, placeholder, maxLength, onKeyDown, id, type = 'text' }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};

// Custom Label component
const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );
};

// Custom Switch component
const Switch = ({ id, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${checked ? 'bg-primary' : 'bg-input'}`}
        onClick={() => onCheckedChange(!checked)}
      >
        <span
          className={`pointer-events-none block h-[20px] w-[20px] rounded-full bg-background shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </div>
    </div>
  );
};

// Custom SelectTrigger, SelectValue, SelectContent and SelectItem components
const SelectTrigger = ({ children, className = "", id }) => {
  return (
    <div id={id} className={`flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  );
};

const SelectValue = ({ placeholder, children }) => {
  return <div>{children || placeholder}</div>;
};

const Select = ({ value, onValueChange, children }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>
        {React.Children.map(children, child => {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child);
          }
          return null;
        })}
      </div>
      
      {open && (
        <div className="absolute mt-1 w-full z-10">
          <div className="rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            {React.Children.map(children, child => {
              if (child.type === SelectContent) {
                return React.cloneElement(child, {
                  value,
                  onValueChange: (val) => {
                    onValueChange(val);
                    setOpen(false);
                  }
                });
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SelectContent = ({ children, value, onValueChange }) => {
  return (
    <div className="w-full p-1">
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          selected: child.props.value === value,
          onClick: () => onValueChange(child.props.value)
        });
      })}
    </div>
  );
};

const SelectItem = ({ children, value, selected = false, onClick }) => {
  return (
    <div 
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none ${selected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
      onClick={onClick}
    >
      {children}
      {selected && (
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
    </div>
  );
};

// Game Context
const GameContext = createContext();

// Constants
const GAME_MODES = {
  CLASSIC: 'classic',
  TIME_ATTACK: 'timeAttack',
  TEAM: 'team'
};

const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  MIXED: 'mixed'
};

// Initial state for reducer
const initialGameState = {
  phase: 'lobby', // lobby, settings, playing, feedback, roundSummary, finalSummary
  players: [],
  teams: [],
  settings: {
    gameMode: GAME_MODES.CLASSIC,
    difficulty: DIFFICULTY_LEVELS.MIXED,
    categories: [],
    questionsPerRound: 10,
    timePerQuestion: 15,
    enablePowerUps: true,
    enableSounds: true,
    teamMode: false
  },
  questions: [],
  currentRound: 0,
  currentQuestionIndex: 0,
  currentPlayerIndex: 0,
  currentTeamIndex: 0,
  timeLeft: 15,
  scores: {},
  teamScores: {},
  streaks: {},
  powerUps: {},
  achievements: {},
  usedQuestions: [],
  selectedCategories: [],
  error: null,
  loading: false
};

// Game reducer for complex state management
function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'ADD_PLAYER':
      if (state.players.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        players: [...state.players, action.payload],
        scores: { ...state.scores, [action.payload]: 0 },
        streaks: { ...state.streaks, [action.payload]: 0 },
        powerUps: {
          ...state.powerUps,
          [action.payload]: {
            timeBoost: 2,
            fiftyFifty: 1,
            hint: 2,
            doublePoints: 1
          }
        },
        achievements: {
          ...state.achievements,
          [action.payload]: []
        }
      };
    case 'REMOVE_PLAYER':
      {
        const newPlayers = state.players.filter(p => p !== action.payload);
        const newScores = { ...state.scores };
        const newStreaks = { ...state.streaks };
        const newPowerUps = { ...state.powerUps };
        const newAchievements = { ...state.achievements };
        
        delete newScores[action.payload];
        delete newStreaks[action.payload];
        delete newPowerUps[action.payload];
        delete newAchievements[action.payload];
        
        return {
          ...state,
          players: newPlayers,
          scores: newScores,
          streaks: newStreaks,
          powerUps: newPowerUps,
          achievements: newAchievements
        };
      }
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
        timeLeft: action.payload.timePerQuestion || state.timeLeft
      };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'START_GAME':
      return {
        ...state,
        phase: 'playing',
        currentQuestionIndex: 0,
        currentPlayerIndex: 0,
        currentTeamIndex: 0,
        timeLeft: state.settings.timePerQuestion,
        usedQuestions: []
      };
    case 'NEXT_QUESTION':
      if (state.currentQuestionIndex >= state.questions.length - 1) {
        return { ...state, phase: 'finalSummary' };
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        currentPlayerIndex: state.settings.teamMode 
          ? state.currentPlayerIndex // In team mode, keep same player for whole round
          : (state.currentPlayerIndex + 1) % state.players.length,
        timeLeft: state.settings.timePerQuestion,
        phase: 'playing'
      };
    case 'NEXT_PLAYER':
      return {
        ...state,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
        timeLeft: state.settings.timePerQuestion
      };
    case 'NEXT_TEAM':
      return {
        ...state,
        currentTeamIndex: (state.currentTeamIndex + 1) % state.teams.length,
        timeLeft: state.settings.timePerQuestion
      };
    case 'UPDATE_SCORE':
      {
        const { player, points } = action.payload;
        return {
          ...state,
          scores: {
            ...state.scores,
            [player]: Math.max(0, state.scores[player] + points)
          }
        };
      }
    case 'UPDATE_STREAK':
      {
        const { player, correct } = action.payload;
        return {
          ...state,
          streaks: {
            ...state.streaks,
            [player]: correct ? state.streaks[player] + 1 : 0
          }
        };
      }
    case 'USE_POWERUP':
      {
        const { player, type } = action.payload;
        return {
          ...state,
          powerUps: {
            ...state.powerUps,
            [player]: {
              ...state.powerUps[player],
              [type]: state.powerUps[player][type] - 1
            }
          }
        };
      }
    case 'ADD_ACHIEVEMENT':
      {
        const { player, achievement } = action.payload;
        if (state.achievements[player].includes(achievement)) {
          return state;
        }
        return {
          ...state,
          achievements: {
            ...state.achievements,
            [player]: [...state.achievements[player], achievement]
          }
        };
      }
    case 'DECREMENT_TIME':
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1)
      };
    case 'ADD_TIME':
      return {
        ...state,
        timeLeft: state.timeLeft + action.payload
      };
    case 'RESET_GAME':
      return {
        ...initialGameState,
        players: state.players,
        settings: state.settings,
        scores: Object.fromEntries(state.players.map(player => [player, 0])),
        streaks: Object.fromEntries(state.players.map(player => [player, 0])),
        powerUps: Object.fromEntries(state.players.map(player => [
          player,
          {
            timeBoost: 2,
            fiftyFifty: 1,
            hint: 2,
            doublePoints: 1
          }
        ])),
        achievements: Object.fromEntries(state.players.map(player => [player, []]))
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

// Utility Functions
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
  // Handle different question formats
  if (!question.options) {
    return question; // Already prepared or different format
  }

  const options = question.options.map((text, index) => ({
    id: index,
    text,
    isCorrect: index === question.correctAnswer
  }));
  
  const shuffledOptions = shuffleArray(options);
  const correctAnswer = shuffledOptions.findIndex(option => option.isCorrect);
  
  return {
    ...question,
    shuffledOptions,
    correctAnswer,
    answered: false,
    pointsAwarded: question.points || 10
  };
};

// Filter questions by difficulty
const filterQuestionsByDifficulty = (questions, difficulty) => {
  if (difficulty === DIFFICULTY_LEVELS.MIXED) {
    return questions;
  }
  
  return questions.filter(q => !q.difficulty || q.difficulty === difficulty);
};

// Filter questions by categories
const filterQuestionsByCategories = (questions, categories) => {
  if (!categories || categories.length === 0) {
    return questions;
  }
  
  return questions.filter(q => !q.category || categories.includes(q.category));
};

// Get unique categories from questions
const getUniqueCategories = (questions) => {
  const categories = questions
    .filter(q => q.category)
    .map(q => q.category);
  
  return [...new Set(categories)];
};

// Calculate points based on time and streak
const calculatePoints = (isCorrect, timeLeft, maxTime, streak, isDoublePoints = false) => {
  if (!isCorrect) {
    return -5;
  }
  
  const basePoints = 10;
  const timeBonus = Math.floor((timeLeft / maxTime) * 10);
  const streakBonus = Math.floor(streak / 3) * 5;
  
  let totalPoints = basePoints + timeBonus + streakBonus;
  
  if (isDoublePoints) {
    totalPoints *= 2;
  }
  
  return totalPoints;
};

// Get achievement based on performance
const getAchievements = (isCorrect, streak, timeLeft, maxTime, player, scores) => {
  const achievements = [];
  
  if (isCorrect && streak === 3) {
    achievements.push({
      id: 'streak3',
      title: 'On Fire!',
      description: '3 correct answers in a row',
      icon: <Sparkles className="w-4 h-4 text-orange-500" />
    });
  }
  
  if (isCorrect && streak === 5) {
    achievements.push({
      id: 'streak5',
      title: 'Unstoppable!',
      description: '5 correct answers in a row',
      icon: <Trophy className="w-4 h-4 text-yellow-500" />
    });
  }
  
  if (isCorrect && timeLeft > maxTime * 0.8) {
    achievements.push({
      id: 'speedDemon',
      title: 'Speed Demon',
      description: 'Answered correctly with over 80% time remaining',
      icon: <Timer className="w-4 h-4 text-blue-500" />
    });
  }
  
  // Check if this answer puts them in the lead
  const playerScore = scores[player];
  const maxScore = Math.max(...Object.values(scores));
  
  if (isCorrect && playerScore > maxScore && Object.keys(scores).length > 1) {
    achievements.push({
      id: 'takingLead',
      title: 'Taking the Lead!',
      description: 'Moved into first place',
      icon: <Crown className="w-4 h-4 text-yellow-500" />
    });
  }
  
  return achievements;
};

// Main game component
const EnhancedPubQuiz = ({ 
  title = "Enhanced Pub Quiz", 
  questions = [],
  initialSettings = {} 
}) => {
  // Initialize state with reducer
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialGameState,
    settings: { ...initialGameState.settings, ...initialSettings }
  });
  
  // Local state for UI
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [showRules, setShowRules] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isModifying, setIsModifying] = useState(false);
  const [selectedQuestionIndices, setSelectedQuestionIndices] = useState({});
  
  // Process and prepare questions
  const processedQuestions = useMemo(() => {
    if (!questions || questions.length === 0) {
      return [];
    }
    
    const filteredByDifficulty = filterQuestionsByDifficulty(
      questions, 
      state.settings.difficulty
    );
    
    const filteredByCategories = filterQuestionsByCategories(
      filteredByDifficulty,
      state.selectedCategories
    );
    
    return shuffleArray(filteredByCategories.map(prepareQuestion))
      .slice(0, state.settings.questionsPerRound);
  }, [
    questions, 
    state.settings.difficulty, 
    state.selectedCategories, 
    state.settings.questionsPerRound
  ]);
  
  // Available categories
  const availableCategories = useMemo(() => 
    getUniqueCategories(questions),
    [questions]
  );
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (state.phase === 'playing' && state.timeLeft > 0 && !showFeedback) {
      timer = setTimeout(() => {
        dispatch({ type: 'DECREMENT_TIME' });
      }, 1000);
    } else if (state.timeLeft === 0 && state.phase === 'playing' && !showFeedback) {
      handleAnswer(-1);
    }
    
    return () => clearTimeout(timer);
  }, [state.phase, state.timeLeft, showFeedback]);
  
  // Set questions when processed questions change
  useEffect(() => {
    if (processedQuestions.length > 0) {
      dispatch({ type: 'SET_QUESTIONS', payload: processedQuestions });
    }
  }, [processedQuestions]);
  
  // Get current question
  const currentQuestion = useMemo(() => {
    if (!state.questions || state.questions.length === 0) {
      return null;
    }
    return state.questions[state.currentQuestionIndex];
  }, [state.questions, state.currentQuestionIndex]);
  
  // Get current player
  const currentPlayer = state.players[state.currentPlayerIndex] || '';
  
  // Add player to the game
  const addPlayer = () => {
    if (newPlayerName.trim() && !state.players.includes(newPlayerName.trim())) {
      dispatch({ type: 'ADD_PLAYER', payload: newPlayerName.trim() });
      setNewPlayerName('');
    }
  };
  
  // Remove player from the game
  const removePlayer = (player) => {
    dispatch({ type: 'REMOVE_PLAYER', payload: player });
  };
  
  // Start the game
  const startGame = () => {
    if (state.players.length === 0) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'You need at least one player to start the game.'
      });
      return;
    }
    
    if (processedQuestions.length === 0) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'No questions available with the current settings.'
      });
      return;
    }
    
    dispatch({ type: 'START_GAME' });
  };
  
  // Handle player answer
  const handleAnswer = (selectedIndex) => {
    if (!currentQuestion) return;
    
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    
    // Update streak
    dispatch({ 
      type: 'UPDATE_STREAK', 
      payload: { player: currentPlayer, correct: isCorrect }
    });
    
    // Calculate points
    const usingDoublePoints = isModifying && selectedQuestionIndices.doublePoints;
    const points = calculatePoints(
      isCorrect, 
      state.timeLeft, 
      state.settings.timePerQuestion,
      state.streaks[currentPlayer] + (isCorrect ? 1 : 0),
      usingDoublePoints
    );
    
    // Update score
    dispatch({ 
      type: 'UPDATE_SCORE', 
      payload: { player: currentPlayer, points }
    });
    
    // Check for achievements
    const achievements = getAchievements(
      isCorrect,
      state.streaks[currentPlayer] + (isCorrect ? 1 : 0),
      state.timeLeft,
      state.settings.timePerQuestion,
      currentPlayer,
      state.scores
    );
    
    // Add achievements
    achievements.forEach(achievement => {
      dispatch({
        type: 'ADD_ACHIEVEMENT',
        payload: { player: currentPlayer, achievement: achievement.id }
      });
      
      // Show achievement notification
      if (achievement) {
        setCurrentAchievement(achievement);
        setShowAchievement(true);
        
        setTimeout(() => {
          setShowAchievement(false);
        }, 3000);
      }
    });
    
    // If using double points power-up, consume it
    if (usingDoublePoints) {
      dispatch({
        type: 'USE_POWERUP',
        payload: { player: currentPlayer, type: 'doublePoints' }
      });
    }
    
    // Set feedback
    setFeedback({
      isCorrect,
      message: isCorrect ? 'Correct!' : (selectedIndex === -1 ? 'Time\'s up!' : 'Incorrect!'),
      explanation: currentQuestion.explanation || 'No explanation available.',
      points,
      streakBonus: isCorrect && Math.floor(state.streaks[currentPlayer] / 3) * 5 > 0 
        ? Math.floor(state.streaks[currentPlayer] / 3) * 5 
        : 0,
      timeBonus: isCorrect ? Math.floor((state.timeLeft / state.settings.timePerQuestion) * 10) : 0,
      player: currentPlayer,
      doublePoints: usingDoublePoints,
      correctAnswer: currentQuestion.shuffledOptions[currentQuestion.correctAnswer].text
    });
    
    setShowFeedback(true);
    setIsModifying(false);
    setSelectedQuestionIndices({});
  };
  
  // Continue to next question
  const nextQuestion = () => {
    setShowFeedback(false);
    dispatch({ type: 'NEXT_QUESTION' });
  };
  
  // Reset game to lobby
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  // Use a power-up
  const usePowerUp = (type) => {
    if (
      !state.settings.enablePowerUps || 
      !state.powerUps[currentPlayer] || 
      state.powerUps[currentPlayer][type] <= 0
    ) {
      return;
    }
    
    // For double points, just mark it for use
    if (type === 'doublePoints') {
      setIsModifying(true);
      setSelectedQuestionIndices({ doublePoints: true });
      return;
    }
    
    dispatch({
      type: 'USE_POWERUP',
      payload: { player: currentPlayer, type }
    });
    
    switch(type) {
      case 'timeBoost':
        dispatch({ type: 'ADD_TIME', payload: 10 });
        break;
      case 'fiftyFifty':
        // Remove two wrong answers
        if (!currentQuestion) return;
        
        const correctIndex = currentQuestion.correctAnswer;
        
        // Find indices of wrong answers
        const wrongIndices = [];
        currentQuestion.shuffledOptions.forEach((option, index) => {
          if (index !== correctIndex) {
            wrongIndices.push(index);
          }
        });
        
        // Randomly select two wrong answers to remove
        const shuffledWrong = shuffleArray(wrongIndices);
        const indicesToDisable = shuffledWrong.slice(0, 2);
        
        // Mark them as disabled
        const updatedQuestions = [...state.questions];
        const updatedOptions = [...updatedQuestions[state.currentQuestionIndex].shuffledOptions];
        
        indicesToDisable.forEach(index => {
          updatedOptions[index] = {
            ...updatedOptions[index],
            text: "---",
            isDisabled: true
          };
        });
        
        updatedQuestions[state.currentQuestionIndex] = {
          ...updatedQuestions[state.currentQuestionIndex],
          shuffledOptions: updatedOptions
        };
        
        dispatch({ type: 'SET_QUESTIONS', payload: updatedQuestions });
        break;
      case 'hint':
        // Show a hint based on the explanation
        if (!currentQuestion) return;
        
        const hintText = currentQuestion.hint || 
          (currentQuestion.explanation 
            ? `Hint: ${currentQuestion.explanation.split('.')[0]}.`
            : "No hint available.");
        
        setFeedback({
          message: 'Hint Used',
          explanation: hintText,
          player: currentPlayer,
          isHint: true
        });
        setShowFeedback(true);
        break;
      default:
        break;
    }
  };
  
  // Get sorted leaderboard
  const getLeaderboard = useCallback(() => {
    return Object.entries(state.scores)
      .sort(([,a], [,b]) => b - a)
      .map(([player, score], index) => ({
        player,
        score,
        streak: state.streaks[player],
        rank: index + 1,
        achievements: state.achievements[player] || []
      }));
  }, [state.scores, state.streaks, state.achievements]);
  
  // Update settings
  const updateSettings = (settings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };
  
  // Handle category selection
  const handleCategorySelection = (category, checked) => {
    const newCategories = checked
      ? [...state.selectedCategories, category]
      : state.selectedCategories.filter(c => c !== category);
    
    dispatch({ 
      type: 'UPDATE_SETTINGS', 
      payload: { 
        categories: newCategories 
      } 
    });
    setSelectedQuestionIndices(newCategories);
  };
  
  // Get context value
  const contextValue = {
    ...state,
    dispatch,
    currentQuestion,
    currentPlayer,
    addPlayer,
    removePlayer,
    startGame,
    handleAnswer,
    nextQuestion,
    resetGame,
    usePowerUp,
    getLeaderboard,
    updateSettings,
    handleCategorySelection,
    isModifying,
    setIsModifying,
    selectedQuestionIndices,
    setSelectedQuestionIndices
  };
  
  // Render game lobby
  const renderLobby = () => (
    <div className="space-y-6">
      <Tabs defaultValue="players">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="players" className="flex-1">
            <Users className="w-4 h-4 mr-2" />
            Players
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex-1">
            <Info className="w-4 h-4 mr-2" />
            How to Play
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="players">
          <div className="bg-secondary/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5" />
              <h3 className="font-semibold">Players ({state.players.length})</h3>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
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
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {state.players.map((player) => (
                  <div key={player} className="flex items-center justify-between bg-background p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{player}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removePlayer(player)}
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="gameMode">Game Mode</Label>
                <Select 
                  value={state.settings.gameMode}
                  onValueChange={(value) => updateSettings({ gameMode: value })}
                >
                  <SelectTrigger id="gameMode">
                    <SelectValue placeholder="Select game mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={GAME_MODES.CLASSIC}>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2" />
                        Classic
                      </div>
                    </SelectItem>
                    <SelectItem value={GAME_MODES.TIME_ATTACK}>
                      <div className="flex items-center">
                        <Timer className="w-4 h-4 mr-2" />
                        Time Attack
                      </div>
                    </SelectItem>
                    <SelectItem value={GAME_MODES.TEAM}>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Team Mode
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select 
                  value={state.settings.difficulty}
                  onValueChange={(value) => updateSettings({ difficulty: value })}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DIFFICULTY_LEVELS.EASY}>
                      <div className="flex items-center">
                        <Gauge className="w-4 h-4 mr-2 text-green-500" />
                        Easy
                      </div>
                    </SelectItem>
                    <SelectItem value={DIFFICULTY_LEVELS.MEDIUM}>
                      <div className="flex items-center">
                        <Gauge className="w-4 h-4 mr-2 text-yellow-500" />
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value={DIFFICULTY_LEVELS.HARD}>
                      <div className="flex items-center">
                        <Gauge className="w-4 h-4 mr-2 text-red-500" />
                        Hard
                      </div>
                    </SelectItem>
                    <SelectItem value={DIFFICULTY_LEVELS.MIXED}>
                      <div className="flex items-center">
                        <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                        Mixed
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {availableCategories.length > 0 && (
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="grid grid-cols-2 gap-2 bg-secondary/10 p-3 rounded-md">
                    {availableCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={state.selectedCategories.includes(category)}
                          onCheckedChange={(checked) => 
                            handleCategorySelection(category, checked)
                          }
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="questionsPerRound">Questions Per Round</Label>
                <Select 
                  value={state.settings.questionsPerRound.toString()}
                  onValueChange={(value) => 
                    updateSettings({ questionsPerRound: parseInt(value) })
                  }
                >
                  <SelectTrigger id="questionsPerRound">
                    <SelectValue placeholder="Select number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timePerQuestion">Time Per Question (seconds)</Label>
                <Select 
                  value={state.settings.timePerQuestion.toString()}
                  onValueChange={(value) => 
                    updateSettings({ timePerQuestion: parseInt(value) })
                  }
                >
                  <SelectTrigger id="timePerQuestion">
                    <SelectValue placeholder="Select time per question" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 15, 20, 30, 45, 60].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} seconds
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="enablePowerUps"
                  checked={state.settings.enablePowerUps}
                  onCheckedChange={(checked) => 
                    updateSettings({ enablePowerUps: checked })
                  }
                />
                <Label htmlFor="enablePowerUps">Enable Power-Ups</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableSounds"
                  checked={state.settings.enableSounds}
                  onCheckedChange={(checked) => {
                    updateSettings({ enableSounds: checked });
                    setSoundEnabled(checked);
                  }}
                />
                <Label htmlFor="enableSounds">Enable Sounds</Label>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rules">
          <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center">
              <Book className="w-5 h-5 mr-2" />
              How to Play
            </h3>
            
            <div className="space-y-3">
              <p>Answer questions correctly to earn points! Here's how it works:</p>
              
              <div className="space-y-1">
                <h4 className="font-medium">Game Modes:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Classic:</strong> Players take turns answering questions</li>
                  <li><strong>Time Attack:</strong> Faster answers get more points</li>
                  <li><strong>Team Mode:</strong> Play in teams and collaborate</li>
                </ul>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium">Scoring:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Correct answer:</strong> +10 points</li>
                  <li><strong>Time bonus:</strong> Up to +10 points for fast answers</li>
                  <li><strong>Streak bonus:</strong> +5 points for every 3 correct answers in a row</li>
                  <li><strong>Wrong answer:</strong> -5 points</li>
                </ul>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium">Power-Ups:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Time Boost:</strong> +10 seconds to answer</li>
                  <li><strong>50:50:</strong> Removes two wrong answers</li>
                  <li><strong>Hint:</strong> Provides a hint for the current question</li>
                  <li><strong>Double Points:</strong> Next correct answer worth double points</li>
                </ul>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium">Achievements:</h4>
                <p>Earn special achievements for exceptional performance!</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button 
        onClick={startGame} 
        disabled={state.players.length === 0}
        className="w-full"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Quiz
      </Button>
      
      {state.error && (
        <div className="p-2 bg-red-100 text-red-800 rounded flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          {state.error}
        </div>
      )}
    </div>
  );
  
  // Render current question
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{currentPlayer}'s Turn</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>{state.scores[currentPlayer]}</span>
            </span>
            {state.streaks[currentPlayer] >= 3 && (
              <Badge variant="outline" className="flex items-center bg-orange-100">
                <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
                {state.streaks[currentPlayer]}
              </Badge>
            )}
          </div>
        </div>

        <div className="bg-secondary/20 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10">
                Q{state.currentQuestionIndex + 1}/{state.questions.length}
              </Badge>
              
              {currentQuestion.difficulty && (
                <Badge 
                  variant="outline" 
                  className={`
                    ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' : ''}
                    ${currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${currentQuestion.difficulty === 'hard' ? 'bg-red-100 text-red-800' : ''}
                  `}
                >
                  {currentQuestion.difficulty}
                </Badge>
              )}
              
              {currentQuestion.category && (
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {currentQuestion.category}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{state.timeLeft}s</span>
            </div>
          </div>
          
          <Progress 
            value={(state.timeLeft / state.settings.timePerQuestion) * 100} 
            className="mb-4"
            color={state.timeLeft < 5 ? 'bg-red-500' : 'bg-blue-500'}
          />
          
          {currentQuestion.imageUrl && (
            <div className="mb-4 flex justify-center">
              <img 
                src={currentQuestion.imageUrl} 
                alt="Question" 
                className="max-h-40 rounded"
              />
            </div>
          )}
          
          <p className="text-lg font-medium mb-6">{currentQuestion.text}</p>
          
          <div className="grid grid-cols-1 gap-2">
            {currentQuestion.shuffledOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant="secondary"
                className={`
                  h-auto py-3 px-4 text-left flex items-center justify-start
                  ${isModifying && selectedQuestionIndices.doublePoints ? 'border-2 border-yellow-400' : ''}
                `}
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

        {state.settings.enablePowerUps && (
          <div className="bg-secondary/10 p-3 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Power-Ups:</h3>
            <div className="flex justify-center space-x-3">
              {Object.entries(state.powerUps[currentPlayer] || {}).map(([type, count]) => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  disabled={count === 0 || isModifying}
                  onClick={() => usePowerUp(type)}
                  className={`
                    flex flex-col items-center px-2 py-1
                    ${isModifying && selectedQuestionIndices.doublePoints && type === 'doublePoints' 
                      ? 'bg-yellow-100 border-yellow-400' 
                      : ''}
                  `}
                >
                  {type === 'timeBoost' && (
                    <>
                      <Timer className="w-4 h-4 mb-1" />
                      <span className="text-xs">+10s ({count})</span>
                    </>
                  )}
                  {type === 'fiftyFifty' && (
                    <>
                      <Shield className="w-4 h-4 mb-1" />
                      <span className="text-xs">50:50 ({count})</span>
                    </>
                  )}
                  {type === 'hint' && (
                    <>
                      <Lightbulb className="w-4 h-4 mb-1" />
                      <span className="text-xs">Hint ({count})</span>
                    </>
                  )}
                  {type === 'doublePoints' && (
                    <>
                      <Star className="w-4 h-4 mb-1" />
                      <span className="text-xs">2x Points ({count})</span>
                    </>
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {isModifying && selectedQuestionIndices.doublePoints && (
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsModifying(false);
                setSelectedQuestionIndices({});
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  // Render leaderboard
  const renderLeaderboard = () => {
    const leaderboard = getLeaderboard();
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-center mb-4">Final Standings</h3>
        <div className="space-y-3">
          {leaderboard.map(({ player, score, streak, rank, achievements }) => (
            <div
              key={player}
              className={`rounded-lg overflow-hidden border ${
                rank === 1 ? 'border-yellow-400' : 'border-gray-200'
              }`}
            >
              <div className={`
                flex items-center justify-between p-3
                ${rank === 1 ? 'bg-yellow-50' : 'bg-secondary/10'}
              `}>
                <div className="flex items-center space-x-3">
                  {rank === 1 && <Crown className="w-5 h-5 text-yellow-500" />}
                  <span className="font-medium">{rank}. {player}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {streak >= 3 && (
                    <Badge variant="outline" className="flex items-center bg-orange-100">
                      <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
                      {streak}
                    </Badge>
                  )}
                  <span className="flex items-center font-bold">
                    <Star className="w-4 h-4 mr-1" />
                    {score}
                  </span>
                </div>
              </div>
              
              {achievements.length > 0 && (
                <div className="p-2 bg-secondary/5 border-t border-gray-200">
                  <div className="flex flex-wrap gap-1">
                    {achievements.map(achievementId => {
                      const achievement = [
                        { id: 'streak3', icon: <Sparkles className="w-3 h-3 text-orange-500" />, title: 'On Fire' },
                        { id: 'streak5', icon: <Trophy className="w-3 h-3 text-yellow-500" />, title: 'Unstoppable' },
                        { id: 'speedDemon', icon: <Timer className="w-3 h-3 text-blue-500" />, title: 'Speed Demon' },
                        { id: 'takingLead', icon: <Crown className="w-3 h-3 text-yellow-500" />, title: 'Taking the Lead' },
                      ].find(a => a.id === achievementId);
                      
                      if (!achievement) return null;
                      
                      return (
                        <Badge 
                          key={achievementId} 
                          variant="outline" 
                          className="flex items-center text-xs bg-background"
                        >
                          {achievement.icon}
                          <span className="ml-1">{achievement.title}</span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="pt-4 space-y-2">
          <Button onClick={resetGame} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => dispatch({ type: 'SET_PHASE', payload: 'lobby' })}
            className="w-full"
          >
            <Menu className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <GameContext.Provider value={contextValue}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            <Brain className="w-6 h-6 mr-2" />
            {title}
          </CardTitle>
          {state.phase !== 'lobby' && (
            <CardDescription className="text-center">
              {state.settings.gameMode === GAME_MODES.CLASSIC && "Classic Mode"}
              {state.settings.gameMode === GAME_MODES.TIME_ATTACK && "Time Attack Mode"}
              {state.settings.gameMode === GAME_MODES.TEAM && "Team Mode"}
              {" • "}
              {state.settings.difficulty.charAt(0).toUpperCase() + state.settings.difficulty.slice(1)} Difficulty
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {state.phase === 'lobby' && renderLobby()}
          {state.phase === 'playing' && renderQuestion()}
          {state.phase === 'finalSummary' && renderLeaderboard()}
        </CardContent>

        <AlertDialog open={showFeedback}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className={`flex items-center ${
                feedback.isCorrect ? 'text-green-600' : 
                feedback.isHint ? 'text-blue-600' : 'text-red-600'
              }`}>
                {feedback.isCorrect ? <CheckCircle className="w-5 h-5 mr-2" /> : 
                 feedback.isHint ? <Lightbulb className="w-5 h-5 mr-2" /> : 
                 <XCircle className="w-5 h-5 mr-2" />}
                {feedback.message}
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                {feedback.message === 'Incorrect!' && !feedback.isHint && (
                  <p className="font-medium">The correct answer was: {feedback.correctAnswer}</p>
                )}
                
                <p>{feedback.explanation}</p>
                
                {feedback.isCorrect && (
                  <div className="mt-3 p-2 bg-green-50 rounded-md">
                    <h4 className="font-medium text-green-800 flex items-center mb-1">
                      <Star className="w-4 h-4 mr-1" />
                      Points Breakdown:
                    </h4>
                    <ul className="text-sm space-y-1 text-green-800">
                      <li className="flex justify-between">
                        <span>Base points:</span>
                        <span>+10</span>
                      </li>
                      {feedback.timeBonus > 0 && (
                        <li className="flex justify-between">
                          <span>Time bonus:</span>
                          <span>+{feedback.timeBonus}</span>
                        </li>
                      )}
                      {feedback.streakBonus > 0 && (
                        <li className="flex justify-between">
                          <span>Streak bonus:</span>
                          <span>+{feedback.streakBonus}</span>
                        </li>
                      )}
                      {feedback.doublePoints && (
                        <li className="flex justify-between font-medium">
                          <span>Double points:</span>
                          <span>x2</span>
                        </li>
                      )}
                      <li className="flex justify-between font-medium border-t border-green-200 mt-1 pt-1">
                        <span>Total:</span>
                        <span>+{feedback.points}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={nextQuestion}>
                {feedback.isHint ? 'Got it' : 'Continue'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <AlertDialog open={showAchievement}>
          <AlertDialogContent className="max-w-xs">
            <AlertDialogHeader className="items-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                {currentAchievement?.icon || <Trophy className="w-8 h-8 text-yellow-500" />}
              </div>
              <AlertDialogTitle className="text-center">
                Achievement Unlocked!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <p className="font-bold">{currentAchievement?.title}</p>
                <p className="text-sm">{currentAchievement?.description}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </GameContext.Provider>
  );
};

// Sample questions with categories and difficulty levels
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
    explanation: "useEffect is the React hook designed to handle side effects like data fetching, subscriptions, or manually changing the DOM.",
    category: "React Hooks",
    difficulty: "easy"
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
    explanation: "JSX stands for JavaScript XML. It's a syntax extension for JavaScript recommended by React for describing what the UI should look like.",
    category: "React Basics",
    difficulty: "easy"
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
    explanation: "useComponent is not a standard React hook. The others (useEffect, useState, and useHistory from React Router) are valid hooks.",
    category: "React Hooks",
    difficulty: "medium"
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
    explanation: "In React, you can conditionally render elements using either the ternary operator (condition ? true : false) or the && operator (condition && element).",
    category: "React Basics",
    difficulty: "medium"
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
    explanation: "this.setState() is the correct method to update state in a React class component. Direct state mutation should be avoided.",
    category: "Class Components",
    difficulty: "medium"
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
    explanation: "The virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to improve performance by minimizing direct DOM manipulations.",
    category: "React Internals",
    difficulty: "medium"
  },
  {
    text: "What happens when you call setState() inside useEffect() without a dependency array?",
    options: [
      "Nothing, setState is not allowed in useEffect",
      "The state updates once",
      "The component renders twice",
      "An infinite loop of renders"
    ],
    correctAnswer: 3,
    explanation: "Without a dependency array, useEffect runs after every render. If setState is called inside, it triggers another render, creating an infinite loop.",
    category: "React Hooks",
    difficulty: "hard"
  },
  {
    text: "Which of these is NOT a way to optimize React performance?",
    options: [
      "Using React.memo for component memoization",
      "Implementing shouldComponentUpdate",
      "Using the useCallback hook",
      "Always using arrow functions in render methods"
    ],
    correctAnswer: 3,
    explanation: "Always using arrow functions in render methods actually hurts performance, as it creates a new function instance on each render, potentially causing unnecessary re-renders.",
    category: "Performance",
    difficulty: "hard"
  },
  {
    text: "What is the difference between Shadow DOM and Virtual DOM?",
    options: [
      "They are different names for the same concept",
      "Shadow DOM is browser technology, Virtual DOM is a React concept",
      "Shadow DOM is used for CSS, Virtual DOM for JavaScript",
      "Shadow DOM is slower than Virtual DOM"
    ],
    correctAnswer: 1,
    explanation: "Shadow DOM is a browser technology designed to scope variables and CSS, while Virtual DOM is a concept implemented by React to improve performance by minimizing actual DOM operations.",
    category: "React Internals",
    difficulty: "hard"
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
    explanation: "Keys help React identify which items have changed, been added, or been removed. They should be unique among siblings to ensure proper rendering and updates.",
    category: "React Basics",
    difficulty: "easy"
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
    explanation: "componentDidMount is called immediately after a component is mounted (inserted into the tree). It's often used for network requests or DOM initialization.",
    category: "Class Components",
    difficulty: "medium"
  },
  {
    text: "What tool is most commonly used to create a React application?",
    options: [
      "create-react-app",
      "new-react-app",
      "initialize-react",
      "start-react"
    ],
    correctAnswer: 0,
    explanation: "create-react-app is a command-line utility that creates a new React project with a modern build setup with no configuration needed.",
    category: "Development Tools",
    difficulty: "easy"
  },
  {
    text: "What is the React Context API used for?",
    options: [
      "Making API calls",
      "Managing component lifecycle",
      "Sharing state between components without prop drilling",
      "Optimizing rendering performance"
    ],
    correctAnswer: 2,
    explanation: "The Context API provides a way to share values between components without having to explicitly pass a prop through every level of the component tree (prop drilling).",
    category: "State Management",
    difficulty: "medium"
  },
  {
    text: "What is the significance of the key 'children' in React?",
    options: [
      "It's a reserved property name for nested components",
      "It helps React identify which components need to re-render",
      "It defines how many child components a parent can have",
      "It's an alias for the React.Fragment component"
    ],
    correctAnswer: 0,
    explanation: "In React, 'children' is a special property that contains the content between the opening and closing tags of a component. It allows components to be nested within each other.",
    category: "React Basics",
    difficulty: "medium"
  },
  {
    text: "What is React StrictMode used for?",
    options: [
      "Forcing components to follow a strict typing system",
      "Enforcing better security practices",
      "Highlighting potential problems in an application",
      "Restricting the use of certain React features"
    ],
    correctAnswer: 2,
    explanation: "StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants and doesn't render any visible UI.",
    category: "React Internals",
    difficulty: "hard"
  },
  {
    text: "In React, what is the correct way to update state based on the previous state?",
    options: [
      "this.state.count = this.state.count + 1",
      "this.setState({ count: this.state.count + 1 })",
      "this.setState(prevState => ({ count: prevState.count + 1 }))",
      "this.setCount(this.state.count + 1)"
    ],
    correctAnswer: 2,
    explanation: "When updating state based on the previous state, you should use the function form of setState to avoid race conditions. This ensures you're working with the most current state values.",
    category: "State Management",
    difficulty: "medium"
  }
];

// Main component
const PubQuizGame = ({ 
  title = "Enhanced Pub Quiz",
  questions = sampleQuestions,
  initialSettings = {} 
}) => {
  return (
    <EnhancedPubQuiz 
      title={title} 
      questions={questions} 
      initialSettings={initialSettings} 
    />
  );
};

export default PubQuizGame;