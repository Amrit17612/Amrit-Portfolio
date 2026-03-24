import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiPhone } from 'react-icons/fi';

const contactInfo = [
    {
        icon: FiMail,
        label: 'Email',
        value: 'amrit17612@gmail.com',
        href: 'mailto:amrit17612@gmail.com',
        color: '#6366f1',
    },
    {
        icon: FiPhone,
        label: 'Phone',
        value: '+91 6203427868',
        href: 'tel:6203427868',
        color: '#10b981',
    },
    {
        icon: FiLinkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/er-amrit/',
        href: 'https://www.linkedin.com/in/er-amrit/',
        color: '#0077b5',
    },
    {
        icon: FiGithub,
        label: 'GitHub',
        value: 'github.com/Amrit17612',
        href: 'https://github.com/Amrit17612',
        color: '#8b5cf6',
    },
    {
        icon: FiMapPin,
        label: 'Location',
        value: 'India',
        href: null,
        color: '#ec4899',
    },
];

const Contact = ({ darkMode }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const formRef = useRef(null);

    const handleChange = (e) => {
        setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate form submission
        await new Promise((r) => setTimeout(r, 1800));
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
    };

    const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 ${darkMode
        ? 'bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-500 focus:border-primary-500 focus:bg-slate-800'
        : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-400 focus:shadow-sm'
        }`;

    return (
        <section
            id="contact"
            ref={ref}
            className={`py-28 relative overflow-hidden ${darkMode ? 'bg-dark-800' : 'bg-slate-50'}`}
        >
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
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
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 gradient-text">Get In Touch</p>
                    <h2 className={`section-title ${darkMode ? 'text-white' : 'text-slate-900'}`}>Contact Me</h2>
                    <div className="title-underline mx-auto" />
                    <p className={`mt-4 text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and ideas.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left — contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Let's work <span className="gradient-text">together</span>
                        </h3>
                        <p className={`text-base leading-relaxed mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            I'm currently available for freelance work, full-time positions, and exciting collaboration opportunities.
                            Whether you need a landing page, a full app, or just some tech advice — let's connect!
                        </p>

                        {/* Contact cards */}
                        <div className="space-y-4">
                            {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${darkMode ? 'glass' : 'bg-white shadow-sm border border-slate-100'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                                        <Icon style={{ color }} size={18} />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{label}</p>
                                        {href ? (
                                            <a href={href} target="_blank" rel="noopener noreferrer"
                                                className={`text-sm font-medium hover:underline transition-colors ${darkMode ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                                                style={{ textDecorationColor: color }}>
                                                {value}
                                            </a>
                                        ) : (
                                            <p className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 }}
                            className={`mt-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm ${darkMode ? 'glass text-slate-300' : 'bg-white shadow-sm border border-slate-200 text-slate-500'
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Available for work — response within 24h
                        </motion.div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`p-8 rounded-2xl ${darkMode ? 'glass' : 'bg-white shadow-xl border border-slate-100'}`}
                    >
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="text-6xl mb-4">🎉</div>
                                <FiCheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent!</h3>
                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Thanks for reaching out! I'll get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Send a Message</h3>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="contact-name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="contact-email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="contact-subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        id="contact-message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Tell me about your project or just say hi..."
                                        required
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    whileHover={{ scale: status !== 'sending' ? 1.02 : 1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-70"
                                    id="contact-submit"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend size={18} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
