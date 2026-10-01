import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import type { SectionKey } from '../lib/engine'

const strengthStyle: Record<string, string> = {
  strong: 'border-ink bg-card',
  partial: 'border-coral bg-card',
  weak: 'border-dashed border-ink/30 bg-paper',
}
const strengthDot: Record<string, string> = { strong: 'bg-ink', partial: 'bg-coral', weak: 'bg-ink/20' }

export default function ArgumentMap() {
  const { map, diagnosis } = usePitch()
  const navigate = useNavigate()
  const [openKey, setOpenKey] = useState<SectionKey | null>(map[0]?.key ?? null)
  if (map.length === 0 || !diagnosis) return <Navigate to="/app" replace />

  const open = map.find((s) => s.key === openKey) ?? map[0]
  const signalCount = map.filter((s) => s.strength === 'strong').length

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-coral"><span>03</span><span className="h-px w-8 bg-coral" />Argument map</div>
          <h1 className="mt-7 font-display text-5xl font-bold leading-[.95] tracking-[-.055em] sm:text-7xl">Does the case hold together?</h1>
          <p className="mt-6 max-w-2xl leading-7 text-muted">A pitch is not seven independent claims. Each stage has to earn the next one. Click through the chain and find the weak links.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted"><CheckCircle2 size={16} className="text-coral" />{signalCount} of {map.length} stages have a signal</div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {map.map((s, i) => (
              <div key={s.key}>
                <button
                  type="button"
                  onClick={() => setOpenKey(s.key)}
                  className={'w-full border p-4 text-left transition-colors ' + strengthStyle[s.strength] + (open.key === s.key ? ' ring-1 ring-ink' : ' hover:bg-card')}
                >
                  <div className="flex items-center gap-2">
                    <span className={'h-2 w-2 ' + strengthDot[s.strength]} />
                    <span className="font-semibold">{s.label}</span>
                  </div>
                </button>
                {i < map.length - 1 && <div className="hidden justify-center py-1 text-ink/20 lg:flex"><ArrowDown size={14} /></div>}
              </div>
            ))}
          </div>
          <div className="mt-5 border-l-2 border-coral pl-4 text-xs leading-6 text-muted">
            <span className="font-semibold text-ink">Solid</span> = detected signal · <span className="font-semibold text-coral">dashed</span> = gap to investigate
          </div>
        </div>

        <div>
          <div className="border-t-2 border-ink bg-card">
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
              <div><p className="mb-2 text-xs uppercase tracking-[.15em] text-muted">{open.label}</p><h2 className="text-2xl font-semibold">{open.strength === 'strong' ? 'Signal found' : 'This needs work'}</h2></div>
              <span className="text-xs font-semibold uppercase tracking-[.12em] text-coral">{open.strength === 'strong' ? 'Found' : 'Gap'}</span>
            </div>
            <div className="divide-y divide-line">
              <section className="px-6 py-6 sm:px-8"><p className="mb-2 text-xs uppercase tracking-[.15em] text-muted">What we found</p><p className="leading-7 text-ink/75">{open.have || 'Nothing established here yet.'}</p></section>
              <section className="px-6 py-6 sm:px-8"><p className="mb-2 text-xs uppercase tracking-[.15em] text-coral">What is missing</p><p className="leading-7 text-ink/70">{open.missing || 'The detected signal is present. Strengthen it with evidence.'}</p></section>
              <section className="px-6 py-6 sm:px-8"><p className="mb-2 text-xs uppercase tracking-[.15em] text-muted">Useful evidence</p><p className="leading-7 text-ink/70">{open.evidence}</p></section>
              <section className="px-6 py-6 sm:px-8"><p className="mb-2 text-xs uppercase tracking-[.15em] text-muted">Why it connects</p><p className="leading-7 text-ink/70">{open.connection}</p></section>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white hover:border-coral hover:bg-coral">Turn it into a draft <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
