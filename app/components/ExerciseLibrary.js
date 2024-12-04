"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, X, Search } from "lucide-react";
import ExerciseCard from "./ExerciseCard";
import exercisesData from '@/app/data/exercises.json';

const ExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [focusedExerciseIndex, setFocusedExerciseIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['all', ...new Set(exercisesData.exercises.map(ex => ex.category))];
  
  // Debounced search for better performance
  const debouncedSearch = useCallback((value) => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setSearchTerm(value);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced search with muscle groups and difficulty
  const filteredExercises = exercisesData.exercises.filter(exercise => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      exercise.name.toLowerCase().includes(searchTermLower) ||
      exercise.description.toLowerCase().includes(searchTermLower) ||
      exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(searchTermLower)) ||
      exercise.difficulty.toLowerCase().includes(searchTermLower);
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
          setSelectedExercise(null);
        }
        return;
      }

      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedExerciseIndex(prev => 
            prev < filteredExercises.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedExerciseIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          if (focusedExerciseIndex >= 0) {
            setSelectedExercise(filteredExercises[focusedExerciseIndex]);
            setIsModalOpen(true);
          }
          break;
        case '/':
          e.preventDefault();
          document.querySelector('input[type="search"]')?.focus();
          break;
        case 'Escape':
          setFocusedExerciseIndex(-1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedExerciseIndex, filteredExercises.length, isModalOpen]);

  // Auto-scroll focused exercise into view
  useEffect(() => {
    if (focusedExerciseIndex >= 0) {
      const element = document.querySelector(`[data-exercise-index="${focusedExerciseIndex}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [focusedExerciseIndex]);

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
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:w-96">
          <div className="search-container">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search exercises like Toji..."
              className="search-input"
              onChange={(e) => {
                debouncedSearch(e.target.value);
                setFocusedExerciseIndex(-1);
              }}
            />
          </div>
        </div>
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full md:w-auto"
        >
          <TabsList className="relative w-full md:w-auto grid grid-cols-3 md:flex md:flex-wrap gap-1 bg-background/5 p-1 rounded-lg">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="relative capitalize px-4 py-2 text-sm font-medium transition-all"
              >
                {category}
                {selectedCategory === category && (
                  <div className="tab-highlight w-full" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)] custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          {filteredExercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              focused={focusedExerciseIndex === index}
              onClick={() => {
                setSelectedExercise(exercise);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </ScrollArea>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="modal-content">
          {selectedExercise && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    {selectedExercise.name}
                  </DialogTitle>
                  <Badge className="toji-badge">
                    {selectedExercise.difficulty}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-72 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedExercise.image}
                    alt={selectedExercise.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-lg font-medium text-white mb-2">
                      {selectedExercise.category}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {selectedExercise.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Target Muscles</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExercise.muscleGroups.map((muscle) => (
                        <Badge
                          key={muscle}
                          className="toji-badge"
                        >
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="cursed-energy p-4 rounded-lg bg-background/50">
                    <h3 className="text-lg font-semibold mb-2">Training Notes</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Focus on form and controlled movements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Maintain proper breathing throughout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Progress gradually with weight and intensity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseLibrary;
