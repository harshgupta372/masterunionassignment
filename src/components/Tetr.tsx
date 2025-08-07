'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const immersionData = [
  {
    location: 'Dubai',
    business: {
      image: 'https://cdn.tetr.com/assets/ih-images/dubaiEmirates.webp',
      title: 'Business Immersions',
      description: 'Explore the nexus of global trade and luxury at the Dubai World Expo and Gold Souk.',
      subtitle: 'Dubai World Expo',
    },
    cultural: {
      image: 'https://cdn.tetr.com/assets/ih-images/dubaiSafari.webp',
      title: 'Cultural Immersions',
      description: 'Experience the vastness of the Arabian desert with a traditional safari and Bedouin dinner.',
      subtitle: 'Desert Safari',
    },
  },
  {
    location: 'India',
    business: {
      image: 'https://cdn.tetr.com/assets/ih-images/indiaMarket.webp',
      title: 'Business Immersions',
      description: 'See how street vendors of India make more money than Silicon Valley startups.',
      subtitle: 'Gurgaon&apos;s Banjara Market',
    },
    cultural: {
      image: 'https://cdn.tetr.com/assets/ih-images/indiaParade.webp',
      title: 'Cultural Immersions',
      description: "Witness the spectacular military parade and cultural pageantry on India&apos;s Republic Day.",
      subtitle: 'Republic Day Parade (New Delhi, Jan 26)',
    },
  },
  {
    location: 'Singapore',
    business: {
      image: 'https://cdn.tetr.com/assets/ih-images/singSkyline.webp',
      title: 'Business Immersions',
      description: "Explore Singapore&apos;s financial horizon.",
      subtitle: 'Monetary Authority of Singapore',
    },
    cultural: {
      image: 'https://cdn.tetr.com/assets/ih-images/singVip.webp',
      title: 'Cultural Immersions',
      description: 'Witness grand parades on Singapore National Day.',
      subtitle: 'Singapore National Day (August 9)',
    },
  },
  {
    location: 'Ghana',
    business: {
      image: 'https://cdn.tetr.com/assets/ih-images/ghanaCocoa.webp',
      title: 'Business Immersions',
      description: "Witness Ghana&apos;s cutting edge agricultural technology and unique innovations.",
      subtitle: 'AgriTech Ghana',
    },
    cultural: {
      image: 'https://cdn.tetr.com/assets/ih-images/ghanaMansion.webp',
      title: 'Cultural Immersions',
      description: 'Walk the British colonial history of Ghana on an Independence Tour.',
      subtitle: 'Accra, Ghana',
    },
  },
  {
    location: 'United States',
    business: {
      image: 'https://cdn.tetr.com/assets/ih-images/usGoogle.webp',
      title: 'Business Immersions',
      description: "Get a glimpse into new research and products at Google&apos;s HQ.",
      subtitle: 'Googleplex',
    },
    cultural: {
      image: 'https://cdn.tetr.com/assets/ih-images/usNasdaq.webp',
      title: 'Cultural Immersions',
      description: 'Witness a live IPO.',
      subtitle: 'NASDAQ, New York',
    },
  },
  {
    location: 'Argentina',
    business: {
      image: 'https://cdn.tetr.com/assets/ih-images/arGrobo.webp',
      title: 'Business Immersions',
      description: 'Learn how agribusiness is driving innovation.',
      subtitle: "Los Grobo Group&apos;s headquarters",
    },
    cultural: {
      image: 'https://cdn.tetr.com/assets/ih-images/arFootball.webp',
      title: 'Cultural Immersions',
      description: "Immerse yourself in the passion of Argentina&apos;s football.",
      subtitle: 'La Bombonera Stadium',
    },
  },
  {
    location: 'Europe',
    business: {
      image: 'https://cdn.tetr.com/assets/ih-images/euMilan.webp',
      title: 'Business Immersions',
      description: 'Immerse in the world of high fashion, runway shows, presentations, and industry talks.',
      subtitle: 'Milan Fashion Week',
    },
    cultural: {
      image: 'https://cdn.tetr.com/assets/ih-images/euRace.webp',
      title: 'Cultural Immersions',
      description: 'Immerse in the European culture of F1 motor sports.',
      subtitle: 'Italian Grand Prix',
    },
  },
];

