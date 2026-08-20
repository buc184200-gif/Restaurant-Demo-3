import React from 'react';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Philosophy from './components/Philosophy';
import RegionalMenu from './components/RegionalMenu';
import TastingJourney from './components/TastingJourney';
import AlacarteMenu from './components/AlacarteMenu';
import FlavourCompass from './components/FlavourCompass';
import FireAndSpice from './components/FireAndSpice';
import Kitchen from './components/Kitchen';
import SpiceLibrary from './components/SpiceLibrary';
import Spaces from './components/Spaces';
import Celebrations from './components/Celebrations';
import TableSelection from './components/TableSelection';
import Gallery from './components/Gallery';
import GuestNotes from './components/GuestNotes';
import Visit from './components/Visit';
import ReservationModal from './components/ReservationModal';
import Footer from './components/Footer';

export default function App() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <GrainOverlay />
      <Loader />
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Philosophy />
          <RegionalMenu />
          <TastingJourney />
          <AlacarteMenu />
          <FlavourCompass />
          <FireAndSpice />
          <Kitchen />
          <SpiceLibrary />
          <Spaces />
          <Celebrations />
          <TableSelection />
          <Gallery />
          <GuestNotes />
          <Visit />
        </main>
        <Footer />
        <ReservationModal />
        
        {/* Mobile Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-aubergine-light border-t border-border-dark md:hidden flex justify-between items-center px-6 py-4">
          <button 
            onClick={(e) => {
              e.preventDefault();
              import('./lib/events').then(m => m.openReservation());
            }}
            className="w-full py-3 bg-chilli text-light font-sora text-sm font-medium hover:bg-ink transition-colors uppercase tracking-wider text-center"
          >
            Reserve Table
          </button>
        </div>
      </div>
    </SmoothScrollProvider>
  );
}


