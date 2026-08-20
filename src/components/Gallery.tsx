import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SafeImage from './SafeImage';

const images = [
  { id: '1', src: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1600&auto=format&fit=crop', caption: 'Brass Thali Details' },
  { id: '2', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop', caption: 'The Courtyard at dusk' },
  { id: '3', src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1600&auto=format&fit=crop', caption: 'Contemporary plated dessert' },
  { id: '4', src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop', caption: 'Chef’s table preparations' },
  { id: '5', src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop', caption: 'Tandoor roasted cauliflower' },
  { id: '6', src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1600&auto=format&fit=crop', caption: 'Dining room atmosphere' }
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setSelectedIndex(i => i !== null ? (i + 1) % images.length : null); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setSelectedIndex(i => i !== null ? (i - 1 + images.length) % images.length : null); };

  return (
    <section className="py-32 md:py-48 bg-limestone text-ink border-t border-border-light relative">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-24 md:w-2/3">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">13 / An Evening At Raasa</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            FIRE.<br/>
            COLOUR.<br/>
            CONVERSATION.
          </h2>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
           <div className="md:col-span-7" onClick={() => openModal(0)}>
             <div className="aspect-[4/3] w-full cursor-pointer overflow-hidden relative group" data-cursor-text="VIEW">
               <SafeImage src={images[0].src} alt={images[0].caption} className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
             </div>
           </div>
           
           <div className="md:col-span-4 md:col-start-9 space-y-8 md:space-y-32">
              <div className="aspect-square w-full cursor-pointer overflow-hidden relative group md:mt-32" data-cursor-text="VIEW" onClick={() => openModal(1)}>
                 <SafeImage src={images[1].src} alt={images[1].caption} className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="aspect-[3/4] w-full cursor-pointer overflow-hidden relative group" data-cursor-text="VIEW" onClick={() => openModal(2)}>
                 <SafeImage src={images[2].src} alt={images[2].caption} className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
           </div>

           <div className="md:col-span-5 md:col-start-2" onClick={() => openModal(3)}>
             <div className="aspect-[4/5] w-full cursor-pointer overflow-hidden relative group" data-cursor-text="VIEW">
               <SafeImage src={images[3].src} alt={images[3].caption} className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
             </div>
           </div>

           <div className="md:col-span-8 md:col-start-4 mt-8 md:mt-[-100px] z-10" onClick={() => openModal(4)}>
             <div className="aspect-[16/9] w-full cursor-pointer overflow-hidden relative group shadow-2xl" data-cursor-text="VIEW">
               <SafeImage src={images[4].src} alt={images[4].caption} className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
             </div>
           </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a]" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              onClick={closeModal}
            />

            <div className="relative z-10 flex justify-between items-center p-6 md:p-8 text-white pointer-events-none">
              <span className="font-mono text-xs uppercase tracking-widest">{selectedIndex + 1} / {images.length}</span>
              <button onClick={closeModal} className="pointer-events-auto hover:text-brass transition-colors"><X size={32} strokeWidth={1} /></button>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-6 md:p-12 pointer-events-none">
               <button onClick={prev} className="absolute left-6 md:left-12 pointer-events-auto text-white/50 hover:text-white transition-colors">
                 <ChevronLeft size={48} strokeWidth={1} />
               </button>

               <motion.div 
                 key={selectedIndex}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.4 }}
                 className="w-full max-w-6xl h-full flex items-center justify-center pointer-events-auto"
                 onClick={(e) => e.stopPropagation()}
               >
                 <img src={images[selectedIndex].src} alt={images[selectedIndex].caption} className="max-w-full max-h-full object-contain" />
               </motion.div>

               <button onClick={next} className="absolute right-6 md:right-12 pointer-events-auto text-white/50 hover:text-white transition-colors">
                 <ChevronRight size={48} strokeWidth={1} />
               </button>
            </div>

            <div className="relative z-10 p-6 md:p-8 text-center text-white/70 pointer-events-none">
               <p className="font-sora text-sm">{images[selectedIndex].caption}</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
