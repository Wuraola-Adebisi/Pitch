import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw, Target } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

export default function Challenge() {
  const { challenges, map, reset } = usePitch()
  const navigate = useNavigate()
  const critical = challenges.filter((c) => c.severity === 'critical')
  const moderate = challenges.filter((c) => c.severity === 'moderate')
  const targetLabel = (key: string) => map.find((s) => s.key === key)?.label ?? key

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-coral"><span>05</span><span className="h-px w-8 bg-coral" />Challenge</div>
      <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.95] tracking-[-.055em] sm:text-7xl">{challenges.length > 0 ? 'Where could someone poke a hole?' : 'No obvious gaps detected.'}</h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted">{challenges.length > 0 ? 'These are questions your current argument does not answer cleanly yet. Use them to tighten the idea, not to make the copy prettier.' : 'The current rule-based checks did not find an obvious unanswered question. That is not a guarantee that the argument is sound, so use your own judgement before presenting it.'}</p>

      {challenges.length > 0 && <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
        <div className="border-t-2 border-coral bg-card p-6"><p className="font-display text-4xl font-bold">{critical.length}</p><p className="mt-2 text-sm text-muted">important gaps to address</p></div>
        <div className="border-t-2 border-ink bg-card p-6"><p className="font-display text-4xl font-bold">{moderate.length}</p><p className="mt-2 text-sm text-muted">other questions to consider</p></div>
      </div>}

      <div className="mt-12 space-y-12">
        {critical.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-coral">Start with these</h2>
            <div className="border-t border-ink">
              {critical.map((c, i) => (
                <article key={i} className="border-b border-line py-6">
                  <div className="grid gap-3 sm:grid-cols-[48px_1fr] sm:gap-5">
                    <span className="text-xs text-coral">{String(i + 1).padStart(2, '0')}</span>
                    <div><p className="mb-2 text-xs uppercase tracking-[.12em] text-muted">Pressure point · {targetLabel(c.targets)}</p><p className="text-xl font-semibold leading-snug">{c.question}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {moderate.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-muted">Worth tightening too</h2>
            <div className="border-t border-line">
              {moderate.map((c, i) => (
                <article key={i} className="border-b border-line py-6">
                  <div className="grid gap-3 sm:grid-cols-[48px_1fr] sm:gap-5">
                    <Target size={15} className="mt-1 text-muted" />
                    <div><p className="mb-2 text-xs uppercase tracking-[.12em] text-muted">Pressure point · {targetLabel(c.targets)}</p><p className="text-lg leading-snug text-ink/80">{c.question}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-12 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row">
        <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"><ArrowLeft size={14} />Back to draft</button>
        <button type="button" onClick={() => { reset(); navigate('/app') }} className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white hover:border-coral hover:bg-coral"><RotateCcw size={14} />Start another idea <ArrowRight size={14} /></button>
      </div>
    </div>
  )
}
