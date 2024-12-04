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
    <div className="h-[calc(100vh-8rem)] grid grid-cols-12 gap-6">
      {/* Left Column - Profile Overview */}
      <div className="col-span-4 space-y-6">
        {/* Profile Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🥋</span>
              </div>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground">Level {userData.level} Warrior</p>
            </div>

            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {userData.level}</span>
                <span>{userData.experience}/{userData.nextLevelXp} XP</span>
              </div>
              <Progress value={calculateLevel()} className="h-2" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-2xl font-bold">{userData.streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Dumbbell className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-2xl font-bold">{userData.totalWorkouts}</div>
                <div className="text-xs text-muted-foreground">Workouts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Goals</CardTitle>
              <Target className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.name}</span>
                  <span>{goal.current}/{goal.target}</span>
                </div>
                <Progress value={calculateProgress(goal.current, goal.target)} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Stats & Achievements */}
      <div className="col-span-8 space-y-6">
        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Statistics</CardTitle>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{userData.stats.thisWeek}</p>
                <p className="text-xs text-muted-foreground">workouts</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">{userData.stats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">workouts</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm text-muted-foreground">Avg. Duration</p>
                <p className="text-2xl font-bold">{userData.stats.avgWorkoutLength}</p>
                <p className="text-xs text-muted-foreground">minutes</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">{Math.round(userData.stats.totalTime / 60)}</p>
                <p className="text-xs text-muted-foreground">hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Achievements</CardTitle>
              <Trophy className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg ${
                    achievement.earned ? 'bg-primary/10' : 'bg-muted/50'
                  } relative overflow-hidden group transition-colors`}
                >
                  {achievement.earned && (
                    <div className="absolute top-0 right-0 p-2">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <h3 className={`font-semibold mb-1 ${
                    achievement.earned ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  {!achievement.earned && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Keep training!</span>
                    </div>
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
