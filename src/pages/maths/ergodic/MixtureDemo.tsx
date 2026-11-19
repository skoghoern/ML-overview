import { useEffect, useRef, useState } from "react";
import {
  advancePlayback,
  completeExperiment,
  edges,
  edgeId,
  initialPlayback,
  layout,
  limitProbability,
  mixtureProbability,
  observationFactor,
  timeAverage,
  writtenSlot,
  type Draw,
  type EdgeId,
  type MixtureKind,
  type MixtureParams,
  type MixtureState,
  type NodeId,
  type Phase,
  type Playback,
  type RandomPair,
} from "./mixture";
import { cn } from "../../../lib/utils";

const GRID = { x0: 58, y0: 48, col: 96, row: 76 };
const VIEW = { width: 520, height: 500 };

const initialParams: MixtureParams = { p1: 0.9, p2: 0.1, pi: 0.5 };

type Tone = "ocean" | "amber";
type Heat = "off" | "visited" | "frontier";

const nodeFill = {
  ocean: {
    off: "fill-white stroke-slate-300",
    visited: "fill-ocean-100 stroke-ocean-400",
    frontier: "fill-ocean-600 stroke-ocean-800",
  },
  amber: {
    off: "fill-white stroke-slate-300",
    visited: "fill-amber-100 stroke-amber-400",
    frontier: "fill-amber-500 stroke-amber-700",
  },
} as const;

const edgeStroke = {
  ocean: {
    off: "stroke-slate-200",
    visited: "stroke-ocean-300",
    frontier: "stroke-ocean-600",
  },
  amber: {
    off: "stroke-slate-200",
    visited: "stroke-amber-300",
    frontier: "stroke-amber-500",
  },
} as const;

function point(id: NodeId) {
  const node = layout[id];
  return {
    x: GRID.x0 + (node.col - 1) * GRID.col,
    y: GRID.y0 + (node.row - 1) * GRID.row,
  };
}

function makePair(): RandomPair {
  return {
    ergodic: [Math.random(), Math.random()],
    frozen: [Math.random(), Math.random()],
  };
}

function symbol(id: NodeId): string {
  const symbols: Record<NodeId, string> = {
    p1: "p₁",
    p2: "p₂",
    z: "z",
    pi: "π",
    pk: "pₖ",
    x1: "x₁",
    x2: "x₂",
    x3: "x₃",
    mix: "mixture",
    bernZ: "Bernoulli",
    obs: "",
  };
  return symbols[id];
}

function stages(draw: Draw, slot: 0 | 1 | 2 | null): { nodes: NodeId[]; edges: EdgeId[] }[] {
  const chosen: NodeId = draw.z === 1 ? "p1" : "p2";
  const xId: NodeId | null = slot === null ? null : (["x1", "x2", "x3"] as const)[slot];
  return [
    {
      nodes: draw.resampledZ ? ["pi", "bernZ", "z"] : ["z"],
      edges: draw.resampledZ ? [edgeId("bernZ", "pi"), edgeId("z", "bernZ")] : [],
    },
    {
      nodes: ["z", "mix", chosen],
      edges: [edgeId("mix", "z"), edgeId(chosen, "mix")],
    },
    {
      nodes: ["mix", "pk"],
      edges: [edgeId("mix", "pk")],
    },
    {
      nodes: xId ? ["pk", "obs", xId] : ["pk", "obs"],
      edges: xId ? [edgeId("pk", "obs"), edgeId("obs", xId)] : [edgeId("pk", "obs")],
    },
  ];
}

function heatFor(
  id: NodeId | EdgeId,
  phase: Phase | null,
  draw: Draw | null,
  slot: 0 | 1 | 2 | null,
  part: "nodes" | "edges",
): Heat {
  if (phase === null || draw === null) return "off";
  let heat: Heat = "off";
  const walk = stages(draw, slot);
  for (let stage = 0; stage <= phase; stage += 1) {
    const group = walk[stage][part] as readonly string[];
    if (!group.includes(id)) continue;
    heat = stage === phase ? "frontier" : heat === "frontier" ? "frontier" : "visited";
  }
  return heat;
}

function caption(kind: MixtureKind, phase: Phase | null, draw: Draw | null): string {
  if (phase === null || draw === null) {
    return kind === "ergodic"
      ? "Each toss starts by drawing a new z."
      : "The first toss draws z. Later tosses reuse it.";
  }
  const component = draw.z === 1 ? "p₁" : "p₂";
  if (phase === 0) {
    return draw.resampledZ
      ? `Drawing z. This draw is ${draw.z}.`
      : `z stays ${draw.z}. It is not drawn again.`;
  }
  if (phase === 1) return `z = ${draw.z} selects ${component} and passes it to the mixture.`;
  if (phase === 2) return `The mixture sets pₖ to ${draw.p.toFixed(2)}.`;
  return kind === "ergodic"
    ? `xₖ = ${draw.x}, a fresh Bernoulli toss. The long-run rate is the mixture.`
    : `xₖ = ${draw.x}. These tosses share one p, so the count of 1s is binomial.`;
}

