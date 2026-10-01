import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Copy, Download, Pencil, Swords } from 'lucide-react'
import { usePitch } from '../lib/store'

export default function PitchView() {
  const { pitch } = usePitch()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  if (!pitch) return <Navigate to="/app" replace />

  const asMarkdown = [
    '# ' + pitch.title,
    '',
    ...pitch.sections.flatMap((section) => ['## ' + section.heading, section.body, '']),
  ].join('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asMarkdown)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-5 flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-ember">04</span>
        <span className="h-px w-10 bg-line" />
        <span className="text-xs text-ink/40">Pitch draft</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <article>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <h1 className="mb-3 font-display text-4xl leading-tight sm:text-5xl">{pitch.title}</h1>
              <p className="text-sm text-ink/45">
                {grounded} of {pitch.sections.length} sections are grounded in your original idea.
              </p>
            </div>
            <button type="button" onClick={() => navigate('/app')} className="inline-flex shrink-0 items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink">
              <Pencil size={14} />
              Edit idea
            </button>
          </div>

          <div className="space-y-4">
            {pitch.sections.map((s, i) => (
              <section key={s.heading} className="rounded-2xl border border-line bg-white/40 p-6 sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-ink/30">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="font-display text-xl">{s.heading}</h2>
                  </div>
                  <span className={'text-[10px] uppercase tracking-[0.12em] ' + (s.status === 'grounded' ? 'text-moss' : 'text-ember')}>
                    {s.status === 'grounded' ? 'From your idea' : 'Needs input'}
                  </span>
                </div>
                <p className="leading-relaxed text-ink/75">{s.body}</p>
              </section>
            ))}
          </div>
        </article>

        <aside className="h-fit rounded-2xl border border-line bg-ink p-6 text-paper lg:sticky lg:top-24">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-paper/45">Draft controls</p>
          <h2 className="mb-2 font-display text-2xl">Take it with you.</h2>
          <p className="mb-6 text-sm leading-relaxed text-paper/55">
            Copy the structured draft or save a Markdown file. Anything marked “Needs input” is deliberately left open rather than invented.
          </p>

          <div className="space-y-2">
            <button type="button" onClick={copy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-ember hover:text-paper">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied' : 'Copy Markdown'}
            </button>
            <button type="button" onClick={download} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-paper/20 px-4 py-3 text-sm font-medium transition-colors hover:bg-paper/10">
              <Download size={15} />
              Download .md
            </button>
            <button type="button" onClick={() => navigate('/app/challenge')} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-paper/20 px-4 py-3 text-sm font-medium transition-colors hover:bg-paper/10">
              <Swords size={15} />
              Stress-test it
              <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
