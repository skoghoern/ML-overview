import { InlineMath, BlockMath } from "react-katex";
import {
  Activity,
  Dices,
  Minimize,
  TrendingUp,
  Zap,
} from "lucide-react";
import { LessonNav } from "../../../components/lesson/LessonNav";
import { PageHeader } from "../../../components/lesson/PageHeader";
import { Simulator } from "./Simulator";

const ApproximateMethods = () => {
  return (
    <div className="max-w-4xl mx-auto pb-32">
      <PageHeader title="Solving the Unsolvable">
        <p>
          The core problem of Bayesian Inference is calculating the posterior{" "}
          <InlineMath math="P(\theta|D)" />. This requires an integral that is
          usually impossible to solve analytically.
        </p>
        <div className="bg-slate-50 p-4 border-l-4 border-ocean-500 my-6 text-base">
          <h3 className="font-bold text-ocean-900 text-sm uppercase tracking-wide mb-2">
            The Intractable Integral
          </h3>
          <BlockMath math="P(\theta|D) = \frac{P(D|\theta)P(\theta)}{\int P(D|\theta')P(\theta')d\theta'}" />
        </div>
        <p>
          So we cheat. We transform this <strong>Integration</strong> problem
          into something computers are actually good at.
        </p>
      </PageHeader>

      <Simulator />

      <section className="grid md:grid-cols-2 gap-8">
        <article className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
            <Dices size={24} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Sampling (MCMC)
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Exact, but Slow
          </p>
          <ul className="space-y-4 text-slate-600 text-sm">
            <li className="flex gap-3">
              <TrendingUp className="text-rose-400 shrink-0" size={18} />
              <span>
                <strong>Logic:</strong> "I will walk around randomly, but I
                promise to stay longer in high-probability areas."
              </span>
            </li>
            <li className="flex gap-3">
              <Activity className="text-rose-400 shrink-0" size={18} />
              <span>
                <strong>Pros:</strong> Asymptotically exact. Can map complex,
                multimodal landscapes.
              </span>
            </li>
            <li className="flex gap-3">
              <Zap className="text-rose-400 shrink-0" size={18} />
              <span>
                <strong>Cons:</strong> Computationally expensive. Slow to
                converge in high dimensions.
              </span>
            </li>
          </ul>
        </article>

        <article className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <Minimize size={24} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Variational Inference
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Fast, but Approximate
          </p>
          <ul className="space-y-4 text-slate-600 text-sm">
            <li className="flex gap-3">
              <TrendingUp className="text-blue-400 shrink-0" size={18} />
              <span>
                <strong>Logic:</strong> "I assume the answer is a Gaussian, and
                use gradients to fit it."
              </span>
            </li>
            <li className="flex gap-3">
              <Activity className="text-blue-400 shrink-0" size={18} />
              <span>
                <strong>Pros:</strong> Extremely fast. Scales to massive
                datasets (e.g., VAEs).
              </span>
            </li>
            <li className="flex gap-3">
              <Zap className="text-blue-400 shrink-0" size={18} />
              <span>
                <strong>Cons:</strong> Biased. Often suffers from{" "}
                <strong>Mode Collapse</strong> (seeing only one part of the
                truth).
              </span>
            </li>
          </ul>
        </article>
      </section>

      <LessonNav />
    </div>
  );
};

export default ApproximateMethods;
