// src/App.tsx
import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import { lessons } from "./lessons";
import Home from "./Home";
import "./App.css";

// Layout handles the Sidebar visibility
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Toggle function
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      {/* Toggle Button (Visible only on lesson pages) */}
      {!isHome && (
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? "❮" : "☰"}
        </button>
      )}

      {/* Sidebar (Conditional rendering based on state) */}
      {!isHome && (
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <h3>Machine Intelligence</h3>
          </div>
          <nav>
            <NavLink to="/" className="nav-item home-link">
              ← Home
            </NavLink>
            <hr className="nav-divider" />
            {lessons.map((lesson) => (
              <NavLink
                key={lesson.id}
                to={`/${lesson.id}`}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                {lesson.title}
              </NavLink>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Content: Adjusts margin based on sidebar state */}
      <main
        className={
          isHome
            ? "main-content-full"
            : `main-content ${
                isSidebarOpen ? "sidebar-open" : "sidebar-closed"
              }`
        }
      >
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {lessons.map((lesson) => (
            <Route
              key={lesson.id}
              path={`/${lesson.id}`}
              element={
                <div className="lesson-container animate-fade-in">
                  {lesson.content}
                </div>
              }
            />
          ))}
          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
