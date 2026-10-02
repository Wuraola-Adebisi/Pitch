import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import type { SectionKey } from '../lib/engine'
import AddToPitch from '../components/AddToPitch'

const styles: Record<string, { card: string; dot: string; label: string }> = {
  strong: { card: 'border-line bg-card', dot: 'bg-muted', label: 'established' },
  partial: { card: 'border-coral/60 bg-coral/[0.07]', dot: 'bg-coral', label: 'partial' },
  weak: { card: 'border-dashed border-coral/45 bg-smoky', dot: 'bg-coral/45', label: 'missing' },
}

export default function ArgumentMap() {
  const { map, diagnosis } = usePitch()
  const navigate = useNavigate()
  const firstWeak = map.find((s) => s.strength !== 'strong')?.key ?? map[0]?.key ?? null
  const [openKey, setOpenKey] = useState<SectionKey | null>(firstWeak)
  if (map.length === 0 || !diagnosis) return <Navigate to="/app" replace />

  const open = map.find((s) => s.key === openKey) ?? map[0]
  const openIndex = map.findIndex((s) => s.key === open.key)
  const gaps = map.filter((s) => s.strength !== 'strong').length

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-muted"><span>Argument map</span><span className="h-px w-8 bg-coral" /></div>
        <h1 className="mt-7 font-display text-5xl font-bold leading-[.9] tracking-[-.05em] sm:text-7xl">See what depends on what.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted">The map turns the source into a chain. Click through it. Weak links stay visible instead of being hidden inside a polished draft.</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
        <div className="rounded-[1.5rem] border border-line bg-smoky p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4 px-1">
            <div><p className="text-xs font-semibold uppercase tracking-[.15em] text-muted">Argument chain</p><p className="mt-1 text-xs text-muted/70">{gaps ? gaps + ' open link' + (gaps === 1 ? '' : 's') : 'All links established'}</p></div>
            <span className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted">7 nodes</span>
          </div>

          <div className="space-y-2">
            {map.map((s, i) => {
              const style = styles[s.strength]
              const active = open.key === s.key
              const next = map[i + 1]
              const connected = s.strength === 'strong' && next?.strength === 'strong'
              return (
                <div key={s.key}>
                  <button type="button" onClick={() => setOpenKey(s.key)} className={'group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ' + style.card + (active ? ' ring-2 ring-coral ring-offset-2 ring-offset-smoky' : '')}>
                    <span className={'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ' + (active ? 'bg-coral text-ink' : 'bg-line text-muted')}>{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><span className="font-semibold">{s.label}</span><span className="rounded-full bg-line px-2 py-1 text-[11px] uppercase tracking-[.08em] text-muted">{style.label}</span></div>
                      <p className="mt-1 truncate text-xs text-muted">{s.have || s.missing}</p>
                    </div>
                    <ArrowRight size={15} className="shrink-0 text-muted" />
                  </button>
                  {next && <div className="flex h-7 items-center justify-center"><div className={'h-5 border-l-2 ' + (connected ? 'border-muted' : 'border-dashed border-coral/60')}><ArrowDown size={12} className={'-ml-[7px] mt-1 ' + (connected ? 'text-muted' : 'text-coral')} /></div></div>}
                </div>
              )
            })}
          </div>
        </div>

        <aside className="overflow-hidden rounded-[1.5rem] border border-line bg-card lg:sticky lg:top-24">
          <div className="border-b border-line bg-smoky p-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Node {String(openIndex + 1).padStart(2, '0')}</p><h2 className="mt-2 font-display text-2xl font-semibold">{open.label}</h2></div>
          <div className="space-y-0">
            <section className="p-5"><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted">What Pitch found</p><p className="mt-2 text-sm leading-6 text-ink/80">{open.have || 'Nothing established here yet.'}</p></section>
            <section className="border-y border-line bg-line/45 p-5"><p className="text-xs font-semibold uppercase tracking-[.14em] text-coral">What is open</p><p className="mt-2 text-sm leading-6 text-ink/75">{open.missing || 'The signal is present. Strengthen it with concrete evidence.'}</p></section>
            <section className="p-5"><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted">Evidence to look for</p><p className="mt-2 text-sm leading-6 text-ink/75">{open.evidence}</p></section>
            <section className="border-t border-line p-5"><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted">Why it connects</p><p className="mt-2 text-sm leading-6 text-ink/75">{open.connection}</p></section>
          </div>
          {(open.strength !== 'strong' || open.missing) && <div className="border-t border-line p-5"><AddToPitch prompt={'Strengthen ' + open.label.toLowerCase() + ' with one concrete sentence.'} /></div>}
          <div className="border-t border-line p-5"><button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-4 py-3 text-sm font-semibold text-ink hover:bg-coral-dark">Build the draft <ArrowRight size={15} /></button></div>
        </aside>
      </div>
    </div>
  )
}