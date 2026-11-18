import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { getPage } from "../../content/site";
import { cn } from "../../lib/utils";

type PageHeaderProps = {
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
};

export function PageHeader({
  title,
  children,
  align = "left",
  size = "md",
  className,
}: PageHeaderProps) {
  const { pathname } = useLocation();
  const current = getPage(pathname);
  const Icon = current?.icon;

  return (
    <header
      className={cn(
        "space-y-8 mb-16",
        align === "center" && "text-center",
        className,
      )}
    >
      {current && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 text-ocean-800 text-xs font-bold tracking-widest uppercase border border-ocean-100">
          {Icon && <Icon size={14} />}
          <span>{current.label}</span>
        </div>
      )}
      <h1
        className={cn(
          "font-serif text-ocean-900 leading-[1.1]",
          size === "lg" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
        )}
      >
        {title}
      </h1>
      {children && (
        <div
          className={cn(
            "text-lg md:text-xl text-slate-600 leading-relaxed space-y-6",
            align === "center" && "max-w-2xl mx-auto",
          )}
        >
          {children}
        </div>
      )}
    </header>
  );
}
