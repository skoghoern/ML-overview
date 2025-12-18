import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlockMath } from "react-katex";
import {
  ArrowLeft,
  ArrowRight,
  GitBranch,
  Users,
  Cpu,
  Calculator,
  Move,
  TrendingUp,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- DATA: THE INFERENCE MATRIX ---
const INFERENCE_TYPES = [
  {
    id: "freq-exact",
    category: "III. Exact Frequentist",
    title: "Analytic Point Estimates",
    icon: Calculator,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-900 border-blue-200",
    desc: "The textbook solution. We use calculus to derive a single, optimal formula for the weights.",
    examples: "OLS Regression, MLE (Simple Models)",
    math: "\\hat{\\theta} = (X^TX)^{-1}X^Ty",
    pros: "Fast, Exact, No iteration needed.",
    cons: "Impossible for complex/non-linear models (like Neural Nets).",
  },
  {
    id: "bayes-exact",
    category: "I. Exact Bayesian",
    title: "Closed-Form Posteriors",
    icon: Users,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50 text-indigo-900 border-indigo-200",
    desc: "The 'Holy Grail'. We mathematically derive the full probability distribution without approximation.",
    examples: "Conjugate Priors (Beta-Binomial), Kalman Filters",
    math: "P(\\theta|D) = \\frac{P(D|\\theta)P(\\theta)}{P(D)}",
    pros: "Perfect uncertainty quantification.",
    cons: "Mathematically restricted to very simple, specific model pairs.",
  },
  {
    id: "freq-approx",
    category: "IV. Numerical Frequentist",
    title: "Optimization (The Engine)",
    icon: TrendingUp,
    color: "bg-teal-500",
    lightColor: "bg-teal-50 text-teal-900 border-teal-200",
    desc: "The workhorse of Deep Learning. We can't solve the math, so we use gradients to 'surf' down the error mountain.",
    examples: "SGD, Adam, Backpropagation",
    math: "\\theta_{t+1} = \\theta_t - \\eta \\nabla L(\\theta)",
    pros: "Scales to massive data and deep neural networks.",
    cons: "Point estimate only (no uncertainty). Can get stuck in local optima.",
  },
  {
    id: "bayes-approx",
    category: "II. Approximate Bayesian",
    title: "Sampling & Variational",
    icon: GitBranch,
    color: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-900 border-rose-200",
    desc: "The best of both worlds? We want the full distribution, but the math is too hard. So we approximate it.",
    examples: "MCMC, Variational Inference",
    math: "q(\\theta) \\approx P(\\theta|D)",
    pros: "Captures uncertainty for complex models.",
    cons: "Computationally expensive (MCMC) or biased (VI).",
    link: "/level-2/inference/approximate", // Special link for this one
  },
];

const InferenceLanding: React.FC = () => {
  const [activeType, setActiveType] = useState(INFERENCE_TYPES[2]); // Default to Numerical Freq (DL)

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* --- HERO HEADER --- */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-8 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold tracking-widest uppercase border border-teal-100">
          <GitBranch size={14} />
          <span>Level 2.2: The Inference</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-ocean-900 leading-tight">
          How do we learn?
        </h1>

        <div className="text-lg text-slate-600 leading-relaxed space-y-6 max-w-3xl">
          <p>
            If the <strong>Model</strong> is the map of the territory, then{" "}
            <strong>Inference</strong> is the compass we use to navigate it.
          </p>
          <p>
            We have defined <em>what</em> we want (The Goal) and <em>how</em> we
            represent the world (The Model). Now, we must define the algorithm
            that actually finds the best parameters.
          </p>
        </div>
      </motion.header>

      {/* --- THE ENGINE: GRADIENTS --- */}
      <section className="mb-24">
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-slate-300 relative overflow-hidden">
          {/* Decorative BG */}
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Move size={300} />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                <Cpu className="text-teal-400" />
                The Engine: Optimization
              </h2>
              <p className="leading-relaxed text-lg">
                Before we choose a strategy, we need an engine. For 99% of
                modern AI (Categories II and IV), we cannot solve the problem on
                paper. We must <strong>search</strong>.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Search size={20} className="text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                      Gradient Calculators
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      Tools like PyTorch use <em>Automatic Differentiation</em>{" "}
                      to tell us the "slope" of the landscape at any point. This
                      is our compass direction.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <TrendingUp size={20} className="text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                      Optimization Methods
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      Algorithms like <strong>SGD</strong> or{" "}
                      <strong>Adam</strong> decide how big of a step to take in
                      that direction. They are the engine that moves us forward.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual: The Gradient Formula */}
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 flex flex-col items-center justify-center text-center space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                The Update Rule
              </span>
              <BlockMath math="\theta_{new} = \theta_{old} - \eta \cdot \nabla_{\theta} J(\theta)" />
              <div className="text-sm text-slate-400">
                <span className="text-teal-400 font-bold">New Spot</span> ={" "}
                <span className="text-white font-bold">Old Spot</span> - (
                <span className="text-amber-400 font-bold">Step Size</span> ×{" "}
                <span className="text-rose-400 font-bold">Slope</span>)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE MATRIX: INTERACTIVE GRID --- */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-ocean-900">
              The Inference Landscape
            </h2>
            <p className="text-slate-600 mt-2">
              We can categorize every inference algorithm by two questions:
            </p>
          </div>
          <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <span className="px-3 py-1 bg-slate-100 rounded">
              Goal: Point vs Dist.
            </span>
            <span className="px-3 py-1 bg-slate-100 rounded">
              Method: Exact vs Approx.
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* THE GRID (Left Side) */}
          <div className="grid grid-cols-2 gap-4">
            {INFERENCE_TYPES.map((type) => {
              const isActive = activeType.id === type.id;
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "relative flex flex-col p-6 rounded-xl border-2 text-left transition-all duration-300 group",
                    isActive
                      ? `border-${
                          type.color.split("-")[1]
                        }-500 bg-white shadow-xl scale-105 z-10`
                      : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors",
                      isActive
                        ? type.lightColor
                        : "bg-slate-200 text-slate-500 group-hover:bg-white"
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        isActive ? "text-slate-500" : "text-slate-400"
                      )}
                    >
                      {type.category}
                    </span>
                    <h3
                      className={cn(
                        "font-bold leading-tight",
                        isActive ? "text-slate-900" : "text-slate-600"
                      )}
                    >
                      {type.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* THE DETAILS (Right Side) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeType.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", activeType.lightColor)}>
                    <activeType.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    {activeType.title}
                  </h3>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center font-medium text-slate-700">
                  <BlockMath math={activeType.math} />
                </div>

                <p className="text-slate-600 leading-relaxed text-lg">
                  {activeType.desc}
                </p>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Pros
                      </span>
                      <p className="text-sm text-emerald-700 font-medium mt-1">
                        {activeType.pros}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Cons
                      </span>
                      <p className="text-sm text-rose-700 font-medium mt-1">
                        {activeType.cons}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Examples
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activeType.examples.split(",").map((ex, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200"
                        >
                          {ex.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Optional Link for Approx Methods */}
                {activeType.link && (
                  <div className="pt-4">
                    <Link
                      to={activeType.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-800 hover:underline transition-all"
                    >
                      Deep Dive: MCMC vs VI <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- NAVIGATION FOOTER --- */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-24">
        <Link to="/level-2" className="group flex flex-col items-start gap-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Back
          </span>
          <span className="text-lg font-serif font-bold text-slate-600 group-hover:text-ocean-900 flex items-center gap-2 transition-all">
            <ArrowLeft size={20} /> Level 2: The Algorithm
          </span>
        </Link>

        <Link
          to="/level-2/inference/approximate"
          className="group flex flex-col items-end gap-1 text-right"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Next Lesson
          </span>
          <span className="text-xl font-serif font-bold text-ocean-900 flex items-center gap-2 group-hover:gap-4 transition-all">
            2.2.1 Approx. Methods <ArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default InferenceLanding;
