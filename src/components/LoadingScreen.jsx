import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    // Hide loading screen after sequence completes
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.3 }}
      className="fixed inset-0 z-[9999] bg-[#0B0F17] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:38px_38px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated Blocks */}
        <div className="code-stack mb-8 scale-150">
          {/* Top block - Events (Yellow) */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="scratch-block events p-3 w-44 text-center relative z-30 shadow-xl flex items-center justify-center gap-1.5"
            style={{ padding: '0.75rem', borderRadius: '4px', borderLeftWidth: '5px' }}
          >
            <span className="font-heading text-lg text-white flex items-center justify-center gap-1">
              WHEN <span className="text-[#00FFB3] text-xl leading-none">⚑</span> CLICKED
            </span>
          </motion.div>
          
          {/* Middle block - Motion (Green) */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
            className="scratch-block motion scratch-notch p-3 w-44 text-center relative z-20 shadow-xl"
            style={{ padding: '0.75rem', borderRadius: '4px', borderLeftWidth: '5px' }}
          >
            <span className="font-heading text-lg text-white">INITIALIZE HACK</span>
          </motion.div>

          {/* Bottom block - Looks (Pink) */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.0 }}
            className="scratch-block looks scratch-notch p-3 w-44 text-center relative z-10 shadow-xl"
            style={{ padding: '0.75rem', borderRadius: '4px', borderLeftWidth: '5px' }}
          >
            <span className="font-heading text-lg text-white">SHOW WEBSITE</span>
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ duration: 1.5, delay: 1.2, repeat: Infinity }}
          className="font-code text-[#00FFB3] text-sm tracking-widest mt-8"
        >
          EXECUTING SCRIPTS...
        </motion.div>
      </div>
    </motion.div>
  );
}
