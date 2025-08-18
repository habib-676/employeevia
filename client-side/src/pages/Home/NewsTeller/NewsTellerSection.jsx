import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, ShieldCheck, Sparkles, Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const hpRef = useRef(null); // honeypot

  const validateEmail = (v) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    // basic validations
    if (hpRef.current?.value) return; // bot caught
    if (!validateEmail(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!agree) {
      setStatus({
        type: "error",
        message: "Please agree to our privacy policy to continue.",
      });
      return;
    }

    try {
      setStatus({ type: "loading", message: "Subscribing…" });

      await new Promise((res) => setTimeout(res, 1200));

      setStatus({
        type: "success",
        message: "You're in!",
      });
      setEmail("");
      setName("");
      setAgree(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  };

  return (
    <section className="relative overflow-hidden px-4 md:px-10 mt-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -inset-[10%] bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-400/10 dark:via-sky-400/10 dark:to-indigo-400/10 blur-3xl" />
        <svg
          className="absolute -top-24 -right-24 w-[38rem] opacity-40 dark:opacity-30"
          viewBox="0 0 600 600"
          aria-hidden
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop stopColor="#34d399" offset="0%" />
              <stop stopColor="#22d3ee" offset="100%" />
            </linearGradient>
          </defs>
          <path
            fill="url(#g)"
            d="M300,532.5Q208,565,134,509.5Q60,454,55,357Q50,260,112,187.5Q174,115,267,90Q360,65,440.5,122.5Q521,180,542.5,270Q564,360,501.5,437.5Q439,515,349.5,528Q260,541,300,532.5Z"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border  bg-white/60 px-3 py-1 text-sm text-primary shadow-sm backdrop-blur dark:bg-slate-900/50 dark:text-emerald-300">
              <Sparkles className="h-4 w-4" />
              <span>Join 5,000+ Fixitronics readers</span>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Get smart maintenance tips, exclusive offers & product updates
            </h2>
            <p className="text-secondary-content">
              Subscribe to the Fixitronics newsletter for bite-sized how‑tos,
              seasonal checklists, and early access to new services. No spam.
              Unsubscribe anytime.
            </p>

            <ul className="grid gap-3 text-sm text-secondary-content sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Verified tips by experts
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Best seasonal deals
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> 1-2 emails / month
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> No spam, ever
              </li>
            </ul>
          </motion.div>

          {/* Right: Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative"
          >
            <div className="group rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur md:p-8 dark:border-slate-700/60 dark:bg-slate-900/70">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Newsletter
                  </p>
                  <h3 className="text-lg font-semibold">
                    Subscribe to Fixitronics
                  </h3>
                </div>
              </div>

              <form
                onSubmit={onSubmit}
                className="space-y-4"
                aria-label="Newsletter sign-up"
              >
                {/* Honeypot */}
                <input
                  ref={hpRef}
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="name" className="sr-only">
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 "
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 "
                      required
                      aria-invalid={
                        status.type === "error" && !validateEmail(email)
                          ? "true"
                          : "false"
                      }
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-600"
                    aria-label="I agree to the privacy policy"
                  />
                  <span>
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-medium text-emerald-600 underline underline-offset-4 hover:no-underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to receive emails.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {status.type === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </button>

                {/* Helper text / status */}
                {status.type !== "idle" && (
                  <p
                    className={
                      "rounded-lg px-3 py-2 text-sm " +
                      (status.type === "error"
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                        : status.type === "success"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "text-slate-600 dark:text-slate-300")
                    }
                    role={status.type === "error" ? "alert" : undefined}
                  >
                    {status.message}
                  </p>
                )}

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  We care about your data. Read our{" "}
                  <a
                    href="#"
                    className="font-medium text-slate-700 underline underline-offset-4 hover:no-underline dark:text-slate-200"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>

            {/* Glow ring */}
            <div className="pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 opacity-0 blur transition duration-500 group-hover:opacity-100" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
