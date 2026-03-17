import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = ({ darkMode, setDarkMode }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? darkMode
                        ? 'glass shadow-lg shadow-black/30'
                        : 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/50'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>
                            AR
                        </div>
                        <span className={`font-bold text-lg hidden sm:block ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            Amrit<span className="gradient-text">Raj</span>
                        </span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ label, href }) => {
                            const id = href.replace('#', '');
                            return (
                                <li key={label}>
                                    <motion.a
                                        href={href}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === id
                                            ? 'text-primary-400 bg-primary-500/10'
                                            : darkMode ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                            }`}
                                    >
                                        {label}
                                    </motion.a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right controls */}
                    <div className="flex items-center gap-3">
                        {/* Theme toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </motion.button>

                        {/* Hire Me button */}
                        <motion.a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex btn-primary text-sm px-5 py-2"
                        >
                            Hire Me
                        </motion.a>

                        {/* Mobile menu toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`md:hidden p-2 rounded-xl ${darkMode ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'}`}
                        >
                            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className={`fixed inset-x-0 top-16 z-40 mx-4 mt-2 rounded-2xl p-4 shadow-2xl ${darkMode ? 'glass' : 'bg-white border border-slate-200'
                            }`}
                    >
                        {navLinks.map(({ label, href }, i) => (
                            <motion.a
                                key={label}
                                href={href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`block px-4 py-3 rounded-xl font-medium transition-colors mb-1 ${activeSection === href.replace('#', '')
                                    ? 'text-primary-400 bg-primary-500/10'
                                    : darkMode ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {label}
                            </motion.a>
                        ))}
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); setMenuOpen(false); }}
                            className="btn-primary w-full text-center mt-2 block"
                        >
                            Hire Me
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
