// src/pages/levels/inference/ApproximateMethods.tsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InlineMath, BlockMath } from "react-katex";
import {
  ArrowLeft,
  Target,
  Dices,
  Minimize,
  Activity,
  Zap,
  Mountain,
  Box,
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

// --- MATH & SIMULATION ENGINE ---

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

// 1. The "True" Target Posterior (Unnormalized P(D|theta))
const getTargetDensity = (x: number, y: number) => {
  // Peak 1 (Dominant)
  const z1 =
    1.0 *
    Math.exp(
      -(Math.pow(x - 120, 2) / (2 * 1200) + Math.pow(y - 120, 2) / (2 * 1200))
    );
  // Peak 2 (Minor)
  const z2 =
    0.6 *
    Math.exp(
      -(Math.pow(x - 280, 2) / (2 * 1500) + Math.pow(y - 200, 2) / (2 * 1500))
    );
  return z1 + z2;
};

// 2. MCMC Simulation (Metropolis-Hastings)
const runMCMCStep = (current: { x: number; y: number }) => {
  // Proposal: Gaussian perturbation
  const stepSize = 40;
  const proposal = {
    x: current.x + (Math.random() - 0.5) * stepSize,
    y: current.y + (Math.random() - 0.5) * stepSize,
  };

  // Boundary checks
  if (
    proposal.x < 0 ||
    proposal.x > CANVAS_WIDTH ||
    proposal.y < 0 ||
    proposal.y > CANVAS_HEIGHT
  ) {
    return { ...current, proposal, accepted: false };
  }

  // Acceptance Ratio
  const pCurrent = getTargetDensity(current.x, current.y);
  const pProposal = getTargetDensity(proposal.x, proposal.y);
  const alpha = Math.min(1, pProposal / (pCurrent + 0.0001));

  // Accept or Reject
  if (Math.random() < alpha) {
    return { ...proposal, proposal, accepted: true };
  } else {
    return { ...current, proposal, accepted: false };
  }
};

// 3. VI Simulation (Gradient Ascent on ELBO)
const runVIStep = (params: { muX: number; muY: number; sigma: number }) => {
  // Calculate "gradient" by sampling nearby points (Finite Difference)
  const pCenter = getTargetDensity(params.muX, params.muY);
  const pRight = getTargetDensity(params.muX + 5, params.muY);
  const pUp = getTargetDensity(params.muX, params.muY - 5); // SVG Y is down, so Up is -y

  // LEARNING RATE: Boosted to 60 (was 25) to ensure it climbs the hill
  const learningRate = 60;
  const gradX = (pRight - pCenter) * learningRate;
  const gradY = (pUp - pCenter) * learningRate;

  // Sigma update: Expand if confident (high density), shrink if lost
  const targetSigma = pCenter > 0.1 ? 45 : 15;
  const newSigma = params.sigma + (targetSigma - params.sigma) * 0.08;

  return {
    muX: params.muX + gradX,
    muY: params.muY - gradY,
    sigma: newSigma,
    gradX,
    gradY,
  };
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ApproximateMethods: React.FC = () => {
  const [method, setMethod] = useState<"mcmc" | "vi">("mcmc");
  const [isPlaying, setIsPlaying] = useState(false);

  // MCMC State
  const [samples, setSamples] = useState<{ x: number; y: number }[]>([]);
  const [walker, setWalker] = useState({ x: 200, y: 150 });
  const [currentProposal, setCurrentProposal] = useState<{
    x: number;
    y: number;
    accepted: boolean;
  } | null>(null);
  const [totalSamples, setTotalSamples] = useState(0);

  // VI State
  // Initial Position: (100, 220) - Closer to Peak 1 to avoid vanishing gradients
  const [viParams, setViParams] = useState({
    muX: 100,
    muY: 220,
    sigma: 15,
    gradX: 0,
    gradY: 0,
  });
  const [viPath, setViPath] = useState<
    { x: number; y: number; sigma: number }[]
  >([]);
  const [elboPath, setElboPath] = useState<number[]>([]);

  // Animation Loop
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (method === "mcmc") {
          setWalker((prev) => {
            const result = runMCMCStep(prev);
            setCurrentProposal({
              x: result.proposal.x,
              y: result.proposal.y,
              accepted: result.accepted,
            });

            if (result.accepted) {
              setSamples((s) => [
                ...s.slice(-100),
                { x: result.x, y: result.y },
              ]);
              setTotalSamples((n) => n + 1);
              return { x: result.x, y: result.y };
            }
            return prev;
          });
        } else {
          setViParams((prev) => {
            const next = runVIStep(prev);
            const currentFit = getTargetDensity(next.muX, next.muY);

            setViPath((path) => [
              ...path.slice(-50),
              { x: next.muX, y: next.muY, sigma: next.sigma },
            ]);
            setElboPath((path) => [...path, currentFit].slice(-100));

            return next;
          });
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isPlaying, method]);

  // Reset when method changes
  useEffect(() => {
    setIsPlaying(false);
    setSamples([]);
    setWalker({ x: 200, y: 150 });
    setCurrentProposal(null);
    setTotalSamples(0);

    // Reset VI to a "Slope" position, not a flat valley
    setViParams({ muX: 100, muY: 220, sigma: 15, gradX: 0, gradY: 0 });
    setViPath([]);
    setElboPath([]);
  }, [method]);

  // Contours (Memoized)
  const contours = useMemo(() => {
    const lines = [];
    // Peak 1 Contours
    for (let i = 0; i < 4; i++) {
      lines.push(
        <ellipse
          key={`c1-${i}`}
          cx={120}
          cy={120}
          rx={30 + i * 20}
          ry={30 + i * 20}
          stroke="#475569"
          strokeWidth="1.5"
          strokeOpacity={0.3 - i * 0.05}
          fill="none"
        />
      );
    }
    // Peak 2 Contours
    for (let i = 0; i < 3; i++) {
      lines.push(
        <ellipse
          key={`c2-${i}`}
          cx={280}
          cy={200}
          rx={25 + i * 15}
          ry={25 + i * 15}
          stroke="#475569"
          strokeWidth="1.5"
          strokeOpacity={0.3 - i * 0.05}
          fill="none"
        />
      );
    }
    return lines;
  }, []);

  // Check if VI has converged (low gradient, high density)
  const isConverged = useMemo(() => {
    if (method !== "vi") return false;
    const density = getTargetDensity(viParams.muX, viParams.muY);
    const gradMag = Math.sqrt(viParams.gradX ** 2 + viParams.gradY ** 2);
    return density > 0.8 && gradMag < 5;
  }, [viParams, method]);

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* --- HEADER --- */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-6 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold tracking-widest uppercase border border-teal-100">
          <Activity size={14} />
          <span>Inference Strategy</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-ocean-900 leading-tight">
          Solving the Unsolvable
        </h1>

        <div className="text-lg text-slate-600 leading-relaxed space-y-4 max-w-2xl">
          <p>
            The core problem of Bayesian Inference is calculating the posterior{" "}
            <InlineMath math="P(\theta|D)" />. This requires an integral that is
            usually impossible to solve analytically.
          </p>
          <div className="bg-slate-50 p-4 border-l-4 border-ocean-500 my-6">
            <h3 className="font-bold text-ocean-900 text-sm uppercase tracking-wide mb-2">
              The Intractable Integral
            </h3>
            <BlockMath math="P(\theta|D) = \frac{P(D|\theta)P(\theta)}{\int P(D|\theta')P(\theta')d\theta'}" />
          </div>
          <p>
            So we cheat. We transform this <strong>Integration</strong> problem
            into something computers are actually good at.
          </p>
        </div>
      </motion.header>

      {/* --- INTERACTIVE VISUALIZER --- */}
      <section className="mb-24">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-800">
          {/* Controls */}
          <div className="bg-slate-950/50 p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Target className="text-teal-400" /> Choose Your Strategy
              </h3>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Goal: Find the "True Posterior" (The Mountains).
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setMethod("mcmc")}
                  className={cn(
                    "px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all flex items-center gap-2",
                    method === "mcmc"
                      ? "bg-rose-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  <Dices size={16} /> Sampling (MCMC)
                </button>
                <button
                  onClick={() => setMethod("vi")}
                  className={cn(
                    "px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all flex items-center gap-2",
                    method === "vi"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  <Minimize size={16} /> Optimization (VI)
                </button>
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full transition-all",
                  isPlaying
                    ? "bg-amber-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                )}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setMethod(method);
                  setTimeout(() => setIsPlaying(true), 100);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="grid md:grid-cols-3 min-h-[400px]">
            {/* LEFT: THE MAIN VISUALIZATION (2/3 width) */}
            <div className="md:col-span-2 relative bg-slate-900 flex items-center justify-center overflow-hidden border-r border-slate-800">
              {/* Grid Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(#64748b 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Math Overlay */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  {method === "mcmc" ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-rose-950/80 backdrop-blur-md border border-rose-500/30 p-3 rounded-lg text-rose-100"
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block mb-1">
                        Transformation
                      </span>
                      <div className="text-sm font-mono">
                        Integration <span className="text-white">→</span>{" "}
                        Summation
                      </div>
                      <div className="text-xs opacity-70 mt-1 font-mono">
                        <InlineMath math="\int P(\theta)d\theta \approx \frac{1}{N}\sum x_i" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-blue-950/80 backdrop-blur-md border border-blue-500/30 p-3 rounded-lg text-blue-100"
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block mb-1">
                        Transformation
                      </span>
                      <div className="text-sm font-mono">
                        Integration <span className="text-white">→</span>{" "}
                        Optimization
                      </div>
                      <div className="text-xs opacity-70 mt-1 font-mono">
                        <InlineMath math="\min KL(q || p)" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SVG CANVAS */}
              <svg
                viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
                className="w-full h-full max-w-lg z-10"
              >
                <defs>
                  <radialGradient id="peak1">
                    <stop offset="0%" stopColor="#475569" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="peak2">
                    <stop offset="0%" stopColor="#475569" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                  </radialGradient>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* The Mountains (Posterior Modes) */}
                <circle cx="120" cy="120" r="100" fill="url(#peak1)" />
                <text
                  x="110"
                  y="115"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="bold"
                  opacity="0.5"
                >
                  Mode 1
                </text>

                <circle cx="280" cy="200" r="80" fill="url(#peak2)" />
                <text
                  x="270"
                  y="195"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="bold"
                  opacity="0.5"
                >
                  Mode 2
                </text>

                {contours}

                <text
                  x="20"
                  y={CANVAS_HEIGHT - 20}
                  fill="#475569"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                >
                  TRUE POSTERIOR P(θ|D)
                </text>

                {/* DYNAMIC VISUALIZATIONS */}
                <AnimatePresence mode="wait">
                  {method === "mcmc" ? (
                    <motion.g key="mcmc-vis">
                      <polyline
                        points={samples.map((s) => `${s.x},${s.y}`).join(" ")}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                      {samples.map((s, i) => (
                        <circle
                          key={i}
                          cx={s.x}
                          cy={s.y}
                          r={i === samples.length - 1 ? 3 : 1.5}
                          fill="#f43f5e"
                          opacity={0.3 + (i / samples.length) * 0.7}
                        />
                      ))}
                      {currentProposal && (
                        <>
                          <line
                            x1={walker.x}
                            y1={walker.y}
                            x2={currentProposal.x}
                            y2={currentProposal.y}
                            stroke={
                              currentProposal.accepted ? "#10b981" : "#e11d48"
                            }
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                            opacity="0.8"
                          />
                          <circle
                            cx={currentProposal.x}
                            cy={currentProposal.y}
                            r="3"
                            fill="none"
                            stroke={
                              currentProposal.accepted ? "#10b981" : "#e11d48"
                            }
                            strokeWidth="2"
                            opacity="0.8"
                          />
                        </>
                      )}
                      <circle
                        cx={walker.x}
                        cy={walker.y}
                        r="5"
                        fill="#fff"
                        stroke="#f43f5e"
                        strokeWidth="2"
                      />
                    </motion.g>
                  ) : (
                    <motion.g key="vi-vis">
                      {/* Optimization Trace */}
                      <polyline
                        points={viPath.map((p) => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        opacity="0.4"
                      />

                      {/* Ghost Steps */}
                      {viPath
                        .filter((_, i) => i % 8 === 0)
                        .map((p, i) => (
                          <ellipse
                            key={`ghost-${i}`}
                            cx={p.x}
                            cy={p.y}
                            rx={p.sigma * 2}
                            ry={p.sigma * 2}
                            stroke="#38bdf8"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.1"
                          />
                        ))}

                      {/* Gradient Vector */}
                      <line
                        x1={viParams.muX}
                        y1={viParams.muY}
                        x2={viParams.muX + viParams.gradX * 2} // Visualize "Next Step"
                        y2={viParams.muY - viParams.gradY * 2}
                        stroke="#06b6d4"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                        opacity="0.9"
                      />

                      {/* The Variational Distribution (Balloon) */}
                      <motion.ellipse
                        cx={viParams.muX}
                        cy={viParams.muY}
                        rx={viParams.sigma * 2}
                        ry={viParams.sigma * 2}
                        fill={
                          isConverged
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(59, 130, 246, 0.1)"
                        }
                        stroke={isConverged ? "#10b981" : "#3b82f6"}
                        strokeWidth={isConverged ? 3 : 2}
                        strokeDasharray={isConverged ? "0 0" : "4 2"}
                        animate={{
                          cx: viParams.muX,
                          cy: viParams.muY,
                          rx: viParams.sigma * 2,
                          ry: viParams.sigma * 2,
                          fillOpacity: isConverged ? 0.4 : 0.1,
                        }}
                        transition={{
                          type: "spring",
                          bounce: 0,
                          duration: 0.1,
                        }}
                      />
                      <motion.circle
                        cx={viParams.muX}
                        cy={viParams.muY}
                        r="4"
                        fill={isConverged ? "#10b981" : "#3b82f6"}
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </div>

            {/* RIGHT: REAL-TIME METRICS & EXPLANATION */}
            <div className="bg-slate-950 p-6 flex flex-col justify-center border-l border-slate-800">
              <AnimatePresence mode="wait">
                {method === "mcmc" ? (
                  <motion.div
                    key="mcmc-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 text-rose-400 mb-2">
                      <Mountain size={20} />
                      <h4 className="font-bold">The Hiker</h4>
                    </div>
                    <div className="bg-rose-950/30 p-4 rounded-lg border border-rose-900">
                      <div className="text-xs text-rose-300 uppercase tracking-widest mb-1">
                        Samples Accepted
                      </div>
                      <div className="text-3xl font-mono font-bold text-white">
                        {totalSamples}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      <strong>MCMC</strong> explores randomly. <br />
                      <span className="text-rose-500 font-bold">
                        Red Line:
                      </span>{" "}
                      Rejected. <br />
                      <span className="text-emerald-500 font-bold">
                        Green Line:
                      </span>{" "}
                      Accepted.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vi-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <Box size={20} />
                      <h4 className="font-bold">The Balloon</h4>
                    </div>

                    <div className="bg-blue-950/30 p-4 rounded-lg border border-blue-900 h-24 flex items-end gap-1 overflow-hidden relative">
                      <div className="absolute top-2 left-2 text-[10px] text-blue-300 uppercase tracking-widest">
                        ELBO (Model Evidence)
                      </div>
                      {elboPath.map((val, i) => (
                        <div
                          key={i}
                          className="w-2 bg-blue-500 rounded-t-sm opacity-60"
                          style={{ height: `${Math.min(100, val * 80)}%` }}
                        />
                      ))}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      <strong>Variational Inference</strong> uses calculus.
                    </p>
                    <ul className="text-sm text-slate-400 space-y-2">
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">
                          → Arrow:
                        </span>{" "}
                        The Gradient. Points Uphill.
                      </li>
                      {isConverged && (
                        <li className="flex gap-2 items-center text-emerald-400 font-bold animate-pulse">
                          <CheckCircle2 size={16} /> Converged on Peak 1!
                        </li>
                      )}
                    </ul>
                    <p className="text-slate-500 text-xs italic mt-2">
                      It completely ignores the second peak (Mode Collapse).
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON DEEP DIVE --- */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* CARD 1: MCMC */}
        <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
            <Dices size={24} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Sampling (MCMC)
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Exact, but Slow
          </p>
          <ul className="space-y-4 text-slate-600 text-sm">
            <li className="flex gap-3">
              <TrendingUp className="text-rose-400 shrink-0" size={18} />
              <span>
                <strong>Logic:</strong> "I will walk around randomly, but I
                promise to stay longer in high-probability areas."
              </span>
            </li>
            <li className="flex gap-3">
              <Activity className="text-rose-400 shrink-0" size={18} />
              <span>
                <strong>Pros:</strong> Asymptotically exact. Can map complex,
                multimodal landscapes.
              </span>
            </li>
            <li className="flex gap-3">
              <Zap className="text-rose-400 shrink-0" size={18} />
              <span>
                <strong>Cons:</strong> Computationally expensive. Slow to
                converge in high dimensions.
              </span>
            </li>
          </ul>
        </div>

        {/* CARD 2: VI */}
        <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <Minimize size={24} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Variational Inference
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Fast, but Approximate
          </p>
          <ul className="space-y-4 text-slate-600 text-sm">
            <li className="flex gap-3">
              <TrendingUp className="text-blue-400 shrink-0" size={18} />
              <span>
                <strong>Logic:</strong> "I assume the answer is a Gaussian, and
                use gradients to fit it."
              </span>
            </li>
            <li className="flex gap-3">
              <Activity className="text-blue-400 shrink-0" size={18} />
              <span>
                <strong>Pros:</strong> Extremely fast. Scales to massive
                datasets (e.g., VAEs).
              </span>
            </li>
            <li className="flex gap-3">
              <Zap className="text-blue-400 shrink-0" size={18} />
              <span>
                <strong>Cons:</strong> Biased. Often suffers from{" "}
                <strong>Mode Collapse</strong> (seeing only one part of the
                truth).
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-16">
        <Link to="/level-2" className="group flex flex-col items-start gap-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Back
          </span>
          <span className="text-lg font-serif font-bold text-slate-600 group-hover:text-ocean-900 flex items-center gap-2 transition-all">
            <ArrowLeft size={20} /> Level 2: The Algorithm
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ApproximateMethods;
