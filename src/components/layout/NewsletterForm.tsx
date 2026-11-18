import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { formspreeEndpoint } from "../../lib/forms";

const endpoint = formspreeEndpoint(import.meta.env.VITE_NEWSLETTER_FORM_ID);

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const { status, submit, reset, configured } = useFormSubmit(endpoint);

  const handleSubscribe = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;

    const ok = await submit({ email });
    if (!ok) return;

    setEmail("");
    window.setTimeout(() => {
      setIsOpen(false);
      window.setTimeout(() => reset(), 500);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="mt-4 pt-6 border-t border-slate-200 overflow-hidden relative group">
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-0 text-slate-300 hover:text-rose-500 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
        title="Hide newsletter"
        aria-label="Hide newsletter"
      >
        <X size={14} />
      </button>

      <p className="text-xs text-slate-500 mb-3 leading-relaxed pr-4">
        This website is currently developing. If you wish to be informed for new
        updates:
      </p>

      {!configured ? (
        <p className="text-xs text-slate-400 leading-relaxed">
          Newsletter signup is not configured.
        </p>
      ) : status === "success" ? (
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 p-3 rounded-lg border border-emerald-100">
          <CheckCircle size={16} />
          <span>You're in the loop!</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-2 relative">
          <input
            type="email"
            placeholder="your@email.com"
            aria-label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
        </form>
      )}
    </div>
  );
}
