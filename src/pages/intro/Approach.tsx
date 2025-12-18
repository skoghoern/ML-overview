// src/pages/intro/Approach.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Search,
  Anchor,
  Zap,
  Map as MapIcon,
  XCircle,
  CheckCircle,
  Book,
  Code,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Approach: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto pb-32">
      {/* --- HEADER --- */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 text-ocean-800 text-xs font-bold tracking-widest uppercase border border-ocean-100">
          <Compass size={14} />
          <span>Part II: The Approach</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-ocean-900 leading-tight">
          Building a Map
        </h1>
        <div className="text-lg md:text-xl text-slate-600 leading-relaxed space-y-6">
          <p>
            If we accept the premise that true mastery requires{" "}
            <strong className="text-ocean-900">Analysis</strong> and{" "}
            <strong className="text-ocean-900">Evaluation</strong>, then we
            cannot simply list algorithms in isolation. We need a map.
          </p>
          <p className="text-base text-slate-500">
            This post provides a structured, high-level overview of the current
            Machine Learning landscape. While we will ground our comparison in
            mathematics and physics, our primary focus remains conceptual.
          </p>
        </div>
      </motion.header>

      {/* --- WHAT THIS IS NOT / IS --- */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-8"
      >
        {/* NOT CARD */}
        <motion.div
          variants={item}
          className="bg-white border border-rose-100 rounded-xl p-8 md:p-10 shadow-sm relative overflow-hidden group hover:shadow-md hover:border-rose-200 transition-all"
        >
          <div className="absolute -top-6 -right-6 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12">
            <XCircle size={200} className="text-rose-900" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
                <XCircle size={24} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-rose-900">
                What this post is NOT
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To manage expectations: this is not a deep-dive tutorial into
                the mechanics or syntax of individual methods. The internet (and
                your favorite LLM) is already overflowing with excellent
                resources for that.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-rose-800/80 bg-rose-50/50 px-3 py-2 rounded-lg">
                  <Code size={16} /> <span>No granular Python code</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-rose-800/80 bg-rose-50/50 px-3 py-2 rounded-lg">
                  <Globe size={16} /> <span>No hyperparameter guides</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* IS CARD */}
        <motion.div
          variants={item}
          className="bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-100 rounded-xl p-8 md:p-10 shadow-md relative overflow-hidden group hover:border-emerald-200 transition-all"
        >
          <div className="absolute -top-6 -right-6 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12">
            <CheckCircle size={200} className="text-emerald-900" />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-900">
                  What this post IS
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  We focus on <strong>connections and contrasts</strong>. Just
                  as the fish who discover water gain a new perspective, we aim
                  to see the underlying assumptions of our models. We are
                  building a map, not examining every grain of sand.
                </p>
              </div>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-emerald-100/50">
              <div className="bg-white p-5 rounded-xl border border-emerald-100/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
                    <Search size={16} />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-sm">
                    Differentiate
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equip you to spot subtle differences in how algorithms
                  perceive and act on data.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-100/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
                    <Anchor size={16} />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-sm">
                    Connect
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bridge the gap between disparate fields (like RL and
                  Generative Models).
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-100/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
                    <Zap size={16} />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-sm">
                    Innovate
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Spark ideas for what could exist in the future by seeing the
                  gaps.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* --- QUOTE / AGI --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 bg-ocean-900 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <MapIcon size={300} />
        </div>

        <div className="relative z-10 flex gap-6">
          <Book
            className="flex-shrink-0 text-ocean-300 hidden md:block"
            size={32}
          />
          <div className="space-y-4">
            <p className="text-lg md:text-xl font-serif leading-relaxed text-ocean-50 opacity-90 italic">
              "By understanding the strengths and blind spots of our current
              tools, we are better positioned to think about the future—and
              perhaps what is truly needed to achieve AGI."
            </p>
          </div>
        </div>
      </motion.section>

      {/* --- NAV --- */}
      <div className="flex justify-between pt-10 mt-16 border-t border-slate-200">
        <Link
          to="/intro/motivation"
          className="group flex flex-col items-start gap-1"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Previous
          </span>
          <span className="text-lg font-serif font-bold text-slate-600 group-hover:text-ocean-900 flex items-center gap-2 transition-all">
            ← I. The Motivation
          </span>
        </Link>

        <Link
          to="/intro/framework"
          className="group flex flex-col items-end gap-1 text-right"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Next Lesson
          </span>
          <span className="text-xl font-serif font-bold text-ocean-900 flex items-center gap-2 group-hover:gap-4 transition-all">
            III. The Framework <ArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Approach;
