import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: 'ingredient',
    title: 'INGREDIENT',
    desc: 'Seasonal cauliflower and fresh aromatics.'
  },
  {
    id: 'marinade',
    title: 'MARINADE',
    desc: 'Yoghurt, mustard, chilli, and toasted spice.'
  },
  {
    id: 'fire',
    title: 'FIRE',
    desc: 'Cooked in high heat until charred at the edges.'
  },
  {
    id: 'sauce',
    title: 'SAUCE',
    desc: 'Balanced with sesame, herb oil, and acidity.'
  },
  {
    id: 'plate',
    title: 'PLATE',
    desc: 'Finished with texture, smoke, and restraint.'
  }
];

export default function FireAndSpice() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = window.matchMedia('(max-width: 1024px)').matches;

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Simple visual sequence using CSS opacity/transforms instead of complex WebGL for this scroll section
      stages.forEach((_, index) => {
        if (index === 0) return; // Skip first as it's visible initially
        
        tl.to(`.stage-text-${index - 1}`, { opacity: 0.2, duration: 0.5 }, index)
          .to(`.stage-text-${index}`, { opacity: 1, duration: 0.5 }, index)
          .to(`.stage-visual-${index - 1}`, { opacity: 0, duration: 0.5 }, index)
          .to(`.stage-visual-${index}`, { opacity: 1, duration: 0.5 }, index);
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={containerRef} className="bg-rice text-ink relative border-t border-border-light">
      
      {/* Intro Header */}
      <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none">
        <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-4 block">07 / From Spice to Plate</span>
        <h2 className="font-newsreader text-3xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
          FLAVOUR IS<br/>
          BUILT IN STAGES.
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-dark mt-4">
          TANDOOR CAULIFLOWER / MUSTARD / SESAME / GREEN CHILLI
        </p>
      </div>

      {isMobile ? (
        <div className="pt-64 pb-20 px-6 space-y-24">
          {stages.map((stage, i) => (
             <div key={stage.id} className="flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full border border-border-dark flex items-center justify-center mb-8 relative overflow-hidden bg-white">
                  <div className="font-mono text-[10px] text-muted-dark opacity-50 absolute">Visual Placeholder: {stage.title}</div>
                </div>
                <h3 className="font-newsreader text-3xl mb-4">{stage.title}</h3>
                <p className="font-sora text-sm text-muted-dark">{stage.desc}</p>
             </div>
          ))}
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          
          {/* Left Side: Text Sequence */}
          <div className="w-1/2 h-full flex flex-col justify-center px-24 z-10 relative">
            <div className="space-y-12 mt-32">
              {stages.map((stage, i) => (
                <div key={stage.id} className={`stage-text-${i} ${i === 0 ? 'opacity-100' : 'opacity-20'}`}>
                  <h3 className="font-newsreader text-4xl mb-2">{stage.title}</h3>
                  <p className="font-sora text-base text-muted-dark max-w-sm">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Sticky Visuals Sequence */}
          <div className="w-1/2 h-full flex items-center justify-center relative border-l border-border-light bg-white/50">
             {stages.map((stage, i) => (
               <div key={stage.id} className={`stage-visual-${i} absolute inset-0 flex items-center justify-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Abstract SVG representations of the cooking stages */}
                  <div className="relative w-96 h-96">
                    {i === 0 && <div className="absolute inset-0 rounded-full border border-brass/30 animate-[spin_20s_linear_infinite] flex items-center justify-center"><div className="w-32 h-32 bg-limestone rounded-full" /></div>}
                    {i === 1 && <div className="absolute inset-0 rounded-full bg-turmeric/10 blur-xl flex items-center justify-center"><div className="w-40 h-40 bg-curry/20 rounded-full mix-blend-multiply" /></div>}
                    {i === 2 && <div className="absolute inset-0 rounded-full flex items-center justify-center"><div className="w-48 h-48 bg-chilli/20 blur-md rounded-full animate-pulse" /><div className="absolute w-32 h-32 bg-ink/90 rounded-[40%]" /></div>}
                    {i === 3 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-48 h-48 border-[20px] border-mustard/30 rounded-full" /><div className="absolute w-32 h-32 bg-ink/90 rounded-[40%]" /></div>}
                    {i === 4 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-64 h-64 border border-brass/50 rounded-full" /><div className="absolute w-32 h-32 bg-ink rounded-[40%]" /><div className="absolute top-1/4 right-1/4 w-8 h-8 bg-chilli/40 rounded-full blur-sm" /></div>}
                  </div>
               </div>
             ))}
          </div>

        </div>
      )}
    </section>
  );
}
