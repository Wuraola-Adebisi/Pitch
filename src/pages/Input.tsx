import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { usePitch } from '../lib/store'

const EXAMPLE = "I'm building an app that helps small businesses manage their inventory without spreadsheets."

const STARTERS = [
  'A marketplace that helps independent African fashion brands sell internationally.',
  'A tool for agencies to turn client feedback into structured design decisions.',
  'A service that helps busy parents plan affordable weekly meals.',
]

export default function Input() {
  const { raw, submit } = usePitch()
  const [text, setText] = useState(raw)
  const navigate = useNavigate()

  useEffect(() => setText(raw), [raw])

  const go = () => {
    const clean = text.trim()
    if (!clean) return
    submit(clean)
    navigate('/app/diagnosis')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="max-w-3xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-ember">01</span>
          <span className="h-px w-10 bg-line" />
          <span className="text-xs text-ink/40">Start with the idea</span>
        </div>

        <h1 className="mb-5 font-display text-4xl leading-[1.03] sm:text-6xl">
          What are you trying to make someone believe?
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
          Write the pitch as it exists in your head. Two or three sentences is enough.
          Don't polish it first. The rough edges are useful.
        </p>
      </div>

      <div className="mt-10">
        <div className="rounded-2xl border border-line bg-white/50 p-1.5 shadow-[0_14px_45px_-28px_rgba(23,20,16,0.35)]">
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') go()
            }}
            placeholder={EXAMPLE}
            rows={8}
            maxLength={1500}
            aria-label="Your pitch"
            className="w-full resize-none bg-transparent p-5 font-display text-xl leading-relaxed placeholder:text-ink/25 focus:outline-none sm:p-7 sm:text-2xl"
          />
          <div className="flex flex-col justify-between gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:px-5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink/40">
              <button type="button" onClick={() => setText(EXAMPLE)} className="transition-colors hover:text-ink">
                Use an example
              </button>
              <span>·</span>
              <span>{text.length}/1500</span>
              <span>·</span>
              <span>Ctrl/⌘ + Enter</span>
            </div>
            <button
              type="button"
              onClick={go}
              disabled={!text.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ember disabled:opacity-30"
            >
              <Sparkles size={15} />
              Diagnose idea
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-ink/35">Need a starting point?</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => setText(starter)}
                className="rounded-xl border border-line bg-white/30 p-4 text-left text-sm text-ink/65 transition-colors hover:border-ink/25 hover:bg-white/60"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-ink/35">
          Local MVP: your idea is analysed in the browser and saved locally so you can move between steps without losing it.
        </p>
      </div>
    </div>
  )
}
