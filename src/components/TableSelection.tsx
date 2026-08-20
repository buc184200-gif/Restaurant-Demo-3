import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { openReservation } from '../lib/events';

type Table = {
  id: string;
  number: number;
  area: string;
  capacity: string;
  atmosphere: string;
  menu: string;
  status: 'Available' | 'Limited' | 'Unavailable';
  cx?: number;
  cy?: number;
  r?: number;
  width?: number;
  height?: number;
  type: 'circle' | 'rect';
};

const tables: Table[] = [
  { id: 't1', number: 1, area: 'Window tables', capacity: '2 guests', atmosphere: 'Bright, intimate', menu: 'À La Carte / Tasting', status: 'Available', type: 'circle', cx: 15, cy: 20, r: 4 },
  { id: 't2', number: 2, area: 'Window tables', capacity: '2 guests', atmosphere: 'Bright, intimate', menu: 'À La Carte / Tasting', status: 'Available', type: 'circle', cx: 35, cy: 20, r: 4 },
  { id: 't3', number: 3, area: 'Main dining room', capacity: '4 guests', atmosphere: 'Lively, energetic', menu: 'À La Carte / Tasting', status: 'Unavailable', type: 'rect', cx: 25, cy: 50, width: 12, height: 12 },
  { id: 't4', number: 4, area: 'Main dining room', capacity: '6 guests', atmosphere: 'Lively, energetic', menu: 'À La Carte / Tasting', status: 'Available', type: 'rect', cx: 55, cy: 50, width: 16, height: 12 },
  { id: 't5', number: 5, area: 'Chef’s table', capacity: '8 guests (shared)', atmosphere: 'Theatrical, engaged', menu: 'Tasting Journey Only', status: 'Limited', type: 'rect', cx: 80, cy: 30, width: 8, height: 20 },
  { id: 't6', number: 6, area: 'Courtyard', capacity: '4 guests', atmosphere: 'Relaxed, ambient', menu: 'À La Carte / Shared', status: 'Available', type: 'circle', cx: 20, cy: 80, r: 6 },
  { id: 't7', number: 7, area: 'Private room', capacity: '12 guests', atmosphere: 'Exclusive, quiet', menu: 'Set Menu', status: 'Available', type: 'rect', cx: 75, cy: 80, width: 20, height: 12 },
];

