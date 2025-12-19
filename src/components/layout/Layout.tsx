// src/components/layout/Layout.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import FeedbackWidget from "../feedback/FeedbackWidget";

// --- HELPER COMPONENTS ---

// 1. Navigation Item (Sidebar Link)
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
        "flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200",
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

// 2. Collapsible Navigation Section (Sidebar)
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

// --- DROPDOWN COMPONENTS (For Floating Nav) ---

const DropdownItem = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
}) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-ocean-900 hover:bg-ocean-50 transition-colors"
  >
    <Icon size={16} className="text-ocean-400 shrink-0" />
    <span className="whitespace-nowrap">{label}</span>
  </Link>
);

const NavDropdown = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
          isOpen
            ? "bg-ocean-50 text-ocean-900"
            : "text-slate-600 hover:text-ocean-900 hover:bg-slate-50"
        )}
      >
        {title}
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl overflow-hidden py-1.5 z-50"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 3. Floating Navigation Bar (For Landing Page)
const FloatingNavBar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.3 }}
      className="fixed top-6 left-1/2 z-50 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-lg shadow-slate-200/20 rounded-full pl-6 pr-2 py-2 flex items-center gap-4 md:gap-8"
    >
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center gap-2 pr-4 border-r border-slate-200/60"
      >
        <div className="w-8 h-8 bg-ocean-100 text-ocean-700 rounded-full flex items-center justify-center shadow-sm">
          <Map size={16} />
        </div>
        <span className="font-serif font-bold text-ocean-900 text-sm hidden sm:block whitespace-nowrap tracking-tight">
          Machine Learning, Unified
        </span>
      </Link>

      {/* Nav Items */}
      <div className="flex items-center gap-1">
        <NavDropdown title="Introduction">
          <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Part I
          </div>
          <DropdownItem
            to="/intro/motivation"
            icon={Lightbulb}
            label="1. The Motivation"
          />
          <DropdownItem
            to="/intro/approach"
            icon={Compass}
            label="2. The Approach"
          />
          <DropdownItem
            to="/intro/framework"
            icon={Layers}
            label="3. The Framework"
          />
        </NavDropdown>

        <NavDropdown title="The Levels">
          <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Part II
          </div>
          <DropdownItem to="/level-1" icon={Anchor} label="Level 1: The Goal" />
          <DropdownItem to="/level-2" icon={Map} label="Level 2: The Algo" />
        </NavDropdown>
      </div>
    </motion.nav>
  );
};

