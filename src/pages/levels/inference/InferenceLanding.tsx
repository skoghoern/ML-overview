// src/pages/levels/inference/InferenceLanding.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlockMath, InlineMath } from "react-katex";
import {
  ArrowLeft,
  ArrowRight,
  GitBranch,
  Users,
  Calculator,
  TrendingUp,
  Scale,
  Target,
  Sigma,
  Mail,
  ChevronDown,
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
    axisLabel: "Exact Point",
    gridPosition: "col-start-1 row-start-1",
    category: "Classical Statistics",
    title: "Exact Frequentist",
    icon: Calculator,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-900 border-blue-200",
    desc: "The textbook solution. We use calculus to derive a single, optimal formula for the weights.",
    examples: "OLS Regression, Least Squares",
    math: "\\hat{\\theta} = (X^TX)^{-1}X^Ty",
    pros: "Fast, Exact, Deterministic.",
    cons: "Impossible for complex/non-linear models (like Neural Nets).",
  },
  {
    id: "bayes-exact",
    axisLabel: "Exact Dist",
    gridPosition: "col-start-2 row-start-1",
    category: "The Theoretical Ideal",
    title: "Exact Bayesian",
    icon: Users,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50 text-indigo-900 border-indigo-200",
    desc: "The 'Holy Grail'. We mathematically derive the full probability distribution without approximation.",
    examples: "Conjugate Priors, Kalman Filters",
    math: "P(\\theta|D) = \\frac{P(D|\\theta)P(\\theta)}{P(D)}",
    pros: "Perfect uncertainty quantification. Optimal learning.",
    cons: "Mathematically intractable for almost all real-world problems.",
  },
  {
    id: "freq-approx",
    axisLabel: "Approx Point",
    gridPosition: "col-start-1 row-start-2",
    category: "Deep Learning Standard",
    title: "Numerical Frequentist",
    icon: TrendingUp,
    color: "bg-teal-500",
    lightColor: "bg-teal-50 text-teal-900 border-teal-200",
    desc: "The workhorse of AI. We can't solve the math, so we use gradients to 'surf' down the error mountain.",
    examples: "SGD, Adam, Backpropagation",
    math: "\\theta_{t+1} = \\theta_t - \\eta \\nabla L(\\theta)",
    pros: "Scales to massive data and deep neural networks.",
    cons: "Point estimate only (no uncertainty). Can get stuck in local optima.",
  },
  {
    id: "bayes-approx",
    axisLabel: "Approx Dist",
    gridPosition: "col-start-2 row-start-2",
    category: "Probabilistic AI",
    title: "Approximate Bayesian",
    icon: GitBranch,
    color: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-900 border-rose-200",
    desc: "The best of both worlds? We want the full distribution, but the math is too hard. So we approximate it.",
    examples: "MCMC, Variational Inference",
    math: "q(\\theta) \\approx P(\\theta|D)",
    pros: "Captures uncertainty for complex models.",
    cons: "Computationally expensive (MCMC) or biased (VI).",
    link: "/level-2/inference/approximate",
  },
];

