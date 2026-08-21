import React from 'react';
import { Lock, Award, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

const mysteryTiers = [
  {
    rank: '1st Place',
    title: 'Grand Winner Block',
    borderColor: '#FFE500',
    shadowColor: 'rgba(255,229,0,0.25)',
    badgeBg: 'rgba(255,229,0,0.15)',
    badgeColor: '#FFE500',
    badgeBorder: 'rgba(255,229,0,0.4)',
    hint: 'Grand Cash Reward + Winner Trophy + Exclusive Dev Kits'
  },
  {
    rank: '2nd Place',
    title: 'Runner Up Block',
    borderColor: '#00FFB3',
    shadowColor: 'rgba(0,255,179,0.25)',
    badgeBg: 'rgba(0,255,179,0.15)',
    badgeColor: '#00FFB3',
    badgeBorder: 'rgba(0,255,179,0.4)',
    hint: 'Cash Prize + Runner-Up Plaque + Pro Licenses'
  },
  {
    rank: '3rd Place',
    title: 'Bronze Master',
    borderColor: '#FF5CE8',
    shadowColor: 'rgba(255,92,232,0.25)',
    badgeBg: 'rgba(255,92,232,0.15)',
    badgeColor: '#FF5CE8',
    badgeBorder: 'rgba(255,92,232,0.4)',
    hint: 'Cash Prize + Bronze Award + Merch Kit'
  }
];

export default function Prizes() {
  return (
    <section id="prizes" className="py-16 sm:py-20 relative bg-[#0B1020]/60 border-t border-b border-white/10 overflow-hidden">
      {/* Floating 3D Geometric Shapes */}
      <GeoStar 
        color="#FFE500" shadow="#998A00"
        className="absolute top-10 left-8 lg:left-14 w-14 h-14 lg:w-16 lg:h-16 geo-float opacity-85 hidden md:block"
      />
      <GeoDiamond 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute top-16 right-8 lg:right-16 w-12 h-12 lg:w-14 lg:h-14 geo-float-slow opacity-80 hidden md:block"
      />
      <GeoBox 
        color="#00FFB3" shadow="#008F64"
        className="absolute bottom-12 left-8 lg:left-14 w-12 h-12 lg:w-14 lg:h-14 geo-float-alt opacity-75 hidden md:block"
      />
      <GeoCylinder 
        color="#FF6B6B" shadow="#CC4444"
        className="absolute bottom-16 right-8 lg:right-16 w-12 h-16 geo-float-slow opacity-75 hidden md:block"
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 text-[#FF6B6B] text-xs font-sans font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" /> REWARD POOL LOCKED
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl text-white mt-2">Prizes &amp; Perks</h2>
          <p className="text-white/60 mt-3 text-sm sm:text-base font-sans">
            The grand prize pool, winner trophies, and podium honours are being finalized by NST SDC X REY.
          </p>
        </div>

        {/* Big Central Announcement Banner */}
        <div className="scratch-block events snap-anim p-8 sm:p-10 mb-12 text-center relative border-2 border-[#FFE500] shadow-[6px_6px_0_#CCB800] overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex p-4 rounded-2xl bg-[#FFE500]/20 text-[#FFE500] border-2 border-[#FFE500]/40 shadow-inner">
              <Lock className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="font-heading text-4xl sm:text-6xl text-white tracking-wide">
              TO BE ANNOUNCED SOON
            </h3>

            <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed">
              Exciting cash rewards, winner trophies, exclusive tech swag, and goodies are currently locked under wraps. Stay tuned for the official grand reveal!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <span className="scratch-tag scratch-tag-control">
                <Clock className="w-3.5 h-3.5" /> REVEAL COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* Mystery Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mysteryTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => scratchAudio.playSnap()}
              className="scratch-block scratch-notch cursor-pointer flex flex-col justify-between p-6 relative group overflow-hidden"
              style={{
                borderColor: tier.borderColor,
                boxShadow: `5px 5px 0 ${tier.shadowColor}`
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-2.5 py-1 rounded-sm font-sans font-bold text-xs border"
                    style={{ background: tier.badgeBg, color: tier.badgeColor, borderColor: tier.badgeBorder }}
                  >
                    {tier.rank}
                  </span>
                  <Lock className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-heading text-2xl text-white mb-2">{tier.title}</h3>

                {/* Locked Prize Amount */}
                <div className="py-4 px-3 rounded-lg bg-black/40 border border-white/10 text-center my-3">
                  <div className="font-heading text-3xl tracking-widest text-[#FFE500]">
                    ???
                  </div>
                  <span className="text-[10px] font-sans font-bold text-white/50 uppercase tracking-wider">
                    To Be Announced Soon
                  </span>
                </div>

                <p className="text-xs text-white/60 font-sans mt-3 border-t border-white/10 pt-3 leading-relaxed">
                  {tier.hint}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-center">
                <span className="text-[11px] font-code text-white/35">
                  set [reward_state] to (locked)
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Banner (Guaranteed for all) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 scratch-block operators scratch-notch p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: '#00FFB3', boxShadow: '5px 5px 0 rgba(0,255,179,0.2)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-[#00FFB3]/20 flex items-center justify-center text-[#00FFB3] border border-[#00FFB3]/40 shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-heading text-2xl text-white">Digital Certificate for All Participants</h4>
              <p className="text-white/60 text-xs sm:text-sm font-sans">
                Every member who submits a valid Scratch project receives a verified digital certificate of participation from NST SDC X REY.
              </p>
            </div>
          </div>
          <span className="scratch-tag scratch-tag-motion shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Certificate Guarantee
          </span>
        </motion.div>

      </motion.div>
    </section>
  );
}
