import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiServer, FiDatabase, FiCloud, FiLayout, FiMaximize, FiCheckCircle } from 'react-icons/fi';

const skillCategories = [
    {
        title: 'Frontend Development',
        icon: <FiLayout />,
        color: '#6366f1',
        description: 'Building immersive, responsive, and high-performance user interfaces with modern frameworks.',
        skills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
        span: 'lg:col-span-2'
    },
    {
        title: 'Backend Systems',
        icon: <FiServer />,
        color: '#8b5cf6',
        description: 'Architecting robust and scalable server-side solutions and business logic.',
        skills: ['Node.js & Express', 'Java', 'Spring Boot', 'RESTful APIs', 'Microservices', 'WebSocket'],
        span: 'lg:col-span-1'
    },
    {
        title: 'Data Management',
        icon: <FiDatabase />,
        color: '#ec4899',
        description: 'Designing efficient database schemas and managing complex data workflows.',
        skills: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL', 'Mongoose', 'SQL Optimization'],
        span: 'lg:col-span-1'
    },
    {
        title: 'Infrastructure & Tools',
        icon: <FiCloud />,
        color: '#06b6d4',
        description: 'Streamlining development processes and managing cloud-native deployments.',
        skills: ['Git & GitHub', 'AWS (EC2, S3)', 'Docker', 'Linux / Bash', 'CI/CD', 'Netlify / Vercel'],
        span: 'lg:col-span-2'
    },
];

const techIcons = [
    { name: 'React', emoji: '⚛️' },
    { name: 'Node.js', emoji: '🟩' },
    { name: 'Java', emoji: '☕' },
    { name: 'Spring', emoji: '🌿' },
    { name: 'MongoDB', emoji: '🍃' },
    { name: 'MySQL', emoji: '🐬' },
    { name: 'AWS', emoji: '☁️' },
    { name: 'Docker', emoji: '🐳' },
    { name: 'Git', emoji: '🔀' },
    { name: 'TypeScript', emoji: '📘' },
];

const SkillTag = ({ name, color, darkMode }) => (
    <motion.div
        whileHover={{ 
            scale: 1.05, 
            y: -2,
            backgroundColor: `${color}20`,
            borderColor: color
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-default"
        style={{ 
            backgroundColor: `${color}08`, 
            borderColor: `${color}15`,
            color: darkMode ? '#e2e8f0' : '#475569' 
        }}
    >
        <FiCheckCircle size={10} style={{ color }} />
        {name}
    </motion.div>
);

const Skills = ({ darkMode }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            id="skills"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-dark-900' : 'bg-white'}`}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 gradient-text">What I Work With</p>
                    <h2 className={`section-title ${darkMode ? 'text-white' : 'text-slate-900'}`}>My Skills</h2>
                    <div className="title-underline mx-auto" />
                </motion.div>

                {/* Tech icon strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {techIcons.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.1 * i }}
                            whileHover={{ scale: 1.1, y: -4 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-default ${darkMode ? 'glass text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700'
                                }`}
                        >
                            <span>{t.emoji}</span>
                            {t.name}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Skill category Bento grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 * i }}
                            className={`p-8 rounded-3xl relative overflow-hidden group border transition-all duration-500 ${cat.span} ${
                                darkMode 
                                ? 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60' 
                                : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl'
                            }`}
                        >
                            {/* Hover background glow */}
                            <div 
                                className="absolute -right-16 -top-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl pointer-events-none"
                                style={{ backgroundColor: cat.color }}
                            />

                            {/* Card header */}
                            <div className="flex items-start justify-between mb-6">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}33` }}
                                >
                                    {cat.icon}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-bold opacity-30">Category {i + 1}</div>
                            </div>

                            <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cat.title}</h3>
                            <p className={`text-sm mb-8 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {cat.description}
                            </p>

                            {/* Skill tags */}
                            <div className="flex flex-wrap gap-2.5">
                                {cat.skills.map((skillName) => (
                                    <SkillTag key={skillName} name={skillName} color={cat.color} darkMode={darkMode} />
                                ))}
                            </div>

                            {/* Decorative line */}
                            <div 
                                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                                style={{ backgroundColor: cat.color }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
