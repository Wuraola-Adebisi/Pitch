import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import type { SectionKey } from '../lib/engine'

const strengthStyle: Record<string, string> = {
  strong: 'border-[#282723] bg-[#1c1b17]',
  partial: 'border-[#eb4604] bg-[#282723]',
  weak: 'border-dashed border-[#282723]/30 bg-[#171614]',
}
const strengthDot: Record<string, string> = { strong: 'bg-[#f5f3ee]', partial: 'bg-[#eb4604]', weak: 'bg-[#eb4604]/35' }

export default function ArgumentMap() {
  const { map, diagnosis } = usePitch()
  const navigate = useNavigate()
  const [openKey, setOpenKey] = useState<SectionKey | null>(map[0]?.key ?? null)
  if (map.length === 0 || !diagnosis) return <Navigate to="/app" replace />

  const open = map.find((s) => s.key === openKey) ?? map[0]
  const strong = map.filter((s) => s.strength === 'strong').length
  const partial = map.filter((s) => s.strength === 'partial').length
  const weak = map.filter((s) => s.strength === 'weak').length

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]"><span>Argument map</span><span className="h-px w-8 bg-[#eb4604]" /></div>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.94] tracking-[-.055em] sm:text-7xl">Follow the logic.</h1>
          <p className="mt-6 max-w-2xl leading-7 text-[#99a57d]">The argument moves from problem to ask. A weak link matters because it affects what comes after it.</p>
        </div>
        <div className="flex gap-2 text-xs font-medium">
          <span className="border border-[#282723] bg-[#1c1b17] px-3 py-2">{strong} established</span>
          <span className="border border-[#eb4604] bg-[#282723] px-3 py-2">{partial} partial</span>
          <span className="border border-dashed border-[#282723]/30 px-3 py-2">{weak} missing</span>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-12">
        <div className="relative">
          <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-line sm:block" />
          <div className="space-y-3">
            {map.map((s, i) => (
              <div key={s.key} className="relative sm:pl-12">
                <span className={'absolute left-[17px] top-6 z-10 hidden h-2.5 w-2.5 rounded-full border-2 border-[#171614] sm:block ' + strengthDot[s.strength]} />
                <button
                  type="button"
                  onClick={() => setOpenKey(s.key)}
                  className={'w-full rounded-2xl border p-5 text-left transition-transform hover:-translate-y-0.5 ' + strengthStyle[s.strength] + (open.key === s.key ? ' ring-2 ring-[#eb4604] ring-offset-2 ring-offset-[#171614]' : '')}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] text-[#99a57d]">0{i + 1}</span>
                      <p className="mt-1 text-lg font-semibold">{s.label}</p>
                    </div>
                    <ArrowRight size={16} className="text-[#99a57d]" />
                  </div>
                </button>
                {i < map.length - 1 && <div className="py-1 text-center text-[10px] uppercase tracking-[.14em] text-[#99a57d] sm:text-left sm:pl-2">depends on the link above</div>}
              </div>
            ))}
          </div>
        </div>

        <aside className="border-2 border-[#282723] bg-[#1c1b17] lg:sticky lg:top-24">
          <div className="border-b-2 border-[#282723] px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#99a57d]">Inspecting</p>
            <h2 className="mt-2 text-xl font-semibold">{open.label}</h2>
          </div>
          <div className="divide-y divide-line">
            <section className="p-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">Established</p><p className="text-sm leading-6 text-[#f5f3ee]/75">{open.have || 'Nothing established here yet.'}</p></section>
            <section className="bg-[#282723] p-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">Gap</p><p className="text-sm leading-6 text-[#f5f3ee]/75">{open.missing || 'The signal is present. Strengthen it with evidence.'}</p></section>
            <section className="p-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">Evidence to look for</p><p className="text-sm leading-6 text-[#f5f3ee]/75">{open.evidence}</p></section>
            <section className="p-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">Why it connects</p><p className="text-sm leading-6 text-[#f5f3ee]/75">{open.connection}</p></section>
          </div>
          <div className="border-t-2 border-[#282723] p-5">
            <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex w-full items-center justify-center gap-2 bg-[#eb4604] px-4 py-3 text-sm font-semibold text-[#171614] hover:bg-[#eb4604]-dark">Build the draft <ArrowRight size={15} /></button>
          </div>
        </aside>
      </div>
    </div>
  )
}
