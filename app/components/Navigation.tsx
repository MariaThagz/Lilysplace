'use client';
import { motion } from 'framer-motion';

export default function Navigation() {
  const handleNavClick = (item: string) => {
    if (item === 'MENU') {
      // Dispatch custom event to open menu modal
      window.dispatchEvent(new CustomEvent('openMenuModal'));
    } else if (item === 'CONTACT') {
      // Scroll to reservation section
      const reservationSection = document.getElementById('reservation');
      reservationSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'GALLERY') {
      // Navigate to gallery page
      window.location.href = '/gallery';
    } else {
      // Normal scroll behavior for other items
      const section = document.getElementById(item.toLowerCase());
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Nav */}
        <div className="flex items-center justify-between py-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/logo.png" 
              alt="Lily's Place Logo" 
              className="h-16 w-auto object-contain"
            />
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-8 text-white font-semibold">
            {['HOME', 'ABOUT', 'SERVICE', 'MENU', 'GALLERY', 'CONTACT'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`${item === 'HOME' ? 'text-red-500' : 'hover:text-red-500'} transition-colors cursor-pointer`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button 
              onClick={() => handleNavClick('CONTACT')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded font-semibold transition-all"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK A TABLE
            </motion.button>

            {/* Subtle Staff Portal Link */}
            <motion.a
              href="/staff"
              className="text-gray-500 hover:text-gray-400 text-xs opacity-50 hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              title="Staff Portal"
            >
              •
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}