import { describe, expect, it } from "vitest";
import {
  STEP_CAP,
  advance,
  insideArc,
  orbitPoint,
  resetOrbit,
  rotationById,
  timeAverage,
  wrapTurn,
  type OrbitState,
} from "./rotation";

function fresh(patch: Partial<OrbitState> = {}): OrbitState {
  return {
    rotationId: "fifth",
    start: 0,
    width: 0.3,
    steps: 0,
    hits: 0,
    ...patch,
  };
}

describe("wrapTurn", () => {
  it("folds values onto the half-open unit interval", () => {
    expect(wrapTurn(0)).toBe(0);
    expect(wrapTurn(1)).toBe(0);
    expect(wrapTurn(1.25)).toBeCloseTo(0.25);
    expect(wrapTurn(-0.25)).toBeCloseTo(0.75);
    expect(wrapTurn(Number.NaN)).toBe(0);
  });
});

describe("insideArc", () => {
  it("treats the arc as half-open", () => {
    expect(insideArc(0, 0.3)).toBe(true);
    expect(insideArc(0.2, 0.3)).toBe(true);
    expect(insideArc(0.3, 0.3)).toBe(false);
    expect(insideArc(0.2, 0.2)).toBe(false);
  });
});

describe("orbitPoint", () => {
  it("keeps a fifth-turn on its five points", () => {
    const rotation = rotationById("fifth");
    const points = [0, 1, 2, 3, 4, 5].map((step) =>
      orbitPoint(rotation, 0, step),
    );
    expect(points.map((point) => Number(point.toFixed(6)))).toEqual([
      0, 0.2, 0.4, 0.6, 0.8, 0,
    ]);
  });

  it("rejects a negative step", () => {
    expect(() => orbitPoint(rotationById("fifth"), 0, -1)).toThrow(/non-negative/);
  });
});

describe("advance", () => {
  it("counts a fifth-turn orbit by the points inside the arc, not by the arc length", () => {
    const settled = advance(fresh(), 5);
    expect(settled.hits).toBe(2);
    expect(timeAverage(settled)).toBeCloseTo(0.4);

    const repeated = advance(settled, 5);
    expect(timeAverage(repeated)).toBeCloseTo(0.4);
  });

  it("changes the settled average when the start changes", () => {
    const shifted = advance(fresh({ start: 0.31 }), 5);
    expect(shifted.hits).toBe(1);
    expect(timeAverage(shifted)).toBeCloseTo(0.2);
  });

  it("counts three of the seven points on a seventh-turn", () => {
    const settled = advance(fresh({ rotationId: "seventh" }), 7);
    expect(settled.hits).toBe(3);
    expect(timeAverage(settled)).toBeCloseTo(3 / 7);
  });

  it("brings a golden turn close to the arc length from any start", () => {
    for (const start of [0, 0.15, 0.83]) {
      const orbit = advance(fresh({ rotationId: "golden", start }), 4000);
      expect(timeAverage(orbit)).toBeCloseTo(0.3, 1);
    }
  });

  it("ignores an empty step and stops at the cap", () => {
    const start = fresh();
    expect(advance(start, 0)).toBe(start);
    const capped = advance({ ...start, steps: STEP_CAP, hits: 10 }, 5);
    expect(capped.steps).toBe(STEP_CAP);
    expect(capped.hits).toBe(10);
  });
});

describe("resetOrbit", () => {
  it("clears the counts and clamps the new start", () => {
    const next = resetOrbit(advance(fresh(), 4), { start: 1.4, width: -1 });
    expect(next).toEqual({
      rotationId: "fifth",
      start: 1,
      width: 0,
      steps: 0,
      hits: 0,
    });
  });
});
