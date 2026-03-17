import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiBriefcase, FiStar, FiCalendar } from 'react-icons/fi';

const experiences = [
    {
        type: 'internship',
        icon: FiBriefcase,
        color: '#6366f1',
        title: 'Full Stack Developer Intern',
        organization: 'TechCorp Solutions Pvt. Ltd.',
        period: 'Jun 2023 – Sep 2023',
        description:
            'Developed RESTful APIs with Spring Boot and built responsive React dashboards. Improved API response time by 35% through query optimization and caching.',
        tags: ['React', 'Spring Boot', 'MySQL', 'REST API'],
    },
    {
        type: 'certification',
        icon: FiAward,
        color: '#8b5cf6',
        title: 'AWS Certified Cloud Practitioner',
        organization: 'Amazon Web Services',
        period: 'Nov 2023',
        description:
            'Earned the foundational AWS certification covering core cloud concepts, EC2, S3, Lambda, IAM, and cloud pricing models.',
        tags: ['AWS', 'Cloud', 'EC2', 'S3'],
    },
    {
        type: 'certification',
        icon: FiAward,
        color: '#ec4899',
        title: 'Meta Front-End Developer Certificate',
        organization: 'Coursera / Meta',
        period: 'Aug 2023',
        description:
            'Completed a 9-course professional certificate covering React, UX/UI design principles, and responsive web development.',
        tags: ['React', 'JavaScript', 'UX Design'],
    },
    {
        type: 'achievement',
        icon: FiStar,
        color: '#f59e0b',
        title: 'Hackathon Winner — Smart India Hackathon',
        organization: 'Government of India',
        period: 'Dec 2023',
        description:
            'Won 1st place at SIH 2023 with an AI-powered job matching platform. Competed against 200+ teams nationwide.',
        tags: ['AI/ML', 'React', 'Node.js', 'Python'],
    },
    {
        type: 'achievement',
        icon: FiStar,
        color: '#10b981',
        title: 'Top 5% on LeetCode',
        organization: 'LeetCode',
        period: '2023 – Present',
        description:
            'Solved 300+ problems across Data Structures and Algorithms. Ranked in top 5% globally with a contest rating of 1850+.',
        tags: ['DSA', 'Java', 'Problem Solving'],
    },
    {
        type: 'internship',
        icon: FiBriefcase,
        color: '#06b6d4',
        title: 'Open Source Contributor',
        organization: 'Google Summer of Code',
        period: 'May 2024 – Aug 2024',
        description:
            'Contributed to open-source React component library — merged 12 PRs, fixed 30+ issues, and wrote comprehensive documentation.',
        tags: ['React', 'Open Source', 'TypeScript'],
    },
];

const tabs = ['All', 'Internship', 'Certification', 'Achievement'];

const typeMap = {
    internship: 'Internship',
    certification: 'Certification',
    achievement: 'Achievement',
};

const TimelineItem = ({ item, index, darkMode }) => {
    const Icon = item.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex gap-4 md:gap-6 pb-8 last:pb-0"
        >
            {/* Timeline line */}
            <div className="flex flex-col items-center">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 z-10"
                    style={{ background: `${item.color}22`, border: `2px solid ${item.color}55` }}
                >
                    <Icon style={{ color: item.color }} size={18} />
                </div>
                {index < experiences.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(${item.color}44, transparent)` }} />
                )}
            </div>

            {/* Card */}
            <motion.div
                whileHover={{ scale: 1.01 }}
                className={`flex-1 p-5 rounded-2xl mb-2 card-hover ${darkMode ? 'glass' : 'bg-white shadow-md border border-slate-100'}`}
            >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                        <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize mb-1 inline-block"
                            style={{ background: `${item.color}15`, color: item.color }}
                        >
                            {typeMap[item.type]}
                        </span>
                        <h3 className={`font-bold text-base leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {item.title}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>{item.organization}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} flex-shrink-0`}>
                        <FiCalendar size={12} />
                        {item.period}
                    </div>
                </div>
                <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`text-xs px-2.5 py-0.5 rounded-lg font-mono ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

const Experience = ({ darkMode }) => {
    const [activeTab, setActiveTab] = React.useState('All');
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const filtered = activeTab === 'All'
        ? experiences
        : experiences.filter((e) => typeMap[e.type] === activeTab);

    return (
        <section
            id="experience"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-dark-900' : 'bg-white'}`}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 gradient-text">My Journey</p>
                    <h2 className={`section-title ${darkMode ? 'text-white' : 'text-slate-900'}`}>Experience & Achievements</h2>
                    <div className="title-underline mx-auto" />
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab
                                    ? 'text-white shadow-md'
                                    : darkMode ? 'text-slate-400 border border-slate-700/50 hover:text-white' : 'text-slate-500 border border-slate-200 hover:bg-slate-100'
                                }`}
                            style={activeTab === tab ? { background: 'linear-gradient(135deg, #6366f1, #ec4899)' } : {}}
                        >
                            {tab}
                        </button>
                    ))}
                </motion.div>

                {/* Timeline */}
                <div>
                    {filtered.map((item, i) => (
                        <TimelineItem key={item.title} item={item} index={i} darkMode={darkMode} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
