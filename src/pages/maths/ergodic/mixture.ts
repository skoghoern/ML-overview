/**
 * Bernoulli–Bernoulli mixture, run as two experiments.
 *
 * z = 1 with probability π, and that choice selects p₁. Otherwise the toss
 * uses p₂. A single toss is then 1 with probability
 * p_eff = π p₁ + (1-π) p₂.
 *
 * Ergodic experiment: draw a new z before every x.
 * Frozen experiment: draw z once, then reuse it, so the average settles
 * on p₁ or on p₂ and never on the mixture.
 */

export type MixtureKind = "ergodic" | "frozen";

export type MixtureParams = {
  p1: number;
  p2: number;
  pi: number;
};

export type Bit = 0 | 1;

export type Draw = {
  z: Bit;
  /** Component probability actually used for this toss. */
  p: number;
  x: Bit;
  /** False once a frozen chain is reusing the z it drew at the start. */
  resampledZ: boolean;
};

export type Slots = readonly [Bit | null, Bit | null, Bit | null];

export type MixtureState = {
  kind: MixtureKind;
  z: Bit | null;
  steps: number;
  ones: number;
  lastP: number | null;
  lastX: Bit | null;
  slots: Slots;
};

export type Phase = 0 | 1 | 2 | 3;

export type RandomPair = {
  ergodic: readonly [number, number];
  frozen: readonly [number, number];
};

export type Playback = {
  ergodic: MixtureState;
  frozen: MixtureState;
  /** null before the first experiment. 3 means the latest toss has been recorded. */
  phase: Phase | null;
  pending: { ergodic: Draw; frozen: Draw } | null;
};

/** Grid coordinates from the factor-graph sketch. Columns left to right, rows top to bottom. */
export const layout = {
  p1: { col: 1, row: 1, kind: "variable" },
  p2: { col: 3, row: 1, kind: "variable" },
  mix: { col: 2, row: 2, kind: "factor" },
  z: { col: 3, row: 2, kind: "variable" },
  bernZ: { col: 4, row: 2, kind: "factor" },
  pi: { col: 5, row: 2, kind: "variable" },
  pk: { col: 2, row: 3, kind: "variable" },
  obs: { col: 2, row: 4, kind: "factor" },
  x1: { col: 1, row: 6, kind: "variable" },
  x2: { col: 2, row: 6, kind: "variable" },
  x3: { col: 3, row: 6, kind: "variable" },
} as const;

export type NodeId = keyof typeof layout;

export const edges = [
  ["p1", "mix"],
  ["p2", "mix"],
  ["mix", "z"],
  ["z", "bernZ"],
  ["bernZ", "pi"],
  ["mix", "pk"],
  ["pk", "obs"],
  ["obs", "x1"],
  ["obs", "x2"],
  ["obs", "x3"],
] as const satisfies readonly (readonly [NodeId, NodeId])[];

export type EdgeId = `${(typeof edges)[number][0]}-${(typeof edges)[number][1]}`;

export function edgeId(from: NodeId, to: NodeId): EdgeId {
  return `${from}-${to}` as EdgeId;
}

export function observationFactor(kind: MixtureKind): "Bernoulli" | "Binomial" {
  return kind === "ergodic" ? "Bernoulli" : "Binomial";
}

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function mixtureProbability(params: MixtureParams): number {
  const pi = clamp01(params.pi);
  return pi * clamp01(params.p1) + (1 - pi) * clamp01(params.p2);
}

export function componentProbability(z: Bit, params: MixtureParams): number {
  return z === 1 ? clamp01(params.p1) : clamp01(params.p2);
}

export function initialState(kind: MixtureKind): MixtureState {
  return {
    kind,
    z: null,
    steps: 0,
    ones: 0,
    lastP: null,
    lastX: null,
    slots: [null, null, null],
  };
}

export function initialPlayback(): Playback {
  return {
    ergodic: initialState("ergodic"),
    frozen: initialState("frozen"),
    phase: null,
    pending: null,
  };
}

export function timeAverage(state: MixtureState): number | null {
  if (state.steps <= 0) return null;
  return state.ones / state.steps;
}

