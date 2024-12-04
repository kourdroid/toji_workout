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
          return <WorkoutTimer    />;
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
        <div className="mx-auto max-w-3xl px-2">
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <header className="sticky top-0 left-0 right-0 z-20">
        <div className="glass border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-3 flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl logo-container">
                    <span className="text-lg font-bold text-white">T</span>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold gradient-text">
                    Toji Workout
                  </h1>
                  <p className="text-sm text-gray-400">Unleash Your Inner Strength</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden glass-card">
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className={`transition-all duration-300 ${
          isTransitioning
            ? 'opacity-0 transform translate-y-4'
            : 'opacity-100 transform translate-y-0'
        }`}>
          {renderContent()}
        </div>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 glass mx-auto flex justify-center border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="grid grid-cols-5 gap-3">
            <NavButton
              icon={Calendar}
              isActive={activeTab === 'calendar'}
              onClick={() => handleTabChange('calendar')}
            >
              Calendar
            </NavButton>
            <NavButton
              icon={Dumbbell}
              isActive={activeTab === 'exercises'}
              onClick={() => handleTabChange('exercises')}
            >
              Exercises
            </NavButton>
            <NavButton
              icon={Timer}
              isActive={activeTab === 'timer'}
              onClick={() => handleTabChange('timer')}
            >
              Timer
            </NavButton>
            <NavButton
              icon={LineChart}
              isActive={activeTab === 'progress'}
              onClick={() => handleTabChange('progress')}
            >
              Progress
            </NavButton>
            
            <NavButton
              icon={User}
              isActive={activeTab === 'profile'}
              onClick={() => handleTabChange('profile')}
            >
              Profile
            </NavButton>
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon: Icon, children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`nav-button  ${isActive ? 'active' : ''} 
        ${isActive 
          ? 'text-primary' 
          : 'text-muted-foreground/80 hover:text-primary/90'
        }`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
      <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">
        {children}
      </span>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-primary/30" />
      )}
    </button>
  );
}
