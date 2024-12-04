"use client";
import { useState, useEffect } from 'react';

export default function ProgressTracker() {
  const [progress, setProgress] = useState({
    workoutsCompleted: 15,
    currentStreak: 3,
    totalMinutes: 450,
    weeklyGoal: 5,
    achievements: [
      "First Workout Completed! ",
      "3-Day Streak Achieved! ",
      "Completed 10 Workouts! "
    ]
  });

  // Mock data - In a real app, this would come from a database
  const mockProgress = {
    weeklyWorkouts: [3, 4, 5, 3, 4, 5, 4], // Last 7 weeks
    monthlyMinutes: [120, 180, 240, 200], // Last 4 months
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent mb-6">
        Progress Tracker
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-3xl font-bold text-white mb-1">{progress.workoutsCompleted}</div>
          <div className="text-sm text-gray-400">Workouts Completed</div>
        </div>
        <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-3xl font-bold text-white mb-1">{progress.currentStreak}</div>
          <div className="text-sm text-gray-400">Day Streak</div>
        </div>
        <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-3xl font-bold text-white mb-1">{progress.totalMinutes}</div>
          <div className="text-sm text-gray-400">Total Minutes</div>
        </div>
        <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-3xl font-bold text-white mb-1">
            {`${Math.round((progress.workoutsCompleted / progress.weeklyGoal) * 100)}%`}
          </div>
          <div className="text-sm text-gray-400">Weekly Goal</div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <h3 className="text-xl font-semibold text-white mb-4">Weekly Progress</h3>
        <div className="flex justify-between items-end h-32 mt-4">
          {mockProgress.weeklyWorkouts.map((count, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-4/5 bg-gradient-to-t from-purple-600 to-purple-500 rounded-t transition-all duration-300 hover:opacity-80"
                style={{ height: `${(count / 7) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-400 mt-2">W{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Minutes Chart */}
      <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <h3 className="text-xl font-semibold text-white mb-4">Monthly Training Minutes</h3>
        <div className="flex justify-between items-end h-32 mt-4">
          {mockProgress.monthlyMinutes.map((minutes, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-4/5 bg-gradient-to-t from-purple-600 to-purple-500 rounded-t transition-all duration-300 hover:opacity-80"
                style={{ height: `${(minutes / 300) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-400 mt-2">M{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
        <div className="space-y-4">
          {progress.achievements.map((achievement, index) => (
            <div
              key={index}
              className="glass rounded-lg p-4 group hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-xl">
                  {achievement.includes('Streak') ? '🔥' : achievement.includes('Workout') ? '💪' : '🏆'}
                </div>
                <div>
                  <div className="font-medium text-white group-hover:text-purple-300 transition-colors">{achievement}</div>
                  <div className="text-xs text-gray-400">Keep up the great work!</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <div className="text-lg text-purple-300 italic text-center">
          "Success is not final, failure is not fatal: it is the courage to continue that counts."
        </div>
        <div className="text-sm text-gray-400 text-center mt-2">- Winston Churchill</div>
      </div>
    </div>
  );
}
