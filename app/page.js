"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [currentGrade, setCurrentGrade] = useState(1);
  const [currentFocus, setCurrentFocus] = useState('strength'); // 'strength' or 'combat'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const workoutPrograms = {
    1: {
      sun: {
        strength: [
          "3 x 5-7 Waist-to-bar pull-ups",
          "3 x 8-10 Front lever raises",
          "3 x 8-10 Towel pull-ups",
          "3 x 10-15 seconds Single arm dead hangs",
        ],
        combat: [
          "3 x 2min Shadow Boxing (Basic Combinations)",
          "5 x 10 Basic Jabs and Crosses",
          "3 x 1min Footwork Drills",
          "3 x 10 Basic Front Kicks",
        ]
      },
      mon: {
        strength: [
          "3 x 3-5 Wall handstand pushups",
          "3 x 10-16 Dynamic Explosive Pushups",
          "3 x 10-16 Explosive switch grip pushups",
          "3 x 3-5 Wall walks",
        ],
        combat: [
          "3 x 2min Light Bag Work",
          "3 x 10 Basic Defensive Slips",
          "3 x 1min Guard Position Drills",
          "5 x 10 Basic Elbow Strikes",
        ]
      },
      tue: {
        strength: [
          "3 x 10-12 Single leg hop",
          "3 x 12-14 Lateral Heiden",
          "3 x 10-12 Shrimp squats",
          "3 x 10-12 Sissy squats",
        ],
        combat: [
          "3 x 2min Basic Pad Work",
          "3 x 10 Low Kicks",
          "3 x 1min Basic Clinch Work",
          "5 x 10 Teep (Push) Kicks",
        ]
      },
      wed: {
        strength: ["Rest"],
        combat: [
          "Technical Form Practice",
          "Basic Stance Training",
          "Light Movement Drills",
          "Stretching and Recovery"
        ]
      },
      thu: {
        strength: [
          "3 x 1-2 One-arm chin-up negatives per arm",
          "3 x 4-6 Type writer pullups",
          "3 x 15-20 Supinated rows",
          "3 x 10-15 seconds False grip hangs",
        ],
        combat: [
          "3 x 2min Basic Combinations",
          "3 x 10 Defensive Blocks",
          "3 x 1min Speed Bag Work",
          "5 x 10 Basic Knee Strikes",
        ]
      },
      fri: {
        strength: [
          "3 x 3-5 One-arm pushups",
          "3 x 6-10 Planche to 90 degree",
          "3 x 10-15 Decline diamond pushups",
          "3 x 10-15 Sphinx pushups",
        ],
        combat: [
          "3 x 2min Technical Sparring (Light)",
          "3 x 10 Counter Punches",
          "3 x 1min Agility Ladder",
          "5 x 10 Basic Combinations",
        ]
      },
      sat: {
        strength: ["Rest"],
        combat: [
          "Form Practice",
          "Movement Drills",
          "Flexibility Work",
          "Recovery"
        ]
      },
    },
    2: {
      sun: {
        strength: [
          "3 x 4-6 Chest-to-bar pull-ups",
          "3 x 8-10 Wide pullups",
          "3 x 5-8 Towel pull-ups",
          "3 x 8-10 seconds Single arm dead hangs per leg",
        ],
        combat: [
          "4 x 3min Advanced Shadow Boxing",
          "5 x 15 Complex Punch Combinations",
          "4 x 2min Advanced Footwork",
          "4 x 15 Roundhouse Kicks Each Leg",
        ]
      },
      mon: {
        strength: [
          "3 x 8-10 Dynamic Explosive Pushups",
          "3 x 10-16 Switch grip pushups",
          "3 x 3-5 Wall walks",
          "3 x 8-12 Elevated Pike pushups",
        ],
        combat: [
          "4 x 3min Heavy Bag Combinations",
          "4 x 15 Head Movement Drills",
          "4 x 2min Counter Attack Practice",
          "5 x 12 Switch Kicks",
        ]
      },
      tue: {
        strength: [
          "3 x 8-10 Single leg hop per leg",
          "3 x 10-12 Lateral Heiden",
          "3 x 8-10 Shrimp squats",
          "3 x 8-10 Reverse nordic curls",
        ],
        combat: [
          "4 x 3min Advanced Pad Work",
          "4 x 15 Leg Kicks with Setup",
          "4 x 2min Clinch Sparring",
          "5 x 12 Flying Knee Attempts",
        ]
      },
      wed: {
        strength: ["Rest"],
        combat: [
          "Advanced Technical Practice",
          "Combination Development",
          "Defense Drills",
          "Active Recovery"
        ]
      },
      thu: {
        strength: [
          "3 x 3-6 Assisted one arm chin-ups per arm",
          "3 x 8-10 Close grip chin-ups",
          "3 x 10-15 Supinated rows",
          "3 x 8-10 seconds False grip hangs",
        ],
        combat: [
          "4 x 3min Complex Combinations",
          "4 x 15 Counter Strikes",
          "4 x 2min Advanced Bag Work",
          "5 x 12 Spinning Techniques",
        ]
      },
      fri: {
        strength: [
          "3 x 10-15 Archer pushups per arm",
          "3 x 8-12 Decline diamond pushups",
          "3 x 8-10 Pseudo-planche pushups",
          "3 x 8-10 Sphinx pushups",
        ],
        combat: [
          "4 x 3min Technical Sparring (Medium)",
          "4 x 15 Advanced Combinations",
          "4 x 2min Defense and Counter",
          "5 x 12 Power Techniques",
        ]
      },
      sat: {
        strength: ["Rest"],
        combat: [
          "Advanced Movement Practice",
          "Technique Refinement",
          "Strategy Development",
          "Recovery Work"
        ]
      },
    },
    3: {
      sun: {
        strength: [
          "3 x 1-5 Fast pull-ups",
          "3 x 8-10 Explosive rows",
          "3 x 10-20 seconds Towel Hangs",
          "3 x 30-60 seconds Dead hangs",
        ],
        combat: [
          "5 x 3min Expert Shadow Boxing",
          "6 x 15 Elite Combinations",
          "5 x 3min Advanced Movement Patterns",
          "6 x 15 Power Kick Combinations",
        ]
      },
      mon: {
        strength: [
          "3 x 6-8 Explosive Pushups",
          "3 x 8-10 Switch grip pushups",
          "3 x 8-12 Pike pushups",
          "3 x 15-30 seconds Wall handstand hold",
        ],
        combat: [
          "5 x 3min Expert Bag Work",
          "6 x 15 Advanced Counter Combinations",
          "5 x 3min Elite Defense Drills",
          "6 x 15 Complex Strike Patterns",
        ]
      },
      tue: {
        strength: [
          "3 x 6-8 Single leg hop per leg",
          "3 x 8-10 Lateral Heiden",
          "3 x 8-10 Box step-ups",
          "3 x 10-15 Body squat + hold",
        ],
        combat: [
          "5 x 3min Expert Pad Work",
          "6 x 15 Advanced Kick Combinations",
          "5 x 3min Elite Clinch Work",
          "6 x 15 Complex Attack Patterns",
        ]
      },
      wed: {
        strength: ["Rest"],
        combat: [
          "Expert Technical Analysis",
          "Advanced Strategy Development",
          "Elite Movement Practice",
          "Performance Recovery"
        ]
      },
      thu: {
        strength: [
          "3 x 5-8 One arm rows per arm",
          "3 x 8-10 Supinated rows",
          "3 x 8-10 Bicep curls",
          "3 x 30-60 seconds Dead hangs",
        ],
        combat: [
          "5 x 3min Elite Combinations",
          "6 x 15 Expert Counter Attacks",
          "5 x 3min Advanced Technique Work",
          "6 x 15 Power Strike Combinations",
        ]
      },
      fri: {
        strength: [
          "3 x 6-8 Bent arm archer pushups per arm",
          "3 x 8-10 Diamond pushups",
          "3 x 10-15 seconds Planche leans",
          "3 x 6-8 Sphinx pushups",
        ],
        combat: [
          "5 x 3min Technical Sparring (Advanced)",
          "6 x 15 Elite Strike Combinations",
          "5 x 3min Expert Defense Work",
          "6 x 15 Advanced Power Techniques",
        ]
      },
      sat: {
        strength: ["Rest"],
        combat: [
          "Elite Movement Mastery",
          "Expert Technique Analysis",
          "Advanced Strategy Work",
          "Professional Recovery"
        ]
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-gradient"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>
          <div className="relative h-[500px] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/toji-banner.jpg"
              alt="Toji Fushiguro"
              fill
              className="object-cover object-center transform scale-105 animate-subtle-zoom"
              priority
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text transform hover:scale-105 transition-transform">
                Toji Fushiguro
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Master the art of physical perfection through the ultimate calisthenics program
              </p>
            </div>
          </div>
        </div>

        {/* Training Focus Selection */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setCurrentFocus('strength')}
            className={`relative px-8 py-3 rounded-lg text-lg font-bold transition-all duration-300 overflow-hidden group ${
              currentFocus === 'strength'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800/50 text-gray-300'
            }`}
          >
            <span className="relative z-10">Strength Training</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={() => setCurrentFocus('combat')}
            className={`relative px-8 py-3 rounded-lg text-lg font-bold transition-all duration-300 overflow-hidden group ${
              currentFocus === 'combat'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800/50 text-gray-300'
            }`}
          >
            <span className="relative z-10">Combat Training</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Grade Selection */}
        <div className="flex justify-center gap-6 mb-16">
          {[1, 2, 3].map((grade) => (
            <button
              key={grade}
              onClick={() => setCurrentGrade(grade)}
              className={`relative px-8 py-3 rounded-lg text-lg font-bold transition-all duration-300 overflow-hidden group ${
                currentGrade === grade
                  ? currentFocus === 'combat' ? 'bg-red-600 text-white' : 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-300'
              }`}
            >
              <span className="relative z-10">Grade {grade}</span>
              <div className={`absolute inset-0 ${
                currentFocus === 'combat' 
                  ? 'bg-gradient-to-r from-red-600 to-orange-600'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </button>
          ))}
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(workoutPrograms[currentGrade]).map(([day, programs]) => (
            <div key={day} className="relative group">
              <div className={`absolute inset-0 ${
                currentFocus === 'combat'
                  ? 'bg-gradient-to-br from-red-600/20 to-orange-600/20'
                  : 'bg-gradient-to-br from-purple-600/20 to-pink-600/20'
              } rounded-xl transform rotate-6 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
              <div className={`relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300 border ${
                currentFocus === 'combat' ? 'border-red-500/20' : 'border-purple-500/20'
              }`}>
                <h2 className={`text-2xl font-bold mb-4 capitalize ${
                  currentFocus === 'combat'
                    ? 'bg-gradient-to-r from-red-400 to-orange-400'
                    : 'bg-gradient-to-r from-purple-400 to-pink-400'
                } text-transparent bg-clip-text`}>
                  {day}
                </h2>
                <ul className="space-y-3">
                  {programs[currentFocus].map((exercise, index) => (
                    <li
                      key={index}
                      className="text-gray-300 bg-black/30 p-4 rounded-lg hover:bg-black/50 transition-colors duration-200 transform hover:translate-x-2"
                    >
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Training Tips Section */}
        <div className="mt-20 text-center relative">
          <div className={`absolute inset-0 ${
            currentFocus === 'combat' ? 'bg-red-500/5' : 'bg-purple-500/5'
          } blur-3xl rounded-full`}></div>
          <blockquote className="relative z-10 max-w-3xl mx-auto p-8">
            <h3 className={`text-2xl font-bold mb-6 ${
              currentFocus === 'combat'
                ? 'bg-gradient-to-r from-red-400 to-orange-400'
                : 'bg-gradient-to-r from-purple-400 to-pink-400'
              } text-transparent bg-clip-text`}>
              {currentFocus === 'combat' ? 'Combat Tips' : 'Training Tips'}
            </h3>
            <p className="text-xl text-gray-300 mb-4">
              {currentFocus === 'combat'
                ? "Focus on speed, precision, and timing. Remember: a true warrior's strength lies in their technique."
                : "Build strength progressively and maintain perfect form. Your body is your ultimate weapon."}
            </p>
          </blockquote>
        </div>

        {/* Image Gallery */}
        <div className="mt-20 space-y-16">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Training Inspiration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl transform rotate-3 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/images/toji-1.jpg"
                  alt="Toji Training"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl transform -rotate-3 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/images/toji-2.webp"
                  alt="Toji Fighting"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center relative">
          <div className="absolute inset-0 bg-purple-500/5 blur-3xl rounded-full"></div>
          <blockquote className="relative z-10 max-w-3xl mx-auto p-8">
            <p className="text-2xl md:text-3xl font-bold italic text-gray-300 mb-4">
              "The only one who can defeat me, is me."
            </p>
            <cite className="text-lg text-purple-400">- Toji Fushiguro</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
