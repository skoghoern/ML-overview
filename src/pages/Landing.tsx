// src/pages/Landing.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Map, Compass, Anchor } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-10rem)] pt-16 md:pt-32 text-center max-w-4xl mx-auto px-6">
      {/* --- HERO --- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-8 mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-ocean-900 tracking-tight leading-tight">
          Ocean of
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-ocean-600 to-ocean-900">
            Intelligence
          </span>
        </h1>

        <p className="text-xl text-slate-600 font-serif max-w-2xl mx-auto leading-relaxed">
          Machine Learning, Unified. An interactive guide to the intersection of
          Neuroscience, Statistics, and Deep Learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/intro/motivation"
            className="group relative inline-flex items-center justify-center gap-3 bg-ocean-900 text-white px-8 py-4 rounded-full text-lg font-bold transition-transform hover:-translate-y-1 hover:shadow-xl shadow-ocean-900/20"
          >
            <span>Start Reading</span>
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </Link>
        </div>
      </motion.div>

      {/* --- CHAPTER PREVIEWS --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-6 w-full text-left"
      >
        {/* Card 1 */}
        <Link
          to="/intro/motivation"
          className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-ocean-200 transition-all"
        >
          <div className="w-10 h-10 bg-ocean-50 text-ocean-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Compass size={20} />
          </div>
          <h3 className="font-serif font-bold text-lg text-ocean-900 mb-2">
            I. The Motivation
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            "What is water?" Understanding the blind spots in current ML
            paradigms.
          </p>
        </Link>

        {/* Card 2 */}
        <Link
          to="/intro/framework"
          className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-ocean-200 transition-all"
        >
          <div className="w-10 h-10 bg-ocean-50 text-ocean-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Map size={20} />
          </div>
          <h3 className="font-serif font-bold text-lg text-ocean-900 mb-2">
            II. The Framework
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Marr, Bishop, and LeCun. A unified formula for intelligence systems.
          </p>
        </Link>

        {/* Card 3 */}
        <Link
          to="/level-1"
          className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-ocean-200 transition-all"
        >
          <div className="w-10 h-10 bg-ocean-50 text-ocean-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Anchor size={20} />
          </div>
          <h3 className="font-serif font-bold text-lg text-ocean-900 mb-2">
            III. The Levels
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            From Computational Goals to Algorithmic Implementation.
          </p>
        </Link>
      </motion.div>
    </div>
  );
};

export default Landing;
