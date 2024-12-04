"use client";
import { useState, useEffect } from 'react';

export default function WorkoutTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workoutType, setWorkoutType] = useState('work');

  const presetTimes = {
    work: [30, 60, 90, 120],
    rest: [15, 30, 45, 60]
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
      const audio = new Audio('/timer-end.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (seconds) => {
    setTimeLeft(seconds);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const progress = timeLeft > 0 ? (timeLeft / (presetTimes[workoutType][3])) * 100 : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
        Workout Timer
      </h2>
      
      {/* Timer Display */}
      <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-white/5"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-purple-500"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 text-transparent bg-clip-text">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Timer Type Selection */}
        <div className="glass rounded-lg p-1">
          <div className="flex gap-2">
            <button
              onClick={() => setWorkoutType('work')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                workoutType === 'work'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:bg-purple-500/10 hover:text-purple-300'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => setWorkoutType('rest')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                workoutType === 'rest'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:bg-purple-500/10 hover:text-purple-300'
              }`}
            >
              Rest
            </button>
          </div>
        </div>
      </div>

      {/* Preset Times */}
      <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
        <div className="grid grid-cols-2 gap-3">
          {presetTimes[workoutType].map((seconds) => (
            <button
              key={seconds}
              onClick={() => startTimer(seconds)}
              className="py-3 px-4 rounded-lg glass-card hover:bg-purple-500/10 hover:text-purple-300 text-gray-300 transition-all duration-300 font-medium"
            >
              {formatTime(seconds)}
            </button>
          ))}
        </div>

        {/* Stop Button */}
        {isActive && (
          <button
            onClick={stopTimer}
            className="w-full mt-4 py-3 px-4 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 font-medium"
          >
            Stop Timer
          </button>
        )}
      </div>
    </div>
  );
}
