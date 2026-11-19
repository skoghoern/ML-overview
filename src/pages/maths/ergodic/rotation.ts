/** A turn of the circle, as a fraction of one full revolution in [0, 1). */

export const STEP_CAP = 5_000_000;

export type RotationId = "fifth" | "seventh" | "golden";

export type Rotation = {
  id: RotationId;
  label: string;
  detail: string;
  /** Rational turns repeat. The golden turn is equidistributed and ergodic. */
  kind: "periodic" | "equidistributed";
  num: number;
  den: number;
  alpha: number;
};

export const rotations = [
  {
    id: "fifth",
    label: "1/5 turn",
    detail: "Repeats after 5 steps",
    kind: "periodic",
    num: 1,
    den: 5,
    alpha: 1 / 5,
  },
  {
    id: "seventh",
    label: "1/7 turn",
    detail: "Repeats after 7 steps",
    kind: "periodic",
    num: 1,
    den: 7,
    alpha: 1 / 7,
  },
  {
    id: "golden",
    label: "Golden turn",
    detail: "Never repeats",
    kind: "equidistributed",
    num: 1,
    den: 1,
    alpha: (Math.sqrt(5) - 1) / 2,
  },
] as const satisfies readonly Rotation[];

export type OrbitState = {
  rotationId: RotationId;
  /** Starting point, as a fraction of a turn. */
  start: number;
  /** Length of the half-open arc [0, width). */
  width: number;
  steps: number;
  hits: number;
};

export function rotationById(id: RotationId): Rotation {
  const found = rotations.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown rotation: ${id}`);
  }
  return found;
}

export function clampUnit(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/** Fold a real number onto the unit interval. */
export function wrapTurn(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const wrapped = value % 1;
  if (wrapped < 0) return wrapped + 1;
  return wrapped === 1 ? 0 : wrapped;
}

/**
 * The arc is half-open: a point on the endpoint is outside.
 * Rounding to 1e-9 keeps a point that lands on the endpoint outside
 * even when the binary expansion of a rational is not exact.
 */
export function insideArc(position: number, width: number): boolean {
  const scale = 1e9;
  return Math.round(wrapTurn(position) * scale) < Math.round(clampUnit(width) * scale);
}

/**
 * Position after `step` applications of the rotation, counting from 0.
 * Periodic turns step in exact integer arithmetic, so a long orbit
 * cannot drift off its finite set.
 */
export function orbitPoint(
  rotation: Rotation,
  start: number,
  step: number,
): number {
  const origin = clampUnit(start);
  if (step < 0 || !Number.isFinite(step)) {
    throw new Error(`Orbit step must be a non-negative finite number, got ${step}`);
  }
  const index = Math.floor(step);
  if (rotation.kind === "periodic") {
    const shift = (index * rotation.num) % rotation.den;
    return wrapTurn(origin + shift / rotation.den);
  }
  return wrapTurn(origin + index * rotation.alpha);
}

export function timeAverage(state: OrbitState): number | null {
  if (state.steps <= 0) return null;
  return state.hits / state.steps;
}

export function advance(state: OrbitState, count: number): OrbitState {
  if (!Number.isFinite(count) || count <= 0) return state;

  const rotation = rotationById(state.rotationId);
  const room = STEP_CAP - state.steps;
  if (room <= 0) return state;

  const stepsToAdd = Math.min(Math.floor(count), room);
  let hits = state.hits;
  for (let offset = 0; offset < stepsToAdd; offset += 1) {
    const point = orbitPoint(rotation, state.start, state.steps + offset);
    if (insideArc(point, state.width)) hits += 1;
  }

  return { ...state, steps: state.steps + stepsToAdd, hits };
}

export function resetOrbit(
  state: OrbitState,
  patch: Partial<Pick<OrbitState, "rotationId" | "start" | "width">>,
): OrbitState {
  return {
    rotationId: patch.rotationId ?? state.rotationId,
    start: clampUnit(patch.start ?? state.start),
    width: clampUnit(patch.width ?? state.width),
    steps: 0,
    hits: 0,
  };
}
