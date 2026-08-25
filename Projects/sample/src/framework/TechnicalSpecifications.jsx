import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Technical Specifications Section with Accordion
const TechnicalSpecifications = ({ product }) => {
  const [expandedCategory, setExpandedCategory] = useState(0);
  const specs = product.specifications.specs;

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {product.specifications.title}
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive technical details of your testing solution
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Specifications Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {specs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="overflow-hidden border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-lg"
            >
              {/* Category Header */}
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === categoryIndex ? -1 : categoryIndex
                  )
                }
                className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-cyan-50 hover:to-cyan-100 flex items-center justify-between transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {category.category}
                </h3>
                <motion.div
                  animate={{
                    rotate: expandedCategory === categoryIndex ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={24}
                    className="text-cyan-500"
                  />
                </motion.div>
              </button>

              {/* Category Content */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedCategory === categoryIndex ? 'auto' : 0,
                  opacity: expandedCategory === categoryIndex ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-6 bg-white space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05 }}
                      className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-semibold text-gray-700 flex-1 min-w-0 break-words">
                        {item.label}
                      </span>
                      <span className="text-cyan-500 font-bold text-right flex-1 min-w-0 break-words">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Standards Section */}
        {product.standards && product.standards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 pt-16 border-t border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Compliance & Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {product.standards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    {standard.title}
                  </h4>
                  <ul className="space-y-2">
                    {standard.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-red-600 font-bold mt-1">✓</span>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Download Specs Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors duration-200"
          >
            <span>📄</span>
            Download Full Specifications
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSpecifications;
