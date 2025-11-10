'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const images = ['/restaurant1.jpg', '/restaurant2.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Listen for custom event to open menu modal
    const handleOpenMenu = () => setShowMenuModal(true);
    window.addEventListener('openMenuModal', handleOpenMenu);
    
    return () => {
      window.removeEventListener('openMenuModal', handleOpenMenu);
    };
  }, []);

  const handleDownloadMenu = () => {
    const link = document.createElement('a');
    link.href = "/lilymenu.pdf";
    link.download = "lilymenu.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowMenuModal(false);
  };

  const handleViewMenu = () => {
    window.open("/lilymenu.pdf", '_blank');
    setShowMenuModal(false);
  };

  return (
    <section id="home" className="relative min-h-screen bg-gray-900 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image 
              src={images[currentImage]}
              alt="Lily's Place"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <motion.h5 
            className="text-red-500 text-xl md:text-2xl font-semibold mb-4 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-raleway)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
          </motion.h5>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-cinzel)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Eat, Drink and Relax at<br />
            <span className="text-red-500">Lily&apos;s Place</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-raleway)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            
          </motion.p>
          
          <motion.button
            onClick={() => setShowMenuModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded-lg text-lg font-bold tracking-wider transition-all shadow-lg"
            style={{ fontFamily: 'var(--font-raleway)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE MENU
          </motion.button>
          
        </div>
      </div>

      <AnimatePresence>
        {showMenuModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMenuModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 
                className="text-3xl font-bold text-gray-800 mb-6 text-center"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Our Menu
              </h3>
              
              <div className="space-y-4">
                <motion.button
                  onClick={handleViewMenu}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Menu
                </motion.button>

                <motion.button
                  onClick={handleDownloadMenu}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Menu
                </motion.button>

                <motion.button
                  onClick={() => setShowMenuModal(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}