export default function WorldImmersion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const locationRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [linePositions, setLinePositions] = useState({ y: 0, height: 0 });

  useLayoutEffect(() => {
    if (locationRefs.current.length > 1 && locationRefs.current[0] && locationRefs.current[1]) {
      const startY = locationRefs.current[0].offsetTop + locationRefs.current[0].clientHeight / 2;
      const endY = locationRefs.current[1].offsetTop + locationRefs.current[1].clientHeight / 2;
      setLinePositions({ y: startY, height: endY - startY });
    }
  }, []);

  const handleWheel = (event: WheelEvent) => {
    if (isAnimating.current) return;
    event.preventDefault();

    const direction = event.deltaY > 0 ? 1 : -1;
    setActiveIndex(prevIndex => {
        const newIndex = prevIndex + direction;
        if (newIndex >= 0 && newIndex < immersionData.length) {
            isAnimating.current = true;
            setTimeout(() => { isAnimating.current = false; }, 800);
            return newIndex;
        }
        return prevIndex;
    });
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  
  const lineYAnimate = activeIndex * linePositions.height;
  const activeData = immersionData[activeIndex];

  return (
    <div className="bg-white p-4 md:p-8 h-screen w-screen flex items-center justify-center">
      <div 
        ref={containerRef} 
        className="bg-[#1C211D] text-white font-sans rounded-2xl h-full w-full flex flex-col p-8 md:p-12 overflow-hidden"
      >
        <div className="flex-shrink-0">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
            <span className=" text-white px-2">Learn by Immersing Yourself,</span>
            <br />
            <span className="bg-[#D4FE44] text-black px-2">Across the World</span>
          </h1>
          <p className="text-white mt-4 max-w-2xl text-lg">
            From global trade shows to local bazaars, from conglomerates to startups - witness how businesses unfold. First hand.
          </p>
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mt-8 min-h-0">
          {/* Left Column: Vertical Navigation */}
          <div className="relative md:col-span-2 pt-2 flex flex-col">
            <div className="absolute left-[7px] top-0 h-full w-px bg-gray-700" />
            <motion.div
              className="absolute left-[7px] w-px bg-green-400 z-10"
              style={{ height: linePositions.height, top: linePositions.y }}
              initial={{ y: 0 }}
              animate={{ y: lineYAnimate }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <div className="flex flex-col justify-between flex-grow">
              {immersionData.map((data, index) => (
                <button
                  key={data.location}
                  ref={el => { locationRefs.current[index] = el; }}
                  onClick={() => setActiveIndex(index)}
                  className="relative flex items-center w-full text-left group py-2"
                >
                  <div className={`w-4 h-4 rounded-full border-2 z-10 transition-colors ${activeIndex === index ? 'border-green-500 bg-green-500' : 'border-gray-500 bg-[#1C211D] group-hover:border-green-500'}`}></div>
                  <span className={`ml-4 text-lg font-medium transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                    {data.location}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Content Display */}
          <div className="md:col-span-3 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
              >
                {/* Business Immersion Card */}
                <div className="space-y-3">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image src={activeData.business.image} alt={activeData.business.title} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold tracking-wider">{activeData.business.title.toUpperCase()}</p>
                    <p className="text-gray-300 text-sm mt-1">{activeData.business.description}</p>
                    <h3 className="text-white font-semibold mt-2">{activeData.business.subtitle}</h3>
                    <p className="text-gray-500 text-xs font-mono mt-2">01 / 02</p>
                  </div>
                </div>

                {/* Cultural Immersion Card */}
                <div className="space-y-3">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image src={activeData.cultural.image} alt={activeData.cultural.title} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold tracking-wider">{activeData.cultural.title.toUpperCase()}</p>
                    <p className="text-gray-300 text-sm mt-1">{activeData.cultural.description}</p>
                    <h3 className="text-white font-semibold mt-2">{activeData.cultural.subtitle}</h3>
                    <p className="text-gray-500 text-xs font-mono mt-2">01 / 02</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
