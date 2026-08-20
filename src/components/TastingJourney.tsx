import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ChevronDown } from 'lucide-react';

const courses = [
  {
    id: '01',
    name: 'FIRST AROMA',
    dish: 'Tomato rasam, curry leaf oil, toasted cumin.',
    ingredients: 'Heirloom tomatoes, fresh curry leaves, cumin seeds.',
    technique: 'Slow-simmering and tempering.',
    inspiration: 'Southern Coast',
    pairing: 'Clarified Tomato Water',
    color: 'bg-chilli'
  },
  {
    id: '02',
    name: 'FIELD',
    dish: 'Charred baby corn, green chilli, cultured cream, millet crisp.',
    ingredients: 'Baby corn, green chillies, cultured cream, pearl millet.',
    technique: 'Open fire charring.',
    inspiration: 'Central Plains',
    pairing: 'Dry Chenin Blanc',
    color: 'bg-brass'
  },
  {
    id: '03',
    name: 'COAST',
    dish: 'Raw mango, coconut, kokum, seasonal seafood or palm-heart alternative.',
    ingredients: 'Raw mango, fresh coconut, kokum extract, seasonal catch.',
    technique: 'Acid curing and gentle poaching.',
    inspiration: 'Konkan Coast',
    pairing: 'Kokum Gimlet',
    color: 'bg-curry'
  },
  {
    id: '04',
    name: 'GRAIN',
    dish: 'Smoked rice, wild mushroom, black cardamom, ghee.',
    ingredients: 'Aged basmati, wild mushrooms, black cardamom, cultured ghee.',
    technique: 'Dhum (sealed cooking) and smoking.',
    inspiration: 'Northern Valleys',
    pairing: 'Aged Syrah',
    color: 'bg-aubergine-light'
  },
  {
    id: '05',
    name: 'FIRE',
    dish: 'Tandoor-roasted chicken or cauliflower, mustard, fenugreek, charred onion.',
    ingredients: 'Mustard oil, kasuri methi, charred onions.',
    technique: 'High-heat Tandoor roasting.',
    inspiration: 'North West Frontier',
    pairing: 'Smoked Cardamom Old Fashioned',
    color: 'bg-chilli'
  },
  {
    id: '06',
    name: 'SLOW HEAT',
    dish: 'Lamb or jackfruit, tamarind glaze, pearl millet bread.',
    ingredients: 'Tamarind, pearl millet, slow-braised proteins.',
    technique: 'Slow braising.',
    inspiration: 'Deccan Plateau',
    pairing: 'Skin-contact Orange Wine',
    color: 'bg-tamarind'
  },
  {
    id: '07',
    name: 'MEMORY',
    dish: 'Jaggery caramel, cardamom milk, sesame praline, saffron.',
    ingredients: 'Palm jaggery, green cardamom, sesame seeds, saffron threads.',
    technique: 'Caramelisation and infusion.',
    inspiration: 'Eastern Sweets',
    pairing: 'Spiced Dessert Wine',
    color: 'bg-turmeric'
  }
];

