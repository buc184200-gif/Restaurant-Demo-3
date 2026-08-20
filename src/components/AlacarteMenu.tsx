import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ChevronDown, X } from 'lucide-react';

const categories = [
  'Small Plates',
  'From the Tandoor',
  'Grains & Breads',
  'From the Coast',
  'Vegetables',
  'Desserts',
  'Drinks'
];

const dishes = [
  { category: 'Small Plates', name: 'Tomato rasam, curry leaf oil', price: '₹520', diet: ['V', 'GF'], desc: 'Clear heirloom tomato broth tempered with mustard seeds and curry leaf oil. Served with a crisp lentil papad.', region: 'South', pairing: 'Clarified Tomato Water' },
  { category: 'Small Plates', name: 'Charred corn, cultured cream, millet', price: '₹680', diet: ['V'], desc: 'Baby corn charred over open fire, served with house-cultured cream and toasted pearl millet.', region: 'Central', pairing: 'Dry Chenin Blanc' },
  { category: 'Small Plates', name: 'Beetroot kebab, smoked yoghurt, walnut', price: '₹720', diet: ['V', 'N'], desc: 'Earthy beetroot patties with a core of smoked yoghurt, crusted with toasted walnuts.', region: 'North', pairing: 'Pinot Noir' },
  
  { category: 'From the Tandoor', name: 'Mustard chicken, fenugreek, charred onion', price: '₹1,350', diet: ['GF'], desc: 'Free-range chicken marinated in pungent mustard oil and dried fenugreek leaves, roasted in the tandoor.', region: 'North', pairing: 'Aged Syrah' },
  { category: 'From the Tandoor', name: 'Tandoor cauliflower, sesame, green chilli', price: '₹1,050', diet: ['V', 'GF'], desc: 'Whole cauliflower floret slow-roasted with a sesame and green chilli paste.', region: 'Frontier', pairing: 'Skin-contact Orange Wine' },
  { category: 'From the Tandoor', name: 'Lamb seekh, black cardamom, mint', price: '₹1,480', diet: ['GF'], desc: 'Hand-minced lamb spiced with smoky black cardamom, served with fresh mint chutney.', region: 'North', pairing: 'Smoked Cardamom Old Fashioned' },
  
  { category: 'Grains & Breads', name: 'Wild mushroom khichdi, ghee, fried garlic', price: '₹980', diet: ['V', 'GF'], desc: 'Comforting aged basmati and lentil porridge with wild foraged mushrooms and cultured ghee.', region: 'West', pairing: 'Chardonnay' },
  { category: 'Grains & Breads', name: 'Millet naan, cultured butter', price: '₹280', diet: ['V'], desc: 'Hand-stretched flatbread made with a blend of wheat and pearl millet, finished with cultured butter.', region: 'North', pairing: 'None' },
  { category: 'Grains & Breads', name: 'Fermented chilli kulcha', price: '₹320', diet: ['V'], desc: 'Stuffed bread with a sharp, tangy fermented green chilli paste.', region: 'North', pairing: 'None' },
  
  { category: 'From the Coast', name: 'Seasonal fish, kokum, coconut, curry leaf', price: '₹1,650', diet: ['GF'], desc: 'Day-boat catch simmered in a light coconut broth soured with kokum.', region: 'Konkan', pairing: 'Kokum Gimlet' },
  { category: 'From the Coast', name: 'Prawn, tamarind, roasted chilli', price: '₹1,520', diet: ['GF'], desc: 'Tiger prawns tossed in a dark, sticky tamarind and roasted dry chilli glaze.', region: 'South', pairing: 'Riesling' },
  { category: 'From the Coast', name: 'Palm heart, coconut, mustard seed', price: '₹1,100', diet: ['VG', 'GF'], desc: 'Tender palm hearts in a delicate coconut milk sauce tempered with mustard seeds.', region: 'East', pairing: 'Sauvignon Blanc' },
  
  { category: 'Vegetables', name: 'Smoked aubergine, peanut, sesame', price: '₹920', diet: ['VG', 'GF', 'N'], desc: 'Charcoal-smoked aubergine mashed with crushed peanuts and toasted sesame.', region: 'Deccan', pairing: 'Amber Ale' },
  { category: 'Vegetables', name: 'Jackfruit, tamarind, pearl onion', price: '₹1,080', diet: ['VG', 'GF'], desc: 'Young jackfruit braised slowly with tamarind extract and whole pearl onions.', region: 'South', pairing: 'Merlot' },
  
  { category: 'Desserts', name: 'Jaggery caramel, cardamom milk', price: '₹680', diet: ['V', 'GF'], desc: 'A rich caramel made from palm jaggery, served over cold cardamom-infused milk pudding.', region: 'East', pairing: 'Spiced Dessert Wine' },
  { category: 'Desserts', name: 'Dark chocolate, chilli, sesame', price: '₹720', diet: ['V', 'GF'], desc: 'Single-origin dark chocolate ganache spiked with mild chilli and toasted sesame praline.', region: 'Contemporary', pairing: 'Aged Rum' },
  { category: 'Desserts', name: 'Mango, yoghurt, saffron', price: '₹650', diet: ['V', 'GF'], desc: 'Seasonal mango textures with hung yoghurt and saffron threads.', region: 'West', pairing: 'Late Harvest Riesling' },
  
  { category: 'Drinks', name: 'Kokum spritz', price: '₹420', diet: ['VG', 'GF'], desc: 'Refreshing spritz with sour kokum syrup, soda, and a hint of roasted cumin.', region: 'Konkan', pairing: 'None' },
  { category: 'Drinks', name: 'Curry-leaf tonic', price: '₹380', diet: ['VG', 'GF'], desc: 'House-made tonic water infused with fresh curry leaves and lime.', region: 'South', pairing: 'None' },
  { category: 'Drinks', name: 'Indian botanical pairing', price: '₹2,200', diet: ['V', 'GF'], desc: 'A curated flight of Indian craft spirits and botanical infusions.', region: 'Various', pairing: 'None' },
];

