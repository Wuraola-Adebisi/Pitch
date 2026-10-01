import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw, Target } from 'lucide-react'
import { usePitch } from '../lib/store'

export default function Challenge() {
  const { challenges, map, reset } = usePitch()
  const navigate = useNavigate()
  if (challenges.length === 0) return <Navigate to="/app" replace />

  const critical = challenges.filter((c) => c.severity === 'critical')
  const moderate = challenges.filter((c) => c.severity === 'moderate')
  const targetLabel = (key: string) => map.find((s) => s.key === key)?.label ?? key

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-5 flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-ember">05</span>
        <span className="h-px w-10 bg-line" />
        <span className="text-xs text-ink/40">Challenge</span>
      </div>

      <h1 className="mb-4 font-display text-4xl leading-tight sm:text-5xl">
        Where could someone poke a hole?
      </h1>
      <p className="max-w-2xl leading-relaxed text-ink/55">
        These are questions your current argument does not answer cleanly yet. Use them to tighten the idea, not to make the copy prettier.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-ember/30 bg-ember/5 p-5">
          <p className="font-display text-3xl">{critical.length}</p>
          <p className="mt-1 text-sm text-ink/55">important gaps to address</p>
        </div>
        <div className="rounded-2xl border border-line bg-white/40 p-5">
          <p className="font-display text-3xl">{moderate.length}</p>
          <p className="mt-1 text-sm text-ink/55">other questions to consider</p>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        {critical.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-xl text-ember">Start with these.</h2>
            <div className="space-y-3">
              {critical.map((c, i) => (
                <article key={i} className="rounded-2xl border border-ember/25 bg-white/30 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="pt-1 text-xs text-ember/60">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.12em] text-ink/35">Pressure point · {targetLabel(c.targets)}</p>
                      <p className="font-display text-xl leading-snug">{c.question}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {moderate.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-xl text-ink/60">Worth tightening too.</h2>
            <div className="space-y-3">
              {moderate.map((c, i) => (
                <article key={i} className="rounded-2xl border border-line bg-white/30 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <Target size={15} className="mt-1 shrink-0 text-ink/30" />
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.12em] text-ink/35">Pressure point · {targetLabel(c.targets)}</p>
                      <p className="text-lg leading-snug text-ink/80">{c.question}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row">
        <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink">
          <ArrowLeft size={14} />
          Back to draft
        </button>
        <button
          type="button"
          onClick={() => {
            reset()
            navigate('/app')
          }}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ember"
        >
          <RotateCcw size={14} />
          Start another idea
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
