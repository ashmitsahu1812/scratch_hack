import React from 'react';
import { MessageSquare, Cpu, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const round1Rubric = [
  { criterion: 'Basic Game Working',          weight: '40%', color: '#FF6B6B', desc: 'Core gameplay, controls, win/lose state, required mechanics, stability' },
  { criterion: 'Sprites & Visual Implementation', weight: '25%', color: '#FF5CE8', desc: 'Appropriate sprites, backgrounds, readability, animation and use of Scratch assets' },
  { criterion: 'Creativity & Game Design',    weight: '35%', color: '#FFE500', desc: 'Originality, engagement, clever mechanics, challenge balance and interpretation of the statement' },
];

const round2Rubric = [
  { criterion: 'Presentation Quality',                    weight: '30%', color: '#00FFB3', desc: 'Structure, clarity, confidence, time management and visual communication' },
  { criterion: 'Project Explanation & Technical Q&A',     weight: '70%', color: '#FFE500', desc: 'Depth of understanding, explaining logic & design decisions, answering judge questions, and defending implementation choices' },
];

export default function Judging() {
  return (
    <section id="judging" className="py-16 sm:py-20 relative bg-[#070B14] border-t border-b border-white/10 overflow-hidden">
      {/* Floating 3D Geometric Shapes */}
      <GeoStar 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-12 left-8 lg:left-14 w-14 h-14 lg:w-16 lg:h-16 geo-float opacity-80 hidden md:block"
      />
      <GeoBox 
        color="#00FFB3" shadow="#008F64"
        className="absolute top-24 right-8 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 geo-float-slow opacity-75 hidden md:block"
      />
      <GeoDiamond 
        color="#FFE500" shadow="#998A00"
        className="absolute bottom-16 left-8 lg:left-14 w-12 h-12 lg:w-14 lg:h-14 geo-float-alt opacity-70 hidden md:block"
      />
      <GeoCylinder 
        color="#A78BFF" shadow="#7A56E6"
        className="absolute bottom-28 right-8 lg:right-16 w-12 h-16 geo-float-slow opacity-75 hidden md:block"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

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

      </motion.div>
    </section>
  );
}
