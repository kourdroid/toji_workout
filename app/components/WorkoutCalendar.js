"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const NavButton = ({ icon: Icon, children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1 w-full py-2 px-1 rounded-lg transition-all duration-300 ${
        isActive
          ? 'text-blue-400'
          : 'text-gray-500 hover:text-blue-300'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium">{children}</span>
    </button>
  );
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const workoutSchedules = {
  beginner: {
    grade: '3',
    workouts: {
      monday: {
        title: 'Day 1: Push Power + Tactical Striking',
        exercises: [
          "Explosive Push-Ups: 3 x 6-8 reps",
          "Dips (Parallel Bars): 3 x 6-8 reps",
          "Advanced Shadowboxing: 3 x 1-minute rounds (light)",
          "Tire Flip + Shadowboxing: 3 flips, 3 rounds"
        ]
      },
      tuesday: {
        title: 'Day 2: Pull Strength + Grappling',
        exercises: [
          "Assisted Pull-Ups: 3 x 5 reps",
          "Dead Hangs: 3 x 15 seconds",
          "Grappling Simulation: 3 x 10 pulls",
          "Clinch Practice: 3 x 1 minute"
        ]
      },
      wednesday: {
        title: 'Day 3: Core Domination',
        exercises: [
          "Regular Plank: 3 x 20 seconds",
          "Tire Sit-Ups: 3 x 8 reps (to knees)",
          "Lateral Shuffles: 3 x 20 seconds",
          "Core Stability Work"
        ]
      },
      thursday: {
        title: 'Day 4: Push-Pull Combo',
        exercises: [
          "Push-Pull Superset: 3 x 6 push-ups + 6 inverted rows",
          "Counter-Combat Striking: 3 x 1-minute rounds",
          "Defensive Drills",
          "Light Technical Work"
        ]
      },
      friday: {
        title: 'Day 5: Tire Flipping + Sparring',
        exercises: [
          "Tire Flipping: 3 rounds of 5 flips",
          "Sparring Simulation: 3 x 1-minute drills",
          "Recovery Work",
          "Technique Practice"
        ]
      },
      saturday: {
        title: 'Recovery Day',
        exercises: [
          "Active Recovery",
          "Yoga/Stretching",
          "Mobility Work",
          "Mental Training"
        ]
      },
      sunday: {
        title: 'Rest Day',
        exercises: [
          "Full Rest",
          "Light Stretching",
          "Mental Recovery",
          "Prepare for Next Week"
        ]
      }
    }
  },
  intermediate: {
    grade: '2',
    workouts: {
      monday: {
        title: 'Day 1: Push Power + Tactical Striking',
        exercises: [
          "Explosive Push-Ups: 4 x 10 reps",
          "Dips (Parallel Bars): 4 x 10 reps",
          "Advanced Shadowboxing: 4 x 2-minute rounds",
          "Tire Flip + Shadowboxing: 5 flips, 4 rounds"
        ]
      },
      tuesday: {
        title: 'Day 2: Pull Strength + Grappling',
        exercises: [
          "Regular Pull-Ups: 3 x 8 reps",
          "Active Hangs: 3 x 30 seconds",
          "Grappling Simulation: 4 x 12 pulls",
          "Clinch Practice: 4 x 2 minutes"
        ]
      },
      wednesday: {
        title: 'Day 3: Core Domination',
        exercises: [
          "Shoulder Tap Plank: 3 x 30 seconds",
          "Tire Sit-Ups: 4 x 10 reps (to shoulder)",
          "Lateral Shuffles: 4 x 30 seconds",
          "Advanced Core Work"
        ]
      },
      thursday: {
        title: 'Day 4: Push-Pull Combo',
        exercises: [
          "Push-Pull Superset: 4 x 8 push-ups + 8 pull-ups",
          "Counter-Combat Striking: 4 x 2 minutes",
          "Advanced Defense",
          "Technical Combinations"
        ]
      },
      friday: {
        title: 'Day 5: Tire Flipping + Sparring',
        exercises: [
          "Tire Flipping: 4 rounds of 7 flips",
          "Sparring Simulation: 4 x 2 minutes",
          "Power Development",
          "Combat Conditioning"
        ]
      },
      saturday: {
        title: 'Recovery Day',
        exercises: [
          "Active Recovery",
          "Advanced Mobility",
          "Flexibility Work",
          "Mental Training"
        ]
      },
      sunday: {
        title: 'Rest Day',
        exercises: [
          "Full Rest",
          "Recovery",
          "Stretching",
          "Prepare for Next Week"
        ]
      }
    }
  },
  advanced: {
    grade: '1',
    workouts: {
      monday: {
        title: 'Day 1: Push Power + Tactical Striking',
        exercises: [
          "Explosive Push-Ups: 5 x 12 reps with clap/lateral jumps",
          "Dips: 5 x 12 reps (pause at bottom)",
          "Advanced Shadowboxing: 6 x 3-minute rounds",
          "Tire Flip + Shadowboxing: 7 flips, 5 rounds"
        ]
      },
      tuesday: {
        title: 'Day 2: Pull Strength + Grappling',
        exercises: [
          "Weighted Pull-Ups: 4 x 10 reps",
          "Towel Hangs: 4 x 45 seconds",
          "Grappling Simulation: 5 x 15 pulls",
          "Clinch Practice: 5 x 3 minutes"
        ]
      },
      wednesday: {
        title: 'Day 3: Core Domination',
        exercises: [
          "Weighted Plank: 4 x 40 seconds",
          "Tire Sit-Ups: 4 x 12 reps (overhead slam)",
          "Lateral Shuffles: 5 x 40 seconds",
          "Elite Core Training"
        ]
      },
      thursday: {
        title: 'Day 4: Push-Pull Combo',
        exercises: [
          "Push-Pull Superset: 5 x 10 explosive push-ups + 10 pull-ups",
          "Counter-Combat Striking: 6 x 3 minutes",
          "Elite Defense",
          "Complex Combinations"
        ]
      },
      friday: {
        title: 'Day 5: Tire Flipping + Sparring',
        exercises: [
          "Tire Flipping: 5 rounds of 10 flips",
          "Sparring Simulation: 5 x 3 minutes",
          "Maximum Power Output",
          "Elite Combat Conditioning"
        ]
      },
      saturday: {
        title: 'Recovery Day',
        exercises: [
          "Active Recovery",
          "Elite Mobility",
          "Advanced Flexibility",
          "Mental Conditioning"
        ]
      },
      sunday: {
        title: 'Rest Day',
        exercises: [
          "Full Rest",
          "Deep Recovery",
          "Mobility Work",
          "Next Week Preparation"
        ]
      }
    }
  },
  master: {
    grade: 'M',
    workouts: {
      monday: {
        title: 'Day 1: Push Power + Tactical Striking',
        exercises: [
          "Explosive Push-Ups: 6 x 15 reps (weighted vest)",
          "Dips: 5 x 15 reps (weighted)",
          "Advanced Shadowboxing: 8 x 3-minute rounds",
          "Tire Flip + Shadowboxing: 10 flips, 6 rounds"
        ]
      },
      tuesday: {
        title: 'Day 2: Pull Strength + Grappling',
        exercises: [
          "Explosive Pull-Ups: 5 x 12 reps (chest-to-bar)",
          "One-Arm Dead Hangs: 5 x 1 minute",
          "Grappling Simulation: 6 x 20 pulls",
          "Clinch Practice: 6 x 3 minutes"
        ]
      },
      wednesday: {
        title: 'Day 3: Core Domination',
        exercises: [
          "One-Arm Plank: 5 x 1 minute",
          "Tire Sit-Ups: 5 sets of max reps (1 min)",
          "Lateral Shuffles: 6 x 1 minute",
          "Master Core Training"
        ]
      },
      thursday: {
        title: 'Day 4: Push-Pull Combo',
        exercises: [
          "Push-Pull Superset: 6 x 12 one-arm push-ups + weighted pull-ups",
          "Counter-Combat Striking: 8 x 3 minutes",
          "Master Defense",
          "Elite Combinations"
        ]
      },
      friday: {
        title: 'Day 5: Tire Flipping + Sparring',
        exercises: [
          "Tire Flipping: 6 rounds of 12 flips",
          "Sparring Simulation: 8 x 3 minutes",
          "Peak Power Performance",
          "Master Combat Conditioning"
        ]
      },
      saturday: {
        title: 'Recovery Day',
        exercises: [
          "Active Recovery",
          "Master Mobility",
          "Elite Flexibility",
          "Mental Mastery"
        ]
      },
      sunday: {
        title: 'Rest Day',
        exercises: [
          "Full Rest",
          "Elite Recovery",
          "Mobility Mastery",
          "Next Week Strategy"
        ]
      }
    }
  }
};

