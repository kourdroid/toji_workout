"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, X } from "lucide-react";

const exercises = [
  {
    id: 1,
    name: "Day 1: Explosive Push-Ups",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["chest", "shoulders", "triceps"],
    description: "Focus on pushing the ground explosively as if mimicking a blast movement.",
    image: "/exercises/explosive-pushups.jpg",
    instructions: {
      setup: [
        "Start in a standard push-up position with hands slightly wider than shoulders",
        "Keep your core tight and body in a straight line",
        "Look slightly ahead of your hands for proper neck alignment"
      ],
      execution: [
        "Lower your body with control until chest nearly touches the ground",
        "Explosively push up with maximum force",
        "Allow your hands to leave the ground for advanced variations",
        "Land softly and immediately prepare for the next rep"
      ],
      commonMistakes: [
        "Sagging hips or lower back",
        "Not maintaining full body tension",
        "Rushing the lowering phase",
        "Landing too hard after explosive push"
      ],
      breathingPattern: "Inhale during lowering, forcefully exhale during explosive push"
    },
    progression: {
      beginner: "3 x 6-8 reps",
      intermediate: "4 x 10 reps",
      advanced: "5 x 12 reps with clap or lateral jumps",
      master: "6 x 15 reps (weighted vest)"
    }
  },
  {
    id: 2,
    name: "Day 1: Dips (Parallel Bars)",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["chest", "triceps", "shoulders"],
    description: "Keep a controlled descent and explosive rise.",
    image: "/exercises/dips.jpg",
    instructions: {
      setup: [
        "Grip parallel bars with hands shoulder-width apart",
        "Keep shoulders down and back",
        "Start with arms fully extended",
        "Cross ankles behind you for stability"
      ],
      execution: [
        "Lower body with control, keeping elbows close to body",
        "Descend until upper arms are parallel to ground",
        "Push explosively back to starting position",
        "Maintain slight forward lean for chest emphasis"
      ],
      commonMistakes: [
        "Letting shoulders rise to ears",
        "Flaring elbows excessively",
        "Not maintaining proper depth",
        "Swinging or using momentum"
      ],
      breathingPattern: "Inhale during descent, exhale forcefully during push"
    },
    progression: {
      beginner: "3 x 6-8 reps",
      intermediate: "4 x 10 reps",
      advanced: "5 x 12 reps (with a pause at the bottom)",
      master: "5 x 15 reps (weighted)"
    }
  },
  {
    id: 3,
    name: "Day 1: Advanced Shadowboxing Combos",
    category: "combat",
    difficulty: "scalable",
    muscleGroups: ["full body", "cardio"],
    description: "Jab, cross, hook, kick feint, spinning elbow. Simulate real opponents, moving aggressively and defensively.",
    image: "/exercises/shadowboxing.jpg",
    instructions: {
      setup: [
        "Stand with feet shoulder-width apart, hands up in guard position",
        "Keep knees slightly bent and weight evenly distributed",
        "Focus on quick, precise movements"
      ],
      execution: [
        "Throw combinations of punches and kicks, moving around the room",
        "Emphasize speed, agility, and reaction time",
        "Incorporate defensive movements, such as bobbing and weaving",
        "Increase intensity and complexity as you progress"
      ],
      commonMistakes: [
        "Not keeping hands up in guard position",
        "Not moving feet quickly enough",
        "Not rotating hips for power",
        "Not breathing properly"
      ],
      breathingPattern: "Rapid, rhythmic breathing to match the intensity of the workout"
    },
    progression: {
      beginner: "3 x 1-minute rounds (light shadowboxing)",
      intermediate: "4 x 2-minute rounds (focus on accuracy)",
      advanced: "6 x 3-minute rounds (add speed)",
      master: "8 x 3-minute rounds (focus on maximum power in strikes)"
    }
  },
  {
    id: 4,
    name: "Day 1: Explosive Striking with Tire Flip",
    category: "combat",
    difficulty: "scalable",
    muscleGroups: ["full body", "power"],
    description: "1 Minute of Shadowboxing + 1 Tire Flip Set",
    image: "/exercises/tire-flip.jpg",
    instructions: {
      setup: [
        "Stand facing the tire, feet shoulder-width apart",
        "Grip the tire with both hands, keeping arms straight",
        "Keep core tight and body in a straight line"
      ],
      execution: [
        "Explosively lift the tire, using legs and hips for power",
        "Flip the tire, keeping arms straight and core tight",
        "Immediately return to shadowboxing, focusing on quick, precise movements"
      ],
      commonMistakes: [
        "Not using legs and hips for power",
        "Not keeping core tight",
        "Not flipping the tire explosively",
        "Not immediately returning to shadowboxing"
      ],
      breathingPattern: "Forceful exhalation during tire flip, rapid breathing during shadowboxing"
    },
    progression: {
      beginner: "3 flips, 3 rounds",
      intermediate: "5 flips, 4 rounds",
      advanced: "7 flips, 5 rounds",
      master: "10 flips, 6 rounds"
    }
  },
  {
    id: 5,
    name: "Day 2: Explosive Pull-Ups",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["back", "biceps"],
    description: "Focus on explosive movement and controlled descent.",
    image: "/exercises/pullups.jpg",
    instructions: {
      setup: [
        "Hang from the pull-up bar with hands shoulder-width apart",
        "Keep shoulders down and back",
        "Engage core and maintain a straight line from head to heels"
      ],
      execution: [
        "Pull up with control, focusing on squeezing shoulder blades",
        "Explosively pull up, using legs and hips for power",
        "Control the descent, taking 2-3 seconds to return to the starting position"
      ],
      commonMistakes: [
        "Not engaging core",
        "Not squeezing shoulder blades",
        "Not using legs and hips for power",
        "Not controlling the descent"
      ],
      breathingPattern: "Inhale during descent, exhale forcefully during pull-up"
    },
    progression: {
      beginner: "Assisted Pull-Ups: 3 x 5 reps",
      intermediate: "Regular Pull-Ups: 3 x 8 reps",
      advanced: "Weighted Pull-Ups: 4 x 10 reps",
      master: "Explosive Pull-Ups (Chest-to-Bar): 5 x 12 reps"
    }
  },
  {
    id: 6,
    name: "Day 2: Isometric Holds",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["grip", "forearms"],
    description: "Build grip strength, critical for combat situations like grappling.",
    image: "/exercises/dead-hangs.jpg",
    instructions: {
      setup: [
        "Hang from the pull-up bar with hands shoulder-width apart",
        "Keep shoulders down and back",
        "Engage core and maintain a straight line from head to heels"
      ],
      execution: [
        "Hold the position for the specified time, focusing on grip strength",
        "Keep body in a straight line, engaging core and maintaining control"
      ],
      commonMistakes: [
        "Not engaging core",
        "Not maintaining a straight line",
        "Not focusing on grip strength"
      ],
      breathingPattern: "Slow, controlled breathing to maintain focus and control"
    },
    progression: {
      beginner: "Dead Hangs: 3 x 15 seconds",
      intermediate: "Active Hangs: 3 x 30 seconds",
      advanced: "Towel Hangs: 4 x 45 seconds",
      master: "One-Arm Dead Hangs: 5 x 1 minute"
    }
  },
  {
    id: 7,
    name: "Day 3: Plank Variations",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["core", "shoulders"],
    description: "Build core stability through progressive plank variations.",
    image: "/exercises/plank.jpg",
    instructions: {
      setup: [
        "Start in a plank position, hands shoulder-width apart",
        "Keep shoulders down and back",
        "Engage core and maintain a straight line from head to heels"
      ],
      execution: [
        "Hold the position for the specified time, focusing on core stability",
        "Keep body in a straight line, engaging core and maintaining control"
      ],
      commonMistakes: [
        "Not engaging core",
        "Not maintaining a straight line",
        "Not focusing on core stability"
      ],
      breathingPattern: "Slow, controlled breathing to maintain focus and control"
    },
    progression: {
      beginner: "Regular Plank: 3 x 20 seconds",
      intermediate: "Shoulder Tap Plank: 3 x 30 seconds",
      advanced: "Weighted Plank: 4 x 40 seconds",
      master: "One-Arm Plank: 5 x 1 minute"
    }
  },
  {
    id: 8,
    name: "Day 3: Tire Slammed Sit-Ups",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["core", "power"],
    description: "Explosive core movement with tire integration.",
    image: "/exercises/tire-situps.jpg",
    instructions: {
      setup: [
        "Sit on the floor with the tire in front of you",
        "Keep feet flat on the ground, knees bent at 90 degrees",
        "Lean back slightly, engaging core and maintaining control"
      ],
      execution: [
        "Explosively lift the tire, using legs and hips for power",
        "Slam the tire to the ground, keeping core tight and body in a straight line"
      ],
      commonMistakes: [
        "Not using legs and hips for power",
        "Not keeping core tight",
        "Not slamming the tire explosively"
      ],
      breathingPattern: "Forceful exhalation during tire slam, rapid breathing during sit-ups"
    },
    progression: {
      beginner: "Tire lift to knees: 3 x 8 reps",
      intermediate: "Tire to shoulder: 4 x 10 reps",
      advanced: "Full overhead slam: 4 x 12 reps",
      master: "Max tire slams for 1 minute, 5 sets"
    }
  },
  {
    id: 9,
    name: "Day 4: Push-Pull Superset",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["full body", "power"],
    description: "Explosive combination of pushing and pulling movements.",
    image: "/exercises/push-pull.jpg",
    instructions: {
      setup: [
        "Stand facing the pull-up bar, hands shoulder-width apart",
        "Keep shoulders down and back",
        "Engage core and maintain a straight line from head to heels"
      ],
      execution: [
        "Perform a pull-up, focusing on explosive movement",
        "Immediately drop down and perform a push-up, focusing on explosive movement"
      ],
      commonMistakes: [
        "Not using legs and hips for power",
        "Not keeping core tight",
        "Not performing explosive movements"
      ],
      breathingPattern: "Forceful exhalation during pull-up and push-up, rapid breathing during superset"
    },
    progression: {
      beginner: "3 x 6 push-ups + 6 inverted rows",
      intermediate: "4 x 8 push-ups + 8 pull-ups",
      advanced: "5 x 10 explosive push-ups + 10 pull-ups",
      master: "6 x 12 1-arm push-ups + 12 weighted pull-ups"
    }
  },
  {
    id: 10,
    name: "Day 5: Tire Flipping",
    category: "strength",
    difficulty: "scalable",
    muscleGroups: ["full body", "power", "endurance"],
    description: "Continuous tire flips for maximum reps and explosiveness.",
    image: "/exercises/tire-flipping.jpg",
    instructions: {
      setup: [
        "Stand facing the tire, feet shoulder-width apart",
        "Grip the tire with both hands, keeping arms straight",
        "Keep core tight and body in a straight line"
      ],
      execution: [
        "Explosively lift the tire, using legs and hips for power",
        "Flip the tire, keeping arms straight and core tight"
      ],
      commonMistakes: [
        "Not using legs and hips for power",
        "Not keeping core tight",
        "Not flipping the tire explosively"
      ],
      breathingPattern: "Forceful exhalation during tire flip, rapid breathing during workout"
    },
    progression: {
      beginner: "3 rounds of 5 flips",
      intermediate: "4 rounds of 7 flips",
      advanced: "5 rounds of 10 flips",
      master: "6 rounds of 12 flips"
    }
  }
];

const ExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);

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

  const ExerciseModal = ({ exercise }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            {exercise.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {/* Exercise Image */}
          <div className="relative h-48 rounded-xl overflow-hidden">
            <Image
              src={exercise.image}
              alt={exercise.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Setup</h3>
              <ul className="list-disc pl-5 space-y-1">
                {exercise.instructions.setup.map((step, idx) => (
                  <li key={idx} className="text-gray-400">{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Execution</h3>
              <ul className="list-disc pl-5 space-y-1">
                {exercise.instructions.execution.map((step, idx) => (
                  <li key={idx} className="text-gray-400">{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-1">
                {exercise.instructions.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="text-gray-400">{mistake}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Breathing Pattern</h3>
              <p className="text-gray-400">{exercise.instructions.breathingPattern}</p>
            </div>

            {/* Progression Levels */}
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Progression Levels</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="glass p-2 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-1">Beginner</h4>
                  <p className="text-sm text-gray-400">{exercise.progression.beginner}</p>
                </div>
                <div className="glass p-2 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-1">Intermediate</h4>
                  <p className="text-sm text-gray-400">{exercise.progression.intermediate}</p>
                </div>
                <div className="glass p-2 rounded-lg">
                  <h4 className="text-orange-400 font-semibold mb-1">Advanced</h4>
                  <p className="text-sm text-gray-400">{exercise.progression.advanced}</p>
                </div>
                <div className="glass p-2 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-1">Master</h4>
                  <p className="text-sm text-gray-400">{exercise.progression.master}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
            className="glass rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 relative"
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
              <ExerciseModal exercise={exercise} />
            </div>
            <div className="p-4">
              <p className="text-gray-400 mb-4">{exercise.description}</p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="glass p-2 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-1">Beginner</h4>
                    <p className="text-sm text-gray-400">{exercise.progression.beginner}</p>
                  </div>
                  <div className="glass p-2 rounded-lg">
                    <h4 className="text-yellow-400 font-semibold mb-1">Intermediate</h4>
                    <p className="text-sm text-gray-400">{exercise.progression.intermediate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
