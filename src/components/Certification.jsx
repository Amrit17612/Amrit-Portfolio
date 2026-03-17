import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink, FiGlobe, FiCpu, FiCode, FiZap, FiBookOpen, FiX, FiMaximize2 } from 'react-icons/fi';
import cloudCertImage from '../assets/certificate/cloud_computing.png';
import professionalCertImage from '../assets/certificate/professional_training.png';
import networkingCertImage from '../assets/certificate/networking_cert.png';
import programmingCertImage from '../assets/certificate/programming_cert.png';
import frontendCertImage from '../assets/certificate/fullstack_main_cert.png';
import genAICertImage from '../assets/certificate/gen_ai_cert.png';
import cssCertImage from '../assets/certificate/css_basic_cert.png';
import reactCertImage from '../assets/certificate/react_cert.png';
import jsCertImage from '../assets/certificate/js_basic_cert.png';
import sqlCertImage from '../assets/certificate/sql_basic_cert.png';
import javaCertImage from '../assets/certificate/java_programming_cert.png';
import oopCertImage from '../assets/certificate/oop_dsa_cert.png';
import dsaCertImage from '../assets/certificate/dsa_algo_cert.png';
import nodeCertImage from '../assets/certificate/node_basic_cert.png';

// Import all PDFs from the certificate directory
const certModules = import.meta.glob('../assets/certificate/*.pdf', { eager: true, query: '?url', import: 'default' });

const categories = [
    {
        id: 'gen-ai',
        title: "Generative AI",
        description: "Solutions with No-Code Tools, GPT-4, and GenAI integration",
        keywords: ["genai", "chatgpt", "master grm ai"],
        icon: <FiZap size={32} />,
        image: genAICertImage,
        color: "from-purple-500 to-indigo-600",
        glow: "rgba(139, 92, 246, 0.3)"
    },
    {
        id: 'networking',
        title: "Computer Networking",
        description: "TCP/IP, protocols, Packet Switching and network architecture",
        keywords: ["network", "tcp", "packet", "peer", "communication"],
        icon: <FiGlobe size={32} />,
        image: networkingCertImage,
        color: "from-blue-500 to-cyan-600",
        glow: "rgba(59, 130, 246, 0.3)"
    },
    {
        id: 'programming',
        title: "Programming & DSA",
        description: "In-depth training in Java, C++, Python and Data Structures",
        keywords: ["neocolab", "python", "automata", "cpp", "java", "dsa"],
        icon: <FiCode size={32} />,
        image: programmingCertImage,
        color: "from-emerald-500 to-teal-600",
        glow: "rgba(16, 185, 129, 0.3)",
        subButtons: [
            { label: "Java", keyword: "java", image: javaCertImage },
            { label: "Python", keyword: "python" },
            { label: "C", keyword: "neocolab c" },
            { label: "C++", keyword: "cpp" },
            { label: "DSA", keyword: "dsa", image: dsaCertImage }
        ]
    },
    {
        id: 'cloud-it',
        title: "Cloud & Systems",
        description: "Industry certifications in Cloud Computing and infrastructure",
        keywords: ["nptel", "ibm", "google", "cloud"],
        icon: <FiCpu size={32} />,
        image: cloudCertImage,
        color: "from-orange-500 to-amber-600",
        glow: "rgba(245, 158, 11, 0.3)"
    },
    {
        id: 'professional',
        title: "Professional Training",
        description: "Specialized workshops and industrial training programs",
        keywords: ["summer training", "simplilearn", "symposium", "ngo", "marketing", "digital", "grammar"],
        icon: <FiAward size={32} />,
        image: professionalCertImage,
        color: "from-pink-500 to-rose-600",
        glow: "rgba(236, 72, 153, 0.3)"
    }
];

