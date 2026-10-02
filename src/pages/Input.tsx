import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, RotateCcw } from "lucide-react";
import { usePitch } from "../lib/usePitch";
import { validateIdea } from "../lib/engine";

const EXAMPLE =
  "I'm building an app that helps small businesses manage their inventory without spreadsheets.";

export default function Input() {
  const { raw, submit } = usePitch();
  const [text, setText] = useState(raw);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const go = () => {
    const clean = text.trim();
    if (!clean) return;
    const problem = validateIdea(clean);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    submit(clean);
    navigate("/app/diagnosis");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="mb-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-muted">
        <span className="rounded-full bg-coral px-2.5 py-1 text-ink">
          01
        </span>{" "}
        Idea
      </div>
      <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div>
          <h1 className="max-w-xl font-display text-5xl font-bold leading-[.96] tracking-[-.055em] sm:text-7xl">
            Start with the thing you actually have.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-ink/65 sm:text-lg">
            Put the rough idea here. It does not need to sound convincing yet.
            Pitch will show you what is there, what is missing, and where the
            argument needs work.
          </p>
          <div className="mt-8 rounded-2xl bg-card p-5 text-sm leading-6 text-muted">
            A few sentences is enough. Do not write the polished version.
          </div>
        </div>

        <div>
          <div className="rounded-[1.5rem] bg-card p-2">
            <div className="rounded-[1.25rem] border border-line bg-paper p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.15em] text-muted">
                    Your idea
                  </p>
                  <p className="mt-1 text-sm text-ink/45">
                    Write it as you would explain it to someone.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-muted">
                    {text.length}/1500
                  </span>
                  {text && (
                    <button
                      type="button"
                      onClick={() => setText("")}
                      className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-ink"
                    >
                      <RotateCcw size={11} />
                      Clear
                    </button>
                  )}
                </div>
              </div>
              <textarea
                autoFocus
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") go();
                }}
                rows={11}
                maxLength={1500}
                aria-label="Your idea"
                className="mt-5 w-full resize-none rounded-2xl border border-line bg-line p-5 text-lg leading-7 text-ink placeholder:text-ink/25 focus:border-coral focus:outline-none sm:p-7 sm:text-xl"
              />
              {error && (
                <p role="alert" className="mt-3 text-sm text-coral">
                  {error}
                </p>
              )}
              {text.length >= 1500 && (
                <p className="mt-3 text-xs text-muted">
                  You have reached the 1500 character limit. Anything beyond it
                  was not added.
                </p>
              )}
              <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setText(EXAMPLE)}
                  className="px-1 text-xs font-medium text-muted underline decoration-line underline-offset-4 hover:text-ink"
                >
                  Use an example
                </button>
                <div className="flex items-center gap-4">
                  <span className="hidden text-[11px] uppercase tracking-[.1em] text-muted/60 sm:inline">
                    Ctrl / ⌘ + Enter
                  </span>
                  <button
                    type="button"
                    onClick={go}
                    disabled={!text.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-coral-dark disabled:opacity-30"
                  >
                    Analyse idea <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-7 text-xs text-muted">
            Your idea is analysed and saved locally in this MVP. It is not sent
            to an AI service.
          </p>
        </div>
      </div>
    </div>
  );
}
