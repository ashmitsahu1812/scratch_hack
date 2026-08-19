import React, { useState } from 'react';
import { Flag, Octagon, Volume2, VolumeX, Menu, X, Code2, Sparkles } from 'lucide-react';
import { scratchAudio } from '../lib/soundEffects';

export default function Navbar() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flagClicked, setFlagClicked] = useState(false);

  const handleToggleSound = () => {
    const newState = scratchAudio.toggleSound();
    setSoundEnabled(newState);
    if (newState) scratchAudio.playSnap();
  };

  const handleGreenFlag = () => {
    scratchAudio.playGreenFlag();
    setFlagClicked(true);
    setTimeout(() => setFlagClicked(false), 600);
    const formSection = document.getElementById('register');
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStop = () => {
    scratchAudio.playError();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#070B14]/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#FFE500] flex items-center justify-center border-2 border-white/20 shadow-md group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-[#070B14]" />
              </div>
              <div>
                <div className="flex items-center gap-1 font-heading text-xl sm:text-2xl text-white tracking-wider">
                  Scratch<span className="text-[#FFE500]">Storm</span>
                  <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-sans font-semibold tracking-normal border border-white/20">
                    '26
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/40 font-sans leading-none">Hosted by <span className="text-white/70 font-semibold">NST SDC</span></div>
              </div>
            </a>

            {/* Flag & Stop Controls */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10">
              <button
                onClick={handleGreenFlag}
                title="Go to Register"
                className={`p-1.5 rounded-md bg-[#00FFB3]/20 hover:bg-[#00FFB3]/30 text-[#00FFB3] border border-[#00FFB3]/40 transition-all active:scale-95 ${flagClicked ? 'animate-bounce scale-110' : ''}`}
              >
                <Flag className="w-4 h-4 fill-[#00FFB3]" />
              </button>
              <button
                onClick={handleStop}
                title="Scroll to Top"
                className="p-1.5 rounded-md bg-[#FF6B6B]/20 hover:bg-[#FF6B6B]/30 text-[#FF6B6B] border border-[#FF6B6B]/40 transition-all active:scale-95"
              >
                <Octagon className="w-4 h-4 fill-[#FF6B6B]" />
              </button>
              <button
                onClick={handleToggleSound}
                title={soundEnabled ? 'Mute' : 'Unmute'}
                className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                {soundEnabled
                  ? <Volume2 className="w-4 h-4 text-[#A78BFF]" />
                  : <VolumeX className="w-4 h-4 text-white/30" />}
              </button>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 font-sans font-semibold text-sm">
            <a href="#overview" className="text-white/70 hover:text-white transition-colors">Overview</a>
            <a href="#register" className="text-[#FFE500] hover:text-white transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Register
            </a>
            <a href="#tracks"   className="text-white/70 hover:text-white transition-colors">Problems</a>
            <a href="#schedule" className="text-white/70 hover:text-white transition-colors">Schedule</a>
            <a href="#judging"  className="text-white/70 hover:text-white transition-colors">Judging</a>
            <a href="#prizes"   className="text-white/70 hover:text-white transition-colors">Prizes</a>
            <a href="#faq"      className="text-white/70 hover:text-white transition-colors">FAQ</a>
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#register"
              onClick={() => scratchAudio.playSnap()}
              className="hidden sm:inline-flex scratch-btn scratch-btn-events text-sm py-2 px-5"
            >
              Join Hackathon
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white rounded-md bg-white/5 border border-white/15 active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF6B6B]" /> : <Menu className="w-5 h-5 text-[#FFE500]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0F1D] border-b border-white/15 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center gap-2 mb-4 bg-white/5 p-2 rounded-lg border border-white/10">
            <button onClick={handleGreenFlag} className="flex-1 py-2 rounded bg-[#00FFB3]/20 text-[#00FFB3] text-xs font-bold flex items-center justify-center gap-1 border border-[#00FFB3]/40">
              <Flag className="w-4 h-4 fill-[#00FFB3]" /> Green Flag
            </button>
            <button onClick={handleStop} className="flex-1 py-2 rounded bg-[#FF6B6B]/20 text-[#FF6B6B] text-xs font-bold flex items-center justify-center gap-1 border border-[#FF6B6B]/40">
              <Octagon className="w-4 h-4 fill-[#FF6B6B]" /> Stop
            </button>
            <button onClick={handleToggleSound} className="px-3 py-2 rounded bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1 border border-white/20">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#A78BFF]" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>
          </div>
          {[
            { href: '#overview', label: 'Overview' },
            { href: '#register', label: 'Register Now' },
            { href: '#tracks',   label: 'Problem Statements' },
            { href: '#schedule', label: 'Schedule' },
            { href: '#judging',  label: 'Judging Criteria' },
            { href: '#prizes',   label: 'Prizes & Perks' },
            { href: '#faq',      label: 'FAQ' },
          ].map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white/80 hover:text-white font-sans font-medium border-b border-white/10">
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
