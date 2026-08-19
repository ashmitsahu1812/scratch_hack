import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, BookOpen, Film, Bot, Swords, ShieldCheck, Leaf, ArrowUpRight, Lock, Users } from 'lucide-react';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const exampleProblems = [
  { id: 'PS-01', title: 'Space Defender',     icon: Swords,      color: '#00FFB3', desc: 'Protect a space station from waves of incoming objects. Include movement, scoring and a game-over condition.' },
  { id: 'PS-02', title: 'Maze Escape',        icon: ShieldCheck, color: '#FF5CE8', desc: 'Build a maze game where the player reaches an exit while avoiding obstacles. Include at least one difficulty element.' },
  { id: 'PS-03', title: 'Treasure Hunt',      icon: Leaf,        color: '#FFE500', desc: 'Exploration game — collect hidden items, manage a score and reach the final treasure.' },
  { id: 'PS-04', title: 'Traffic Controller', icon: Bot,         color: '#FF6B6B', desc: 'Prevent collisions by controlling traffic or timing movement through an intersection.' },
  { id: 'PS-05', title: 'Monster Survival',   icon: Gamepad2,    color: '#A78BFF', desc: 'Avoid or defeat enemies for as long as possible while difficulty increases over time.' },
  { id: 'PS-06', title: 'Platform Adventure', icon: BookOpen,    color: '#00FFB3', desc: 'Platform game with movement, obstacles, collectibles and a final objective.' },
  { id: 'PS-07', title: 'Memory Challenge',   icon: Film,        color: '#FF5CE8', desc: 'Reveal objects, remember positions and match pairs under a scoring system.' },
  { id: 'PS-08', title: 'Falling Objects',    icon: Swords,      color: '#FFE500', desc: 'Catch beneficial objects and avoid harmful ones. Include score and difficulty progression.' },
];

const capacityRule = [
  { label: 'Total Registered Teams', example: '40' },
  { label: 'Number of Problem Statements', example: '10' },
  { label: 'Seats per Statement', example: '4' },
  { label: 'Teams per Statement', example: 'First-come, first-served' },
];

export default function Tracks() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? exampleProblems : exampleProblems.slice(0, 4);

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
          <h2 className="font-heading text-5xl sm:text-7xl text-white mt-2">Problem Statements</h2>
          <p className="text-white/55 mt-3 text-sm sm:text-base font-sans">
            At the start of Round 1, <strong className="text-white">10–15 problem statements</strong> are released.
            Each team claims <strong className="text-white">one statement</strong> — once seats fill up, it's locked.
            The strongest team from each statement advances to Round 2.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { step: '01', color: '#FFE500', title: 'Statements Released', desc: 'Organiser publishes 10–15 game challenges at the start of Round 1. Each has a fixed seat capacity.' },
            { step: '02', color: '#FF5CE8', title: 'Claim Your Challenge', desc: 'First-come, first-served. Once a statement reaches capacity it is locked — you cannot switch afterwards.' },
            { step: '03', color: '#00FFB3', title: 'Build & Submit', desc: 'You have 4 hours to design, program, test and submit a playable Scratch game matching the statement.' },
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
            Each problem statement gets <em>total registered teams ÷ number of statements</em> seats.
            Example: 40 teams + 10 statements = <strong className="text-white">4 teams per statement</strong>.
            A statement is <span className="text-[#FF6B6B]">locked</span> when full.
          </div>
        </div>

        {/* Example problem statement cards */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="font-heading text-2xl text-white uppercase tracking-wider">Example Statements</h3>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#FFE500]/15 border border-[#FFE500]/40 text-[#FFE500] text-xs sm:text-sm font-sans font-bold tracking-wide">
              <span>FOR REFERENCE ONLY — ACTUAL PROBLEM STATEMENTS RELEASED ON EVENT DAY</span>
            </div>
          </div>
          <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            {visible.map((ps) => {
              const Icon = ps.icon;
              return (
                <div
                  key={ps.id}
                  onClick={() => scratchAudio.playSnap()}
                  className="scratch-block group cursor-pointer"
                  style={{ borderColor: `${ps.color}40` }}
                >
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: `${ps.color}20`, border: `1.5px solid ${ps.color}50` }}>
                        <Icon className="w-4.5 h-4.5" style={{ color: ps.color }} />
                      </div>
                      <span className="font-code text-xs text-white/40">{ps.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-white/20" />
                      <span className="text-xs text-white/25 font-sans">Seats TBD</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl text-white mb-1.5 group-hover:opacity-80 transition-opacity flex items-center justify-between">
                    {ps.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: ps.color }} />
                  </h3>
                  <p className="text-white/60 text-sm font-sans">{ps.desc}</p>
                </div>
              );
            })}
          </motion.div>

          <div className="text-center mt-6">
            <button
              onClick={() => { scratchAudio.playSnap(); setShowAll(s => !s); }}
              className="scratch-btn scratch-btn-operators text-base py-2.5 px-6"
            >
              {showAll ? 'Show Less' : `Show All ${exampleProblems.length} Examples`}
            </button>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
