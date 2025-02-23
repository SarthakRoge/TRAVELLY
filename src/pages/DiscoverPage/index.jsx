import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Palmtree, Mountain, Building2, Trees, Waves, 
  CookingPot, Utensils, Camera, Wine, Sun, 
  Snowflake, Cloud, MapPin, Compass, Map, 
  ArrowLeft, Landmark, Bird, Space as Spa, Umbrella,
  Tent, Palmtree as Palm, Mountain as MountainIcon, Plane,
  Flower, Leaf, Globe, Wind
} from 'lucide-react';
import { chatSession } from '../../services/AIModal';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const questions = [
  {
    id: 'destination',
    title: 'What type of destination do you prefer?',
    subtitle: 'Let us help you find the ideal travel experience based on your preferences',
    options: [
      { id: 'Beach Paradise', label: 'Beach Paradise', icon: Palmtree, description: 'Relax on sandy shores with crystal-clear waters' },
      { id: 'Mountain Retreat', label: 'Mountain Retreat', icon: Mountain, description: 'Explore scenic peaks and fresh air' },
      { id: 'Cultural Heritage', label: 'Cultural Heritage', icon: Landmark, description: 'Discover historical sites and rich traditions' },
      { id: 'Urban Adventure', label: 'Urban Adventure', icon: Building2, description: 'Experience bustling cities and vibrant nightlife' },
      { id: 'Wildlife Safari', label: 'Wildlife Safari', icon: Bird, description: 'Explore nature and see exotic animals' },
      { id: 'Tropical Rainforest', label: 'Tropical Rainforest', icon: Trees, description: 'Immerse in lush greenery and waterfalls' },
      { id: 'Desert Escape', label: 'Desert Escape', icon: Sun, description: 'Enjoy vast dunes and starry nights' },
      { id: 'Island Getaway', label: 'Island Getaway', icon: Palm, description: 'Relax on a secluded island paradise' }
    ]
  },
  {
    id: 'activities',
    title: 'What kind of activities do you prefer?',
    subtitle: 'Choose your favorite way to explore and experience new places',
    options: [
      { id: 'Adventure Sports', label: 'Adventure Sports', icon: MountainIcon, description: 'Skydiving, bungee jumping, or white-water rafting' },
      { id: 'Cultural Exploration', label: 'Cultural Exploration', icon: Landmark, description: 'Visiting museums, historical sites, and local markets' },
      { id: 'Nature & Wildlife', label: 'Nature & Wildlife', icon: Bird, description: 'Hiking, birdwatching, or safari tours' },
      { id: 'Relaxation & Wellness', label: 'Relaxation & Wellness', icon: Spa, description: 'Spa retreats, beach lounging, or meditation' },
      { id: 'Food & Culinary', label: 'Food & Culinary', icon: Utensils, description: 'Tasting local cuisine, cooking classes, or wine tours' },
      { id: 'Water Activities', label: 'Water Activities', icon: Waves, description: 'Snorkeling, scuba diving, or surfing' }
    ]
  },
  {
    id: 'continent',
    title: 'Which continent would you like to visit?',
    subtitle: 'Select your preferred region for exploration',
    options: [
      { id: 'Asia', label: 'Asia', icon: Globe, description: 'Ancient traditions meet modern marvels' },
      { id: 'Europe', label: 'Europe', icon: Globe, description: 'Rich history and cultural heritage' },
      { id: 'North America', label: 'North America', icon: Globe, description: 'Diverse landscapes and vibrant cities' },
      { id: 'South America', label: 'South America', icon: Globe, description: 'Natural wonders and ancient civilizations' },
      { id: 'Africa', label: 'Africa', icon: Globe, description: 'Wildlife and breathtaking landscapes' },
      { id: 'Oceania', label: 'Oceania', icon: Globe, description: 'Island paradises and unique wildlife' },
      { id: 'Antarctica', label: 'Antarctica', icon: Globe, description: 'Pristine wilderness and polar adventures' }
    ]
  },
  {
    id: 'popularity',
    title: 'Do you prefer a popular tourist spot or a hidden gem?',
    subtitle: 'Tell us your preferred level of destination popularity',
    options: [
      { id: 'Tourist Spots', label: 'Popular Spots', icon: MapPin, description: 'Well-known destinations with established attractions' },
      { id: 'Hidden-Gem', label: 'Hidden Gems', icon: Compass, description: 'Off-the-beaten-path locations with unique experiences' },
    ]
  },
  {
    id: 'month',
    title: 'In which month are you planning your trip?',
    subtitle: 'Choose your preferred travel time to find the perfect seasonal experiences',
    options: [
      { id: 'january', label: 'January', icon: Snowflake, description: 'Winter wonderland and New Year celebrations' },
      { id: 'february', label: 'February', icon: Snowflake, description: 'Romantic getaways and winter sports' },
      { id: 'march', label: 'March', icon: Wind, description: 'Early spring and cultural festivals' },
      { id: 'april', label: 'April', icon: Flower, description: 'Spring blooms and mild weather' },
      { id: 'may', label: 'May', icon: Flower, description: 'Perfect weather and fewer crowds' },
      { id: 'june', label: 'June', icon: Sun, description: 'Early summer and long daylight hours' },
      { id: 'july', label: 'July', icon: Sun, description: 'Peak summer and beach season' },
      { id: 'august', label: 'August', icon: Umbrella, description: 'Warm weather and summer festivals' },
      { id: 'september', label: 'September', icon: Leaf, description: 'Pleasant temperatures and harvest season' },
      { id: 'october', label: 'October', icon: Leaf, description: 'Fall colors and wine harvests' },
      { id: 'november', label: 'November', icon: Cloud, description: 'Autumn charm and off-season deals' },
      { id: 'december', label: 'December', icon: Snowflake, description: 'Holiday magic and winter festivities' }
    ]
  }
];

