import { Link } from "react-router-dom";
import { BlockMath, InlineMath } from "react-katex";
import { Ruler, Repeat, CircleHelp } from "lucide-react";
import { LessonNav } from "../../../components/lesson/LessonNav";
import { PageHeader } from "../../../components/lesson/PageHeader";
import { TerritoryMap } from "../../../components/maths/TerritoryMap";
import { page } from "../../../content/site";
import { MixtureDemo } from "./MixtureDemo";
import { RotationDemo } from "./RotationDemo";

const pieces = [
  {
    title: "The rule",
    icon: Repeat,
    body: (
      <>
        A transformation <InlineMath math="T" /> moves the point. On the circle
        below, <InlineMath math="T(x) = x + \alpha \bmod 1" />. Each step adds
        the same turn <InlineMath math="\alpha" />, and anything that passes
        the mark at 0 wraps around.
      </>
    ),
  },
  {
    title: "The size",
    icon: Ruler,
    body: (
      <>
        A measure <InlineMath math="\mu" /> says how large a set is. Rotation
        does not stretch arcs, so length is unchanged by <InlineMath math="T" />.
        The shaded arc has length <InlineMath math="w" />. The whole circle has
        length 1.
      </>
    ),
  },
  {
    title: "The question",
    icon: CircleHelp,
    body: (
      <>
        An observable <InlineMath math="f" /> is what you record at each visit.
        Here it is 1 inside the arc and 0 outside. The time average is the
        fraction of visits that landed inside. The space average is the length{" "}
        <InlineMath math="w" />.
      </>
    ),
  },
];

