'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    date: '',
    time: '11:00 AM',
    people: '2',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reservation submission
    console.log('Reservation:', formData);
    alert('Reservation request submitted!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="reservation" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/reservation.jpg"
          alt="Restaurant Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p
            className="text-red-500 text-lg md:text-xl font-semibold mb-2 tracking-widest"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            5 Stars
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Make a Reservation
          </h2>
        </motion.div>

        {/* Reservation Form */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date Input */}
              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-transparent border-2 border-white/30 text-white text-lg focus:border-red-500 focus:outline-none transition-colors"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                  placeholder="11/9/2025"
                />
              </div>

              {/* Time Select */}
              <div>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-transparent border-2 border-white/30 text-white text-lg focus:border-red-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  <option value="10:00 AM" className="bg-gray-800">10:00 AM</option>
                  <option value="11:00 AM" className="bg-gray-800">11:00 AM</option>
                  <option value="12:00 PM" className="bg-gray-800">12:00 PM</option>
                  <option value="1:00 PM" className="bg-gray-800">1:00 PM</option>
                  <option value="2:00 PM" className="bg-gray-800">2:00 PM</option>
                  <option value="6:00 PM" className="bg-gray-800">6:00 PM</option>
                  <option value="7:00 PM" className="bg-gray-800">7:00 PM</option>
                  <option value="8:00 PM" className="bg-gray-800">8:00 PM</option>
                  <option value="9:00 PM" className="bg-gray-800">9:00 PM</option>
                </select>
              </div>

              {/* People Select */}
              <div>
                <select
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-transparent border-2 border-white/30 text-white text-lg focus:border-red-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  <option value="1" className="bg-gray-800">1 person</option>
                  <option value="2" className="bg-gray-800">2 person</option>
                  <option value="3" className="bg-gray-800">3 person</option>
                  <option value="4" className="bg-gray-800">4 person</option>
                  <option value="5" className="bg-gray-800">5 person</option>
                  <option value="6" className="bg-gray-800">6 person</option>
                  <option value="7" className="bg-gray-800">7 person</option>
                  <option value="8" className="bg-gray-800">8 person</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                className="bg-red-500/80 hover:bg-red-500 text-white px-16 py-4 text-lg font-semibold tracking-wider transition-all"
                style={{ fontFamily: 'var(--font-raleway)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Make a Reservation
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* The Venue Section */}
        <motion.div
          className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Left: The Venue */}
          <div>
            <h3
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Lily's Place
            </h3>
            <p
              className="text-gray-300 text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris 
              scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus. Ut 
              non justo eleifend, facilisis nibh ut, interdum odio. Suspendisse potenti.
            </p>
          </div>

          {/* Right: Address */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-500/20 px-4 py-2 min-w-fit">
                <p
                  className="text-red-500 font-semibold text-sm"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  Address:
                </p>
              </div>
              <p
                className="text-white text-lg"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                Ridgeways road,Jacaranda close,City Estate- Nairobi Area Kenya
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-500/20 px-4 py-2 min-w-fit">
                <p
                  className="text-red-500 font-semibold text-sm"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  Phone Number:
                </p>
              </div>
              <p
                className="text-white text-lg"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                +254 722 663 099
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}