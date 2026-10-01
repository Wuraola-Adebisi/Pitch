import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePitch } from '../lib/store'

const EXAMPLE =
  "I'm building an app that helps small businesses manage their inventory without spreadsheets."

export default function Input() {
  const [text, setText] = useState('')
  const { submit } = usePitch()
  const navigate = useNavigate()

  const go = () => {
    if (!text.trim()) return
    submit(text.trim())
    navigate('/app/diagnosis')
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="uppercase tracking-[0.2em] text-xs text-ember font-medium mb-4">
        Step one
      </p>
      <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] mb-6">
        Tell us what you're pitching.
      </h1>
      <p className="text-ink/60 mb-10 max-w-xl">
        Write it the way you'd say it out loud. One or two sentences is enough.
        Pitch will read it the way an investor would, before it writes a word
        of the actual deck.
      </p>

      <div className="border border-line bg-white/40 rounded-2xl p-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={EXAMPLE}
          rows={6}
          className="w-full resize-none bg-transparent p-5 font-display text-xl leading-relaxed placeholder:text-ink/30 focus:outline-none"
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <button
            onClick={() => setText(EXAMPLE)}
            className="text-xs text-ink/40 hover:text-ink/70 transition-colors"
          >
            Use an example
          </button>
          <button
            onClick={go}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium disabled:opacity-30 hover:bg-ember transition-colors"
          >
            Diagnose this pitch
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
