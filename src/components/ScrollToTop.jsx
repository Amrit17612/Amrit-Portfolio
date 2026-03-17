import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = ({ darkMode }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-top"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollTop}
                    id="scroll-to-top"
                    aria-label="Scroll to top"
                    className="fixed bottom-8 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
                >
                    <FiArrowUp size={20} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
