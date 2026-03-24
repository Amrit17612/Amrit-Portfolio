import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiHeart } from 'react-icons/fi';

const socials = [
    { icon: FiGithub, href: 'https://github.com/Amrit17612', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/er-amrit/', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:amrit17612@gmail.com', label: 'Email' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
];

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

const Footer = ({ darkMode }) => {
    const scrollTo = (href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer
            className={`relative pt-16 pb-8 overflow-hidden ${darkMode ? 'bg-dark-900 border-t border-slate-800/50' : 'bg-slate-900'
                }`}
        >
            {/* Top gradient line */}
            <div className="absolute top-0 inset-x-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #ec4899, transparent)' }} />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>
                                AR
                            </div>
                            <span className="font-bold text-xl text-white">Amrit<span className="gradient-text">Raj</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Full Stack Developer passionate about creating elegant, high-performance web applications that make a real difference.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {navLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                                        className="text-slate-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-flex items-center gap-1"
                                    >
                                        <span className="text-primary-500">›</span> {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech stack */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Tech I Love</h4>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Node.js', 'Java', 'Spring Boot', 'MongoDB', 'AWS', 'TypeScript', 'Docker'].map((tech) => (
                                <span key={tech}
                                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-800 mb-8" />

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                        © {new Date().getFullYear()} Amrit Raj. Made with{' '}
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="inline-block"
                        >
                            <FiHeart className="text-red-500" size={14} />
                        </motion.span>{' '}
                        & lots of ☕
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg text-slate-500 hover:text-white transition-colors border border-slate-800 hover:border-primary-500/50 hover:bg-primary-500/10"
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
