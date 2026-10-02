import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Copy, Download, Pencil, Swords } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

export default function PitchView() {
  const { pitch } = usePitch()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  if (!pitch) return <Navigate to="/app" replace />

  const asMarkdown = ['# ' + pitch.title, '', ...pitch.sections.flatMap((section) => ['## ' + section.heading, section.body, ''])].join('\n')
  const copy = async () => {
    try { await navigator.clipboard.writeText(asMarkdown); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }
  const download = () => {
    const blob = new Blob([asMarkdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'pitch-draft.md'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const grounded = pitch.sections.filter((s) => s.status === 'grounded').length
  const open = pitch.sections.length - grounded

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]"><span>04 / Draft</span><span className="h-px w-8 bg-[#eb4604]" /></div>

      <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
        <article>
          <div className="rounded-[1.5rem] border border-[#282723] bg-[#1c1b17] p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#99a57d]">Working draft</p>
                <p className="mt-2 text-xs text-[#99a57d]/70">{grounded} grounded · {open} still open</p>
              </div>
              <button type="button" onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-xs font-medium text-[#99a57d] hover:text-[#f5f3ee]"><Pencil size={13} />Edit source</button>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-4xl font-bold leading-[.92] tracking-[-.055em] sm:text-6xl">{pitch.title}</h1>
          </div>

          <div className="mt-3 space-y-3">
            {pitch.sections.map((s, i) => (
              <section key={s.heading} className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#eb4604]">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="text-xl font-semibold">{s.heading}</h2>
                  </div>
                  <span className={'rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.11em] ' + (s.status === 'grounded' ? 'bg-[#282723] text-[#99a57d]' : 'bg-[#eb4604]/10 text-[#eb4604]')}>
                    {s.status === 'grounded' ? 'Grounded' : 'Needs input'}
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#f5f3ee]/78">{s.body}</p>
                {s.status !== 'grounded' && <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#100c0b] p-4 text-xs leading-5 text-[#99a57d]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#eb4604]" />This section is a prompt, not a fabricated claim.</div>}
              </section>
            ))}
          </div>
        </article>

        <aside className="h-fit overflow-hidden rounded-[1.5rem] border border-[#282723] bg-[#1c1b17] lg:sticky lg:top-24">
          <div className="bg-[#100c0b] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#99a57d]">Take it somewhere</p>
            <h2 className="mt-2 text-xl font-semibold">Use this as the working version.</h2>
          </div>
          <div className="space-y-2 p-5">
            <button type="button" onClick={copy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#eb4604] px-4 py-3 text-sm font-semibold text-[#f5f3ee] hover:bg-[#f77e0d]">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied to clipboard' : 'Copy draft'}</button>
            <button type="button" onClick={download} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#282723] px-4 py-3 text-sm font-medium hover:border-[#99a57d]"><Download size={15} />Save as Markdown</button>
            <button type="button" onClick={() => navigate('/app/challenge')} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#282723] px-4 py-3 text-sm font-medium hover:border-[#eb4604]"><Swords size={15} />Pressure-test it <ArrowRight size={14} /></button>
          </div>
          <div className="border-t border-[#282723] p-5">
            <p className="text-xs leading-5 text-[#99a57d]">The draft preserves what the source established. Open sections tell you what still needs your input.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
