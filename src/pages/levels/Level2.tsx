// src/pages/levels/Level2.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Map,
  Eye,
  GitBranch,
  Cpu,
  Variable,
  Settings,
  Network,
  Search,
} from "lucide-react";
import { cn } from "../../lib/utils";

// --- CONFIGURATION ---
// We define the topology coordinates once so Model & Inference align perfectly.
const TOPOLOGY = {
  nodes: [
    { id: "input-1", x: 100, y: 50 }, // Top Left
    { id: "input-2", x: 220, y: 50 }, // Top Right
    { id: "hidden", x: 160, y: 140 }, // Center
    { id: "output", x: 160, y: 230 }, // Bottom
  ],
  edges: [
    { from: 0, to: 2 }, // Input 1 -> Hidden
    { from: 1, to: 2 }, // Input 2 -> Hidden
    { from: 2, to: 3 }, // Hidden -> Output
  ],
};

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } },
};

const Level2: React.FC = () => {
  const [activePart, setActivePart] = useState<"model" | "inference">("model");

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* --- HERO HEADER --- */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-8 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 text-ocean-800 text-xs font-bold tracking-widest uppercase border border-ocean-100">
          <Map size={14} />
          <span>Level 2: The Algorithm</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-ocean-900 leading-tight">
          The Algorithmic Solution
        </h1>

        <div className="text-lg text-slate-600 leading-relaxed space-y-6">
          <p>
            Once we have defined <strong>The Goal</strong> (Level 1), we must
            define the machine that will achieve it.
          </p>
          <p>
            In the messy real world of coding, "the algorithm" is often treated
            as a black box. However, Christopher Bishop argues that for a true
            mathematical understanding, we must slice this box in half:
            distinguishing the <strong>Representation</strong> from the{" "}
            <strong>Process</strong>.
          </p>
        </div>
      </motion.header>

      {/* --- INTERACTIVE BISHOP'S EQUATION --- */}
      <section className="mb-24">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-800">
          {/* 1. The Header / Equation Toggle */}
          <div className="bg-slate-950/50 p-8 md:p-12 text-center border-b border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
              Interactive Decomposition
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 font-serif text-2xl md:text-4xl font-bold text-white">
              <span className="opacity-40 select-none">Algorithm</span>
              <span className="text-ocean-500">=</span>

              {/* Model Button */}
              <button
                onClick={() => setActivePart("model")}
                className={cn(
                  "relative px-6 py-3 rounded-xl border transition-all duration-300",
                  activePart === "model"
                    ? "bg-blue-500/10 border-blue-500 text-blue-100 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                )}
              >
                Model
                {activePart === "model" && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-4 left-0 right-0 h-1 bg-blue-500 rounded-full"
                  />
                )}
              </button>

              <span className="text-ocean-500">+</span>

              {/* Inference Button */}
              <button
                onClick={() => setActivePart("inference")}
                className={cn(
                  "relative px-6 py-3 rounded-xl border transition-all duration-300",
                  activePart === "inference"
                    ? "bg-teal-500/10 border-teal-500 text-teal-100 shadow-[0_0_30px_-5px_rgba(20,184,166,0.3)]"
                    : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                )}
              >
                Inference
                {activePart === "inference" && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-4 left-0 right-0 h-1 bg-teal-500 rounded-full"
                  />
                )}
              </button>
            </div>
          </div>

          {/* 2. The Visualizer Window */}
          <div className="grid md:grid-cols-2 min-h-[400px]">
            {/* LEFT: VISUALIZATION CANVAS */}
            <div className="bg-slate-900 relative flex items-center justify-center border-r border-slate-800 overflow-hidden select-none">
              {/* Grid Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(#64748b 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* UNIFIED SVG CANVAS (320x320) */}
              <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                className="relative z-10 overflow-visible"
              >
                <AnimatePresence mode="wait">
                  {activePart === "model" ? (
                    <motion.g key="model-group">
                      {/* EDGES: Draw Lines */}
                      {TOPOLOGY.edges.map((edge, i) => {
                        const start = TOPOLOGY.nodes[edge.from];
                        const end = TOPOLOGY.nodes[edge.to];
                        return (
                          <motion.path
                            key={`edge-${i}`}
                            d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                            fill="none"
                            stroke="#3b82f6" // blue-500
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                          />
                        );
                      })}

                      {/* NODES: Pop In */}
                      {TOPOLOGY.nodes.map((node, i) => (
                        <motion.circle
                          key={`node-${i}`}
                          cx={node.x}
                          cy={node.y}
                          r="8"
                          fill="#1e293b" // slate-900
                          stroke="#60a5fa" // blue-400
                          strokeWidth="3"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            bounce: 0.5,
                            delay: 0.5 + i * 0.1,
                          }}
                        />
                      ))}
                    </motion.g>
                  ) : (
                    <motion.g key="inference-group">
                      {/* GHOST TOPOLOGY (Faded) */}
                      {TOPOLOGY.edges.map((edge, i) => {
                        const start = TOPOLOGY.nodes[edge.from];
                        const end = TOPOLOGY.nodes[edge.to];
                        return (
                          <path
                            key={`ghost-edge-${i}`}
                            d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                            fill="none"
                            stroke="#334155" // slate-700
                            strokeWidth="2"
                            strokeOpacity="0.5"
                          />
                        );
                      })}
                      {TOPOLOGY.nodes.map((node, i) => (
                        <circle
                          key={`ghost-node-${i}`}
                          cx={node.x}
                          cy={node.y}
                          r="6"
                          fill="#0f172a" // slate-950
                          stroke="#334155" // slate-700
                          strokeWidth="2"
                        />
                      ))}

                      {/* ACTIVE PARTICLES (Inference Flow) */}
                      {/* Particle 1: Left Input -> Hidden -> Output */}
                      <motion.circle
                        r="5"
                        fill="#2dd4bf" // teal-400
                        filter="url(#glow)"
                      >
                        <animateMotion
                          dur="3s"
                          repeatCount="indefinite"
                          path={`M ${TOPOLOGY.nodes[0].x} ${TOPOLOGY.nodes[0].y} L ${TOPOLOGY.nodes[2].x} ${TOPOLOGY.nodes[2].y} L ${TOPOLOGY.nodes[3].x} ${TOPOLOGY.nodes[3].y}`}
                          keyPoints="0;0.5;1"
                          keyTimes="0;0.6;1"
                          calcMode="linear"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          keyTimes="0;0.1;0.9;1"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </motion.circle>

                      {/* Particle 2: Right Input -> Hidden -> Output (Delayed) */}
                      <motion.circle
                        r="5"
                        fill="#2dd4bf" // teal-400
                        filter="url(#glow)"
                        opacity="0"
                      >
                        <animateMotion
                          begin="1.5s"
                          dur="3s"
                          repeatCount="indefinite"
                          path={`M ${TOPOLOGY.nodes[1].x} ${TOPOLOGY.nodes[1].y} L ${TOPOLOGY.nodes[2].x} ${TOPOLOGY.nodes[2].y} L ${TOPOLOGY.nodes[3].x} ${TOPOLOGY.nodes[3].y}`}
                        />
                        <animate
                          attributeName="opacity"
                          begin="1.5s"
                          values="0;1;1;0"
                          keyTimes="0;0.1;0.9;1"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </motion.circle>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* SVG Filters for Glow Effect */}
                <defs>
                  <filter
                    id="glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Label at bottom of canvas */}
              <div className="absolute bottom-6 w-full text-center">
                <span
                  className={cn(
                    "text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors duration-500",
                    activePart === "model"
                      ? "text-blue-400 bg-blue-950/50 border-blue-500/20"
                      : "text-teal-400 bg-teal-950/50 border-teal-500/20"
                  )}
                >
                  {activePart === "model" ? "Architecture" : "Process"}
                </span>
              </div>
            </div>

            {/* RIGHT: EXPLANATION TEXT */}
            <div className="p-10 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activePart === "model" ? (
                  <motion.div
                    key="model-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 text-blue-400 mb-2">
                      <Network size={24} />
                      <h3 className="text-xl font-bold font-serif text-white">
                        The Structure
                      </h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                      The{" "}
                      <span className="text-blue-200 font-bold">
                        Model Architecture
                      </span>{" "}
                      defines the structure of the decision-making process. It
                      is the static architecture—the "map" of the world.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mt-4">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">
                        Examples
                      </p>
                      <p className="text-slate-300 font-mono text-sm">
                        Neural Network, Gaussian Process, Linear Equation
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="inference-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 text-teal-400 mb-2">
                      <Search size={24} />
                      <h3 className="text-xl font-bold font-serif text-white">
                        The Process
                      </h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                      The{" "}
                      <span className="text-teal-200 font-bold">
                        Inference Method
                      </span>{" "}
                      is the explorer navigating that landscape. It is the
                      dynamic algorithm that searches for the best parameters
                      ("flow of information").
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mt-4">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">
                        Examples
                      </p>
                      <p className="text-slate-300 font-mono text-sm">
                        Backpropagation, Variational Inference, MCMC
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPLIT PATHS (CARDS) --- */}
      <section className="grid md:grid-cols-2 gap-8 mb-24">
        {/* CARD 1: THE MODEL */}
        <Link to="/level-2/model" className="block h-full">
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="h-full bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden group relative"
          >
            {/* Top Color Bar */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />

            <div className="p-8 space-y-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Eye size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  The Model
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Architecture & Representation
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Dive deeper into the different ways we can represent reality
                mathematically, from Neural Networks to Graphical Models.
              </p>

              <div className="pt-4 border-t border-slate-100">
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <Variable size={14} className="text-blue-400" /> Neural
                    Networks
                  </li>
                  <li className="flex items-center gap-2">
                    <Variable size={14} className="text-blue-400" /> Gaussian
                    Processes
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-4 transition-all">
                Explore Architecture <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>
        </Link>

        {/* CARD 2: THE INFERENCE */}
        <Link to="/level-2/inference" className="block h-full">
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="h-full bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden group relative"
          >
            {/* Top Color Bar */}
            <div className="h-2 bg-gradient-to-r from-teal-400 to-emerald-500" />

            <div className="p-8 space-y-6">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <GitBranch size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  The Inference
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Learning & Dynamics
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Understand how we move through the model's landscape. Compare
                Backpropagation with Bayesian methods.
              </p>

              <div className="pt-4 border-t border-slate-100">
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <Settings size={14} className="text-teal-400" />{" "}
                    Backpropagation
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings size={14} className="text-teal-400" /> Variational
                    Inference
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-teal-600 font-bold text-sm group-hover:gap-4 transition-all">
                Explore Methods <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* --- INFO ALERT --- */}
      <div className="bg-amber-50 border-l-4 border-amber-300 p-6 md:p-8 rounded-r-lg mb-16">
        <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
          <Cpu size={18} />
          Why separate them?
        </h4>
        <p className="text-amber-800 leading-relaxed">
          In deep learning, the model (Architecture) and inference (Backprop)
          are so tightly coupled we often forget they are distinct. In
          probabilistic ML (like Active Inference), we can mix and match: use
          the <em>same</em> model, but switch the inference method to see what
          happens.
        </p>
      </div>

      {/* --- NAVIGATION FOOTER --- */}
      <div className="flex justify-between pt-10 border-t border-slate-200">
        <Link to="/level-1" className="group flex flex-col items-start gap-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Previous Level
          </span>
          <span className="text-lg font-serif font-bold text-slate-600 group-hover:text-ocean-900 flex items-center gap-2 transition-all">
            <ArrowLeft size={20} /> Level 1: The Goal
          </span>
        </Link>

        {/* Placeholder for future levels */}
        <div className="opacity-40 flex flex-col items-end gap-1 text-right select-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Coming Soon
          </span>
          <span className="text-lg font-serif font-bold text-slate-400 flex items-center gap-2">
            Level 3: Implementation
          </span>
        </div>
      </div>
    </div>
  );
};

export default Level2;
