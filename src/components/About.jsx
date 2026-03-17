import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiAward, FiBook, FiUser } from 'react-icons/fi';
import profilePic from '../assets/profile.png';
import amritResume from '../assets/Amrit_CV.pdf';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const StatCard = ({ value, label, icon: Icon, darkMode }) => (
    <motion.div
        variants={fadeUp}
        className={`p-5 rounded-2xl text-center card-hover ${darkMode ? 'glass' : 'bg-white shadow-md border border-slate-100'}`}
    >
        <div className="w-10 h-10 rounded-xl mb-3 mx-auto flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>
            <Icon className="text-white" size={18} />
        </div>
        <div className="text-3xl font-black gradient-text">{value}</div>
        <div className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
    </motion.div>
);

const educationData = [
    {
        degree: 'B.Tech in Computer Science',
        institution: 'Lovely Professional university',
        year: '2023 - 2027',
        grade: 'CGPA: 7.11 / 10',
        icon: '🎓',
    },
    {
        degree: 'Higher Secondary (XII)',
        institution: 'Delhi Modal Public School',
        year: '2020 - 2022',
        grade: 'Percentage: 68%',
        icon: '📚',
    },
    {
        degree: 'Secondary School (X)',
        institution: 'Patna central School',
        year: '2019 - 2020',
        grade: 'Percentage: 80%',
        icon: '📖',
    },
];

const About = ({ darkMode }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <section
            id="about"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-dark-800' : 'bg-slate-50'}`}
        >
            {/* Decorative blob */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section heading */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <p className={`text-sm font-semibold tracking-widest uppercase mb-3 gradient-text`}>Get to Know</p>
                    <h2 className={`section-title ${darkMode ? 'text-white' : 'text-slate-900'}`}>About Me</h2>
                    <div className="title-underline mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — image & stats */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        custom={1}
                    >
                        {/* Avatar */}
                        <div className="relative mb-10">
                            <div
                                className="w-56 h-56 md:w-64 md:h-64 rounded-3xl mx-auto overflow-hidden"
                                style={{ border: '2px solid rgba(99,102,241,0.3)' }}
                            >
                                <div
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}
                                >
                                    <img
                                        src={profilePic}
                                        alt="Amrit Raj"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            {/* Badge */}
                            <motion.div
                                animate={{ y: [-4, 4, -4] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className={`absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-semibold ${darkMode ? 'glass' : 'glass-light'}`}
                            >
                                🔥 Full Stack Dev
                            </motion.div>
                        </div>

                        {/* Stats grid */}
                        <motion.div
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                            <StatCard value="5+" label="Projects" icon={FiUser} darkMode={darkMode} />
                            <StatCard value="Fresher" label="Experience" icon={FiBook} darkMode={darkMode} />
                            <StatCard value="5+" label="Certs" icon={FiAward} darkMode={darkMode} />
                        </motion.div>
                    </motion.div>

                    {/* Right — text content */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        custom={2}
                    >
                        <h3 className={`text-2xl md:text-3xl font-bold mb-5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Passionate Developer &{' '}
                            <span className="gradient-text">Problem Solver</span>
                        </h3>
                        <p className={`text-base leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Hello! I'm Amrit Raj, a Full-Stack Developer passionate about building modern web applications.
                            I work with HTML, CSS, Tailwind CSS, JavaScript, React, Node.js, and Spring Boot to create
                            responsive user interfaces and scalable backend systems. I enjoy solving problems, writing
                            clean code, and continuously learning new technologies to improve my development skills.
                        </p>

                        {/* Education */}
                        <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Education
                        </h4>
                        <div className="space-y-4 mb-8">
                            {educationData.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    custom={3 + i}
                                    className={`flex gap-4 p-4 rounded-xl ${darkMode ? 'glass' : 'bg-white shadow-sm border border-slate-100'}`}
                                >
                                    <div className="text-3xl flex-shrink-0">{edu.icon}</div>
                                    <div>
                                        <h5 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</h5>
                                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{edu.institution}</p>
                                        <div className="flex gap-3 mt-1">
                                            <span className="text-xs text-primary-400">{edu.year}</span>
                                            <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>·</span>
                                            <span className="text-xs text-green-400">{edu.grade}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Resume Actions */}
                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href={amritResume}
                                download="Amrit_Raj_CV.pdf"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-primary inline-flex"
                                id="download-resume-btn"
                            >
                                <FiDownload size={18} />
                                Download Resume
                            </motion.a>
                            
                            <motion.a
                                href={amritResume}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className={`btn-outline inline-flex ${darkMode ? 'glass' : 'glass-light'}`}
                                id="view-resume-btn"
                            >
                                <FiBook size={18} />
                                View Resume
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
