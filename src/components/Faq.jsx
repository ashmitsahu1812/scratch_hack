import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const faqs = [
  {
    q: "Who can participate?",
    a: "Any student! Teams must have exactly 3 members. Each participant may belong to only one team. All skill levels are welcome — from beginners to experienced game developers."
  },
  {
    q: "What platform must I use?",
    a: "All games must be built using MIT Scratch 3.0 — either the online editor at scratch.mit.edu or the offline desktop editor. Scratch must be the primary development platform; the final gameplay logic must be created during the hackathon window."
  },
  {
    q: "How does the problem statement system work?",
    a: "At the start of Round 1, the organiser releases 10–15 problem statements. Teams claim one statement on a first-come, first-served basis through the portal. Each statement has a fixed seat capacity (total teams ÷ number of statements). Once full, a statement is locked and unavailable."
  },
  {
    q: "Can I switch my problem statement after claiming it?",
    a: "No. Once you claim a problem statement and the selection window closes, you cannot change it — except in an organiser-approved technical or operational failure. Choose carefully!"
  },
  {
    q: "Can I use AI tools like ChatGPT?",
    a: "AI may be used as a learning/reference assistant (conceptual explanations, debugging guidance, Scratch block explanations or ideas) — but the team must create and understand the final implementation themselves. Generating the complete game and submitting it with minimal team contribution is not permitted. During Round 2, judges may ask any team member to explain specific scripts; failure to do so can result in disqualification."
  },
  {
    q: "Can I use pre-built Scratch projects or code from another team?",
    a: "No. All code blocks, sprites and animations must be created during the 4-hour hackathon window. Importing a complete pre-built game, modifying an existing game to pass it off as original, or using another team's code/assets without permission results in immediate disqualification."
  },
  {
    q: "How is the final winner decided?",
    a: "Final Score = (Round 1 Score × 40%) + (Round 2 Score × 60%). The top-ranked team from each problem statement advances to Round 2. This model ensures the winner can both build a working game and explain and defend their solution."
  },
  {
    q: "What happens in Round 2?",
    a: "Round 2 is 2 hours long. Finalists prepare a presentation covering: the problem statement, their game concept, gameplay, implementation, key technical decisions, teamwork breakdown and a live demo. Judges ask technical and design questions. Every team member should be able to explain their portion of the project."
  },
  {
    q: "What are the penalties for late submission?",
    a: "Late submissions receive a score deduction — recommended up to 5 points per minute late, capped at 15 minutes. After 15 minutes past the deadline, the submission is disqualified. The portal records submission timestamps automatically."
  },
  {
    q: "Do all participants get a certificate?",
    a: "Yes! Every team member who submits a valid, playable Scratch project by the deadline receives a digital certificate of participation from NST SDC, regardless of final placement."
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    scratchAudio.playSnap();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Floating 3D Geometric Shapes */}
      <GeoStar 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-16 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 geo-float opacity-80"
      />
      <GeoBox 
        color="#FFE500" shadow="#998A00"
        className="absolute top-28 right-4 sm:right-12 w-12 h-12 sm:w-14 sm:h-14 geo-float-slow opacity-75"
      />
      <GeoDiamond 
        color="#00FFB3" shadow="#008F64"
        className="absolute bottom-20 left-6 sm:left-14 w-10 h-10 sm:w-12 sm:h-12 geo-float-alt opacity-70"
      />
      <GeoCylinder 
        color="#FF6B6B" shadow="#CC4444"
        className="absolute bottom-32 right-6 sm:right-16 w-10 h-14 sm:w-12 sm:h-16 geo-float-slow opacity-75"
      />
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="text-center mb-14">
          <span className="scratch-tag scratch-tag-sensing mb-3">sensing &amp; control queries</span>
          <h2 className="font-heading text-5xl sm:text-7xl text-white mt-2">Frequently Asked Questions</h2>
          <p className="text-white/55 mt-3 text-sm sm:text-base font-sans">
            Everything you need to know about rules, judging, problem statements and submission.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="scratch-block transition-all"
                style={isOpen ? { borderColor: '#A78BFF', boxShadow: '5px 5px 0 rgba(167,139,255,0.2)' } : {}}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-xs font-code font-bold text-[#FFE500] shrink-0">Q{idx + 1}</span>
                    <h3 className="font-heading text-xl text-white">{faq.q}</h3>
                  </div>
                  <div className="p-1.5 rounded-sm bg-black/20 border border-white/15 shrink-0">
                    {isOpen
                      ? <ChevronUp className="w-5 h-5 text-[#A78BFF]" />
                      : <ChevronDown className="w-5 h-5 text-white/40" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-3 border-t border-white/10 text-sm text-white/70 leading-relaxed font-sans snap-anim">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-code text-[#A78BFF] font-bold mt-0.5 shrink-0">A:</span>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center p-6 rounded-md bg-white/5 border border-white/15 space-y-3 backdrop-blur-sm"
        >
          <div className="font-heading text-2xl text-white">Still have questions?</div>
          <p className="text-sm text-white/50 font-sans">Contact the NST SDC hackathon organising team.</p>
          <div className="flex items-center justify-center gap-4 text-xs font-code text-[#00FFB3]">
            <a href="mailto:support@scratchhack2026.org" className="hover:underline flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> support@scratchhack2026.org
            </a>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
