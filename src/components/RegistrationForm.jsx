import React from 'react';
import {
  Lock, Clock, Flag, Sparkles, HelpCircle, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

export default function RegistrationForm() {
  return (
    <section id="register" className="py-16 sm:py-24 relative border-t border-white/10 overflow-hidden bg-[#0A0E1A]/80">
      <GeoBox 
        color="#00FFB3" shadow="#008F64"
        className="absolute top-12 left-8 lg:left-14 w-14 h-14 lg:w-16 lg:h-16 geo-float opacity-80 hidden md:block"
      />
      <GeoStar 
        color="#FFE500" shadow="#998A00"
        className="absolute top-20 right-8 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 geo-float-slow opacity-85 hidden md:block"
      />
      <GeoDiamond 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute bottom-16 left-8 lg:left-16 w-12 h-12 lg:w-14 lg:h-14 geo-float-alt opacity-75 hidden md:block"
      />
      <GeoCylinder 
        color="#A78BFF" shadow="#7352D9"
        className="absolute bottom-12 right-8 lg:right-16 w-12 h-16 geo-float-slow opacity-80 hidden md:block"
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Closed Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/40 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" /> REGISTRATIONS CLOSED • HOUSE FULL
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl text-white tracking-wide">
            Registration Is Now Closed!
          </h2>
          <p className="text-white/70 mt-3 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Capacity has been reached. All team slots for <strong className="text-white">Scratch Storm '26</strong> are officially locked. Thank you to everyone who registered!
          </p>
        </div>

        {/* Central Closed Announcement Card */}
        <div className="scratch-block looks snap-anim p-6 sm:p-10 mb-8 border-2 border-[#FF6B6B] shadow-[6px_6px_0_#992B2B]">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-[#FF6B6B]/20 text-[#FF6B6B] border-2 border-[#FF6B6B]/40 shadow-inner">
              <Lock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="font-heading text-2xl sm:text-3xl text-white">
                All Slots Have Been Snapped Up!
              </div>
              <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                Thank you for the tremendous response! Pre-registered teams are confirmed for tomorrow's competition.
              </p>
            </div>

            {/* Reach Out Message Box */}
            <div className="p-5 rounded-xl bg-white/5 border border-[#FFE500]/40 text-center max-w-xl mx-auto shadow-inner">
              <div className="font-heading text-lg sm:text-xl text-[#FFE500] flex items-center justify-center gap-2 mb-1.5">
                <HelpCircle className="w-5 h-5 text-[#FFE500] shrink-0" />
                <span>Couldn't Register in Time?</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm font-sans leading-relaxed">
                If you couldn’t register, please <strong className="text-white">reach out to us tomorrow morning</strong> at the venue (from 9:30 AM IST) for on-spot assistance and team clubbing queries!
              </p>
            </div>
          </div>
        </div>

        {/* Event Day Checklist / Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="scratch-block p-5" style={{ borderColor: '#00FFB340', boxShadow: '4px 4px 0 #00FFB330' }}>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#00FFB3]" />
              <h3 className="font-heading text-lg text-white">Check-in at 9:30 AM</h3>
            </div>
            <p className="text-white/60 text-xs sm:text-sm font-sans">
              Check in at the registration desk starting at 9:30 AM IST (T-30 min). Solo & duo participants will be clubbed before hacking starts.
            </p>
          </div>

          <div className="scratch-block p-5" style={{ borderColor: '#FFE50040', boxShadow: '4px 4px 0 #FFE50030' }}>
            <div className="flex items-center gap-3 mb-2">
              <Flag className="w-5 h-5 text-[#FFE500]" />
              <h3 className="font-heading text-lg text-white">Theme Drop at 10:00 AM</h3>
            </div>
            <p className="text-white/60 text-xs sm:text-sm font-sans">
              Themes go live at 10:00 AM IST. Teams claim their theme first-come, first-served through the portal.
            </p>
          </div>

          <div className="scratch-block p-5" style={{ borderColor: '#FF5CE840', boxShadow: '4px 4px 0 #FF5CE830' }}>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-[#FF5CE8]" />
              <h3 className="font-heading text-lg text-white">4-Hour Build Window</h3>
            </div>
            <p className="text-white/60 text-xs sm:text-sm font-sans">
              Build and submit your Scratch 3.0 game by 2:00 PM IST (T+04:00). Round 2 presentations follow judging.
            </p>
          </div>
        </div>

        {/* Secondary Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <a
            href="#schedule"
            onClick={() => scratchAudio.playSnap()}
            className="scratch-btn scratch-btn-motion text-sm sm:text-base py-2.5 px-6"
          >
            <Clock className="w-4 h-4" /> View Full Event Schedule
          </a>
          <a
            href="#tracks"
            onClick={() => scratchAudio.playSnap()}
            className="scratch-btn scratch-btn-operators text-sm sm:text-base py-2.5 px-6"
          >
            <Sparkles className="w-4 h-4" /> Explore Sample Themes
          </a>
        </div>

      </motion.div>
    </section>
  );
}
