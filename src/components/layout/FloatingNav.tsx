import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { pagesInSection, sections } from "../../content/site";
import { cn } from "../../lib/utils";
import { BrandMark } from "./BrandMark";

function DropdownItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-ocean-900 hover:bg-ocean-50 transition-colors"
    >
      <Icon size={16} className="text-ocean-400 shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}

function NavDropdown({
  title,
  align = "start",
  children,
}: {
  title: string;
  align?: "start" | "end";
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={(event) => {
        if (event.currentTarget.contains(document.activeElement)) return;
        setIsOpen(false);
      }}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
          isOpen
            ? "bg-ocean-50 text-ocean-900"
            : "text-slate-600 hover:text-ocean-900 hover:bg-slate-50",
        )}
      >
        {title}
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl overflow-hidden py-1.5 z-50",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function FloatingNav() {
  return (
    <nav className="hidden md:flex fixed top-6 left-1/2 z-50 -translate-x-1/2 max-w-[calc(100vw-2rem)] bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-lg shadow-slate-200/20 rounded-full pl-6 pr-2 py-2 items-center gap-4 md:gap-8">
      <BrandMark className="flex items-center gap-2 pr-4 border-r border-slate-200/60" />

      <div className="flex items-center gap-1">
        {sections.map((section, index) => (
          <NavDropdown
            key={section.id}
            title={section.menu}
            align={index === sections.length - 1 ? "end" : "start"}
          >
            <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {section.part}
            </div>
            {pagesInSection(section.id, { topLevel: true }).map((item) => (
              <DropdownItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </NavDropdown>
        ))}
      </div>
    </nav>
  );
}
