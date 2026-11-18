// src/pages/intro/Approach.tsx
import React from "react";
import { motion } from "framer-motion";
import {
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
import { LessonNav } from "../../components/lesson/LessonNav";
import { PageHeader } from "../../components/lesson/PageHeader";

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
      <PageHeader title="Building a Map">
        <p>
          If we accept the premise that true mastery requires{" "}
          <strong className="text-ocean-900">Analysis</strong> and{" "}
          <strong className="text-ocean-900">Evaluation</strong>, then we
          cannot simply list algorithms in isolation. We need a map.
        </p>
        <p className="text-base text-slate-500">
          This page provides a structured, high-level overview of the current
          Machine Learning landscape. While we will ground our comparison in
          mathematics and physics, our primary focus remains conceptual.
        </p>
      </PageHeader>

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
                What this page is NOT
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
                  What this page IS
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

      <LessonNav />
    </div>
  );
};

export default Approach;
