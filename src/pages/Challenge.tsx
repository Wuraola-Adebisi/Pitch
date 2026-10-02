import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

export default function Challenge() {
  const { challenges, map, reset } = usePitch()
  const navigate = useNavigate()
  const critical = challenges.filter((c) => c.severity === 'critical')
  const moderate = challenges.filter((c) => c.severity === 'moderate')
  const targetLabel = (key: string) => map.find((s) => s.key === key)?.label ?? key

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]"><span>05 / Challenge</span><span className="h-px w-8 bg-[#eb4604]" /></div>
        <h1 className="mt-7 font-display text-5xl font-bold leading-[.9] tracking-[-.06em] sm:text-7xl">{challenges.length > 0 ? 'Where does the case get questioned?' : 'Nothing obvious to push on.'}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#99a57d]">{challenges.length > 0 ? 'These are questions generated from the gaps in the current argument. They are prompts for your next revision, not predictions about a real audience.' : 'The current checks did not find an obvious unanswered question. That is not proof that the argument is sound.'}</p>
      </div>

      {challenges.length > 0 && (
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#eb4604]/60 bg-[#eb4604]/[0.07] p-5"><p className="font-mono text-3xl font-bold">{challenges.length}</p><p className="mt-2 text-xs text-[#99a57d]">open questions</p></div>
          <div className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-5"><p className="font-mono text-3xl font-bold">{critical.length}</p><p className="mt-2 text-xs text-[#99a57d]">high-priority gaps</p></div>
          <div className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-5"><p className="font-mono text-3xl font-bold">{moderate.length}</p><p className="mt-2 text-xs text-[#99a57d]">worth tightening</p></div>
        </div>
      )}

      <div className="mt-12 grid gap-3 lg:grid-cols-2">
        {challenges.map((c, i) => (
          <article key={i} className="group rounded-[1.5rem] border border-[#282723] bg-[#1c1b17] p-6 transition-transform hover:-translate-y-0.5 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-[#eb4604]">{String(i + 1).padStart(2, '0')}</span>
              <span className={'rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.1em] ' + (c.severity === 'critical' ? 'bg-[#eb4604]/10 text-[#eb4604]' : 'bg-[#282723] text-[#99a57d]')}>
                {c.severity === 'critical' ? 'High priority' : 'Tighten'}
              </span>
            </div>
            <p className="mt-7 text-xl font-semibold leading-snug">{c.question}</p>
            <div className="mt-7 rounded-xl bg-[#100c0b] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#99a57d]">Presses on</p>
              <p className="mt-2 text-sm text-[#f5f3ee]/75">{targetLabel(c.targets)}</p>
            </div>
            <div className="mt-4 border-t border-[#282723] pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#99a57d]">Useful next move</p>
              <p className="mt-2 text-sm leading-6 text-[#99a57d]">{c.strengthen}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 rounded-2xl border border-[#282723] bg-[#1c1b17] p-5 sm:flex-row sm:items-center sm:p-6">
        <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 text-sm font-medium text-[#99a57d] hover:text-[#f5f3ee]"><ArrowLeft size={14} />Back to draft</button>
        <button type="button" onClick={() => { reset(); navigate('/app') }} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eb4604] px-5 py-3 text-sm font-semibold text-[#f5f3ee] hover:bg-[#f77e0d]"><RotateCcw size={14} />Start another idea <ArrowRight size={14} /></button>
      </div>
    </div>
  )
}
