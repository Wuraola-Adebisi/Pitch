import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Pencil, X } from 'lucide-react'
import { usePitch } from '../lib/store'

const FIELDS = [
  { key: 'audience', label: 'Audience', hint: 'Who is this for?' },
  { key: 'problem', label: 'Problem', hint: 'What hurts?' },
  { key: 'promise', label: 'Promise', hint: 'What are you offering?' },
  { key: 'differentiation', label: 'Differentiation', hint: 'Why this approach?' },
  { key: 'proof', label: 'Proof', hint: 'What backs the claim?' },
  { key: 'outcome', label: 'Outcome', hint: 'What changes?' },
  { key: 'cta', label: 'Ask', hint: 'What should happen next?' },
] as const

export default function Diagnosis() {
  const { diagnosis, raw } = usePitch()
  const navigate = useNavigate()

  if (!diagnosis) return <Navigate to="/app" replace />

  const foundCount = FIELDS.filter((f) => diagnosis[f.key]).length
  const coverage = Math.round((foundCount / FIELDS.length) * 100)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-ember">02</span>
          <span className="h-px w-10 bg-line" />
          <span className="text-xs text-ink/40">Diagnosis</span>
        </div>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="mb-3 font-display text-4xl leading-tight sm:text-5xl">
              {foundCount} of {FIELDS.length} building blocks are visible.
            </h1>
            <p className="text-ink/55">
              This is coverage, not a quality score. Missing pieces are where the next questions should go.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-line bg-white/40 px-5 py-4">
            <p className="font-display text-3xl">{coverage}%</p>
            <p className="mt-1 text-xs text-ink/40">argument coverage</p>
          </div>
        </div>
      </div>

      <blockquote className="mt-10 max-w-3xl border-l-2 border-ember pl-5 font-display text-xl leading-snug text-ink/75 sm:text-2xl">
        {raw}
      </blockquote>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const value = diagnosis[f.key]
          return (
            <div
              key={f.key}
              className={'rounded-2xl border p-5 transition-colors ' + (value ? 'border-line bg-white/40' : 'border-dashed border-ink/20')}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={'flex h-7 w-7 shrink-0 items-center justify-center rounded-full ' + (value ? 'bg-moss/15 text-moss' : 'bg-ember/10 text-ember')}>
                    {value ? <Check size={14} /> : <X size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.label}</p>
                    <p className="mt-0.5 text-xs text-ink/40">{f.hint}</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-ink/30">
                  {value ? 'Found' : 'Gap'}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                {value ?? 'Not established yet. Pitch keeps this visible as a gap rather than inventing an answer.'}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <button type="button" onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink">
          <Pencil size={14} />
          Edit the idea
        </button>
        <button type="button" onClick={() => navigate('/app/map')} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ember">
          Map the argument
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
