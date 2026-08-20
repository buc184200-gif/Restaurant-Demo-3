import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-aubergine text-light pt-20 pb-10 border-t border-border-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-newsreader text-4xl mb-6 text-brass">RAASA</h2>
            <p className="font-sora text-sm text-muted-light max-w-xs">
              Contemporary Indian Dining.<br />
              Regional ingredients, open-fire cooking, and expressive tasting menus.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-light mb-6">Location</h4>
            <address className="not-italic font-sora text-sm text-light leading-relaxed">
              184 Marylebone Road<br />
              London, NW1 5QA<br />
              United Kingdom
            </address>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-light mb-6">Hours</h4>
            <ul className="font-sora text-sm text-light space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-light">Tue - Sat</span>
                <span>18:00 - 23:30</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-light">Sun - Mon</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-dark font-mono text-xs text-muted-light uppercase tracking-wider">
          <p>© {new Date().getFullYear()} RAASA. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brass transition-colors">Instagram</a>
            <a href="#" className="hover:text-brass transition-colors">Press</a>
            <a href="#" className="hover:text-brass transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
