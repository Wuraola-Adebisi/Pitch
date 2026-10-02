import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw, Target } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

export default function Challenge() {
  const { challenges, map, reset } = usePitch()
  const navigate = useNavigate()
  const critical = challenges.filter((c) => c.severity === 'critical')
  const moderate = challenges.filter((c) => c.severity === 'moderate')
  const targetLabel = (key: string) => map.find((s) => s.key === key)?.label ?? key

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]"><span>Challenge</span><span className="h-px w-8 bg-[#eb4604]" /></div>
      <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.94] tracking-[-.055em] sm:text-7xl">{challenges.length > 0 ? 'Where could someone push back?' : 'Nothing obvious to push on.'}</h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-[#99a57d]">{challenges.length > 0 ? 'These are pressure points in the current argument. They are useful questions to answer before you make the case, not a prediction of what someone will say.' : 'The current checks did not find an obvious unanswered question. That is not proof that the argument is sound.'}</p>

      {challenges.length > 0 && (
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          <div className="border-2 border-[#eb4604] bg-[#282723] p-6">
            <p className="font-mono text-4xl font-bold">{critical.length}</p>
            <p className="mt-2 text-sm text-[#99a57d]">questions that attack the case</p>
          </div>
          <div className="border-2 border-[#282723] bg-[#1c1b17] p-6">
            <p className="font-mono text-4xl font-bold">{moderate.length}</p>
            <p className="mt-2 text-sm text-[#99a57d]">questions worth tightening</p>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-12">
        {critical.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-[#99a57d]">Pressure points</h2>
            <div className="border-t-2 border-[#282723]">
              {critical.map((c, i) => (
                <article key={i} className="border-b border-[#282723] py-7">
                  <div className="grid gap-5 sm:grid-cols-[48px_1fr_180px] sm:gap-6">
                    <span className="font-mono text-[10px] text-[#99a57d]">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.13em] text-[#99a57d]">Someone could ask</p>
                      <p className="text-xl font-semibold leading-snug">{c.question}</p>
                    </div>
                    <div className="border-l border-[#282723] pl-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#99a57d]">Attacks</p>
                      <p className="mt-2 text-sm leading-5 text-[#99a57d]">{targetLabel(c.targets)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {moderate.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-[#99a57d]">Worth tightening</h2>
            <div className="border-t border-[#282723]">
              {moderate.map((c, i) => (
                <article key={i} className="border-b border-[#282723] py-7">
                  <div className="grid gap-5 sm:grid-cols-[48px_1fr_180px] sm:gap-6">
                    <Target size={15} className="mt-1 text-[#99a57d]" />
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.13em] text-[#99a57d]">Question</p>
                      <p className="text-lg leading-snug text-[#f5f3ee]/80">{c.question}</p>
                    </div>
                    <div className="border-l border-[#282723] pl-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#99a57d]">Attacks</p>
                      <p className="mt-2 text-sm leading-5 text-[#99a57d]">{targetLabel(c.targets)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#282723] pt-6 sm:flex-row">
        <button type="button" onClick={() => navigate('/app/pitch')} className="inline-flex items-center gap-2 text-sm font-medium text-[#99a57d] hover:text-[#f5f3ee]"><ArrowLeft size={14} />Back to draft</button>
        <button type="button" onClick={() => { reset(); navigate('/app') }} className="inline-flex items-center gap-2 bg-[#eb4604] px-5 py-3 text-sm font-semibold text-[#171614] hover:bg-[#eb4604]-dark"><RotateCcw size={14} />Start another idea <ArrowRight size={14} /></button>
      </div>
    </div>
  )
}