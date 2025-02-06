'use client';

import React, { useState } from 'react';

// Define types for Wellbeing Recommendations
interface WellbeingRecommendation {
    type: 'sleep' | 'energy' | 'stress' | 'movement' | 'mindfulness' | 'hydration' | 'nutrition' | 'social' | 'general';
    message: string;
    details?: string; // Optional: More in-depth information
    actionable?: string; // Optional: A specific action to take
    satisfying?: string; // Optional: What satisfaction user could get from recommendation.
}

const WellnessForm = () => {
    const [sleepHours, setSleepHours] = useState('');
    const [energyLevel, setEnergyLevel] = useState(''); // Added Energy Level
    const [stressLevel, setStressLevel] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [recommendations, setRecommendations] = useState<WellbeingRecommendation[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Data validation with more friendly, encouraging feedback
        if (!sleepHours) {
            alert("Tell me about your sleep! It is important to us.");
            return;
        }
        if (!energyLevel) {
            alert("Share your energy levels so we can boost it!");
            return;
        }
        if (!stressLevel) {
            alert("Let me know how your stress level is. We are happy to hear it!");
            return;
        }
        if (!activityLevel) {
            alert("Choose what best describes your activity so we can give the right insights!");
            return;
        }


        // Convert values to appropriate types
        const sleepHoursNum = parseInt(sleepHours, 10);
        const stressLevelNum = parseInt(stressLevel, 10);
        const energyLevelNum = parseInt(energyLevel, 10);

        // Enhanced Recommendations - more specific, actionable, and empowering
        let generatedRecommendations: WellbeingRecommendation[] = [];

        // ---- Sleep Recommendations ----
        if (sleepHoursNum < 6) {
            generatedRecommendations.push({
                type: 'sleep',
                message: "You deserve a restorative sleep! Aim for 7-9 hours tonight. It's like hitting the reset button for your body and mind.",
                details: "Chronic sleep deprivation can impact everything from your mood and cognitive function to your immune system. Making sleep a priority is a game-changer.",
                actionable: "Design your perfect bedtime routine: a warm bath, a calming book, and a cup of herbal tea can work wonders.",
                satisfying: "Imagine waking up feeling truly rested, energized, and ready to embrace the day. That's the power of sleep!"
            });
            generatedRecommendations.push({
                type: 'sleep',
                message: "Become a sleep detective! Experiment with sleep tracking apps or devices to understand your sleep patterns and identify areas for improvement.",
                details: "Tracking your sleep can reveal hidden insights into your sleep quality, such as sleep latency, sleep stages, and wake-up times.",
                actionable: "Download a top-rated sleep tracking app (like Sleep Cycle, Pillow, or Fitbit) and monitor your sleep for a week. Review the data and see what patterns emerge.",
                satisfying: "Unlocking the secrets of your sleep can empower you to make positive changes and optimize your sleep quality for maximum benefits."
            });
        } else if (sleepHoursNum > 9) {
            generatedRecommendations.push({
                type: 'sleep',
                message: "It's wonderful that you're valuing rest, but sometimes too much sleep could indicate an underlying issue. Let's investigate!",
                details: "Excessive sleepiness can be related to medical conditions, medications, lifestyle factors, or even underlying mood disorders. It's worth exploring if it's persistent.",
                actionable: "Keep a detailed sleep diary for two weeks, noting your sleep time, wake time, daytime energy levels, and any symptoms you experience. Share this diary with your healthcare provider.",
                satisfying: "Taking proactive steps to understand your sleep patterns can bring you peace of mind and help you rule out any potential health concerns."
            });
            generatedRecommendations.push({
                type: 'social',
                message: "Make a plan to catch up with friends and family! Social interaction will boost your mood!",
                details: "Human interactions will help make you feel happier and healthy!",
                actionable: "Call or visit a friend",
                satisfying: "A sense of belonging is essential for us!"
            });
        } else if (sleepHoursNum >= 7 && sleepHoursNum <= 9 && energyLevelNum < 4) {
            generatedRecommendations.push({
                type: 'energy',
                message: "You're hitting the sleep duration sweet spot, but your low energy suggests the quality may need a boost! Time to sleuth your sleep environment.",
                details: "Even if you're sleeping 7-9 hours, disruptions from light, noise, temperature, or an uncomfortable mattress can hinder restorative sleep.",
                actionable: "Conduct a bedroom audit: darken the room with blackout curtains, use a white noise machine to block out sounds, ensure your thermostat is set to a cool temperature (around 65 degrees), and assess your mattress and pillows for comfort and support.",
                satisfying: "Creating a sleep sanctuary can dramatically improve your sleep quality, leading to increased energy, improved focus, and a brighter mood!"
            });

            generatedRecommendations.push({
                type: 'mindfulness',
                message: "Try doing some deep breathing exercise that lasts for 5-10 minutes before your sleep!",
                details: "Clear your mind and help reduce your stress!",
                actionable: "Pick your favorite yoga app or guided meditation!",
                satisfying: "Falling asleep with a peace of mind!"
            });
        }

        // ---- Energy Level Recommendations ----
        if (energyLevelNum < 4) {
            generatedRecommendations.push({
                type: 'energy',
                message: "Power up your energy naturally with a dose of sunlight therapy! A little morning sun can work wonders for your body clock.",
                details: "Sunlight exposure in the morning helps regulate your circadian rhythm, promoting alertness and improving sleep quality.",
                actionable: "Take a 15-minute walk outside within the first hour of waking up. Leave your sunglasses at home (unless it's very bright) to maximize light exposure.",
                satisfying: "Enjoy the fresh air, boost your mood, and set the stage for a more energetic day!"
            });
            generatedRecommendations.push({
                type: 'hydration',
                message: "Dehydration is a sneaky energy thief! Keep a water bottle handy and sip throughout the day to stay hydrated and sharp.",
                details: "Even mild dehydration can impair cognitive function, reduce physical performance, and lead to fatigue.",
                actionable: "Invest in a reusable water bottle you love and make it your constant companion. Set reminders on your phone to drink water regularly.",
                satisfying: "Feeling refreshed, focused, and energized is just a sip away!"
            });
            generatedRecommendations.push({
                type: 'nutrition',
                message: "Fuel your body with a nutritious breakfast, a vital habit to feel more energized throughout your day!",
                details: "Avoid sugary cereals and pastries, which can lead to energy crashes later in the morning.",
                actionable: "Greek yogurt with berries and nuts, or scrambled eggs with whole-wheat toast will give you sustained energy for the day!",
                satisfying: "Feeling good all day because of this little habit!"
            });
        } else if (energyLevelNum > 7) {
            generatedRecommendations.push({
                type: 'general',
                message: "You're buzzing with energy! Channel that vitality into your most important tasks and enjoy your day!"
                ,
                actionable: "Tackle a challenging project at work, pursue a passion project, or connect with loved ones to share your positive vibes.",
                satisfying: "Accomplishing goals, making progress, and spreading joy will amplify your energy and leave you feeling fulfilled."
            });

            generatedRecommendations.push({
                type: 'movement',
                message: "Great energy = time to move! Reward your body with a workout you absolutely love—it's the ultimate energy multiplier.",
                details: "Choose an activity that ignites your passion and makes you feel good, whether it's running, dancing, swimming, or a team sport.",
                actionable: "Sign up for a fitness class, plan a hike with friends, or simply crank up the music and dance in your living room. Make it fun!",
                satisfying: "The endorphin rush from exercise will elevate your mood, boost your confidence, and leave you feeling energized and empowered."
            });

        }

        // ---- Stress Recommendations ----
        if (stressLevelNum > 7) {
            generatedRecommendations.push({
                type: 'stress',
                message: "When stress is overwhelming, grounding techniques can be a lifeline. Find a quiet spot and try the 5-4-3-2-1 method.",
                details: "This technique involves engaging your senses to bring you back to the present moment: identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
                actionable: "Repeat it to yourself and feel it wash away the stress you're having!",
                satisfying: "Connecting with your senses helps calm your nervous system, reduce anxiety, and bring a sense of peace."
            });
            generatedRecommendations.push({
                type: 'mindfulness',
                message: "Give yourself the gift of mindfulness. A guided meditation app (like Headspace or Calm) can help you cultivate a sense of inner calm and build resilience to stress.",
                actionable: "Download a meditation app and try a 10-minute guided meditation focusing on your breath, body scan, or loving-kindness. Make it a daily practice.",
                satisfying: "You'll feel calmer, more focused, and better equipped to handle life's challenges with grace and ease."
            });
        } else if (stressLevelNum < 3) {
            generatedRecommendations.push({
                type: 'general',
                message: "You're a stress-management rockstar! Keep those healthy coping mechanisms in place to stay balanced and thriving.",
                actionable: "Dedicate some time today to doing something you truly enjoy, whether it's reading a book, spending time in nature, pursuing a hobby, or connecting with loved ones.",
                satisfying: "Nurturing your passions and connecting with what brings you joy will amplify your sense of well-being and resilience."
            });
        }

        // ---- Activity Level Recommendations ----
        if (activityLevel === "sedentary") {
            generatedRecommendations.push({
                type: 'movement',
                message: "Break free from the chair trap with a quick stretching break every hour. Even a minute of movement can make a world of difference!",
                details: "Prolonged sitting can lead to stiffness, discomfort, and increased risk of health problems. Frequent breaks help improve circulation and boost energy.",
                actionable: "Set a timer on your phone or computer to remind yourself to stand up, stretch, and walk around for a minute every hour. Make it a non-negotiable part of your day.",
                satisfying: "You'll feel refreshed, energized, and more focused throughout the day!"
            });
            generatedRecommendations.push({
                type: 'movement',
                message: "A short walk is a surprisingly potent energy booster. Instead of reaching for another cup of coffee, step outside for a quick stroll.",
                details: "Walking increases blood flow, boosts endorphins, and provides a mental break from your work.",
                actionable: "Walk to a nearby park, explore a new neighborhood, or simply stroll around the block. Aim for at least 10 minutes of brisk walking.",
                satisfying: "Enjoy the fresh air, clear your head, and return to your tasks feeling refreshed and revitalized."
            });
        } else if (activityLevel === "light") {
            generatedRecommendations.push({
                type: 'movement',
                message: "Step it up a notch and explore new ways to add more movement to your routine. A little extra activity can bring big rewards!",
                details: "Finding activities you enjoy is key to making exercise a sustainable habit. Explore different options and discover what works for you.",
                actionable: "Try a longer walk in nature, a gentle yoga or Pilates class, a fun dance workout, or a leisurely bike ride. The possibilities are endless!",
                satisfying: "You'll boost your energy, improve your mood, and feel a greater sense of accomplishment."
            });
        } else if (activityLevel === "very" || activityLevel === "extra") {
            generatedRecommendations.push({
                type: 'general',
                message: "You're a true force of nature! Just remember to prioritize rest and recovery to prevent burnout and injuries. Your body will thank you.",
                actionable: "Schedule dedicated rest days into your week and listen to your body's signals. Don't push yourself too hard when you're feeling fatigued.",
                satisfying: "Allowing your body to recover properly will enable you to continue pushing your limits and achieving your fitness goals long-term."
            });

            generatedRecommendations.push({
                type: 'nutrition',
                message: "Fuel your body with a well-balanced meal rich in carbohydrates and protein to support your active lifestyle and maximize recovery.",
                details: "Providing your body with the right nutrients after exercise is crucial for muscle repair, glycogen replenishment, and overall recovery.",
                actionable: "Prepare a post-workout meal that includes lean protein (chicken, fish, or beans), complex carbohydrates (brown rice or quinoa), and plenty of colorful vegetables.",
                satisfying: "Nourishing your body with wholesome foods will help you bounce back faster, perform better, and feel your best every day."
            });
        }

        // General Recommendation (if no specific recommendations are generated)
        if (generatedRecommendations.length === 0) {
            generatedRecommendations.push({
                type: 'general',
                message: "You sound incredibly well-balanced! Keep up the amazing work and continue prioritizing your well-being.",
                actionable: "Take a moment to appreciate your efforts and celebrate your success in creating a healthy and fulfilling lifestyle.",
                satisfying: "Knowing that you're actively investing in your well-being will bring you a sense of pride, confidence, and lasting satisfaction."
            });
        }

        setRecommendations(generatedRecommendations);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full bg-gray-700 rounded-lg p-8 shadow-2xl border border-gray-600">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-green-400 tracking-tight">
                    Your Daily Wellbeing Check-in
                </h2>
                <p className="text-gray-300 mb-4 text-center">A quick way to see some personalized suggestions for your day!</p>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="sleepHours" className="block text-sm font-semibold text-gray-200">How many hours of sleep did you get last night?</label>
                        <input type="number" id="sleepHours" className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400" value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} required placeholder="e.g., 7" min="0" max="12" />
                    </div>
                    <div>
                        <label htmlFor="energyLevel" className="block text-sm font-semibold text-gray-200">Rate your energy level today (1-10):</label>
                        <input type="number" id="energyLevel" className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400" value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)} min="1" max="10" required placeholder="e.g., 6" />
                    </div>
                    <div>
                        <label htmlFor="stressLevel" className="block text-sm font-semibold text-gray-200">How stressed are you feeling (1-10)?</label>
                        <input type="number" id="stressLevel" className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-400" value={stressLevel} onChange={(e) => setStressLevel(e.target.value)} min="1" max="10" required placeholder="e.g., 4" />
                    </div>
                    <div>
                        <label htmlFor="activityLevel" className="block text-sm font-semibold text-gray-200">Choose your typical activity level:</label>
                        <select id="activityLevel" className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-600 text-white" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} required>
                            <option value="">Select an option</option>
                            <option value="sedentary">Mostly sitting during the day</option>
                            <option value="light">I do some light walking or standing</option>
                            <option value="moderate">I exercise moderately a few times a week</option>
                            <option value="very">I am very physically active most days</option>
                            <option value="extra">I'm an athlete or have a very physical job</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed">
                        Get My Daily Plan
                    </button>
                </form>

                {recommendations.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold mb-4 text-green-300">Your Personalized Plan:</h3>
                        <ul className="list-disc list-inside text-gray-100 space-y-2">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="space-y-1">
                                    <span className="font-semibold text-yellow-300">{rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}:</span>
                                    <span className="text-gray-100">{rec.message}</span>
                                    {rec.details && <p className="text-sm text-gray-300">{rec.details}</p>}
                                    {rec.actionable && <p className="text-sm text-blue-300">Action: {rec.actionable}</p>}
                                    {rec.satisfying && <p className="text-sm text-green-300">Satisfaction: {rec.satisfying}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WellnessForm;