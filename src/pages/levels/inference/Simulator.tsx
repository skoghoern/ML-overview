import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { InlineMath } from "react-katex";
import {
  Box,
  CheckCircle2,
  Dices,
  Minimize,
  Mountain,
  Pause,
  Play,
  RotateCcw,
  Target,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./simulation";
import { useSimulation, type Method } from "./useSimulation";

export function Simulator() {
  const sim = useSimulation();

  return (
    <section className="mb-24">
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-800">
        <div className="bg-slate-950/50 p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Target className="text-teal-400" /> Choose Your Strategy
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Goal: Find the "True Posterior" (The Mountains).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex bg-slate-800 p-1 rounded-lg">
              <MethodButton
                active={sim.method === "mcmc"}
                onClick={() => sim.setMethod("mcmc")}
                icon={<Dices size={16} />}
                activeClass="bg-rose-500 text-white shadow-lg"
              >
                Sampling (MCMC)
              </MethodButton>
              <MethodButton
                active={sim.method === "vi"}
                onClick={() => sim.setMethod("vi")}
                icon={<Minimize size={16} />}
                activeClass="bg-blue-500 text-white shadow-lg"
              >
                Optimization (VI)
              </MethodButton>
            </div>

            <button
              type="button"
              onClick={sim.togglePlay}
              aria-label={sim.isPlaying ? "Pause simulation" : "Play simulation"}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full transition-all",
                sim.isPlaying
                  ? "bg-amber-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600",
              )}
            >
              {sim.isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              type="button"
              onClick={sim.reset}
              aria-label="Reset simulation"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 min-h-[400px]">
          <Canvas
            method={sim.method}
            samples={sim.samples}
            walker={sim.walker}
            proposal={sim.currentProposal}
            viParams={sim.viParams}
            viPath={sim.viPath}
            converged={sim.converged}
          />
          <Metrics
            method={sim.method}
            totalSamples={sim.totalSamples}
            elboPath={sim.elboPath}
            converged={sim.converged}
          />
        </div>
      </div>
    </section>
  );
}

