// src/Home.tsx
import { useNavigate } from "react-router-dom";
import { lessons } from "./lessons";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Mapping <span className="highlight">Machine Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            A Structured Guide to Modern AI Paradigms
          </p>
          <p className="hero-description">
            Welcome. This interactive website provides a unified framework to
            understand and compare diverse artificial intelligence systems. We
            bridge the gap between <b>Deep Learning</b>, <b>Active Inference</b>
            , and <b>Neuroscience</b> by analyzing their underlying
            computational goals and mathematical structures side-by-side.
          </p>
          <button
            className="cta-button"
            onClick={() => navigate(`/${lessons[0].id}`)}
          >
            Start Learning
          </button>
        </div>
      </section>

      {/* Features / Preview Grid */}
      <section className="features">
        <div className="feature-card">
          <h3>The Goal</h3>
          <p>
            Understand the fundamental objectives driving intelligence, from
            standard Loss Minimization to Active Inference's Free Energy
            Principle.
          </p>
        </div>
        <div className="feature-card">
          <h3>The Framework</h3>
          <p>
            Navigate the complex landscape of algorithms using a unified
            "Framework for Frameworks" inspired by Marr, Bishop, and LeCun.
          </p>
        </div>
        <div className="feature-card">
          <h3>The Connection</h3>
          <p>
            Move beyond isolated definitions. See how distinct fields connect,
            differ, and complement each other in the quest for AGI.
          </p>
        </div>
      </section>
    </div>
  );
}
