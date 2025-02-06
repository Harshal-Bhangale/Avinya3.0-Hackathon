'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface MentalHealthData {
    name: string;
    age: string;
    sleepHours: string;
    stressLevel: string;
    moodRating: string;
    activityLevel: string;
    moodDescription: string;
    symptoms: string[];
    dailyActivities: string[];
}

interface MoodMetrics {
    name: string;
    value: number;
}

const MentalWellnessTracker = () => {
    const [formData, setFormData] = useState<MentalHealthData>({
        name: '',
        age: '',
        sleepHours: '',
        stressLevel: '',
        moodRating: '',
        activityLevel: '',
        moodDescription: '',
        symptoms: [],
        dailyActivities: []
    });

    const [showResults, setShowResults] = useState(false);
    const [analysis, setAnalysis] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Common mental health indicators to track
    const symptoms = [
        'Difficulty Sleeping',
        'Low Energy',
        'Poor Concentration',
        'Changes in Appetite',
        'Feeling Overwhelmed',
        'Social Withdrawal',
        'Racing Thoughts',
        'Physical Tension'
    ];

    const activities = [
        'Exercise',
        'Meditation',
        'Social Interaction',
        'Therapy Session',
        'Outdoor Activity',
        'Creative Activity',
        'Reading',
        'Journaling'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (category: 'symptoms' | 'dailyActivities', item: string) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].includes(item)
                ? prev[category].filter(i => i !== item)
                : [...prev[category], item]
        }));
    };

    const analyzeMoodTrends = (): MoodMetrics[] => {
        const moodValue = parseInt(formData.moodRating);
        const stressValue = parseInt(formData.stressLevel);
        const sleepValue = parseInt(formData.sleepHours);

        return [
            { name: 'Mood', value: moodValue * 10 },
            { name: 'Stress', value: stressValue * 10 },
            { name: 'Sleep Quality', value: (sleepValue / 12) * 100 }
        ];
    };

    const generateRecommendations = (): string => {
        const stressLevel = parseInt(formData.stressLevel);
        const moodRating = parseInt(formData.moodRating);
        const recommendations = [];

        if (stressLevel > 7) {
            recommendations.push(
                "- Consider practicing relaxation techniques like deep breathing or meditation",
                "- Schedule short breaks throughout your day",
                "- Reach out to a mental health professional"
            );
        }

        if (moodRating < 5) {
            recommendations.push(
                "- Try to maintain a regular sleep schedule",
                "- Engage in light physical activity",
                "- Connect with supportive friends or family"
            );
        }

        if (formData.symptoms.length > 3) {
            recommendations.push(
                "- Consider scheduling a check-up with a mental health professional",
                "- Start keeping a detailed mood and symptom journal",
                "- Review and adjust your daily routine for better balance"
            );
        }

        return recommendations.join('\n');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const recommendations = generateRecommendations();
            setAnalysis(recommendations);
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
                    Mental Wellness Tracker
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
                        />
                    </div>

                    <div>
                        <label htmlFor="moodRating" className="block text-sm font-semibold text-gray-200">Current Mood (1-10):</label>
                        <input
                            type="range"
                            id="moodRating"
                            name="moodRating"
                            min="1"
                            max="10"
                            value={formData.moodRating}
                            onChange={handleInputChange}
                            className="mt-1 block w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Low</span>
                            <span>High</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="stressLevel" className="block text-sm font-semibold text-gray-200">Stress Level (1-10):</label>
                        <input
                            type="range"
                            id="stressLevel"
                            name="stressLevel"
                            min="1"
                            max="10"
                            value={formData.stressLevel}
                            onChange={handleInputChange}
                            className="mt-1 block w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Low</span>
                            <span>High</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="sleepHours" className="block text-sm font-semibold text-gray-200">Hours of Sleep:</label>
                        <input
                            type="number"
                            id="sleepHours"
                            name="sleepHours"
                            min="0"
                            max="24"
                            value={formData.sleepHours}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Current Symptoms:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {symptoms.map(symptom => (
                                <label key={symptom} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.symptoms.includes(symptom)}
                                        onChange={() => handleCheckboxChange('symptoms', symptom)}
                                        className="rounded border-gray-500 text-blue-500 focus:ring-blue-500 bg-gray-600"
                                    />
                                    <span className="text-sm text-gray-200">{symptom}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Daily Activities:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {activities.map(activity => (
                                <label key={activity} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.dailyActivities.includes(activity)}
                                        onChange={() => handleCheckboxChange('dailyActivities', activity)}
                                        className="rounded border-gray-500 text-blue-500 focus:ring-blue-500 bg-gray-600"
                                    />
                                    <span className="text-sm text-gray-200">{activity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="moodDescription" className="block text-sm font-semibold text-gray-200">Additional Notes:</label>
                        <textarea
                            id="moodDescription"
                            name="moodDescription"
                            value={formData.moodDescription}
                            onChange={handleInputChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Analyzing...' : 'Analyze Well-being'}
                    </button>
                </form>

                {showResults && (
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold mb-4 text-green-300">Well-being Analysis:</h3>

                        <div className="mt-8">
                            <h4 className="text-xl font-semibold mb-4 text-purple-300">Current Metrics:</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analyzeMoodTrends()}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                                    <XAxis dataKey="name" stroke="#CBD5E0" />
                                    <YAxis stroke="#CBD5E0" />
                                    <Tooltip
                                        wrapperStyle={{ backgroundColor: '#2D3748', color: '#fff', padding: '10px', borderRadius: '5px' }}
                                        contentStyle={{ color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="value" fill="#82ca9d" barSize={30} radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Recommendations:</h4>
                            <div className="bg-gray-800 rounded-lg p-4 text-gray-100 space-y-2 whitespace-pre-line">
                                {analysis}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-xl font-semibold mb-4 text-blue-300">Tracked Symptoms:</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {formData.symptoms.map(symptom => (
                                    <div key={symptom} className="bg-gray-800 rounded-lg p-3 text-gray-100">
                                        {symptom}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-xl font-semibold mb-4 text-pink-300">Positive Activities:</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {formData.dailyActivities.map(activity => (
                                    <div key={activity} className="bg-gray-800 rounded-lg p-3 text-gray-100">
                                        {activity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentalWellnessTracker;