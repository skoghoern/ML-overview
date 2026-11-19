import { Link } from "react-router-dom";
import { ArrowRight, Infinity as InfinityIcon } from "lucide-react";
import { TerritoryMap } from "../../components/maths/TerritoryMap";
import { LessonNav } from "../../components/lesson/LessonNav";
import { PageHeader } from "../../components/lesson/PageHeader";
import { regionById, type MathRegionId } from "../../content/maths";
import { page } from "../../content/site";

export function MathBranch({ id }: { id: "map" | MathRegionId }) {
  if (id === "map") return <MapHome />;
  return <RegionHome id={id} />;
}

function MapHome() {
  return (
    <div className="max-w-4xl mx-auto pb-32">
      <PageHeader title="The Map of Mathematics">
        <p>
          Dominic Walliman’s map divides the subject into a handful of large
          regions. This section follows that division: origins in the middle,
          pure mathematics in four regions, and applied mathematics beside
          them. Each region is a place for an interactive explanation. One
          page is written so far.
        </p>
      </PageHeader>

      <section className="mb-12 space-y-4">
        <TerritoryMap />
        <p className="text-sm leading-relaxed text-slate-500">
          Origins is the middle of the poster: counting, and the number
          systems built from it. Foundations, structures, spaces, and changes
          are the pure side. Applied mathematics is the side built to answer
          questions that did not start as mathematics.
        </p>
      </section>

      <Link
        to={page("/maths/changes/ergodic-theory").path}
        className="group mb-8 flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-ocean-300"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700">
          <InfinityIcon size={22} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-ocean-600">
            Under Changes
          </span>
          <span className="mt-1 block font-serif text-2xl font-bold text-ocean-900">
            Ergodic Theory
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-slate-600">
            Follow one point as a fixed turn carries it around a circle. The
            fraction of time it spends in an arc either settles on the length
            of that arc, or it doesn’t — and the difference is the subject.
          </span>
        </span>
        <ArrowRight
          size={20}
          className="hidden shrink-0 text-ocean-600 transition-transform group-hover:translate-x-1 sm:block"
        />
      </Link>

      <LessonNav />
    </div>
  );
}

function RegionHome({ id }: { id: MathRegionId }) {
  const region = regionById(id);

  return (
    <div className="max-w-4xl mx-auto pb-32">
      <PageHeader title={region.title}>
        <p>{region.paragraphs[0]}</p>
      </PageHeader>

      <section className="mb-16">
        <TerritoryMap active={region.id} />
      </section>

      {region.paragraphs.slice(1).map((paragraph) => (
        <p key={paragraph} className="mb-6 text-lg leading-relaxed text-slate-700">
          {paragraph}
        </p>
      ))}

      <section className="mt-12 mb-4">
        <h2 className="mb-4 font-serif text-2xl text-ocean-900">In this region</h2>
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {region.topics.map((topic) => (
            <li
              key={topic.label}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-serif text-lg font-bold text-ocean-900">
                  {topic.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {topic.note}
                </p>
              </div>
              {"path" in topic && topic.path ? (
                <Link
                  to={topic.path}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-ocean-700 hover:gap-3 hover:text-ocean-900 transition-all"
                >
                  Read
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Soon
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <LessonNav />
    </div>
  );
}
