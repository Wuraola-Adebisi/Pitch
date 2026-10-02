import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import type { SectionKey } from '../lib/engine'

const styles: Record<string, { card: string; dot: string; label: string }> = {
  strong: { card: 'border-[#282723] bg-[#1c1b17]', dot: 'bg-[#99a57d]', label: 'established' },
  partial: { card: 'border-[#eb4604]/60 bg-[#eb4604]/[0.07]', dot: 'bg-[#eb4604]', label: 'partial' },
  weak: { card: 'border-dashed border-[#eb4604]/45 bg-[#100c0b]', dot: 'bg-[#eb4604]/45', label: 'missing' },
}

export default function ArgumentMap() {
  const { map, diagnosis } = usePitch()
  const navigate = useNavigate()
  const [openKey, setOpenKey] = useState<SectionKey | null>(map[0]?.key ?? null)
  if (map.length === 0 || !diagnosis) return <Navigate to="/app" replace />

  const open = map.find((s) => s.key === openKey) ?? map[0]
  const openIndex = map.findIndex((s) => s.key === open.key)
  const gaps = map.filter((s) => s.strength === 'weak').length

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]"><span>03 / Argument map</span><span className="h-px w-8 bg-[#eb4604]" /></div>
        <h1 className="mt-7 font-display text-5xl font-bold leading-[.9] tracking-[-.06em] sm:text-7xl">See what depends on what.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#99a57d]">The map turns the source into a chain. Click through it. Missing links are not hidden inside a polished draft.</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
        <div className="rounded-[1.5rem] border border-[#282723] bg-[#100c0b] p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4 px-1">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#99a57d]">Argument chain</p>
              <p className="mt-1 text-xs text-[#99a57d]/70">{gaps ? gaps + ' missing link' + (gaps === 1 ? '' : 's') : 'No detected gaps'}</p>
            </div>
            <span className="rounded-full border border-[#282723] px-3 py-1.5 font-mono text-[10px] text-[#99a57d]">7 nodes</span>
          </div>

          <div className="space-y-2">
            {map.map((s, i) => {
              const style = styles[s.strength]
              const active = open.key === s.key
              return (
                <div key={s.key}>
                  <button type="button" onClick={() => setOpenKey(s.key)} className={'group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ' + style.card + (active ? ' ring-2 ring-[#eb4604] ring-offset-2 ring-offset-[#100c0b]' : '')}>
                    <span className={'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ' + (active ? 'bg-[#eb4604] text-[#f5f3ee]' : 'bg-[#282723] text-[#99a57d]')}>{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{s.label}</span>
                        <span className="rounded-full bg-[#282723] px-2 py-1 text-[9px] uppercase tracking-[.1em] text-[#99a57d]">{style.label}</span>
                      </div>
                      <p className="mt-1 truncate text-xs text-[#99a57d]">{s.have || s.missing}</p>
                    </div>
                    <ArrowRight size={15} className="shrink-0 text-[#99a57d] transition-transform group-hover:translate-x-1" />
                  </button>
                  {i < map.length - 1 && <div className="flex h-7 items-center justify-center"><ArrowDown size={14} className="text-[#282723]" /></div>}
                </div>
              )
            })}
          </div>
        </div>

        <aside className="overflow-hidden rounded-[1.5rem] border border-[#282723] bg-[#1c1b17] lg:sticky lg:top-24">
          <div className="border-b border-[#282723] bg-[#100c0b] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#99a57d]">Node {String(openIndex + 1).padStart(2, '0')}</p>
            <h2 className="mt-2 text-2xl font-semibold">{open.label}</h2>
          </div>
          <div className="space-y-0">
            <section className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">What Pitch found</p>
              <p className="mt-2 text-sm leading-6 text-[#f5f3ee]/80">{open.have || 'Nothing established here yet.'}</p>
            </section>
            <section className="border-y border-[#282723] bg-[#282723]/45 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#eb4604]">What is open</p>
              <p className="mt-2 text-sm leading-6 text-[#f5f3ee]/75">{open.missing || 'The signal is present. Strengthen it with concrete evidence.'}</p>
            </section>
            <section className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">Evidence to look for</p>
              <p className="mt-2 text-sm leading-6 text-[#f5f3ee]/75">{open.evidence}</p>
            </section>
            <section className="border-t border-[#282723] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">Why it connects</p>
              <p className="mt-2 text-sm leading-6 text-[#f5f3ee]/75">{open.connection}</p>
            </section>
          </div>
          <div className="border-t border-[#282723] p-5">
            <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#eb4604] px-4 py-3 text-sm font-semibold text-[#f5f3ee] hover:bg-[#f77e0d]">Build the draft <ArrowRight size={15} /></button>
          </div>
        </aside>
      </div>
    </div>
  )
}
