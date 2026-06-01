import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Related Products Section
const RelatedProducts = ({ product }) => {
  const relatedProducts = product.relatedProducts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -12,
      boxShadow: '0 30px 60px rgba(220, 38, 38, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Related Products
          </h2>
          <p className="text-lg text-gray-600">
            Explore our complete range of testing and conditioning solutions
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {relatedProducts.map((relatedProduct) => (
            <motion.div
              key={relatedProduct.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-red-300 transition-all duration-300 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-100 h-48">
                <motion.img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-red-600/80 flex items-center justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 text-white font-semibold"
                  >
                    View Details
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                  {relatedProduct.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {relatedProduct.description}
                </p>

                {/* Badge or Price Placeholder */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-600 text-xs font-semibold rounded-full">
                    Premium Quality
                  </span>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200"
                >
                  Learn More
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-cyan-600 text-cyan-600 font-semibold rounded-full hover:bg-cyan-600 hover:text-white transition-all duration-200"
          >
            View All Products
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedProducts;
