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
        <div className="lg:container mx-auto px-2">
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-[0]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        >
          <source src="/public.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
      
      {/* Main Content */}
      <main className="relative z-10">
        <div className=" mx-auto p-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
              Toji Fushiguro Training
            </h1>
            <p className="text-muted-foreground">
              Train like the strongest sorcerer killer
            </p>
          </div>

          {/* Content */}
          <div className="relative">
            <div
              className={`transition-all duration-300 ${
                isTransitioning
                  ? 'opacity-0 transform translate-y-4'
                  : 'opacity-100 transform translate-y-0'
              }`}
            >
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around py-2">
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
                icon={Trophy}
                isActive={activeTab === 'levels'}
                onClick={() => handleTabChange('levels')}
              >
                Level
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
      </main>
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
