import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ChevronDown } from 'lucide-react';

const regionData = [
  {
    id: 'north',
    name: 'North & Frontier',
    traits: ['Tandoor', 'Grains', 'Slow-cooked sauces', 'Charred vegetables', 'Handmade breads'],
    signature: 'Smoked Bone Marrow Kulcha',
    technique: 'Open Fire / Tandoor',
    story: 'Drawing from the robust, fire-led cooking of the frontier and the rich, complex layering of slow-simmered northern sauces.',
    drink: 'Aged Syrah or Smoked Cardamom Old Fashioned',
    color: 'from-tamarind to-aubergine-light'
  },
  {
    id: 'coast',
    name: 'Coast',
    traits: ['Coconut', 'Kokum', 'Tamarind', 'Seafood', 'Curry leaves'],
    signature: 'Chettinad Scottish Scallop',
    technique: 'Tempering / Acid balance',
    story: 'Inspired by the vibrant, sour, and coconut-rich profiles of the long Indian coastline, balancing deep spice with bright acidity.',
    drink: 'Dry Riesling or Kokum Gimlet',
    color: 'from-curry to-aubergine-light'
  },
  {
    id: 'deccan',
    name: 'Deccan',
    traits: ['Chilli', 'Peanut', 'Sesame', 'Fermentation', 'Earthy spices'],
    signature: 'Wood-Fired Tiger Prawns with Guntur Chilli',
    technique: 'Dry Roasting / Fermentation',
    story: 'The arid plateaus offer intensely earthy flavours, where dry-roasted seeds, fiery chillies, and sharp fermented notes dominate.',
    drink: 'Skin-contact Orange Wine',
    color: 'from-chilli to-aubergine-light'
  },
  {
    id: 'east',
    name: 'East',
    traits: ['Mustard', 'River fish', 'Rice', 'Poppy seed', 'Delicate sweets'],
    signature: 'Smoked Malai Celeriac with Poppy Seed',
    technique: 'Steaming / Mustard Oil Tempering',
    story: 'Characterised by the sharp pungency of mustard oil, the subtle sweetness of freshwater ingredients, and a reliance on poppy seed pastes.',
    drink: 'Chablis or Mustard-washed Martini',
    color: 'from-brass to-aubergine-light'
  },
  {
    id: 'west',
    name: 'West & Desert',
    traits: ['Millet', 'Yoghurt', 'Pickles', 'Slow heat', 'Preserved ingredients'],
    signature: 'Aged Duck Crown with Tamarind',
    technique: 'Preservation / Slow Braising',
    story: 'Harsh desert climates necessitated brilliant preservation techniques, resulting in dishes defined by intensely tangy pickles and dried spices.',
    drink: 'Light Pinot Noir or Clarified Lassi Punch',
    color: 'from-turmeric to-aubergine-light'
  }
];

export default function RegionalMenu() {
  const [activeRegion, setActiveRegion] = useState(regionData[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(regionData[0].id);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeData = regionData.find(r => r.id === activeRegion) || regionData[0];

  return (
    <section id="menu" className="py-32 md:py-48 bg-rice text-ink relative">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-20">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">03 / The Menu</span>
          <h2 className="section-headline mb-4 font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            MANY REGIONS.<br/>
            ONE EVENING.
          </h2>
          <p className="body-text text-muted-dark max-w-xl">
            These categories are broad inspirations, not definitive representations. We use them as a starting point for contemporary exploration.
          </p>
        </div>

        {isMobile ? (
          <div className="space-y-4">
            {regionData.map((region) => (
              <div key={region.id} className="border-b border-border-light pb-4">
                <button 
                  onClick={() => setExpandedId(expandedId === region.id ? null : region.id)}
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  aria-expanded={expandedId === region.id}
                  aria-controls={`content-${region.id}`}
                >
                  <h3 className="font-newsreader text-2xl text-ink">{region.name}</h3>
                  <ChevronDown className={cn("transition-transform duration-300", expandedId === region.id ? "rotate-180" : "rotate-0")} size={20} />
                </button>
                
                <AnimatePresence>
                  {expandedId === region.id && (
                    <motion.div
                      id={`content-${region.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-6 space-y-6">
                        <div className="flex flex-wrap gap-2">
                          {region.traits.map(trait => (
                            <span key={trait} className="px-3 py-1 bg-white border border-border-light rounded-full font-mono text-[10px] uppercase tracking-widest text-ink">
                              {trait}
                            </span>
                          ))}
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Signature Inspiration</span>
                            <p className="font-newsreader text-lg">{region.signature}</p>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Core Technique</span>
                            <p className="font-sora text-sm">{region.technique}</p>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">The Approach</span>
                            <p className="font-sora text-sm text-muted-dark">{region.story}</p>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Suggested Pairing</span>
                            <p className="font-sora text-sm text-chilli">{region.drink}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-16 relative">
            <div className="col-span-5 flex flex-col space-y-2 relative z-10">
              {regionData.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  data-cursor-text="VIEW"
                  className={cn(
                    "text-left py-6 border-b transition-all duration-300 w-full group",
                    activeRegion === region.id ? "border-chilli pl-8" : "border-border-light hover:border-ink hover:pl-4"
                  )}
                >
                  <h3 className={cn(
                    "font-newsreader text-4xl transition-colors duration-300",
                    activeRegion === region.id ? "text-chilli" : "text-muted-dark group-hover:text-ink"
                  )}>
                    {region.name}
                  </h3>
                </button>
              ))}
            </div>

            <div className="col-span-7 relative h-auto">
              <div className="sticky top-40 w-full bg-white border border-border-light p-12 overflow-hidden shadow-sm h-[600px] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, clipPath: 'inset(10% 0 0 0)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                    exit={{ opacity: 0, clipPath: 'inset(0 0 10% 0)' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="flex-1 flex flex-col h-full relative"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 -mt-16 -mr-16 rounded-full opacity-20 blur-3xl pointer-events-none mix-blend-multiply" 
                         style={{ background: `linear-gradient(135deg, var(--color-${activeData.color.split(' ')[0].replace('from-', '')}), var(--color-${activeData.color.split(' ')[1].replace('to-', '')}))` }} />

                    <div className="flex flex-wrap gap-2 mb-10">
                      {activeData.traits.map(trait => (
                        <span key={trait} className="px-3 py-1 bg-rice border border-border-light font-mono text-[10px] uppercase tracking-widest text-ink">
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-12 flex-1">
                      <div className="space-y-10">
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Signature Inspiration</span>
                          <p className="font-newsreader text-3xl leading-tight text-ink">{activeData.signature}</p>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Core Technique</span>
                          <p className="font-sora text-sm font-medium">{activeData.technique}</p>
                        </div>
                      </div>

                      <div className="space-y-10 border-l border-border-light pl-12 flex flex-col justify-between">
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">The Approach</span>
                          <p className="body-text text-muted-dark leading-relaxed">{activeData.story}</p>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Suggested Pairing</span>
                          <p className="font-sora text-sm font-medium text-chilli">{activeData.drink}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