export function MixtureDemo() {
  const [params, setParams] = useState<MixtureParams>(initialParams);
  const [playback, setPlayback] = useState<Playback>(initialPlayback);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState<1 | 8>(1);
  const paramsRef = useRef(params);
  const speedRef = useRef(speed);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!running) return;
    const delay = speed === 1 ? 340 : 120;
    const id = window.setInterval(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rush = reduceMotion || speedRef.current === 8;
      const batch = rush
        ? Array.from({ length: speedRef.current === 8 ? 8 : 1 }, () => makePair())
        : [makePair()];
      setPlayback((current) => {
        if (rush) {
          return batch.reduce(
            (state, draws) => completeExperiment(state, paramsRef.current, draws),
            current,
          );
        }
        return advancePlayback(current, paramsRef.current, batch[0]);
      });
    }, delay);
    return () => window.clearInterval(id);
  }, [running, speed]);

  function updateParam(key: keyof MixtureParams, value: number) {
    const next = { ...paramsRef.current, [key]: value };
    paramsRef.current = next;
    setParams(next);
    setPlayback(initialPlayback());
  }

  function step() {
    const draws = makePair();
    setPlayback((current) => completeExperiment(current, paramsRef.current, draws));
  }

  const effective = mixtureProbability(params);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 p-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Two experiments, one graph
          </p>
          <p className="mt-1 font-mono text-sm text-slate-600">
            p_eff = {effective.toFixed(3)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={step}
            disabled={running}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-ocean-300 hover:text-ocean-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Step
          </button>
          <button
            type="button"
            aria-pressed={running}
            onClick={() => setRunning((value) => !value)}
            className="rounded-full bg-ocean-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-ocean-800"
          >
            {running ? "Pause" : "Run"}
          </button>
          <button
            type="button"
            aria-pressed={speed === 8}
            onClick={() => setSpeed((value) => (value === 1 ? 8 : 1))}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              speed === 8
                ? "border-ocean-300 bg-ocean-50 text-ocean-900"
                : "border-slate-200 text-slate-600 hover:border-ocean-300 hover:text-ocean-900",
            )}
          >
            {speed === 1 ? "Speed 1×" : "Speed 8×"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setPlayback(initialPlayback());
            }}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-ocean-300 hover:text-ocean-900"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-4 border-b border-slate-200 p-4 sm:grid-cols-3">
        <Slider
          label="p₁"
          value={params.p1}
          onChange={(value) => updateParam("p1", value)}
        />
        <Slider
          label="p₂"
          value={params.p2}
          onChange={(value) => updateParam("p2", value)}
        />
        <Slider
          label="π"
          value={params.pi}
          onChange={(value) => updateParam("pi", value)}
        />
      </div>

      <div className="grid gap-6 p-4 lg:grid-cols-2">
        <GraphPanel
          kind="ergodic"
          tone="ocean"
          title="Ergodic"
          state={playback.ergodic}
          draw={playback.pending?.ergodic ?? null}
          phase={playback.phase}
          params={params}
        />
        <GraphPanel
          kind="frozen"
          tone="amber"
          title="Not ergodic"
          state={playback.frozen}
          draw={playback.pending?.frozen ?? null}
          phase={playback.phase}
          params={params}
        />
      </div>
    </div>
  );
}

function GraphPanel({
  kind,
  tone,
  title,
  state,
  draw,
  phase,
  params,
}: {
  kind: MixtureKind;
  tone: Tone;
  title: string;
  state: MixtureState;
  draw: Draw | null;
  phase: Phase | null;
  params: MixtureParams;
}) {
  const average = timeAverage(state);
  const limit = limitProbability(state, params);
  const gap =
    average === null || limit === null ? null : Math.abs(average - limit);

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60">
      <div className="px-4 pt-4">
        <h3 className="font-serif text-2xl text-ocean-900">{title}</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {observationFactor(kind)} observation
        </p>
      </div>
      <FactorGraph kind={kind} tone={tone} state={state} draw={draw} phase={phase} params={params} />
      <div className="space-y-3 px-4 pb-4">
        <p className="min-h-12 text-sm leading-relaxed text-slate-600">
          {caption(kind, phase, draw)}
        </p>
        <Meter label="Time" hint={state.steps === 0 ? "no tosses yet" : `${state.ones} of ${state.steps}`} value={average} />
        <Meter
          label={kind === "ergodic" ? "Mixture" : "Frozen p"}
          hint={kind === "ergodic" ? "π p₁ + (1−π) p₂" : "p₁ or p₂"}
          value={limit}
        />
        <p className="font-mono text-sm text-slate-500">
          Gap{" "}
          <span className="font-bold text-slate-800">
            {gap === null ? "—" : gap.toFixed(3)}
          </span>
        </p>
      </div>
    </section>
  );
}

function FactorGraph({
  kind,
  tone,
  state,
  draw,
  phase,
  params,
}: {
  kind: MixtureKind;
  tone: Tone;
  state: MixtureState;
  draw: Draw | null;
  phase: Phase | null;
  params: MixtureParams;
}) {
  const slot = writtenSlot(state.steps);
  const etc = point("x3");

  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${kind === "ergodic" ? "Ergodic" : "Not ergodic"} factor graph`}
      data-phase={phase ?? "idle"}
      data-steps={state.steps}
    >
      {edges.map(([from, to]) => {
        const a = point(from);
        const b = point(to);
        const heat = heatFor(edgeId(from, to), phase, draw, slot, "edges");
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            strokeWidth={heat === "frontier" ? 4 : heat === "visited" ? 3 : 1.5}
            className={cn("transition-colors duration-200", edgeStroke[tone][heat])}
          />
        );
      })}
      <line
        x1={point("obs").x}
        y1={point("obs").y}
        x2={etc.x + 78}
        y2={etc.y}
        strokeWidth={1.5}
        strokeDasharray="4 4"
        className="stroke-slate-300"
      />
      <text
        x={etc.x + 92}
        y={etc.y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-400 text-lg font-serif"
      >
        …
      </text>

      {(Object.keys(layout) as NodeId[])
        .filter((id) => layout[id].kind === "factor")
        .map((id) => (
          <FactorNode
            key={id}
            id={id}
            kind={kind}
            tone={tone}
            heat={heatFor(id, phase, draw, slot, "nodes")}
          />
        ))}

      {(Object.keys(layout) as NodeId[])
        .filter((id) => layout[id].kind === "variable")
        .map((id) => (
          <VariableNode
            key={id}
            id={id}
            tone={tone}
            heat={heatFor(id, phase, draw, slot, "nodes")}
            value={variableValue(id, state, draw, phase, params)}
          />
        ))}
    </svg>
  );
}

function variableValue(
  id: NodeId,
  state: MixtureState,
  draw: Draw | null,
  phase: Phase | null,
  params: MixtureParams,
): string | null {
  if (id === "p1") return params.p1.toFixed(2);
  if (id === "p2") return params.p2.toFixed(2);
  if (id === "pi") return params.pi.toFixed(2);
  if (id === "z") {
    const z = draw?.z ?? state.z;
    return z === null ? null : String(z);
  }
  if (id === "pk") {
    if (draw && phase !== null && phase >= 2) return draw.p.toFixed(2);
    return state.lastP === null ? null : state.lastP.toFixed(2);
  }
  if (id === "x1" || id === "x2" || id === "x3") {
    const index = id === "x1" ? 0 : id === "x2" ? 1 : 2;
    const bit = state.slots[index];
    return bit === null ? null : String(bit);
  }
  return null;
}

function VariableNode({
  id,
  tone,
  heat,
  value,
}: {
  id: NodeId;
  tone: Tone;
  heat: Heat;
  value: string | null;
}) {
  const { x, y } = point(id);
  const name = symbol(id);
  const valueTone = heat === "frontier" ? "fill-white" : "fill-slate-500";
  const nameTone = heat === "frontier" ? "fill-white" : "fill-ocean-950";

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={24}
        strokeWidth={2}
        className={cn("transition-colors duration-200", nodeFill[tone][heat])}
      />
      <text
        x={x}
        y={value === null ? y : y - 6}
        textAnchor="middle"
        dominantBaseline="central"
        className={cn("font-serif text-[13px]", nameTone)}
      >
        {name}
      </text>
      {value !== null && (
        <text
          x={x}
          y={y + 9}
          textAnchor="middle"
          dominantBaseline="central"
          className={cn("font-mono text-[10px]", valueTone)}
        >
          {value}
        </text>
      )}
    </g>
  );
}

function FactorNode({
  id,
  kind,
  tone,
  heat,
}: {
  id: NodeId;
  kind: MixtureKind;
  tone: Tone;
  heat: Heat;
}) {
  const { x, y } = point(id);
  const label = id === "obs" ? observationFactor(kind) : symbol(id);
  const width = label.length >= 8 ? 104 : 88;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 18}
        width={width}
        height={36}
        rx={10}
        strokeWidth={2}
        className={cn("transition-colors duration-200", nodeFill[tone][heat])}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className={cn(
          "font-sans text-[11px] font-semibold",
          heat === "frontier" ? "fill-white" : "fill-ocean-950",
        )}
      >
        {label}
      </text>
    </g>
  );
}

function Meter({
  label,
  hint,
  value,
}: {
  label: string;
  hint: string;
  value: number | null;
}) {
  const shown = value ?? 0;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="font-bold text-ocean-900">{label}</span>
        <span className="font-mono text-slate-500">
          {value === null ? "—" : value.toFixed(3)}
          <span className="ml-2 font-sans text-xs text-slate-400">{hint}</span>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-ocean-600"
          style={{ width: `${Math.min(100, Math.max(0, shown * 100))}%` }}
        />
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="flex items-baseline justify-between">
        <span>{label}</span>
        <span className="font-mono text-slate-500">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full accent-ocean-700"
      />
    </label>
  );
}
