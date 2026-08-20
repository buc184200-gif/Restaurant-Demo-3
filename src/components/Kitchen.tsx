import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function Kitchen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="kitchen" className="py-32 md:py-48 bg-limestone text-ink relative border-t border-border-light">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Editorial Content */}
          <div className="order-2 lg:order-1">
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">08 / The Kitchen</span>
            <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1] mb-12">
              TRADITION INFORMS.<br/>
              CURIOSITY LEADS.
            </h2>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-ink font-bold mb-2">CHEF AARAV SETHI</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-dark">Executive Chef & Co-Founder / 15 Years Exp.</p>
              </div>

              <p className="font-sora text-sm text-muted-dark leading-relaxed max-w-lg">
                Aarav’s cooking is shaped by family tables, regional journeys, and years spent in contemporary kitchens. At RAASA, he uses Indian ingredients and familiar techniques as the starting point for dishes that feel expressive, generous, and clear.
              </p>

              <blockquote className="font-newsreader text-2xl md:text-3xl italic text-ink border-l-2 border-chilli pl-6 py-2 my-8 max-w-xl">
                “A spice should never be present only to announce itself. It should change the whole shape of the dish.”
              </blockquote>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border-dark max-w-lg">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Ingredient Philosophy</span>
                  <p className="font-sora text-[11px] text-ink">Source locally, spice globally. Respect the primary ingredient.</p>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Fire Philosophy</span>
                  <p className="font-sora text-[11px] text-ink">Smoke is an ingredient, not just a cooking method.</p>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Spice Philosophy</span>
                  <p className="font-sora text-[11px] text-ink">Layering over volume. Balance over heat.</p>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Hospitality</span>
                  <p className="font-sora text-[11px] text-ink">Generous, warm, and distinctly Indian.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-ink text-light font-sora text-sm font-medium hover:bg-chilli transition-colors uppercase tracking-wider"
            >
              Meet the Raasa Team
            </button>
          </div>

          {/* Cinematic Portrait (Abstract/CSS) */}
          <div className="order-1 lg:order-2 h-[50vh] lg:h-[80vh] w-full bg-white border border-border-light relative overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-limestone via-transparent to-transparent opacity-80" />
            
            {/* Overlay Frame */}
            <div className="relative w-full h-full border border-ink/10 flex items-end p-6 z-10">
               <span className="font-mono text-[10px] uppercase tracking-widest text-ink bg-white/80 backdrop-blur-sm px-3 py-1">Aarav Sethi, Pass</span>
            </div>
          </div>

        </div>
      </div>

      {/* Team Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative bg-rice w-full max-w-4xl p-8 md:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-muted-dark hover:text-ink transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="font-newsreader text-4xl text-ink mb-12 border-b border-border-light pb-6">The Raasa Team</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <TeamMember role="Sous Chef" name="Priya Sharma" desc="Leading the pass and overseeing the tandoor station. Priya brings 8 years of fine dining experience and a deep knowledge of northern frontier cooking." />
                <TeamMember role="Pastry Chef" name="David Chen" desc="Translating classic Indian mithai into contemporary plated desserts, balancing sweetness with spice and acidity." />
                <TeamMember role="Beverage Director" name="Maya Patel" desc="Curating our wine list and botanical pairings, focusing on low-intervention wines that stand up to complex spices." />
                <TeamMember role="Restaurant Manager" name="James Wilson" desc="Ensuring the dining room flows seamlessly, bringing warm, intuitive hospitality to every table." />
              </div>

              <div className="text-center">
                 <p className="font-mono text-[10px] text-muted-dark uppercase tracking-widest">* Fictional portfolio profiles</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

function TeamMember({ role, name, desc }: { role: string, name: string, desc: string }) {
  return (
    <div>
      <span className="block font-mono text-[10px] uppercase tracking-widest text-chilli mb-2">{role}</span>
      <h4 className="font-newsreader text-2xl text-ink mb-3">{name}</h4>
      <p className="font-sora text-sm text-muted-dark leading-relaxed">{desc}</p>
    </div>
  );
}
