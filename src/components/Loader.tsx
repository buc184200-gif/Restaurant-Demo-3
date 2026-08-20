import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('raasa_loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setProgress(Math.floor(p));
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('raasa_loaded', 'true');
      }, 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9000] flex"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, delay: 0.8 } }}
        >
          <motion.div 
            className="absolute inset-0 bg-aubergine z-0"
            exit={{ opacity: 0, transition: { duration: 0.1 } }} 
          />
          
          <motion.div 
            className="absolute top-0 left-0 w-1/2 h-full bg-aubergine z-10"
            exit={{ x: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-1/2 h-full bg-aubergine z-10"
            exit={{ x: '100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          />
          
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            exit={{ scale: 1.2, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }}
          >
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
              <motion.div 
                className="absolute inset-0 rounded-full border border-brass/40"
                animate={progress === 100 ? { scale: 1.5, opacity: 0 } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-dashed border-chilli/30"
              />
              
              <div className="text-center flex flex-col items-center">
                <h1 className="font-newsreader text-4xl text-brass mb-2 tracking-wide">RAASA</h1>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-light mb-6">
                  Spice / Fire / Season / Memory
                </p>
                <div className="font-mono text-sm text-light">{progress}%</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: progress === 100 ? 1 : 0 }}
              className="absolute bottom-16 font-newsreader text-xl text-brass italic tracking-wide"
            >
              The First Course Arrives
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
