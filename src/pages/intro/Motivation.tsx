// src/pages/intro/Motivation.tsx
import React, { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Waves,
  Lightbulb,
  Fish,
  Layers,
  Brain,
  Hammer,
  Search,
  Scale,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

// --- DATA: BLOOM'S TAXONOMY LEVELS ---
const BLOOM_LEVELS = [
  {
    id: "create",
    label: "Create",
    desc: "Produce new or original work",
    verbs: "Design, assemble, construct, conjecture, develop, formulate",
    color: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-900 border-rose-200",
    icon: Zap,
    width: "w-[30%]",
  },
  {
    id: "evaluate",
    label: "Evaluate",
    desc: "Justify a stand or decision",
    verbs: "Appraise, argue, defend, judge, select, support, critique",
    color: "bg-amber-400",
    lightColor: "bg-amber-50 text-amber-900 border-amber-200",
    icon: Scale,
    width: "w-[44%]",
  },
  {
    id: "analyze",
    label: "Analyze",
    desc: "Draw connections among ideas",
    verbs: "Differentiate, organize, relate, compare, contrast, distinguish",
    color: "bg-emerald-400",
    lightColor: "bg-emerald-50 text-emerald-900 border-emerald-200",
    icon: Search,
    width: "w-[58%]",
  },
  {
    id: "apply",
    label: "Apply",
    desc: "Use information in new situations",
    verbs: "Execute, implement, solve, use, demonstrate, interpret",
    color: "bg-teal-500",
    lightColor: "bg-teal-50 text-teal-900 border-teal-200",
    icon: Hammer,
    width: "w-[72%]",
  },
  {
    id: "understand",
    label: "Understand",
    desc: "Explain ideas or concepts",
    verbs: "Classify, describe, discuss, explain, identify, locate",
    color: "bg-sky-500",
    lightColor: "bg-sky-50 text-sky-900 border-sky-200",
    icon: Brain,
    width: "w-[86%]",
  },
  {
    id: "remember",
    label: "Remember",
    desc: "Recall facts and basic concepts",
    verbs: "Define, duplicate, list, memorize, repeat, state",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50 text-indigo-900 border-indigo-200",
    icon: Layers,
    width: "w-[100%]",
  },
];

// Hero section entrance animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const Motivation: React.FC = () => {
  const [activeWater, setActiveWater] = useState<"dl" | "actinf">("dl");
  const [activeBloom, setActiveBloom] = useState(BLOOM_LEVELS[2]); // Default to Analyze

  return (
    <div className="max-w-3xl mx-auto pb-32">
      {/* --- HERO SECTION --- */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-8 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 text-ocean-800 text-xs font-bold tracking-widest uppercase border border-ocean-100">
          <BookOpen size={14} />
          <span>Part I: Motivation</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-serif text-ocean-900 leading-[1.1]">
          "What the hell <br /> is water?"
        </h1>
      </motion.header>

      {/* --- THE PARABLE --- */}
      <section className="space-y-8 mb-24">
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-serif">
          A very suitable analogy for the motivation of this series is a parable
          from a 2005 commencement speech by the author David Foster Wallace.
        </p>

        <div className="relative group rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-8 md:p-12">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Waves size={120} />
          </div>

          <div className="relative z-10 border-l-4 border-ocean-300 pl-6 md:pl-8">
            <div className="text-xl md:text-2xl text-slate-700 font-serif leading-relaxed italic opacity-90">
              <p className="mb-6">
                Two young fish swim along. They meet an older fish who nods and
                says, "Morning, boys. How's the water?"
              </p>
              <p>
                The two young fish swim on for a bit until one turns to the
                other and asks,{" "}
                <span className="font-bold text-ocean-900 not-italic">
                  "What the hell is water?"
                </span>
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200"></span>
              <span className="text-xs font-sans text-slate-400 font-bold tracking-widest uppercase">
                David Foster Wallace
              </span>
            </div>
          </div>
        </div>

        <p className="text-lg text-slate-700 leading-relaxed">
          The point of the story is simple but profound:{" "}
          <strong className="text-ocean-900 font-semibold">
            the most obvious realities are often the hardest to see
          </strong>
          , simply because they are all we have ever known.
        </p>
      </section>

      {/* --- THE ANALOGY: CHOOSING YOUR WATER --- */}
      <section className="space-y-8 mb-24">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif text-ocean-900">
            Computational Water
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            In the world of computational intelligence, we all swim in our own
            specific "water." Whatever your background, it is easy to become so
            immersed in your specific framework that it becomes the "default
            setting."
          </p>
        </div>

        {/* Interactive Comparison Tool */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Explore Perspectives
            </span>
            <div className="flex bg-white p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveWater("dl")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                  activeWater === "dl"
                    ? "bg-ocean-100 text-ocean-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Deep Learning
              </button>
              <button
                onClick={() => setActiveWater("actinf")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                  activeWater === "actinf"
                    ? "bg-teal-100 text-teal-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Active Inference
              </button>
            </div>
          </div>

          <div className="p-8 md:p-12 min-h-[300px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {activeWater === "dl" ? (
                <motion.div
                  key="dl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-lg mx-auto"
                >
                  <div className="w-16 h-16 bg-coral-accent/10 text-coral-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    The Deep Learning Practitioner
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    For you, the water might be comprised of{" "}
                    <span className="font-semibold text-coral-accent">
                      Loss Functions
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-coral-accent">
                      Backpropagation
                    </span>
                    . You view intelligence as minimizing error on a dataset.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="actinf"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-lg mx-auto"
                >
                  <div className="w-16 h-16 bg-teal-accent/10 text-teal-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Fish size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-teal-900 mb-4">
                    The Active Inference Researcher
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    For you, the water flows with{" "}
                    <span className="font-semibold text-teal-600">
                      Markov Blankets
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-teal-600">
                      Free Energy Minimization
                    </span>
                    . You view intelligence as a biological imperative to
                    survive uncertainty.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- BLOOM'S TAXONOMY (ENHANCED) --- */}
      <section className="space-y-12 py-12 border-t border-slate-100">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif text-ocean-900">
            Reshaping the Pyramid
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            To truly understand the landscape of machine intelligence, we need
            to step out of our respective tanks. This idea is formally captured
            in <strong>Bloom's Taxonomy</strong>.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Most tutorials stop at "Remembering" (definitions) or
            "Understanding" (math derivations). To achieve mastery, we must
            climb to <strong className="text-ocean-900">Analysis</strong> and{" "}
            <strong className="text-ocean-900">Evaluation</strong>—comparing the
            strengths and blind spots of different paradigms.
          </p>
        </div>

        {/* INTERACTIVE PYRAMID COMPONENT */}
        <div className="flex flex-col md:flex-row gap-8 items-start py-8">
          {/* LEFT: THE PYRAMID */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-1.5">
            {BLOOM_LEVELS.map((level) => {
              const isActive = activeBloom.id === level.id;
              return (
                <motion.button
                  key={level.id}
                  onClick={() => setActiveBloom(level)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative h-12 md:h-14 rounded-lg shadow-sm flex items-center justify-center transition-all duration-300",
                    level.width,
                    isActive
                      ? `${level.color} text-white shadow-lg ring-4 ring-offset-2 ring-indigo-100 z-10`
                      : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                  )}
                >
                  <span className="font-bold tracking-wide uppercase text-sm md:text-base">
                    {level.label}
                  </span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute left-4 w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: THE DETAILS CARD */}
          <div className="w-full md:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBloom.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "h-full p-6 rounded-2xl border-2 flex flex-col justify-center",
                  activeBloom.lightColor
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "p-2 rounded-lg bg-white/50 backdrop-blur-sm"
                    )}
                  >
                    <activeBloom.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">
                    {activeBloom.label}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Goal
                    </span>
                    <p className="text-lg font-medium leading-tight">
                      {activeBloom.desc}
                    </p>
                  </div>

                  <hr className="border-black/5" />

                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Action Verbs
                    </span>
                    <p className="text-sm opacity-90 leading-relaxed mt-1 italic">
                      {activeBloom.verbs}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-300 p-6 md:p-8 rounded-r-lg">
          <p className="text-amber-900 italic font-medium text-lg leading-relaxed">
            "You cannot fully understand what Active Inference is until you have
            analyzed it against what it is not."
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-slate-700 leading-relaxed">
            This page aims to provide that bird's-eye view. By stepping back and
            creating a structured overview of ML, we are moving up Bloom's
            pyramid. Whether you are an expert in the field or a complete
            newcomer, the goal is to make the "water" visible again.
          </p>
        </div>
      </section>

      {/* --- NAVIGATION --- */}
      <div className="flex justify-end pt-10 border-t border-slate-200">
        <Link
          to="/intro/approach"
          className="group flex flex-col items-end gap-1 text-right"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Next Lesson
          </span>
          <span className="text-xl font-serif font-bold text-ocean-900 flex items-center gap-2 group-hover:gap-4 transition-all">
            II. The Approach <ArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Motivation;
