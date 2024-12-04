"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Dumbbell, Calendar, TrendingUp, Award } from 'lucide-react';

const mockUserData = {
  name: "Toji's Disciple",
  level: 7,
  experience: 2800,
  nextLevelXp: 3000,
  streak: 15,
  totalWorkouts: 45,
  achievements: [
    { id: 1, name: "First Blood", description: "Complete your first workout", earned: true },
    { id: 2, name: "Consistency", description: "Complete 7 workouts in a row", earned: true },
    { id: 3, name: "Master", description: "Complete all beginner workouts", earned: false },
  ],
  stats: {
    thisWeek: 4,
    thisMonth: 18,
    avgWorkoutLength: 45,
    favoriteExercise: "Pull-ups",
    totalTime: 2160,
  },
  goals: [
    { id: 1, name: "Weekly Workouts", current: 4, target: 5 },
    { id: 2, name: "Monthly Time", current: 720, target: 1200 },
    { id: 3, name: "Push-ups", current: 25, target: 50 },
  ]
};

const UserProfile = () => {
  const [userData] = useState(mockUserData);

  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const calculateLevel = (xp) => {
    const progress = (userData.experience / userData.nextLevelXp) * 100;
    return Math.floor(progress);
  };

  return (
    <div className="h-[calc(100vh-8rem)] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 overflow-y-auto custom-scrollbar">
      {/* Left Column - Profile Overview */}
      <div className="md:col-span-4 space-y-4 md:space-y-6">
        {/* Profile Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-3xl md:text-4xl">🥋</span>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold">{userData.name}</h2>
              <p className="text-sm md:text-base text-muted-foreground">Level {userData.level} Warrior</p>
            </div>

            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {userData.level}</span>
                <span>{userData.experience}/{userData.nextLevelXp} XP</span>
              </div>
              <Progress value={calculateLevel()} className="h-1.5 md:h-2 bg-blue-500/20" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="text-center p-2 md:p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-blue-500" />
                <div className="text-xl md:text-2xl font-bold">{userData.streak}</div>
                <div className="text-[10px] md:text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center p-2 md:p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <Dumbbell className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-blue-500" />
                <div className="text-xl md:text-2xl font-bold">{userData.totalWorkouts}</div>
                <div className="text-[10px] md:text-xs text-muted-foreground">Workouts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Card */}
        <Card className="border-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">Goals</CardTitle>
              <Target className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            {userData.goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.name}</span>
                  <span>{goal.current}/{goal.target}</span>
                </div>
                <Progress value={calculateProgress(goal.current, goal.target)} className="h-1.5 md:h-2 bg-blue-500/20" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Stats & Achievements */}
      <div className="md:col-span-8 space-y-4 md:space-y-6">
        {/* Stats Card */}
        <Card className="border-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">Statistics</CardTitle>
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">This Week</p>
                <p className="text-xl md:text-2xl font-bold">{userData.stats.thisWeek}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Workouts</p>
              </div>
              <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-xl md:text-2xl font-bold">{userData.stats.thisMonth}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Workouts</p>
              </div>
              <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Avg. Length</p>
                <p className="text-xl md:text-2xl font-bold">{userData.stats.avgWorkoutLength}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Minutes</p>
              </div>
              <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Time</p>
                <p className="text-xl md:text-2xl font-bold">{Math.floor(userData.stats.totalTime / 60)}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Card */}
        <Card className="border-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">Achievements</CardTitle>
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:gap-4">
              {userData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-blue-500/5 transition-colors"
                >
                  <div
                    className={`p-2 rounded-full ${
                      achievement.earned
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Award className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base">{achievement.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Trophy className="w-4 h-4 md:w-5 md:h-5 text-blue-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
