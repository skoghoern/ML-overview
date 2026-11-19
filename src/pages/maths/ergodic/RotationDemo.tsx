import { useEffect, useRef, useState } from "react";
import {
  STEP_CAP,
  advance,
  insideArc,
  orbitPoint,
  resetOrbit,
  rotationById,
  rotations,
  timeAverage,
  type OrbitState,
} from "./rotation";
import { cn } from "../../../lib/utils";

const TRAIL = 160;

const initialOrbit: OrbitState = {
  rotationId: "fifth",
  start: 0,
  width: 0.3,
  steps: 0,
  hits: 0,
};

export function RotationDemo() {
  const [orbit, setOrbit] = useState<OrbitState>(initialOrbit);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState<1 | 20>(1);

  const rotation = rotationById(orbit.rotationId);
  const average = timeAverage(orbit);
  const atCap = orbit.steps >= STEP_CAP;
  const stepsRef = useRef(orbit.steps);

  useEffect(() => {
    stepsRef.current = orbit.steps;
  }, [orbit.steps]);

  useEffect(() => {
    if (!running) return;

    let frame = 0;
    const tick = () => {
      if (stepsRef.current >= STEP_CAP) {
        setRunning(false);
        return;
      }
      setOrbit((current) => advance(current, speed));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, speed]);

  function retune(patch: Parameters<typeof resetOrbit>[1]) {
    setOrbit((current) => resetOrbit(current, patch));
  }

  const currentPoint =
    orbit.steps === 0
      ? orbit.start
      : orbitPoint(rotation, orbit.start, orbit.steps - 1);

  const trailStart = Math.max(0, orbit.steps - TRAIL);
  const trail: number[] = [];
  for (let step = trailStart; step < orbit.steps; step += 1) {
    trail.push(orbitPoint(rotation, orbit.start, step));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
        <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Rotate a point
        </span>
        <div className="flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {rotations.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={orbit.rotationId === item.id}
              onClick={() => retune({ rotationId: item.id })}
              className={cn(
                "rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                orbit.rotationId === item.id
                  ? "bg-ocean-100 font-medium text-ocean-900"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <span className="block font-medium">{item.label}</span>
              <span className="block text-[11px] font-normal text-slate-400">
                {item.detail}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
        <CircleStage
          width={orbit.width}
          trail={trail}
          current={currentPoint}
          hasVisited={orbit.steps > 0}
        />

        <div className="flex flex-col justify-center gap-6">
          <Averages steps={orbit.steps} hits={orbit.hits} average={average} width={orbit.width} />
          <p className="text-sm leading-relaxed text-slate-600">
            {message(rotation.kind, orbit.steps, rotation.den, average, orbit.width)}
          </p>

          <div className="space-y-4">
            <Slider
              label="Arc length"
              value={orbit.width}
              min={0.05}
              max={0.95}
              onChange={(width) => retune({ width })}
            />
            <Slider
              label="Starting point"
              value={orbit.start}
              min={0}
              max={0.99}
              onChange={(start) => retune({ start })}
            />
          </div>

          {atCap && (
            <p className="text-xs leading-relaxed text-slate-400">
              Stopped after five million visits, while the position on the
              circle is still accurate.
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOrbit((current) => advance(current, 1))}
              disabled={atCap}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-ocean-300 hover:text-ocean-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Step
            </button>
            <button
              type="button"
              aria-pressed={running}
              onClick={() => setRunning((value) => !value)}
              disabled={atCap}
              className="rounded-full bg-ocean-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-ocean-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {running ? "Pause" : "Run"}
            </button>
            <button
              type="button"
              aria-pressed={speed === 20}
              onClick={() => setSpeed((value) => (value === 1 ? 20 : 1))}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                speed === 20
                  ? "border-ocean-300 bg-ocean-50 text-ocean-900"
                  : "border-slate-200 text-slate-600 hover:border-ocean-300 hover:text-ocean-900",
              )}
            >
              {speed === 1 ? "Speed 1×" : "Speed 20×"}
            </button>
            <button
              type="button"
              onClick={() => retune({})}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-ocean-300 hover:text-ocean-900"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function message(
  kind: "periodic" | "equidistributed",
  steps: number,
  period: number,
  average: number | null,
  width: number,
): string {
  if (steps === 0 || average === null) {
    return "The time average starts with the first visit. The space average is already determined: it is the length of the arc.";
  }
  if (kind === "periodic" && steps >= period) {
    return "The point has begun to repeat. This time average belongs to one finite orbit, so it can sit away from the arc length. Move the starting point and the settled value can change.";
  }
  if (kind === "periodic") {
    return "This turn is a rational fraction of the circle. The point is on a finite orbit, heading back to where it began.";
  }
  if (steps >= 200 && Math.abs(average - width) < 0.02) {
    return "The time average has settled close to the arc length. Move the starting point and the limit does not change: every orbit of this turn spends time in the arc in proportion to its length.";
  }
  return "This turn is an irrational fraction of the circle, so the point never repeats. The dots spread out, and the time average moves toward the arc length.";
}

function Averages({
  steps,
  hits,
  average,
  width,
}: {
  steps: number;
  hits: number;
  average: number | null;
  width: number;
}) {
  const gap = average === null ? null : Math.abs(average - width);

  return (
    <div className="space-y-4">
      <Meter
        label="Time"
        hint={steps === 0 ? "no visits yet" : `${hits} of ${steps} visits`}
        value={average}
      />
      <Meter label="Space" hint="length of the arc" value={width} />
      <p className="font-mono text-sm text-slate-500">
        Gap{" "}
        <span className="font-bold text-slate-800">
          {gap === null ? "—" : gap.toFixed(3)}
        </span>
      </p>
    </div>
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
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
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
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="flex items-baseline justify-between">
        {label}
        <span className="font-mono text-slate-500">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full accent-ocean-700"
      />
    </label>
  );
}

function CircleStage({
  width,
  trail,
  current,
  hasVisited,
}: {
  width: number;
  trail: number[];
  current: number;
  hasVisited: boolean;
}) {
  const size = 280;
  const center = size / 2;
  const radius = 104;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[320px]"
        role="img"
        aria-label="A circle with a shaded arc and the points visited so far"
      >
        <path d={sectorPath(center, radius, width)} className="fill-ocean-100" />
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="fill-none stroke-slate-300"
          strokeWidth="2"
        />
        {trail.map((point, index) => {
          const [x, y] = place(center, radius, point);
          const latest = index === trail.length - 1;
          const inside = insideArc(point, width);
          return (
            <circle
              key={`${point}-${index}`}
              cx={x}
              cy={y}
              r={latest ? 7 : 3.5}
              className={cn(
                latest ? "stroke-white" : "stroke-none",
                inside ? "fill-ocean-700" : "fill-slate-400",
              )}
              strokeWidth={latest ? 3 : 0}
            />
          );
        })}
        {!hasVisited && (
          <circle
            cx={place(center, radius, current)[0]}
            cy={place(center, radius, current)[1]}
            r="6"
            className="fill-white stroke-ocean-700"
            strokeWidth="3"
          />
        )}
        <text
          x={center + radius + 10}
          y={center + 4}
          className="fill-slate-400 text-[11px] font-sans"
        >
          0
        </text>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-slate-400">
        The arc starts at 0 and runs counterclockwise. Dots are the latest
        visits. The averages count every visit since reset.
      </p>
    </div>
  );
}

function place(center: number, radius: number, turn: number): [number, number] {
  const angle = turn * 2 * Math.PI;
  return [center + radius * Math.cos(angle), center - radius * Math.sin(angle)];
}

function sectorPath(center: number, radius: number, width: number): string {
  const [startX, startY] = place(center, radius, 0);
  const [endX, endY] = place(center, radius, width);
  const largeArc = width > 0.5 ? 1 : 0;
  return `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 0 ${endX} ${endY} Z`;
}
