import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react'
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
  const { map, diagnosis } = usePitch()
  const navigate = useNavigate()
  const [openKey, setOpenKey] = useState<SectionKey | null>(map[0]?.key ?? null)

  if (map.length === 0 || !diagnosis) return <Navigate to="/app" replace />

  const open = map.find((s) => s.key === openKey) ?? map[0]
  const signalCount = map.filter((s) => s.strength === 'strong').length

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ember">03</span>
            <span className="h-px w-10 bg-line" />
            <span className="text-xs text-ink/40">Argument map</span>
          </div>
          <h1 className="mb-3 font-display text-4xl leading-tight sm:text-5xl">
            Does the case hold together?
          </h1>
          <p className="max-w-2xl leading-relaxed text-ink/55">
            A pitch is not seven independent claims. Each stage has to earn the next one.
            Click through the chain and find the weak links.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink/50">
          <CheckCircle2 size={16} className="text-moss" />
          {signalCount} of {map.length} stages have a signal
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        <div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {map.map((s, i) => (
              <div key={s.key} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setOpenKey(s.key)}
                  className={
                    'w-full rounded-xl border p-4 text-left transition-all ' +
                    strengthStyle[s.strength] +
                    (open.key === s.key ? ' ring-1 ring-ink shadow-sm' : ' hover:-translate-y-0.5')
                  }
                >
                  <div className="flex items-center gap-2">
                    <span className={'h-2 w-2 rounded-full ' + strengthDot[s.strength]} />
                    <span className="font-display text-lg">{s.label}</span>
                  </div>
                </button>
                {i < map.length - 1 && (
                  <div className="hidden justify-center py-1 text-ink/20 lg:flex">
                    <ArrowDown size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-line bg-white/30 p-4 text-xs leading-relaxed text-ink/45">
            <span className="font-medium text-moss">Solid</span> = detected signal · <span className="font-medium text-ember">dashed</span> = gap to investigate
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-line bg-white/50 p-6 shadow-[0_14px_45px_-30px_rgba(23,20,16,0.35)] sm:p-9">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-ink/35">{open.label}</p>
                <h2 className="font-display text-3xl">{open.strength === 'strong' ? 'Signal found' : 'This needs work'}</h2>
              </div>
              <span className={'shrink-0 rounded-full px-3 py-1 text-xs ' + (open.strength === 'strong' ? 'bg-moss/10 text-moss' : 'bg-ember/10 text-ember')}>
                {open.strength === 'strong' ? 'Found' : 'Gap'}
              </span>
            </div>

            <div className="space-y-7">
              <section>
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-ink/35">What we found</p>
                <p className="leading-relaxed text-ink/75">{open.have || 'Nothing established here yet.'}</p>
              </section>
              <section>
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-ember/75">What is missing</p>
                <p className="leading-relaxed text-ink/70">{open.missing || 'The detected signal is present. Strengthen it with evidence.'}</p>
              </section>
              <section className="border-t border-line pt-7">
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-ink/35">Useful evidence</p>
                <p className="leading-relaxed text-ink/70">{open.evidence}</p>
              </section>
              <section className="border-t border-line pt-7">
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-ink/35">Why it connects</p>
                <p className="leading-relaxed text-ink/70">{open.connection}</p>
              </section>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ember">
              Turn it into a draft
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