const WorkoutCalendar = () => {
  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDayIndex());
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const currentWorkouts = workoutSchedules[selectedLevel].workouts;
  const currentDayWorkouts = currentWorkouts[days[selectedDay].toLowerCase()];

  const goToPreviousDay = () => {
    setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1));
  };

  const goToNextDay = () => {
    setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
          Weekly Workout Schedule
        </h2>
        <div className="flex items-center gap-3">
          {Object.keys(workoutSchedules).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`relative w-8 h-8 rounded-full transition-all flex items-center justify-center ${
                selectedLevel === level
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              title={level.charAt(0).toUpperCase() + level.slice(1)}
            >
              <span className="text-sm font-semibold">
                {workoutSchedules[level].grade}
              </span>
              {selectedLevel === level && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Week Overview */}
        <div className="glass rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-400">This Week</h3>
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              Grade {workoutSchedules[selectedLevel].grade}
            </Badge>
          </div>
          <div className="flex justify-between gap-1 mt-2">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(index)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedDay === index
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:bg-blue-500/10 hover:text-blue-300'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Current Workout */}
        <div className="glass rounded-xl p-4 mt-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {currentDayWorkouts.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{days[selectedDay]}</span>
                <span>•</span>
                <span className="capitalize">{selectedLevel}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {currentDayWorkouts.exercises.map((exercise, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <p className="text-sm text-gray-300">{exercise}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <button 
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg transition-colors font-medium text-base shadow-lg shadow-blue-500/20"
              onClick={() => {
                // TODO: Implement workout start functionality
                console.log('Starting workout for:', currentDayWorkouts.title);
              }}
            >
              Start Today's Workout
            </button>
          </div>
        </div>
      </div>

      {/* Web Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Today's Workout - Left Side */}
        <div className="col-span-5">
          <div className="glass rounded-xl p-8 border-2 border-blue-500/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-blue-400">Today's Workout</h3>
                <p className="text-blue-300 mt-2 text-lg">{days[selectedDay]}</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{workoutSchedules[selectedLevel].grade}</span>
              </div>
            </div>

            <div className="glass rounded-lg p-6 mb-6">
              <h4 className="text-blue-400 font-semibold mb-4 text-xl">
                {currentWorkouts[days[selectedDay].toLowerCase()].title}
              </h4>
              <div className="space-y-3">
                {currentWorkouts[days[selectedDay].toLowerCase()].exercises.map((exercise, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-4 rounded-lg glass group hover:bg-blue-500/10 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">
                      {i + 1}
                    </div>
                    <span className="text-blue-300 text-lg">{exercise}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-lg">
              Start Today's Workout
            </button>
          </div>
        </div>

        {/* Weekly Overview - Right Side */}
        <div className="col-span-7 glass rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">Weekly Overview</h3>
          <div className="grid grid-cols-2 gap-6">
            {days.map((day, index) => {
              if (index === selectedDay) return null; // Skip today as it's shown on the left
              const workoutKey = day.toLowerCase();
              const dayWorkouts = currentWorkouts[workoutKey];

              return (
                <div
                  key={index}
                  className="glass rounded-lg p-6 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-lg text-gray-300 group-hover:text-blue-300 transition-colors">
                      {day}
                    </h4>
                    <div className="h-2 w-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-base text-blue-400 mb-3">{dayWorkouts.title}</p>
                  <div className="space-y-2">
                    {dayWorkouts.exercises.map((exercise, i) => (
                      <div
                        key={i}
                        className="text-base text-gray-400 group-hover:text-gray-300 transition-colors py-1"
                      >
                        {exercise}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCalendar;
