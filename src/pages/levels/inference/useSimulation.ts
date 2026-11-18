import { useCallback, useEffect, useRef, useState } from "react";
import {
  getTargetDensity,
  INITIAL_VI,
  INITIAL_WALKER,
  isViConverged,
  runMCMCStep,
  runVIStep,
  type Point,
  type Proposal,
  type VIState,
} from "./simulation";

export type Method = "mcmc" | "vi";

const TICK_MS = 40;

/**
 * Owns playback for the approximate-inference demo.
 * Steps are applied from refs, once per tick, so a state updater never
 * records a sample as a side effect.
 */
export function useSimulation() {
  const [method, setMethod] = useState<Method>("mcmc");
  const [isPlaying, setIsPlaying] = useState(false);
  const [samples, setSamples] = useState<Point[]>([]);
  const [walker, setWalker] = useState<Point>(INITIAL_WALKER);
  const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);
  const [totalSamples, setTotalSamples] = useState(0);
  const [viParams, setViParams] = useState<VIState>(INITIAL_VI);
  const [viPath, setViPath] = useState<
    { x: number; y: number; sigma: number }[]
  >([]);
  const [elboPath, setElboPath] = useState<number[]>([]);

  const walkerRef = useRef(INITIAL_WALKER);
  const viRef = useRef(INITIAL_VI);
  const runId = useRef(0);

  const reset = useCallback(() => {
    runId.current += 1;
    walkerRef.current = INITIAL_WALKER;
    viRef.current = INITIAL_VI;
    setIsPlaying(false);
    setSamples([]);
    setWalker(INITIAL_WALKER);
    setCurrentProposal(null);
    setTotalSamples(0);
    setViParams(INITIAL_VI);
    setViPath([]);
    setElboPath([]);
  }, []);

  const selectMethod = (next: Method) => {
    if (next === method) return;
    reset();
    setMethod(next);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const id = runId.current;

    const timer = window.setInterval(() => {
      if (runId.current !== id) return;

      if (method === "mcmc") {
        const step = runMCMCStep(walkerRef.current);
        setCurrentProposal({ ...step.proposal, accepted: step.accepted });
        if (!step.accepted) return;

        walkerRef.current = step.position;
        setWalker(step.position);
        setSamples((trail) => [...trail.slice(-100), step.position]);
        setTotalSamples((count) => count + 1);
        return;
      }

      const next = runVIStep(viRef.current);
      viRef.current = next;
      setViParams(next);
      setViPath((trail) => [
        ...trail.slice(-50),
        { x: next.muX, y: next.muY, sigma: next.sigma },
      ]);
      setElboPath((trail) =>
        [...trail, getTargetDensity(next.muX, next.muY)].slice(-100),
      );
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying, method]);

  return {
    method,
    setMethod: selectMethod,
    isPlaying,
    togglePlay: () => setIsPlaying((playing) => !playing),
    reset,
    samples,
    walker,
    currentProposal,
    totalSamples,
    viParams,
    viPath,
    elboPath,
    converged: method === "vi" && isViConverged(viParams),
  };
}
