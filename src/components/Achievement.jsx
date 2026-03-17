import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiAward, FiStar, FiTrendingUp } from 'react-icons/fi';

const achievements = [
    {
        title: '50 Day Streak',
        icon: '🔥',
        description: 'Achieved a consistent 50-day problem-solving streak on LeetCode, demonstrating dedication and discipline.',
        tag: 'LeetCode',
        color: '#f59e0b',
    },
    {
        title: '250+ Problems Solved',
        icon: '🚀',
        description: 'Successfully solved over 250 coding challenges across major platforms like LeetCode, GFG, and HackerRank.',
        tag: 'Competitive Programming',
        color: '#3b82f6',
    }
];

const AchievementCard = ({ achievement, index, darkMode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative p-8 rounded-3xl transition-all duration-300 border ${
                darkMode 
                ? 'bg-[#111827]/50 border-gray-800 hover:border-indigo-500/50 hover:bg-[#111827]/80' 
                : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200'
            }`}
        >
            {/* Tag */}
            <div className="flex justify-between items-start mb-6">
                <div className={`text-3xl w-14 h-14 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    {achievement.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                    darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                    {achievement.tag}
                </span>
            </div>

            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'} transition-colors`}>
                {achievement.title}
            </h3>
            
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {achievement.description}
            </p>

            {/* Hover subtle glow */}
            <div className={`absolute inset-0 rounded-3xl -z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}
                 style={{ backgroundColor: achievement.color }} />
        </motion.div>
    );
};

const Achievement = ({ darkMode }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section
            id="achievements"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-[#0a0a0f]' : 'bg-[#f8fafc]'}`}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-indigo-500">Milestones</p>
                    <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Achievements
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {achievements.map((item, index) => (
                        <AchievementCard key={index} achievement={item} index={index} darkMode={darkMode} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievement;
