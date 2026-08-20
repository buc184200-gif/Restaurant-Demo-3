import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run complex GSAP animations on desktop to avoid mobile scroll-jacking/pinning issues
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.manifesto-line',
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            }
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      // Highlight animation for specific words
      gsap.fromTo(
        '.highlight-word',
        { color: 'var(--color-muted-light)' },
        {
          color: 'var(--color-chilli)',
          stagger: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
      
      // Reveal the rest of the text
      gsap.fromTo(
        '.manifesto-line',
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="py-32 md:py-48 bg-aubergine text-light relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-brass uppercase mb-12">
              02 / Our Philosophy
            </span>
            
            <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance mb-8 leading-[1.1]">
              INDIAN COOKING<br/>
              DOES NOT SPEAK<br/>
              IN ONE VOICE.
            </h2>
            
            <p className="body-text text-muted-light max-w-sm leading-relaxed">
              RAASA does not attempt to compress India into one menu. It creates a contemporary conversation between regional ingredients, familiar memories, and modern technique.
            </p>
          </div>
          
          <div className="lg:col-span-7 flex items-center">
            <div ref={textRef} className="font-newsreader text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] tracking-tight space-y-4 md:space-y-6">
              <div className="manifesto-line text-muted-light">
                It changes with the <span className="highlight-word transition-colors duration-300">GRAIN</span>.
              </div>
              <div className="manifesto-line text-muted-light">
                It changes with the <span className="highlight-word transition-colors duration-300">COAST</span>.
              </div>
              <div className="manifesto-line text-muted-light">
                It changes with the <span className="highlight-word transition-colors duration-300">SEASON</span>.
              </div>
              <div className="manifesto-line text-muted-light text-xl md:text-3xl lg:text-4xl mt-8 pt-8 border-t border-border-dark">
                It changes from one <span className="highlight-word transition-colors duration-300">FAMILY</span> to the next.
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Decorative abstract shape */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-brass/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
    </section>
  );
}
