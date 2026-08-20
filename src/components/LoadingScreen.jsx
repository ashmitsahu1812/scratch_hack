import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, Sparkles, Terminal, Code2, Play } from 'lucide-react';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';
import { scratchAudio } from '../lib/soundEffects';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Initializing Scratch block workspace...',
    'Loading NST SDC X REY competition engine...',
    'Compiling “Imagine. Create. Conquer.” modules...',
    'Snapping all scripts into place...',
    'READY! Launching ScratchStorm \'26...'
  ];

  useEffect(() => {
    // Sound on initial load
    try {
      scratchAudio.playGreenFlag();
    } catch {
      // Audio context might require user interaction in some browsers
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 4) + 2;
        return next > 100 ? 100 : next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setCurrentStep(0);
    else if (progress < 50) setCurrentStep(1);
    else if (progress < 75) setCurrentStep(2);
    else if (progress < 95) setCurrentStep(3);
    else setCurrentStep(4);

    if (progress === 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-[#070B14] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Grid & Neon Aura */}
      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />
      
      {/* Ambient glowing radial spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2B2EFF]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5CE8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFE500]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D Geometric Shapes */}
      <GeoStar 
        color="#FFE500" shadow="#998A00"
        className="absolute top-12 left-8 sm:left-20 w-16 h-16 geo-float opacity-80"
      />
      <GeoDiamond 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-16 right-8 sm:right-24 w-14 h-14 geo-float-slow opacity-80"
      />
      <GeoBox 
        color="#00FFB3" shadow="#008F64"
        className="absolute bottom-16 left-10 sm:left-24 w-14 h-14 geo-float-alt opacity-75"
      />
      <GeoCylinder 
        color="#A78BFF" shadow="#7352D9"
        className="absolute bottom-16 right-10 sm:right-28 w-12 h-16 geo-float-slow opacity-75"
      />

      {/* Skip Button */}
      <button
        onClick={() => {
          scratchAudio.playSnap();
          onComplete();
        }}
        className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/60 hover:text-white text-xs font-sans font-semibold transition-all z-50 flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
      >
        <span>Skip</span>
        <Play className="w-3 h-3 fill-current" />
      </button>

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl w-full px-6 text-center">

        {/* Host Tag */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE500]/15 border border-[#FFE500]/40 text-[#FFE500] text-xs font-sans font-bold uppercase tracking-wider mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#00FFB3] animate-ping" />
          <span>Hosted by NST SDC X REY</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="font-heading text-4xl sm:text-6xl text-white tracking-wide">
            SCRATCH<span className="text-[#FF5CE8]">STORM</span> '26
          </h1>
          <div className="text-xs sm:text-sm font-heading tracking-widest text-[#FFE500] uppercase mt-1">
            “Imagine. Create. Conquer.”
          </div>
        </motion.div>

        {/* Animated Stacking Scratch Code Blocks */}
        <div className="w-full max-w-md space-y-2 mb-8 text-left">
          
          {/* Block 1: Hat Block (Events - Yellow) */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 22, delay: 0.15 }}
            className="scratch-block events p-3 px-4 shadow-lg border-2 border-[#FFE500] flex items-center justify-between"
          >
            <div className="flex items-center gap-2 font-heading text-base sm:text-lg text-white">
              <span className="text-[#00FFB3] text-xl leading-none">⚑</span>
              <span>when <span className="text-[#FFE500] font-bold">green flag</span> clicked</span>
            </div>
            <span className="text-[10px] uppercase font-sans font-bold px-2 py-0.5 rounded bg-black/30 text-white/80">
              event
            </span>
          </motion.div>

          {/* Block 2: Motion / Variables (Cyan/Green) */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 22, delay: 0.4 }}
            className="scratch-block motion scratch-notch p-3 px-4 shadow-lg border-2 border-[#00FFB3] flex items-center justify-between"
          >
            <div className="flex items-center gap-2 font-heading text-base sm:text-lg text-white">
              <Code2 className="w-4 h-4 text-[#00FFB3]" />
              <span>initialize <span className="text-[#00FFB3] font-bold">[scratch_storm_engine]</span></span>
            </div>
            <span className="text-[10px] uppercase font-sans font-bold px-2 py-0.5 rounded bg-black/30 text-white/80">
              setup
            </span>
          </motion.div>

          {/* Block 3: Looks (Hot Pink) */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 22, delay: 0.7 }}
            className="scratch-block looks scratch-notch p-3 px-4 shadow-lg border-2 border-[#FF5CE8] flex items-center justify-between"
          >
            <div className="flex items-center gap-2 font-heading text-base sm:text-lg text-white truncate">
              <Sparkles className="w-4 h-4 text-[#FF5CE8] shrink-0" />
              <span className="truncate">say <span className="text-[#FFE500]">"Imagine. Create. Conquer."</span></span>
            </div>
            <span className="text-[10px] uppercase font-sans font-bold px-2 py-0.5 rounded bg-black/30 text-white/80 shrink-0">
              quote
            </span>
          </motion.div>

          {/* Block 4: Control (Coral Orange) */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 22, delay: 1.0 }}
            className="scratch-block control scratch-notch p-3 px-4 shadow-lg border-2 border-[#FF6B6B] flex items-center justify-between"
          >
            <div className="flex items-center gap-2 font-heading text-base sm:text-lg text-white">
              <Flag className="w-4 h-4 text-[#FF6B6B]" />
              <span>broadcast <span className="text-[#FF6B6B] font-bold">[launch_hackathon]</span></span>
            </div>
            <span className="text-[10px] uppercase font-sans font-bold px-2 py-0.5 rounded bg-black/30 text-white/80">
              action
            </span>
          </motion.div>

        </div>

        {/* Progress Bar & Status Track */}
        <div className="w-full max-w-md space-y-2.5">
          
          {/* Header Progress Counter */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00FFB3]" />
              {steps[currentStep]}
            </span>
            <span className="font-bold text-[#00FFB3]">{progress}%</span>
          </div>

          {/* Neo-brutalist Progress Track */}
          <div className="w-full h-3.5 rounded-sm bg-[#0E1524] border-2 border-white/20 p-0.5 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00FFB3] via-[#FFE500] to-[#FF5CE8] rounded-sm transition-all duration-150 ease-out shadow-[0_0_12px_rgba(0,255,179,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Subtitle */}
          <div className="text-[11px] font-sans text-white/40 text-center pt-1">
            MIT Scratch 3.0 visual block architecture • Loading assets
          </div>
        </div>

      </div>
    </motion.div>
  );
}
