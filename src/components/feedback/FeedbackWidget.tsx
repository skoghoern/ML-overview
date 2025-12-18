// src/components/feedback/FeedbackWidget.tsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
  Star,
  HelpCircle,
  Lightbulb,
  Bug,
} from "lucide-react";
import { cn } from "../../lib/utils";

// --- CONFIGURATION ---
// Define distinct feedback categories to guide the user
const FEEDBACK_TYPES = [
  {
    id: "clarity",
    label: "Confused",
    icon: HelpCircle,
    question: "Which specific concept or section was difficult to understand?",
    placeholder:
      "e.g., The explanation of 'Loss Functions' was a bit abstract...",
  },
  {
    id: "suggestion",
    label: "Suggestion",
    icon: Lightbulb,
    question: "How could we make this page more helpful for you?",
    placeholder: "e.g., It would be great to have a diagram here...",
  },
  {
    id: "bug",
    label: "Bug / Issue",
    icon: Bug,
    question: "What isn't working as expected?",
    placeholder: "e.g., The animation on mobile overlaps with the text...",
  },
  {
    id: "other",
    label: "General",
    icon: MessageSquare,
    question: "What's on your mind?",
    placeholder: "Share your thoughts...",
  },
];

const FeedbackWidget: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(FEEDBACK_TYPES[0]); // Default to first

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const FORM_ENDPOINT = `https://formspree.io/f/${
    import.meta.env.VITE_FORMSPREE_ID
  }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setStatus("submitting");

    try {
      // Simulation or Real Submission
      const payload = {
        page: location.pathname,
        rating: rating,
        category: selectedCategory.label, // Send the category!
        prompt_answered: selectedCategory.question, // Context for the answer
        message: feedback,
        timestamp: new Date().toISOString(),
      };

      if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
        console.log("Simulating submission:", payload);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Submission failed");
      }

      setStatus("success");
      setFeedback("");
      setRating(0);

      // Reset to default category after success
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        setSelectedCategory(FEEDBACK_TYPES[0]);
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all",
          "bg-ocean-900 text-white hover:bg-ocean-800 hover:scale-105 active:scale-95",
          isOpen && "hidden"
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -2 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md" // Slightly wider for categories
          >
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-ocean-50 px-6 py-4 border-b border-ocean-100 flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-ocean-900">
                    Help us improve
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    Context:{" "}
                    <span className="text-ocean-600">{location.pathname}</span>
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle size={24} />
                    </div>
                    <p className="text-slate-700 font-medium">
                      Feedback received!
                    </p>
                    <p className="text-xs text-slate-500">
                      Your input helps us refine the map for everyone.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 1. Star Rating */}
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        How clear is this page?
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-1 transition-transform hover:scale-110 focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={cn(
                                "transition-colors duration-200",
                                star <= (hoveredRating || rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-transparent text-slate-300"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* 2. Feedback Category Selection */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                        What kind of feedback?
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {FEEDBACK_TYPES.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedCategory(type)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                              selectedCategory.id === type.id
                                ? "bg-ocean-100 border-ocean-200 text-ocean-900"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            <type.icon size={14} />
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Dynamic Question & Textarea */}
                    <div className="space-y-2">
                      <label
                        htmlFor="feedback-text"
                        className="block text-sm font-semibold text-ocean-900"
                      >
                        {selectedCategory.question}
                      </label>
                      <textarea
                        id="feedback-text"
                        required
                        autoFocus
                        placeholder={selectedCategory.placeholder}
                        className="w-full min-h-[100px] p-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 resize-none transition-all"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </div>

                    {/* Error State */}
                    {status === "error" && (
                      <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2 rounded">
                        <AlertCircle size={14} />
                        <span>Failed to send. Please try again.</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={status === "submitting" || !feedback.trim()}
                        className="flex items-center gap-2 bg-ocean-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-ocean-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Feedback</span>
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;
