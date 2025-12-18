import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";

// Import Pages
import Landing from "./pages/Landing";
import Motivation from "./pages/intro/Motivation";
import Approach from "./pages/intro/Approach";
import Framework from "./pages/intro/Framework";
import Level1 from "./pages/levels/Level1";
import Level2 from "./pages/levels/Level2";
import InferenceLanding from "./pages/levels/inference/InferenceLanding";
import ApproximateMethods from "./pages/levels/inference/ApproximateMethods";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Serve Landing Page at root */}
          <Route path="/" element={<Landing />} />

          {/* Intro Section */}
          <Route path="/intro/motivation" element={<Motivation />} />
          <Route path="/intro/approach" element={<Approach />} />
          <Route path="/intro/framework" element={<Framework />} />

          {/* Levels */}
          <Route path="/level-1" element={<Level1 />} />
          <Route path="/level-2" element={<Level2 />} />
          <Route path="/level-2/inference" element={<InferenceLanding />} />
          <Route
            path="/level-2/inference/approximate"
            element={<ApproximateMethods />}
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
