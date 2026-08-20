import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { ReservationData } from '../lib/events';

export default function ReservationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ReservationData>({});
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [space, setSpace] = useState('Main Dining Room');
  const [menu, setMenu] = useState('À La Carte');
  const [occasion, setOccasion] = useState('None');
  const [dietary, setDietary] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ReservationData>;
      const payload = customEvent.detail || {};
      setData(payload);
      
      // Pre-fill form
      if (payload.space) setSpace(payload.space);
      if (payload.menu) setMenu(payload.menu);
      if (payload.occasion) setOccasion(payload.occasion);
      if (payload.date) setDate(payload.date);
      if (payload.time) setTime(payload.time);
      if (payload.guests) setGuests(payload.guests);

      setIsOpen(true);
      setStatus('idle');
      setErrors({});
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-reservation', handleOpen);
    return () => window.removeEventListener('open-reservation', handleOpen);
  }, []);

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Valid email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm"
            onClick={close}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full bg-rice shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 bg-rice/90 backdrop-blur-md z-10 p-6 md:p-8 flex justify-between items-center border-b border-border-light">
              <span className="font-mono text-[10px] tracking-widest text-chilli uppercase">Reservation</span>
              <button onClick={close} className="hover:text-chilli transition-colors"><X size={24} strokeWidth={1.5} /></button>
            </div>

            <div className="p-6 md:p-12">
              <h2 className="font-newsreader text-4xl mb-2 text-ink">REQUEST A TABLE</h2>
              <p className="font-sora text-sm text-muted-dark mb-12">
                This is a fictional reservation system for demonstration purposes. No real reservations will be made.
              </p>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-border-light p-12 text-center"
                >
                  <div className="w-16 h-16 bg-brass rounded-full flex items-center justify-center mx-auto mb-6 text-ink">
                    <Check size={32} />
                  </div>
                  <h3 className="font-newsreader text-3xl mb-4">Request Sent</h3>
                  <p className="font-sora text-sm text-muted-dark mb-8 max-w-sm mx-auto">
                    Thank you, {name}. A confirmation email has been sent to {email} for your fictional reservation.
                  </p>
                  <button 
                    onClick={close}
                    className="px-8 py-4 bg-ink text-white font-sora text-sm font-medium hover:bg-chilli transition-colors uppercase tracking-wider"
                  >
                    Return to Website
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contextual Badges based on pre-filled data */}
                  {(data.dish || data.menu || data.space || data.table || data.occasion) && (
                    <div className="mb-8 p-6 bg-white border border-border-light text-sm">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark mb-4">Selections Applied</span>
                      <ul className="space-y-2 font-sora">
                        {data.dish && <li><span className="font-medium">Dish:</span> {data.dish}</li>}
                        {data.table && <li><span className="font-medium">Table:</span> {data.table}</li>}
                        {data.menu && <li><span className="font-medium">Menu:</span> {data.menu}</li>}
                        {data.space && <li><span className="font-medium">Space:</span> {data.space}</li>}
                        {data.occasion && <li><span className="font-medium">Occasion:</span> {data.occasion}</li>}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Full Name *</label>
                      <input 
                        id="name" 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors" 
                      />
                      {errors.name && <span className="text-chilli text-xs font-sora">{errors.name}</span>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Phone Number *</label>
                      <input 
                        id="phone" 
                        type="tel" 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors" 
                      />
                      {errors.phone && <span className="text-chilli text-xs font-sora">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Email Address *</label>
                    <input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors" 
                    />
                    {errors.email && <span className="text-chilli text-xs font-sora">{errors.email}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="date" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Date *</label>
                      <input 
                        id="date" 
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors" 
                      />
                      {errors.date && <span className="text-chilli text-xs font-sora">{errors.date}</span>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="time" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Time *</label>
                      <select 
                        id="time" 
                        value={time} 
                        onChange={e => setTime(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors rounded-none appearance-none"
                      >
                        <option value="">Select Time</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                        <option value="21:30">9:30 PM</option>
                      </select>
                      {errors.time && <span className="text-chilli text-xs font-sora">{errors.time}</span>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="guests" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Guests</label>
                      <select 
                        id="guests" 
                        value={guests} 
                        onChange={e => setGuests(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors rounded-none appearance-none"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                      <label htmlFor="space" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Space</label>
                      <select 
                        id="space" 
                        value={space} 
                        onChange={e => setSpace(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors rounded-none appearance-none"
                      >
                        <option value="Main Dining Room">Main Dining Room</option>
                        <option value="Window tables">Window Tables</option>
                        <option value="Chef's table">Chef's Table</option>
                        <option value="Courtyard">Courtyard</option>
                        <option value="Private room">Private Room</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="menu" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Menu Interest</label>
                      <select 
                        id="menu" 
                        value={menu} 
                        onChange={e => setMenu(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors rounded-none appearance-none"
                      >
                        <option value="À La Carte">À La Carte</option>
                        <option value="Tasting Journey">Tasting Journey</option>
                        <option value="Vegetarian Tasting Journey">Vegetarian Tasting Journey</option>
                        <option value="Chef's Selection">Chef's Selection</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="occasion" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Occasion</label>
                     <select 
                        id="occasion" 
                        value={occasion} 
                        onChange={e => setOccasion(e.target.value)} 
                        className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors rounded-none appearance-none"
                      >
                        <option value="None">None</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Business">Business</option>
                        <option value="Private Dining">Private Dining</option>
                        <option value="Wedding Reception">Wedding Reception</option>
                        <option value="Exclusive Hire">Exclusive Hire</option>
                      </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dietary" className="block font-mono text-[10px] uppercase tracking-widest text-muted-dark">Dietary Requirements</label>
                    <input 
                      id="dietary" 
                      type="text"
                      placeholder="E.g., Nut allergy, Vegan..." 
                      value={dietary} 
                      onChange={e => setDietary(e.target.value)} 
                      className="w-full border-b border-border-dark bg-transparent py-2 font-sora text-sm focus:outline-none focus:border-chilli transition-colors" 
                    />
                  </div>

                  <div className="pt-8">
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-chilli text-white font-sora text-sm font-medium hover:bg-ink transition-colors uppercase tracking-wider disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Processing...' : 'Submit Fictional Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
