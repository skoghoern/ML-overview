import type { PagePath } from "./site";

export type MathRegionId =
  | "origins"
  | "foundations"
  | "structures"
  | "spaces"
  | "changes"
  | "applied";

export type MathTopic = {
  label: string;
  note: string;
  path?: PagePath;
};

export type MathRegion = {
  id: MathRegionId;
  path: PagePath;
  label: string;
  blurb: string;
  tone: string;
  title: string;
  paragraphs: readonly string[];
  topics: readonly MathTopic[];
};

/**
 * High-level regions of Dominic Walliman's Map of Mathematics.
 * Origins in the middle, pure mathematics in four regions, applied beside them.
 */
export const regions = [
  {
    id: "origins",
    path: "/maths/origins",
    label: "Origins",
    blurb: "Counting and the number systems",
    tone: "border-amber-200 bg-amber-50/80",
    title: "From counting to number systems",
    paragraphs: [
      "Every other region is built out of number. The historical start is counting: one thing, another thing, and eventually a symbol for how many. Zero and the negative numbers make the integers. Ratios of integers make the rationals. Limits of rationals make the reals, which are what calculus needs. Pairs of reals, with a rule for multiplying them, make the complex numbers.",
      "The pages in this region will take those systems one at a time. They are the raw material. Foundations asks what has to be assumed in order to talk about them. Structures asks which patterns remain when a particular system is forgotten.",
    ],
    topics: [
      {
        label: "Counting",
        note: "The act the rest of the numbers are built to extend.",
      },
      {
        label: "Number systems",
        note: "Naturals, integers, rationals, reals, and complex numbers.",
      },
    ],
  },
  {
    id: "foundations",
    path: "/maths/foundations",
    label: "Foundations",
    blurb: "Logic, sets, and measure",
    tone: "border-slate-200 bg-white",
    title: "The assumptions underneath",
    paragraphs: [
      "Before a theorem can be proved, something has to be granted: which objects exist, which arguments count as valid, and what it means for a set to be large. Logic and set theory are the usual answers. They are also where the famous cracks show. A consistent axiom system strong enough to talk about arithmetic cannot prove its own consistency, and no algorithm decides every arithmetic sentence.",
      "One idea from this region is used directly by ergodic theory. A measure is a systematic way to say how large a set is, general enough for infinite sets that have no ordinary length. Arc length on the circle is a measure. The phrase “almost every” in Birkhoff’s theorem means “except on a set of measure zero.”",
    ],
    topics: [
      {
        label: "Mathematical logic",
        note: "What counts as a proof, and what a formal system can say about itself.",
      },
      {
        label: "Set theory",
        note: "The usual language for collections, functions, and infinity.",
      },
      {
        label: "Measure theory",
        note: "Size, generalized so that length, area, and probability are one idea.",
      },
      {
        label: "Computation",
        note: "Which problems a finite procedure can decide.",
      },
    ],
  },
  {
    id: "structures",
    path: "/maths/structures",
    label: "Structures",
    blurb: "Algebra, groups, and graphs",
    tone: "border-slate-200 bg-white",
    title: "The patterns that survive abstraction",
    paragraphs: [
      "Algebra begins when you stop looking at one number system and start looking at the operations. A group is a set with one operation that can undo itself. A vector space is a set where you can add and scale. A graph is a set of connections, with the elements themselves left blank.",
      "The map clusters number theory, combinatorics, groups, graphs, and linear algebra here. They are the shared vocabulary of the rest of mathematics. A symmetry of a dynamical system is a group. A Markov chain is a weighted graph.",
    ],
    topics: [
      {
        label: "Linear algebra",
        note: "Vectors, matrices, and the maps that respect scaling and addition.",
      },
      {
        label: "Group theory",
        note: "Symmetry, written as an operation that can be undone.",
      },
      {
        label: "Number theory",
        note: "The integers, studied for their own structure.",
      },
      {
        label: "Graphs and combinatorics",
        note: "Discrete connection, and counting without listing.",
      },
    ],
  },
  {
    id: "spaces",
    path: "/maths/spaces",
    label: "Spaces",
    blurb: "Geometry and topology",
    tone: "border-slate-200 bg-white",
    title: "Shape and nearness",
    paragraphs: [
      "Geometry studies shape together with a way to measure distance and angle. Topology keeps the idea of closeness and lets the distances go. A circle and an ellipse are different in geometry and the same in topology: each is a loop. Differential geometry puts the two back together, giving a smooth shape a local notion of distance.",
      "Ergodic theory borrows the circle from this region as its first example, then equips that circle with a measure and a motion. The shape matters less than how a rule moves points around on it.",
    ],
    topics: [
      {
        label: "Geometry and trigonometry",
        note: "Distance, angle, and the circle as a measured shape.",
      },
      {
        label: "Topology",
        note: "Which features of a shape survive continuous deformation.",
      },
      {
        label: "Differential geometry",
        note: "Smooth shapes with a local notion of distance and curvature.",
      },
    ],
  },
  {
    id: "changes",
    path: "/maths/changes",
    label: "Changes",
    blurb: "Calculus, dynamics, ergodic theory",
    tone: "border-slate-200 bg-white",
    title: "Motion, iteration, and the long run",
    paragraphs: [
      "Calculus is the study of instantaneous change, and of the accumulation of that change. Differential equations turn a description of change into a path. Iterate a rule instead of solving it in closed form, and you are doing dynamical systems. Some of those systems are chaotic: nearby starts separate quickly, and a small error in the initial state becomes a different story.",
      "Ergodic theory asks a statistical question about the same objects. Even when a single orbit is complicated, the fraction of time it spends in a region may still be simple. The page below makes that precise for the most transparent system on the map: rotation of a circle.",
    ],
    topics: [
      {
        label: "Calculus",
        note: "Rates of change, and the accumulation of those rates.",
      },
      {
        label: "Differential equations",
        note: "A rule for how a state moves, written in the language of rates.",
      },
      {
        label: "Dynamical systems",
        note: "What happens when a rule is iterated, including chaos.",
      },
      {
        label: "Ergodic theory",
        note: "When the time spent in a region equals the size of that region.",
        path: "/maths/changes/ergodic-theory",
      },
    ],
  },
  {
    id: "applied",
    path: "/maths/applied",
    label: "Applied Mathematics",
    blurb: "Probability, physics, and computation",
    tone: "border-sky-200 bg-sky-50/80",
    title: "Mathematics with a job to do",
    paragraphs: [
      "Applied mathematics is a direction more than a method. Probability, statistics, optimization, cryptography, and the mathematical theories of physics and biology are built to answer questions that did not start as mathematics. The boundary with the pure side is porous. Probability needs measure. Dynamical systems reappear as control theory and as models of populations.",
      "Ergodic theory is filed under Changes and used constantly on this side of the map. A law of large numbers for dependent trials, the equilibrium of a physical system, and the correctness of a long Monte Carlo run are three versions of one statement: a time average converged to a space average.",
    ],
    topics: [
      {
        label: "Probability",
        note: "Measure used to talk about uncertainty, and the laws of large numbers.",
      },
      {
        label: "Statistics",
        note: "What a sample lets you say about the process that produced it.",
      },
      {
        label: "Optimization",
        note: "Finding the best object under an explicit constraint.",
      },
      {
        label: "Mathematical physics",
        note: "Mechanics, fields, and statistical physics written as mathematics.",
      },
    ],
  },
] as const satisfies readonly MathRegion[];

export function regionById(id: MathRegionId) {
  const found = regions.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown maths region: ${id}`);
  }
  return found;
}
