import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { usePitch } from '../lib/store'
import type { SectionKey } from '../lib/engine'

const strengthStyle: Record<string, string> = {
  strong: 'border-moss/40 bg-moss/5',
  partial: 'border-ember/30 bg-ember/5',
  weak: 'border-dashed border-ink/25 bg-transparent',
}

const strengthDot: Record<string, string> = {
  strong: 'bg-moss',
  partial: 'bg-ember',
  weak: 'bg-ink/20',
}

export default function ArgumentMap() {
  const { map } = usePitch()
  const navigate = useNavigate()
  const [openKey, setOpenKey] = useState<SectionKey | null>(map[0]?.key ?? null)

  if (map.length === 0) return <Navigate to="/app" replace />
  const open = map.find((s) => s.key === openKey) ?? map[0]

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-[280px_1fr] gap-10">
      <div>
        <p className="uppercase tracking-[0.2em] text-xs text-ember font-medium mb-3">
          Argument Map
        </p>
        <h1 className="font-display text-2xl mb-6">Click any stage.</h1>
        <div className="flex flex-col">
          {map.map((s, i) => (
            <div key={s.key}>
              <button
                onClick={() => setOpenKey(s.key)}
                className={
                  'w-full text-left rounded-xl border p-4 transition-colors ' +
                  strengthStyle[s.strength] +
                  (open.key === s.key ? ' ring-1 ring-ink' : '')
                }
              >
                <div className="flex items-center gap-2">
                  <span className={'h-2 w-2 rounded-full ' + strengthDot[s.strength]} />
                  <span className="font-display text-lg">{s.label}</span>
                </div>
              </button>
              {i < map.length - 1 && (
                <div className="flex justify-center py-1 text-ink/25">
                  <ArrowDown size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-14">
        <div className="rounded-2xl border border-line bg-white/40 p-8">
          <p className="uppercase tracking-[0.15em] text-xs text-ink/40 mb-2">
            {open.label}
          </p>
          <h2 className="font-display text-2xl mb-6">What you have</h2>
          <p className="text-ink/80 mb-8">
            {open.have || 'Nothing established here yet.'}
          </p>

          {open.missing && (
            <>
              <h3 className="font-display text-lg mb-2 text-ember">What's missing</h3>
              <p className="text-ink/70 mb-8">{open.missing}</p>
            </>
          )}

          <h3 className="font-display text-lg mb-2">Evidence that would strengthen it</h3>
          <p className="text-ink/70 mb-8">{open.evidence}</p>

          <h3 className="font-display text-lg mb-2">How it connects to the next stage</h3>
          <p className="text-ink/70">{open.connection}</p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate('/app/pitch')}
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ember transition-colors"
          >
            Build the pitch
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
