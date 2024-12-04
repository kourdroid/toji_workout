"use client";

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from 'lucide-react';
import useTimerStore from '@/app/store/timerStore';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const FloatingTimer = () => {
  const { 
    time, 
    isRunning, 
    isWork, 
    currentRound, 
    totalRounds,
    startTimer, 
    pauseTimer, 
    resetTimer,
    tickTimer
  } = useTimerStore();

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tickTimer]);

  const getTimerColor = () => {
    if (!isRunning) return 'text-muted-foreground';
    return isWork ? 'text-blue-400' : 'text-cyan-400';
  };

  if (time === 0 && !isRunning) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-4 bg-background/80 backdrop-blur-lg border-primary/10">
        <div className="flex flex-col items-center space-y-2">
          <div className={`text-2xl font-bold tabular-nums ${getTimerColor()}`}>
            {formatTime(time)}
          </div>
          <div className="text-sm font-medium">
            <span className={isWork ? 'text-blue-400' : 'text-cyan-400'}>
              {isWork ? 'Work' : 'Rest'}
            </span>
            <span className="text-muted-foreground ml-2">
              Round {currentRound}/{totalRounds}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={resetTimer}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className={`w-8 h-8 ${
                isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={isRunning ? pauseTimer : startTimer}
            >
              {isRunning ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FloatingTimer;
