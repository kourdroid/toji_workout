"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const workoutSchedules = {
  beginner: {
    grade: '3',
    workouts: {
      monday: {
        title: 'Back Day',
        exercises: [
          "3 x 1-5 Fast pull-ups",
          "3 x 8-10 Explosive rows",
          "3 x 10-20s Towel Hangs",
          "3 x 30-60s Dead hangs"
        ]
      },
      tuesday: {
        title: 'Explosive Chest Day',
        exercises: [
          "3 x 6-8 Explosive Pushups",
          "3 x 8-10 Switch grip pushups",
          "3 x 8-12 Pike pushups",
          "3 x 15-30s Wall handstand hold"
        ]
      },
      wednesday: {
        title: 'Leg Day',
        exercises: [
          "3 x 6-8 Single leg hop per leg",
          "3 x 8-10 Lateral Heiden",
          "3 x 8-10 Box step-ups",
          "3 x 10-15 Body squat + hold"
        ]
      },
      thursday: {
        title: 'Rest Day',
        exercises: [
          "Active Recovery",
          "Light Stretching",
          "Mobility Work",
          "Stay Hydrated!"
        ]
      },
      friday: {
        title: 'Biceps Day',
        exercises: [
          "3 x 5-8 One arm rows per arm",
          "3 x 8-10 Supinated rows",
          "3 x 8-10 Bicep curls",
          "3 x 30-60s Dead hangs"
        ]
      },
      saturday: {
        title: 'Triceps Day',
        exercises: [
          "3 x 6-8 per arm Bent arm archer pushups",
          "3 x 8-10 Diamond pushups",
          "3 x 10-15s Planche leans",
          "3 x 6-8 Sphinx pushups"
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
        title: 'Back Day',
        exercises: [
          "3 x 4-6 Chest-to-bar pull-ups",
          "3 x 8-10 Wide pullups",
          "3 x 5-8 Towel pull-ups",
          "3 x 8-10s Single arm dead hangs"
        ]
      },
      tuesday: {
        title: 'Explosive Chest Day',
        exercises: [
          "3 x 6-8 Explosive Pushups",
          "3 x 8-10 Switch grip pushups",
          "3 x 8-12 Pike pushups",
          "3 x 15-30s Wall handstand hold"
        ]
      },
      wednesday: {
        title: 'Leg Day',
        exercises: [
          "3 x 8-10 Single leg hop per leg",
          "3 x 10-12 Lateral Heiden",
          "3 x 8-10 Shrimp squats",
          "3 x 8-10 Reverse nordic curls"
        ]
      },
      thursday: {
        title: 'Rest Day',
        exercises: [
          "Active Recovery",
          "Mobility Work",
          "Light Cardio",
          "Stay Hydrated!"
        ]
      },
      friday: {
        title: 'Biceps Day',
        exercises: [
          "3 x 3-6 Assisted one arm chin-ups",
          "3 x 8-10 Close grip chin-ups",
          "3 x 10-15 Supinated rows",
          "3 x 8-10s False grip hangs"
        ]
      },
      saturday: {
        title: 'Triceps Day',
        exercises: [
          "3 x 10-15 arm Archer pushups",
          "3 x 8-12 Decline diamond pushups",
          "3 x 8-10 pseudo-planche pushups",
          "3 x 8-10 Sphinx pushups"
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
        title: 'Back Day',
        exercises: [
          "3 x 5-7 Waist-to-bar pull-ups",
          "3 x 8-10 Front lever raises",
          "3 x 8-10 Towel pull-ups",
          "3 x 10-15 Single arm dead hangs"
        ]
      },
      tuesday: {
        title: 'Explosive Chest Day',
        exercises: [
          "3 x 3-5 Wall handstand pushups",
          "3 x 10-16 Dynamic Explosive Pushups",
          "3 x 10-16 Explosive switch grip pushups",
          "3 x 3-5 Wall walks"
        ]
      },
      wednesday: {
        title: 'Leg Day',
        exercises: [
          "3 x 10-12 Single leg hop",
          "3 x 12-14 Lateral Heiden",
          "3 x 10-12 Shrimp squats",
          "3 x 10-12 Sissy squats"
        ]
      },
      thursday: {
        title: 'Rest Day',
        exercises: [
          "Active Recovery",
          "Mobility Work",
          "Light Cardio",
          "Stay Hydrated!"
        ]
      },
      friday: {
        title: 'Biceps Day',
        exercises: [
          "3 x 1-2 One-arm chin-up negatives",
          "3 x 3-5 per arm Type writer pullups",
          "3 x 15-20 Supinated rows",
          "3 x 10-15s False grip hangs"
        ]
      },
      saturday: {
        title: 'Triceps Day',
        exercises: [
          "3 x 3-5 One-arm pushups",
          "3 x 6-10 planche to 90-degree",
          "3 x 10-15 Decline diamond pushups",
          "3 x 10-15 Sphinx Pushups"
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
  }
};

const WorkoutCalendar = () => {
  // Convert JS getDay() (0 = Sunday) to our days array index (0 = Monday)
  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // Convert Sunday (0) to 6, and shift other days back by 1
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDayIndex());
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const currentWorkouts = workoutSchedules[selectedLevel].workouts;
  const currentDayWorkouts = currentWorkouts[days[selectedDay].toLowerCase()];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
          Weekly Workout Schedule
        </h2>
        <div className="flex items-center gap-2">
          {Object.keys(workoutSchedules).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-3 rounded-xl glass transition-all duration-300 ${
                selectedLevel === level 
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20' 
                : 'text-gray-400 hover:text-purple-300'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="capitalize text-base">{level}</span>
                <span className="text-sm opacity-75">Grade {workoutSchedules[level].grade}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Web Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Today's Workout - Left Side */}
        <div className="col-span-5">
          <div className="glass rounded-xl p-8 border-2 border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-purple-400">Today's Workout</h3>
                <p className="text-purple-300 mt-2 text-lg">{days[selectedDay]}</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{workoutSchedules[selectedLevel].grade}</span>
              </div>
            </div>
            
            <div className="glass rounded-lg p-6 mb-6">
              <h4 className="text-purple-400 font-semibold mb-4 text-xl">
                {currentWorkouts[days[selectedDay].toLowerCase()].title}
              </h4>
              <div className="space-y-3">
                {currentWorkouts[days[selectedDay].toLowerCase()].exercises.map((exercise, i) => (
                  <div 
                    key={i}
                    className="flex items-center space-x-4 p-4 rounded-lg glass group hover:bg-purple-500/10 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
                      {i + 1}
                    </div>
                    <span className="text-purple-300 text-lg">{exercise}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium text-lg">
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
                    <h4 className="font-medium text-lg text-gray-300 group-hover:text-purple-300 transition-colors">
                      {day}
                    </h4>
                    <div className="h-2 w-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-base text-purple-400 mb-3">{dayWorkouts.title}</p>
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

      {/* Mobile Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {days.map((day, index) => {
          const workoutKey = day.toLowerCase();
          const dayWorkouts = currentWorkouts[workoutKey];
          const isToday = index === selectedDay;
          
          return (
            <div 
              key={index} 
              className={`glass group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 ${
                isToday ? 'ring-2 ring-purple-500/50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className={`text-lg font-semibold ${
                    isToday ? 'text-purple-400' : 'text-white group-hover:text-purple-400'
                  } transition-colors`}>
                    {day}
                    {isToday && <span className="ml-2 text-sm text-purple-400">(Today)</span>}
                  </h3>
                </div>
                <div className={`h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 ${
                  isToday ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } transition-opacity`} />
              </div>

              <div className="text-sm text-gray-400 mb-4">{dayWorkouts.title}</div>

              <div className="space-y-3">
                {dayWorkouts.exercises.map((exercise, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      isToday ? 'bg-purple-500/5' : ''
                    } hover:bg-white/5 transition-colors group/exercise`}
                  >
                    <span className={`text-sm ${
                      isToday ? 'text-purple-300' : 'text-gray-300 group-hover/exercise:text-purple-300'
                    } transition-colors`}>
                      {exercise}
                    </span>
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500 opacity-0 group-hover/exercise:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              {isToday && (
                <div className="mt-4 pt-4 border-t border-purple-500/10">
                  <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    Start Workout
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutCalendar;
