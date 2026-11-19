import { describe, expect, it } from "vitest";
import {
  advancePlayback,
  commitDraw,
  completeExperiment,
  componentProbability,
  drawBit,
  initialPlayback,
  initialState,
  layout,
  limitProbability,
  mixtureProbability,
  observationFactor,
  planDraw,
  timeAverage,
  type MixtureParams,
  type RandomPair,
} from "./mixture";

const params: MixtureParams = { p1: 0.9, p2: 0.1, pi: 0.5 };

function pair(
  ergodic: readonly [number, number],
  frozen: readonly [number, number],
): RandomPair {
  return { ergodic, frozen };
}

describe("mixtureProbability", () => {
  it("averages the two component biases with weight π", () => {
    expect(mixtureProbability(params)).toBeCloseTo(0.5);
    expect(mixtureProbability({ p1: 0.8, p2: 0.2, pi: 0.25 })).toBeCloseTo(0.35);
  });
});

describe("planDraw", () => {
  it("lets z = 1 select p1 and z = 0 select p2", () => {
    const heads = planDraw(initialState("ergodic"), params, () => 0.2);
    expect(heads.z).toBe(1);
    expect(heads.p).toBeCloseTo(0.9);

    const tails = planDraw(initialState("ergodic"), params, () => 0.8);
    expect(tails.z).toBe(0);
    expect(tails.p).toBeCloseTo(0.1);
  });

  it("reuses z on a frozen chain", () => {
    const first = planDraw(initialState("frozen"), params, () => 0.2);
    const committed = commitDraw(initialState("frozen"), { ...first, x: 1 });
    const values = [0.99, 0];
    let index = 0;
    const second = planDraw(committed, params, () => values[index++] ?? 0);

    expect(second.z).toBe(1);
    expect(second.resampledZ).toBe(false);
    expect(second.p).toBeCloseTo(componentProbability(1, params));
    expect(index).toBe(1);
  });
});

describe("drawBit", () => {
  it("respects the endpoints", () => {
    expect(drawBit(0, () => 0)).toBe(0);
    expect(drawBit(1, () => 1)).toBe(1);
    expect(drawBit(0.5, () => 0.5)).toBe(0);
    expect(drawBit(0.5, () => 0.49)).toBe(1);
  });

  it("rejects a draw outside the unit interval", () => {
    expect(() => drawBit(0.5, () => 1.2)).toThrow(/\[0, 1\]/);
  });
});

describe("playback", () => {
  it("walks z, then the component, then p_k, then records x", () => {
    const draws = pair([0.2, 0], [0.8, 0.95]);
    let playback = initialPlayback();

    playback = advancePlayback(playback, params, draws);
    expect(playback.phase).toBe(0);
    expect(playback.ergodic.steps).toBe(0);
    expect(playback.pending?.ergodic.z).toBe(1);
    expect(playback.pending?.frozen.z).toBe(0);

    playback = advancePlayback(playback, params, draws);
    expect(playback.phase).toBe(1);
    playback = advancePlayback(playback, params, draws);
    expect(playback.phase).toBe(2);
    expect(playback.ergodic.steps).toBe(0);

    playback = advancePlayback(playback, params, draws);
    expect(playback.phase).toBe(3);
    expect(playback.ergodic.steps).toBe(1);
    expect(playback.ergodic.ones).toBe(1);
    expect(playback.ergodic.slots[0]).toBe(1);
    expect(playback.frozen.z).toBe(0);
    expect(playback.frozen.lastX).toBe(0);
    expect(timeAverage(playback.frozen)).toBe(0);
  });

  it("keeps a frozen z while the ergodic chain draws a new one", () => {
    let playback = completeExperiment(
      initialPlayback(),
      params,
      pair([0.2, 0], [0.2, 0]),
    );
    expect(playback.frozen.z).toBe(1);
    expect(playback.ergodic.z).toBe(1);

    playback = completeExperiment(playback, params, pair([0.9, 0], [0.9, 0]));
    expect(playback.frozen.z).toBe(1);
    expect(playback.frozen.steps).toBe(2);
    expect(playback.ergodic.z).toBe(0);
    expect(playback.ergodic.slots).toEqual([1, 1, null]);
  });

  it("finishes the experiment already on screen instead of skipping it", () => {
    let playback = advancePlayback(
      initialPlayback(),
      params,
      pair([0.2, 0], [0.2, 0]),
    );
    playback = completeExperiment(playback, params, pair([0.9, 0.9], [0.9, 0.9]));
    expect(playback.phase).toBe(3);
    expect(playback.ergodic.z).toBe(1);
    expect(playback.ergodic.steps).toBe(1);
  });
});

describe("the two limits", () => {
  it("sends an ergodic chain toward the mixture and a frozen chain toward its component", () => {
    const random = mulberry32(7);
    let playback = initialPlayback();
    for (let step = 0; step < 4000; step += 1) {
      playback = completeExperiment(playback, params, {
        ergodic: [random(), random()],
        frozen: [random(), random()],
      });
    }

    const mixture = mixtureProbability(params);
    const frozenLimit = limitProbability(playback.frozen, params);
    expect(timeAverage(playback.ergodic)).toBeCloseTo(mixture, 1);
    expect(frozenLimit === params.p1 || frozenLimit === params.p2).toBe(true);
    expect(timeAverage(playback.frozen)).toBeCloseTo(frozenLimit ?? 0, 1);
    expect(Math.abs((timeAverage(playback.frozen) ?? 0) - mixture)).toBeGreaterThan(0.25);
  });
});

describe("layout", () => {
  it("places the variables and factors on the requested grid", () => {
    expect(layout.p1).toMatchObject({ col: 1, row: 1, kind: "variable" });
    expect(layout.p2).toMatchObject({ col: 3, row: 1 });
    expect(layout.z).toMatchObject({ col: 3, row: 2, kind: "variable" });
    expect(layout.pi).toMatchObject({ col: 5, row: 2 });
    expect(layout.pk).toMatchObject({ col: 2, row: 3 });
    expect(layout.x1).toMatchObject({ col: 1, row: 6 });
    expect(layout.x2).toMatchObject({ col: 2, row: 6 });
    expect(layout.x3).toMatchObject({ col: 3, row: 6 });
    expect(layout.mix).toMatchObject({ col: 2, row: 2, kind: "factor" });
    expect(layout.bernZ).toMatchObject({ col: 4, row: 2, kind: "factor" });
    expect(layout.obs).toMatchObject({ col: 2, row: 4, kind: "factor" });
    expect(observationFactor("ergodic")).toBe("Bernoulli");
    expect(observationFactor("frozen")).toBe("Binomial");
  });
});

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
