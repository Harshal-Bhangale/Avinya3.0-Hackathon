'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define types for form data
interface FormData {
  name: string;
  age: string;
  weight: string;
  fitnessGoal: string;
  activityLevel: string;
}

// Define type for chart data
interface ActivityData {
  name: string;
  Time: number;
}

const FitnessForm = () => {
  // Initialize form state with proper typing
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    weight: '',
    fitnessGoal: '',
    activityLevel: '',
  });
  const [plan, setPlan] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate workout data based on fitness goal
  const generateWorkoutData = (goal: string): ActivityData[] => {
    switch (goal) {
      case 'loseWeight':
        return [
          { name: 'Cardio', Time: 45 },
          { name: 'HIIT', Time: 30 },
          { name: 'Strength', Time: 30 },
          { name: 'Rest', Time: 0 },
        ];
      case 'gainMuscle':
        return [
          { name: 'Strength', Time: 60 },
          { name: 'Cardio', Time: 20 },
          { name: 'Recovery', Time: 15 },
          { name: 'Rest', Time: 0 },
        ];
      default:
        return [
          { name: 'Cardio', Time: 30 },
          { name: 'Strength', Time: 30 },
          { name: 'Flexibility', Time: 30 },
          { name: 'Rest', Time: 0 },
        ];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name || !formData.age || !formData.weight || !formData.fitnessGoal || !formData.activityLevel) {
        throw new Error('Please fill in all fields');
      }

      // Generate personalized plan based on form data
      const personalizedPlan = `Here's your weekly plan, ${formData.name}:\n
        Based on your goal to ${formData.fitnessGoal.replace(/([A-Z])/g, ' $1').toLowerCase()} 
        and current ${formData.activityLevel} activity level, here's your customized schedule:\n
        - Monday: Cardio (30 mins)
        - Wednesday: Full Body Strength (45 mins)
        - Friday: Flexibility Training (30 mins)
        \nRemember to stay hydrated and get adequate rest between sessions!`;

      setPlan(personalizedPlan);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-gray-700 rounded-lg p-8 shadow-2xl border border-gray-600">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-400 tracking-tight">
          Personalized Fitness Plan
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-md text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-200">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-gray-200">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400"
              placeholder="Your Age"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-semibold text-gray-200">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400"
              placeholder="Your Weight"
            />
          </div>

          <div>
            <label htmlFor="fitnessGoal" className="block text-sm font-semibold text-gray-200">Fitness Goal:</label>
            <select
              id="fitnessGoal"
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white"
            >
              <option value="">Select a goal</option>
              <option value="loseWeight">Lose Weight</option>
              <option value="gainMuscle">Gain Muscle</option>
              <option value="improveEndurance">Improve Endurance</option>
              <option value="generalFitness">General Fitness</option>
            </select>
          </div>

          <div>
            <label htmlFor="activityLevel" className="block text-sm font-semibold text-gray-200">Current Activity Level:</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white"
            >
              <option value="">Select activity level</option>
              <option value="sedentary">Sedentary (little to no exercise)</option>
              <option value="lightlyActive">Lightly Active (1-3 times/week)</option>
              <option value="moderatelyActive">Moderately Active (3-5 times/week)</option>
              <option value="veryActive">Very Active (6-7 times/week)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Generating...' : 'Generate Plan'}
          </button>
        </form>

        {showResults && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4 text-green-300">Your Personalized Plan:</h3>
            <p className="text-gray-100 leading-relaxed whitespace-pre-line">{plan}</p>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-purple-300">Weekly Activity Breakdown:</h4>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={generateWorkoutData(formData.fitnessGoal)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                  <XAxis dataKey="name" stroke="#CBD5E0" />
                  <YAxis stroke="#CBD5E0" />
                  <Tooltip
                    wrapperStyle={{ backgroundColor: '#2D3748', color: '#fff', padding: '10px', borderRadius: '5px' }}
                    contentStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                  <Bar dataKey="Time" fill="#82ca9d" barSize={30} radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-yellow-300">Additional Recommendations:</h4>
              <ul className="list-disc list-inside text-gray-100 space-y-2">
                <li>Stay hydrated - drink at least 8 glasses of water daily</li>
                <li>Aim for 7-9 hours of quality sleep each night</li>
                <li>Incorporate stretching and mobility exercises</li>
                <li>Consult with a healthcare professional before starting</li>
                <li>Listen to your body and adjust intensity as needed</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessForm;