"use client";
import { useState, useEffect } from 'react';
import WorkoutCalendar from './components/WorkoutCalendar';
import ExerciseLibrary from './components/ExerciseLibrary';
import WorkoutTimer from './components/WorkoutTimer';
import ProgressTracker from './components/ProgressTracker';
import TrainingLevel from './components/TrainingLevel';
import UserProfile from './components/UserProfile';
import { Calendar, Dumbbell, Timer, LineChart, Trophy, User } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (newTab) => {
    setIsTransitioning(true);
    setActiveTab(newTab);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const renderContent = () => {
    const content = (() => {
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
        case 'profile':
          return <UserProfile />;
        default:
          return <WorkoutCalendar />;
      }
    })();

    return (
      <div
        className={`transition-all duration-300 ${
          isTransitioning
            ? 'opacity-0 transform translate-y-4'
            : 'opacity-100 transform translate-y-0'
        }`}
      >
        <div className="glass-card p-6">
          {content}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10">
        <div className="bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-2xl border-b border-white/5">
          <div className="container mx-auto">
            <div className="px-4 py-3 flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 shadow-lg shadow-purple-500/20 logo-container animate-gradient transform hover:scale-105 transition-all duration-300">
                    <span className="text-2xl font-bold text-white">T</span>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full animate-pulse shadow-lg shadow-red-500/20"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-40 transition duration-200"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    Toji Workout
                  </h1>
                  <p className="text-xs text-gray-400">Unleash Your Inner Strength</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-white/90 hover:text-purple-400 transition-colors text-sm font-medium">Dashboard</a>
                <a href="#" className="text-white/90 hover:text-purple-400 transition-colors text-sm font-medium">Workouts</a>
                <a href="#" className="text-white/90 hover:text-purple-400 transition-colors text-sm font-medium">Progress</a>
                <a href="#" className="text-white/90 hover:text-purple-400 transition-colors text-sm font-medium">Community</a>
              </nav>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <button className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-sm font-semibold text-white/90">PRO</span>
                  </div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass z-10">
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-6 gap-1">
            <NavButton
              icon={<Calendar className="w-5 h-5" />}
              isActive={activeTab === 'calendar'}
              onClick={() => handleTabChange('calendar')}
            >
              Calendar
            </NavButton>
            <NavButton
              icon={<Dumbbell className="w-5 h-5" />}
              isActive={activeTab === 'exercises'}
              onClick={() => handleTabChange('exercises')}
            >
              Exercises
            </NavButton>
            <NavButton
              icon={<Timer className="w-5 h-5" />}
              isActive={activeTab === 'timer'}
              onClick={() => handleTabChange('timer')}
            >
              Timer
            </NavButton>
            <NavButton
              icon={<LineChart className="w-5 h-5" />}
              isActive={activeTab === 'progress'}
              onClick={() => handleTabChange('progress')}
            >
              Progress
            </NavButton>
            <NavButton
              icon={<Trophy className="w-5 h-5" />}
              isActive={activeTab === 'levels'}
              onClick={() => handleTabChange('levels')}
            >
              Levels
            </NavButton>
            <NavButton
              icon={<User className="w-5 h-5" />}
              isActive={activeTab === 'profile'}
              onClick={() => handleTabChange('profile')}
            >
              Profile
            </NavButton>
          </div>
        </div>
      </nav>
    </main>
  );
}

function NavButton({ icon, children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200
        ${isActive 
          ? 'text-primary bg-primary/10' 
          : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
        }`}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{children}</span>
    </button>
  );
}
