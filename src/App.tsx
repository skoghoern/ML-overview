import type { ReactElement } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { pages, type PagePath } from "./content/site";
import Landing from "./pages/Landing";
import Approach from "./pages/intro/Approach";
import Framework from "./pages/intro/Framework";
import Motivation from "./pages/intro/Motivation";
import Level1 from "./pages/levels/Level1";
import Level2 from "./pages/levels/Level2";
import ApproximateMethods from "./pages/levels/inference/ApproximateMethods";
import InferenceLanding from "./pages/levels/inference/InferenceLanding";

const elements = {
  "/intro/motivation": <Motivation />,
  "/intro/approach": <Approach />,
  "/intro/framework": <Framework />,
  "/level-1": <Level1 />,
  "/level-2": <Level2 />,
  "/level-2/inference": <InferenceLanding />,
  "/level-2/inference/approximate": <ApproximateMethods />,
} satisfies Record<PagePath, ReactElement>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          {pages.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={elements[item.path]}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
