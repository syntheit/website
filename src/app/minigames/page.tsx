"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { ArrowLeft, Gamepad2, Target, Brain, Trophy, RotateCcw, Play, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
}

// Number Guessing Game Component
function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [range, setRange] = useState({ min: 1, max: 100 });

  const startNewGame = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameStarted(true);
    setRange({ min: 1, max: 100 });
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage("Please enter a valid number between 1 and 100!");
      return;
    }

    setAttempts(prev => prev + 1);

    if (guessNum === targetNumber) {
      setMessage(`🎉 Congratulations! You found it in ${attempts + 1} attempts!`);
      if (!bestScore || attempts + 1 < bestScore) {
        setBestScore(attempts + 1);
      }
      setGameStarted(false);
    } else if (guessNum < targetNumber) {
      setMessage("Too low! Try a higher number.");
      setRange(prev => ({ ...prev, min: Math.max(prev.min, guessNum + 1) }));
    } else {
      setMessage("Too high! Try a lower number.");
      setRange(prev => ({ ...prev, max: Math.min(prev.max, guessNum - 1) }));
    }
    setGuess("");
  };

  const getMessageColor = () => {
    if (message.includes('🎉')) return 'text-green-600 bg-green-500/10 border-green-500/20';
    if (message.includes('Too low')) return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
    if (message.includes('Too high')) return 'text-orange-600 bg-orange-500/10 border-orange-500/20';
    return 'text-red-600 bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="p-8 space-y-8 rounded-2xl border bg-card border-border">
      <div className="space-y-4 text-center">
        <div className="flex justify-center items-center mx-auto w-16 h-16 bg-gradient-to-br rounded-full from-primary/20 to-accent/30">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-foreground">Number Guessing</h3>
        <p className="text-muted-foreground">Find the secret number between 1 and 100!</p>
        {bestScore && (
          <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-primary/10">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Best: {bestScore} attempts</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {!gameStarted ? (
          <Button onClick={startNewGame} className="w-full h-14 text-lg font-semibold" size="lg">
            <Play className="mr-3 w-5 h-5" />
            Start New Game
          </Button>
        ) : (
          <div className="space-y-6">
            {/* Range Indicator */}
            <div className="p-4 rounded-xl bg-muted/30">
              <div className="mb-2 text-sm text-center text-muted-foreground">Possible Range</div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-blue-600">{range.min}</span>
                <div className="overflow-hidden flex-1 mx-4 h-1 rounded-full bg-border">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${((range.max - range.min) / 99) * 100}%` }}
                  />
                </div>
                <span className="text-orange-600">{range.max}</span>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Enter your guess..."
                  className="flex-1 px-6 py-4 text-lg rounded-xl border transition-all border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                  min="1"
                  max="100"
                />
                <Button onClick={handleGuess} size="lg" className="px-8 py-4 text-lg">
                  Guess
                </Button>
              </div>
              
              <div className="space-y-3 text-center">
                <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-muted/50">
                  <span className="text-sm text-muted-foreground">Attempts:</span>
                  <span className="font-bold text-primary">{attempts}</span>
                </div>
                
                {message && (
                  <div className={`p-4 rounded-xl border transition-all duration-300 ${getMessageColor()}`}>
                    <div className="font-medium">{message}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Memory Game Component
function MemoryGame() {
  const [cards, setCards] = useState<Array<{ id: number; value: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [, setCurrentEmojis] = useState<string[]>([]);

  // Large pool of emojis to choose from
  const emojiPool = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🍄', '🐚', '🪨', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '💫', '⭐', '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '💧', '☔', '☂️', '🌊', '🌫️', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '🫖', '☕', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍷', '🥂', '🥃', '🍸', '🍹', '🧉', '🍾', '🥄', '🍴', '🍽️', '🥄', '🔪', '🏺', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🥤', '🧃', '🍵', '☕', '🫖', '🥛', '🍼', '🧋', '🍶', '🍯', '🥜', '🌰', '🍪', '🍿', '🍫', '🍬', '🍭', '🍮', '🎂', '🍰', '🧁', '🥧', '🍦', '🍨', '🍧', '🍡', '🍢', '🥮', '🥠', '🍥', '🍘', '🍚', '🍙', '🍤', '🦪', '🥟', '🍱', '🍣', '🍛', '🍲', '🍜', '🍝', '🥫', '🫕', '🥘', '🥗', '🫔', '🌯', '🌮', '🧆', '🥙', '🥪', '🫓', '🍕', '🍟', '🍔', '🌭', '🦴', '🍖', '🍗', '🥩', '🥓', '🧇', '🥞', '🧈', '🍳', '🥚', '🧀', '🥨', '🥖', '🍞', '🥯', '🥐', '🍠', '🥔', '🧅', '🧄', '🫒', '🥕', '🌽', '🫑', '🌶️', '🥒', '🥬', '🥦', '🥑', '🍆', '🍅', '🥝', '🥥', '🍍', '🥭', '🍑', '🍒', '🍈', '🫐', '🍓', '🍇', '🍉', '🍌', '🍋', '🍊', '🍐', '🍎', '🍏', '🌫️', '🌊', '☂️', '☔', '💧', '🌨️', '🌩️', '⛈️', '🌧️', '🌦️', '☁️', '🌥️', '⛅', '🌤️', '☀️', '🌈', '🌪️', '🔥', '💥', '☄️', '⚡', '✨', '🌟', '⭐', '💫', '🌏', '🌍', '🌎', '🌙', '🌔', '🌓', '🌒', '🌑', '🌘', '🌗', '🌖', '🌕', '🌚', '🌜', '🌛', '🌝', '🌞', '🌻', '🌼', '🌸', '🌺', '🥀', '🌹', '🌷', '💐', '🌾', '🪨', '🐚', '🍄', '🍁', '🍂', '🍃', '🎋', '🪴', '🎍', '🍀', '☘️', '🌿', '🌱', '🪵', '🌴', '🌳', '🌲', '🎄', '🌵', '🐲', '🐉', '🦔', '🐿️', '🐀', '🐁', '🦥', '🦦', '🦫', '🦡', '🦨', '🦝', '🐇', '🕊️', '🦩', '🦢', '🦜', '🦚', '🦃', '🐓', '🐈‍⬛', '🐈', '🐕‍🦺', '🦮', '🐩', '🐕', '🦌', '🐐', '🦙', '🐑', '🐏', '🐖', '🐎', '🐄', '🐂', '🐃', '🦘', '🦒', '🐫', '🐪', '🦏', '🦛', '🐘', '🦧', '🦍', '🦓', '🐆', '🐅', '🐊', '🦈', '🐋', '🐳', '🐬', '🐟', '🐠', '🐡', '🦀', '🦞', '🦐', '🦑', '🐙', '🦕', '🦖', '🦎', '🐍', '🐢', '🦂', '🕸️', '🕷️', '🦗', '🦟', '🐜', '🐞', '🐌', '🦋', '🐛', '🐝', '🦄', '🐴', '🐗', '🐺', '🦇', '🦉', '🦅', '🦆', '🐤', '🐦', '🐧', '🐔', '🐵', '🐸', '🐷', '🐮', '🦁', '🐯', '🐨', '🐼', '🐻', '🦊', '🐰', '🐹', '🐭', '🐱', '🐶'
  ];

  const initializeGame = () => {
    // Randomly select 8 unique emojis from the pool
    const shuffledPool = [...emojiPool].sort(() => Math.random() - 0.5);
    const selectedEmojis = shuffledPool.slice(0, 8);
    setCurrentEmojis(selectedEmojis);
    
    const gameCards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false
      }));
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    // Prevent clicking if we already have 2 cards flipped
    if (flippedCards.length >= 2) return;

    const newCards = [...cards];
    const cardToFlip = newCards.find(c => c.id === cardId);
    if (cardToFlip) {
      cardToFlip.flipped = true;
      setCards(newCards);

      const newFlippedCards = [...flippedCards, cardId];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setMoves(prev => prev + 1);
        const [first, second] = newFlippedCards;
        
        const firstCard = cards.find(c => c.id === first);
        const secondCard = cards.find(c => c.id === second);
        
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          // Match found
          const firstCardToUpdate = newCards.find(c => c.id === first);
          const secondCardToUpdate = newCards.find(c => c.id === second);
          if (firstCardToUpdate && secondCardToUpdate) {
            firstCardToUpdate.matched = true;
            secondCardToUpdate.matched = true;
            setCards(newCards);
            setFlippedCards([]);
          }
        } else {
          // No match, flip back after delay
          setTimeout(() => {
            setCards(prev => prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, flipped: false }
                : card
            ));
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

  const isGameComplete = cards.length > 0 && cards.every(card => card.matched);

  return (
    <div className="p-8 space-y-8 rounded-2xl border bg-card border-border">
      <div className="space-y-4 text-center">
        <h3 className="text-3xl font-bold text-foreground">Memory Game</h3>
        <p className="text-muted-foreground">Find matching pairs of emojis!</p>
        {gameStarted && (
          <div className="text-sm font-medium text-primary">
            Moves: {moves}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {!gameStarted ? (
          <Button onClick={initializeGame} className="w-full h-14 text-lg font-semibold" size="lg">
            <Play className="mr-3 w-5 h-5" />
            Start New Game
          </Button>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4 mx-auto max-w-sm">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-3xl ${
                    card.matched
                      ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/20'
                      : card.flipped
                      ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                      : 'bg-muted border-border hover:bg-muted/80 hover:scale-105'
                  }`}
                >
                  {(card.flipped || card.matched) ? card.value : '❓'}
                </button>
              ))}
            </div>
            
            {isGameComplete && (
              <div className="mx-auto max-w-md">
                <div className="p-6 space-y-4 bg-gradient-to-br rounded-2xl border from-green-500/10 to-emerald-500/10 border-green-500/20">
                  <div className="space-y-3 text-center">
                    <div className="text-4xl">🎉</div>
                    <div className="text-xl font-bold text-green-600">Congratulations!</div>
                    <div className="text-sm text-green-600/80">You completed the game in {moves} moves!</div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={initializeGame} 
                      className="flex-1 h-12 text-base font-semibold"
                      size="lg"
                    >
                      <RotateCcw className="mr-2 w-4 h-4" />
                      Play Again
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Quick Math Game Component
function QuickMathGame() {
  const [currentProblem, setCurrentProblem] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  const generateProblem = () => {
    let num1, num2, operator, answer;
    
    if (level <= 3) {
      // Addition and subtraction
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      operator = Math.random() < 0.5 ? '+' : '-';
      answer = operator === '+' ? num1 + num2 : num1 - num2;
    } else if (level <= 6) {
      // Multiplication
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      operator = '×';
      answer = num1 * num2;
    } else {
      // Division
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = Math.floor(Math.random() * 12) + 1;
      num1 = num2 * answer;
      operator = '÷';
    }

    setCurrentProblem(`${num1} ${operator} ${num2}`);
    setCorrectAnswer(answer);
    setUserAnswer("");
    setMessage("");
  };

  const startNewGame = () => {
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(15);
    setIsPlaying(true);
    setGameOver(false);
    setMessage("");
    generateProblem();
  };

  const handleAnswer = () => {
    const userNum = parseInt(userAnswer);
    if (isNaN(userNum)) {
      setMessage("❌ Please enter a valid number!");
      return;
    }

    if (userNum === correctAnswer) {
      const timeBonus = Math.max(5, timeLeft);
      const streakBonus = Math.floor(streak / 3) * 5;
      const points = 10 + timeBonus + streakBonus;
      
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setMessage(`🎉 Correct! +${points} points (${timeBonus}s bonus + ${streakBonus} streak)`);
      
      // Level up every 5 correct answers
      if ((score + points) % 50 === 0) {
        setLevel(prev => prev + 1);
        setTimeLeft(prev => Math.min(prev + 3, 20)); // Bonus time for level up
      }
      
      setTimeout(() => {
        generateProblem();
        setMessage("");
      }, 1500);
    } else {
      setStreak(0);
      setMessage(`❌ Wrong! The answer was ${correctAnswer}`);
      setTimeLeft(prev => Math.max(0, prev - 2)); // Penalty
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            setGameOver(true);
            if (score > bestScore) {
              setBestScore(score);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, score, bestScore]);

  const getMessageColor = () => {
    if (message.includes('🎉')) return 'text-green-600 bg-green-500/10 border-green-500/20';
    if (message.includes('❌')) return 'text-red-600 bg-red-500/10 border-red-500/20';
    return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
  };

  const getOperatorColor = () => {
    if (currentProblem.includes('+')) return 'text-green-600';
    if (currentProblem.includes('-')) return 'text-red-600';
    if (currentProblem.includes('×')) return 'text-blue-600';
    if (currentProblem.includes('÷')) return 'text-purple-600';
    return 'text-foreground';
  };

  return (
    <div className="p-8 space-y-8 rounded-2xl border bg-card border-border">
      <div className="space-y-4 text-center">
        <div className="flex justify-center items-center mx-auto w-16 h-16 bg-gradient-to-br rounded-full from-primary/20 to-accent/30">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-foreground">Quick Math</h3>
        <p className="text-muted-foreground">Solve math problems as fast as you can!</p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-primary/10">
            <span className="text-sm font-medium text-primary">Level: {level}</span>
          </div>
          <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-primary/10">
            <span className="text-sm font-medium text-primary">Score: {score}</span>
          </div>
          <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-green-500/10">
            <span className="text-sm font-medium text-green-600">Streak: {streak}</span>
          </div>
          <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-orange-500/10">
            <span className="text-sm font-medium text-orange-600">Time: {timeLeft}s</span>
          </div>
          {bestScore > 0 && (
            <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-primary/10">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Best: {bestScore}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {!isPlaying && !gameOver ? (
          <Button onClick={startNewGame} className="w-full h-14 text-lg font-semibold" size="lg">
            <Play className="mr-3 w-5 h-5" />
            Start Game
          </Button>
        ) : (
          <div className="space-y-6">
            {/* Math Problem Display */}
            <div className="space-y-4 text-center">
              <div className="p-8 rounded-xl bg-muted/30">
                <div className="mb-4 text-sm text-muted-foreground">Solve This Problem</div>
                <div className={`text-6xl font-bold tracking-wider ${getOperatorColor()}`}>
                  {currentProblem}
                </div>
                <div className="mt-2 text-2xl text-muted-foreground">= ?</div>
              </div>
              
              {/* Difficulty Indicator */}
              <div className="p-4 rounded-xl border bg-blue-500/10 border-blue-500/20">
                <div className="mb-1 text-sm font-medium text-blue-600">📊 Difficulty</div>
                <div className="text-blue-700">
                  {level <= 3 ? 'Addition & Subtraction' : 
                   level <= 6 ? 'Multiplication' : 'Division'}
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="flex-1 px-6 py-4 text-lg text-center rounded-xl border transition-all border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnswer()}
                />
                <Button onClick={handleAnswer} size="lg" className="px-8 py-4 text-lg">
                  Submit
                </Button>
              </div>
              
              {message && (
                <div className={`p-4 text-center rounded-xl border ${getMessageColor()}`}>
                  <div className="font-medium">{message}</div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Time Remaining</span>
                <span>{timeLeft}s</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div 
                  className="h-2 bg-gradient-to-r from-green-500 to-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="p-6 space-y-4 text-center rounded-xl border bg-red-500/10 border-red-500/20">
            <div className="text-2xl font-bold text-red-600">Time&apos;s Up!</div>
            <div className="text-muted-foreground">
              Final Score: {score} | Level Reached: {level} | Best Streak: {streak}
            </div>
            <Button onClick={startNewGame} size="lg">
              <RotateCcw className="mr-2 w-4 h-4" />
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const games: Game[] = [
  {
    id: "number-guessing",
    name: "Number Guessing",
    description: "Guess the number between 1 and 100",
    icon: Target,
    component: NumberGuessingGame
  },
  {
    id: "memory",
    name: "Memory Game",
    description: "Find matching pairs of emojis",
    icon: Brain,
    component: MemoryGame
  },
  {
    id: "quick-math",
    name: "Quick Math",
    description: "Solve math problems against the clock",
    icon: Target,
    component: QuickMathGame
  },
  {
    id: "colorguessr",
    name: "ColorGuessr",
    description: "Can you guess the hex/rgb of a color just by looking at it?",
    icon: Palette,
    component: () => null
  }
];

export default function MinigamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const selectedGameData = games.find(game => game.id === selectedGame);
  const GameComponent = selectedGameData?.component;

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="px-4 pb-6 sm:px-8 md:px-12">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto space-y-12 max-w-7xl">
          {/* Hero Section */}
          <div className="space-y-6 text-center">
            <div className="flex justify-center items-center mx-auto w-32 h-32 bg-gradient-to-br rounded-full border from-primary/20 to-accent/30 border-border/30">
              <Gamepad2 className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black md:text-5xl text-foreground">
                <span className="text-primary">Mini</span>games
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Take a break and enjoy some fun mini-games! Test your skills, challenge your mind, 
                and have some fun with these interactive games.
              </p>
            </div>
          </div>

          {/* Game Selection */}
          {!selectedGame ? (
            <div className="space-y-6">
              <h2 className="flex text-2xl font-bold text-center text-foreground">Choose a Game</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {games.map(({icon, id, name, description}) => {
                  const Icon = icon;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        if (id === "colorguessr") {
                          window.open('https://colorguessr.matv.io', '_blank', 'noopener,noreferrer');
                        } else {
                          setSelectedGame(id);
                        }
                      }}
                      className="p-6 space-y-4 text-left rounded-2xl border transition-colors duration-200 bg-card border-border hover:bg-card/80 group cursor-pointer"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="flex justify-center items-center w-12 h-12 rounded-full transition-colors duration-200 bg-primary/20 group-hover:bg-primary/30">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
                          <div className="relative">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedGame(null)}
                className="absolute top-0 left-0 z-10 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Games
              </Button>
              <h2 className="text-2xl font-bold text-center text-foreground">{selectedGameData?.name}</h2>
            </div>
              
              {GameComponent && <GameComponent />}
            </div>
          )}

        </div>
      </div>
    </main>
  );
} 