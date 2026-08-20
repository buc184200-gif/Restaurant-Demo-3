import React, { useState, useEffect, useRef } from 'react';
import HeroVisual from './HeroVisual';
import { motion } from 'motion/react';
import gsap from 'gsap';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only run intro animations after loader completes or if already loaded
    const hasLoaded = sessionStorage.getItem('raasa_loaded');
    const delay = hasLoaded ? 0.2 : 2.5;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });

      tl.from('.hero-mask-text', 
        { y: '100%', duration: 1.2, stagger: 0.15, ease: 'power4.out', clearProps: 'all' }
      )
      .from('.hero-fade-up', 
        { opacity: 0, y: 20, duration: 1, stagger: 0.1, ease: 'power3.out', clearProps: 'all' },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100svh] w-full flex items-center overflow-hidden pt-24 md:pt-0">
      <div className="container mx-auto px-6 w-full max-w-[1600px] hero-grid z-10 relative">
        
        {/* Left: Editorial Content */}
        <div className="flex flex-col justify-center order-2 md:order-1 pb-20 md:pb-0 hero-copy">
          <div className="hero-fade-up font-mono text-[10px] md:text-xs tracking-widest uppercase mb-8 md:mb-12 text-chilli">
            01 / Contemporary Indian Dining
          </div>
          
          <h1 className="hero-title text-ink mb-6 md:mb-8 font-newsreader">
            <span className="hero-title-line"><span className="block hero-mask-text hero-word-a">A</span></span>
            <span className="hero-title-line"><span className="block hero-mask-text hero-word-country">COUNTRY</span></span>
            <span className="hero-title-line"><span className="block hero-mask-text hero-word-of">OF</span></span>
            <span className="hero-title-line"><span className="block hero-mask-text hero-word-flavour">FLAVOUR.</span></span>
            <span className="hero-title-line"><span className="block hero-mask-text hero-word-one text-brass italic">ONE</span></span>
            <span className="hero-title-line pb-2"><span className="block hero-mask-text hero-word-table text-brass italic">TABLE.</span></span>
          </h1>
          
          <div className="hero-fade-up font-newsreader italic text-xl md:text-2xl text-ink mb-6">
            Every region leaves something at the table.
          </div>
          
          <p className="hero-fade-up body-text text-muted-dark max-w-md mb-10 md:mb-12">
            RAASA brings regional Indian ingredients, open-fire cooking, handmade breads, expressive sauces, and generous hospitality into one contemporary dining experience.
          </p>
          
          <div className="hero-fade-up flex flex-col sm:flex-row gap-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                import('../lib/events').then(m => m.openReservation());
              }}
              data-cursor-text="RESERVE"
              className="px-8 py-4 bg-ink text-light font-sora text-sm font-medium hover:bg-chilli transition-colors duration-300 text-center uppercase tracking-wider shrink-0 whitespace-nowrap"
            >
              Reserve a Table
            </button>
            <a 
              href="#menu" 
              data-cursor-text="TASTE"
              className="px-8 py-4 bg-transparent border border-border-light text-ink font-sora text-sm font-medium hover:bg-light transition-colors duration-300 text-center uppercase tracking-wider shrink-0 whitespace-nowrap"
            >
              Explore the Menu
            </a>
          </div>

          {/* Micro-details (Desktop only) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-3xl border-t border-border-light pt-6 hero-fade-up">
            <div>
              <span className="block font-mono text-[9px] uppercase text-muted-dark tracking-widest mb-1">Tonight at Raasa</span>
              <span className="font-sora text-xs font-medium">First Seating: 6:00 PM</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase text-muted-dark tracking-widest mb-1">Tasting Journey</span>
              <span className="font-sora text-xs font-medium text-curry">Available</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase text-muted-dark tracking-widest mb-1">Chef's Table</span>
              <span className="font-sora text-xs font-medium text-chilli">3 Seats Left</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase text-muted-dark tracking-widest mb-1">Dining Room</span>
              <span className="font-sora text-xs font-medium">Limited Availability</span>
            </div>
          </div>
        </div>

        {/* Right: SVG Visual Stage */}
        <div className="relative flex items-center justify-center order-1 md:order-2 w-full">
          <div className="hero-visual-stage">
            <HeroVisual />

            {/* Spice Labels (Desktop only) */}
            {!isMobile && (
              <div className="hero-visual-labels hidden xl:block">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute top-[18%] right-[12%] font-mono text-[9px] uppercase tracking-widest text-muted-dark">BRASS / HEAT</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="absolute bottom-[28%] right-[10%] font-mono text-[9px] uppercase tracking-widest text-muted-dark">GRAIN / EARTH</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }} className="absolute top-[38%] left-[2%] font-mono text-[9px] uppercase tracking-widest text-muted-dark">LEAF / FRESHNESS</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 1 }} className="absolute bottom-[25%] left-[20%] font-mono text-[9px] uppercase tracking-widest text-muted-dark">SPICE / MEMORY</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 1 }} className="absolute top-[15%] left-[45%] font-mono text-[9px] uppercase tracking-widest text-muted-dark text-chilli">FIRE / TRANSFORMATION</motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
