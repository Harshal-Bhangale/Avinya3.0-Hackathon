/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, MessageSquare, Heart, Brain, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/navigation';

interface ProfessionalButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  primary?: boolean
}

const ProfessionalButton: React.FC<ProfessionalButtonProps> = ({
  children,
  onClick,
  className = "",
  primary = false
}) => (
  <button
    onClick={onClick}
    className={`
      relative overflow-hidden px-6 py-3 rounded-lg font-semibold
      transition-all duration-300 ease-in-out
      ${primary ?
        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' :
        'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-md hover:shadow-lg'
      }
      transform hover:-translate-y-0.5
      ${className}
    `}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
  </button>
)

interface GlowingCardProps {
  children: React.ReactNode
  className?: string
}

const GlowingCard: React.FC<GlowingCardProps> = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    <div className="relative bg-gray-900 rounded-lg p-6 ring-1 ring-gray-800 shadow-xl">
      {children}
    </div>
  </div>
)

function EnhancedLandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const navigateToChat = () => {
    router.push('/chat')
  }

  const navigateToBackend = () => {
    router.push('/facial-recognition');
  }

  const navigateToFitnessForm = () => {
    router.push('/fitness-form');
  };

  const navigateToMentalHealthForm = () => {
    router.push('/mental-health-form');
  };

  const navigateToWellnessForm = () => {
    router.push('/wellness-form');
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black opacity-50 z-0"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gray-900/90 backdrop-blur-xl shadow-lg relative">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700 ml-6">
          Synaptic-Surge
        </div>
        <div className="mr-6 flex gap-6 items-center relative z-20">
          <ProfessionalButton
            onClick={() => window.open('https://github.com/Harshal-Bhangale/BitBots_x_LevelSuperMindHackathon', '_blank')}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Code className="w-5 h-5 mr-2" />
            GitHub
          </ProfessionalButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            HolistiCare
          </h1>
          <p className="text-3xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 leading-tight py-2 px-4">
            { }
          </p>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            AI Companion for a Healthier Mind & Body
          </p>

          <ProfessionalButton onClick={navigateToChat} primary className="text-lg mt-4">
            <MessageSquare className="w-6 h-6" />
            Launch Analyzer
          </ProfessionalButton>
          {/* 
          {<ProfessionalButton onClick={navigateToBackend} primary className="text-lg">
            <MessageSquare className="w-6 h-6" />
            Facial Recognition
          </ProfessionalButton>} */}


        </motion.div>
      </section>




      {/* Health Sections */}
      <section className="relative z-10 py-20 px-4 text-center bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-black/90">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700">
          Explore Your Wellbeing
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300">
          Let's dive deeper into your health. Choose an area to explore.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Personalized Fitness Plans */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={navigateToFitnessForm}
            className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl p-6 shadow-xl transition-transform duration-300 flex flex-col items-center justify-center w-full sm:w-auto"
          >
            <Heart className="w-10 h-10 mb-4" />
            <span className="text-xl font-semibold">Personalized Fitness Plans</span>
            <span className="mt-2 text-sm text-gray-100">Get a plan tailored to your needs.</span>
          </motion.button>

          {/* Mental Health Monitoring */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={navigateToMentalHealthForm}
            className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl p-6 shadow-xl transition-transform duration-300 flex flex-col items-center justify-center w-full sm:w-auto"
          >
            <Brain className="w-10 h-10 mb-4" />
            <span className="text-xl font-semibold">Mental Health Monitoring</span>
            <span className="mt-2 text-sm text-gray-100">Understand and improve your mental wellbeing.</span>
          </motion.button>

          {/* Wellness Recommendations */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={navigateToWellnessForm}
            className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-xl p-6 shadow-xl transition-transform duration-300 flex flex-col items-center justify-center w-full sm:w-auto"
          >
            <Lightbulb className="w-10 h-10 mb-4" />
            <span className="text-xl font-semibold">Wellness Recommendations</span>
            <span className="mt-2 text-sm text-gray-100">Discover personalized tips for a healthier life.</span>
          </motion.button>
        </div>
      </section>


      {/* How to Work Section
      <section className="relative z-10 py-20 px-4 text-center bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-black/90">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700">
          How It Works
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300">
          Our AI-powered analyzer provides deep insights into your social media performance, helping you optimize and grow.
        </p>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-100">Watch the Tutorial</h3>
          <div className="relative max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105">
            <div className="w-[900px] h-[415px] mx-auto">
              <iframe
                width="900"
                height="415"
                src="https://www.youtube.com/embed/KWsQoU1kQB0"
                title="Tutorial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
                onLoad={() => setVideoLoaded(true)}
              />
            </div>
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center rounded-lg">
                <span className="text-gray-400 text-lg">Loading video...</span>
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="relative z-10 py-28 px-6 text-center bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-black/90">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700">
          Meet Our Team
        </h2>
        <p className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto text-gray-300">
          Our team is passionate about using AI to enhance your social media performance. Meet the minds behind Bit Bots.
        </p>

        <div className="flex flex-wrap justify-center gap-16">
          {/* Team Member 1 */}
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center transform transition-all duration-300 hover:scale-105 w-full sm:w-80 md:w-96">
            <img src="/assests/Profile Pic.jpg" alt="Team Member 1" className="w-40 h-40 mx-auto rounded-full mb-6" />
            <h3 className="text-2xl font-semibold text-white">Harshal Bhangale</h3>
            <p className="text-gray-400 text-lg">Backend Developer + AI Developer</p>
            <div className="flex justify-center gap-6 mt-6">
              <a href="https://github.com/Harshal-Bhangale" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/harshal-bhangale-5b803623a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center transform transition-all duration-300 hover:scale-105 w-full sm:w-80 md:w-96">
            <img src="/assests/Profile Pic.jpg" alt="Team Member 1" className="w-40 h-40 mx-auto rounded-full mb-6" />
            <h3 className="text-2xl font-semibold text-white">Anis Shaikh</h3>
            <p className="text-gray-400 text-lg">Backend Developer + AI Developer</p>
            <div className="flex justify-center gap-6 mt-6">
              <a href="https://github.com/Harshal-Bhangale" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/harshal-bhangale-5b803623a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center transform transition-all duration-300 hover:scale-105 w-full sm:w-80 md:w-96">
            <img src="/assests/Profile Pic.jpg" alt="Team Member 2" className="w-40 h-40 mx-auto rounded-full mb-6" />
            <h3 className="text-2xl font-semibold text-white">Arpita Kamble</h3>
            <p className="text-gray-400 text-lg">Web Developer</p>
            <div className="flex justify-center gap-6 mt-6">
              <a href="https://github.com/ryucraftz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/vaibhav-sathe-1920a9230/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                LinkedIn
              </a>
            </div>
          </div>
        </div>


      </section>



      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-gray-800 bg-gray-900/80">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Synaptic-Surge</h3>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <ul className="flex justify-center space-x-4">
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right text-gray-400">
            <p>© 2025 Bit Bots. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return <EnhancedLandingPage />
}