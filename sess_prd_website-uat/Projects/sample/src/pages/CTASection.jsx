import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EnquiryModal from '../framework/EnquiryModal';

const CTASection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section ref={ref} className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:w-2/3 text-center lg:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-extra-dark-gray">
                We would love to hear about start your new project?
              </h3>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:w-1/3 text-center lg:text-right"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="btn-outline inline-flex items-center"
              >
                Start New Project
                <i className="ti-arrow-right ml-2"></i>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default CTASection;