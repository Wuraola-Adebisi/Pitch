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

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]"><span>Diagnosis</span><span className="h-px w-8 bg-[#eb4604]" /></div>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.94] tracking-[-.055em] sm:text-7xl">What is already here?</h1>
          <p className="mt-6 max-w-2xl leading-7 text-[#99a57d]">Pitch found {foundCount} useful signals. That is not a score. Read the evidence below and decide what is actually established.</p>
        </div>
        <div className="border-2 border-[#282723] bg-[#1c1b17] p-5">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#99a57d]">The original</p>
          <p className="mt-3 text-sm leading-6 text-[#f5f3ee]/70">Your rough idea stays at the centre of the analysis.</p>
          <span className="mt-5 block h-1.5 w-14 bg-[#eb4604]" />
        </div>
      </div>

      <blockquote className="mt-12 max-w-5xl border-l-4 border-[#eb4604] bg-[#1c1b17] px-6 py-5 text-lg leading-8 text-[#f5f3ee]/80 sm:text-xl">{raw}</blockquote>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FIELDS.map((f) => {
          const value = diagnosis[f.key]
          return (
            <div key={f.key} className={'rounded-2xl rounded-2xl border bg-[#1c1b17] p-5 ' + (value ? 'border-[#282723]' : 'border-dashed border-[#eb4604]/45')}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={'flex h-6 w-6 shrink-0 items-center justify-center border ' + (value ? 'border-[#282723] bg-[#f5f3ee] text-[#171614]' : 'border-[#eb4604] text-[#99a57d]')}>
                    {value ? <Check size={13} /> : <X size={13} />}
                  </div>
                  <p className="font-semibold">{f.label}</p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[.12em] text-[#99a57d]">{value ? 'Here' : 'Gap'}</span>
              </div>
              <p className="mt-6 text-sm leading-6 text-[#f5f3ee]/70">{value ?? 'Not established yet. Pitch will not invent this part for you.'}</p>
              <p className="mt-5 border-t border-[#282723] pt-3 text-xs text-[#99a57d]">{f.hint}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#282723] pt-6 sm:flex-row sm:items-center">
        <button type="button" onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-sm font-medium text-[#99a57d] hover:text-[#f5f3ee]"><Pencil size={14} />Change the idea</button>
        <button type="button" onClick={() => navigate('/app/map')} className="inline-flex items-center gap-2 bg-[#eb4604] px-5 py-3 text-sm font-semibold text-[#171614] hover:bg-[#eb4604]-dark">Trace the argument <ArrowRight size={16} /></button>
      </div>
    </div>
  )
}
