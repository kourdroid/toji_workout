'use client';

import { useState } from 'react';
import { Star, Trophy, Dumbbell } from 'lucide-react';

const trainingLevels = [
  {
    name: 'Beginner',
    description: 'Building foundational strength and form',
    grade: 'D - B',
    icon: Dumbbell,
    color: 'text-green-400',
    requirements: [
      'Can perform basic exercises with proper form',
      'Building consistency in workouts',
      'Learning proper breathing techniques'
    ]
  },
  {
    name: 'Intermediate',
    description: 'Developing advanced techniques',
    grade: 'B - A',
    icon: Star,
    color: 'text-blue-400',
    requirements: [
      'Consistent workout routine for 6+ months',
      'Can perform compound exercises with good form',
      'Understanding of progressive overload'
    ]
  },
  {
    name: 'Advanced',
    description: 'Mastering complex movements',
    grade: 'A - S',
    icon: Trophy,
    color: 'text-purple-400',
    requirements: [
      'Expert form in all major exercises',
      'Deep understanding of nutrition and recovery',
      'Can design and adjust training programs'
    ]
  }
];

export default function TrainingLevel() {
  const [expandedLevel, setExpandedLevel] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-6">Training Levels</h2>
      <div className="grid gap-4">
        {trainingLevels.map((level, index) => (
          <div
            key={level.name}
            className="card group cursor-pointer"
            onClick={() => setExpandedLevel(expandedLevel === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-white/5 ${level.color}`}>
                  <level.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {level.name}
                  </h3>
                  <p className="text-sm text-gray-400">{level.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge badge-purple ${level.color}`}>
                  Grade {level.grade}
                </span>
              </div>
            </div>
            
            {expandedLevel === index && (
              <div className="mt-4 pl-12 animate-fadeIn">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Requirements:</h4>
                <ul className="list-disc text-sm text-gray-400 space-y-1">
                  {level.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
