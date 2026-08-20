import React from 'react';

export default function Visit() {
  return (
    <section id="visit" className="py-32 md:py-48 bg-white text-ink border-t border-border-light">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-24 text-center">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">15 / Visit Raasa</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1] max-w-3xl mx-auto">
            COME HUNGRY.<br/>
            LEAVE WITH<br/>
            A NEW MEMORY.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Opening Hours */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-8 border-b border-border-light pb-4">Opening Hours</h3>
            <div className="space-y-6 font-sora text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Tuesday–Thursday</span>
                <span className="text-muted-dark">5:30 PM–11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Friday–Saturday</span>
                <span className="text-muted-dark">5:30 PM–11:30 PM</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium">Sunday</span>
                <div className="text-right text-muted-dark space-y-1">
                  <span className="block">12:30 PM–3:30 PM</span>
                  <span className="block">5:30 PM–10:30 PM</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-chilli">Monday</span>
                <span className="text-chilli">Closed</span>
              </div>
            </div>
          </div>

          {/* Location & Dining Info */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-8 border-b border-border-light pb-4">Location</h3>
            <div className="font-sora text-sm mb-12">
              <span className="block font-medium mb-1">RAASA</span>
              <span className="block text-muted-dark">Contemporary Indian Dining</span>
              <span className="block text-muted-dark">South Delhi</span>
            </div>

            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-8 border-b border-border-light pb-4">Dining Information</h3>
            <ul className="space-y-4 font-sora text-sm text-muted-dark list-disc pl-4">
              <li>Smart casual attire</li>
              <li>Vegetarian tasting journey available</li>
              <li>Allergy and dietary requirements should be shared during booking</li>
              <li>Guests aged 10 and above are welcome during dinner service</li>
              <li>Reservations may be changed up to 24 hours in advance</li>
              <li>Valet and nearby parking available</li>
            </ul>
          </div>

          {/* Contact & Actions */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-8 border-b border-border-light pb-4">Contact</h3>
            
            <div className="space-y-4 mb-16 font-sora text-sm">
              <a href="tel:+919876543210" className="flex justify-between group">
                <span className="font-medium group-hover:text-chilli transition-colors">Phone</span>
                <span className="text-muted-dark group-hover:text-chilli transition-colors">+91 98765 43210</span>
              </a>
              <a href="mailto:reservations@raasa.in" className="flex justify-between group">
                <span className="font-medium group-hover:text-chilli transition-colors">Email</span>
                <span className="text-muted-dark group-hover:text-chilli transition-colors">reservations@raasa.in</span>
              </a>
              <a href="https://wa.me/919876543210?text=Hi,%20I%20would%20like%20to%20reserve%20a%20table%20at%20RAASA." target="_blank" rel="noreferrer" className="flex justify-between group">
                <span className="font-medium group-hover:text-chilli transition-colors">WhatsApp</span>
                <span className="text-muted-dark group-hover:text-chilli transition-colors">Message Us</span>
              </a>
            </div>

            <div className="space-y-4">
              <a 
                href="#"
                className="w-full block py-4 text-center border border-border-dark text-ink font-sora text-sm font-medium hover:bg-ink hover:text-white transition-colors uppercase tracking-wider"
              >
                Get Directions
              </a>
              <button 
                onClick={(e) => { e.preventDefault(); import('../lib/events').then(m => m.openReservation()); }}
                className="w-full block py-4 text-center bg-chilli text-white font-sora text-sm font-medium hover:bg-ink transition-colors uppercase tracking-wider"
              >
                Reserve a Table
              </button>
            </div>
            
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-light mt-8 text-center">
              * All information is fictional demonstration content
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
