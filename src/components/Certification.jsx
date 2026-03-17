import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink } from 'react-icons/fi';

// Import all PDFs from the certificate directory
const certModules = import.meta.glob('../assets/certificate/*.pdf', { eager: true, query: '?url', import: 'default' });

const certificates = [];
for (const path in certModules) {
    const fileName = path.split('/').pop().replace('.pdf', '');
    // Format title properly (e.g. "Coursera Google" or "Nptel Cloud Computing")
    certificates.push({
        id: path,
        title: fileName,
        url: certModules[path]
    });
}

const CertificateCard = ({ cert, darkMode }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-2xl overflow-hidden group flex flex-col justify-between h-full ${darkMode ? 'glass' : 'bg-white shadow-lg border border-slate-100'
                }`}
        >
            <div
                className="relative h-32 flex flex-col items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #10b98122, #10b98111)' }}
            >
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(#10b98133 1px, transparent 1px), linear-gradient(90deg, #10b98133 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                    }}
                />
                <FiAward size={48} className="text-emerald-500 z-10 mb-2" />
            </div>

            <div className="p-5 flex flex-col flex-grow items-center text-center">
                <h3 className={`text-md font-bold mb-4 flex-grow ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cert.title}</h3>
                <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-medium text-white transition-all transform hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                    <FiExternalLink size={18} /> View Certificate
                </a>
            </div>
        </motion.div>
    );
};

const Certification = ({ darkMode }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section
            id="certifications"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-dark-900 border-t border-slate-800' : 'bg-white border-t border-slate-100'}`}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 gradient-text">My Qualifications</p>
                    <h2 className={`section-title ${darkMode ? 'text-white' : 'text-slate-900'}`}>Certifications</h2>
                    <div className="title-underline mx-auto" />
                </motion.div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {certificates.map((cert) => (
                        <CertificateCard key={cert.id} cert={cert} darkMode={darkMode} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certification;
