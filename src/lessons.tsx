// src/lessons.tsx
import React from "react";
import { RemNode } from "./components/RemNode";

export interface Lesson {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const lessons: Lesson[] = [
  {
    id: "motivation",
    title: "I. Motivation & Goal",
    content: (
      <>
        <h2>I. My Motivation and Goal - The "Why"</h2>

        <RemNode title='A very suitable analogy to the motivation of this post is actually a parable from a 2005 commencement speech by the truly amazing author David Foster Wallace, about two young fish swimming along. They meet an older fish who nods and says, "Morning, boys. How&apos;s the water?" The two young fish swim on for a bit until one turns to the other and asks, "What the hell is water?"' />

        <RemNode title="The point of the story is simple but profound: the most obvious realities are often the hardest to see, simply because they are all we have ever known." />

        <RemNode title='In the world of computational intelligence, we all swim in our own specific "water."' />

        <RemNode
          title={
            <span>
              For the <b>Deep Learning practitioner</b>, the water might be
              comprised of loss functions and backpropagation. For the{" "}
              <b>Active Inference researcher</b>, the water flows with Markov
              blankets and free energy minimization. Whatever your background,
              it is easy to become so immersed in your specific framework that
              it becomes the &quot;default setting&quot;—making it difficult to
              see how it connects to, differs from, or complements other
              methods.
            </span>
          }
        />

        <RemNode
          title={
            <div>
              <img
                src="https://remnote-user-data.s3.amazonaws.com/iMddveMTqhEfxh3pkgkKPad5Y6vkClmlYNdItI0_mxSDy3XU-Cg1jEPhstuDWkdmPJz341aucn3OA4JT_emNGPlKFTNTjfi27iHdM81GjrGBkgjcsk3WWz0UfqB0rfLa.png"
                alt="Bloom's Taxonomy"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  margin: "0.5rem 0",
                }}
              />
              <br />
              <small>
                from{" "}
                <a
                  href="https://tophat.com/blog/blooms-revised-taxonomy-pyramid/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bloom’s Revised Taxonomy: 3 Ways To Reshape The Pyramid | Top
                  Hat
                </a>
              </small>
            </div>
          }
        />

        <RemNode title="To truly understand the landscape of machine intelligence, we need to step out of our respective tanks. This idea is formally captured in Bloom's Taxonomy, a framework that categorizes levels of learning." />

        <RemNode title="Bloom argues that merely defining a concept or following a derivation sits at the lower levels of Remembering and Understanding. To achieve true mastery, we must climb to the higher tiers of Analysis and Evaluation. This requires us to deconstruct ideas, draw connections, and differentiate between related concepts. You cannot fully understand what Active Inference is until you have analyzed it against what it is not." />

        <RemNode title="This post aims to provide that bird's-eye view. By stepping back and creating a structured overview of ML, we are moving up Bloom's pyramid. Whether you are an expert in the field or a complete newcomer, the goal is to make the &quot;water&quot; visible again, and to see not just what Active Inference is, but where it fits in the ocean of intelligence." />
      </>
    ),
  },
  {
    id: "approach",
    title: "II. My Approach",
    content: (
      <>
        <h2>II. My Approach – The "How"</h2>

        <RemNode title='Having established why we need to step out of the "water" to truly understand these concepts, the question becomes: how do we do it?' />

        <RemNode
          title={
            <span>
              If we accept Bloom’s premise—that true mastery requires{" "}
              <b>Analysis</b> and <b>Evaluation</b>—then we cannot simply list
              algorithms in isolation. We need a map.
            </span>
          }
        />

        <RemNode title="This post provides a structured, high-level overview of the current Machine Learning landscape. While we will ground our comparison in the roots of mathematics, physics, and statistics, our primary focus will remain conceptual. We are building a map, not examining every grain of sand." />

        <RemNode title={<b>What this post is NOT:</b>}>
          <RemNode title="To manage expectations, it is important to clarify what this overview avoids. This is not a deep-dive tutorial into the mechanics of individual methods. The internet (and your favorite LLM) is already overflowing with excellent resources, textbooks, and documentation that explain the intricate mechanics of specific methods far better than I could ever attempt to do. Replicating that content here would be redundant." />
        </RemNode>

        <RemNode title={<b>What this post IS:</b>} defaultCollapsed={false}>
          <RemNode
            title={
              <span>
                Instead, we focus on the <b>connections and contrasts</b>{" "}
                between these methods.
              </span>
            }
          />
          <RemNode title="Just as the two young fish who discover water gain a new perspective on their world, we need to recognize the underlying statistical assumptions to understand our models. By placing Active Inference alongside other major paradigms, we aim to:" />
          <RemNode
            title={
              <span>
                1. <b>Differentiate:</b> Equip you with the ability to spot the
                subtle differences in how algorithms perceive and act on data.
              </span>
            }
          />
          <RemNode
            title={
              <span>
                2. <b>Connect:</b> Bridge the gap between disparate fields (such
                as how Active Inference relates to standard Reinforcement
                Learning or Generative Modeling) to show how they aim for
                similar goals.
              </span>
            }
          />
          <RemNode
            title={
              <span>
                3. <b>Innovate:</b> In the optimal case, seeing these methods
                side-by-side won't just help you understand what currently
                exists; it will spark ideas for what could exist.
              </span>
            }
          />
        </RemNode>

        <RemNode title="By understanding the strengths and blind spots of our current tools, we are better positioned to think about the future—and perhaps what is truly needed to achieve AGI." />
      </>
    ),
  },
  {
    id: "framework",
    title: "III. A Unified Framework",
    content: (
      <>
        <h2>III. Structuring the Chaos: A Unified Framework</h2>

        <RemNode title='We have established "why" we need to step out of the "water" to see the bigger picture, and "how" we intend to map the landscape by focusing on connections rather than granular mechanics. But when faced with a domain as vast and intricate as Machine Learning—ranging from biological neurons to silicon-based deep reinforcement learning—where do we actually begin? How do we organize a chaotic ocean of algorithms into a coherent map?' />

        <RemNode title="If we want to compare Active Inference to Deep Learning or Reinforcement Learning without getting lost in the weeds of syntax and hyperparameters, we need a robust scaffold." />

        <RemNode title="Fortunately, we don't need to invent this map from scratch. We can stand on the shoulders of giants who have already thought deeply about how to define complex information processing systems." />

        <RemNode
          title={
            <span>
              To structure this overview, we will synthesize three distinct but
              compatible perspectives: the neuroscientific hierarchy of{" "}
              <b>David Marr</b>, the pattern recognition formalism of{" "}
              <b>Christopher Bishop</b>, and the deep learning architecture of{" "}
              <b>Yann LeCun</b>.
            </span>
          }
        />

        <RemNode title='By combining these, we arrive at a single "Framework for Frameworks" that allows us to dissect any intelligence system—biological or artificial.' />

        <RemNode
          title="1. The Hierarchy of Understanding (Marr)"
          defaultCollapsed={false}
        >
          <RemNode title="The foundation of our map comes from the late, brilliant neuroscientist David Marr. In his seminal work on vision, Marr argued that to truly understand any information processing system—be it a human brain or a computer program—you cannot look at it from just one angle. You must analyze it at three distinct levels:" />
          <RemNode
            title={
              <span>
                1. <b>The Computational Level (The Goal):</b> *What* is the
                system doing, and *why*? This defines the inputs, the outputs,
                and the ultimate objective function. What is the specific goal
                of the computation? What is the logic of the strategy by which
                it can be carried out? In a biological context, this might be
                &quot;avoiding predators.&quot; In ML, it might be
                &quot;classifying images&quot; or &quot;maximizing
                utility.&quot;
              </span>
            }
          />
          <RemNode
            title={
              <span>
                2. <b>The Algorithmic Level (The Process):</b> *How* does the
                system solve the problem? What representations are used for the
                input and output, and what algorithm transforms the one into the
                other?
              </span>
            }
          />
          <RemNode
            title={
              <span>
                3. <b>The Implementation Level (The Hardware):</b> *Where* does
                this happen physically? Is it silicon chips, neuromorphic
                hardware, or biological neurons?
              </span>
            }
          />
          <RemNode
            title={
              <span>
                For the purpose of this blog post (and understanding Active
                Inference), we will mostly abstract away the{" "}
                <b>Implementation Level</b>. Whether the math runs on a GPU or a
                wet brain is a fascinating implementation detail, but it doesn't
                change the underlying logic of intelligence.
              </span>
            }
          />
          <RemNode
            title={
              <span>
                Our focus lies in the interplay between the <b>Computational</b>{" "}
                and the <b>Algorithmic</b>—and this is where things usually get
                messy in Machine Learning. To clean this up, we turn to Bishop
                and LeCun.
              </span>
            }
          />
        </RemNode>

        <RemNode
          title={
            <span>
              2. The Components of the &quot;Algorithmic&quot; Level (Bishop &
              LeCun)
            </span>
          }
          defaultCollapsed={false}
        >
          <RemNode title="While Marr gives us the vertical hierarchy, we need to zoom in on the middle layer—the Algorithmic Level—to really distinguish between modern ML techniques. Here, we can blend the definitions provided by Christopher Bishop and Yann LeCun to create a practical formula for machine learning." />
          <RemNode title="Christopher Bishop, in his excellent textbook Pattern Recognition and Machine Learning, decomposed machine learning into two parts: Model + Inference. The *Model* describes the mathematical structure (how we assume the world works), and *Inference* is the method we use to learn variables or make predictions within that structure." />
          <RemNode
            title={
              <span>
                Yann LeCun, one of the godfathers of Deep Learning, adds another
                critical dimension, explicitly accounting for the objective.
                Viewing a learning system as:{" "}
                <b>
                  System = Architecture + Inference Algorithm + Loss Function
                </b>
                .
              </span>
            }
          />
          <RemNode title="When we plug these engineering definitions back into Marr’s philosophical hierarchy, we get the unified framework we will use for the rest of this series." />
        </RemNode>

        <RemNode title="3. The Unified Framework" defaultCollapsed={false}>
          <RemNode title="By combining these perspectives, we arrive at the structure we will use for the rest of this post." />
          <RemNode title='Here is how we will define every "drop" in the sea of intelligence:' />
          <RemNode
            title={
              <span>Level 1: The Computational Goal (The &quot;Why&quot;)</span>
            }
          >
            <RemNode title="Before we write code, we must define the problem." />
            <RemNode
              title={
                <span>
                  <b>The Objective:</b> What is the system trying to maximize or
                  minimize? In Deep Learning, this is the <b>Loss Function</b>{" "}
                  (e.g., minimize Mean Squared Error). In biology, it might be
                  &quot;maximize survival.&quot;
                </span>
              }
            />
            <RemNode
              title={
                <span>
                  <b>The Scope:</b> What are the inputs (sensory data) and
                  outputs (actions/classifications)?
                </span>
              }
            />
          </RemNode>
          <RemNode
            title={
              <span>
                Level 2: The Algorithmic Solution (The &quot;How&quot;)
              </span>
            }
          >
            <RemNode title="This is the engine room. Following Bishop and LeCun, we split this into two critical parts that are often confused:" />
            <RemNode
              title={
                <span>
                  <b>The Model (Architecture/Representation) - </b>How does it
                  represent the world?<b>:</b>
                </span>
              }
            >
              <RemNode title='This is the system&apos;s "view" of the world. It is the structure we impose on the data. Is it a Neural Network? A Gaussian Mixture? A Graphical Model? The Model encapsulates the assumptions we make about how the world works.' />
              <RemNode title="*Analogy:* This is the map the fish carries in its head." />
            </RemNode>
            <RemNode
              title={
                <span>
                  <b>The Inference Method (The Dynamic Process) - </b>How does
                  it learn and act?:
                </span>
              }
            >
              <RemNode title="This is how the system uses the Model to handle new data. How do we update our beliefs? How do we find the optimal parameters? Is it Backpropagation? Variational Inference? A Genetic Algorithm?" />
              <RemNode title="*Analogy:* This is the method the fish uses to update the map when it hits a rock." />
            </RemNode>
          </RemNode>
          <RemNode title="Why This Distinction Matters">
            <RemNode title='Separating the <b>Model</b> from the <b>Inference</b> is the key to "seeing the water."' />
            <RemNode title='Many practitioners conflate the two. For example, they might say "I used a Neural Network," which describes the Model, but implies the Inference (Backprop). Using this framework we can finally see that while the *implementation* of Active Inference and Deep Learning differs, they often share surprising overlaps in their computational goals, or diverge radically in their architectural assumptions.' />
            <RemNode title="By systematically asking three questions—<b>What is the Goal? What is the Model? What is the Inference?</b>—we can strip away the complexity and compare distinct paradigms side-by-side." />
          </RemNode>
        </RemNode>
      </>
    ),
  },
  {
    id: "computational-goal",
    title: "IV. Level 1: The Goal",
    content: (
      <>
        <h2>IV. Level 1: The Computational Goal (The "Why")</h2>

        <RemNode
          title={
            <span>
              Now that we have our &quot;Framework for Frameworks,&quot; we can
              dive into the first level of Marr’s hierarchy: the{" "}
              <b>Computational Level</b>. This is where we define the
              &quot;Why.&quot; Before we decide if we are using a Neural Network
              or a Gaussian process, we must ask:{" "}
              <b>What is the fundamental objective of our system?</b>
            </span>
          }
        />

        <RemNode
          title={
            <span>
              In the vast ocean of machine intelligence, almost every
              &quot;goal&quot; can be framed as a search for the best
              relationship between <b>Data</b> and <b>Models</b>. However,
              &quot;best&quot; is a subjective term. Depending on how much you
              trust your model and how much you care about complexity, the
              computational goal changes.
            </span>
          }
        />

        <RemNode title='To understand where Active Inference sits, we must first look at the four primary "strategies" for defining what a system is trying to achieve.' />

        <RemNode
          title={
            <b>
              1. Type I Maximum Likelihood (MLE): &quot;Fitting the
              Weights&quot;
            </b>
          }
          defaultCollapsed={false}
        >
          <RemNode title="The simplest computational goal is to find the specific parameters (weights) that make the observed data most likely." />
          <RemNode title='<b>The Logic:</b> "I assume my model structure is perfect. I just want to find the exact settings that minimize the difference between my prediction and reality."' />
          <RemNode
            title={
              <span>
                <b>The Mechanism:</b> In Deep Learning, this often manifests as
                minimizing a loss function (like Mean Squared Error).
                Mathematically, this is equivalent to minimizing the{" "}
                <b>Kullback-Leibler (KL) Divergence</b> between the model’s
                distribution and the data’s distribution.
              </span>
            }
          />
          <RemNode
            title={
              <span>
                <b>The Trap:</b> This can lead to <b>overfitting</b>. If you
                provide a model that is too complex (too many parameters), MLE
                will happily use that complexity to &quot;memorize&quot; the
                noise in your data rather than learning the underlying signal.
              </span>
            }
          />
          <RemNode
            title={
              <img
                src="https://remnote-user-data.s3.amazonaws.com/b4p4CDexPYogbaoHCOCjws6lqQ60b9y7-VHgRPgLPjq8Yt7zpLKlXS8urqGhhZ1dZpvuv64l29AUMw7_IEruKjuTAE9kgG72_KBQRCbOrfxqWWY_Qd5DrF32Ki4uwFCS.png"
                alt="Overfitting"
                style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
              />
            }
          />
        </RemNode>

        <RemNode
          title={
            <b>
              2. Maximum A Posteriori (MAP): &quot;Fitting with Restraint&quot;
            </b>
          }
          defaultCollapsed={false}
        >
          <RemNode
            title={
              <span>
                MAP adds a layer of &quot;common sense&quot; to the MLE goal by
                introducing a <b>Prior</b>.
              </span>
            }
          />
          <RemNode title="<b>The Logic:</b> &quot;I want to fit the parameters to the data, but I also have a prior belief that the parameters shouldn't be too 'wild' or extreme.&quot;" />
          <RemNode
            title={
              <span>
                <b>The Mechanism:</b> This is essentially MLE with{" "}
                <b>Regularization</b> (like L2 weight decay). It penalizes large
                parameter values.
              </span>
            }
          />
          <RemNode title="<b>The Limitation:</b> While MAP prevents specific weights from exploding, it doesn't solve the structural problem. It can't tell you if your model has too many layers or neurons; it only helps you manage the ones you have." />
        </RemNode>

        <RemNode
          title={
            <b>
              3. Type II MLE / Evidence Maximization: &quot;Finding the Best
              Model&quot;
            </b>
          }
          defaultCollapsed={false}
        >
          <RemNode
            title={
              <span>
                This is a &quot;higher-order&quot; goal often referred to as{" "}
                <b>Empirical Bayes</b>. Here, we aren't just looking for
                weights; we are looking for the best <b>Model Architecture</b>{" "}
                itself.
              </span>
            }
          />
          <RemNode title='<b>The Logic:</b> "I need to calculate which model structure (the prior) makes the data most probable."' />
          <RemNode
            title={
              <span>
                <b>The Mechanism:</b> This involves calculating{" "}
                <b>Model Evidence</b> (or Marginal Likelihood). Crucially, Model
                Evidence has a built-in &quot;Occam’s Razor.&quot; It naturally
                penalizes model complexity. A model that is too complex is
                spread too thin over the data space, resulting in lower evidence
                than a simpler, more &quot;honest&quot; model.
              </span>
            }
          />
          <RemNode
            title={
              <span>
                <b>Why it matters for us:</b> This is a cornerstone of{" "}
                <b>Active Inference</b>. Active Inference systems don't just
                want to fit data; they want to minimize <b>Free Energy</b>,
                which is a proxy for maximizing Model Evidence.
              </span>
            }
          />
        </RemNode>

        <RemNode
          title={<b>4. Full Bayesian: &quot;The Wisdom of the Crowd&quot;</b>}
          defaultCollapsed={false}
        >
          <RemNode title='The most rigorous (and computationally expensive) goal is to stop trying to pick a "winner" entirely.' />
          <RemNode title='<b>The Logic:</b> "I won&apos;t choose a single model. I will consider all possible models and weight their predictions based on how probable they are."' />
          <RemNode
            title={
              <span>
                <b>The Mechanism:</b> This is{" "}
                <b>Bayesian Model Averaging (BMA)</b>.
              </span>
            }
          />
          <RemNode title='*Type II MLE says:* "The 3rd-degree polynomial has the highest evidence. Use that."' />
          <RemNode title='*Full Bayesian says:* "The 3rd-degree is 60% likely and the 4th-degree is 40% likely. I will use a weighted average of both to make my prediction."' />
        </RemNode>

        <RemNode
          title={<b>Summary Table: Comparing Computational Goals</b>}
          defaultCollapsed={false}
        >
          <RemNode
            title={
              <img
                src="https://remnote-user-data.s3.amazonaws.com/PsD5REKGq_fB52xE_RwK8FOUxa4lLgF0NfzvnaSxIGKV8cC2EJCptUikgvdg68BNO3oikr49p9IrNK6tmEL_U-B81vxEEeM--LClFdPs3XMqvoCA5LlIQSDSx6elXesc.png"
                alt="Summary Table"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
            }
          />
        </RemNode>

        <RemNode
          title={
            <span>
              By identifying which of these &quot;goals&quot; a system is
              chasing, you can immediately see the &quot;water&quot; it is
              swimming in. Deep Learning practitioners often live in the world
              of <b>Type I MLE</b> and <b>MAP</b>. Active Inference, on the
              other hand, is built from the ground up on{" "}
              <b>Evidence Maximization</b>.
            </span>
          }
        />
      </>
    ),
  },
];
