'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cardsData = [
	{
		id: 'dropshipping',
		badge: 'Dropshipping Challenge',
		title: 'Start your journey by building a',
		subtitle: 'profitable e-commerce business',
		description:
			'Build an e-commerce store, master sourcing, sales & digital marketing, and generate 1Cr+ in revenue in just 4 months.',
		mediaSrc:
			'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop',
		stats: [
			{ label: 'Revenue Generated', value: '₹5 Cr+', type: 'graph' },
			{ label: 'Participating Teams', value: '130+', type: 'avatars' },
		],
	},
	{
		id: 'venture',
		badge: 'Venture Initiation Program',
		title: 'Learn by building a real startup',
		subtitle: 'with real customers & revenue',
		description:
			'Participate in MU’s proprietary venture building sprint, going from ideation to launch, designed to build high-potential startups and test product-market-fit.',
		mediaSrc:
			'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
		stats: [
			{ label: 'Startups Launched', value: '80+' },
			{ label: 'Funding Raised', value: '₹50 Cr+' },
		],
	},
	{
		id: 'demoday',
		badge: 'Demo Day',
		title: 'Pitch to 100+ VCs & get term',
		subtitle: 'sheets, even before you graduate',
		description:
			'Pitch your startup to our internal partner network which includes investors from Elevation Capital, Accel, InfoEdge Ventures, Peak XV & more.',
		mediaSrc:
			'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop',
		stats: [
			{ label: 'Highest Valuation', value: '₹35 Cr+' },
			{ label: 'Highest Revenue', value: '₹50 Lakhs+' },
		],
	},
];

// Reusable stat components
const teamMembers = [
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
];

const StatSparkline = () => <div className="h-10 w-24 rounded bg-gray-200" />;
const StatAvatars = () => (
	<div className="flex -space-x-3 items-center">
		{teamMembers.map((src, i) => (
			<Image key={i} src={src} alt={`Team Member ${i + 1}`} width={36} height={36} className="h-9 w-9 rounded-full border-2 border-white object-cover"/>
		))}
	</div>
);

export default function MastersUnionHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const preventScrollHandler = useRef<((e: WheelEvent) => void) | null>(null);

  const handleWheel = (event: WheelEvent) => {
    if (isAnimating.current) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;

    setActiveIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      if (newIndex >= 0 && newIndex < cardsData.length) {
        isAnimating.current = true;
        setTimeout(() => { isAnimating.current = false; }, 800); // Debounce
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

  return (
    <div className="bg-black text-white">
      <nav className="flex items-center justify-between px-12 py-5 sticky top-0 z-50 bg-black border-b border-gray-800/70">
        <div className="text-xl font-bold tracking-wide text-white">masters' union</div>
        <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest">
          {['ABOUT US', 'ACADEMICS', 'CAREERS', 'STUDENT LIFE', 'INNOVATION'].map((item) => (
            <div key={item} className="flex items-center space-x-2 text-gray-300">
              <span>{item}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ))}
        </div>
      </nav>

      <div className="px-8 pt-24 pb-16 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight">
          Learn <span className="italic text-gray-400 font-serif">'Practically'</span> by Building
        </h1>
        <h2 className="text-5xl md:text-7xl font-light">Real Businesses</h2>
      </div>

      <div className="px-8 pb-32">
        <div
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto h-[600px]" // This is the viewport for the animation
        >
          {cardsData.map((card, index) => {
            const position = index - activeIndex;

            return (
              <motion.div
                key={card.id}
                className="absolute top-0 left-0 w-full h-half bg-white rounded-[2rem] p-8 md:p-12 text-black grid lg:grid-cols-2 gap-8 md:gap-12 items-center shadow-2xl shadow-gray-900"
                initial={{ y: 0, scale: 1 }}
                animate={{
					// Previous card stays in place (sticky), active card stacks above, next card animates in
					y: position < 0 ? '0%' : position === 0 ? '0%' : '100%',
					scale: position === 0 ? 1 : 0.95,
					opacity: position < 2 ? 1 : 0,
					zIndex: cardsData.length - Math.abs(position),
				}}
				transition={{
					duration: 0.5,
					ease: 'easeInOut',
				}}
        onMouseEnter={() => {
          const preventScroll = (e: WheelEvent) => e.preventDefault();
          preventScrollHandler.current = preventScroll;
          window.addEventListener('wheel', preventScroll, { passive: false });
        }}
        onMouseLeave={() => {
          if (preventScrollHandler.current) {
            window.removeEventListener('wheel', preventScrollHandler.current);
            preventScrollHandler.current = null;
          }
        }}
			  >
				{/* Card Content */}
                <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden bg-gray-200">
                    <Image src={card.mediaSrc} alt={card.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                    <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium self-start">
                        {card.badge}
                    </div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-light mb-4 leading-snug">
                            {card.title} <br />
                            <span className="italic font-serif text-gray-900">{card.subtitle}</span>
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">{card.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {card.stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl md:text-4xl font-bold text-black">{stat.value}</span>
                                    {stat.type === 'graph' && <StatSparkline />}
                                    {stat.type === 'avatars' && <StatAvatars />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}