export default function AlacarteMenu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedDish, setSelectedDish] = useState<typeof dishes[0] | null>(null);

  const filteredDishes = dishes.filter(d => d.category === activeCategory);

  return (
    <section className="py-32 md:py-48 bg-rice text-ink relative border-t border-border-light">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="mb-20">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-chilli uppercase mb-6 block">05 / À La Carte</span>
          <h2 className="section-headline mb-8 font-newsreader text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
            CHOOSE YOUR<br/>
            OWN JOURNEY.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 space-x-6 lg:space-x-0 lg:space-y-4 border-b lg:border-b-0 border-border-light lg:sticky lg:top-32 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap font-mono text-[10px] md:text-xs uppercase tracking-widest text-left py-2 border-b lg:border-b-0 lg:border-l-2 transition-colors duration-300",
                    activeCategory === cat 
                      ? "border-chilli text-chilli lg:pl-4" 
                      : "border-transparent lg:border-border-light text-muted-dark hover:text-ink lg:hover:border-ink lg:pl-4"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes List */}
          <div className="lg:w-3/4">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="border-t border-border-dark">
                    {filteredDishes.map((dish, i) => (
                      <div key={i} className="py-8 border-b border-border-light group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1 max-w-2xl">
                          <div className="flex items-baseline flex-wrap gap-x-4 gap-y-2 mb-2">
                            <h3 className="font-newsreader text-2xl md:text-3xl text-ink">{dish.name}</h3>
                            <div className="flex space-x-2">
                               {dish.diet.map(d => (
                                 <span key={d} className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-border-dark text-muted-dark rounded-sm">
                                   {d}
                                 </span>
                               ))}
                            </div>
                          </div>
                          <p className="font-sora text-sm text-muted-dark leading-relaxed">{dish.desc}</p>
                        </div>
                        
                        <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-end">
                          <div className="font-mono text-sm">{dish.price}</div>
                          <button 
                            onClick={() => setSelectedDish(dish)}
                            className="px-6 py-3 bg-transparent border border-border-dark text-ink font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-white transition-colors duration-300 whitespace-nowrap"
                          >
                            View Dish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dish Modal */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-rice w-full max-w-2xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-6 right-6 text-muted-dark hover:text-ink transition-colors"
                aria-label="Close dish details"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-4 block">
                  {selectedDish.category}
                </span>
                <h3 className="font-newsreader text-4xl md:text-5xl text-ink mb-6 pr-8">
                  {selectedDish.name}
                </h3>
                <div className="flex space-x-2 mb-8">
                   {selectedDish.diet.map(d => (
                     <span key={d} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-border-dark text-ink rounded-sm">
                       {d}
                     </span>
                   ))}
                </div>
                <p className="font-sora text-base text-muted-dark leading-relaxed mb-12 border-b border-border-light pb-12">
                  {selectedDish.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Regional Inspiration</span>
                  <p className="font-sora text-sm text-ink">{selectedDish.region}</p>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Suggested Pairing</span>
                  <p className="font-sora text-sm text-chilli">{selectedDish.pairing}</p>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-2">Price</span>
                  <p className="font-mono text-sm text-ink">{selectedDish.price} <span className="text-[9px] text-muted-light">*fictional</span></p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
                <button 
                  onClick={() => {
                    import('../lib/events').then(m => m.openReservation({ dish: selectedDish.name }));
                    setSelectedDish(null);
                  }}
                  className="w-full py-4 bg-chilli text-light font-sora text-sm font-medium hover:bg-ink transition-colors duration-300 uppercase tracking-wider"
                >
                  Reserve this dish
                </button>
                <button 
                  onClick={() => setSelectedDish(null)}
                  className="w-full py-4 bg-transparent border border-border-dark text-ink font-sora text-sm font-medium hover:bg-ink hover:text-white transition-colors duration-300 uppercase tracking-wider"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