export default function TableSelection() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelect = (table: Table) => {
    if (table.status !== 'Unavailable') {
      setSelectedTable(table);
    }
  };

  const getColor = (table: Table) => {
    if (table.status === 'Unavailable') return 'fill-border-dark stroke-border-dark opacity-30';
    if (selectedTable?.id === table.id) return 'fill-chilli stroke-chilli';
    if (table.status === 'Limited') return 'fill-turmeric/20 stroke-turmeric hover:fill-turmeric/50';
    return 'fill-white stroke-ink hover:fill-border-light';
  };

  return (
    <section className="py-32 md:py-48 bg-rice text-ink border-t border-border-light">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-20">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">12 / Choose Your Table</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            WHERE SHOULD<br/>
            WE SET YOUR<br/>
            EVENING?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            {!isMobile ? (
              <div className="border border-border-dark p-8 bg-white relative">
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-muted-dark">Floor Plan Demo</span>
                
                <div className="flex gap-4 absolute top-4 right-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-ink bg-white"></div><span className="font-mono text-[9px] uppercase">Available</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-turmeric bg-turmeric/20"></div><span className="font-mono text-[9px] uppercase">Limited</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-border-dark opacity-30"></div><span className="font-mono text-[9px] uppercase">Unavailable</span></div>
                </div>

                <svg viewBox="0 0 100 100" className="w-full h-auto mt-8">
                  {/* Background rooms */}
                  <rect x="5" y="5" width="40" height="30" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
                  <text x="7" y="10" fontSize="2" fill="#999" fontFamily="monospace">Window Tables</text>
                  
                  <rect x="5" y="35" width="60" height="35" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
                  <text x="7" y="40" fontSize="2" fill="#999" fontFamily="monospace">Main Dining</text>

                  <rect x="65" y="5" width="30" height="65" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
                  <text x="67" y="10" fontSize="2" fill="#999" fontFamily="monospace">Chef's Area</text>
                  <rect x="67" y="25" width="6" height="30" fill="#e5e5e5" />
                  <text x="68" y="42" fontSize="1.5" fill="#666" fontFamily="monospace" transform="rotate(-90 68,42)">KITCHEN</text>

                  <rect x="5" y="70" width="40" height="25" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
                  <text x="7" y="75" fontSize="2" fill="#999" fontFamily="monospace">Courtyard</text>

                  <rect x="45" y="70" width="50" height="25" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
                  <text x="47" y="75" fontSize="2" fill="#999" fontFamily="monospace">Private Room</text>

                  {/* Tables */}
                  {tables.map(table => (
                    <g 
                      key={table.id} 
                      onClick={() => handleSelect(table)}
                      className={cn("cursor-pointer transition-colors duration-300", table.status === 'Unavailable' ? 'cursor-not-allowed' : '')}
                    >
                      {table.type === 'circle' ? (
                        <circle cx={table.cx} cy={table.cy} r={table.r} className={getColor(table)} strokeWidth="0.5" />
                      ) : (
                        <rect x={(table.cx || 0) - (table.width || 0)/2} y={(table.cy || 0) - (table.height || 0)/2} width={table.width} height={table.height} className={getColor(table)} strokeWidth="0.5" rx="1" />
                      )}
                      <text 
                        x={table.cx} 
                        y={table.cy} 
                        dy=".3em" 
                        textAnchor="middle" 
                        fontSize="3" 
                        fontFamily="monospace"
                        className={cn(selectedTable?.id === table.id ? 'fill-white' : 'fill-ink')}
                      >
                        {table.number}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            ) : (
              <div className="space-y-4">
                {tables.map(table => (
                  <button
                    key={table.id}
                    onClick={() => handleSelect(table)}
                    disabled={table.status === 'Unavailable'}
                    className={cn(
                      "w-full text-left p-6 border flex justify-between items-center transition-colors duration-300",
                      selectedTable?.id === table.id 
                        ? "border-chilli bg-chilli text-white" 
                        : table.status === 'Unavailable'
                          ? "border-border-dark opacity-50 cursor-not-allowed"
                          : "border-border-dark hover:border-ink"
                    )}
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest opacity-80 block mb-1">Table {table.number}</span>
                      <h4 className="font-newsreader text-xl">{table.area}</h4>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] uppercase tracking-widest block">{table.status}</span>
                      <span className="font-sora text-sm opacity-80">{table.capacity}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 border border-border-dark bg-white p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
              
              {!selectedTable ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                   <h4 className="font-newsreader text-2xl mb-2">No Table Selected</h4>
                   <p className="font-sora text-sm">Select an available table from the floor plan.</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTable.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex-1"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-4 block">Selection Details</span>
                    <h3 className="font-newsreader text-4xl mb-8 border-b border-border-light pb-6">Table {selectedTable.number} <span className="text-muted-light block md:inline md:ml-4 text-2xl">{selectedTable.area}</span></h3>

                    <div className="space-y-6">
                      <DetailRow label="Capacity" value={selectedTable.capacity} />
                      <DetailRow label="Atmosphere" value={selectedTable.atmosphere} />
                      <DetailRow label="Menu Availability" value={selectedTable.menu} />
                      <DetailRow label="Status" value={selectedTable.status} />
                    </div>

                  </motion.div>
                </AnimatePresence>
              )}

              <div className="mt-12 pt-8 border-t border-border-light">
                 <button 
                  disabled={!selectedTable}
                  onClick={() => selectedTable && openReservation({ table: selectedTable.number.toString(), space: selectedTable.area })}
                  className="w-full py-4 bg-ink text-light font-sora text-sm font-medium hover:bg-chilli disabled:bg-border-dark disabled:text-muted-dark disabled:cursor-not-allowed transition-colors uppercase tracking-wider"
                >
                  Continue Reservation
                </button>
                <p className="text-center font-mono text-[9px] text-muted-light mt-4 uppercase tracking-widest">* Availability is fictional demo data</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">{label}</span>
      <p className="font-sora text-sm text-ink font-medium">{value}</p>
    </div>
  );
}
