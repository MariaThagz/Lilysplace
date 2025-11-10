'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Car, Salad, Users, Trees, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Services() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/pool.jpg', '/carwash.jpg', '/chef.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Order through Glovo and enjoy the fastest delivery service. Your favorite meals delivered hot and fresh to your doorstep.',
    },
    {
      icon: Car,
      title: 'Car Wash & Detailing',
      description: 'Professional car wash services with complete detailing. Keep your vehicle spotless while you dine with us.',
    },
    {
      icon: Salad,
      title: 'Healthy Foods',
      description: 'Fresh, nutritious meals prepared with the finest ingredients. Enjoy delicious food that nourishes your body.',
    },
    {
      icon: Users,
      title: 'Sip & Paint Events',
      description: 'Join our creative sip and paint activities. Enjoy drinks while unleashing your artistic side in a fun atmosphere.',
    },
    {
      icon: Trees,
      title: 'Beautiful Gardens',
      description: 'Host events in our stunning garden setting. A peaceful oasis perfect for special occasions and gatherings.',
    },
    {
      icon: Gamepad2,
      title: 'Pool Table & Games',
      description: 'Relax and have fun with our pool table and entertainment area. Perfect for unwinding with friends.',
    },
  ];

  return (
    <section id="service" className="relative py-20 bg-gray-900">
      {/* Background Images with Animation */}
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
              alt="Service Background"
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p
            className="text-red-500 text-lg md:text-xl font-semibold mb-2 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            Our Services
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            What We Offer
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white transition-all duration-300 border border-gray-200 hover:border-red-500 shadow-lg hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-12 h-12 text-red-500" />
                </motion.div>

                <h3
                  className="text-2xl font-bold text-black mb-4"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-gray-700 leading-relaxed text-base"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}