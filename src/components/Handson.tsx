'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import Image from 'next/image';

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
		cta: 'Download Dropshipping Report',
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
		cta: 'Explore Venture Program',
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
		cta: 'Learn About Demo Day',
	},
];

const teamMembers = [
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
	// 'https://images.unsplash.com/photo-149479010877s-2616b612b5bc?w=40&h=40&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
];

// --- UPDATED StatSparkline component to exactly match the image ---
const StatSparkline = () => (
	<div className="flex-1 h-16 relative max-w-[140px]">
		<svg className="w-full h-full" viewBox="0 0 140 60">
			<defs>
				<linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#fb923c" stopOpacity="0.2" />
					<stop offset="100%" stopColor="#fb923c" stopOpacity="0.05" />
				</linearGradient>
			</defs>
			<g stroke="#e5e7eb" strokeWidth="0.5">
				<line x1="0" y1="10" x2="140" y2="10" />
				<line x1="0" y1="20" x2="140" y2="20" />
				<line x1="0" y1="30" x2="140" y2="30" />
				<line x1="0" y1="40" x2="140" y2="40" />
			</g>
			<g fill="#9ca3af" fontSize="8" textAnchor="middle">
				<text x="10" y="55">
					10
				</text>
				<text x="40" y="55">
					20
				</text>
				<text x="70" y="55">
					30
				</text>
				<text x="100" y="55">
					40
				</text>
				<text x="130" y="55">
					50
				</text>
			</g>
			<path
				d="M10,45 L40,35 L70,40 L100,25 L130,15 L130,50 L10,50 Z"
				fill="url(#areaGradient)"
			/>
			<path
				d="M10,45 L40,35 L70,40 L100,25 L130,15"
				stroke="#fb923c"
				strokeWidth="2"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="10" cy="45" r="2" fill="#fb923c" />
			<circle cx="40" cy="35" r="2" fill="#fb923c" />
			<circle cx="70" cy="40" r="2" fill="#fb923c" />
			<circle cx="100" cy="25" r="2" fill="#fb923c" />
			<circle cx="130" cy="15" r="3" fill="#fb923c" stroke="#fff" strokeWidth="1" />
		</svg>
	</div>
);

const StatAvatars = () => (
	<div className="flex -space-x-3 items-center">
		{teamMembers.map((src, i) => (
			<Image
				key={i}
				src={src}
				alt={`TM ${i}`}
				width={36}
				height={36}
				className="rounded-full border-2 border-white object-cover"
			/>
		))}
		<div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
			+5
		</div>
	</div>
);

export default function MastersUnionHero() {
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [isHoveringCard, setIsHoveringCard] = useState(false);
	const cardContainerRef = useRef<HTMLDivElement>(null);
	const animationScrollRef = useRef(0);
	const maxVirtualScroll = 2000;

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			if (isHoveringCard) {
				event.preventDefault();
				const { deltaY } = event;
				animationScrollRef.current += deltaY;
				animationScrollRef.current = Math.max(
					0,
					Math.min(maxVirtualScroll, animationScrollRef.current)
				);
				const newIndex = Math.round(
					(animationScrollRef.current / maxVirtualScroll) * (cardsData.length - 1)
				);
				if (newIndex !== activeCardIndex) setActiveCardIndex(newIndex);
			}
		};
		window.addEventListener('wheel', handleWheel, { passive: false });
		return () => window.removeEventListener('wheel', handleWheel);
	}, [isHoveringCard, activeCardIndex]);

	return (
		<div className="bg-black text-white">
			{/* Keep the nav section but remove clickable elements */}
			<nav className="flex items-center justify-between px-12 py-5 sticky top-0 z-50 bg-black border-b border-gray-800/70">
				<div className="text-xl font-bold tracking-wide text-white">
					masters' union
				</div>
				<div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest">
					{['ABOUT US', 'ACADEMICS', 'CAREERS', 'STUDENT LIFE', 'INNOVATION'].map(
						(item) => (
							<div key={item} className="flex items-center space-x-2 text-gray-300">
								<span>{item}</span>
								<ChevronDown className="w-4 h-4" />
							</div>
						)
					)}
				</div>
			</nav>

			<div className="px-8 pt-24 pb-16 max-w-7xl mx-auto">
				<h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight">
					Learn{' '}
					<span className="italic text-gray-400 font-serif">'Practically'</span> by
					Building
				</h1>
				<h2 className="text-5xl md:text-7xl font-light">Real Businesses</h2>
			</div>

			<div className="px-8 pb-32">
				<div
					ref={cardContainerRef}
					onMouseEnter={() => setIsHoveringCard(true)}
					onMouseLeave={() => setIsHoveringCard(false)}
					className="sticky top-28 bg-white rounded-[2rem] p-12 text-black w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center shadow-2xl shadow-gray-900"
				>
					<div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-gray-200">
						{cardsData.map((card, index) => (
							<Image
								key={card.id}
								src={card.mediaSrc}
								alt={card.title}
								fill
								className={`object-cover transition-opacity duration-500 ${
									activeCardIndex === index ? 'opacity-100' : 'opacity-0'
								}`}
							/>
						))}
						{/* Remove the play button div */}
					</div>
					<div className="relative h-full overflow-hidden">
						<div
							className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
							style={{ transform: `translateY(-${activeCardIndex * 100}%)` }}
						>
							{cardsData.map((card) => (
								<div
									key={card.id}
									className="w-full h-full flex flex-col justify-center space-y-8"
								>
									<div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium self-start">
										{card.badge}
									</div>
									<div>
										<h3 className="text-4xl font-light mb-4 leading-snug">
											{card.title} <br />
											<span className="italic font-serif text-gray-900">
												{card.subtitle}
											</span>
										</h3>
										<p className="text-gray-600 text-base leading-relaxed">
											{card.description}
										</p>
									</div>
									<div className="grid grid-cols-2 gap-8">
										{card.stats.map((stat) => (
											<div key={stat.label}>
												<p className="text-sm text-gray-500 mb-2">
													{stat.label}
												</p>
												<div className="flex items-center space-x-4">
													<span className="text-4xl font-bold text-black">
														{stat.value}
													</span>
													{stat.type === 'graph' && <StatSparkline />}
													{stat.type === 'avatars' && <StatAvatars />}
												</div>
											</div>
										))}
									</div>
									{/* Remove the download button */}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}