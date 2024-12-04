"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Dumbbell,
  Flame,
  Calendar,
  Timer,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    workouts: 42,
    streak: 7,
    totalTime: "32h 15m",
    level: 8,
    xp: 75,
    achievements: [
      { name: "First Workout", description: "Complete your first workout", earned: true },
      { name: "Week Warrior", description: "Complete 7 workouts in a week", earned: true },
      { name: "Early Bird", description: "Complete a workout before 7 AM", earned: false },
      { name: "Night Owl", description: "Complete a workout after 10 PM", earned: true },
      { name: "Consistency King", description: "Maintain a 10-day streak", earned: false },
    ],
    recentWorkouts: [
      { date: "2024-01-15", name: "Upper Body Power", duration: "45m" },
      { date: "2024-01-14", name: "HIIT Cardio", duration: "30m" },
      { date: "2024-01-12", name: "Full Body Strength", duration: "60m" },
      { date: "2024-01-11", name: "Core Focus", duration: "25m" },
    ],
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-4xl">🥷</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Toji Fushiguro</h1>
              <p className="text-muted-foreground mb-4">Level {stats.level} Warrior</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <Progress value={stats.xp} className="h-2" />
                </div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{stats.workouts}</p>
                    <p className="text-xs text-muted-foreground">Workouts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{stats.streak}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Dumbbell className="h-8 w-8 mb-2 text-primary" />
            <p className="text-lg font-bold">{stats.workouts}</p>
            <p className="text-xs text-muted-foreground">Total Workouts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Flame className="h-8 w-8 mb-2 text-primary" />
            <p className="text-lg font-bold">{stats.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Timer className="h-8 w-8 mb-2 text-primary" />
            <p className="text-lg font-bold">{stats.totalTime}</p>
            <p className="text-xs text-muted-foreground">Total Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Target className="h-8 w-8 mb-2 text-primary" />
            <p className="text-lg font-bold">{stats.level}</p>
            <p className="text-xs text-muted-foreground">Current Level</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentWorkouts.map((workout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{workout.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(workout.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {workout.duration}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>
                Track your progress and unlock new achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {stats.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        achievement.earned
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Trophy className="h-5 w-5 text-primary ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
