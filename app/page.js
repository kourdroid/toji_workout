"use client";
import { useState } from 'react';
import WorkoutCalendar from './components/WorkoutCalendar';
import ExerciseLibrary from './components/ExerciseLibrary';
import WorkoutTimer from './components/WorkoutTimer';
import ProgressTracker from './components/ProgressTracker';
import TrainingLevel from './components/TrainingLevel';
import { ThemeToggle } from './components/ThemeToggle';
import { CalendarIcon, DumbbellIcon, TimerIcon, LineChartIcon, TrophyIcon } from './components/Icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calendar');

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <WorkoutCalendar />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'timer':
        return <WorkoutTimer />;
      case 'progress':
        return <ProgressTracker />;
      case 'levels':
        return <TrainingLevel />;
      default:
        return <WorkoutCalendar />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="px-4 py-4">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
            Toji Workout
          </h1>
        </div>
      </header>

      <ThemeToggle />

      {/* Main Content */}
      <div className="p-4">
        <div className="glass rounded-3xl">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass">
        <div className="flex justify-around items-center p-4">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`p-3 rounded-xl transition-all duration-300 ${
              activeTab === 'calendar'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <CalendarIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`p-3 rounded-xl transition-all duration-300 ${
              activeTab === 'exercises'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <DumbbellIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('timer')}
            className={`p-3 rounded-xl transition-all duration-300 ${
              activeTab === 'timer'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <TimerIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`p-3 rounded-xl transition-all duration-300 ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <LineChartIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('levels')}
            className={`p-3 rounded-xl transition-all duration-300 ${
              activeTab === 'levels'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <TrophyIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </main>
  );
}