const processCertificates = () => {
    const grouped = {};
    const processedFiles = new Set();

    // Initialize groups
    categories.forEach(cat => {
        grouped[cat.id] = { ...cat, certLinks: [] };
    });

    // Create a "Fullstack Development" group for specialized web certs
    grouped['others'] = {
        id: 'fullstack-development',
        title: "Fullstack Development",
        description: "Advanced certifications in modern web technologies and full-stack development",
        icon: <FiBookOpen size={32} />,
        image: frontendCertImage,
        color: "from-blue-600 to-indigo-700",
        glow: "rgba(79, 70, 229, 0.3)",
        certLinks: [],
        subButtons: [
            { 
                label: "Frontend", 
                type: "dropdown",
                options: [
                    { label: "HTML", keyword: "html", image: frontendCertImage },
                    { label: "CSS", keyword: "css", image: cssCertImage },
                    { label: "REACT", keyword: "react", image: reactCertImage },
                    { label: "JavaScript", keyword: "javascript", image: jsCertImage }
                ]
            },
            { label: "Backend", keyword: "python", image: nodeCertImage },
            { label: "Database", keyword: "sql", image: sqlCertImage }
        ]
    };

    for (const path in certModules) {
        const fileName = path.split('/').pop().replace('.pdf', '');
        const lowerName = fileName.toLowerCase();
        let matched = false;

        for (const cat of categories) {
            if (cat.keywords.some(keyword => lowerName.includes(keyword))) {
                grouped[cat.id].certLinks.push({
                    name: fileName.split(' ').slice(-2).join(' ') || fileName, // Take last 2 words or whole name
                    fullName: fileName,
                    url: certModules[path]
                });
                matched = true;
                break;
            }
        }

        if (!matched) {
            grouped['others'].certLinks.push({
                name: fileName.split(' ').slice(-1)[0] || fileName,
                fullName: fileName,
                url: certModules[path]
            });
        }
    }

    // Filter out empty groups
    return Object.values(grouped).filter(g => g.certLinks.length > 0);
};

const CertificateCard = ({ group, darkMode, index, onView, activeDropdown, setActiveDropdown }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative rounded-3xl transition-all duration-300 border ${
                activeDropdown && group.subButtons?.some(b => b.label === activeDropdown) ? 'z-[100] overflow-visible' : 'z-auto overflow-hidden'
            } ${
                darkMode 
                ? 'bg-[#111827] border-gray-800 hover:border-gray-700' 
                : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
            }`}
        >
            {/* Top Visual Area */}
            <div className={`h-72 relative flex items-center justify-center overflow-hidden border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                {group.image ? (
                    <motion.img 
                        src={group.image} 
                        alt={group.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className={`w-full h-full relative flex items-center justify-center bg-gradient-to-br ${group.color}`}>
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10" style={{ 
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }} />
                        
                        {/* Icon Container with Glass Effect */}
                        <div className="relative z-10 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl transform transition-transform duration-500 group-hover:scale-110">
                            {React.cloneElement(group.icon, { size: 40 })}
                        </div>
                    </div>
                )}
                
                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <button 
                        onClick={() => onView(group)}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-300 hover:bg-white/20"
                    >
                        <FiMaximize2 size={24} />
                    </button>
                </div>

                {/* Gradient Overlay for a more premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Glow */}
                <div 
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: group.glow }}
                />
            </div>

            {/* Content Area with refined typography */}
            <div className="p-8 text-center flex flex-col items-center relative">
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                    {group.title}
                </h3>
                <p className={`text-sm leading-relaxed max-w-[280px] mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {group.description}
                </p>

                {/* Sub-buttons for specific card (Frontend/Backend) */}
                {group.subButtons ? (
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {group.subButtons.map((btn, i) => {
                            if (btn.type === 'dropdown') {
                                return (
                                    <div key={i} className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveDropdown(activeDropdown === btn.label ? null : btn.label);
                                            }}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1 ${
                                                darkMode 
                                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20' 
                                                : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100'
                                            } ${activeDropdown === btn.label ? 'ring-2 ring-indigo-500/40 relative z-[70]' : ''}`}
                                        >
                                            {btn.label}
                                            <motion.div
                                                animate={{ rotate: activeDropdown === btn.label ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </motion.div>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {activeDropdown === btn.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 10, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 rounded-2xl z-[70] shadow-2xl border ${
                                                        darkMode 
                                                        ? 'bg-[#1f2937] border-gray-700 shadow-black' 
                                                        : 'bg-white border-gray-200 shadow-indigo-100'
                                                    }`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {btn.options.map((opt, idx) => {
                                                        const match = group.certLinks.find(l => l.fullName.toLowerCase().includes(opt.keyword.toLowerCase())) || group.certLinks[0];
                                                        
                                                        // If option has its own image, show in modal
                                                        if (opt.image) {
                                                            return (
                                                                <button
                                                                    key={idx}
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        // Clear dropdown after a tiny delay to prevent state batching issues
                                                                        onView({ 
                                                                            title: opt.label + " Certificate", 
                                                                            image: opt.image,
                                                                            description: "Verified HackerRank Achievement",
                                                                            icon: group.icon,
                                                                            color: group.color 
                                                                        });
                                                                        setTimeout(() => setActiveDropdown(null), 10);
                                                                    }}
                                                                    className={`block w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-colors mb-1 last:mb-0 relative z-[80] cursor-pointer ${
                                                                        darkMode 
                                                                        ? 'text-gray-300 hover:bg-white/10 hover:text-white' 
                                                                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                                    }`}
                                                                >
                                                                    {opt.label}
                                                                </button>
                                                            );
                                                        }

                                                        return (
                                                            <a
                                                                key={idx}
                                                                href={match?.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`block w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-colors mb-1 last:mb-0 cursor-pointer ${
                                                                    darkMode 
                                                                    ? 'text-gray-300 hover:bg-white/10 hover:text-white' 
                                                                    : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                                }`}
                                                            >
                                                                {opt.label}
                                                            </a>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            // Regular button
                            const match = group.certLinks.find(l => l.fullName.toLowerCase().includes(btn.keyword?.toLowerCase() || "")) || group.certLinks[i] || group.certLinks[0];
                            
                            if (btn.image) {
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onView({ 
                                                title: btn.label + " Certificate", 
                                                image: btn.image,
                                                description: "Verified HackerRank Achievement",
                                                icon: group.icon,
                                                color: group.color 
                                            });
                                        }}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                                            darkMode 
                                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20' 
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100'
                                        }`}
                                    >
                                        {btn.label}
                                    </button>
                                );
                            }

                            return (
                                <a
                                    key={i}
                                    href={match?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                                        darkMode 
                                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20' 
                                        : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100'
                                    }`}
                                >
                                    {btn.label}
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <button 
                        onClick={() => onView(group)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm mb-6 ${
                            darkMode 
                            ? 'bg-gray-800 text-white hover:bg-gray-700' 
                            : 'bg-gray-100 text-slate-800 hover:bg-gray-200 shadow-sm'
                        }`}
                    >
                        <FiMaximize2 size={16} /> View Certificate
                    </button>
                )}
                
            </div>
        </motion.div>
    );
};

