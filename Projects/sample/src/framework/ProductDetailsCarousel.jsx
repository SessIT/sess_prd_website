import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { openEnquiry } from './openEnquiry';

// Product Details Section with Image Carousel
const ProductDetailsCarousel = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const images = product.productDetails.images;
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    setAutoPlay(false);
  };

  return (
    <section className="py-16 bg-white md:py-20">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl">
              {/* Main Image */}
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-96 object-cover"
              />

              {/* Image Label */}
              <div className="absolute top-4 left-4 bg-cyan-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold">
                {currentImage.title}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-all z-10 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-all z-10 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-cyan-500 w-8'
                        : 'bg-white/50 hover:bg-white/70 w-2'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2 mt-6">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => goToImage(index)}
                  className={`relative overflow-hidden rounded-lg transition-all ${
                    index === currentImageIndex
                      ? 'ring-2 ring-cyan-500 shadow-lg scale-105'
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {product.productDetails.title || product.title}
              </motion.h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            </div>

            {/* Description */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
              {product.productDetails.overview.map((text, index) => (
                <p key={index} className="text-gray-600 text-base leading-relaxed">
                  {text}
                </p>
              ))}
            </motion.div>

            {/* Key Features Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, staggerChildren: 0.1 }}
            >
              {product.productDetails.keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-xs">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openEnquiry(product?.hero?.mainTitle || product?.productDetails?.title || 'Product')}
              className="inline-block px-8 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors duration-200"
            >
              Request Quote
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsCarousel;