// --- MAIN LAYOUT ---

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // State to toggle newsletter visibility
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(true);

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const FORM_ENDPOINT = `https://formspree.io/f/${
    import.meta.env.VITE_NEWSLETTER_FORM_ID
  }`;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");

        setTimeout(() => {
          setIsNewsletterOpen(false);
          setTimeout(() => setStatus("idle"), 500);
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto bg-paper relative">
      {/* --- MOBILE HEADER & OVERLAY (IMPLEMENTED) --- */}
      {!isLandingPage && (
        <>
          {/* 1. Mobile Top Bar */}
          <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ocean-100 text-ocean-700 rounded-full flex items-center justify-center shadow-sm">
                <Map size={16} />
              </div>
              <span className="font-serif font-bold text-ocean-900 text-sm whitespace-nowrap tracking-tight">
                ML, Unified
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* 2. Backdrop Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
        </>
      )}

      {/* --- SIDEBAR --- */}
      {!isLandingPage && (
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl border-r border-slate-200 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden",
            // Mobile: 72 (18rem) width
            "w-72 md:w-auto",
            // Mobile: Slide in/out transform
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            // Desktop: Always visible, sticky, reset transform & shadow
            "md:translate-x-0 md:sticky md:top-0 md:h-screen md:shadow-none md:z-0",
            // Desktop: Collapsible width
            isDesktopSidebarOpen ? "md:w-64" : "md:w-0 md:border-none"
          )}
        >
          {/* UPDATED: w-full (was w-64) to fix right gap, relative for button positioning */}
          <div className="w-full h-full flex flex-col p-6 relative">
            {/* UPDATED: Improved Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-ocean-900 hover:bg-slate-100 rounded-full transition-all z-10"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            {/* Sidebar Header */}
            <div className="mb-8 pl-2">
              <Link to="/">
                <h1 className="text-2xl font-serif font-bold tracking-tight text-ocean-900 leading-none hover:opacity-80 transition-opacity">
                  ML, Unified
                </h1>
              </Link>
              <p className="text-[10px] font-sans text-slate-400 mt-2 uppercase tracking-widest">
                The ML Map
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto scrollbar-subtle space-y-4 pr-2">
              <NavSection title="Part I: Introduction" defaultOpen={true}>
                <NavItem
                  to="/intro/motivation"
                  icon={Lightbulb}
                  label="1. The Why"
                />
                <NavItem
                  to="/intro/approach"
                  icon={Compass}
                  label="2. The Approach"
                />
                <NavItem
                  to="/intro/framework"
                  icon={Layers}
                  label="3. The Framework"
                />
              </NavSection>

              <NavSection title="Part II: The Levels" defaultOpen={true}>
                <NavItem
                  to="/level-1"
                  icon={Anchor}
                  label="Level 1: The Goal"
                />

                <div className="space-y-1">
                  <NavItem to="/level-2" icon={Map} label="Level 2: The Algo" />
                  <div className="pl-9 space-y-1 border-l border-slate-200 ml-6 my-1">
                    <Link
                      to="/level-2/model"
                      className="block px-3 py-2 text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-r-lg transition-colors"
                    >
                      2.1 The Model
                    </Link>
                    <Link
                      to="/level-2/inference"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-r-lg transition-colors",
                        location.pathname === "/level-2/inference"
                          ? "text-teal-700 bg-teal-50 font-medium"
                          : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                      )}
                    >
                      2.2 Inference Process
                    </Link>
                    <Link
                      to="/level-2/inference/approximate"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-r-lg transition-colors",
                        location.pathname.startsWith(
                          "/level-2/inference/approximate"
                        )
                          ? "text-teal-700 bg-teal-50 font-medium"
                          : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                      )}
                    >
                      2.2.3 Approx. Inference
                    </Link>
                  </div>
                </div>
              </NavSection>
            </nav>

            {/* Newsletter Subscription */}
            <AnimatePresence>
              {isNewsletterOpen && (
                <motion.div
                  initial={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0, paddingTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-4 pt-6 border-t border-slate-200 overflow-hidden relative group"
                >
                  <button
                    onClick={() => setIsNewsletterOpen(false)}
                    className="absolute top-6 right-0 text-slate-300 hover:text-rose-500 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
                    title="Hide Newsletter"
                  >
                    <X size={14} />
                  </button>

                  <p className="text-xs text-slate-500 mb-3 leading-relaxed pr-4">
                    This website is currently developing. If you wish to be
                    informed for new updates:
                  </p>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 p-3 rounded-lg border border-emerald-100"
                      >
                        <CheckCircle size={16} />
                        <span>You're in the loop!</span>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubscribe}
                        className="space-y-2 relative"
                      >
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={status === "submitting"}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-100 focus:border-ocean-300 transition-all placeholder:text-slate-400 disabled:opacity-50"
                        />
                        {status === "error" && (
                          <div className="flex items-center gap-1.5 text-rose-500 text-[10px] font-bold">
                            <AlertCircle size={12} />
                            <span>Failed to join. Try again?</span>
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="w-full bg-ocean-100 hover:bg-ocean-200 text-ocean-900 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              <span>Joining...</span>
                            </>
                          ) : (
                            "Keep me in the loop"
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0 transition-all duration-300 relative">
        {/* Desktop Sidebar Toggle Button (Hide on Landing) */}
        {!isLandingPage && (
          <button
            onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            className={cn(
              "hidden md:flex fixed top-6 z-20 p-2 text-slate-400 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg transition-all duration-300",
              isDesktopSidebarOpen ? "left-[17.5rem]" : "left-6"
            )}
            title={isDesktopSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            {isDesktopSidebarOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelLeftOpen size={20} />
            )}
          </button>
        )}

        <div
          className={cn(
            "mx-auto px-6 py-12 md:py-20",
            isLandingPage ? "w-full max-w-5xl" : "max-w-3xl"
          )}
        >
          {children}
        </div>
      </main>

      {/* --- FLOATING NAV (Landing Only) --- */}
      {isLandingPage && <FloatingNavBar />}

      {/* --- FEEDBACK WIDGET --- */}
      <FeedbackWidget />
    </div>
  );
};

export default Layout;
