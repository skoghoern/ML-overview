import { describe, expect, it } from "vitest";
import { neighbors } from "./site";

describe("neighbors", () => {
  it("keeps the introduction flowing into the levels", () => {
    expect(neighbors("/intro/framework").next?.path).toBe("/level-1");
    expect(neighbors("/level-2/inference/approximate").next).toBeUndefined();
    expect(neighbors("/level-2/inference/approximate").prev?.path).toBe(
      "/level-2/inference",
    );
  });

  it("keeps maths in its own reading order", () => {
    expect(neighbors("/maths").prev).toBeUndefined();
    expect(neighbors("/maths").next?.path).toBe("/maths/origins");
    expect(neighbors("/maths/changes").next?.path).toBe(
      "/maths/changes/ergodic-theory",
    );
    expect(neighbors("/maths/changes/ergodic-theory").next?.path).toBe(
      "/maths/applied",
    );
    expect(neighbors("/maths/applied").next).toBeUndefined();
  });
});
