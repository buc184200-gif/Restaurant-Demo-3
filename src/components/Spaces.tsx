import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const rooms = [
  {
    id: 'dining',
    name: 'THE DINING ROOM',
    desc: 'Warm contemporary dining with full à la carte and tasting menus. A lively, open space surrounding the main kitchen.',
    capacity: 'Up to 60 guests',
    menu: 'À La Carte / Tasting',
    atmosphere: 'Lively, warm, energetic',
    bestFor: 'Dinners, small groups, everyday celebrations',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'chefs-table',
    name: 'THE CHEF’S TABLE',
    desc: 'Eight seats positioned directly facing the kitchen pass. Includes a fully guided and interactive tasting journey with the chefs.',
    capacity: '8 seats exactly',
    menu: 'Exclusive Chef’s Tasting Only',
    atmosphere: 'Intimate, theatrical, engaging',
    bestFor: 'Culinary enthusiasts, special occasions',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'courtyard',
    name: 'THE COURTYARD',
    desc: 'Open-air dining under low ambient light and surrounded by native planting. Relaxed seating for shared plates.',
    capacity: 'Up to 40 guests',
    menu: 'À La Carte / Shared Plates',
    atmosphere: 'Relaxed, ambient, botanical',
    bestFor: 'Summer evenings, casual dinners, drinks',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'private',
    name: 'THE PRIVATE ROOM',
    desc: 'A discrete twelve-seat room for private celebrations, business dinners, and hosted set menus away from the main floor.',
    capacity: '8 to 12 guests',
    menu: 'Pre-selected Set Menus',
    atmosphere: 'Private, exclusive, quiet',
    bestFor: 'Corporate dinners, private celebrations',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2000&auto=format&fit=crop'
  }
];

export default function Spaces() {
  const [activeRoom, setActiveRoom] = useState(rooms[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeData = rooms.find(r => r.id === activeRoom) || rooms[0];

  return (
    <section id="spaces" ref={containerRef} className="py-32 md:py-48 bg-[#0a0a0a] text-light relative border-t border-white/10">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-20">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-brass uppercase mb-6 block">10 / The Rooms</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            CHOOSE HOW<br/>
            THE EVENING<br/>
            UNFOLDS.
          </h2>
        </div>

        {isMobile ? (
          <div className="space-y-24">
            {rooms.map(room => (
              <div key={room.id} className="flex flex-col">
                <div className="aspect-[4/3] w-full mb-8 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover grayscale brightness-75" />
                </div>
                <h3 className="font-newsreader text-3xl mb-4 text-white">{room.name}</h3>
                <p className="font-sora text-sm text-muted-light mb-8">{room.desc}</p>
                
                <div className="space-y-4 pt-4 border-t border-white/10 mb-8">
                  <DetailRow label="Capacity" value={room.capacity} />
                  <DetailRow label="Menu" value={room.menu} />
                  <DetailRow label="Atmosphere" value={room.atmosphere} />
                  <DetailRow label="Best For" value={room.bestFor} />
                </div>

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    import('../lib/events').then(m => m.openReservation({ space: room.name }));
                  }}
                  className="w-full py-4 border border-white/20 text-center font-sora text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  Reserve this space
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-16 relative">
            
            {/* Nav Column */}
            <div className="col-span-4 flex flex-col space-y-4 relative z-10">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  data-cursor-text="VIEW"
                  className={cn(
                    "text-left py-6 border-b transition-all duration-300 w-full group",
                    activeRoom === room.id ? "border-brass pl-8" : "border-white/10 hover:border-white/50 hover:pl-4"
                  )}
                >
                  <h3 className={cn(
                    "font-newsreader text-3xl transition-colors duration-300",
                    activeRoom === room.id ? "text-brass" : "text-muted-light group-hover:text-white"
                  )}>
                    {room.name}
                  </h3>
                </button>
              ))}
            </div>

            {/* Media & Details Stage */}
            <div className="col-span-8 h-[700px] sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full flex flex-col absolute inset-0"
                >
                  {/* Image Container */}
                  <div className="w-full h-[400px] overflow-hidden relative mb-12">
                     <motion.div 
                       initial={{ scale: 1.1 }}
                       animate={{ scale: 1 }}
                       transition={{ duration: 1.5, ease: 'easeOut' }}
                       className="absolute inset-0"
                     >
                       <img src={activeData.image} alt={activeData.name} className="w-full h-full object-cover grayscale brightness-50" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                     </motion.div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-12 flex-1">
                    <div>
                       <h4 className="font-newsreader text-2xl text-white mb-4">Space Details</h4>
                       <p className="font-sora text-sm text-muted-light leading-relaxed mb-8 max-w-sm">{activeData.desc}</p>
                       <button 
                         onClick={(e) => {
                           e.preventDefault();
                           import('../lib/events').then(m => m.openReservation({ space: activeData.name }));
                         }}
                         className="inline-block px-8 py-4 border border-white/20 font-sora text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                       >
                        Reserve this space
                      </button>
                    </div>
                    
                    <div className="space-y-6 pt-2 border-l border-white/10 pl-12">
                      <DetailRow label="Capacity" value={activeData.capacity} />
                      <DetailRow label="Menu" value={activeData.menu} />
                      <DetailRow label="Atmosphere" value={activeData.atmosphere} />
                      <DetailRow label="Best For" value={activeData.bestFor} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-light mb-1">{label}</span>
      <p className="font-sora text-sm text-white">{value}</p>
    </div>
  );
}
