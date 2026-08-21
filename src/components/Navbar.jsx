import React, { useState } from 'react';
import { Flag, Octagon, Volume2, VolumeX, Menu, X, Code2, Sparkles, Lock } from 'lucide-react';
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
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStop = () => {
    scratchAudio.playStop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#070B14]/90 backdrop-blur-md border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Left: Scratch-style branding + Flag controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Logo */}
            <a href="#overview" className="flex items-center gap-2 group cursor-pointer" title="Go to top">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#FFE500] border-2 border-[#CCB800] flex items-center justify-center font-heading text-lg sm:text-2xl text-[#070B14] shadow-[2px_2px_0_#CCB800] group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl text-white tracking-wider leading-none group-hover:text-[#FFE500] transition-colors">
                  SCRATCH STORM '26
                </span>
                <span className="text-[10px] font-sans font-medium text-white/50 tracking-wider">
                  BY NST SDC X REY
                </span>
              </div>
            </a>

            {/* Scratch Controls */}
            <div className="hidden sm:flex items-center gap-1.5 bg-black/40 p-1.5 rounded-lg border border-white/10">
              <button
                onClick={handleGreenFlag}
                title="Go to Registration Info"
                className={`p-1.5 rounded-md transition-all ${
                  flagClicked
                    ? 'bg-[#00FFB3] text-[#070B14] scale-95'
                    : 'bg-white/5 hover:bg-[#00FFB3]/20 text-[#00FFB3]'
                }`}
              >
                <Flag className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={handleStop}
                title="Reset scroll"
                className="p-1.5 rounded-md bg-white/5 hover:bg-[#FF6B6B]/20 text-[#FF6B6B] transition-all"
              >
                <Octagon className="w-4 h-4 fill-current" />
              </button>

              <div className="w-px h-4 bg-white/10 mx-0.5" />

              <button
                onClick={handleToggleSound}
                title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
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
            <a href="#register" className="text-white/70 hover:text-white transition-colors">Registration</a>
            <a href="#tracks"   className="text-white/70 hover:text-white transition-colors">Themes</a>
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
              className="hidden md:inline-flex items-center gap-1.5 font-heading text-sm tracking-wider px-3.5 py-1.5 rounded-sm bg-[#FF6B6B]/20 hover:bg-[#FF6B6B]/30 text-[#FF6B6B] border border-[#FF6B6B]/40 shadow-sm transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Registrations Closed</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/90 hover:text-white rounded-md bg-white/5 border border-white/15 active:scale-95 transition-all"
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
            { href: '#register', label: 'Registration (Closed)' },
            { href: '#tracks',   label: 'Themes' },
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
