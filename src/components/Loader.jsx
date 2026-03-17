import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
    return (
        <AnimatePresence>
            <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #13131f 100%)' }}
            >
                {/* Animated orbital rings */}
                <div className="relative w-32 h-32 mb-8">
                    {/* Outer ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid transparent', borderTopColor: '#6366f1', borderRightColor: '#6366f1' }}
                    />
                    {/* Middle ring */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-3 rounded-full"
                        style={{ border: '2px solid transparent', borderTopColor: '#ec4899', borderLeftColor: '#ec4899' }}
                    />
                    {/* Inner pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-8 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
                    />
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-xl font-mono">AR</span>
                    </div>
                </div>

                {/* Text animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold gradient-text mb-2">Amrit Raj</h2>
                    <p className="text-slate-400 text-sm tracking-widest uppercase">Loading Portfolio...</p>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '200px' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="mt-6 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899)' }}
                />

                {/* Background blobs */}
                <div className="blob w-96 h-96 top-0 left-0 -translate-x-1/2 -translate-y-1/2" style={{ background: '#6366f1' }} />
                <div className="blob w-96 h-96 bottom-0 right-0 translate-x-1/2 translate-y-1/2" style={{ background: '#ec4899', animationDelay: '3s' }} />
            </motion.div>
        </AnimatePresence>
    );
};

export default Loader;
