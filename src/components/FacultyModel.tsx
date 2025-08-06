'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for each faculty category (remains the same) ---
const facultyData = {
  0: { // Index 0
    id: 'Industry Practitioners',
    faculty: [
        { name: 'Mr. Rajat Mathur', title: 'Managing Director', company: 'MorganStanley', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/rajatMathur.webp' },
        { name: 'Mr. Naveen Munjal', title: 'Managing Director', company: 'HEROELECTRIC', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v3/naveenMunjal.webp' },
        { name: 'Mr. Arjun Vaidya', title: 'Founder', company: "DR. VAIDYA'S", imageSrc: 'https://images.mastersunion.link/uploads/24062025/v3/arjunVaidya.webp' },
        { name: 'Mr. Manoj Kohli', title: 'Former Country Head', company: 'SoftBank', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/manojKohli.webp' },
        { name: 'Captain Raghu Raman', title: 'Former President', company: 'Reliance', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/captainRaghu.webp' },
        { name: 'Mr. Rohit Kapoor', title: 'CEO, Food Marketplace', company: 'Swiggy', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/rohitKapoor.webp' },
    ]
  },
  1: { // Index 1
    id: 'Full-Time Faculty',
    faculty: [
        { name: 'Dr. Garima Chaklader', title: 'Ph.D', company: 'IIM BANGALORE', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/garimaChaklader.webp' },
        { name: 'Dr. Vipin Sreekumar', title: 'Ph.D', company: 'IIM CALCUTTA', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/vipin.webp' },
        { name: 'Dr. Kashika Sud', title: 'Ph.D', company: 'IIM AHMEDABAD', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/kashikaSud.webp' },
        { name: 'Dr. Bhupesh Manoharan', title: 'Ph.D', company: 'IIM CALCUTTA', imageSrc: 'https://images.mastersunion.link/uploads/27062025/v1/Photo.webp' },
        { name: 'Dr. Nandini Seth', title: 'Ph.D', company: 'IIM BANGALORE', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/nandiniSeth.webp' },
        { name: 'Dr. Manu Prasad', title: 'Ph.D', company: 'IIM TIRUCHIRAPPALLI', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/manuPrasad.webp' },
    ]
  },
  2: { // Index 2
    id: 'Visiting Faculty',
    faculty: [
        { name: 'Dr. Zal Phiroz', title: 'Adjunct Professor', company: 'HARVARD UNIVERSITY', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/zalPhiroz.webp' },
        { name: 'Mr. Daniel Vliet', title: 'Executive Director', company: 'Cornell University', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/danielGarett.webp' },
        { name: 'Mr. Rajat Baijal', title: 'Adjunct Professor', company: 'COLUMBIA UNIVERSITY', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/rajatBaijal.webp' },
        { name: 'Dr. Shad Morris', title: 'Adjunct Professor', company: 'MITSLOAN', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/shadMorris.webp' },
        { name: 'Dr. Lan Mo', title: 'Adjunct Professor', company: 'NYU SHANGHAI', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/LanMa.webp' },
        { name: 'Dr. Rajesh Bhargave', title: 'Associate Professor', company: 'Imperial College', imageSrc: 'https://images.mastersunion.link/uploads/24062025/v1/rajeshBhargave.webp' },
    ]
  },
};

const statsData = [
    { percentage: 40, label: 'Industry Practitioners', description: 'Leaders and entrepreneurs sharing real-world insights' },
    { percentage: 30, label: 'Full-Time Faculty', description: 'Dedicated educators shaping core learning' },
    { percentage: 30, label: 'Visiting Faculty', description: 'Professors from Harvard, Stanford and Wharton' },
];

const CompanyLogo = ({ company }) => <span className="text-[10px] font-bold tracking-wider text-gray-400">{company}</span>;

export default function FacultyModel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // --- NEW: Refs and State for dynamic line animation ---
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [linePositions, setLinePositions] = useState({ y: 0, height: 0 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // UseLayoutEffect is better for DOM measurements to avoid flickering
  useLayoutEffect(() => {
    if (statRefs.current[0] && statRefs.current[1]) {
      const startY = statRefs.current[0].offsetTop + statRefs.current[0].clientHeight / 2;
      const endY = statRefs.current[1].offsetTop + statRefs.current[1].clientHeight / 2;
      setLinePositions({ y: startY, height: endY - startY });
    }
  }, []);

  const handleWheel = (event: WheelEvent) => {
    if (isAnimating.current) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;
    setActiveIndex(prevIndex => {
        const newIndex = prevIndex + direction;
        if (newIndex >= 0 && newIndex < statsData.length) {
            isAnimating.current = true;
            setTimeout(() => { isAnimating.current = false; }, 800);
            return newIndex;
        }
        return prevIndex;
    });
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) { currentRef.addEventListener('wheel', handleWheel, { passive: false }); }
    return () => { if (currentRef) { currentRef.removeEventListener('wheel', handleWheel); }};
  }, []);

  // Animate the line to the correct position based on the active index
  const lineYAnimate = activeIndex * linePositions.height;

  return (
    <div ref={containerRef} className="bg-black text-white py-12 h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-light tracking-tight">Faculty Model at Masters' Union</h2>
          <button className="flex items-center space-x-3 border border-white/30 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm">
            <span>See all our Masters</span> <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-grow max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-1 h-full">
          <div className="relative h-full">
            {/* The animated yellow line */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="absolute left-[-2.1rem] w-px bg-yellow-400 h-full"
                style={{ height: linePositions.height, top: linePositions.y }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: activeIndex > 0 ? 1 : 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: .5, ease: 'easeInOut' }}
              >
                <motion.div
                  className="h-half w-full bg-yellow-400"
                  initial={{ y: 0 }}
                  animate={{ y: lineYAnimate }}
                  exit={{ y: 0 }}
                  transition={{ duration: .5, ease: 'easeInOut' }}
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="flex flex-col justify-between h-full py-8">
                {statsData.map((stat, index) => (
                    <div key={stat.label} ref={el => statRefs.current[index] = el} className="flex items-center space-x-6">
                        <div className={`text-6xl font-light transition-colors duration-300 ${activeIndex === index ? 'text-yellow-400' : 'text-gray-600'}`}>
                            {stat.percentage}<span className="text-xl ml-1">%</span>
                        </div>
                        <div className={`transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>
                            <h3 className="text-base font-medium">{stat.label}</h3>
                            <p className="text-xs leading-relaxed">{stat.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 h-full flex items-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid  grid-cols-2 md:grid-cols-3 gap-22" // Reduced gap
                >
                    {facultyData[activeIndex].faculty.map((faculty) => (
                        <div key={faculty.name} className="bg-[#1a1a1a] rounded-xl overflow-hidden group">
                            <div className="relative bg-gray-800 aspect-square">
                                <Image src={faculty.imageSrc} alt={faculty.name} fill className="object-cover object-top transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-3">
                                <h4 className="font-semibold text-white text-xs">{faculty.name}</h4>
                                <p className="text-[11px] text-gray-400 mb-2">{faculty.title}</p>
                                <div className="border-t border-white/10 pt-2 flex items-center h-5">
                                    <CompanyLogo company={faculty.company} />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}