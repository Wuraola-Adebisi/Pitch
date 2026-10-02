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
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-coral"><span>Challenge</span><span className="h-px w-8 bg-coral" /></div>
      <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.94] tracking-[-.055em] sm:text-7xl">{challenges.length > 0 ? 'Where could someone push back?' : 'Nothing obvious to push on.'}</h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted">{challenges.length > 0 ? 'These are pressure points in the current argument. They are useful questions to answer before you make the case, not a prediction of what someone will say.' : 'The current checks did not find an obvious unanswered question. That is not proof that the argument is sound.'}</p>

      {challenges.length > 0 && (
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          <div className="border-2 border-coral bg-[#fff4ef] p-6">
            <p className="font-mono text-4xl font-bold">{critical.length}</p>
            <p className="mt-2 text-sm text-muted">questions that attack the case</p>
          </div>
          <div className="border-2 border-ink bg-card p-6">
            <p className="font-mono text-4xl font-bold">{moderate.length}</p>
            <p className="mt-2 text-sm text-muted">questions worth tightening</p>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-12">
        {critical.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-coral">Pressure points</h2>
            <div className="border-t-2 border-ink">
              {critical.map((c, i) => (
                <article key={i} className="border-b border-line py-7">
                  <div className="grid gap-5 sm:grid-cols-[48px_1fr_180px] sm:gap-6">
                    <span className="font-mono text-[10px] text-coral">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.13em] text-muted">Someone could ask</p>
                      <p className="text-xl font-semibold leading-snug">{c.question}</p>
                    </div>
                    <div className="border-l border-line pl-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-coral">Attacks</p>
                      <p className="mt-2 text-sm leading-5 text-muted">{targetLabel(c.targets)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {moderate.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-muted">Worth tightening</h2>
            <div className="border-t border-line">
              {moderate.map((c, i) => (
                <article key={i} className="border-b border-line py-7">
                  <div className="grid gap-5 sm:grid-cols-[48px_1fr_180px] sm:gap-6">
                    <Target size={15} className="mt-1 text-muted" />
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.13em] text-muted">Question</p>
                      <p className="text-lg leading-snug text-ink/80">{c.question}</p>
                    </div>
                    <div className="border-l border-line pl-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-muted">Attacks</p>
                      <p className="mt-2 text-sm leading-5 text-muted">{targetLabel(c.targets)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-12 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row">
        <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"><ArrowLeft size={14} />Back to draft</button>
        <button type="button" onClick={() => { reset(); navigate('/app') }} className="inline-flex items-center gap-2 bg-coral px-5 py-3 text-sm font-semibold text-card hover:bg-coral-dark"><RotateCcw size={14} />Start another idea <ArrowRight size={14} /></button>
      </div>
    </div>
  )
}