"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  BookOpen,
  Code,
  Phone,
  Youtube,
  Facebook,
  Briefcase,
  UserCheck,
  Layers,
  ShoppingBag,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

export default function LinkHub() {
  const [copiedId, setCopiedId] = useState(null);

  // Copy to clipboard functionality
  const handleCopy = (e, url, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Main Link Cards Data
  const links = [
    {
      id: 1,
      title: "Official Website",
      desc: "Explore our core tech services and solutions.",
      url: "https://khalilcomputer.com",
      icon: Globe,
    },
    {
      id: 2,
      title: "Premium Courses",
      desc: "Master tech skills with our expert-led training.",
      url: "https://khalilcomputer.com/courses",
      icon: BookOpen,
    },
    // { id: 3, title: 'Web Development', desc: 'Get a modern, high-performance website.', url: '#web-dev', icon: Code },
    {
      id: 4,
      title: "Contact & WhatsApp",
      desc: "Let's chat! Available for consultation.",
      url: "https://wa.link/piaw7q",
      icon: Phone,
    },
    // { id: 5, title: 'YouTube Channel', desc: 'Free high-quality tech tutorials & reviews.', url: '#youtube', icon: Youtube },
    {
      id: 6,
      title: "Facebook Page",
      desc: "Join our community and stay updated.",
      url: "#facebook",
      icon: Facebook,
    },
    // { id: 7, title: 'Fiverr Profile', desc: 'Order freelance development gigs securely.', url: '#fiverr', icon: UserCheck },
    // { id: 8, title: 'Portfolio', desc: 'Check out our latest case studies & designs.', url: '#portfolio', icon: Briefcase },
  ];

  // Quick Action CTA Buttons Data
  const quickActions = [
    {
      title: "Get a Website",
      url: "https://tamimahmeddev.vercel.app",
      icon: Layers,
    },
    {
      title: "Buy a Course",
      url: "https://khalilcomputer.com/courses",
      icon: ShoppingBag,
    },
    {
      title: "Contact Us",
      url: "https://khalilcomputer.com/contact-us",
      icon: UserCheck,
    },
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <div className="relative min-h-screen w-full text-slate-900 font-sans overflow-x-hidden flex flex-col items-center justify-between py-12 px-4">
      {/* ─── BACKGROUND AMBIENT BLUR SHAPES ─── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#1753c2]/05 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-400/5 blur-[150px] pointer-events-none" />

      {/* ─── CONTENT WRAPPER ─── */}
      <div className="w-full mx-auto z-10 flex flex-col items-center">
        {/* 1. HERO SECTION */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 flex flex-col items-center"
        >
          {/* Tagline & Animated Underline */}
          <div className="relative mt-2 inline-block">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              All digital services & links in one place
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-0.5 bg-linear-to-r from-transparent via-[#1753c2] to-transparent mt-1.5"
            />
          </div>
        </motion.header>

        {/* 2. QUICK ACTION SECTION (CTAs) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-full grid grid-cols-3 gap-3 mb-8"
        >
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <a
                key={index}
                href={action.url}
                className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#1753c2]/40 transition-all duration-300 text-center shadow-sm shadow-slate-100 backdrop-blur-md overflow-hidden"
              >
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-[#1753c2]/0 group-hover:bg-[#1753c2]/3 transition-colors duration-300" />
                <IconComponent className="w-5 h-5 mb-1.5 text-[#1753c2] group-hover:scale-110 transform transition-transform duration-300" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-[#1753c2] transition-colors duration-300">
                  {action.title}
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* 3. MAIN LINK CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-3.5"
        >
          {links.map((link) => {
            const IconComponent = link.icon;
            return (
              <motion.a
                key={link.id}
                variants={itemVariants}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/50 hover:border-[#1753c2]/30 hover:shadow-[0_10px_30px_rgba(23,83,194,0.05)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center space-x-4 pr-4">
                  {/* Clean Icon Frame */}
                  <div className="shrink-0 w-11 h-11 rounded-xl border border-slate-100 bg-slate-50 group-hover:bg-[#1753c2]/05 group-hover:border-[#1753c2]/20 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <IconComponent className="w-5 h-5 text-slate-500 group-hover:text-[#1753c2] transition-colors duration-300" />
                  </div>

                  {/* Typography Content */}
                  <div className="text-left">
                    <h3 className="font-semibold text-base text-slate-800 group-hover:text-[#1753c2] transition-colors duration-200 flex items-center gap-1.5">
                      {link.title}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                    </h3>
                    <p className="text-xs font-normal mt-0.5 text-slate-500 group-hover:text-slate-600 transition-colors duration-300 line-clamp-1">
                      {link.desc}
                    </p>
                  </div>
                </div>

                {/* Individual Copier Button */}
                <button
                  onClick={(e) => handleCopy(e, link.url, link.id)}
                  title="Copy Link Address"
                  className="shrink-0 relative z-20 p-2.5 rounded-xl border border-transparent bg-slate-50 hover:bg-slate-100 hover:border-slate-200 text-slate-400 hover:text-slate-700 transition-all duration-200"
                >
                  {copiedId === link.id ? (
                    <Check className="w-4 h-4 text-emerald-600 animate-pulse" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
