import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "../../lib/utils";
import FeedbackWidget from "../feedback/FeedbackWidget";
import { FloatingNav } from "./FloatingNav";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  // The menu closes itself when the path no longer matches the path it was opened on.
  const [menu, setMenu] = useState({ path: location.pathname, open: false });
  const mobileOpen = menu.open && menu.path === location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto bg-paper relative">
      <MobileNav
        open={mobileOpen}
        onOpen={() => setMenu({ path: location.pathname, open: true })}
        onClose={() => setMenu({ path: location.pathname, open: false })}
      />

      <Sidebar
        mobileOpen={mobileOpen}
        desktopOpen={desktopOpen}
        onClose={() => setMenu({ path: location.pathname, open: false })}
        mode={isLanding ? "drawer" : "column"}
      />

      <main className="flex-1 min-w-0 transition-all duration-300 relative">
        {!isLanding && (
          <div className="sticky top-6 z-20 h-0 hidden md:block pointer-events-none">
            <button
              type="button"
              onClick={() => setDesktopOpen((open) => !open)}
              className="pointer-events-auto absolute left-3 p-2 text-slate-400 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg transition-colors"
              aria-label={desktopOpen ? "Close sidebar" : "Open sidebar"}
              title={desktopOpen ? "Close sidebar" : "Open sidebar"}
            >
              {desktopOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </button>
          </div>
        )}

        <div
          className={cn(
            "mx-auto px-6 py-12 md:py-20",
            !isLanding && "md:pl-16",
            isLanding ? "w-full max-w-5xl" : "w-full",
          )}
        >
          {children}
        </div>
      </main>

      {isLanding && <FloatingNav />}
      <FeedbackWidget />
    </div>
  );
}
