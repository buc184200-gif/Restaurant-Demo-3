import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Heat = 'Gentle' | 'Warm' | 'Bold';
type Richness = 'Light' | 'Balanced' | 'Deep';
type Focus = 'Vegetarian' | 'Seafood' | 'Meat' | 'No preference';
type Style = 'Shared plates' | 'Tasting journey' | 'À la carte' | 'Celebration';
type Adventure = 'Familiar' | 'Curious' | 'Surprise me';

export default function FlavourCompass() {
  const [step, setStep] = useState(0);
  const [heat, setHeat] = useState<Heat>('Warm');
  const [richness, setRichness] = useState<Richness>('Balanced');
  const [focus, setFocus] = useState<Focus>('No preference');
  const [style, setStyle] = useState<Style>('Shared plates');
  const [adventure, setAdventure] = useState<Adventure>('Curious');

  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setShowResult(true);
  };

  const reset = () => {
    setStep(0);
    setShowResult(false);
  };

  const getRecommendation = () => {
    // Simple mock logic for demonstration
    let first = 'Tomato rasam, curry leaf oil';
    let main = 'Jackfruit, tamarind, pearl onion';
    let bread = 'Millet naan';
    let dessert = 'Jaggery caramel, cardamom milk';
    let drink = 'Curry-leaf tonic';
    let exp = 'À La Carte Exploration';
    let explanation = 'A balanced, vegetable-forward journey with warm spices and comforting textures.';

    if (focus === 'Meat') main = 'Lamb seekh, black cardamom';
    if (focus === 'Seafood') main = 'Seasonal fish, kokum, coconut';
    
    if (heat === 'Bold') {
      first = 'Fermented chilli kulcha';
      main = 'Wood-Fired Tiger Prawns (or Tandoor Cauliflower)';
    }

    if (style === 'Tasting journey') {
      exp = 'The Seven-Course Tasting Journey';
      explanation = 'Trust the kitchen. A full exploration of regional flavours curated for you.';
    }

    if (adventure === 'Surprise me') {
      drink = 'Indian botanical pairing flight';
      dessert = 'Dark chocolate, chilli, sesame';
    }

    return { first, main, bread, dessert, drink, exp, explanation };
  };

  const result = getRecommendation();

  return (
    <section className="py-32 md:py-48 bg-aubergine text-light relative overflow-hidden border-t border-border-dark">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-brass uppercase mb-6 block">06 / Find Your Raasa</span>
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            WHAT SHOULD<br/>
            YOUR EVENING<br/>
            TASTE LIKE?
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm min-h-[450px] flex flex-col">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                {/* Progress */}
                <div className="flex justify-between items-center mb-12">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-light">
                    Step {step + 1} of 5
                  </span>
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className={cn("h-1 w-8 transition-colors duration-300", i <= step ? "bg-brass" : "bg-white/20")} />
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  {step === 0 && (
                    <QuestionBlock 
                      title="Preferred Heat Level" 
                      options={['Gentle', 'Warm', 'Bold']} 
                      selected={heat} 
                      onChange={(v) => setHeat(v as Heat)} 
                    />
                  )}
                  {step === 1 && (
                    <QuestionBlock 
                      title="Flavour Profile" 
                      options={['Light', 'Balanced', 'Deep']} 
                      selected={richness} 
                      onChange={(v) => setRichness(v as Richness)} 
                    />
                  )}
                  {step === 2 && (
                    <QuestionBlock 
                      title="Primary Focus" 
                      options={['Vegetarian', 'Seafood', 'Meat', 'No preference']} 
                      selected={focus} 
                      onChange={(v) => setFocus(v as Focus)} 
                    />
                  )}
                  {step === 3 && (
                    <QuestionBlock 
                      title="Dining Style" 
                      options={['Shared plates', 'Tasting journey', 'À la carte', 'Celebration']} 
                      selected={style} 
                      onChange={(v) => setStyle(v as Style)} 
                    />
                  )}
                  {step === 4 && (
                    <QuestionBlock 
                      title="Adventure Level" 
                      options={['Familiar', 'Curious', 'Surprise me']} 
                      selected={adventure} 
                      onChange={(v) => setAdventure(v as Adventure)} 
                    />
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                  <button 
                    onClick={() => step > 0 && setStep(step - 1)}
                    className={cn("font-mono text-xs uppercase tracking-widest transition-opacity", step === 0 ? "opacity-0 pointer-events-none" : "opacity-100 hover:text-brass")}
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="px-8 py-3 bg-brass text-ink font-sora text-sm font-medium hover:bg-white transition-colors"
                  >
                    {step === 4 ? 'Reveal Journey' : 'Next'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 flex flex-col text-center items-center justify-center"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-brass mb-4 block">Your Raasa Journey</span>
                <h3 className="font-newsreader text-3xl md:text-4xl text-light mb-4">{result.exp}</h3>
                <p className="font-sora text-sm text-muted-light max-w-md mx-auto mb-12">{result.explanation}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left w-full max-w-2xl mx-auto mb-12">
                  <ResultItem label="First Plate" value={result.first} />
                  <ResultItem label="Main Course" value={result.main} />
                  <ResultItem label="Bread / Grain" value={result.bread} />
                  <ResultItem label="Drink" value={result.drink} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      import('../lib/events').then(m => m.openReservation({ menu: result.exp, firstPlate: result.first, mainPlate: result.main }));
                    }}
                    className="px-8 py-4 bg-brass text-ink font-sora text-sm font-medium hover:bg-white transition-colors uppercase tracking-wider"
                  >
                    Add to Reservation
                  </button>
                  <button 
                    onClick={reset}
                    className="px-8 py-4 bg-transparent border border-white/20 text-light font-sora text-sm font-medium hover:bg-white/5 transition-colors uppercase tracking-wider"
                  >
                    Try Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] font-newsreader text-[20vw] leading-none pointer-events-none select-none text-center w-full whitespace-nowrap">
        COMPASS
      </div>
    </section>
  );
}

function QuestionBlock({ title, options, selected, onChange }: { title: string, options: string[], selected: string, onChange: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-newsreader text-2xl md:text-3xl text-light mb-8">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "px-6 py-3 border rounded-full font-sora text-sm transition-all duration-300",
              selected === opt 
                ? "border-brass bg-brass text-ink" 
                : "border-white/20 text-muted-light hover:border-white/50"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="border-b border-white/10 pb-4">
      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-light mb-2">{label}</span>
      <p className="font-newsreader text-xl text-light">{value}</p>
    </div>
  );
}
