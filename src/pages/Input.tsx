import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

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

  const go = () => {
    const clean = text.trim()
    if (!clean) return
    submit(clean)
    navigate('/app/diagnosis')
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-coral">
            <span>01</span><span className="h-px w-8 bg-coral" />Idea
          </div>
          <h1 className="mt-7 max-w-xl font-display text-5xl font-bold leading-[.96] tracking-[-.055em] sm:text-7xl">
            Start with the thing you actually have.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted sm:text-lg">
            Put the rough idea here. It does not need to sound convincing yet. Pitch will show you what is there, what is missing, and where the argument needs work.
          </p>
          <div className="mt-8 border-l-2 border-coral pl-4 text-sm leading-6 text-muted">
            A few sentences is enough. Do not write the polished version.
          </div>
        </div>

        <div>
          <div className="border border-ink bg-card">
            <div className="border-b border-line px-5 py-3.5 text-xs font-semibold uppercase tracking-[.15em] text-muted">Your idea</div>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') go() }}
              placeholder={EXAMPLE}
              rows={11}
              maxLength={1500}
              aria-label="Your idea"
              className="w-full resize-none bg-card p-5 text-lg leading-7 placeholder:text-ink/25 focus:outline-none sm:p-7 sm:text-xl"
            />
            <div className="flex flex-col justify-between gap-4 border-t border-line px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <button type="button" onClick={() => setText(EXAMPLE)} className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">Use an example</button>
                <span>{text.length}/1500</span><span>Ctrl/⌘ + Enter</span>
              </div>
              <button type="button" onClick={go} disabled={!text.trim()} className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-coral hover:bg-coral disabled:opacity-30">
                Analyse idea <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.15em] text-muted">Or start here</p>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {STARTERS.map((starter) => (
                <button key={starter} type="button" onClick={() => setText(starter)} className="bg-paper p-4 text-left text-sm leading-6 text-ink/70 transition-colors hover:bg-card hover:text-ink">
                  {starter}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-7 text-xs text-muted">Your idea is analysed and saved locally in this MVP. It is not sent to an AI service.</p>
        </div>
      </div>
    </div>
  )
}