const ErgodicTheory = () => {
  return (
    <div className="max-w-4xl mx-auto pb-32">
      <PageHeader title="The time average and the space average">
        <p>
          On the map, this page sits under{" "}
          <Link
            to={page("/maths/changes").path}
            className="font-semibold text-ocean-800 underline decoration-ocean-200 underline-offset-4 hover:decoration-ocean-500"
          >
            Changes
          </Link>
          . The object is a dynamical system: a rule, applied over and over.
          The question is statistical. Follow one point for a long time. Does
          the fraction of time it spends in a region equal the size of that
          region?
        </p>
        <p>
          Boltzmann hoped that a single trajectory of a gas would do this in
          phase space, spending time in each region in proportion to the
          region’s volume. The hope is not always true. Ergodic theory is the
          study of when it is.
        </p>
      </PageHeader>

      <section className="mb-20 space-y-6">
        <h2 className="font-serif text-3xl text-ocean-900">
          One mixture, two experiments
        </h2>
        <p className="text-lg leading-relaxed text-slate-700">
          A Bernoulli–Bernoulli mixture uses one coin to choose another coin.{" "}
          <InlineMath math="z" /> is 1 with probability <InlineMath math="\pi" />,
          and the chosen coin then lands 1 with probability{" "}
          <InlineMath math="p_1" /> or <InlineMath math="p_2" />. One toss,
          started from scratch, is 1 with probability
        </p>
        <div className="rounded-r-lg border-l-4 border-ocean-500 bg-slate-50 p-4 md:p-6">
          <BlockMath math="p_{\mathrm{eff}} = \pi p_1 + (1-\pi)\, p_2" />
        </div>
        <p className="text-lg leading-relaxed text-slate-700">
          The two graphs below are the same picture. In the ergodic experiment
          every toss draws a new <InlineMath math="z" />, hands it to the
          mixture, and the mixture writes <InlineMath math="p_k" /> as{" "}
          <InlineMath math="p_1" /> or <InlineMath math="p_2" />. The toss{" "}
          <InlineMath math="x_k" /> is then a fresh Bernoulli draw at that{" "}
          <InlineMath math="p_k" />. The average of the tosses settles on{" "}
          <InlineMath math="p_{\mathrm{eff}}" />.
        </p>
        <p className="text-lg leading-relaxed text-slate-700">
          In the other experiment <InlineMath math="z" /> is drawn once and
          then held. Every later toss reuses it, so the average settles on{" "}
          <InlineMath math="p_1" /> or on <InlineMath math="p_2" /> and never
          visits the other component. The observation factor is binomial: the
          tosses share one <InlineMath math="p" />, and the count of 1s is one
          binomial draw. That experiment is not ergodic.
        </p>
        <MixtureDemo />
      </section>

      <section className="mb-16 grid gap-4 md:grid-cols-3">
        {pieces.map((piece) => (
          <article
            key={piece.title}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ocean-50 text-ocean-700">
              <piece.icon size={18} />
            </div>
            <h2 className="mb-2 font-serif text-xl text-ocean-900">
              {piece.title}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">{piece.body}</p>
          </article>
        ))}
      </section>

      <section className="mb-20 space-y-6">
        <h2 className="font-serif text-3xl text-ocean-900">
          A circle, turned by a fixed angle
        </h2>
        <p className="text-lg leading-relaxed text-slate-700">
          The simplest system in which the question has a sharp answer is
          rotation of a circle. A turn by a rational fraction, such as{" "}
          <InlineMath math="1/5" />, visits a finite set of points and then
          repeats. A turn by an irrational fraction never repeats. The golden
          turn uses <InlineMath math="(\sqrt{5}-1)/2" />, the most stubbornly
          irrational turn there is.
        </p>
        <RotationDemo />
        <p className="text-lg leading-relaxed text-slate-700">
          Evenness is not mixing. The golden turn spreads visits in proportion
          to length, but each step is rigid: the present position determines
          the position a thousand steps from now. Mixing is a stronger
          property, and this rotation does not have it.
        </p>
      </section>

      <section className="mb-20 space-y-6">
        <h2 className="font-serif text-3xl text-ocean-900">
          When the two averages agree
        </h2>
        <p className="text-lg leading-relaxed text-slate-700">
          The rule is ergodic, for this way of measuring size, when the space
          cannot be split into two regions of positive size that the rule
          never carries into each other. A turn by <InlineMath math="1/5" />{" "}
          fails that test. Each orbit is five points, nearby starts never join
          it, and the time average remembers which orbit you started on. An
          irrational turn has no such split.
        </p>
        <p className="text-lg leading-relaxed text-slate-700">
          Birkhoff’s ergodic theorem is the precise version. If{" "}
          <InlineMath math="T" /> preserves <InlineMath math="\mu" /> and is
          ergodic, then for almost every start <InlineMath math="x" />,
        </p>
        <div className="rounded-r-lg border-l-4 border-ocean-500 bg-slate-50 p-4 md:p-6">
          <BlockMath math="\lim_{N \to \infty} \frac{1}{N} \sum_{k=0}^{N-1} f(T^{k} x) \;=\; \int f \, d\mu" />
        </div>
        <p className="text-lg leading-relaxed text-slate-700">
          whenever <InlineMath math="f" /> is integrable. “Almost every” means
          the exceptional starts, taken together, have size zero. The
          irrational rotation is kinder than the theorem requires: the equality
          holds for every start, not merely almost every one. The limit on the
          left is the time average. The integral on the right is the space
          average. On the circle, <InlineMath math="f" /> is the indicator of
          the arc. In the mixture, <InlineMath math="f" /> is the toss. Redraw{" "}
          <InlineMath math="z" /> every trial and the integral equals{" "}
          <InlineMath math="p_{\mathrm{eff}}" />. Freeze <InlineMath math="z" />{" "}
          and the time average settles on the component that first draw landed
          in.
        </p>
      </section>

      <section className="mb-20 space-y-6">
        <h2 className="font-serif text-3xl text-ocean-900">Where this sits</h2>
        <p className="text-lg leading-relaxed text-slate-700">
          Changes is where the map puts dynamical systems, so the page lives
          there. The proof uses measure, from Foundations: “almost every” is a
          statement about measure zero. The conclusion is a law of large
          numbers for a dependent sequence, which is the language of
          probability, on the applied side.
        </p>
        <TerritoryMap active="changes" />
      </section>

      <section className="mb-20 space-y-6">
        <h2 className="font-serif text-3xl text-ocean-900">
          The same promise in sampling
        </h2>
        <p className="text-lg leading-relaxed text-slate-700">
          A Markov chain Monte Carlo sampler walks a distribution the way this
          point walks the circle. The circle is not itself a Markov chain: the
          next point is fixed, not drawn. The agreement the sampler needs is
          the same agreement. Run an ergodic chain long enough, and the
          fraction of steps it spends in a region approaches the probability of
          that region under the stationary distribution. That is why the
          integral on the{" "}
          <Link
            to={page("/level-2/inference/approximate").path}
            className="font-semibold text-ocean-800 underline decoration-ocean-200 underline-offset-4 hover:decoration-ocean-500"
          >
            approximate inference
          </Link>{" "}
          page can be replaced by a long run of the chain.
        </p>
      </section>

      <section className="mb-4 space-y-4">
        <h2 className="font-serif text-2xl text-ocean-900">Left for later pages</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Mixing, and why the golden rotation is ergodic without being mixing.</li>
          <li>Entropy, and the classification of transformations up to isomorphism.</li>
          <li>Flows, where the rule is a continuous motion rather than one step.</li>
          <li>
            Markov shifts, where the same theorem is a statement about a
            transition kernel.
          </li>
        </ul>
      </section>

      <LessonNav />
    </div>
  );
};

export default ErgodicTheory;
