'use client';

import { useState } from 'react';
import { Play, Download, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function MastersUnionHero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const teamMembers = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold">masters&apos; union</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <span>ABOUT US</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <span>ACADEMICS</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="cursor-pointer hover:text-gray-300 transition-colors">CAREERS</span>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <span>STUDENT LIFE</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <span>INNOVATION</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 py-12 max-w-7xl mx-auto">
        {/* Hero Text */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight">
            Learn <span className="italic text-green-400 font-serif">&apos;Practically&apos;</span> by Building
          </h1>
          <h2 className="text-5xl md:text-7xl font-light">Real Businesses</h2>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 text-black relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Video/Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video group cursor-pointer"
                   onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                <Image 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Students collaborating"
                  fill
                  className="object-cover"
                />
                {/* Play Button Overlay */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110">
                      <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                Dropshipping Challenge
              </div>
              
              <div>
                <h3 className="text-3xl font-light mb-4">
                  Start your journey by building a <br />
                  <span className="italic font-serif">profitable e-commerce business</span>
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Build an e-commerce store, master sourcing, sales & digital marketing, and generate 1Cr+ in revenue in just 4 months
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Revenue Generated */}
                <div>
                  <p className="text-gray-500 text-sm mb-2">Revenue Generated</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold">₹5 Cr+</span>
                    <div className="flex-1 h-12 relative">
                      <svg className="w-full h-full" viewBox="0 0 100 40">
                        <path
                          d="M5,35 Q20,25 35,30 T65,20 T95,15"
                          stroke="#f97316"
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle cx="95" cy="15" r="3" fill="#f97316" />
                        <path
                          d="M5,35 Q20,25 35,30 T65,20 T95,15 L95,40 L5,40 Z"
                          fill="url(#gradient)"
                          opacity="0.3"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Participating Teams */}
                <div>
                  <p className="text-gray-500 text-sm mb-2">Participating Teams</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold">130+</span>
                    <div className="flex -space-x-2">
                      {teamMembers.map((src: string, index: number) => (
                        <Image
                          key={index}
                          src={src}
                          alt={`Team member ${index + 1}`}
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-white object-cover"
                        />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                        +5
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 transition-colors px-6 py-3 rounded-xl group">
                <span className="font-medium">Download Dropshipping Report</span>
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-400/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none"></div>
    </div>
  );
} 