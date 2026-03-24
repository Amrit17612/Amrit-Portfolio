import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiExternalLink } from 'react-icons/fi';

import profilePic from '../assets/profile.png';

/* ── Animated particle background ─── */
const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
                ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

/* ── Social icon ─── */
const SocialLink = ({ href, icon: Icon, label, darkMode }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className={`p-3 rounded-xl transition-colors ${darkMode
            ? 'text-slate-400 hover:text-white border border-slate-700/50 hover:border-primary-500/50 hover:bg-primary-500/10'
            : 'text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-primary-400 hover:bg-primary-50'
            }`}
    >
        <Icon size={20} />
    </motion.a>
);

const Hero = ({ darkMode }) => {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ background: darkMode ? 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 60%, #13131f 100%)' : 'linear-gradient(135deg, #f0f4ff 0%, #fdf0ff 100%)' }}
        >
            {/* Particle canvas */}
            <ParticleBackground />

            {/* Gradient blobs */}
            <div
                className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
                style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
            />
            <div
                className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl"
                style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)', animationDelay: '3s' }}
            />
            <div
                className="absolute top-10 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-float"
                style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)', animationDelay: '1.5s' }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left column */}
                <div>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${darkMode ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'bg-primary-50 text-primary-600 border border-primary-200'
                            }`}
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Available for Opportunities
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}
                    >
                        Hi, I'm{' '}
                        <span className="gradient-text block">Amrit Raj</span>
                    </motion.h1>

                    {/* Typing animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className={`text-xl md:text-2xl font-semibold mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                        <TypeAnimation
                            sequence={[
                                'Full Stack Developer 🚀',
                                2000,
                                'React & Node.js Expert 💡',
                                2000,
                                'Java / Spring Boot Dev ☕',
                                2000,
                                'Cloud & AWS Enthusiast ☁️',
                                2000,
                                'Open Source Contributor 🌍',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className={`text-lg leading-relaxed max-w-xl mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}
                    >
                        I am a Full-Stack Developer specializing in Java and Spring Boot, passionate
                        about building scalable and efficient web applications. I focus on writing
                        clean, maintainable code and delivering seamless user experiences
                        supported by strong and reliable backend architectures.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex flex-wrap gap-4 mb-10"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => scrollToSection('projects')}
                            className="btn-primary"
                            id="hero-view-projects"
                        >
                            <FiExternalLink size={18} />
                            View Projects
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => scrollToSection('contact')}
                            className="btn-outline"
                            id="hero-contact"
                        >
                            <FiMail size={18} />
                            Contact Me
                        </motion.button>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="flex items-center gap-3"
                    >
                        <span className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Follow me:</span>
                        <SocialLink href="https://github.com/Amrit17612" icon={FiGithub} label="GitHub" darkMode={darkMode} />
                        <SocialLink href="https://www.linkedin.com/in/er-amrit/" icon={FiLinkedin} label="LinkedIn" darkMode={darkMode} />
                        <SocialLink href="mailto:amrit17612@gmail.com" icon={FiMail} label="Email" darkMode={darkMode} />
                    </motion.div>
                </div>

                {/* Right column — avatar card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        {/* Rotating border */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute -inset-4 rounded-full"
                            style={{
                                background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #ec4899, #6366f1)',
                                opacity: 0.4,
                                filter: 'blur(8px)',
                            }}
                        />

                        {/* Avatar container */}
                        <div
                            className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 z-10"
                            style={{ borderColor: 'rgba(99,102,241,0.3)' }}
                        >
                            <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
                            >
                                <img
                                    src={profilePic}
                                    alt="Amrit Raj"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating experience badge */}
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className={`absolute -bottom-4 -left-2 sm:-left-8 px-4 py-2 rounded-2xl shadow-xl z-20 ${darkMode ? 'glass' : 'glass-light'}`}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-black gradient-text">Fresher</div>
                                <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Experience</div>
                            </div>
                        </motion.div>

                        {/* Floating project badge */}
                        <motion.div
                            animate={{ y: [5, -5, 5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                            className={`absolute -top-4 -right-2 sm:-right-8 px-4 py-2 rounded-2xl shadow-xl z-20 ${darkMode ? 'glass' : 'glass-light'}`}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-black gradient-text">5+</div>
                                <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Projects</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() => scrollToSection('about')}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-primary-400 transition-colors"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <FiArrowDown size={20} />
                </motion.div>
            </motion.button>
        </section>
    );
};

export default Hero;
