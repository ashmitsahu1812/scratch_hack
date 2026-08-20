import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Swords, Leaf, Gamepad2, ShieldCheck, BookOpen, ArrowUpRight, Lock, Users, Sparkles } from 'lucide-react';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const sampleThemes = [
  { 
    id: 'THEME-01', 
    title: 'Villains Day', 
    icon: Bot, 
    color: '#FF5CE8', 
    tag: 'Role Reversal',
    desc: 'You could be the ghost chasing pacman. Play from the villain’s perspective, flipping classic video game tropes upside down and hunting traditional heroes.' 
  },
  { 
    id: 'THEME-02', 
    title: 'Hunger Wars', 
    icon: Swords, 
    color: '#FFE500', 
    tag: 'Survival / Action',
    desc: 'It can be like a food battle or overcoming hunger and scarcity in a high-stakes arena where resource management and quick reflexes dictate survival.' 
  },
  { 
    id: 'THEME-03', 
    title: 'Hope in the Void', 
    icon: Leaf, 
    color: '#00FFB3', 
    tag: 'Atmospheric / Narrative',
    desc: 'Find purpose in times of emptiness or uncertainty. Craft deep atmospheric puzzle or exploration mechanics guiding players toward the light in total darkness.' 
  },
  { 
    id: 'THEME-04', 
    title: 'Gravity Inversion', 
    icon: Gamepad2, 
    color: '#A78BFF', 
    tag: 'Physics Mechanics',
    desc: 'The laws of physics reverse at unpredictable intervals. Design creative platforming and puzzle mechanics where up becomes down.' 
  },
  { 
    id: 'THEME-05', 
    title: 'Chronos Paradox', 
    icon: ShieldCheck, 
    color: '#FF6B6B', 
    tag: 'Time Manipulation',
    desc: 'Rewind, loop, and freeze time to solve multi-layered puzzles or defeat challenging enemies alongside your past self.' 
  },
  { 
    id: 'THEME-06', 
    title: 'Cyber Heist', 
    icon: BookOpen, 
    color: '#00FFB3', 
    tag: 'Stealth / Strategy',
    desc: 'Infiltrate ultra-secure mainframe nodes, bypass detection grids, and extract critical code fragments under time pressure.' 
  },
];

export default function Tracks() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? sampleThemes : sampleThemes.slice(0, 3);

  return (
    <section id="tracks" className="py-16 sm:py-20 relative bg-[#0B1020]/60 border-t border-b border-white/10 overflow-hidden">
      {/* Floating 3D Geometric Shapes */}
      <GeoBox 
        color="#FFE500" shadow="#998A00"
        className="absolute top-12 left-8 lg:left-14 w-14 h-14 lg:w-16 lg:h-16 geo-float-slow opacity-80 hidden md:block"
      />
      <GeoStar 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-20 right-8 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 geo-float opacity-75 hidden md:block"
      />
      <GeoCylinder 
        color="#00FFB3" shadow="#008F64"
        className="absolute bottom-16 left-8 lg:left-16 w-12 h-16 geo-float-alt opacity-70 hidden md:block"
      />
      <GeoDiamond 
        color="#FF6B6B" shadow="#CC4444"
        className="absolute bottom-20 right-8 lg:right-16 w-12 h-12 lg:w-14 lg:h-14 geo-float-slow opacity-75 hidden md:block"
      />
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="scratch-tag scratch-tag-events mb-3">first-come, first-served</span>
          <h2 className="font-heading text-5xl sm:text-7xl text-white mt-2">THEMES</h2>
          <p className="text-white/55 mt-3 text-sm sm:text-base font-sans">
            At the start of Round 1, <strong className="text-white">10–15 themes</strong> are released live.
            Each team claims <strong className="text-white">one theme</strong> — once seats fill up, it's locked.
            The strongest team from each theme advances to Round 2.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { step: '01', color: '#FFE500', title: 'Themes Released', desc: 'Organiser publishes 10–15 game themes at the start of Round 1. Each has a fixed seat capacity.' },
            { step: '02', color: '#FF5CE8', title: 'Claim Your Theme', desc: 'First-come, first-served. Once a theme reaches capacity it is locked — you cannot switch afterwards.' },
            { step: '03', color: '#00FFB3', title: 'Build & Submit', desc: 'You have 4 hours to design, program, test and submit a playable Scratch game matching the theme.' },
          ].map(({ step, color, title, desc }) => (
            <div key={step} className="scratch-block p-5" style={{ borderColor: `${color}40`, boxShadow: `4px 4px 0 ${color}30` }}>
              <div className="font-heading text-5xl mb-3" style={{ color }}>{step}</div>
              <h3 className="font-heading text-xl text-white mb-1">{title}</h3>
              <p className="text-white/60 text-sm font-sans">{desc}</p>
            </div>
          ))}
        </div>

        {/* Capacity rule callout */}
        <div className="mb-12 p-5 rounded-md bg-white/5 border border-[#FFE500]/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Users className="w-8 h-8 text-[#FFE500] shrink-0" />
          <div className="font-sans text-sm text-white/70">
            <span className="font-bold text-[#FFE500]">Capacity Rule: </span>
            Each theme gets <em>total registered teams ÷ number of themes</em> seats.
            Example: 40 teams + 10 themes = <strong className="text-white">4 teams per theme</strong>.
            A theme is <span className="text-[#FF6B6B]">locked</span> when full.
          </div>
        </div>

        {/* Example sample theme cards */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFE500]" />
                <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wider">SAMPLE THEMES</h3>
              </div>
              <p className="text-xs text-white/50 font-sans mt-0.5">Explore inspiration for game ideas and mechanics</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#FFE500]/15 border border-[#FFE500]/40 text-[#FFE500] text-xs sm:text-sm font-sans font-bold tracking-wide">
              <span>FOR REFERENCE ONLY — ACTUAL THEMES RELEASED ON EVENT DAY</span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visible.map((theme) => {
              const Icon = theme.icon;
              return (
                <div
                  key={theme.id}
                  onClick={() => scratchAudio.playSnap()}
                  className="scratch-block group cursor-pointer flex flex-col justify-between p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderColor: `${theme.color}50`, boxShadow: `4px 4px 0 ${theme.color}30` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md flex items-center justify-center shadow-inner" style={{ background: `${theme.color}20`, border: `1.5px solid ${theme.color}60` }}>
                          <Icon className="w-5 h-5" style={{ color: theme.color }} />
                        </div>
                        <div>
                          <span className="font-code text-xs text-white/40 block leading-none">{theme.id}</span>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider mt-1 inline-block" style={{ color: theme.color }}>
                            {theme.tag}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded border border-white/10">
                        <Lock className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-[10px] text-white/40 font-sans font-semibold">Seats TBD</span>
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl text-white mb-2 group-hover:text-[#FFE500] transition-colors flex items-center justify-between">
                      {theme.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.color }} />
                    </h3>

                    <p className="text-white/70 text-sm font-sans leading-relaxed">{theme.desc}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-code text-white/35">
                    <span>when [theme] picked</span>
                    <span style={{ color: theme.color }}>preview</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <div className="text-center mt-8">
            <button
              onClick={() => { scratchAudio.playSnap(); setShowAll(s => !s); }}
              className="scratch-btn scratch-btn-operators text-base py-2.5 px-6"
            >
              {showAll ? 'Show Less' : `Show All ${sampleThemes.length} Sample Themes`}
            </button>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
