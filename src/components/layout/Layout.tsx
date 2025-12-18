// src/components/layout/Layout.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Map,
  Anchor,
  type LucideIcon,
  Compass,
  Layers,
  Lightbulb,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import FeedbackWidget from "../feedback/FeedbackWidget";

// --- HELPER COMPONENTS ---

// 1. Navigation Item (Link)
interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        // Base styles
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        // Conditional styles
        isActive
          ? "bg-ocean-100 text-ocean-900 font-semibold"
          : "text-slate-500 hover:bg-ocean-50 hover:text-ocean-700"
      )}
    >
      <Icon size={20} />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
};

// 2. Collapsible Navigation Section
interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const NavSection = ({
  title,
  children,
  defaultOpen = true,
}: NavSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
};

// --- MAIN LAYOUT ---

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const location = useLocation();

  // Handle route changes: Close mobile menu AND Scroll to top
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto bg-paper relative">
      {/* --- MOBILE HEADER --- */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <span className="font-serif font-bold text-ocean-900 tracking-tight">
          Ocean of Intelligence
        </span>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* --- MOBILE OVERLAY --- */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* --- SIDEBAR --- */}
      <aside
        className={cn(
          // Common styles
          "fixed inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl border-r border-slate-200 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden",

          // Mobile: Fixed position, slide in/out
          "w-72 md:w-auto",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",

          // Desktop: Sticky position, toggle width
          "md:translate-x-0 md:sticky md:top-0 md:h-screen md:shadow-none md:z-0",
          isDesktopSidebarOpen ? "md:w-64" : "md:w-0 md:border-none"
        )}
      >
        {/* Inner container with fixed width to prevent content squashing during transition */}
        <div className="w-64 h-full flex flex-col p-6">
          {/* Header Area */}
          <div className="mb-8 pl-2 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-ocean-900 leading-none">
                Ocean of
                <br />
                Intelligence
              </h1>
              <p className="text-[10px] font-sans text-slate-400 mt-2 uppercase tracking-widest">
                The ML Map
              </p>
            </div>
            {/* Close Button (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
            {/* Section 1: Intro */}
            <NavSection title="Part I: Introduction" defaultOpen={true}>
              <NavItem
                to="/intro/motivation"
                icon={Lightbulb}
                label="1. The Why"
              />
              <NavItem to="/intro/approach" icon={Compass} label="2. The How" />
              <NavItem
                to="/intro/framework"
                icon={Layers}
                label="3. The Framework"
              />
            </NavSection>

            {/* Section 2: The Core */}
            <NavSection title="Part II: The Levels" defaultOpen={true}>
              <NavItem to="/level-1" icon={Anchor} label="Level 1: The Goal" />
              <NavItem to="/level-2" icon={Map} label="Level 2: The Algo" />
            </NavSection>
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0 transition-all duration-300 relative">
        {/* Desktop Sidebar Toggle Button */}
        <button
          onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          className="hidden md:flex absolute top-6 left-6 z-20 p-2 text-slate-400 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg transition-colors"
          title={isDesktopSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isDesktopSidebarOpen ? (
            <PanelLeftClose size={20} />
          ) : (
            <PanelLeftOpen size={20} />
          )}
        </button>

        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">{children}</div>
      </main>

      {/* --- FEEDBACK WIDGET --- */}
      <FeedbackWidget />
    </div>
  );
};

export default Layout;
