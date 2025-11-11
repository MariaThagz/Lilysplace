'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="relative bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/chef1.jpg"
          alt="Chef Background"
          fill
          className="object-cover object-center brightness-50"
          priority
        />
      </div>

      {/* Overlayed White Content Box */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-32 md:py-40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h5 
                className="text-red-400 text-xl font-light mb-4 tracking-wide"
                style={{ fontFamily: 'var(--font-raleway)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About Us
              </motion.h5>

              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
                style={{ fontFamily: 'var(--font-cinzel)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Delicious food provider since 1990
              </motion.h2>

              <motion.p 
                className="text-gray-200 text-base mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-raleway)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Good lights it very to above. Days image to sea. Over there seasons and 
                spirit beast in. Greater bearing creepeth very behold fourth night morning 
                seed moved.
              </motion.p>

              <motion.p 
                className="text-gray-200 text-base mb-10 leading-relaxed"
                style={{ fontFamily: 'var(--font-raleway)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Good lights it very to above. Days image to sea. Over seasons and spirit 
                beast in over greater bearing creepeth.
              </motion.p>

              <motion.button
                className="bg-white hover:bg-gray-100 text-black px-12 py-3 text-base font-normal transition-all"
                style={{ fontFamily: 'var(--font-raleway)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
