'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('food');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: 'food', label: 'Food', color: 'bg-red-500' },
    { id: 'events', label: 'Events', color: 'bg-orange-500' },
    { id: 'sipandpaint', label: 'Sip & Paint', color: 'bg-purple-500' },
    { id: 'carwash', label: 'Car Wash', color: 'bg-blue-500' },
  ];

  const galleryImages = {
    food: [
      '/menu1.jpg',
      '/menu2.jpg',
      '/menu3.jpg',
      '/menu4.jpg',
      '/menu5.jpg',
      '/menu6.jpg',
      '/menu7.jpg',
      '/menu8.jpg',
      '/chef.jpg',
      '/about.jpeg',
      '/chef1.jpg',
      
    ],
    events: [
        '/event1.jpg',
        '/event2.jpg',
        '/event3.jpg',
    ],
    sipandpaint: [
        '/sip1.jpg',
        '/sip2.jpg',
        '/sip3.jpg',
        '/sip4.jpg',
        '/sip5.jpg',
        '/sip6.jpg',
    ],
    carwash: [
        '/carwash.jpg',
    ],
  };

  const currentImages = galleryImages[activeCategory as keyof typeof galleryImages];

  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % currentImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(currentImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(currentImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <motion.div
        className="bg-black/80 backdrop-blur-sm py-6 sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
<motion.a
            href="/"
            className="relative h-12 w-32"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/logo.png"
              alt="Lily's Place Logo"
              fill
              className="object-contain"
            />
          </motion.a>

          <motion.a
            href="/"
            className="text-white hover:text-red-500 transition-colors font-semibold"
            whileHover={{ x: -5 }}
          >
            ← Back to Home
          </motion.a>
        </div>
      </motion.div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Our Gallery
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            Explore the beauty of Lily&apos;s Place
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              style={{ fontFamily: 'var(--font-raleway)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentImages.length > 0 ? (
              currentImages.map((image, index) => (
                <motion.div
                  key={image}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openLightbox(image, index)}
                >
                  <Image
                    src={image}
                    alt={`${activeCategory} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      View Image
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 text-xl" style={{ fontFamily: 'var(--font-raleway)' }}>
                  No images available for this category yet.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors z-10"
            >
              <X size={40} />
            </button>

            {/* Previous Button */}
            {currentImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 text-white hover:text-red-500 transition-colors z-10"
              >
                <ChevronLeft size={48} />
              </button>
            )}

            {/* Image */}
            <motion.div
              className="relative w-[90vw] h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Next Button */}
            {currentImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 text-white hover:text-red-500 transition-colors z-10"
              >
                <ChevronRight size={48} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}