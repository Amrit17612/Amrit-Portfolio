import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
    {
        id: 1,
        title: 'Training Management System',
        description:
            'A comprehensive platform to streamline organizational training. Features hierarchical course management, interactive progress tracking, automated assessments, and dynamic certification generation.',
        image: '🎓',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
        category: 'Full Stack',
        github: 'https://github.com/Amrit17612/SkillBridge',
        live: 'https://example.com',
        color: '#6366f1',
        highlights: ['Course Management', 'Progress Analytics', 'Cert Generation'],
    },
    {
        id: 2,
        title: 'CPU Scheduler Simulator',
        description:
            'An intelligent CPU scheduling simulator that visualizes FCFS, SJF, Round Robin, and Priority algorithms with Gantt charts and performance metrics.',
        image: '🖥️',
        tags: ['Java', 'Spring Boot', 'React', 'Chart.js'],
        category: 'Simulation',
        github: 'https://github.com',
        live: 'https://example.com',
        color: '#8b5cf6',
        highlights: ['4 algorithms', 'Gantt chart viz', 'Performance metrics'],
    },
    {
        id: 3,
        title: 'Event Management System',
        description:
            'A platform for planning and managing large-scale events. Features real-time attendee registration, event scheduling, automated ticketing, and seamless check-in with QR code scanning.',
        image: '📅',
        tags: ['React', 'Spring Boot', 'MySQL', 'AWS', 'Stripe'],
        category: 'Full Stack',
        github: 'https://github.com',
        live: 'https://example.com',
        color: '#ec4899',
        highlights: ['Real-time Reg', 'QR Check-in', 'Auto Ticketing'],
    },
];

const categories = ['All', 'Full Stack', 'Frontend', 'Simulation'];

const ProjectCard = ({ project, darkMode }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${darkMode ? 'glass' : 'bg-white shadow-lg border border-slate-100'
                }`}
        >
            {/* Project image / icon area */}
            <div
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}11)` }}
            >
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(${project.color}33 1px, transparent 1px), linear-gradient(90deg, ${project.color}33 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                    }}
                />
                <span className="text-7xl z-10 relative">{project.image}</span>

                {/* Overlay with links on hover */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center gap-4"
                            style={{ background: 'rgba(0,0,0,0.75)' }}
                        >
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.05 }}
                                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FiGithub size={20} />
                            </motion.a>
                            <motion.a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FiExternalLink size={20} />
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category badge */}
                <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: project.color }}
                >
                    {project.category}
                </div>
            </div>

            {/* Card body */}
            <div className="p-6">
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.highlights.map((h) => (
                        <span
                            key={h}
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: `${project.color}15`, color: project.color }}
                        >
                            ✓ {h}
                        </span>
                    ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`text-xs px-2.5 py-1 rounded-lg font-mono ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        <FiGithub size={15} /> Code
                    </a>
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                        style={{ color: project.color }}
                    >
                        <FiExternalLink size={15} /> Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = ({ darkMode }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    return (
        <section
            id="projects"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-dark-800' : 'bg-slate-50'}`}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl -translate-x-1/2"
                    style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 gradient-text">What I've Built</p>
                    <h2 className={`section-title ${darkMode ? 'text-white' : 'text-slate-900'}`}>My Projects</h2>
                    <div className="title-underline mx-auto" />
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeFilter === cat
                                    ? 'text-white shadow-lg'
                                    : darkMode ? 'text-slate-400 hover:text-white border border-slate-700/50 hover:border-primary-500/30'
                                        : 'text-slate-500 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                                }`}
                            style={activeFilter === cat ? { background: 'linear-gradient(135deg, #6366f1, #ec4899)' } : {}}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project) => (
                            <ProjectCard key={project.id} project={project} darkMode={darkMode} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
