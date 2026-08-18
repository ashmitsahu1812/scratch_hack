import React from 'react';
import { Trophy, Medal, Crown, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { scratchAudio } from '../lib/soundEffects';

const prizeTiers = [
  {
    rank: '1st Place', title: 'Grand Winner Block', prize: '$2,500 Cash',
    borderColor: '#FFE500', shadowColor: 'rgba(255,229,0,0.3)',
    badgeBg: 'rgba(255,229,0,0.15)', badgeColor: '#FFE500', badgeBorder: 'rgba(255,229,0,0.4)',
    icon: Crown,
    perks: ['Official Scratch Winner Trophy', 'VIP Mentor Sessions', 'MIT Scratch Community Spotlight', 'Hardware Dev Kits for Team']
  },
  {
    rank: '2nd Place', title: 'Runner Up Block', prize: '$1,500 Cash',
    borderColor: 'rgba(255,255,255,0.5)', shadowColor: 'rgba(255,255,255,0.1)',
    badgeBg: 'rgba(255,255,255,0.1)', badgeColor: '#fff', badgeBorder: 'rgba(255,255,255,0.3)',
    icon: Trophy,
    perks: ['Runner-Up Plaque', 'Annual Pro Dev Licenses', 'Swag Box & Scratch Collectibles']
  },
  {
    rank: '3rd Place', title: 'Bronze Master', prize: '$800 Cash',
    borderColor: '#FF6B6B', shadowColor: 'rgba(255,107,107,0.25)',
    badgeBg: 'rgba(255,107,107,0.15)', badgeColor: '#FF6B6B', badgeBorder: 'rgba(255,107,107,0.4)',
    icon: Medal,
    perks: ['3rd Place Certificate', 'Custom Scratch T-Shirts & Stickers', 'Cloud Hosting Credits']
  },
  {
    rank: 'Special Award', title: 'Best Mechanics', prize: '$500 Special Prize',
    borderColor: '#A78BFF', shadowColor: 'rgba(167,139,255,0.25)',
    badgeBg: 'rgba(167,139,255,0.15)', badgeColor: '#A78BFF', badgeBorder: 'rgba(167,139,255,0.4)',
    icon: Sparkles,
    perks: ['Most complex physics/math block algorithm', 'Judges Pick Trophy', 'Special Recognition Badge']
  }
];

export default function Prizes() {
  return (
    <section id="prizes" className="py-20 relative bg-[#1A1DCC]/40 border-t-2 border-b-2 border-white/10">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="scratch-tag scratch-tag-operators mb-3">reward block variable</span>
          <h2 className="font-heading text-5xl sm:text-7xl text-white mt-2">Prizes &amp; Perks</h2>
          <p className="text-white/55 mt-3 text-sm sm:text-base font-sans">
            Compete for cash rewards, trophies, developer tools, and verified digital certificates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizeTiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => scratchAudio.playSnap()}
                className="scratch-block scratch-notch hover:scale-[1.03] cursor-pointer flex flex-col justify-between"
                style={{
                  borderColor: tier.borderColor,
                  boxShadow: `5px 5px 0 ${tier.shadowColor}`
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-sm font-sans font-bold text-xs border"
                      style={{ background: tier.badgeBg, color: tier.badgeColor, borderColor: tier.badgeBorder }}>
                      {tier.rank}
                    </span>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-heading text-2xl text-white mb-1">{tier.title}</h3>

                  <div className="font-heading text-3xl mb-4" style={{ color: tier.badgeColor }}>
                    {tier.prize}
                  </div>

                  <ul className="space-y-2 text-xs text-white/65 border-t border-white/10 pt-3 font-sans">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFB3] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 text-center">
                  <span className="text-[11px] font-code text-white/35">
                    set [prize_pool] to ({tier.prize})
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certificate Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
                Every member who submits a valid Scratch project receives a verified digital certificate of participation.
              </p>
            </div>
          </div>
          <span className="scratch-tag scratch-tag-motion shrink-0">100% Certificate Guarantee</span>
        </motion.div>

      </motion.div>
    </section>
  );
}
