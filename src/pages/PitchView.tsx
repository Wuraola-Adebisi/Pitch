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
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-coral"><span>04</span><span className="h-px w-8 bg-coral" />Draft</div>
      <div className="mt-7 grid gap-12 lg:grid-cols-[1fr_280px]">
        <article>
          <div className="flex flex-col justify-between gap-5 border-b border-line pb-8 sm:flex-row sm:items-start">
            <div>
              <h1 className="font-display text-5xl font-bold leading-[.95] tracking-[-.055em] sm:text-7xl">{pitch.title}</h1>
              <p className="mt-5 text-sm text-muted">{grounded} of {pitch.sections.length} sections are grounded in your original idea.</p>
            </div>
            <button type="button" onClick={() => navigate('/app')} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted hover:text-ink"><Pencil size={14} />Edit</button>
          </div>

          <div className="divide-y divide-line border-b border-line">
            {pitch.sections.map((s, i) => (
              <section key={s.heading} className="py-7 sm:py-8">
                <div className="grid gap-3 sm:grid-cols-[48px_1fr_auto] sm:items-baseline sm:gap-5">
                  <span className="text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="text-xl font-semibold">{s.heading}</h2>
                  <span className={'text-[10px] font-semibold uppercase tracking-[.12em] ' + (s.status === 'grounded' ? 'text-ink' : 'text-coral')}>
                    {s.status === 'grounded' ? 'From your idea' : 'Needs input'}
                  </span>
                  <p className="text-base leading-7 text-ink/70 sm:col-start-2 sm:col-span-2">{s.body}</p>
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="h-fit border-t-2 border-ink bg-ink p-6 text-paper lg:sticky lg:top-24">
          <p className="mb-3 text-xs uppercase tracking-[.15em] text-paper/45">Draft controls</p>
          <h2 className="mb-2 text-2xl font-semibold">Good start. Now make it yours.</h2>
          <p className="mb-6 text-sm leading-6 text-paper/55">Copy the structured draft or save a Markdown file. Anything marked “Needs input” is deliberately left open rather than invented.</p>
          <div className="space-y-2">
            <button type="button" onClick={copy} className="inline-flex w-full items-center justify-center gap-2 border border-paper bg-paper px-4 py-3 text-sm font-semibold text-ink hover:bg-mint">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy draft'}</button>
            <button type="button" onClick={download} className="inline-flex w-full items-center justify-center gap-2 border border-paper/20 px-4 py-3 text-sm font-medium hover:bg-paper/10"><Download size={15} />Save as Markdown</button>
            <button type="button" onClick={() => navigate('/app/challenge')} className="inline-flex w-full items-center justify-center gap-2 border border-paper/20 px-4 py-3 text-sm font-medium hover:bg-paper/10"><Swords size={15} />Pressure-test it <ArrowRight size={14} /></button>
          </div>
        </aside>
      </div>
    </div>
  )
}
