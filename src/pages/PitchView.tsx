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
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'pitch-draft.md'; anchor.click(); URL.revokeObjectURL(url)
  }
  const grounded = pitch.sections.filter((s) => s.status === 'grounded').length

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-coral"><span>Draft</span><span className="h-px w-8 bg-coral" /></div>
      <div className="mt-7 grid gap-12 lg:grid-cols-[1fr_300px]">
        <article className="border-t-2 border-ink">
          <div className="flex flex-col justify-between gap-5 border-b border-line py-8 sm:flex-row sm:items-start">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.14em] text-muted">Working draft</p>
              <h1 className="mt-3 font-display text-5xl font-bold leading-[.94] tracking-[-.055em] sm:text-7xl">{pitch.title}</h1>
              <p className="mt-5 text-sm text-muted">{grounded} of {pitch.sections.length} sections are grounded in the original idea.</p>
            </div>
            <button type="button" onClick={() => navigate('/app')} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted hover:text-ink"><Pencil size={14} />Edit source</button>
          </div>

          <div className="divide-y divide-line border-b border-line">
            {pitch.sections.map((s, i) => (
              <section key={s.heading} className="py-8 sm:py-10">
                <div className="grid gap-4 sm:grid-cols-[48px_1fr] sm:gap-5">
                  <span className="font-mono text-[10px] text-coral">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl font-semibold">{s.heading}</h2>
                      <span className={'text-[10px] font-semibold uppercase tracking-[.12em] ' + (s.status === 'grounded' ? 'text-ink' : 'text-coral')}>
                        {s.status === 'grounded' ? 'Established' : 'Needs input'}
                      </span>
                    </div>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{s.body}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="h-fit border-2 border-ink bg-card lg:sticky lg:top-24">
          <div className="border-b-2 border-ink p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-coral">Next move</p>
            <h2 className="mt-2 text-2xl font-semibold">The draft is not the finish line.</h2>
          </div>
          <div className="space-y-2 p-5">
            <button type="button" onClick={copy} className="inline-flex w-full items-center justify-center gap-2 bg-ink px-4 py-3 text-sm font-semibold text-card hover:bg-coral">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy draft'}</button>
            <button type="button" onClick={download} className="inline-flex w-full items-center justify-center gap-2 border border-line px-4 py-3 text-sm font-medium hover:border-ink"><Download size={15} />Save as Markdown</button>
            <button type="button" onClick={() => navigate('/app/challenge')} className="inline-flex w-full items-center justify-center gap-2 border border-line px-4 py-3 text-sm font-medium hover:border-ink"><Swords size={15} />Pressure-test it <ArrowRight size={14} /></button>
          </div>
          <p className="border-t border-line p-5 text-xs leading-5 text-muted">Anything marked “Needs input” is deliberately left open. The tool does not invent proof you did not provide.</p>
        </aside>
      </div>
    </div>
  )
}
