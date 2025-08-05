'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// --- DATA for the faculty members with REAL images ---
const facultyData = [
  {
    name: 'Mr. Rajat Mathur',
    title: 'Managing Director',
    company: 'MorganStanley',
    imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/rajatMathur.webp',
  },
  {
    name: 'Mr. Naveen Munjal',
    title: 'Managing Director',
    company: 'HEROELECTRIC',
    imageSrc: 'https://images.mastersunion.link/uploads/24062025/v3/naveenMunjal.webp',
  },
  {
    name: 'Mr. Arjun Vaidya',
    title: 'Founder',
    company: 'DR. VAIDYA\'S',
    imageSrc: 'https://images.mastersunion.link/uploads/24062025/v3/arjunVaidya.webp',
  },
  {
    name: 'Mr. Manoj Kohli',
    title: 'Former Country Head',
    company: 'SoftBank',
    imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/manojKohli.webp',
  },
  {
    name: 'Captain Raghu Raman',
    title: 'Former President',
    company: 'Reliance',
    imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/captainRaghu.webp',
  },
  {
    name: 'Mr. Rohit Kapoor',
    title: 'CEO, Food Marketplace',
    company: 'Swiggy',
    imageSrc: 'https://images.mastersunion.link/uploads/24062025/v2/rohitKapoor.webp',
  },
];

// --- Data for the statistics on the left ---
const statsData = [
    { percentage: 40, label: 'Industry Practitioners', description: 'Leaders and entrepreneurs sharing real-world insights' },
    { percentage: 30, label: 'Full-Time Faculty', description: 'Dedicated educators shaping core learning' },
    { percentage: 30, label: 'Visiting Faculty', description: 'Professors from Harvard, Stanford and Wharton' },
];

// --- Reusable component for styled company logos ---
const CompanyLogo = ({ company }) => {
    switch (company) {
        case 'SoftBank':
            return <div className="flex items-center space-x-1"><div className="h-0.5 w-4 bg-gray-400"></div><div className="h-0.5 w-4 bg-gray-400"></div></div>;
        default:
            return <span className="text-xs font-bold tracking-wider text-gray-300">{company}</span>;
    }
};

export default function FacultyModel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-black text-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Header Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-20"
        >
          <h2 className="text-4xl font-light tracking-tight">Faculty Model at Masters' Union</h2>
          <button className="flex items-center space-x-3 border border-white/30 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm">
            <span>See all our Masters</span>
            <X className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Stats with vertical line and animations */}
          <motion.div 
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex flex-col space-y-12">
                {statsData.map((stat, index) => (
                    <motion.div key={stat.label} variants={itemVariants} className="flex items-start space-x-6">
                        <div className="flex flex-col items-center">
                            <div className="text-7xl font-light text-yellow-400 -ml-4">
                                {stat.percentage}<span className="text-2xl ml-1">%</span>
                            </div>
                            {index < statsData.length -1 && <div className="w-px h-24 bg-gray-700 mt-4"></div>}
                        </div>
                        <div className="pt-4">
                            <h3 className="text-lg font-medium text-white">{stat.label}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Right Column: Faculty Cards with animations */}
          <motion.div 
            className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {facultyData.map((faculty) => (
              <motion.div key={faculty.name} variants={itemVariants} className="bg-[#1a1a1a] rounded-xl overflow-hidden group">
                <div className="relative bg-yellow-400/10 aspect-square flex items-end justify-center">
                  <Image
                    src={faculty.imageSrc}
                    alt={faculty.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white text-sm">{faculty.name}</h4>
                  <p className="text-xs text-gray-400 mb-3">{faculty.title}</p>
                  <div className="border-t border-white/10 pt-3 flex items-center h-6">
                    <CompanyLogo company={faculty.company} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
