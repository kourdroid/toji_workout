"use client";
import { useState } from 'react';

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    fitnessGoal: 'strength', // strength, weightLoss, muscle, endurance
    experience: 'beginner' // beginner, intermediate, advanced
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would typically save to a backend
    console.log('Profile updated:', profile);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-card p-8 space-y-8">
        <h2 className="text-3xl font-bold gradient-text text-center mb-8 neon-glow">
          Profile Settings
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 fade-in-up" style={{ animationDelay: '100ms' }}>
              <label className="block text-sm font-medium text-purple-300">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2 fade-in-up" style={{ animationDelay: '200ms' }}>
              <label className="block text-sm font-medium text-purple-300">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your age"
              />
            </div>

            <div className="space-y-2 fade-in-up" style={{ animationDelay: '300ms' }}>
              <label className="block text-sm font-medium text-purple-300">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your weight"
              />
            </div>

            <div className="space-y-2 fade-in-up" style={{ animationDelay: '400ms' }}>
              <label className="block text-sm font-medium text-purple-300">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your height"
              />
            </div>

            <div className="space-y-2 fade-in-up" style={{ animationDelay: '500ms' }}>
              <label className="block text-sm font-medium text-purple-300">Fitness Goal</label>
              <select
                name="fitnessGoal"
                value={profile.fitnessGoal}
                onChange={handleChange}
                className="input-field"
              >
                <option value="strength">Strength Training</option>
                <option value="weightLoss">Weight Loss</option>
                <option value="muscle">Muscle Gain</option>
                <option value="endurance">Endurance</option>
              </select>
            </div>

            <div className="space-y-2 fade-in-up" style={{ animationDelay: '600ms' }}>
              <label className="block text-sm font-medium text-purple-300">Experience Level</label>
              <select
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="input-field"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 fade-in-up" style={{ animationDelay: '700ms' }}>
            <button type="button" className="button-secondary">
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
