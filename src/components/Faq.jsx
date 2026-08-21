import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const faqs = [
  {
    q: "Who can participate?",
    a: "Any student! Teams compete with 3 members. Solo (1 member) and Duo (2 members) registrations are fully allowed — on the event day, NST SDC X REY organisers will club solo and duo participants with each other to form a complete 3-member team before hacking begins."
  },
  {
    q: "What platform must I use?",
    a: "All games must be built using MIT Scratch 3.0 — either the online editor at scratch.mit.edu or the offline desktop editor. Scratch must be the primary development platform; the final gameplay logic must be created during the hackathon window."
  },
  {
    q: "How does the theme system work?",
    a: "At the start of Round 1, the organiser releases several themes. Teams claim one theme on a first-come, first-served basis through the portal. Each theme has a fixed seat capacity (total teams ÷ number of themes). Once full, a theme is locked and unavailable."
  },
  {
    q: "Can I switch my theme after claiming it?",
    a: "No. Once you claim a theme and the selection window closes, you cannot change it — except in an organiser-approved technical or operational failure. Choose carefully!"
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
    q: "What happens in Round 2?",
    a: "Round 2 is 2 hours long. Finalists prepare a presentation covering: the theme, their game concept, gameplay, implementation, key technical decisions, teamwork breakdown and a live demo. Judges ask technical and design questions. Every team member should be able to explain their portion of the project."
  },
  {
    q: "What are the penalties for late submission?",
    a: "Late submissions receive a score deduction — recommended up to 5 points per minute late, capped at 15 minutes. After 15 minutes past the deadline, the submission is disqualified. The portal records submission timestamps automatically."
  },
  {
    q: "Do all participants get a certificate?",
    a: "Yes! Every team member who submits a valid, playable Scratch project by the deadline receives a digital certificate of participation from NST SDC X REY, regardless of final placement."
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    scratchAudio.playSnap();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Floating 3D Geometric Shapes */}
      <GeoStar 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-16 left-8 lg:left-14 w-14 h-14 lg:w-16 lg:h-16 geo-float opacity-80 hidden md:block"
      />
      <GeoBox 
        color="#FFE500" shadow="#998A00"
        className="absolute top-28 right-8 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 geo-float-slow opacity-75 hidden md:block"
      />
      <GeoDiamond 
        color="#00FFB3" shadow="#008F64"
        className="absolute bottom-20 left-8 lg:left-14 w-12 h-12 lg:w-14 lg:h-14 geo-float-alt opacity-70 hidden md:block"
      />
      <GeoCylinder 
        color="#FF6B6B" shadow="#CC4444"
        className="absolute bottom-32 right-8 lg:right-16 w-12 h-16 geo-float-slow opacity-75 hidden md:block"
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
            Everything you need to know about rules, judging, themes and submission.
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

      </motion.div>
    </section>
  );
}