function MethodButton({
  active,
  onClick,
  icon,
  activeClass,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  activeClass: string;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all flex items-center gap-2",
        active ? activeClass : "text-slate-400 hover:text-white",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function Canvas({
  method,
  samples,
  walker,
  proposal,
  viParams,
  viPath,
  converged,
}: {
  method: Method;
  samples: { x: number; y: number }[];
  walker: { x: number; y: number };
  proposal: { x: number; y: number; accepted: boolean } | null;
  viParams: {
    muX: number;
    muY: number;
    sigma: number;
    gradX: number;
    gradY: number;
  };
  viPath: { x: number; y: number; sigma: number }[];
  converged: boolean;
}) {
  return (
    <div className="md:col-span-2 relative bg-slate-900 flex items-center justify-center overflow-hidden border-r border-slate-800">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        {method === "mcmc" ? (
            <motion.div
              key="mcmc-label"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-rose-950/80 backdrop-blur-md border border-rose-500/30 p-3 rounded-lg text-rose-100"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block mb-1">
                Transformation
              </span>
              <div className="text-sm font-mono">
                Integration <span className="text-white">→</span> Summation
              </div>
              <div className="text-xs opacity-70 mt-1 font-mono">
                <InlineMath math="\int P(\theta)d\theta \approx \frac{1}{N}\sum x_i" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="vi-label"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blue-950/80 backdrop-blur-md border border-blue-500/30 p-3 rounded-lg text-blue-100"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block mb-1">
                Transformation
              </span>
              <div className="text-sm font-mono">
                Integration <span className="text-white">→</span> Optimization
              </div>
              <div className="text-xs opacity-70 mt-1 font-mono">
                <InlineMath math="\min KL(q || p)" />
              </div>
            </motion.div>
          )}
      </div>

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

        <circle cx="120" cy="120" r="100" fill="url(#peak1)" />
        <text x="110" y="115" fill="#94a3b8" fontSize="10" fontWeight="bold" opacity="0.5">
          Mode 1
        </text>
        <circle cx="280" cy="200" r="80" fill="url(#peak2)" />
        <text x="270" y="195" fill="#94a3b8" fontSize="10" fontWeight="bold" opacity="0.5">
          Mode 2
        </text>
        <Contours />
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

        {method === "mcmc" ? (
            <motion.g key="mcmc-vis">
              <polyline
                points={samples.map((sample) => `${sample.x},${sample.y}`).join(" ")}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="1"
                opacity="0.4"
              />
              {samples.map((sample, index) => (
                <circle
                  key={`${sample.x}-${sample.y}-${index}`}
                  cx={sample.x}
                  cy={sample.y}
                  r={index === samples.length - 1 ? 3 : 1.5}
                  fill="#f43f5e"
                  opacity={0.3 + (index / samples.length) * 0.7}
                />
              ))}
              {proposal && (
                <>
                  <line
                    x1={walker.x}
                    y1={walker.y}
                    x2={proposal.x}
                    y2={proposal.y}
                    stroke={proposal.accepted ? "#10b981" : "#e11d48"}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.8"
                  />
                  <circle
                    cx={proposal.x}
                    cy={proposal.y}
                    r="3"
                    fill="none"
                    stroke={proposal.accepted ? "#10b981" : "#e11d48"}
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
              <polyline
                points={viPath.map((point) => `${point.x},${point.y}`).join(" ")}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              {viPath
                .filter((_, index) => index % 8 === 0)
                .map((point, index) => (
                  <ellipse
                    key={`ghost-${index}`}
                    cx={point.x}
                    cy={point.y}
                    rx={point.sigma * 2}
                    ry={point.sigma * 2}
                    stroke="#38bdf8"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.1"
                  />
                ))}
              <line
                x1={viParams.muX}
                y1={viParams.muY}
                x2={viParams.muX + viParams.gradX * 2}
                y2={viParams.muY - viParams.gradY * 2}
                stroke="#06b6d4"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
                opacity="0.9"
              />
              <motion.ellipse
                cx={viParams.muX}
                cy={viParams.muY}
                rx={viParams.sigma * 2}
                ry={viParams.sigma * 2}
                fill={
                  converged ? "rgba(16, 185, 129, 0.2)" : "rgba(59, 130, 246, 0.1)"
                }
                stroke={converged ? "#10b981" : "#3b82f6"}
                strokeWidth={converged ? 3 : 2}
                strokeDasharray={converged ? "0 0" : "4 2"}
                animate={{
                  cx: viParams.muX,
                  cy: viParams.muY,
                  rx: viParams.sigma * 2,
                  ry: viParams.sigma * 2,
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.1 }}
              />
              <motion.circle
                cx={viParams.muX}
                cy={viParams.muY}
                r="4"
                fill={converged ? "#10b981" : "#3b82f6"}
                stroke="white"
                strokeWidth="1.5"
              />
            </motion.g>
          )}
      </svg>
    </div>
  );
}

function Contours() {
  const rings = [
    ...[0, 1, 2, 3].map((index) => ({
      key: `c1-${index}`,
      cx: 120,
      cy: 120,
      radius: 30 + index * 20,
      opacity: 0.3 - index * 0.05,
    })),
    ...[0, 1, 2].map((index) => ({
      key: `c2-${index}`,
      cx: 280,
      cy: 200,
      radius: 25 + index * 15,
      opacity: 0.3 - index * 0.05,
    })),
  ];

  return (
    <>
      {rings.map((ring) => (
        <ellipse
          key={ring.key}
          cx={ring.cx}
          cy={ring.cy}
          rx={ring.radius}
          ry={ring.radius}
          stroke="#475569"
          strokeWidth="1.5"
          strokeOpacity={ring.opacity}
          fill="none"
        />
      ))}
    </>
  );
}

function Metrics({
  method,
  totalSamples,
  elboPath,
  converged,
}: {
  method: Method;
  totalSamples: number;
  elboPath: number[];
  converged: boolean;
}) {
  return (
    <div className="bg-slate-950 p-6 flex flex-col justify-center border-l border-slate-800">
      {method === "mcmc" ? (
          <motion.div
            key="mcmc-text"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
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
              <span className="text-rose-500 font-bold">Red Line:</span> Rejected.{" "}
              <br />
              <span className="text-emerald-500 font-bold">Green Line:</span>{" "}
              Accepted.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="vi-text"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
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
              {elboPath.map((value, index) => (
                <div
                  key={index}
                  className="w-2 bg-blue-500 rounded-t-sm opacity-60"
                  style={{ height: `${Math.min(100, value * 80)}%` }}
                />
              ))}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>Variational Inference</strong> uses calculus.
            </p>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex gap-2 items-start">
                <span className="text-cyan-400 font-bold">→ Arrow:</span> The
                Gradient. Points Uphill.
              </li>
              {converged && (
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
    </div>
  );
}
