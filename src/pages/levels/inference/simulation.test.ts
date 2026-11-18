import { describe, expect, it } from "vitest";
import {
  CANVAS_WIDTH,
  acceptanceProbability,
  getTargetDensity,
  isViConverged,
  runMCMCStep,
  runVIStep,
} from "./simulation";

function scripted(values: number[]) {
  let index = 0;
  return () => {
    const value = values[index] ?? 0;
    index += 1;
    return value;
  };
}

describe("getTargetDensity", () => {
  it("peaks on the dominant mode", () => {
    expect(getTargetDensity(120, 120)).toBeGreaterThan(getTargetDensity(0, 0));
    expect(getTargetDensity(120, 120)).toBeGreaterThan(getTargetDensity(280, 200));
  });
});

describe("runMCMCStep", () => {
  it("rejects a proposal that leaves the canvas without moving", () => {
    const step = runMCMCStep({ x: 390, y: 150 }, scripted([1, 0.5, 0]));

    expect(step.accepted).toBe(false);
    expect(step.position).toEqual({ x: 390, y: 150 });
    expect(step.proposal.x).toBeGreaterThan(CANVAS_WIDTH);
  });

  it("accepts or rejects an in-bounds proposal according to the ratio", () => {
    const start = { x: 120, y: 120 };
    const rejected = runMCMCStep(start, scripted([1, 0.5, 0.999]));
    const accepted = runMCMCStep(start, scripted([1, 0.5, 0]));

    expect(rejected.proposal).toEqual({ x: 140, y: 120 });
    expect(acceptanceProbability(start, rejected.proposal)).toBeLessThan(0.999);
    expect(rejected.accepted).toBe(false);
    expect(rejected.position).toEqual(start);

    expect(accepted.accepted).toBe(true);
    expect(accepted.position).toEqual(accepted.proposal);
  });
});

describe("runVIStep", () => {
  it("climbs toward the nearest mode and keeps a positive width", () => {
    const next = runVIStep({
      muX: 80,
      muY: 120,
      sigma: 15,
      gradX: 0,
      gradY: 0,
    });

    expect(next.muX).toBeGreaterThan(80);
    expect(next.sigma).toBeGreaterThan(0);
    expect(Number.isFinite(next.muY)).toBe(true);
  });
});

describe("isViConverged", () => {
  it("is true on the dominant mode with a flat gradient", () => {
    expect(
      isViConverged({ muX: 120, muY: 120, sigma: 45, gradX: 0, gradY: 0 }),
    ).toBe(true);
    expect(
      isViConverged({ muX: 0, muY: 0, sigma: 15, gradX: 0, gradY: 0 }),
    ).toBe(false);
  });
});
