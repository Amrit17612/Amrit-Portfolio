import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        color: '#6366f1',
        skills: [
            { name: 'HTML5 & CSS3', level: 95 },
            { name: 'JavaScript (ES6+)', level: 90 },
            { name: 'React.js', level: 88 },
            { name: 'Tailwind CSS', level: 85 },
        ],
    },
    {
        title: 'Backend',
        icon: '⚙️',
        color: '#8b5cf6',
        skills: [
            { name: 'Node.js & Express', level: 85 },
            { name: 'Java', level: 82 },
            { name: 'Spring Boot', level: 78 },
            { name: 'REST APIs', level: 90 },
        ],
    },
    {
        title: 'Database',
        icon: '🗄️',
        color: '#ec4899',
        skills: [
            { name: 'MySQL', level: 85 },
            { name: 'MongoDB', level: 80 },
            { name: 'Redis', level: 65 },
            { name: 'PostgreSQL', level: 70 },
        ],
    },
    {
        title: 'DevOps & Tools',
        icon: '🛠️',
        color: '#06b6d4',
        skills: [
            { name: 'Git & GitHub', level: 92 },
            { name: 'AWS (EC2, S3)', level: 70 },
            { name: 'Docker', level: 68 },
            { name: 'Linux / Bash', level: 75 },
        ],
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

const SkillBar = ({ name, level, color, inView }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-slate-300">{name}</span>
            <span className="text-xs font-semibold" style={{ color }}>{level}%</span>
        </div>
        <div className="progress-bar">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: inView ? `${level}%` : 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                className="progress-fill"
                style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
            />
        </div>
    </div>
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

                {/* Skill category cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 * i }}
                            className={`p-6 rounded-2xl card-hover ${darkMode ? 'glass' : 'bg-white shadow-lg border border-slate-100'}`}
                        >
                            {/* Card header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                                    style={{ background: `${cat.color}22`, border: `1px solid ${cat.color}44` }}
                                >
                                    {cat.icon}
                                </div>
                                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cat.title}</h3>
                            </div>

                            {/* Skill bars */}
                            {cat.skills.map((skill) => (
                                <SkillBar key={skill.name} {...skill} color={cat.color} inView={inView} />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
