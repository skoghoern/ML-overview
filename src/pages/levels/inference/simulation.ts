export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 300;

export type Point = { x: number; y: number };

export type Proposal = Point & { accepted: boolean };

export type MCMCStep = {
  position: Point;
  proposal: Point;
  accepted: boolean;
};

export type VIState = {
  muX: number;
  muY: number;
  sigma: number;
  gradX: number;
  gradY: number;
};

export const INITIAL_WALKER: Point = { x: 200, y: 150 };
export const INITIAL_VI: VIState = {
  muX: 100,
  muY: 220,
  sigma: 15,
  gradX: 0,
  gradY: 0,
};

/** Unnormalized target used as the "true" posterior. Two modes, one dominant. */
export function getTargetDensity(x: number, y: number) {
  const peak = (cx: number, cy: number, weight: number, spread: number) =>
    weight *
    Math.exp(
      -(Math.pow(x - cx, 2) / (2 * spread) + Math.pow(y - cy, 2) / (2 * spread)),
    );

  return peak(120, 120, 1, 1200) + peak(280, 200, 0.6, 1500);
}

export function acceptanceProbability(current: Point, proposal: Point) {
  const pCurrent = getTargetDensity(current.x, current.y);
  const pProposal = getTargetDensity(proposal.x, proposal.y);
  return Math.min(1, pProposal / (pCurrent + 0.0001));
}

function insideCanvas(point: Point) {
  return (
    point.x >= 0 &&
    point.x <= CANVAS_WIDTH &&
    point.y >= 0 &&
    point.y <= CANVAS_HEIGHT
  );
}

/**
 * One Metropolis–Hastings step.
 * `random` is injectable so the accept/reject decision can be tested.
 * An out-of-bounds proposal is rejected before the acceptance draw.
 */
export function runMCMCStep(
  current: Point,
  random: () => number = Math.random,
): MCMCStep {
  const stepSize = 40;
  const proposal = {
    x: current.x + (random() - 0.5) * stepSize,
    y: current.y + (random() - 0.5) * stepSize,
  };

  if (!insideCanvas(proposal)) {
    return { position: current, proposal, accepted: false };
  }

  const accepted = random() < acceptanceProbability(current, proposal);
  return {
    position: accepted ? proposal : current,
    proposal,
    accepted,
  };
}

/** One gradient step of a Gaussian variational approximation. */
export function runVIStep(params: VIState): VIState {
  const pCenter = getTargetDensity(params.muX, params.muY);
  const pRight = getTargetDensity(params.muX + 5, params.muY);
  const pUp = getTargetDensity(params.muX, params.muY - 5);

  // Large enough to climb the hill in the demo; not a tuned optimizer.
  const learningRate = 60;
  const gradX = (pRight - pCenter) * learningRate;
  const gradY = (pUp - pCenter) * learningRate;
  const targetSigma = pCenter > 0.1 ? 45 : 15;

  return {
    muX: params.muX + gradX,
    muY: params.muY - gradY,
    sigma: params.sigma + (targetSigma - params.sigma) * 0.08,
    gradX,
    gradY,
  };
}

export function isViConverged(params: VIState) {
  const density = getTargetDensity(params.muX, params.muY);
  const gradMag = Math.hypot(params.gradX, params.gradY);
  return density > 0.8 && gradMag < 5;
}
