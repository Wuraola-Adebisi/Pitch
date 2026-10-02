import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Pencil, X } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import AddToPitch from '../components/AddToPitch'

const FIELDS = [
  { key: 'audience', label: 'Audience', hint: 'Who is this for?', detail: 'A clear audience gives the rest of the argument somewhere specific to land.' },
  { key: 'problem', label: 'Problem', hint: 'What hurts?', detail: 'The problem should describe a recurring situation, not simply name a category.' },
  { key: 'promise', label: 'Promise', hint: 'What are you offering?', detail: 'This is the clearest statement of what the product or service does.' },
  { key: 'differentiation', label: 'Differentiation', hint: 'Why this approach?', detail: 'This needs to explain what is meaningfully different, not just what the product contains.' },
  { key: 'proof', label: 'Proof', hint: 'What backs the claim?', detail: 'Proof is observable evidence that makes the argument easier to believe.' },
  { key: 'outcome', label: 'Outcome', hint: 'What changes?', detail: 'An outcome describes the consequence for the audience after the solution works.' },
  { key: 'whyNow', label: 'Why now', hint: 'Why is this timely?', detail: 'Timing needs a concrete change in market, behaviour, technology, cost or regulation.' },
  { key: 'cta', label: 'Ask', hint: 'What should happen next?', detail: 'A good ask turns understanding into one concrete next action.' },
] as const

const ADD_PROMPTS: Record<string, string> = {
  audience: 'Who specifically is this for?',
  problem: 'What recurring problem does this audience face?',
  promise: 'What does the product or service actually do?',
  differentiation: 'What makes this meaningfully different from the alternative?',
  proof: 'What evidence do you have so far?',
  outcome: 'What changes for the customer after this works?',
  whyNow: 'What changed that makes this timely?',
  cta: 'What do you want the listener to do next?',
}

export default function Diagnosis() {
  const { diagnosis, raw } = usePitch()
  const navigate = useNavigate()
  if (!diagnosis) return <Navigate to="/app" replace />

  const foundCount = FIELDS.filter((f) => diagnosis[f.key]).length
  const missingCount = FIELDS.length - foundCount
  const openCount = FIELDS.filter((f) => !diagnosis[f.key] || diagnosis.weak.includes(f.key)).length

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-muted"><span>Diagnosis</span><span className="h-px w-8 bg-coral" /></div>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.9] tracking-[-.05em] sm:text-7xl">What did you actually give us?</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">This pass does not grade the idea. It separates signals Pitch can detect from the pieces you still need to establish.</p>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-card p-5">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[.15em] text-muted">Readout</p><p className="mt-2 text-3xl font-semibold tracking-[-.04em]">{foundCount}<span className="text-muted">/{FIELDS.length}</span></p></div>
            <div className="text-right text-xs text-muted"><p>{foundCount} detected</p><p>{openCount} open</p></div>
          </div>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-coral transition-all" style={{ width: (foundCount / FIELDS.length) * 100 + '%' }} /></div>
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-line bg-smoky">
        <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[.15em] text-muted">Source material</span>
          <button type="button" onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-xs font-medium text-muted hover:text-ink"><Pencil size={13} />Edit idea</button>
        </div>
        <blockquote className="px-5 py-6 text-lg leading-8 text-ink/80 sm:px-8 sm:py-8 sm:text-xl">“{raw}”</blockquote>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FIELDS.map((f) => {
          const value = diagnosis[f.key]
          const weak = value && diagnosis.weak.includes(f.key)
          const status = !value ? 'Open' : weak ? 'Partial' : 'Detected'
          return (
            <article key={f.key} className={'rounded-2xl border bg-card p-5 ' + (!value ? 'border-dashed border-coral/50' : weak ? 'border-coral/50' : 'border-line')}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={'flex h-7 w-7 shrink-0 items-center justify-center rounded-full ' + (!value ? 'bg-coral/10 text-coral' : weak ? 'bg-coral/15 text-coral' : 'bg-ink text-paper')}><>{value ? <Check size={13} /> : <X size={13} />}</></div>
                  <p className="font-semibold">{f.label}</p>
                </div>
                <span className={'rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[.08em] ' + (!value || weak ? 'bg-coral/10 text-coral' : 'bg-line text-muted')}>{status}</span>
              </div>
              <p className="mt-6 min-h-20 text-sm leading-6 text-ink/75">{value ?? 'Pitch could not establish this from the source. That gap stays visible.'}</p>
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-xs font-semibold uppercase tracking-[.13em] text-muted">{f.hint}</p>
                <p className="mt-2 text-xs leading-5 text-muted/80">{weak ? diagnosis.weak.includes(f.key) ? 'The signal is present, but it needs more specificity or evidence.' : f.detail : f.detail}</p>
                {(!value || weak) && <AddToPitch prompt={ADD_PROMPTS[f.key]} />}
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:p-6">
        <div><p className="text-sm font-semibold">{openCount === 0 ? 'The source covers every detected field.' : openCount + ' pieces still need work.'}</p><p className="mt-1 text-xs leading-5 text-muted">Strengthen the open pieces before you turn the argument into a draft.</p></div>
        <button type="button" onClick={() => navigate('/app/map')} className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-ink hover:bg-coral-dark">Open the argument map <ArrowRight size={15} /></button>
      </div>
    </div>
  )
}