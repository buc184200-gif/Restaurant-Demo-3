import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'philosophy', 'menu', 'tasting', 'kitchen', 'spaces', 'celebrations', 'visit', 'reserve'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Menu', href: '#menu' },
    { name: 'Tasting Journey', href: '#tasting' },
    { name: 'Kitchen', href: '#kitchen' },
    { name: 'Spaces', href: '#spaces' },
    { name: 'Celebrations', href: '#celebrations' },
    { name: 'Visit', href: '#visit' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b bg-rice',
          scrolled ? 'py-4 border-border-light' : 'py-6 border-transparent'
        )}
      >
        <div className="px-6 w-full flex justify-between items-center max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-baseline lg:space-x-4">
            <a href="#home" className="text-2xl font-newsreader tracking-tight z-50 relative text-ink">
              RAASA
            </a>
            <span className="hidden lg:block font-mono text-[10px] uppercase tracking-widest text-muted-dark whitespace-nowrap">
              Contemporary Indian Dining
            </span>
          </div>

          <nav className="hidden xl:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[11px] font-mono uppercase tracking-widest transition-colors hover:text-chilli",
                  activeSection === link.href.substring(1) ? "text-chilli" : "text-ink"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-2 whitespace-nowrap">
              <div className="w-1.5 h-1.5 rounded-full bg-chilli animate-pulse shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dark">
                Dinner Service / Open
              </span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                import('../lib/events').then(m => m.openReservation());
              }}
              data-cursor-text="RESERVE"
              className="px-6 py-2.5 bg-ink text-light font-sora text-sm font-medium hover:bg-chilli transition-colors shrink-0 whitespace-nowrap"
            >
              Reserve a Table
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden z-[60] relative p-2 transition-colors duration-300"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} className="text-light" /> : <Menu size={24} className="text-ink" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-aubergine pt-32 px-6 flex flex-col overflow-y-auto"
          >
            <div className="container mx-auto max-w-5xl h-full flex flex-col justify-between pb-12">
              <nav className="flex flex-col space-y-6 md:space-y-8 mt-12">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-baseline"
                  >
                    <span className="font-mono text-xs text-chilli mr-6 w-6">0{i + 1}</span>
                    <span className="text-4xl md:text-6xl font-newsreader text-light group-hover:text-chilli transition-colors">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border-dark"
              >
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-light mb-4">Location</h4>
                  <p className="font-sora text-sm text-light leading-relaxed">
                    184 Marylebone Road<br />
                    London, NW1 5QA<br />
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-light mb-4">Contact</h4>
                  <p className="font-sora text-sm text-light leading-relaxed mb-2">+44 (0) 20 7123 4567</p>
                  <p className="font-sora text-sm text-light leading-relaxed">Dietary requirements accommodated with 48 hours notice.</p>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      import('../lib/events').then(m => m.openReservation());
                    }}
                    className="w-full text-center px-6 py-4 bg-chilli text-light font-sora text-sm font-medium hover:bg-light hover:text-chilli transition-colors"
                  >
                    Reserve a Table
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
