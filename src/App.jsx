import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Judging from './components/Judging';
import Faq from './components/Faq';
import LoadingScreen from './components/LoadingScreen';
import { Code2, Heart } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen text-white flex flex-col font-sans selection:bg-[#FFE500] selection:text-[#2B2EFF]"
        >

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow space-y-4">
            <Hero />
            <RegistrationForm />
            <Tracks />
            <Timeline />
            <Prizes />
            <Judging />
            <Faq />
          </main>

          {/* Footer */}
          <footer className="border-t-2 border-white/15 py-12 px-4 sm:px-6 lg:px-8 mt-20 bg-[#1A1DCC]/60 backdrop-blur-md">
            <div className="max-w-6xl mx-auto space-y-8">

              {/* NST Hosted By Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-6 rounded-md bg-white/5 border border-white/15 text-center sm:text-left">
                <div className="w-12 h-12 rounded-md bg-[#FFE500] flex items-center justify-center border-2 border-[#CCB800] shrink-0 shadow-[3px_3px_0_#CCB800]">
                  <Code2 className="w-6 h-6 text-[#2B2EFF]" />
                </div>
                <div>
                  <div className="text-xs font-sans font-semibold text-white/40 uppercase tracking-widest mb-0.5">Proudly Hosted By</div>
                  <div className="font-heading text-2xl text-white tracking-wide">Newton School of Technology</div>
                  <div className="text-xs text-white/45 font-sans">Empowering the next generation of innovators</div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left border-t border-white/10 pt-6">
                <div className="flex items-center justify-center md:justify-start gap-2 font-heading text-xl text-white tracking-wider">
                  Scratch<span className="text-[#FFE500]">Hack</span> '26
                </div>

                <div className="flex items-center gap-3">
                  <span className="scratch-tag scratch-tag-operators">when [project] loaded</span>
                  <span className="scratch-tag scratch-tag-events">2026</span>
                </div>

                <div className="text-xs text-white/40 font-code space-y-1">
                  <div>
                    Built with <Heart className="w-3.5 h-3.5 text-[#FF5CE8] inline fill-current" /> for Scratchers worldwide
                  </div>
                  <div>© 2026 ScratchHack Org. All rights reserved.</div>
                </div>
              </div>

            </div>
          </footer>

        </motion.div>
      )}
    </>
  );
}
