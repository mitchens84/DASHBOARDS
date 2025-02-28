import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BookOpen, AlertTriangle, CheckCircle, XCircle, 
  Award, RotateCcw, Star, Trophy,
  TrendingUp, BookMarked, MessageSquare, FileText,
  Info, ChevronsUp, HelpCircle, Eye, Brain
} from 'lucide-react';

// Types
interface Highlight {
  id: string;
  text: string;
  source: string;
  isReal?: boolean;
  originalText?: string;
  changes?: Change[];
}

interface Change {
  type: string;
  original?: string;
  modified?: string;
  position?: number;
  description?: string;
  detail?: string;
  words?: string[];
  word?: string;  // Add this for the negation cases
  sentence?: number;
}

interface Answer {
  isCorrect: boolean;
  points: number;
  confidence: number;
  time: number;
  guess: boolean;
  actual: boolean;
}

interface FeedbackData {
  item: Highlight;
  isCorrect: boolean;
  pointsEarned: number;
  timeTaken: number;
  streak: number;
}

// Add interface for confidence level data
interface ConfidenceLevelData {
  correct: number;
  total: number;
}

interface ConfidenceLevels {
  [key: number]: ConfidenceLevelData;
}

// Sample data
const sampleHighlights: Highlight[] = [
  {
    id: "1",
    text: "The most efficient way to develop self-control is to practice habits that strengthen your willpower.",
    source: "Atomic Habits"
  },
  {
    id: "2",
    text: "Motivation comes and goes, but habits create systems that make change sustainable over the long term.",
    source: "Atomic Habits"
  },
  {
    id: "3",
    text: "Success is not just what you know, but how quickly you can adapt to what you do not know.",
    source: "Principles"
  },
  {
    id: "4",
    text: "Reflection turns experience into insight. It is the process by which we make sense of what we have learned.",
    source: "The 15 Invaluable Laws of Growth"
  },
  {
    id: "5",
    text: "Your level of success will rarely exceed your level of personal development.",
    source: "The 15 Invaluable Laws of Growth"
  }
];

