"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const exercises = [
  {
    id: 1,
    name: "Handstand Push-up",
    category: "strength",
    difficulty: "advanced",
    muscleGroups: ["shoulders", "triceps", "core"],
    description: "A challenging bodyweight exercise that builds incredible shoulder strength and balance.",
    image: "/exercises/handstand-pushup.jpg",
    sets: "3-5",
    reps: "5-8"
  },
  {
    id: 2,
    name: "Front Lever",
    category: "strength",
    difficulty: "expert",
    muscleGroups: ["back", "core", "lats"],
    description: "An advanced gymnastics hold that develops exceptional core and back strength.",
    image: "/exercises/front-lever.jpg",
    sets: "3-5",
    reps: "10-20s hold"
  },
  {
    id: 3,
    name: "Planche Lean",
    category: "strength",
    difficulty: "intermediate",
    muscleGroups: ["shoulders", "chest", "core"],
    description: "A preparatory exercise for the full planche, building shoulder and core strength.",
    image: "/exercises/planche-lean.jpg",
    sets: "3",
    reps: "30s hold"
  },
  {
    id: 4,
    name: "Shadow Boxing",
    category: "combat",
    difficulty: "beginner",
    muscleGroups: ["full body", "cardio"],
    description: "Practice boxing techniques and footwork without equipment.",
    image: "/exercises/shadow-boxing.jpg",
    sets: "3-5",
    reps: "3 min rounds"
  },
  {
    id: 5,
    name: "Jab-Cross Combo",
    category: "combat",
    difficulty: "beginner",
    muscleGroups: ["shoulders", "chest", "core"],
    description: "Basic boxing combination focusing on proper form and speed.",
    image: "/exercises/jab-cross.jpg",
    sets: "5",
    reps: "20 combos"
  },
  {
    id: 6,
    name: "Technical Sparring",
    category: "combat",
    difficulty: "advanced",
    muscleGroups: ["full body", "cardio"],
    description: "Light contact sparring focusing on technique and strategy.",
    image: "/exercises/sparring.jpg",
    sets: "3-5",
    reps: "3 min rounds"
  }
];

const ExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(exercises.map(ex => ex.category))];
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'from-green-600 to-green-500';
      case 'intermediate': return 'from-yellow-600 to-yellow-500';
      case 'advanced': return 'from-orange-600 to-orange-500';
      case 'expert': return 'from-red-600 to-red-500';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
          Exercise Library
        </h2>
        <div className="flex gap-4">
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass w-full lg:w-64"
          />
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl glass transition-all duration-300 ${
                  selectedCategory === category 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-gray-400 hover:text-purple-300'
                }`}
              >
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="glass rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={exercise.image}
                alt={exercise.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">{exercise.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`bg-gradient-to-r ${getDifficultyColor(exercise.difficulty)} text-white`}
                  >
                    {exercise.difficulty}
                  </Badge>
                  {exercise.muscleGroups.map((muscle, idx) => (
                    <Badge key={idx} variant="outline" className="text-white/80">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-400 mb-4">{exercise.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-400">Sets: {exercise.sets}</span>
                <span className="text-purple-400">Reps: {exercise.reps}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
