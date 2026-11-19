import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getPage, neighbors } from "../../content/site";

export function LessonNav() {
  const { pathname } = useLocation();
  const { prev, next } = neighbors(pathname);
  const section = getPage(pathname)?.section;
  if (!prev && !next && section !== "levels") return null;

  return (
    <div className="flex flex-wrap justify-between gap-x-6 gap-y-4 pt-10 mt-16 border-t border-slate-200">
      {prev ? (
        <Link to={prev.path} className="group flex max-w-full flex-col items-start gap-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Previous
          </span>
          <span className="text-lg font-serif font-bold text-slate-600 group-hover:text-ocean-900 flex items-center gap-2 transition-all">
            <ArrowLeft size={20} className="shrink-0" />
            <span>{prev.label}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex max-w-full flex-col items-end gap-1 text-right"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-ocean-600 transition-colors">
            Next
          </span>
          <span className="text-xl font-serif font-bold text-ocean-900 flex items-center gap-2 group-hover:gap-4 transition-all">
            <span>{next.label}</span>
            <ArrowRight size={20} className="shrink-0" />
          </span>
        </Link>
      ) : section === "levels" ? (
        <div className="opacity-40 flex flex-col items-end gap-1 text-right select-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Coming soon
          </span>
          <span className="text-lg font-serif font-bold text-slate-400">
            Level 3: Implementation
          </span>
        </div>
      ) : (
        <span />
      )}
    </div>
  );
}