// Utility Functions
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Memoized dictionary of opposites for better performance
const oppositeWords: { [key: string]: string } = {
  'good': 'bad',
  'bad': 'good',
  'high': 'low',
  'low': 'high',
  'large': 'small',
  'small': 'large',
  'decrease': 'increase',
  'positive': 'negative',
  'always': 'never',
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
  'better': 'worse',
  'worse': 'better',
  'best': 'worst',
  'worst': 'best',
  'beneficial': 'detrimental',
  'advantage': 'disadvantage',
  'success': 'failure',
  'effective': 'ineffective',
  'improve': 'impair',
  'enhance': 'diminish',
  'support': 'oppose',
  'confirm': 'contradict',
  'significant': 'insignificant',
  'remember': 'forget',
  'include': 'exclude',
  'enable': 'disable',
  'encourage': 'discourage',
  'all': 'most',
  'every': 'many',
  'usually': 'rarely',
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

// Get opposite or significantly different word with memoized dictionary
const getOppositeWord = (word: string) => {
  const lowerWord = word.toLowerCase();
  if (oppositeWords[lowerWord]) {
    // Preserve capitalization
    if (word[0] === word[0].toUpperCase()) {
      return oppositeWords[lowerWord].charAt(0).toUpperCase() + oppositeWords[lowerWord].slice(1);
    }
    return oppositeWords[lowerWord];
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

// Generate fake highlights at different difficulty levels with change tracking
const generateFakeHighlight = (originalText: string, difficulty: string) => {
  // Tokenize the text for manipulation
  const words = originalText.split(' ');
  const sentences = originalText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  let fakeText = '';
  let changes: Change[] = [];
  
  // Skip very short highlights
  if (words.length < 3) {
    return {
      text: originalText,
      isReal: true,
      changes: []
    };
  }
  
  switch(difficulty) {
    // Novice: Obvious changes - word replacements, opposites
    case 'novice':
      if (words.length > 5) {
        // Replace 20-30% of words with alternatives
        const wordsToChange = Math.max(2, Math.floor(words.length * 0.25));
        const indicesToChange = new Set<number>();
        
        while (indicesToChange.size < wordsToChange) {
          const randomIndex = Math.floor(Math.random() * words.length);
          if (words[randomIndex].length > 3) { // Only change substantial words
            indicesToChange.add(randomIndex);
          }
        }
        
        const modifiedWords = words.map((word, index) => {
          if (indicesToChange.has(index)) {
            const lowerWord = word.toLowerCase();
            let newWord = word;
            
            // Try to find an opposite
            if (oppositeWords[lowerWord]) {
              newWord = oppositeWords[lowerWord];
              
              // Preserve capitalization
              if (word[0] === word[0].toUpperCase()) {
                newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
              }
            } else if (Math.random() > 0.5 && word.length > 4) {
              // For words without direct opposites, make obvious changes
              newWord = word.split('').reverse().join('');
            } else {
              newWord = word.charAt(0) + '*' + word.substring(2);
            }
            
            // Track the change
            changes.push({
              type: 'word',
              original: word,
              modified: newWord,
              position: index
            });
            
            return newWord;
          }
          return word;
        });
        
        fakeText = modifiedWords.join(' ');
      } else {
        // For very short highlights, just reverse the whole thing
        fakeText = words.reverse().join(' ');
        changes.push({
          type: 'major',
          description: 'Word order reversed'
        });
      }
      break;
      
    // Adept: Moderate changes - sentence restructuring, concept alterations
    case 'adept':
      if (sentences.length > 1) {
        // Reorder or modify sentences
        const modifiedSentences = sentences.map((sentence, idx) => {
          if (Math.random() > 0.5) {
            // Reorder words in the sentence
            const sentenceWords = sentence.trim().split(' ');
            if (sentenceWords.length > 3) {
              const midPoint = Math.floor(sentenceWords.length / 2);
              const firstHalf = sentenceWords.slice(0, midPoint);
              const secondHalf = sentenceWords.slice(midPoint);
              
              changes.push({
                type: 'reorder',
                description: `Sentence ${idx+1} word order changed`,
                sentence: idx
              });
              
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
          
          changes.push({
            type: 'reorder',
            description: 'Sentence order changed'
          });
        }
        
        fakeText = modifiedSentences.join('. ') + '.';
      } else {
        // For single sentences, change the meaning more substantially
        const sentenceWords = sentences[0].trim().split(' ');
        
        // Insert or remove negations
        if (sentenceWords.includes('not') || sentenceWords.includes("don't") || sentenceWords.includes("doesn't")) {
          // Remove negation
          fakeText = sentences[0].replace(/\bnot\b|\bdon't\b|\bdoesn't\b/g, '');
          
          changes.push({
            type: 'negation',
            description: 'Negation removed',
            detail: 'A negative word was removed, changing the meaning'
          });
        } else {
          // Add negation
          const verbPositions = sentenceWords.findIndex(word => 
            word.endsWith('s') || word === 'is' || word === 'are' || word === 'was' || word === 'were'
          );
          
          if (verbPositions !== -1 && verbPositions < sentenceWords.length - 1) {
            sentenceWords.splice(verbPositions + 1, 0, 'not');
            fakeText = sentenceWords.join(' ');
            
            changes.push({
              type: 'negation',
              description: 'Negation added',
              detail: 'The word "not" was inserted, changing the meaning'
            });
          } else {
            // If no clear verb, just swap a key term
            const wordsToChange = Math.max(1, Math.floor(sentenceWords.length * 0.2));
            for (let i = 0; i < wordsToChange; i++) {
              const randomIndex = Math.floor(Math.random() * sentenceWords.length);
              if (sentenceWords[randomIndex].length > 3) {
                const originalWord = sentenceWords[randomIndex];
                sentenceWords[randomIndex] = getOppositeWord(sentenceWords[randomIndex]);
                
                changes.push({
                  type: 'word',
                  original: originalWord,
                  modified: sentenceWords[randomIndex],
                  position: randomIndex
                });
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
      
      // Look for qualifiers to replace
      let modifiedText = originalText;
      let qualifiersChanged = false;
      
      Object.keys(oppositeWords).forEach(qualifier => {
        const regex = new RegExp(`\\b${qualifier}\\b`, 'gi');
        if (regex.test(modifiedText)) {
          const matches = modifiedText.match(regex) || [];
          
          matches.forEach(match => {
            changes.push({
              type: 'qualifier',
              original: match,
              modified: oppositeWords[match.toLowerCase()],
              description: 'Subtle meaning change via qualifier modification'
            });
          });
          
          modifiedText = modifiedText.replace(regex, oppositeWords[qualifier]);
          qualifiersChanged = true;
        }
      });
      
      // If no qualifiers were replaced, make a more subtle change
      if (!qualifiersChanged) {
        // Identify a key phrase and modify it slightly
        const words = originalText.split(' ');
        const phrasesToModify = Math.max(1, Math.floor(words.length * 0.15));
        let wordsChanged = 0;
        
        for (let i = 0; i < words.length && wordsChanged < phrasesToModify; i++) {
          if (words[i].length > 4 && !/^\d+$/.test(words[i]) && Math.random() > 0.7) {
            // Check for subtle word opposites
            const lowerWord = words[i].toLowerCase();
            if (oppositeWords[lowerWord]) {
              changes.push({
                type: 'word',
                original: words[i],
                modified: oppositeWords[lowerWord],
                position: i,
                description: 'Subtle word change'
              });
              
              words[i] = oppositeWords[lowerWord];
              wordsChanged++;
            }
          }
        }
        
        modifiedText = words.join(' ');
      }
      
      fakeText = modifiedText;
      break;
      
    default:
      // Default to moderate changes
      fakeText = originalText.split(' ').reverse().join(' ');
      changes.push({
        type: 'major',
        description: 'Word order reversed'
      });
  }
  
  // Ensure the fake is actually different
  if (fakeText === originalText) {
    if (difficulty === 'expert') {
      // For expert level, make a minimal change to a single important word
      const words = originalText.split(' ');
      const importantWordIndex = words.findIndex(word => word.length > 5);
      if (importantWordIndex !== -1) {
        const originalWord = words[importantWordIndex];
        words[importantWordIndex] = getOppositeWord(words[importantWordIndex]);
        
        changes.push({
          type: 'word',
          original: originalWord,
          modified: words[importantWordIndex],
          position: importantWordIndex,
          description: 'Key word changed'
        });
      } else {
        // Add or remove a word
        const insertionPoint = Math.floor(words.length / 2);
        if (Math.random() > 0.5) {
          words.splice(insertionPoint, 0, 'not');
          changes.push({
            type: 'added',
            word: 'not',
            position: insertionPoint,
            description: 'Negation word added'
          });
        } else {
          const removedWord = words[insertionPoint];
          words.splice(insertionPoint, 1);
          changes.push({
            type: 'removed',
            word: removedWord,
            position: insertionPoint,
            description: 'Word removed'
          });
        }
      }
      fakeText = words.join(' ');
    } else {
      // For other levels, make more obvious changes
      fakeText = `The opposite is true: ${originalText}`;
      changes.push({
        type: 'major',
        description: 'Complete contradiction with prefix added'
      });
    }
  }
  
  return {
    text: fakeText,
    isReal: false,
    originalText,
    changes
  };
};

// Process highlights and generate fake versions
const processHighlights = (highlights: Highlight[], difficulty: string) => {
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
    isReal: true,
    changes: []
  }));
  
  // Create a balanced set of real and fake items
  const numItemsToInclude = Math.min(realItems.length, validFakes.length);
  const selectedReal = shuffleArray(realItems).slice(0, numItemsToInclude);
  const selectedFake = shuffleArray(validFakes).slice(0, numItemsToInclude);
  
  // Combine and shuffle for final game set
  const gameItems = shuffleArray([...selectedReal, ...selectedFake]);
  
  return gameItems;
};

// KeyboardShortcuts component
const KeyboardShortcuts = ({ enabled, onToggle }: { enabled: boolean, onToggle: () => void }) => (
  <div className="flex items-center space-x-2 text-sm">
    <div className="flex items-center space-x-1">
      <Checkbox 
        id="keyboardShortcuts" 
        checked={enabled} 
        onCheckedChange={onToggle}
      />
      <Label htmlFor="keyboardShortcuts" className="cursor-pointer">
        Keyboard Shortcuts
      </Label>
    </div>
    
    {enabled && (
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <span className="px-1.5 py-0.5 bg-secondary rounded">R</span>
        <span>Real</span>
        <span className="px-1.5 py-0.5 bg-secondary rounded">F</span>
        <span>Fake</span>
        <span className="px-1.5 py-0.5 bg-secondary rounded">1-3</span>
        <span>Confidence</span>
      </div>
    )}
  </div>
);

// StreakIndicator component
const StreakIndicator = ({ streak }: { streak: number }) => {
  if (streak < 3) return null;
  
  return (
    <div className="flex items-center animate-pulse">
      <ChevronsUp className="w-4 h-4 text-orange-500" />
      <span className="text-orange-500 font-medium">{streak} Streak!</span>
    </div>
  );
};

// ChangesHighlighter component to visualize text differences
const ChangesHighlighter = ({ originalText, modifiedText, changes }: { originalText: string, modifiedText: string, changes: Change[] }) => {
  if (!changes || changes.length === 0) return null;
  
  // For major changes, show a simple comparison
  if (changes.some(c => c.type === 'major')) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium">Changes Made:</p>
        <div className="flex space-x-2">
          <div className="flex-1 bg-red-50 p-2 rounded text-sm border border-red-200">
            <p className="text-xs text-red-500 mb-1">Original</p>
            {originalText}
          </div>
          <div className="flex-1 bg-blue-50 p-2 rounded text-sm border border-blue-200">
            <p className="text-xs text-blue-500 mb-1">Modified</p>
            {modifiedText}
          </div>
        </div>
      </div>
    );
  }
  
  // For word-level changes, highlight specific differences
  const wordChanges = changes.filter(c => c.type === 'word');
  const otherChanges = changes.filter(c => c.type !== 'word');
  
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Key Changes:</p>
      
      {wordChanges.length > 0 && (
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs mb-1">Word Changes:</p>
          <div className="flex flex-wrap gap-2">
            {wordChanges.map((change, idx) => (
              <div key={idx} className="flex text-sm">
                <span className="line-through text-red-500">{change.original}</span>
                <span className="mx-1">→</span>
                <span className="text-green-500">{change.modified}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {otherChanges.length > 0 && (
        <div className="text-sm space-y-1">
          {otherChanges.map((change, idx) => (
            <div key={idx} className="flex items-center">
              <Info className="w-3 h-3 mr-1 text-blue-500" />
              <span>{change.description || change.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Game component with game mechanics
const HighlightDetective = ({ userHighlights = [] }: { userHighlights: Highlight[] }) => {
  // Game configuration state
  const [gameState, setGameState] = useState('setup');
  const [difficulty, setDifficulty] = useState('novice');
  const [gameMode, setGameMode] = useState('classic');
  const [enableKeyboardShortcuts, setEnableKeyboardShortcuts] = useState(true);
  const [practiceModeEnabled, setPracticeModeEnabled] = useState(false);
  
  // Game progress state
  const [gameItems, setGameItems] = useState<Highlight[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(1);
  const [answers, setAnswers] = useState<{ [key: string]: Answer }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  // Refs for cleanup and optimization
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enableKeyboardShortcuts || gameState !== 'playing' || showFeedback) return;
      
      const key = event.key.toLowerCase();
      
      // Confidence shortcuts (1-3)
      if (['1', '2', '3'].includes(key)) {
        setConfidenceLevel(parseInt(key));
        return;
      }
      
      // Answer shortcuts
      if (key === 'r') {
        handleAnswer(true);
      } else if (key === 'f') {
        handleAnswer(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts, gameState, showFeedback, gameItems, currentIndex]);
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Prepare game items when starting
  const startGame = useCallback(() => {
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
    
    // Take only a subset for practice mode
    const finalItems = practiceModeEnabled ? items.slice(0, 3) : items;
    
    setGameItems(finalItems);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setAnswers({});
    setStartTime(Date.now());
    setGameState('playing');
  }, [userHighlights, difficulty, practiceModeEnabled]);
  
  // Handle player answer
  const handleAnswer = useCallback((isRealGuess: boolean) => {
    const currentItem = gameItems[currentIndex];
    const isCorrect = currentItem.isReal === isRealGuess;
    const endTime = Date.now();
    const timeElapsed = (endTime - (startTime || 0)) / 1000; // in seconds
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
      } else if (!practiceModeEnabled) {
        // Small penalty in normal modes (except practice mode)
        pointsEarned = -2;
      }
    }
    
    // No scoring in practice mode
    if (practiceModeEnabled) {
      pointsEarned = 0;
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
        time: timeElapsed,
        guess: isRealGuess,
        actual: currentItem.isReal || false
      }
    }));
    
    // Show feedback
    setFeedbackData({
      item: currentItem,
      isCorrect,
      pointsEarned,
      timeTaken: timeElapsed,
      streak: isCorrect ? streak + 1 : 0
    });
    setShowFeedback(true);
  }, [gameItems, currentIndex, streak, confidenceLevel, gameMode, startTime, practiceModeEnabled]);
  
  // Move to next item after feedback
  const nextItem = useCallback(() => {
    setShowFeedback(false);
    
    if (currentIndex < gameItems.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setConfidenceLevel(1);
      setStartTime(Date.now());
    } else {
      // End of game
      setGameState(practiceModeEnabled ? 'setup' : 'results');
      // If this was practice mode, prompt to start the real game
      if (practiceModeEnabled) {
        setPracticeModeEnabled(false);
        setShowHelp(true);
      }
    }
  }, [currentIndex, gameItems.length, practiceModeEnabled]);
  
  // Game statistics for results screen
  const gameStats = useMemo(() => {
    if (answers && Object.keys(answers).length) {
      const totalAnswers = Object.keys(answers).length;
      const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
      const accuracy = (correctAnswers / totalAnswers) * 100;
      
      // Average response time
      const avgTime = Object.values(answers).reduce((sum, a) => sum + a.time, 0) / totalAnswers;
      
      // Performance by confidence level
      const confidenceLevels: ConfidenceLevels = {1: {correct: 0, total: 0}, 2: {correct: 0, total: 0}, 3: {correct: 0, total: 0}};
      Object.values(answers).forEach(a => {
        if (confidenceLevels[a.confidence]) {
          confidenceLevels[a.confidence].total++;
          if (a.isCorrect) confidenceLevels[a.confidence].correct++;
        }
      });
      
      // Calculate max streak
      let maxStreak = 0;
      let currentStreak = 0;
      Object.values(answers).forEach(a => {
        if (a.isCorrect) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      });
      
      return {
        totalAnswers,
        correctAnswers,
        accuracy,
        avgTime,
        confidenceLevels,
        maxStreak
      };
    }
    return null;
  }, [answers]);
  
  // Render help/practice completion screen
  const renderHelpScreen = () => (
    <div className="space-y-6">
      <div className="bg-secondary/20 p-4 rounded-lg">
        <h3 className="text-lg font-bold flex items-center mb-2">
          <HelpCircle className="w-5 h-5 mr-2" />
          Ready for the Challenge?
        </h3>
        
        <div className="space-y-4">
          <p>
            You have completed the practice round! Now you are ready to start the real game with 
            {practiceModeEnabled ? '' : ' more'} highlights and higher stakes.
          </p>
          
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="font-medium mb-1">Game Tips:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Carefully examine each highlight for inconsistencies</li>
              <li>Pay attention to qualifiers like "always," "never," or "most"</li>
              <li>Look for subtle word replacements that change meaning</li>
              <li>Higher confidence means higher rewards but bigger penalties</li>
              <li>Build and maintain streaks for bonus points</li>
            </ul>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button onClick={() => {
              setShowHelp(false);
              startGame();
            }}>
              Start Full Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render tutorial screen with better explanations
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
              <li>You will be shown highlights one at a time</li>
              <li>For each highlight, decide if it is "Real" or "Fake"</li>
              <li>Set your confidence level (1x-3x) to multiply points</li>
              <li>Maintain a streak of correct answers for bonus points</li>
              <li>Review feedback after each answer to improve</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium">Game Modes</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-blue-50 p-2 rounded">
                <span className="font-medium">Classic Mode</span>
                <p>Standard gameplay with balanced rewards and penalties</p>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <span className="font-medium">Speed Round</span>
                <p>Bonus points for quick answers</p>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <span className="font-medium">Expert Challenge</span>
                <p>Higher penalties for incorrect answers</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => {
              setPracticeModeEnabled(true);
              startGame();
            }}>
              Practice Round
            </Button>
            <Button onClick={() => setGameState('setup')}>
              Back to Setup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render setup screen with enhanced options
  const renderSetupScreen = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="difficulty" className="mb-1 block">Difficulty Level</Label>
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
        
        <div>
          <Label htmlFor="gameMode" className="mb-1 block">Game Mode</Label>
          <Select value={gameMode} onValueChange={setGameMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select game mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic Mode</SelectItem>
              <SelectItem value="speed">Speed Round (Time Bonuses)</SelectItem>
              <SelectItem value="expert">Expert Challenge (Higher Stakes)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <KeyboardShortcuts 
          enabled={enableKeyboardShortcuts} 
          onToggle={() => setEnableKeyboardShortcuts(!enableKeyboardShortcuts)} 
        />
      </div>
      
      <div className="flex flex-col space-y-2">
        <Button onClick={() => setGameState('tutorial')} variant="outline" className="w-full">
          <HelpCircle className="w-4 h-4 mr-2" />
          View Tutorial
        </Button>
        
        <Button onClick={() => {
          setPracticeModeEnabled(true);
          startGame();
        }} variant="outline" className="w-full">
          <Eye className="w-4 h-4 mr-2" />
          Practice Round (3 Questions)
        </Button>
        
        <Button onClick={() => {
          setPracticeModeEnabled(false);
          startGame();
        }} className="w-full">
          <BookOpen className="w-4 h-4 mr-2" />
          Start Full Game
        </Button>
      </div>
    </div>
  );
  
  // Render gameplay screen with enhanced visuals
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
            <Badge className="px-2 py-1" variant="outline">
              {currentIndex + 1}/{gameItems.length}
            </Badge>
            <Badge variant="outline" className="px-2 py-1 bg-blue-100">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
            {practiceModeEnabled && (
              <Badge variant="outline" className="px-2 py-1 bg-green-100">
                Practice
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {!practiceModeEnabled && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{score}</span>
              </div>
            )}
            <StreakIndicator streak={streak} />
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
          {isSpeedMode && (
            <div className="mb-2">
              <Progress value={(Date.now() - (startTime || 0)) / 100} className="h-1" />
            </div>
          )}
          
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Confidence Level {!practiceModeEnabled && "(Multiplies Points)"}
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
                {level}x {level > 1 && !practiceModeEnabled && "(Risk)"}
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
          
          {enableKeyboardShortcuts && (
            <div className="mt-2 flex justify-center">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="px-1.5 py-0.5 bg-secondary rounded">R</span>
                <span>Real</span>
                <span className="px-1.5 py-0.5 bg-secondary rounded">F</span>
                <span>Fake</span>
                <span className="px-1.5 py-0.5 bg-secondary rounded">1-3</span>
                <span>Confidence</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Render results screen with enhanced statistics
  const renderResultsScreen = () => {
    if (!gameStats) return <div>No game statistics available</div>;
    
    // Calculate letter grade based on accuracy
    const getGrade = (accuracy: number) => {
      if (accuracy >= 90) return 'A';
      if (accuracy >= 80) return 'B';
      if (accuracy >= 70) return 'C';
      if (accuracy >= 60) return 'D';
      return 'F';
    };
    
    const grade = getGrade(gameStats.accuracy);
    
    return (
      <div className="space-y-6">
        <div className="bg-secondary/20 p-4 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Game Complete!</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">{score} Points</p>
          <div className="inline-block py-1 px-3 rounded-full bg-blue-100 mb-4">
            Grade: {grade}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-xl font-bold">{gameStats.accuracy.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Correct</p>
              <p className="text-xl font-bold">{gameStats.correctAnswers}/{gameStats.totalAnswers}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Max Streak</p>
              <p className="text-xl font-bold">{gameStats.maxStreak}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg text-left">
            <h4 className="font-medium mb-2">Confidence Level Performance:</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {Object.entries(gameStats.confidenceLevels).map(([level, data]) => (
                <div key={level} className="bg-white p-2 rounded">
                  <div className="font-medium">{level}x Confidence</div>
                  <div>
                    {(data as ConfidenceLevelData).total > 0 
                      ? `${Math.round(((data as ConfidenceLevelData).correct / (data as ConfidenceLevelData).total) * 100)}% Correct`
                      : 'Not used'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => setGameState('setup')}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => {
              setPracticeModeEnabled(true);
              startGame();
            }}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            Practice Round
          </Button>
        </div>
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
        {showHelp ? renderHelpScreen() : renderGameContent()}
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
                  
                  <ChangesHighlighter
                    originalText={feedbackData.item.originalText || feedbackData.item.text}
                    modifiedText={feedbackData.item.text}
                    changes={feedbackData.item.changes || []}
                  />
                </div>
              )}
              
              {feedbackData?.isCorrect && feedbackData?.streak >= 3 && (
                <div className="bg-orange-50 p-2 rounded text-sm flex items-center">
                  <Trophy className="w-4 h-4 text-orange-500 mr-2" />
                  <span>Streak bonus activated! ({feedbackData.streak}x)</span>
                </div>
              )}
              
              {!practiceModeEnabled && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Points earned:</span>
                    <span className={`font-bold ${feedbackData?.pointsEarned >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {feedbackData?.pointsEarned > 0 ? '+' : ''}{feedbackData?.pointsEarned || 0}
                    </span>
                  </div>
                  {feedbackData?.timeTaken !== undefined && (
                    <div className="flex justify-between items-center text-sm">
                      <span>Response time:</span>
                      <span>{feedbackData.timeTaken.toFixed(1)}s</span>
                    </div>
                  )}
                </div>
              )}
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

// Main component for Highlight Detective Game
const HighlightDetectiveGame = ({ highlights = [] }: { highlights?: Highlight[] }) => {
  const [inputHighlights, setInputHighlights] = useState('');
  const [processedHighlights, setProcessedHighlights] = useState<Highlight[]>([]);
  const [showGame, setShowGame] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  
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
        {showInstructions && (
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Welcome to Highlight Detective!
            </h3>
            <p className="mb-4">
              Test your knowledge of book and podcast highlights by identifying which are real and which are cleverly disguised imposters.
            </p>
            
            <div className="grid grid-cols-3 gap-2 text-sm mb-4">
              <div className="bg-blue-50 p-2 rounded flex flex-col items-center">
                <Eye className="w-6 h-6 mb-1 text-blue-500" />
                <span className="text-center">Spot subtle differences in text</span>
              </div>
              <div className="bg-green-50 p-2 rounded flex flex-col items-center">
                <Brain className="w-6 h-6 mb-1 text-green-500" />
                <span className="text-center">Test your knowledge recall</span>
              </div>
              <div className="bg-purple-50 p-2 rounded flex flex-col items-center">
                <TrendingUp className="w-6 h-6 mb-1 text-purple-500" />
                <span className="text-center">Improve critical reading skills</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowInstructions(false)}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        )}
        
        {!showInstructions && (
          <>
            <div className="space-y-2">
              <Label htmlFor="highlights">Paste Your Highlights (Optional)</Label>
              <Textarea
                id="highlights"
                placeholder="Paste your highlights here, one per line..."
                className="h-40"
                value={inputHighlights}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputHighlights(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Leave blank to use sample highlights for demonstration.
              </p>
            </div>
            
            <Button onClick={processInput} className="w-full">
              Start Game
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HighlightDetectiveGame;