const AIplacePrompt = "Suggest the 6 best travel destinations worldwide for {month} month based on the following preferences: {destination}, continent: {continent}, activities: {activities} and popularity: {popularity}. Provide the places list with name, a short 2 line description, and an image URL for each destination in JSON format.";

const DiscoveryPage = () => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelection = (questionId, optionId) => {
    setSelections(prev => ({
      ...prev,
      [questionId]: optionId
    }));

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    }
  };

  const generatePlaces = async () => {
    if (Object.keys(selections).length !== questions.length) {
      toast.error('Please answer all questions first');
      return;
    }

    setLoading(true);
    try {
      const prompt = AIplacePrompt
        .replace('{month}', selections.month)
        .replace('{destination}', selections.destination)
        .replace('{continent}', selections.continent)
        .replace('{activities}', selections.activities)
        .replace('{popularity}', selections.popularity);

      const result = await chatSession.sendMessage(prompt);
      const places = JSON.parse(result.response.text());
      
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'tempPlaces'), {
        selections,
        places,
        createdAt: new Date(),
      });

      // Navigate to view page
      navigate(`/view-place/${docRef.id}`);
    } catch (error) {
      console.error('Error generating places:', error);
      toast.error('Failed to generate places');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FFF9] to-[#F0FFF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-teal-600 hover:text-teal-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="w-24"></div>
        </div>

        <div className="relative">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-teal-100 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-teal-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {questions[currentQuestion].title}
            </h1>
            <p className="text-gray-600 text-lg">
              {questions[currentQuestion].subtitle}
            </p>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`grid ${questions[currentQuestion].options.length > 4 ? 'grid-cols-4' : 'grid-cols-2'} gap-6`}>
                  {questions[currentQuestion].options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selections[questions[currentQuestion].id] === option.id;

                    return (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelection(questions[currentQuestion].id, option.id)}
                        className={`
                          relative w-full ${questions[currentQuestion].options.length > 4 ? 'h-64' : 'h-80'} text-left cursor-pointer rounded-3xl p-6
                          transition-all duration-300 overflow-hidden group
                          ${isSelected 
                            ? 'bg-gradient-to-br from-teal-500 to-emerald-400 text-white shadow-xl shadow-teal-500/25' 
                            : 'bg-white hover:shadow-xl border border-teal-100 hover:border-teal-200'}
                        `}
                      >
                        <div className="relative z-10 h-full flex flex-col">
                          <div className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                            ${isSelected ? 'bg-white/20' : 'bg-teal-50'}
                          `}>
                            <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-teal-500'}`} />
                          </div>
                          <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                            {option.label}
                          </h3>
                          <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                            {option.description}
                          </p>
                        </div>
                        <div className={`
                          absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-400/5
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          ${isSelected ? 'opacity-100' : ''}
                        `} />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {currentQuestion === questions.length - 1 && Object.keys(selections).length === questions.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <button
                onClick={generatePlaces}
                disabled={loading}
                className={`
                  px-12 py-6 bg-gradient-to-r from-teal-500 to-emerald-400 text-white text-xl 
                  rounded-full font-semibold transition-all duration-300 transform 
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105'}
                `}
              >
                {loading ? 'Generating Places...' : 'Find My Perfect Destination'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage;