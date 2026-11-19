import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Anchor,
  Box,
  Compass,
  FlaskConical,
  GitBranch,
  Hexagon,
  Infinity as InfinityIcon,
  Landmark,
  Layers,
  Lightbulb,
  Map,
  Milestone,
  Orbit,
} from "lucide-react";

export type SectionId = "introduction" | "levels" | "maths";

export type Page = {
  path: string;
  section: SectionId;
  label: string;
  icon: LucideIcon;
  parent?: string;
};

/**
 * Reading order for the site. Routes, the sidebar, the landing menu,
 * and the previous/next links are all derived from this list.
 * To add a lesson: append a row here and register its component in App.tsx.
 *
 * Introduction flows into the levels. Maths is a separate sequence:
 * previous/next stays inside one group, so the end of the levels still
 * points at the unwritten Level 3 rather than jumping into the map.
 */
const readingGroups: readonly (readonly SectionId[])[] = [
  ["introduction", "levels"],
  ["maths"],
];

export const pages = [
  {
    path: "/intro/motivation",
    section: "introduction",
    label: "1. The Motivation",
    icon: Lightbulb,
  },
  {
    path: "/intro/approach",
    section: "introduction",
    label: "2. The Approach",
    icon: Compass,
  },
  {
    path: "/intro/framework",
    section: "introduction",
    label: "3. The Framework",
    icon: Layers,
  },
  {
    path: "/level-1",
    section: "levels",
    label: "Level 1: The Goal",
    icon: Anchor,
  },
  {
    path: "/level-2",
    section: "levels",
    label: "Level 2: The Algorithm",
    icon: Map,
  },
  {
    path: "/level-2/inference",
    section: "levels",
    label: "2.2 Inference",
    icon: GitBranch,
    parent: "/level-2",
  },
  {
    path: "/level-2/inference/approximate",
    section: "levels",
    label: "2.2.1 Approximate Methods",
    icon: Activity,
    parent: "/level-2",
  },
  {
    path: "/maths",
    section: "maths",
    label: "The Map",
    icon: Map,
  },
  {
    path: "/maths/origins",
    section: "maths",
    label: "Origins",
    icon: Milestone,
  },
  {
    path: "/maths/foundations",
    section: "maths",
    label: "Foundations",
    icon: Landmark,
  },
  {
    path: "/maths/structures",
    section: "maths",
    label: "Structures",
    icon: Hexagon,
  },
  {
    path: "/maths/spaces",
    section: "maths",
    label: "Spaces",
    icon: Box,
  },
  {
    path: "/maths/changes",
    section: "maths",
    label: "Changes",
    icon: Orbit,
  },
  {
    path: "/maths/changes/ergodic-theory",
    section: "maths",
    label: "Ergodic Theory",
    icon: InfinityIcon,
    parent: "/maths/changes",
  },
  {
    path: "/maths/applied",
    section: "maths",
    label: "Applied Mathematics",
    icon: FlaskConical,
  },
] as const satisfies readonly Page[];

export type PagePath = (typeof pages)[number]["path"];

export const sections = [
  {
    id: "introduction",
    title: "Part I: Introduction",
    part: "Part I",
    menu: "Introduction",
  },
  {
    id: "levels",
    title: "Part II: The Levels",
    part: "Part II",
    menu: "The Levels",
  },
  {
    id: "maths",
    title: "Part III: Maths",
    part: "Part III",
    menu: "Maths",
  },
] as const satisfies readonly {
  id: SectionId;
  title: string;
  part: string;
  menu: string;
}[];

/** Shown in the sidebar until a real page exists. Not a route. */
const plannedByParent: Partial<Record<PagePath, readonly string[]>> = {
  "/level-2": ["2.1 The Model"],
  "/maths/origins": ["Number Systems"],
  "/maths/foundations": ["Measure Theory"],
  "/maths/structures": ["Linear Algebra"],
  "/maths/spaces": ["Topology"],
  "/maths/changes": ["Dynamical Systems"],
  "/maths/applied": ["Probability"],
};

export type SidebarEntry =
  | { type: "page"; page: (typeof pages)[number] }
  | { type: "soon"; label: string };

export function page(path: PagePath) {
  const found = pages.find((item) => item.path === path);
  if (!found) {
    throw new Error(`Missing page: ${path}`);
  }
  return found;
}

export function getPage(path: string) {
  return pages.find((item) => item.path === path);
}

export function pagesInSection(
  section: SectionId,
  options?: { topLevel?: boolean },
) {
  return pages.filter((item) => {
    if (item.section !== section) return false;
    if (options?.topLevel && "parent" in item) return false;
    return true;
  });
}

export function sidebarChildren(parent: PagePath): SidebarEntry[] {
  const soon = (plannedByParent[parent] ?? []).map((label) => ({
    type: "soon" as const,
    label,
  }));
  const links = pages
    .filter((item) => "parent" in item && item.parent === parent)
    .map((item) => ({ type: "page" as const, page: item }));
  return [...soon, ...links];
}

export function neighbors(path: string): {
  prev?: (typeof pages)[number];
  next?: (typeof pages)[number];
} {
  const current = pages.find((item) => item.path === path);
  if (!current) return {};

  const group = readingGroups.find((sectionsInGroup) =>
    sectionsInGroup.some((section) => section === current.section),
  ) ?? [current.section];
  const sequence = pages.filter((item) =>
    group.some((section) => section === item.section),
  );
  const index = sequence.findIndex((item) => item.path === path);
  if (index === -1) return {};

  return {
    prev: index > 0 ? sequence[index - 1] : undefined,
    next: index < sequence.length - 1 ? sequence[index + 1] : undefined,
  };
}
