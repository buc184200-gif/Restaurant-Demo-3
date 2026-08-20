import React from 'react';

const formats = [
  {
    name: 'FAMILY TABLE',
    desc: 'Shared dishes and a generous hosted menu for medium groups.',
    guests: '6 to 10 guests',
    format: 'Family-style Sharing',
    duration: '2.5 Hours',
    space: 'Main Dining Room',
    price: 'From ₹3,500 pp'
  },
  {
    name: 'BIRTHDAY DINNER',
    desc: 'Custom menu, dedicated dessert course, and private-table options.',
    guests: '2 to 12 guests',
    format: 'À La Carte or Set',
    duration: 'Flexible',
    space: 'Dining Room / Private Room',
    price: 'From ₹4,500 pp'
  },
  {
    name: 'ENGAGEMENT SUPPER',
    desc: 'A composed multi-course menu for close family and friends to celebrate.',
    guests: 'Up to 12 guests',
    format: 'Tasting Journey',
    duration: '3 Hours',
    space: 'Private Room',
    price: 'From ₹6,500 pp'
  },
  {
    name: 'CORPORATE EVENING',
    desc: 'Private dining, hosted beverage service, and flexible menu formats for business.',
    guests: '8 to 20 guests',
    format: 'Custom Hosted Menu',
    duration: 'Full Evening',
    space: 'Private Room / Courtyard',
    price: 'From ₹8,000 pp'
  }
];

export default function Celebrations() {
  return (
    <section id="celebrations" className="py-32 md:py-48 bg-rice text-ink relative border-t border-border-light">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-20 text-center">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">11 / Gather at Raasa</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1] max-w-3xl mx-auto">
            SOME TABLES<br/>
            ARE MEANT TO<br/>
            BE SHARED.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {formats.map((format, i) => (
            <div key={i} className="flex flex-col h-full bg-white border border-border-light p-8 md:p-10 hover:shadow-lg transition-shadow duration-300">
              <div className="flex-1">
                <span className="font-mono text-[10px] text-muted-dark uppercase tracking-widest mb-4 block">0{i + 1}</span>
                <h3 className="font-newsreader text-2xl text-ink mb-4">{format.name}</h3>
                <p className="font-sora text-sm text-muted-dark mb-8 leading-relaxed">{format.desc}</p>
                
                <div className="space-y-4 pt-6 border-t border-border-light mb-8">
                  <Row label="Guest Range" value={format.guests} />
                  <Row label="Menu Format" value={format.format} />
                  <Row label="Space" value={format.space} />
                  <Row label="Duration" value={format.duration} />
                  <div>
                     <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">Starting Price</span>
                     <p className="font-mono text-sm text-ink">{format.price} <span className="text-[9px] text-muted-light">*fictional</span></p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  import('../lib/events').then(m => m.openReservation({ occasion: format.name }));
                }}
                className="w-full block py-4 text-center bg-ink text-light font-sora text-sm font-medium hover:bg-chilli transition-colors uppercase tracking-wider mt-auto"
              >
                Enquire
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-1">{label}</span>
      <p className="font-sora text-sm text-ink">{value}</p>
    </div>
  );
}
