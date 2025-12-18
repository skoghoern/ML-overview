// src/pages/intro/Framework.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Box,
  Cpu,
  GitBranch,
  Eye,
  Brain,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Framework: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto pb-32">
      {/* --- HERO HEADER --- */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-8 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 text-ocean-800 text-xs font-bold tracking-widest uppercase border border-ocean-100">
          <Layers size={14} />
          <span>Part III: Structure</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-ocean-900 leading-tight">
          Structuring the Chaos
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-serif">
          How do we organize a chaotic ocean of algorithms into a coherent map?
          Fortunately, we don't need to invent this map from scratch. We can
          stand on the shoulders of giants who have already thought deeply about
          how to define complex information processing systems.
        </p>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-serif">
          To structure this overview, we will synthesize three distinct but
          compatible perspectives: the neuroscientific hierarchy of David Marr,
          the pattern recognition formalism of Christopher Bishop, and the deep
          learning architecture of Yann LeCun.
        </p>
      </motion.header>

      {/* --- THE GIANTS --- */}
      <section className="mb-20">
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">
            Synthesizing Three Perspectives
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="font-serif font-bold text-ocean-900 text-lg">
                David Marr
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Neuroscience
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Provided the vertical{" "}
                <strong>Hierarchy of Understanding</strong>, arguing that
                systems must be analyzed at the Computational, Algorithmic, and
                Implementation levels.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-serif font-bold text-ocean-900 text-lg">
                Chris Bishop
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Pattern Recognition
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Decomposed learning into <strong>Model + Inference</strong>. The
                Model is the structure; Inference is how we learn variables
                within that structure.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-serif font-bold text-ocean-900 text-lg">
                Yann LeCun
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Deep Learning
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Added the engineering reality:{" "}
                <strong>Architecture + Algorithm + Loss Function</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE UNIFIED FRAMEWORK VISUALIZATION --- */}
      <section className="relative space-y-16">
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-ocean-100 via-ocean-200 to-transparent dashed -z-10" />

        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-ocean-900">
            The Unified Framework
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">
            By combining these perspectives, we arrive at a "Framework for
            Frameworks" that allows us to dissect any intelligence
            system—biological or artificial.
          </p>
        </div>

        {/* LEVEL 1: COMPUTATIONAL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative pl-20 md:pl-28"
        >
          <div className="absolute left-0 md:left-4 top-0 flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-ocean-100 text-ocean-900 font-serif text-2xl font-bold shadow-sm z-10">
            1
          </div>
          <div className="bg-white border border-ocean-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-ocean-50/50 p-6 border-b border-ocean-100">
              <div className="flex items-center gap-3 text-ocean-900 mb-1">
                <Box className="text-ocean-600" size={24} />
                <h3 className="text-2xl font-bold font-serif">
                  The Computational Goal
                </h3>
              </div>
              <p className="text-ocean-800/80 font-medium italic pl-9">
                "The Why" — What is the objective?
              </p>
            </div>
            <div className="p-6 md:p-8 space-y-4">
              <p className="text-slate-700 leading-relaxed">
                Before we write code, we must define the problem. What is the
                specific goal of the computation?
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <strong className="block text-slate-900 mb-1">
                    In Deep Learning:
                  </strong>
                  Minimizing a <strong>Loss Function</strong> (e.g., Mean
                  Squared Error).
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <strong className="block text-slate-900 mb-1">
                    In Biology:
                  </strong>
                  Maximizing <strong>Survival</strong> (or technically, Model
                  Evidence).
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LEVEL 2: ALGORITHMIC */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative pl-20 md:pl-28"
        >
          <div className="absolute left-0 md:left-4 top-0 flex items-center justify-center w-16 h-16 rounded-full bg-ocean-900 border-4 border-ocean-100 text-white font-serif text-2xl font-bold shadow-md z-10">
            2
          </div>
          <div className="bg-gradient-to-br from-indigo-50/30 to-white border border-indigo-100 rounded-xl shadow-md ring-1 ring-indigo-50/50 overflow-hidden">
            <div className="bg-indigo-50/50 p-6 border-b border-indigo-100">
              <div className="flex items-center gap-3 text-indigo-900 mb-1">
                <Brain className="text-indigo-600" size={24} />
                <h3 className="text-2xl font-bold font-serif">
                  The Algorithmic Solution
                </h3>
              </div>
              <p className="text-indigo-800/80 font-medium italic pl-9">
                "The How" — The Engine Room
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed">
                This is where things usually get messy. Following Bishop and
                LeCun, we must split this into two critical parts that are often
                confused:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* The Model */}
                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm hover:border-indigo-300 transition-colors">
                  <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2 text-lg">
                    <Eye size={20} className="text-indigo-500" /> The Model
                  </h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Representation
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    The structure we impose on the world. This is the "map" the
                    fish carries in its head.
                    <br />
                    <span className="italic text-slate-500 mt-2 block">
                      (e.g., Neural Network, Gaussian, Graphical Model)
                    </span>
                  </p>
                </div>

                {/* The Inference */}
                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm hover:border-indigo-300 transition-colors">
                  <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2 text-lg">
                    <GitBranch size={20} className="text-indigo-500" /> The
                    Inference
                  </h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Process
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    How the system acts to update the map. The dynamic process
                    of learning.
                    <br />
                    <span className="italic text-slate-500 mt-2 block">
                      (e.g., Backpropagation, Variational Inference)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LEVEL 3: IMPLEMENTATION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative pl-20 md:pl-28 opacity-70 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="absolute left-0 md:left-4 top-0 flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 border-4 border-slate-50 text-slate-400 font-serif text-2xl font-bold z-10">
            3
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2 text-slate-500">
              <Cpu size={24} />
              <h3 className="text-xl font-bold font-serif">
                The Implementation
              </h3>
            </div>
            <p className="text-slate-500 italic mb-4">
              "The Hardware" — Silicon vs. Wetware
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              Abstracted away for this series. Whether the math runs on a GPU or
              biological neurons is a fascinating detail, but it doesn't change
              the underlying logic of intelligence.
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- WHY IT MATTERS (THE FORMULA) --- */}
      <section className="mt-24 bg-ocean-900 text-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/3 translate-y-1/3">
          <Layers size={400} />
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex items-start gap-4 mb-8">
            <Quote className="text-ocean-300 shrink-0 transform rotate-180" />
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">
                Why This Distinction Matters
              </h3>
              <p className="text-ocean-100 leading-relaxed text-lg">
                Separating the <strong>Model</strong> from the{" "}
                <strong>Inference</strong> is the key to "seeing the water."
                Many practitioners conflate them. For example, saying "I used a
                Neural Network" describes the Model, but usually implies the
                Inference (Backprop).
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
            <p className="text-center text-ocean-200 uppercase tracking-widest text-xs font-bold mb-4">
              The Unified Formula
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-serif font-bold">
              <span>System</span>
              <span className="text-ocean-400">=</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg">
                Objective
              </span>
              <span className="text-ocean-400">+</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg">Model</span>
              <span className="text-ocean-400">+</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg">
                Inference
              </span>
            </div>
          </div>

          <p className="text-center text-ocean-200 mt-6 italic">
            By systematically asking these three questions, we can strip away
            complexity and compare distinct paradigms side-by-side.
          </p>
        </div>
      </section>

      {/* --- CTA TO LEVEL 1 --- */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-20">
        <Link
          to="/intro/approach"
          className="group flex flex-col items-start gap-1"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Previous
          </span>
          <span className="text-lg font-serif font-bold text-slate-600 group-hover:text-ocean-900 flex items-center gap-2 transition-all">
            ← II. The Approach
          </span>
        </Link>

        <Link
          to="/level-1"
          className="group flex items-center gap-4 bg-ocean-900 text-white pl-6 pr-2 py-2 rounded-full hover:bg-ocean-800 transition-all shadow-lg hover:shadow-ocean-900/20"
        >
          <div className="text-left">
            <span className="block text-[10px] font-bold tracking-widest text-ocean-300 uppercase">
              Start the journey
            </span>
            <span className="font-serif font-bold text-lg">
              Level 1: The Goal
            </span>
          </div>
          <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
            <ArrowRight size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Framework;