// --- COMPONENT: BAYES VISUALIZER ---
const BayesVisualizer = () => {
  const [prior, setPrior] = useState(0.4);
  const [likelihoodSpam, setLikelihoodSpam] = useState(0.9);
  const [likelihoodHam, setLikelihoodHam] = useState(0.1);

  const numerator = likelihoodSpam * prior;
  const evidence = numerator + likelihoodHam * (1 - prior);
  const posterior = evidence > 0 ? numerator / evidence : 0;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
      <div className="flex items-center gap-3 text-white border-b border-slate-700 pb-4">
        <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg">
          <Mail size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider">
            Practical Example: The Spam Filter
          </h4>
          <p className="text-xs text-slate-400">
            We received an email containing the word <strong>"Winner"</strong>.
            Is it Spam?
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-purple-300">
              <span>1. Prior Belief P(Spam)</span>
              <span>{(prior * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.99"
              step="0.01"
              value={prior}
              onChange={(e) => setPrior(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-[10px] text-slate-400">
              How common is spam in general?
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-blue-300">
              <span>2. Likelihood P("Winner" | Spam)</span>
              <span>{(likelihoodSpam * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.99"
              step="0.01"
              value={likelihoodSpam}
              onChange={(e) => setLikelihoodSpam(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-[10px] text-slate-400">
              If it IS spam, how likely is this word?
            </p>
          </div>
          <div className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>3. False Positive P("Winner" | Ham)</span>
              <span>{(likelihoodHam * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.99"
              step="0.01"
              value={likelihoodHam}
              onChange={(e) => setLikelihoodHam(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-500"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent" />
          <div className="relative z-10 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Posterior Probability
            </span>
            <div className="text-5xl font-serif font-bold text-white">
              {(posterior * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-400 font-mono mt-2">
              P(Spam | "Winner")
            </div>
            <div className="w-full h-3 bg-slate-700 rounded-full mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${posterior * 100}%` }}
                className={cn(
                  "h-full transition-all duration-300",
                  posterior > 0.8
                    ? "bg-teal-500"
                    : posterior > 0.5
                    ? "bg-amber-500"
                    : "bg-rose-500"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InferenceLanding: React.FC = () => {
  const [activeType, setActiveType] = useState(INFERENCE_TYPES[2]);
  const [isBayesOpen, setIsBayesOpen] = useState(true);

  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* --- HERO HEADER: STACKED VERTICALLY --- */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl mx-auto mb-24 space-y-12"
      >
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold tracking-widest uppercase border border-teal-100">
            <GitBranch size={14} />
            <span>Level 2.2: The Inference</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-ocean-900 leading-tight">
            How do we learn?
          </h1>

          <div className="text-lg text-slate-600 leading-relaxed space-y-6 max-w-2xl mx-auto">
            <p>
              If the <strong>Model</strong> is the map of the territory, then{" "}
              <strong>Inference</strong> is the compass we use to navigate it.
            </p>
            <p>
              In a perfect world, learning is not a mystery. It is a
              mathematical certainty described by{" "}
              <strong>Bayes' Theorem</strong>. It tells us exactly how to update
              our beliefs after seeing new data.
            </p>
          </div>
        </div>

        {/* BAYES CARD: COLLAPSIBLE */}
        <div className="bg-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden border border-slate-700 ring-1 ring-white/10">
          {/* Header / Toggle Button */}
          <button
            onClick={() => setIsBayesOpen(!isBayesOpen)}
            className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white/5 transition-colors text-left focus:outline-none relative z-20"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-teal-200 flex items-center gap-2">
              <Scale size={16} /> The Definition of Learning
            </h3>
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <span>{isBayesOpen ? "Hide" : "Show"} Example</span>
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform duration-300",
                  isBayesOpen && "rotate-180"
                )}
              />
            </div>
          </button>

          <AnimatePresence>
            {isBayesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 md:px-8 md:pb-8 relative z-10">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none -mt-10">
                    <Scale size={240} />
                  </div>

                  <div className="mb-8">
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 mb-6 text-xl md:text-2xl flex justify-center shadow-inner">
                      <BlockMath math="P(\theta|D) = \frac{P(D|\theta)P(\theta)}{P(D)}" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-slate-300 font-mono bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="text-teal-400 font-bold">P(θ|D)</span>
                        <span className="opacity-80">Posterior</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="text-blue-400 font-bold">P(D|θ)</span>
                        <span className="opacity-80">Likelihood</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="text-purple-400 font-bold">P(θ)</span>
                        <span className="opacity-80">Prior</span>
                      </div>
                    </div>
                  </div>

                  <BayesVisualizer />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* --- THE MATRIX: EXPLANATION --- */}
      <section className="space-y-12 mb-16 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-ocean-900 mb-6">
            The Inference Matrix
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            If Bayes' theorem is the answer, why do we have so many different
            algorithms? Because usually,{" "}
            <strong>we cannot solve the integral</strong> in the denominator{" "}
            <InlineMath math="P(D)" />.
          </p>
          <p className="text-lg text-slate-600">
            Therefore, we can categorize every machine learning algorithm by how
            it answers two fundamental questions:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-ocean-500 p-6 rounded-r-xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Target className="text-ocean-600" size={24} />
              <h3 className="font-bold text-ocean-900">
                1. The Goal: Point vs. Distribution
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Do we settle for the single best setting or demand the full range
              of possibilities?
            </p>
          </div>

          <div className="bg-white border-l-4 border-rose-500 p-6 rounded-r-xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Sigma className="text-rose-600" size={24} />
              <h3 className="font-bold text-ocean-900">
                2. The Method: Exact vs. Approximate
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Can we solve the math analytically, or must we guess numerically?
            </p>
          </div>
        </div>
      </section>

      {/* --- THE MATRIX: INTERACTIVE GRID --- */}
      <section className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: THE GRID UI (7 Cols) */}
        <div className="lg:col-span-7">
          {/* Reduced padding p-4 md:p-6 to save space */}
          <div className="bg-slate-50 p-4 md:p-6 rounded-3xl border border-slate-200 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Adjusted Grid Columns: Fixed 1st column width to reduce left margin waste */}
            <div className="relative grid grid-cols-[2rem_1fr_1fr] md:grid-cols-[3rem_1fr_1fr] gap-2 md:gap-4">
              {/* Corner */}
              <div />

              {/* Col Headers */}
              <div className="text-center pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded inline-block">
                  Goal: Point
                </span>
              </div>
              <div className="text-center pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded inline-block">
                  Goal: Dist.
                </span>
              </div>

              {/* Row 1 Header */}
              <div className="flex items-center justify-center min-h-[140px]">
                {/* Vertical Text via writing-mode class equivalent */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                  Method: Exact
                </span>
              </div>

              {/* CELL: EXACT POINT */}
              <MatrixCell
                item={INFERENCE_TYPES[0]}
                isActive={activeType.id === INFERENCE_TYPES[0].id}
                onClick={setActiveType}
              />

              {/* CELL: EXACT DIST */}
              <MatrixCell
                item={INFERENCE_TYPES[1]}
                isActive={activeType.id === INFERENCE_TYPES[1].id}
                onClick={setActiveType}
              />

              {/* Row 2 Header */}
              <div className="flex items-center justify-center min-h-[140px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                  Method: Approx
                </span>
              </div>

              {/* CELL: APPROX POINT */}
              <MatrixCell
                item={INFERENCE_TYPES[2]}
                isActive={activeType.id === INFERENCE_TYPES[2].id}
                onClick={setActiveType}
              />

              {/* CELL: APPROX DIST */}
              <MatrixCell
                item={INFERENCE_TYPES[3]}
                isActive={activeType.id === INFERENCE_TYPES[3].id}
                onClick={setActiveType}
              />
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">
            Select a quadrant to explore
          </p>
        </div>

        {/* RIGHT: DETAIL VIEW (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl min-h-[500px] relative overflow-hidden">
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-2",
                activeType.color
              )}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeType.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {activeType.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn("p-2 rounded-lg", activeType.lightColor)}
                    >
                      <activeType.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight">
                      {activeType.title}
                    </h3>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center font-medium text-slate-700 overflow-x-auto">
                  <BlockMath math={activeType.math} />
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {activeType.desc}
                </p>

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2 mb-1">
                      <TrendingUp size={12} /> The Good
                    </span>
                    <p className="text-sm text-slate-700">{activeType.pros}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-2 mb-1">
                      <Scale size={12} /> The Bad
                    </span>
                    <p className="text-sm text-slate-700">{activeType.cons}</p>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Examples
                    </span>
                    <div className="flex flex-wrap gap-2">
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

                {activeType.link && (
                  <div className="pt-4">
                    <Link
                      to={activeType.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-800 hover:underline transition-all"
                    >
                      Compare Strategies <ArrowRight size={16} />
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

// --- HELPER COMPONENT FOR GRID CELLS ---
// Use min-w-0 to allow shrinking and prevent overflow
const MatrixCell = ({
  item,
  isActive,
  onClick,
}: {
  item: (typeof INFERENCE_TYPES)[0];
  isActive: boolean;
  onClick: (i: any) => void;
}) => {
  return (
    <button
      onClick={() => onClick(item)}
      className={cn(
        "relative p-3 md:p-4 rounded-xl border-2 text-left transition-all duration-300 flex flex-col justify-between group h-full min-h-[140px] min-w-0 overflow-hidden",
        isActive
          ? `border-${
              item.color.split("-")[1]
            }-500 bg-white shadow-lg ring-1 ring-${
              item.color.split("-")[1]
            }-100 z-10 scale-[1.02]`
          : "border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300"
      )}
    >
      <div className="flex justify-between items-start w-full">
        <div
          className={cn(
            "p-2 rounded-lg transition-colors",
            isActive ? item.lightColor : "bg-slate-100 text-slate-400"
          )}
        >
          <item.icon size={18} />
        </div>
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className={cn("w-2 h-2 rounded-full shrink-0 ml-1", item.color)}
          />
        )}
      </div>

      <div className="w-full">
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-widest block mb-1 truncate",
            isActive
              ? "text-slate-500"
              : "text-slate-300 group-hover:text-slate-400"
          )}
        >
          {item.category}
        </span>
        <span
          className={cn(
            "font-bold text-sm leading-tight block break-words",
            isActive ? "text-slate-900" : "text-slate-500"
          )}
        >
          {item.title}
        </span>
      </div>
    </button>
  );
};

export default InferenceLanding;
