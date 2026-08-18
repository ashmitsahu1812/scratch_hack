import React, { useState, useEffect } from 'react';
import { Flag, Play, Sparkles, Trophy, Users, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';

/* ── Floating 3D Geometric Shapes ── */
function GeoBox({ color, shadow, style, className }) {
  return (
    <div className={className} style={style}>
      <div style={{
        width: '100%', height: '100%',
        background: color,
        border: '3px solid rgba(0,0,0,0.25)',
        boxShadow: `-8px 8px 0 ${shadow}`,
        transform: 'perspective(300px) rotateX(18deg) rotateY(-28deg)',
      }} />
    </div>
  );
}

function GeoCylinder({ color, shadow, style, className }) {
  return (
    <div className={className} style={{ ...style }}>
      <div style={{
        width: '100%', height: '100%',
        background: color,
        borderRadius: '50% 50% 50% 50% / 18% 18% 82% 82%',
        border: '3px solid rgba(0,0,0,0.2)',
        boxShadow: `0 10px 0 ${shadow}`,
      }} />
    </div>
  );
}

function GeoStar({ color, className }) {
  return (
    <div className={className} style={{
      width: '60px', height: '60px',
      background: color,
      clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
    }} />
  );
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0)   return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)   return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)     return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)      return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="overview" className="relative pt-12 pb-24 overflow-hidden">

      {/* ── Floating Geometric Decorations ── */}
      {/* Top-right yellow 3D box */}
      <GeoBox
        color="#FFE500" shadow="#CCB800"
        className="absolute top-10 right-12 w-16 h-16 geo-float pointer-events-none hidden lg:block"
      />
      {/* Top-left pink cylinder */}
      <GeoCylinder
        color="#FF5CE8" shadow="#CC46BC"
        className="absolute top-24 left-8 w-12 h-16 geo-float-alt pointer-events-none hidden lg:block"
      />
      {/* Bottom-left green 3D box */}
      <GeoBox
        color="#00FFB3" shadow="#00CC8F"
        className="absolute bottom-16 left-16 w-14 h-14 geo-float-slow pointer-events-none hidden lg:block"
      />
      {/* Bottom-right coral cylinder */}
      <GeoCylinder
        color="#FF6B6B" shadow="#CC4444"
        className="absolute bottom-24 right-24 w-10 h-14 geo-float pointer-events-none hidden lg:block"
      />
      {/* Mid-left starburst */}
      <GeoStar
        color="#FF5CE8"
        className="absolute top-1/2 left-4 geo-float-alt pointer-events-none hidden xl:block opacity-80"
      />
      {/* Mid-right purple box */}
      <GeoBox
        color="#A78BFF" shadow="#7C5CBF"
        className="absolute top-1/3 right-6 w-10 h-10 geo-float-slow pointer-events-none hidden xl:block"
      />

      {/* Decorative Blocks */}
      <div className="bg-block bg-block-1 geo-float"></div>
      <div className="bg-block bg-block-2 geo-float-alt"></div>
      <div className="bg-block bg-block-4 geo-float-slow"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >

        {/* Announce badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#FFE500] text-[#2B2EFF] font-sans font-bold text-sm rounded-sm border-2 border-[#CCB800] shadow-[4px_4px_0_#CCB800] animate-pulse">
            <Flag className="w-4 h-4 fill-[#2B2EFF]" />
            Hosted by Newton School of Technology
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-5xl mx-auto">
          {/* Stacked border effect like the poster */}
          <div className="relative inline-block mb-8">
            {/* Shadow layers */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#FFE500] rounded-sm opacity-30" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#FFE500] rounded-sm opacity-50" />
            {/* Main title box */}
            <div className="relative bg-white border-4 border-[#2B2EFF] rounded-sm px-8 py-5 shadow-[6px_6px_0_#FFE500]">
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#2B2EFF] leading-none tracking-wide">
                SCRATCH<br />
                <span className="text-[#FF5CE8]">HACK</span><span className="text-[#2B2EFF]"> '26</span>
              </h1>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
            Build a <span className="text-[#00FFB3] font-semibold">playable Scratch game</span> from a problem statement in{' '}
            <span className="text-[#FFE500] font-semibold">4 hours</span>, then present &amp; defend your work in a{' '}
            <span className="text-[#FF5CE8] font-semibold">2-hour final round</span>. Hosted by Newton School of Technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              onClick={() => scratchAudio.playSnap()}
              className="scratch-btn scratch-btn-events text-xl py-4 px-10 w-full sm:w-auto"
            >
              <Play className="w-5 h-5 fill-current" />
              Snap Team Into Registration
            </a>
            <a
              href="#tracks"
              onClick={() => scratchAudio.playSnap()}
              className="scratch-btn scratch-btn-operators text-xl py-4 px-10 w-full sm:w-auto"
            >
              <Sparkles className="w-5 h-5" />
              Explore Tracks
            </a>
          </div>
        </div>

        {/* Countdown Block */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="scratch-block events scratch-notch border-2 border-[#FFE500]/50">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
              <div className="flex items-center gap-2 font-heading text-xl text-[#FFE500]">
                <Clock className="w-5 h-5" />
                repeat until (hackathon_begins)
              </div>
              <span className="scratch-tag scratch-tag-events">LIVE COUNTDOWN</span>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
              {[
                { label: 'Days',  value: timeLeft.days,    color: '#00FFB3' },
                { label: 'Hours', value: timeLeft.hours,   color: '#FF5CE8' },
                { label: 'Mins',  value: timeLeft.minutes, color: '#FFE500' },
                { label: 'Secs',  value: timeLeft.seconds, color: '#FF6B6B' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-black/20 p-3 sm:p-4 rounded-md border border-white/15">
                  <div className="font-heading text-3xl sm:text-5xl" style={{ color }}>
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/50 font-sans mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: Clock,   color: '#00FFB3', value: '4 Hours',     sub: 'Round 1 — Build & Submit' },
            { icon: Clock,   color: '#FF5CE8', value: '2 Hours',     sub: 'Round 2 — Present & Defend' },
            { icon: Users,   color: '#FFE500', value: '2–3 Members', sub: 'Per Team' },
            { icon: Zap,     color: '#A78BFF', value: '10–15',       sub: 'Problem Statements' },
          ].map(({ icon: Icon, color, value, sub }) => (
            <div key={sub} className="bg-white/5 border border-white/15 p-4 rounded-md backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="flex justify-center mb-2">
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div className="font-heading text-2xl text-white">{value}</div>
              <div className="text-xs text-white/50 font-sans">{sub}</div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
