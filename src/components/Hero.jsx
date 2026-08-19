import React, { useState, useEffect } from 'react';
import { Flag, Play, Sparkles, Trophy, Users, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoCylinder, GeoStar, GeoDiamond } from './GeoShapes';

/* ── Target Saturday 10:00 AM IST Countdown ── */
function getTargetSaturdayIST() {
  const now = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const nowUtc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const nowIST = new Date(nowUtc + istOffsetMs);

  const dayOfWeek = nowIST.getDay(); // 0 = Sun, ..., 6 = Sat
  let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;

  const targetIST = new Date(nowIST);
  targetIST.setDate(nowIST.getDate() + daysUntilSaturday);
  targetIST.setHours(10, 0, 0, 0);

  // If today is Saturday and past 10:00 AM IST, jump to next Saturday
  if (daysUntilSaturday === 0 && nowIST.getTime() >= targetIST.getTime()) {
    targetIST.setDate(targetIST.getDate() + 7);
  }

  // Convert targetIST back to real epoch timestamp
  return targetIST.getTime() - istOffsetMs;
}

function getTimeRemaining() {
  const target = getTargetSaturdayIST();
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="overview" className="relative pt-8 sm:pt-14 pb-20 sm:pb-28 overflow-hidden">

      {/* ── Floating Geometric Decorations (Hidden on mobile to prevent clutter) ── */}
      <GeoStar
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-12 left-8 lg:left-14 w-14 h-14 lg:w-16 lg:h-16 geo-float-slow opacity-80 hidden md:block"
      />
      <GeoBox
        color="#00FFB3" shadow="#008F64"
        className="absolute top-16 right-8 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 geo-float opacity-80 hidden md:block"
      />
      <GeoCylinder
        color="#FF6B6B" shadow="#CC4444"
        className="absolute bottom-20 left-10 lg:left-20 w-12 h-16 geo-float-alt opacity-75 hidden md:block"
      />
      <GeoDiamond
        color="#FFE500" shadow="#CCB800"
        className="absolute bottom-28 right-10 lg:right-24 w-12 h-12 lg:w-14 lg:h-14 geo-float-slow opacity-80 hidden md:block"
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >

        {/* Announce badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 sm:px-5 sm:py-2 bg-[#FFE500] text-[#070B14] font-sans font-bold text-xs sm:text-sm rounded-full border-2 border-[#CCB800] shadow-[3px_3px_0_#CCB800]">
            <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#070B14]" />
            <span>HOSTED BY NST SDC</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Stacked border effect like the poster */}
          <div className="relative inline-block mb-6 sm:mb-8 w-full max-w-sm sm:max-w-2xl">
            {/* Shadow layers */}
            <div className="absolute inset-0 translate-x-2 sm:translate-x-3.5 translate-y-2 sm:translate-y-3.5 bg-[#FFE500] rounded-lg opacity-40" />
            <div className="absolute inset-0 translate-x-1 sm:translate-x-1.5 translate-y-1 sm:translate-y-1.5 bg-[#FFE500] rounded-lg opacity-70" />
            {/* Main title box */}
            <div className="relative bg-white border-3 sm:border-4 border-[#2B2EFF] rounded-lg px-6 py-5 sm:px-12 sm:py-7 shadow-[4px_4px_0_#FFE500] sm:shadow-[6px_6px_0_#FFE500]">
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#2B2EFF] leading-none tracking-wide">
                SCRATCH<br />
                <span className="text-[#FF5CE8]">STORM</span><span className="text-[#2B2EFF]"> '26</span>
              </h1>
            </div>
          </div>

          {/* Official Tagline / Quote */}
          <div className="mb-6 px-2">
            <span className="inline-block font-heading text-lg sm:text-2xl lg:text-3xl text-[#FFE500] tracking-widest uppercase bg-[#FFE500]/15 border border-[#FFE500]/40 px-4 sm:px-7 py-1.5 sm:py-2 rounded-md shadow-[2px_2px_0_rgba(255,229,0,0.2)]">
              “Imagine. Create. Conquer.”
            </span>
          </div>

          <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto font-sans leading-relaxed mb-8 px-2">
            Build a <span className="text-[#00FFB3] font-semibold">playable Scratch game</span> from a problem statement in{' '}
            <span className="text-[#FFE500] font-semibold">4 hours</span>, then present &amp; defend your work in a{' '}
            <span className="text-[#FF5CE8] font-semibold">2-hour final round</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
            <a
              href="#register"
              onClick={() => scratchAudio.playSnap()}
              className="scratch-btn scratch-btn-events text-lg sm:text-xl py-3.5 sm:py-4 px-8 sm:px-10 w-full sm:w-auto text-center"
            >
              <Play className="w-5 h-5 fill-current" />
              Snap Team Into Registration
            </a>
            <a
              href="#tracks"
              onClick={() => scratchAudio.playSnap()}
              className="scratch-btn scratch-btn-operators text-lg sm:text-xl py-3.5 sm:py-4 px-8 sm:px-10 w-full sm:w-auto text-center"
            >
              <Sparkles className="w-5 h-5" />
              Explore Tracks
            </a>
          </div>
        </div>

        {/* Countdown Block */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto">
          <div className="bg-[#0E1526] border-2 border-[#FFE500] rounded-xl p-4 sm:p-6 shadow-[4px_4px_0_#CCB800] sm:shadow-[6px_6px_0_#CCB800]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2">
              <div className="flex items-center gap-2 font-heading text-lg sm:text-xl text-[#FFE500]">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#FFE500]" />
                <span>repeat until (saturday_10_00_am_ist)</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-[#FFE500]/15 border border-[#FFE500]/40 text-[#FFE500] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider self-start sm:self-auto">
                SATURDAY 10:00 AM IST
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              {[
                { label: 'Days',  value: timeLeft.days,    color: '#00FFB3' },
                { label: 'Hours', value: timeLeft.hours,   color: '#FF5CE8' },
                { label: 'Mins',  value: timeLeft.minutes, color: '#FFE500' },
                { label: 'Secs',  value: timeLeft.seconds, color: '#FF6B6B' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-black/35 p-2 sm:p-3.5 rounded-lg border border-white/10 shadow-inner">
                  <div className="font-heading text-3xl sm:text-5xl leading-none" style={{ color }}>
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/50 font-sans mt-1 uppercase font-semibold tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
          {[
            { icon: Clock,   color: '#00FFB3', value: '4 Hours',     sub: 'Round 1 — Build & Submit' },
            { icon: Clock,   color: '#FF5CE8', value: '2 Hours',     sub: 'Round 2 — Present & Defend' },
            { icon: Users,   color: '#FFE500', value: '3 Members',   sub: 'Per Team' },
            { icon: Zap,     color: '#A78BFF', value: '10–15',       sub: 'Problem Statements' },
          ].map(({ icon: Icon, color, value, sub }) => (
            <div key={sub} className="bg-[#0E1526]/80 border border-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm hover:bg-[#0E1526] transition-all flex flex-col items-center justify-center shadow-sm">
              <div className="flex justify-center mb-1.5 sm:mb-2">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
              </div>
              <div className="font-heading text-xl sm:text-2xl text-white">{value}</div>
              <div className="text-[11px] sm:text-xs text-white/50 font-sans leading-tight mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