export default function TastingJourney() {
  const [activeCourse, setActiveCourse] = useState(courses[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(courses[0].id);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeData = courses.find(c => c.id === activeCourse) || courses[0];

  return (
    <section id="tasting" className="py-32 md:py-48 bg-limestone text-ink relative">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-20">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">04 / Tasting Journey</span>
          <h2 className="section-headline mb-8 font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            SEVEN COURSES.<br/>
            MANY MEMORIES.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-dark border-t border-b border-border-dark py-6 max-w-3xl">
            <div>
              <span className="block mb-1">Tasting Journey</span>
              <span className="text-ink font-sora text-sm">₹4,500 <span className="text-muted-dark text-[10px] lowercase">*fictional demo price</span></span>
            </div>
            <div>
              <span className="block mb-1">Vegetarian Journey</span>
              <span className="text-ink font-sora text-sm">₹4,100 <span className="text-muted-dark text-[10px] lowercase">*fictional demo price</span></span>
            </div>
            <div>
              <span className="block mb-1">Optional Pairing</span>
              <span className="text-ink font-sora text-sm">₹2,200 <span className="text-muted-dark text-[10px] lowercase">*fictional demo price</span></span>
            </div>
          </div>
        </div>

        {isMobile ? (
          <div className="space-y-4 mb-16">
            {courses.map((course) => (
              <div key={course.id} className="border-b border-border-dark pb-4">
                <button 
                  onClick={() => setExpandedId(expandedId === course.id ? null : course.id)}
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  aria-expanded={expandedId === course.id}
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="font-mono text-xs text-chilli">{course.id}</span>
                    <h3 className="font-newsreader text-2xl text-ink">{course.name}</h3>
                  </div>
                  <ChevronDown className={cn("transition-transform duration-300", expandedId === course.id ? "rotate-180" : "rotate-0")} size={20} />
                </button>
                
                <AnimatePresence>
                  {expandedId === course.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-6 space-y-6 pl-8">
                        <p className="font-newsreader text-xl leading-relaxed text-ink">{course.dish}</p>
                        
                        <div className="space-y-4 pt-4 border-t border-border-dark/30">
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Ingredients</span>
                            <p className="font-sora text-sm">{course.ingredients}</p>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Technique</span>
                            <p className="font-sora text-sm">{course.technique}</p>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Regional Inspiration</span>
                            <p className="font-sora text-sm text-muted-dark">{course.inspiration}</p>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Suggested Pairing</span>
                            <p className="font-sora text-sm text-chilli">{course.pairing}</p>
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
          <div className="grid grid-cols-12 gap-16 relative mb-16">
            <div className="col-span-5 flex flex-col space-y-2 relative z-10">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setActiveCourse(course.id)}
                  data-cursor-text="VIEW"
                  className={cn(
                    "text-left py-6 border-b transition-all duration-300 w-full group flex items-baseline space-x-6",
                    activeCourse === course.id ? "border-chilli pl-8" : "border-border-dark hover:border-ink hover:pl-4"
                  )}
                >
                  <span className={cn(
                    "font-mono text-xs transition-colors duration-300",
                    activeCourse === course.id ? "text-chilli" : "text-muted-dark"
                  )}>{course.id}</span>
                  <h3 className={cn(
                    "font-newsreader text-3xl transition-colors duration-300",
                    activeCourse === course.id ? "text-chilli" : "text-muted-dark group-hover:text-ink"
                  )}>
                    {course.name}
                  </h3>
                </button>
              ))}
            </div>

            <div className="col-span-7 relative h-auto">
              <div className="sticky top-40 w-full bg-white border border-border-light p-12 overflow-hidden shadow-sm h-[600px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none"
                  >
                     <div className={cn("w-[120%] h-[120%] rounded-full blur-[100px]", activeData.color)} />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative z-10 flex flex-col h-full"
                  >
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-4">Course {activeData.id}</span>
                      <p className="font-newsreader text-4xl leading-tight text-ink mb-12 max-w-xl">{activeData.dish}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mt-auto">
                      <div className="space-y-8">
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Ingredients</span>
                          <p className="font-sora text-sm">{activeData.ingredients}</p>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Technique</span>
                          <p className="font-sora text-sm">{activeData.technique}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-8 border-l border-border-dark/20 pl-12">
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Regional Inspiration</span>
                          <p className="font-sora text-sm text-muted-dark">{activeData.inspiration}</p>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Suggested Pairing</span>
                          <p className="font-sora text-sm font-medium text-chilli">{activeData.pairing}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center md:justify-start">
          <button 
              onClick={(e) => {
                e.preventDefault();
                import('../lib/events').then(m => m.openReservation({ menu: 'Tasting Journey' }));
              }}
              data-cursor-text="RESERVE"
              className="px-8 py-4 bg-ink text-light font-sora text-sm font-medium hover:bg-chilli transition-colors duration-300 text-center uppercase tracking-wider"
            >
              Reserve the Tasting Journey
            </button>
        </div>
      </div>
    </section>
  );
}
