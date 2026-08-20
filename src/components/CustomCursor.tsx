import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { cn } from '../lib/utils';

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Hide cursor over forms/modals
      if (target.closest('form, input, select, textarea, [role="dialog"]')) {
        setIsHidden(true);
        return;
      }
      setIsHidden(false);

      const clickable = target.closest('a, button, [data-cursor-text]');
      if (clickable) {
        setIsHovering(true);
        const text = clickable.getAttribute('data-cursor-text');
        setHoverText(text || '');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Recover after blur/tab changes
    window.addEventListener('blur', () => setIsHidden(true));
    window.addEventListener('focus', () => setIsHidden(false));

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('blur', () => setIsHidden(true));
      window.removeEventListener('focus', () => setIsHidden(false));
    };
  }, [isTouch, cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[10000] transition-opacity duration-300", isHidden ? "opacity-0" : "opacity-100")}>
      {/* Outer Ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-chilli flex items-center justify-center bg-transparent backdrop-invert-[0.1]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? (hoverText ? 40 : 30) : 24,
          height: isHovering ? (hoverText ? 40 : 30) : 24,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {hoverText && (
          <span className="font-mono text-[6px] uppercase tracking-widest text-chilli font-medium">
            {hoverText}
          </span>
        )}
      </motion.div>
      
      {/* Inner Dot */}
      <motion.div
        className={cn(
          "absolute top-0 left-0 rounded-full bg-chilli transition-opacity duration-300",
          (isHovering && hoverText) ? "opacity-0" : "opacity-100"
        )}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </div>
  );
}
