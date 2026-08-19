import React from 'react';
import { Star, MessageSquare, Cpu, Users, Calculator, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const round1Rubric = [
  { criterion: 'Basic Game Working',          weight: '40%', color: '#FF6B6B', desc: 'Core gameplay, controls, win/lose state, required mechanics, stability' },
  { criterion: 'Sprites & Visual Implementation', weight: '25%', color: '#FF5CE8', desc: 'Appropriate sprites, backgrounds, readability, animation and use of Scratch assets' },
  { criterion: 'Creativity & Game Design',    weight: '35%', color: '#FFE500', desc: 'Originality, engagement, clever mechanics, challenge balance and interpretation of the statement' },
];

const round2Rubric = [
  { criterion: 'Presentation Quality',         weight: '30%', color: '#00FFB3', desc: 'Structure, clarity, confidence, time management and visual communication' },
  { criterion: 'Project Explanation',          weight: '40%', color: '#FFE500', desc: 'Depth of understanding, accurate explanation of logic and design decisions' },
  { criterion: 'Technical Q&A',               weight: '20%', color: '#FF5CE8', desc: 'Ability to answer judge questions and defend implementation choices' },
  { criterion: 'Team Contribution',           weight: '10%', color: '#A78BFF', desc: 'Balanced participation, teamwork and professional conduct' },
];

const tieBreakers = [
  'Higher Round 2 Project Explanation score',
  'Higher Round 2 Technical Q&A score',
  'Higher Round 1 Basic Game Working score',
  'Judge panel discussion and final vote',
  'Short additional technical question given to tied teams',
];

export default function Judging() {
  return (
    <section id="judging" className="py-20 relative bg-[#1A1DCC]/40 border-t-2 border-b-2 border-white/10 overflow-hidden">
      {/* Floating 3D Geometric Shapes */}
      <GeoStar 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-12 left-4 sm:left-12 w-12 h-12 sm:w-16 sm:h-16 geo-float opacity-80"
      />
      <GeoBox 
        color="#00FFB3" shadow="#008F64"
        className="absolute top-24 right-4 sm:right-14 w-12 h-12 sm:w-14 sm:h-14 geo-float-slow opacity-75"
      />
      <GeoDiamond 
        color="#FFE500" shadow="#998A00"
        className="absolute bottom-16 left-6 sm:left-14 w-10 h-10 sm:w-12 sm:h-12 geo-float-alt opacity-70"
      />
      <GeoCylinder 
        color="#A78BFF" shadow="#7A56E6"
        className="absolute bottom-28 right-6 sm:right-16 w-10 h-14 sm:w-12 sm:h-16 geo-float-slow opacity-75"
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
          <span className="scratch-tag scratch-tag-events mb-3">judging criteria</span>
          <h2 className="font-heading text-5xl sm:text-7xl text-white mt-2">Scoring Rubrics</h2>
          <p className="text-white/55 mt-3 text-sm sm:text-base font-sans">
            Judges score every team against the same standard rubric.
            A simple but functional game can outperform a complex but broken one.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Round 1 Rubric */}
          <div className="scratch-block motion scratch-notch" style={{ borderColor: '#00FFB3' + '50' }}>
            <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-md bg-[#00FFB3]/20 flex items-center justify-center border border-[#00FFB3]/40">
                <Cpu className="w-5 h-5 text-[#00FFB3]" />
              </div>
              <div>
                <div className="font-heading text-2xl text-white">Round 1 Rubric</div>
                <div className="text-xs text-[#00FFB3] font-sans">Build Challenge — 100 Points Total</div>
              </div>
            </div>

            <div className="space-y-3">
              {round1Rubric.map(({ criterion, weight, color, desc }) => (
                <div key={criterion} onClick={() => scratchAudio.playSnap()}
                  className="p-3 rounded-sm bg-black/20 border border-white/10 cursor-pointer hover:bg-black/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-lg text-white">{criterion}</span>
                    <span className="font-heading text-2xl" style={{ color }}>{weight}</span>
                  </div>
                  <p className="text-xs text-white/55 font-sans">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-sm bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 text-xs text-white/65 font-sans flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
              <span><strong className="text-white">Important:</strong> Creativity cannot compensate for a non-functional game. Teams failing minimum acceptance criteria may be capped or disqualified regardless of visual quality.</span>
            </div>
          </div>

          {/* Round 2 Rubric */}
          <div className="scratch-block events scratch-notch" style={{ borderColor: '#FFE500' + '50' }}>
            <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-md bg-[#FFE500]/20 flex items-center justify-center border border-[#FFE500]/40">
                <MessageSquare className="w-5 h-5 text-[#FFE500]" />
              </div>
              <div>
                <div className="font-heading text-2xl text-white">Round 2 Rubric</div>
                <div className="text-xs text-[#FFE500] font-sans">Present & Defend — 100 Points Total</div>
              </div>
            </div>

            <div className="space-y-3">
              {round2Rubric.map(({ criterion, weight, color, desc }) => (
                <div key={criterion} onClick={() => scratchAudio.playSnap()}
                  className="p-3 rounded-sm bg-black/20 border border-white/10 cursor-pointer hover:bg-black/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-lg text-white">{criterion}</span>
                    <span className="font-heading text-2xl" style={{ color }}>{weight}</span>
                  </div>
                  <p className="text-xs text-white/55 font-sans">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-sm bg-[#A78BFF]/10 border border-[#A78BFF]/30 text-xs text-white/65 font-sans flex items-start gap-2">
              <Info className="w-4 h-4 text-[#A78BFF] shrink-0 mt-0.5" />
              <span>During Round 2, judges may ask any team member to explain specific scripts, variables or mechanics. If a team cannot explain a substantial portion of its own project, scores may be reduced.</span>
            </div>
          </div>
        </div>

        {/* Final Score Formula */}
        <div className="scratch-block scratch-notch mb-8 p-6" style={{ borderColor: '#FFE500', boxShadow: '6px 6px 0 rgba(255,229,0,0.2)' }}>
          <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
            <Calculator className="w-6 h-6 text-[#FFE500]" />
            <div className="font-heading text-2xl text-[#FFE500]">Final Score Formula</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
            <div className="text-center">
              <div className="font-heading text-4xl text-white">Final Score</div>
            </div>
            <div className="font-heading text-3xl text-white/40">=</div>
            <div className="text-center p-3 rounded-md bg-[#00FFB3]/10 border border-[#00FFB3]/30">
              <div className="font-heading text-3xl text-[#00FFB3]">Round 1 × 40%</div>
              <div className="text-xs text-white/50 font-sans mt-1">Build Challenge</div>
            </div>
            <div className="font-heading text-3xl text-white/40">+</div>
            <div className="text-center p-3 rounded-md bg-[#FFE500]/10 border border-[#FFE500]/30">
              <div className="font-heading text-3xl text-[#FFE500]">Round 2 × 60%</div>
              <div className="text-xs text-white/50 font-sans mt-1">Present & Defend</div>
            </div>
          </div>

          <p className="text-center text-xs text-white/45 font-sans mt-2">
            This ensures the winner can both <strong className="text-white">build</strong> and <strong className="text-white">understand and communicate</strong> their solution — not just submit the prettiest game.
          </p>
        </div>

        {/* Tie Breakers */}
        <div className="scratch-block looks scratch-notch p-5">
          <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
            <Star className="w-5 h-5 text-[#FF5CE8]" />
            <div className="font-heading text-xl text-[#FF5CE8]">Tie-Breaker Order</div>
          </div>
          <ol className="space-y-2">
            {tieBreakers.map((tb, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-sans text-white/70">
                <span className="font-heading text-lg text-[#FF5CE8] shrink-0 w-5">{i + 1}.</span>
                {tb}
              </li>
            ))}
          </ol>
        </div>

      </motion.div>
    </section>
  );
}
