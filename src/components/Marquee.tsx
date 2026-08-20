import React from 'react';
import { motion } from 'motion/react';

export default function Marquee() {
  const line1 = "FIRE / SPICE / GRAIN / LEAF / SMOKE / ACID / MEMORY / ";
  const line2 = "FROM MANY REGIONS / TO ONE TABLE / ";
  
  // Duplicate strings to ensure seamless scrolling
  const renderMarqueeContent = (text: string) => {
    return (
      <div className="flex whitespace-nowrap px-4">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 md:py-32 bg-rice border-y border-border-light overflow-hidden flex flex-col gap-6 md:gap-12 relative z-10 select-none pointer-events-none">
      
      {/* First Marquee - Left to Right */}
      <div className="relative w-full overflow-hidden flex font-newsreader text-4xl md:text-6xl lg:text-8xl tracking-tight text-ink">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
          className="flex whitespace-nowrap min-w-max"
        >
          {renderMarqueeContent(line1)}
        </motion.div>
      </div>

      {/* Second Marquee - Right to Left */}
      <div className="relative w-full overflow-hidden flex font-newsreader text-4xl md:text-6xl lg:text-8xl tracking-tight text-chilli italic">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex whitespace-nowrap min-w-max"
        >
          {renderMarqueeContent(line2)}
        </motion.div>
      </div>
    </section>
  );
}
