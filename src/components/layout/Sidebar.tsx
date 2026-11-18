import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
  pagesInSection,
  sections,
  sidebarChildren,
  type PagePath,
} from "../../content/site";
import { cn } from "../../lib/utils";
import { NewsletterForm } from "./NewsletterForm";
import { NavItem, NavSection, SoonItem, SubNavItem } from "./nav-ui";

type SidebarProps = {
  mobileOpen: boolean;
  desktopOpen: boolean;
  onClose: () => void;
  /** "drawer" is the phone menu. "column" is the sticky desktop sidebar. */
  mode?: "column" | "drawer";
};

export function Sidebar({
  mobileOpen,
  desktopOpen,
  onClose,
  mode = "column",
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200 shadow-2xl overflow-hidden",
        mobileOpen ? "drawer-open" : "drawer-closed",
        mode === "column" &&
          "md:left-0 md:sticky md:top-0 md:h-screen md:w-auto md:shadow-none md:z-0",
        mode === "column" && (desktopOpen ? "md:w-64" : "md:w-0 md:border-none"),
        mode === "drawer" && "md:hidden",
      )}
    >
      <div className="w-full h-full flex flex-col p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-ocean-900 hover:bg-slate-100 rounded-full transition-all z-10"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <div className="mb-8 pl-2">
          <Link to="/">
            <h1 className="text-2xl font-serif font-bold tracking-tight text-ocean-900 leading-none hover:opacity-80 transition-opacity">
              ML Overview
            </h1>
          </Link>
          <p className="text-[10px] font-sans text-slate-400 mt-2 uppercase tracking-widest">
            The ML Map
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-subtle space-y-4 pr-2">
          {sections.map((section) => (
            <NavSection key={section.id} title={section.title}>
              {pagesInSection(section.id, { topLevel: true }).map((item) => (
                <div key={item.path} className="space-y-1">
                  <NavItem to={item.path} icon={item.icon} label={item.label} />
                  <ChildLinks parent={item.path} />
                </div>
              ))}
            </NavSection>
          ))}
        </nav>

        <NewsletterForm />
      </div>
    </aside>
  );
}

function ChildLinks({ parent }: { parent: PagePath }) {
  const children = sidebarChildren(parent);
  if (children.length === 0) return null;

  return (
    <div className="pl-9 space-y-1 border-l border-slate-200 ml-6 my-1">
      {children.map((child) =>
        child.type === "soon" ? (
          <SoonItem key={child.label} label={child.label} />
        ) : (
          <SubNavItem
            key={child.page.path}
            to={child.page.path}
            label={child.page.label}
          />
        ),
      )}
    </div>
  );
}
