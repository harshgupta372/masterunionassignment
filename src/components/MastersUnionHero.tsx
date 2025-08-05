'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Users, TrendingUp, Target, ChevronDown } from 'lucide-react';

// --- DATA for the three hands-on learning cards ---
const learningData = [
  {
    id: 'consulting',
    badge: 'CONSULTING CHALLENGE',
    icon: Users,
    iconColor: 'text-yellow-400',
    borderColor: 'border-yellow-400',
    title: 'Solve Real Problems &',
    subtitle: 'Learn from Leadership',
    description: 'Consult Cars24 & 100+ companies, solve real problems, pitch to leadership & have a shot at placements.',
    mediaSrc: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    stats: [
      { number: '1', label: '15% of student consultants land PPOs' },
      { number: '2', label: 'Over 300+ clients annually' },
      { number: '3', label: '1 in 6 live projects with international firms' },
    ],
  },
  {
    id: 'investment',
    badge: 'MASTERS\' UNION INVESTMENT FUND',
    icon: TrendingUp,
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-400',
    title: 'Invest From a',
    subtitle: '5Cr Student Fund',
    description: 'Gain hands-on experience in finance by managing Masters\' Union\'s investment fund. Invest in crypto, equities, real estate, and startups while learning from industry experts.',
    mediaSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    stats: [
      { number: '1', label: '10+ investments made every year' },
      { number: '2', label: 'Trade on stocks, crypto & even real estate' },
      { number: '3', label: '65%+ returns generated in 2024-25' },
    ],
  },
  {
    id: 'offcampus',
    badge: 'OFF-CAMPUS',
    icon: Target,
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-400',
    title: 'Visit India\'s',
    subtitle: 'Biggest Factories',
    description: 'Meet 50+ operators, visit India\'s biggest factories, and gain insights from the likes of Physics Wallah & Cars24.',
    mediaSrc: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
    stats: [
      { number: '1', label: '50+ industrial visits every year' },
      { number: '2', label: '30% engagements convert to consulting projects' },
      { number: '3', label: 'Land internships while meeting CEOs' },
    ],
  },
];

export default function HandsOnLearning() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white">
      {/* --- NAVIGATION BAR --- */}
      <nav className="flex items-center justify-between px-12 py-5 sticky top-0 z-50 bg-black border-b border-gray-800/70">
        {/* Simple Text Logo */}
        <div className="text-xl font-bold tracking-wide text-white cursor-pointer">
          masters' union
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest">
            {['ABOUT US', 'ACADEMICS', 'CAREERS', 'STUDENT LIFE', 'INNOVATION'].map(item => 
                <a key={item} className="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                    <span>{item}</span>
                    <ChevronDown className="w-4 h-4" />
                </a>
            )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8">
        <div className="pt-24 pb-16">
          <h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight">Hands-On Learning:</h1>
          <h2 className="text-5xl md:text-7xl font-light"><span className="italic text-green-400 font-serif">Consult, Invest, Experience</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left Column: Scrolling Text */}
          <div className="lg:col-span-2">
            {learningData.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div key={card.id} ref={el => sectionRefs.current[index] = el} className="min-h-[90vh] flex">
                  <div className="flex flex-col items-center mr-8 pt-2">
                    <div className={`w-12 h-12 rounded-full border-2 ${card.borderColor} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    {index < learningData.length - 1 && <div className="w-px flex-grow bg-gray-700 my-4"></div>}
                  </div>
                  
                  <div className="pt-1">
                    <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-xs font-medium tracking-wider inline-block mb-6">
                      {card.badge}
                    </div>
                    <h3 className="text-4xl font-light mb-4 leading-tight">
                      {card.title} <br />
                      <span className={`${card.iconColor} italic font-serif`}>{card.subtitle}</span>
                    </h3>
                    <p className="text-gray-400 mb-8">{card.description}</p>
                    <div className="space-y-4">
                      {card.stats.map(stat => (
                        <div key={stat.number} className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                            {stat.number}
                          </div>
                          <p className="text-gray-300">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Media */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900" style={{ aspectRatio: '16/10' }}>
                {learningData.map((card, index) => (
                  <img
                    key={card.id}
                    src={card.mediaSrc}
                    alt={card.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-200 hover:bg-white/20 border border-white/20">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}