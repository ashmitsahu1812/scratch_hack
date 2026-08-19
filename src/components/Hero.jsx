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
    <section id="overview" className="relative pt-12 pb-24 overflow-hidden">

      {/* ── Floating Geometric Decorations ── */}
      <GeoStar
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-12 left-4 sm:left-12 w-12 h-12 sm:w-16 sm:h-16 geo-float-slow opacity-80"
      />
      <GeoBox
        color="#00FFB3" shadow="#008F64"
        className="absolute top-16 right-4 sm:right-14 w-12 h-12 sm:w-16 sm:h-16 geo-float opacity-80"
      />
      <GeoCylinder
        color="#FF6B6B" shadow="#CC4444"
        className="absolute bottom-20 left-6 sm:left-16 w-10 h-14 sm:w-12 sm:h-16 geo-float-alt opacity-75"
      />
      <GeoDiamond
        color="#FFE500" shadow="#CCB800"
        className="absolute bottom-28 right-6 sm:right-20 w-10 h-10 sm:w-14 sm:h-14 geo-float-slow opacity-80"
      />
      <GeoStar
        color="#A78BFF" shadow="#7A56E6"
        className="absolute top-1/2 left-2 sm:left-8 w-10 h-10 geo-float opacity-60 hidden md:block"
      />
      <GeoBox
        color="#FFE500" shadow="#998A00"
        className="absolute top-1/2 right-3 sm:right-8 w-12 h-12 geo-float-alt opacity-70 hidden md:block"
      />
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
            Hosted by NST SDC
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
                <span className="text-[#FF5CE8]">STORM</span><span className="text-[#2B2EFF]"> '26</span>
              </h1>
            </div>
          </div>

          {/* Official Tagline / Quote */}
          <div className="mb-6">
            <span className="inline-block font-heading text-xl sm:text-2xl lg:text-3xl text-[#FFE500] tracking-widest uppercase bg-[#FFE500]/10 border border-[#FFE500]/30 px-6 py-2 rounded-sm shadow-[3px_3px_0_rgba(255,229,0,0.15)]">
              “Imagine. Create. Conquer.”
            </span>
          </div>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
            Build a <span className="text-[#00FFB3] font-semibold">playable Scratch game</span> from a problem statement in{' '}
            <span className="text-[#FFE500] font-semibold">4 hours</span>, then present &amp; defend your work in a{' '}
            <span className="text-[#FF5CE8] font-semibold">2-hour final round</span>. Hosted by NST SDC.
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
                repeat until (saturday_10_00_am_ist)
              </div>
              <span className="scratch-tag scratch-tag-events">SATURDAY 10:00 AM IST</span>
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
            { icon: Users,   color: '#FFE500', value: '3 Members',   sub: 'Per Team' },
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
