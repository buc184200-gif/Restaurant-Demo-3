import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const spices = [
  { id: 'black-cardamom', name: 'Black Cardamom', aroma: 'Smoky, camphor, earthy', flavor: 'Deep, resinous, savoury', role: 'Base note in slow-cooked braises and rice dishes.', menu: 'Aged Duck Crown, Lamb Seekh', pairing: 'Dark meats, lentils' },
  { id: 'green-cardamom', name: 'Green Cardamom', aroma: 'Eucalyptus, citrus, sweet', flavor: 'Bright, zesty, penetrating', role: 'Top note in both savoury gravies and desserts.', menu: 'Jaggery Caramel, Sweets', pairing: 'Milk, rice, poultry' },
  { id: 'cumin', name: 'Cumin', aroma: 'Earthy, warm, slightly bitter', flavor: 'Nutty, savory, penetrating', role: 'Foundational spice for tempering (tadka).', menu: 'Tomato Rasam', pairing: 'Beans, lamb, root veg' },
  { id: 'coriander', name: 'Coriander Seed', aroma: 'Floral, citrusy, woody', flavor: 'Mellow, sweet, tart', role: 'Thickening agent and balancing base note.', menu: 'General base spice', pairing: 'Fish, chicken, citrus' },
  { id: 'mustard', name: 'Mustard Seed', aroma: 'Pungent, sharp (when cracked)', flavor: 'Nutty, sharp, warming', role: 'Tempered in hot oil to release nutty flavours.', menu: 'Coast seafood, Pickles', pairing: 'Fish, coconut, potatoes' },
  { id: 'kashmiri-chilli', name: 'Kashmiri Chilli', aroma: 'Fruity, smoky', flavor: 'Mild heat, sweet red pepper, vibrant red colour', role: 'Colour and gentle warmth without aggressive heat.', menu: 'Makhani, Rogan Josh', pairing: 'Tomato, yoghurt, meats' },
  { id: 'fenugreek', name: 'Fenugreek', aroma: 'Maple, celery, bitter', flavor: 'Nutty, bittersweet, burnt sugar', role: 'Adds complex bitter depth and savoury aroma.', menu: 'Mustard Chicken', pairing: 'Spinach, chicken, potatoes' },
  { id: 'turmeric', name: 'Turmeric', aroma: 'Earthy, mustard-like', flavor: 'Warm, slightly bitter, astringent', role: 'Color, earthiness, and baseline flavour.', menu: 'Almost all savoury dishes', pairing: 'Cauliflower, fish, lentils' },
  { id: 'star-anise', name: 'Star Anise', aroma: 'Licorice, sweet, pungent', flavor: 'Sweet, anise-like, warm', role: 'Sweet, highly aromatic top note in rich curries.', menu: 'Chettinad Scallop', pairing: 'Pork, duck, rich sauces' },
  { id: 'curry-leaf', name: 'Curry Leaf', aroma: 'Citrus, roasted nut, asafoetida', flavor: 'Nutty, slightly bitter, highly aromatic', role: 'Fresh herbal note, usually tempered in oil.', menu: 'Gunpowder Potato, Rasam', pairing: 'Coconut, seafood, lentils' },
  { id: 'tamarind', name: 'Tamarind', aroma: 'Fruity, sour, molasses', flavor: 'Intensely tart, sweet-sour, dark', role: 'Primary souring agent in southern and coastal dishes.', menu: 'Jackfruit, Prawns', pairing: 'Seafood, chillies, jaggery' },
  { id: 'kokum', name: 'Kokum', aroma: 'Fruity, floral, slightly smoky', flavor: 'Sharp, fruity sourness, non-astringent', role: 'Souring agent for coastal seafood curries.', menu: 'Seasonal Fish', pairing: 'Coconut milk, fish' },
];

export default function SpiceLibrary() {
  const [activeSpice, setActiveSpice] = useState(spices[0]);

  return (
    <section className="py-32 md:py-48 bg-aubergine text-light relative overflow-hidden border-t border-border-dark">
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        <div className="mb-20 text-center">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-brass uppercase mb-6 block">09 / Spice Library</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            SMALL INGREDIENTS.<br/>
            LARGE CONSEQUENCES.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Interactive Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {spices.map(spice => (
                <button
                  key={spice.id}
                  onClick={() => setActiveSpice(spice)}
                  className={cn(
                    "p-6 border text-left transition-all duration-300 flex flex-col items-start h-32 justify-between group",
                    activeSpice.id === spice.id 
                      ? "bg-brass border-brass text-ink" 
                      : "bg-white/5 border-white/10 hover:border-white/30 text-light"
                  )}
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Spice</span>
                  <span className={cn(
                    "font-newsreader text-xl",
                    activeSpice.id === spice.id ? "text-ink" : "text-light group-hover:text-brass transition-colors"
                  )}>{spice.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-sm min-h-[500px]">
              
              {/* Abstract Visual */}
              <div className="absolute top-0 right-0 w-48 h-48 -mr-12 -mt-12 pointer-events-none opacity-30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSpice.id}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full border border-brass rounded-full border-dashed animate-[spin_30s_linear_infinite] flex items-center justify-center"
                  >
                    <div className="w-24 h-24 bg-brass rounded-[40%] mix-blend-screen blur-md" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex flex-col h-full"
                >
                  <h3 className="font-newsreader text-4xl text-brass mb-8 pb-8 border-b border-white/10">{activeSpice.name}</h3>
                  
                  <div className="space-y-8 flex-1">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-light mb-2">Aroma</span>
                        <p className="font-sora text-sm">{activeSpice.aroma}</p>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-light mb-2">Flavour</span>
                        <p className="font-sora text-sm">{activeSpice.flavor}</p>
                      </div>
                    </div>

                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-light mb-2">Typical Role</span>
                      <p className="font-sora text-sm text-muted-light">{activeSpice.role}</p>
                    </div>

                    <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                       <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-light mb-2">Menu Usage</span>
                        <p className="font-sora text-sm">{activeSpice.menu}</p>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-light mb-2">Suggested Match</span>
                        <p className="font-sora text-sm">{activeSpice.pairing}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
