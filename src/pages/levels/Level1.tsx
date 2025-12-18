// src/pages/levels/Level1.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InlineMath, BlockMath } from "react-katex";
import {
  ArrowRight,
  ArrowLeft,
  Anchor,
  Target,
  Scale,
  Users,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sigma,
  MousePointerClick,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

// --- DATA: THE 4 COMPUTATIONAL GOALS ---
const GOALS = [
  {
    id: "mle",
    title: "1. Type I MLE",
    subtitle: "Maximum Likelihood Estimation",
    phrase: "Fitting the Weights",
    icon: Target,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-900 border-blue-200",
    description:
      "The simplest goal: Find the specific parameters (weights) that make the observed data most likely.",
    logic:
      "I assume my model structure is perfect. I just want to find the exact settings that minimize the error between prediction and reality.",
    math: "\\theta_{MLE} = \\underset{\\theta}{\\operatorname{argmax}} \\; P(D|\\theta)",
    mathPlain: "Maximize Probability of Data given Parameters",
    trap: {
      title: "Overfitting",
      desc: "It will happily use complexity to 'memorize' noise rather than learning the signal.",
    },
    actInfConnection:
      "Deep Learning mostly lives here (Loss Function minimization).",
  },
  {
    id: "map",
    title: "2. MAP",
    subtitle: "Maximum A Posteriori",
    phrase: "Fitting with Restraint",
    icon: Anchor,
    color: "bg-purple-500",
    lightColor: "bg-purple-50 text-purple-900 border-purple-200",
    description:
      "Adds 'common sense' to MLE by introducing a Prior belief that parameters shouldn't be extreme.",
    logic:
      "I want to fit the data, but I'm anchoring my parameters to prevent them from becoming too wild.",
    math: "\\theta_{MAP} = \\underset{\\theta}{\\operatorname{argmax}} \\; P(D|\\theta)P(\\theta)",
    mathPlain: "Maximize Likelihood × Prior",
    trap: {
      title: "Limited Scope",
      desc: "Prevents weight explosion, but doesn't tell you if the Model Architecture itself is wrong.",
    },
    actInfConnection: "Deep Learning with Weight Decay (L2 Regularization).",
  },
  {
    id: "evidence",
    title: "3. Type II MLE",
    subtitle: "Evidence Maximization",
    phrase: "Finding the Best Model",
    icon: Scale,
    color: "bg-teal-500",
    lightColor: "bg-teal-50 text-teal-900 border-teal-200",
    description:
      "A higher-order goal. We aren't just looking for weights; we are selecting the Model Architecture itself.",
    logic:
      "I need to calculate which Model Structure makes the data most probable, penalizing unnecessary complexity.",
    math: "M^* = \\underset{M}{\\operatorname{argmax}} \\; P(D|M)",
    mathPlain: "Maximize Marginal Likelihood (Evidence)",
    trap: {
      title: "Occam's Razor",
      desc: "This isn't a trap! It naturally penalizes complexity. A complex model spreads its probability mass too thin.",
    },
    actInfConnection:
      "The home of Active Inference. Minimizing Free Energy is a proxy for maximizing Model Evidence.",
  },
  {
    id: "bayes",
    title: "4. Full Bayesian",
    subtitle: "Model Averaging",
    phrase: "The Wisdom of the Crowd",
    icon: Users,
    color: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-900 border-rose-200",
    description:
      "The most rigorous goal. Stop trying to pick a single 'winner' entirely.",
    logic:
      "I won't choose one model. I will consider all possible models and weight their predictions by their probability.",
    math: "P(y|D) = \\int P(y|\\theta)P(\\theta|D)d\\theta",
    mathPlain: "Weighted average of all possibilities",
    trap: {
      title: "Computationally Expensive",
      desc: "Often intractable to calculate for complex systems, requiring approximation.",
    },
    actInfConnection: "The theoretical ideal that we approximate.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Level1: React.FC = () => {
  const [activeGoalId, setActiveGoalId] = useState("evidence"); // Default to Evidence (ActInf core)
  const activeGoal = GOALS.find((g) => g.id === activeGoalId) || GOALS[0];

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
          <Anchor size={14} />
          <span>Level 1: The Goal</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-ocean-900 leading-tight">
          The Computational Level
        </h1>

        <div className="text-lg text-slate-600 leading-relaxed space-y-6">
          <p>
            We begin at the top of Marr's hierarchy:{" "}
            <strong>The Computational Goal</strong>.
          </p>
          <p>
            Before we decide if we are using a Neural Network or a Gaussian
            process, we must ask:
            <span className="text-ocean-900 font-semibold mx-1">
              What is the objective?
            </span>
            In the ocean of intelligence, almost every goal can be framed as a
            search for the best relationship between <strong>Data</strong> and{" "}
            <strong>Models</strong>.
          </p>
        </div>
      </motion.header>

      {/* --- INTERACTIVE GOAL EXPLORER --- */}
      <section className="mb-24">
        <div className="flex items-center gap-2 mb-6">
          <MousePointerClick className="text-ocean-500" size={20} />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Select a Strategy to Explore
          </h2>
        </div>

        {/* 1. The Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {GOALS.map((goal) => {
            const isActive = activeGoalId === goal.id;
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoalId(goal.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 h-32",
                  isActive
                    ? `border-${
                        goal.color.split("-")[1]
                      }-500 bg-white shadow-lg scale-105 z-10`
                    : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-200"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full mb-3 transition-colors",
                    isActive ? `${goal.lightColor}` : "bg-slate-200"
                  )}
                >
                  <Icon size={24} />
                </div>
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider text-center",
                    isActive ? "text-slate-900" : "text-slate-500"
                  )}
                >
                  {goal.phrase}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="active-arrow"
                    className="absolute -bottom-10 left-0 right-0 flex justify-center text-slate-200"
                  >
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white filter drop-shadow-sm" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* 2. The Detail View */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGoalId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-10"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900">
                    {activeGoal.title}
                  </h3>
                  <p className="text-lg text-slate-500 font-medium">
                    {activeGoal.subtitle}
                  </p>
                </div>
                {/* --- RENDERED MATH BADGE --- */}
                <div className="bg-slate-50 px-6 py-4 rounded-lg border border-slate-200 text-slate-800 shadow-inner flex flex-col items-center">
                  {/* Use BlockMath for the display equation */}
                  <BlockMath math={activeGoal.math} />
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-2">
                    {activeGoal.mathPlain}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column: Description & Logic */}
                <div className="space-y-8">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                      <Brain size={18} className="text-slate-400" />
                      The Logic
                    </h4>
                    <p className="text-lg text-slate-700 leading-relaxed italic">
                      "{activeGoal.logic}"
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                      <Sigma size={18} className="text-slate-400" />
                      In Plain English
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {activeGoal.description}
                    </p>
                  </div>
                </div>

                {/* Right Column: Connection & Trap */}
                <div className="space-y-6">
                  {/* The Trap / Feature */}
                  <div
                    className={cn(
                      "p-6 rounded-xl border",
                      activeGoal.id === "evidence"
                        ? "bg-emerald-50 border-emerald-100"
                        : "bg-amber-50 border-amber-100"
                    )}
                  >
                    <h4
                      className={cn(
                        "flex items-center gap-2 font-bold mb-2",
                        activeGoal.id === "evidence"
                          ? "text-emerald-900"
                          : "text-amber-900"
                      )}
                    >
                      {activeGoal.id === "evidence" ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <AlertTriangle size={18} />
                      )}
                      {activeGoal.trap.title}
                    </h4>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        activeGoal.id === "evidence"
                          ? "text-emerald-800"
                          : "text-amber-800"
                      )}
                    >
                      {activeGoal.trap.desc}
                    </p>
                  </div>

                  {/* Connection */}
                  <div className="pl-4 border-l-4 border-slate-200 py-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
                      Where we see this
                    </span>
                    <p className="text-slate-700 font-medium">
                      {activeGoal.actInfConnection}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- COMPARISON TABLE SUMMARY --- */}
      <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-slate-300 space-y-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Lightbulb className="text-yellow-400" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Seeing the "Water"
            </h3>
            <p className="leading-relaxed opacity-90">
              By identifying which of these goals a system is chasing, you can
              immediately understand its "water".
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-xs font-bold uppercase tracking-widest text-slate-500">
                <th className="py-4 pr-8">Goal Strategy</th>
                <th className="py-4 pr-8">Primary Focus</th>
                <th className="py-4">The "Water"</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              <tr>
                <td className="py-4 font-bold text-white">Type I MLE</td>
                <td className="py-4">Fitting data points exactly</td>
                <td className="py-4 text-blue-400">Deep Learning (Basic)</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-white">MAP</td>
                <td className="py-4">Fitting data + Constraints</td>
                <td className="py-4 text-purple-400">DL + Regularization</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-white bg-white/5 -mx-4 px-4 rounded-lg relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r-full"></span>
                  Type II MLE
                </td>
                <td className="py-4 bg-white/5">Model Quality / Evidence</td>
                <td className="py-4 text-teal-400 font-bold bg-white/5 rounded-r-lg">
                  Active Inference
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-white">Full Bayesian</td>
                <td className="py-4">Weighted averaging</td>
                <td className="py-4 text-rose-400">Theoretical Ideal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm italic opacity-60 text-center pt-4">
          Active Inference is built from the ground up on{" "}
          <strong>Evidence Maximization</strong>. It doesn't just want to fit
          data; it wants the simplest model that explains the data (Free Energy
          Minimization).
        </p>
      </section>

      {/* --- NAVIGATION FOOTER --- */}
      <div className="flex justify-between pt-10 mt-16 border-t border-slate-200">
        <Link
          to="/intro/framework"
          className="group flex flex-col items-start gap-1"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Previous Part
          </span>
          <span className="text-lg font-serif font-bold text-slate-600 group-hover:text-ocean-900 flex items-center gap-2 transition-all">
            <ArrowLeft size={20} /> III. The Framework
          </span>
        </Link>

        <Link
          to="/level-2"
          className="group flex flex-col items-end gap-1 text-right"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Next Level
          </span>
          <span className="text-xl font-serif font-bold text-ocean-900 flex items-center gap-2 group-hover:gap-4 transition-all">
            Level 2: The Algo <ArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Level1;
