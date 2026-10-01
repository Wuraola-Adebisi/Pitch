import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import { usePitch } from '../lib/store'

const FIELDS: { key: 'audience' | 'problem' | 'promise' | 'differentiation' | 'proof' | 'outcome' | 'cta'; label: string }[] = [
  { key: 'audience', label: 'Audience' },
  { key: 'problem', label: 'Problem' },
  { key: 'promise', label: 'Promise' },
  { key: 'differentiation', label: 'Differentiation' },
  { key: 'proof', label: 'Proof' },
  { key: 'outcome', label: 'Desired outcome' },
  { key: 'cta', label: 'Call to action' },
]

export default function Diagnosis() {
  const { diagnosis, raw } = usePitch()
  const navigate = useNavigate()
  if (!diagnosis) return <Navigate to="/app" replace />

  const foundCount = FIELDS.filter((f) => diagnosis[f.key]).length

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="uppercase tracking-[0.2em] text-xs text-ember font-medium mb-3">
        Diagnosis
      </p>
      <h1 className="font-display text-3xl sm:text-4xl mb-3">
        {foundCount} of {FIELDS.length} elements are already in your idea.
      </h1>
      <p className="text-ink/50 mb-10 italic">"{raw}"</p>

      <div className="space-y-3">
        {FIELDS.map((f) => {
          const value = diagnosis[f.key]
          return (
            <div
              key={f.key}
              className={
                'flex items-start gap-4 rounded-xl border p-4 ' +
                (value ? 'border-line bg-white/40' : 'border-dashed border-ink/20')
              }
            >
              <div
                className={
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ' +
                  (value ? 'bg-moss/15 text-moss' : 'bg-ember/10 text-ember')
                }
              >
                {value ? <Check size={14} /> : <X size={14} />}
              </div>
              <div>
                <p className="text-sm font-medium">{f.label}</p>
                <p className="text-sm text-ink/60 mt-0.5">
                  {value ?? 'Not established yet. This will read as a gap in the argument map.'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={() => navigate('/app/map')}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ember transition-colors"
        >
          See the argument map
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
