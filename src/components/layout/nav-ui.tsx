import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export function NavItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
}) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200",
        isActive
          ? "bg-ocean-100 text-ocean-900 font-semibold"
          : "text-slate-500 hover:bg-ocean-50 hover:text-ocean-700",
      )}
    >
      <Icon size={20} />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}

export function SubNavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "block px-3 py-2 text-sm rounded-r-lg transition-colors",
        isActive
          ? "text-ocean-900 bg-ocean-50 font-medium"
          : "text-slate-500 hover:text-ocean-700 hover:bg-ocean-50",
      )}
    >
      {label}
    </Link>
  );
}

export function SoonItem({ label }: { label: string }) {
  return (
    <span className="flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-400">
      <span>{label}</span>
      <span className="text-[10px] font-bold uppercase tracking-widest">
        Soon
      </span>
    </span>
  );
}

export function NavSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 py-2 mb-1 group"
      >
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-ocean-700 transition-colors">
          {title}
        </h3>
        <div className="text-slate-400 group-hover:text-ocean-700 transition-colors">
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
