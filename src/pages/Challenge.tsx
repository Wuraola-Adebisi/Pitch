import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import AddToPitch from '../components/AddToPitch'
import ConfirmResetDialog from '../components/ConfirmResetDialog'

export default function Challenge() {
  const { challenges, map, reset, pitch } = usePitch()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const critical = challenges.filter((c) => c.severity === 'critical')
  const moderate = challenges.filter((c) => c.severity === 'moderate')
  const targetLabel = (key: string) => map.find((s) => s.key === key)?.label ?? key

  const copyDraft = async () => {
    if (!pitch) return
    const text = [pitch.title, ...pitch.sections.map((s) => s.heading + '\n' + s.body)].join('\n\n')
    await navigator.clipboard?.writeText(text)
    setConfirmOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-muted"><span>Challenge</span><span className="h-px w-8 bg-coral" /></div>
        <h1 className="mt-7 font-display text-5xl font-bold leading-[.9] tracking-[-.05em] sm:text-7xl">{challenges.length > 0 ? 'Where does the case get questioned?' : 'No obvious gap, but keep testing.'}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted">{challenges.length > 0 ? 'These questions are generated from the current argument. Use them to revise the source, then run the checks again.' : 'The current checks did not find an obvious unanswered question. That is not proof that the argument is sound. Test the strongest claim anyway.'}</p>
      </div>

      {challenges.length > 0 && <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-coral/60 bg-coral/[0.07] p-5"><p className="font-mono text-3xl font-bold">{challenges.length}</p><p className="mt-2 text-xs text-muted">open questions</p></div>
        <div className="rounded-2xl border border-line bg-card p-5"><p className="font-mono text-3xl font-bold">{critical.length}</p><p className="mt-2 text-xs text-muted">high-priority gaps</p></div>
        <div className="rounded-2xl border border-line bg-card p-5"><p className="font-mono text-3xl font-bold">{moderate.length}</p><p className="mt-2 text-xs text-muted">worth tightening</p></div>
      </div>}

      <div className="mt-12 grid gap-3 lg:grid-cols-2">
        {challenges.map((c, i) => (
          <article key={i} className="rounded-[1.5rem] border border-line bg-card p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4"><span className="font-mono text-[11px] text-coral">{String(i + 1).padStart(2, '0')}</span><span className={'rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.08em] ' + (c.severity === 'critical' ? 'bg-coral/10 text-coral' : 'bg-line text-muted')}>{c.severity === 'critical' ? 'High priority' : 'Tighten'}</span></div>
            <p className="mt-7 text-xl font-semibold leading-snug">{c.question}</p>
            <div className="mt-7 rounded-xl bg-smoky p-4"><p className="text-xs font-semibold uppercase tracking-[.13em] text-muted">Presses on</p><p className="mt-2 text-sm text-ink/75">{targetLabel(c.targets)}</p></div>
            <div className="mt-4"><p className="text-xs font-semibold uppercase tracking-[.13em] text-muted">Useful next move</p><p className="mt-2 text-sm leading-6 text-muted">{c.strengthen}</p></div>
            <div className="mt-4"><AddToPitch prompt="Add the answer to this challenge as one sentence." /></div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:p-6">
        <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"><ArrowLeft size={14} />Back to draft</button>
        <button type="button" onClick={() => setConfirmOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-ink hover:bg-coral-dark"><RotateCcw size={14} />Start another idea <ArrowRight size={14} /></button>
      </div>
      <ConfirmResetDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => { reset(); setConfirmOpen(false); navigate('/app') }} onCopy={copyDraft} hasDraft={Boolean(pitch)} />
    </div>
  )
}