const Certification = ({ darkMode }) => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
    
    // Memoize the certificates to prevent unnecessary re-processing
    const groupedCertificates = React.useMemo(() => processCertificates(), []);

    return (
        <section
            id="certifications"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-[#0a0a0f]' : 'bg-[#f8fafc]'}`}
        >
            {/* Click Outside Overlay - only active when dropdown is open */}
            <AnimatePresence>
                {activeDropdown && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveDropdown(null)}
                        className="fixed inset-0 z-[50] cursor-default"
                    />
                )}
            </AnimatePresence>

            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-indigo-500">Recognition</p>
                    <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Certificates
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groupedCertificates.map((group, index) => (
                        <CertificateCard 
                            key={group.id} 
                            group={group} 
                            darkMode={darkMode} 
                            index={index} 
                            onView={setSelectedCert}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Viewer */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full bg-transparent overflow-hidden rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                            
                            {selectedCert.image ? (
                                <img 
                                    src={selectedCert.image} 
                                    alt={selectedCert.title}
                                    className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
                                    onError={(e) => {
                                        // If image fails to load, we can handle it here or fallback
                                        console.error("Image failed to load:", selectedCert.image);
                                    }}
                                />
                            ) : (
                                <div className={`aspect-video flex flex-col items-center justify-center rounded-xl bg-gradient-to-br ${selectedCert.color || 'from-indigo-500 to-purple-600'} text-white p-10 text-center`}>
                                    {selectedCert.icon && (
                                        <div className="p-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
                                            {React.isValidElement(selectedCert.icon) 
                                                ? React.cloneElement(selectedCert.icon, { size: 64 })
                                                : <FiAward size={64} />
                                            }
                                        </div>
                                    )}
                                    <h2 className="text-3xl font-bold mb-4">{selectedCert.title}</h2>
                                    <p className="text-lg text-white/80 max-w-md">{selectedCert.description}</p>
                                    <p className="mt-8 text-sm opacity-60 italic">Preview image coming soon...</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certification;
