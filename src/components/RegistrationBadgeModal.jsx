import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, X, Users, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react';
import { scratchAudio } from '../lib/soundEffects';

export default function RegistrationBadgeModal({ registrationData, onClose }) {
  useEffect(() => {
    // Trigger celebratory confetti burst on mount
    scratchAudio.playGreenFlag();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4C97FF', '#9966FF', '#FFAB19', '#FFBF00', '#59C059']
    });
  }, []);

  if (!registrationData) return null;

  const { teamName, members = [] } = registrationData;
  const leader = members.find(m => m.role === 'leader') || members[0];

  return (
    <div className="modal-overlay p-3 sm:p-6 overflow-y-auto">
      <div className="scratch-block events snap-anim max-w-xl w-full my-auto max-h-[92vh] overflow-y-auto bg-[#151C2D] border-2 border-[#FFAB19]/40 shadow-2xl p-4 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            scratchAudio.playSnap();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 rounded-full bg-[#59C059]/20 text-[#59C059] border border-[#59C059]/40 mb-1">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Team Registration Confirmed!
          </h2>
          <p className="text-slate-300 text-sm">
            Your block code has been compiled and snapped into the official database.
          </p>
        </div>

        {/* Digital Scratch Pass / Badge Card */}
        <div className="bg-gradient-to-br from-[#0E1422] to-[#172238] border-2 border-[#2A364F] rounded-2xl p-6 relative overflow-hidden shadow-inner space-y-4">
          
          {/* Badge Top Header */}
          <div className="flex items-center justify-between border-b border-[#26354F] pb-4">
            <div className="flex items-center gap-2 font-heading font-bold text-lg text-[#FFAB19]">
              <Award className="w-5 h-5 text-[#FFAB19]" />
              ScratchStorm '26 Official Pass
            </div>
            <span className="scratch-tag scratch-tag-operators">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
            </span>
          </div>

          {/* Team Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 font-sans">Team Name</div>
              <div className="font-heading font-extrabold text-xl text-[#4C97FF] truncate">
                {teamName}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-sans">Team Leader</div>
              <div className="font-heading font-bold text-base text-slate-200 truncate">
                {leader?.fullName || leader?.full_name}
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div>
            <div className="text-xs text-slate-400 font-sans mb-2 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#9966FF]" /> Roster ({members.length} {members.length === 1 ? 'Member' : 'Members'})
            </div>
            <div className="space-y-1.5">
              {members.map((mem, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-[#090D16] px-3 py-2 rounded-lg border border-[#232F47]">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    {mem.fullName || mem.full_name}
                    {mem.role === 'leader' && (
                      <span className="text-[10px] uppercase font-sans font-semibold px-1.5 py-0.5 rounded bg-[#FFE500]/20 text-[#FFE500] border border-[#FFE500]/30">
                        Leader
                      </span>
                    )}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {mem.batch}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Community Invite Action */}
        <div className="mt-5 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-center space-y-3">
          <div className="text-xs text-white/80 font-sans">
            <span className="text-[#25D366] font-semibold">Important:</span> Join the official WhatsApp group for live problem statements, mentor assistance, and event announcements.
          </div>
          <a
            href="https://chat.whatsapp.com/LEySMhQIEZs1Z3ApsCBxek?s=sw&p=i&ilr=2"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => scratchAudio.playSnap()}
            className="scratch-btn w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0E1A] font-heading text-xl border-2 border-[#1da851] shadow-[4px_4px_0_#1da851] flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Join Official WhatsApp Group
            <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" />
          </a>
        </div>

        {/* Modal Dismiss */}
        <div className="mt-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-white/50 hover:text-white font-sans transition-colors text-center"
          >
            Dismiss & Return to Overview
          </button>
        </div>

      </div>
    </div>
  );
}