/** What the time average is heading toward: the mixture, or the frozen component. */
export function limitProbability(state: MixtureState, params: MixtureParams): number | null {
  if (state.kind === "ergodic") return mixtureProbability(params);
  if (state.z === null) return null;
  return componentProbability(state.z, params);
}

/**
 * A uniform draw on [0, 1] lands on 1 when the bias is 1, and on 0 when it is 0.
 * Values strictly inside (0, 1) use a half-open cut.
 */
export function drawBit(bias: number, random: () => number): Bit {
  const u = random();
  if (!Number.isFinite(u) || u < 0 || u > 1) {
    throw new Error(`Random draw must lie in [0, 1], got ${u}`);
  }
  const p = clamp01(bias);
  if (p >= 1) return 1;
  if (p <= 0) return 0;
  return u < p ? 1 : 0;
}

export function planDraw(
  state: MixtureState,
  params: MixtureParams,
  random: () => number,
): Draw {
  const resampledZ = state.kind === "ergodic" || state.z === null;
  const z = resampledZ ? drawBit(params.pi, random) : state.z;
  if (z === null) {
    throw new Error("Frozen chain has no z to reuse");
  }
  const p = componentProbability(z, params);
  const x = drawBit(p, random);
  return { z, p, x, resampledZ };
}

export function commitDraw(state: MixtureState, draw: Draw): MixtureState {
  const slot = (state.steps % 3) as 0 | 1 | 2;
  const slots = [state.slots[0], state.slots[1], state.slots[2]] as [
    Bit | null,
    Bit | null,
    Bit | null,
  ];
  slots[slot] = draw.x;
  return {
    ...state,
    z: draw.z,
    steps: state.steps + 1,
    ones: state.ones + draw.x,
    lastP: draw.p,
    lastX: draw.x,
    slots,
  };
}

/** Slot just written, once `steps` includes that toss. */
export function writtenSlot(steps: number): 0 | 1 | 2 | null {
  if (steps <= 0) return null;
  return ((steps - 1) % 3) as 0 | 1 | 2;
}

function cursor(values: readonly number[]): () => number {
  let index = 0;
  return () => {
    const value = values[index];
    index += 1;
    if (value === undefined) {
      throw new Error("Ran out of random draws");
    }
    return value;
  };
}

function planBoth(playback: Playback, params: MixtureParams, draws: RandomPair) {
  return {
    ergodic: planDraw(playback.ergodic, params, cursor(draws.ergodic)),
    frozen: planDraw(playback.frozen, params, cursor(draws.frozen)),
  };
}

/**
 * One frame of the walk z → mixture → pₖ → x.
 * Random numbers are only consumed when a new experiment starts.
 */
export function advancePlayback(
  playback: Playback,
  params: MixtureParams,
  draws: RandomPair,
): Playback {
  const starting =
    playback.pending === null || playback.phase === null || playback.phase === 3;
  if (starting) {
    return {
      ...playback,
      phase: 0,
      pending: planBoth(playback, params, draws),
    };
  }
  if (playback.phase === 0 || playback.phase === 1) {
    return { ...playback, phase: playback.phase === 0 ? 1 : 2 };
  }
  if (playback.pending === null) {
    throw new Error("Cannot record a toss before it has been drawn");
  }
  return {
    ergodic: commitDraw(playback.ergodic, playback.pending.ergodic),
    frozen: commitDraw(playback.frozen, playback.pending.frozen),
    phase: 3,
    pending: playback.pending,
  };
}

/** Finish the experiment already on screen, or run a new one if nothing is pending. */
export function completeExperiment(
  playback: Playback,
  params: MixtureParams,
  draws: RandomPair,
): Playback {
  const pending =
    playback.pending !== null && playback.phase !== null && playback.phase < 3
      ? playback.pending
      : planBoth(playback, params, draws);
  return {
    ergodic: commitDraw(playback.ergodic, pending.ergodic),
    frozen: commitDraw(playback.frozen, pending.frozen),
    phase: 3,
    pending,
  };
}
