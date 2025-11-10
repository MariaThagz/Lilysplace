'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('dinner');

  const menuItems = [
    {
      id: 1,
      image: '/menu1.jpg',
      description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      price: 'Ksh 200.00'
    },
    {
      id: 2,
      image: '/menu2.jpg',
      title: 'Chips Mayai with bacon',
      description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      price: 'Ksh 250.00'
    },
    {
      id: 3,
      image: '/menu3.jpg',
      title: 'Fish Fillet',
      description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      price: 'Ksh 500.00'
    },
    {
      id: 4,
      image: '/menu4.jpg',
      title: 'Chips Masala',
      description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      price: 'Ksh 200.00'
    },
    {
      id: 5,
      image: '/menu5.jpg',
      title: 'Githeri ',
      description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      price: 'Ksh 300.00'
    },
    {
      id: 6,
      image: '/menu6.jpg',
      title: 'Rice and Beef',
      description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      price: 'Ksh 500.00'
    }
  ];

  return (
    <section id="menu" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h5 
            className="text-red-500 text-xl font-semibold mb-3 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
         
          </h5>
          <h2 
            className="text-5xl md:text-6xl font-bold text-gray-800"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Discover Our Menu
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {['breakfast', 'lunch', 'dinner'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-red-500'
              }`}
              style={{ fontFamily: 'var(--font-raleway)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex gap-6 items-start group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Food Image */}
              <motion.div 
                className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={item.image}
                  alt={item.title ?? 'Menu item image'}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Item Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 
                    className="text-2xl font-bold text-gray-800 group-hover:text-red-500 transition-colors"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    {item.title}
                  </h3>
                  <span 
                    className="text-2xl font-bold text-red-500"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    {item.price}
                  </span>
                </div>
                <p 
                  className="text-gray-600 leading-relaxed"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}