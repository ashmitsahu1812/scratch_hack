import React from 'react';
import { Flag, Clock, Radio, CheckCircle, Trophy, Code, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const scheduleSteps = [
  {
    time: 'T − 30 min', blockType: 'sensing',
    title: 'Check-in & Setup',
    subtitle: 'Verify teams, devices and portal access',
    desc: 'All team members check in at the registration desk. Confirm portal access and ensure Scratch is running on your device.',
    icon: CheckCircle, colorHex: '#A78BFF', textColor: '#fff'
  },
  {
    time: 'T − 10 min', blockType: 'events',
    title: 'Rules Briefing',
    subtitle: 'Explain rules, judging, penalties and submission',
    desc: 'Organiser walks through the full rulebook: submission format, AI policy, plagiarism consequences and the Round 1 judging rubric.',
    icon: FileText, colorHex: '#FFE500', textColor: '#0A0E1A'
  },
  {
    time: 'T + 00:00', blockType: 'motion',
    title: 'Problem Statement Release',
    subtitle: 'First-come, first-served allocation begins',
    desc: 'All 10\u201315 problem statements go live simultaneously. Teams claim one statement through the portal. Once a statement runs out of seats, it is locked.',
    icon: Flag, colorHex: '#00FFB3', textColor: '#0A0E1A'
  },
  {
    time: 'T + 00:00 → T + 04:00', blockType: 'operators',
    title: 'Round 1 — Build & Submit',
    subtitle: '4 hours to design, program, test and submit',
    desc: 'Teams work on their claimed problem statement in Scratch. Mentors available for technical guidance (not solutions). Submit before the timer ends — late submissions face score deductions.',
    icon: Code, colorHex: '#00FFB3', textColor: '#0A0E1A'
  },
  {
    time: 'T + 04:00', blockType: 'control',
    title: 'Submission Closed',
    subtitle: 'Code freeze — no further edits accepted',
    desc: 'All project links/files are locked. Judges begin scoring Round 1 using the rubric: Basic Game Working (40%), Sprites & Visuals (25%), Creativity (35%).',
    icon: Clock, colorHex: '#FF6B6B', textColor: '#fff'
  },
  {
    time: 'After Round 1 Judging', blockType: 'looks',
    title: 'Finalist Selection',
    subtitle: 'Top 1 team per problem statement advances',
    desc: 'Judges score all submissions and select the highest-scoring team from each problem statement. Finalists are announced and Round 2 schedule is confirmed.',
    icon: Trophy, colorHex: '#FF5CE8', textColor: '#fff'
  },
  {
    time: 'Final Round — 2 Hours', blockType: 'events',
    title: 'Round 2 — Present, Explain & Defend',
    subtitle: 'PPT + live demo + judge Q&A',
    desc: 'Finalists present their game (problem statement → concept → implementation → teamwork → live demo). Every team member must be able to explain their portion. Judges ask technical and design questions.',
    icon: Radio, colorHex: '#FFE500', textColor: '#0A0E1A'
  },
  {
    time: 'End of Event', blockType: 'motion',
    title: 'Results & Awards',
    subtitle: 'Final scores announced, winners awarded',
    desc: 'Final Score = Round 1 (40%) + Round 2 (60%). Winners announced, certificates distributed to all participants who submitted a valid project.',
    icon: Flag, colorHex: '#00FFB3', textColor: '#0A0E1A'
  },
];

export default function Timeline() {
  return (
    <section id="schedule" className="py-20 relative overflow-hidden">
      {/* Floating 3D Geometric Shapes */}
      <GeoStar 
        color="#FFE500" shadow="#998A00"
        className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 geo-float opacity-80"
      />
      <GeoBox 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-36 right-4 sm:right-12 w-12 h-12 sm:w-14 sm:h-14 geo-float-slow opacity-75"
      />
      <GeoDiamond 
        color="#00FFB3" shadow="#008F64"
        className="absolute bottom-28 left-6 sm:left-14 w-10 h-10 sm:w-12 sm:h-12 geo-float-alt opacity-75"
      />
      <GeoCylinder 
        color="#A78BFF" shadow="#7A56E6"
        className="absolute bottom-44 right-6 sm:right-16 w-10 h-14 sm:w-12 sm:h-16 geo-float-slow opacity-70"
      />
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="text-center mb-14">
          <span className="scratch-tag scratch-tag-control mb-3">script execution flow</span>
          <h2 className="font-heading text-5xl sm:text-7xl text-white mt-2">Event Schedule</h2>
          <p className="text-white/55 mt-3 text-sm sm:text-base font-sans">
            From check-in to awards — the complete competition timeline.
          </p>
        </div>

        <div className="code-stack space-y-3">
          {scheduleSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                onClick={() => scratchAudio.playSnap()}
                className={`scratch-block ${step.blockType} scratch-notch cursor-pointer transition-transform`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center font-bold shrink-0"
                      style={{ backgroundColor: step.colorHex, color: step.textColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-heading text-xl text-white">{step.title}</div>
                      <div className="font-sans font-semibold text-sm" style={{ color: step.colorHex }}>{step.subtitle}</div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-black/20 border border-white/15 font-code text-xs text-white/70 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-[#00FFB3] shrink-0" />
                      {step.time}
                    </span>
                  </div>
                </div>
                <p className="text-white/60 text-xs sm:text-sm mt-3 pt-2 border-t border-white/10 font-sans">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
