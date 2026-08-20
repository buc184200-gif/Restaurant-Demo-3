import React from 'react';

const notes = [
  {
    name: 'David',
    exp: 'Tasting Journey',
    month: 'October',
    quote: 'The menu felt recognisable and completely new at the same time.'
  },
  {
    name: 'Priya',
    exp: 'Chef’s Table',
    month: 'November',
    quote: 'The chef’s table made the kitchen feel open, generous, and personal.'
  },
  {
    name: 'Sarah',
    exp: 'À La Carte',
    month: 'December',
    quote: 'The tasting journey moved across flavours without becoming theatrical.'
  },
  {
    name: 'Michael',
    exp: 'Private Celebration',
    month: 'January',
    quote: 'We came for a birthday and stayed long after dessert.'
  }
];

export default function GuestNotes() {
  return (
    <section className="py-32 md:py-48 bg-[#f5f2eb] text-ink relative border-t border-border-light">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-32">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">14 / Guest Notes</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1] max-w-3xl">
            WHAT REMAINED<br/>
            AFTER THE<br/>
            LAST COURSE.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          {notes.map((note, i) => (
            <div key={i} className="flex flex-col border-l border-chilli/30 pl-8 relative">
              <span className="absolute -left-[3px] top-0 text-4xl font-newsreader text-chilli/20 leading-none">"</span>
              <p className="font-newsreader text-2xl md:text-3xl text-ink leading-snug mb-12 flex-1">
                {note.quote}
              </p>
              
              <div className="pt-8 border-t border-border-dark/20 mt-auto">
                <span className="block font-mono text-sm font-bold text-ink mb-1">{note.name}</span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">
                  {note.exp} / {note.month}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
           <p className="font-mono text-[9px] uppercase tracking-widest text-muted-light">* Guest notes are fictional demonstration content</p>
        </div>
      </div>
    </section>
  );
}
