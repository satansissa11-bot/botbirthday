'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface GiftOpeningProps {
  onOpen: () => void;
  isOpen?: boolean;
}

export default function GiftOpening({ onOpen, isOpen = false }: GiftOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpening(true);
      setTimeout(() => {
        onOpen();
      }, 1000);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ 
              scale: 0, 
              rotate: 180,
              transition: { duration: 0.5 }
            }}
            transition={{ 
              type: 'spring', 
              damping: 20,
              stiffness: 300 
            }}
            className="cursor-pointer"
            onClick={handleClick}
          >
            <motion.div
              animate={isOpening ? { y: -100, opacity: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Gift className="w-32 h-32 text-purple-600" />
            </motion.div>
            
            {isOpening && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="w-32 h-32 text-yellow-500 animate-pulse" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
