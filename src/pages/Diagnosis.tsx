import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Pencil, X } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

const FIELDS = [
  { key: 'audience', label: 'Audience', hint: 'Who is this for?' },
  { key: 'problem', label: 'Problem', hint: 'What hurts?' },
  { key: 'promise', label: 'Promise', hint: 'What are you offering?' },
  { key: 'differentiation', label: 'Differentiation', hint: 'Why this approach?' },
  { key: 'proof', label: 'Proof', hint: 'What backs the claim?' },
  { key: 'outcome', label: 'Outcome', hint: 'What changes?' },
  { key: 'whyNow', label: 'Why now', hint: 'Why is this timely?' },
  { key: 'cta', label: 'Ask', hint: 'What should happen next?' },
] as const

export default function Diagnosis() {
  const { diagnosis, raw } = usePitch()
  const navigate = useNavigate()
  if (!diagnosis) return <Navigate to="/app" replace />

  const foundCount = FIELDS.filter((f) => diagnosis[f.key]).length
  const coverage = Math.round((foundCount / FIELDS.length) * 100)

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-end">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-coral"><span>02</span><span className="h-px w-8 bg-coral" />Diagnosis</div>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.95] tracking-[-.055em] sm:text-7xl">Here's what your idea is actually saying.</h1>
          <p className="mt-6 max-w-2xl leading-7 text-muted">Pitch found {foundCount} of {FIELDS.length} useful signals. That is not a score. It simply shows how much of the argument is already present.</p>
        </div>
        <div className="border-t-2 border-ink pt-3 lg:border-l-0 lg:border-t-2">
          <p className="font-display text-5xl font-bold tracking-[-.05em]">{coverage}%</p>
          <p className="mt-1 text-xs uppercase tracking-[.15em] text-muted">signals found</p>
        </div>
      </div>

      <blockquote className="mt-12 max-w-4xl border-l-2 border-coral pl-5 text-lg leading-7 text-ink/70 sm:text-xl">{raw}</blockquote>

      <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
        {FIELDS.map((f) => {
          const value = diagnosis[f.key]
          return (
            <div key={f.key} className={'bg-card p-5 sm:p-6 ' + (!value ? 'border-l-2 border-dashed border-coral/50' : '')}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border ' + (value ? 'border-ink bg-ink text-white' : 'border-coral text-coral')}>
                    {value ? <Check size={13} /> : <X size={13} />}
                  </div>
                  <div>
                    <p className="font-semibold">{f.label}</p>
                    <p className="mt-1 text-xs text-muted">{f.hint}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[.12em] text-muted">{value ? 'Found' : 'Gap'}</span>
              </div>
              <p className="mt-5 text-sm leading-6 text-ink/70">{value ?? 'Not established yet. Pitch keeps this visible as a gap rather than inventing an answer.'}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <button type="button" onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"><Pencil size={14} />Change the idea</button>
        <button type="button" onClick={() => navigate('/app/map')} className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white hover:border-coral hover:bg-coral">See the argument map <ArrowRight size={16} /></button>
      </div>
    </div>
  )
}
