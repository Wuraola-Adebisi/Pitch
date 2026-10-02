import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

const EXAMPLE = "I'm building an app that helps small businesses manage their inventory without spreadsheets."

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
      <div className="mb-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">
        <span className="rounded-full bg-[#eb4604] px-2.5 py-1 text-[#f5f3ee]">01</span> Idea
      </div>
      <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div>
          <h1 className="max-w-xl font-display text-5xl font-bold leading-[.96] tracking-[-.055em] sm:text-7xl">Start with the thing you actually have.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#f5f3ee]/65 sm:text-lg">Put the rough idea here. It does not need to sound convincing yet. Pitch will show you what is there, what is missing, and where the argument needs work.</p>
          <div className="mt-8 rounded-2xl bg-[#1c1b17] p-5 text-sm leading-6 text-[#99a57d]">A few sentences is enough. Do not write the polished version.</div>
        </div>

        <div>
          <div className="rounded-[1.5rem] bg-[#1c1b17] p-2">
            <div className="rounded-[1.25rem] border border-[#282723] bg-[#171614] p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#99a57d]">Your idea</p>
                  <p className="mt-1 text-sm text-[#f5f3ee]/45">Write it as you would explain it to someone.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#99a57d]">{text.length}/1500</span>
                  {text && <button type="button" onClick={() => setText('')} className="inline-flex items-center gap-1 text-[10px] text-[#99a57d] hover:text-[#f5f3ee]"><RotateCcw size={11} />Clear</button>}
                </div>
              </div>
              <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') go() }} rows={11} maxLength={1500} aria-label="Your idea" className="mt-5 w-full resize-none rounded-2xl border border-[#282723] bg-[#282723] p-5 text-lg leading-7 text-[#f5f3ee] placeholder:text-[#f5f3ee]/25 focus:border-[#eb4604] focus:outline-none sm:p-7 sm:text-xl" />
              <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <button type="button" onClick={() => setText(EXAMPLE)} className="px-1 text-xs font-medium text-[#99a57d] underline decoration-[#282723] underline-offset-4 hover:text-[#f5f3ee]">Use an example</button>
                <div className="flex items-center gap-4">
                  <span className="hidden text-[10px] uppercase tracking-[.1em] text-[#99a57d]/60 sm:inline">Ctrl / ⌘ + Enter</span>
                  <button type="button" onClick={go} disabled={!text.trim()} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eb4604] px-5 py-3 text-sm font-semibold text-[#f5f3ee] transition-colors hover:bg-[#f77e0d] disabled:opacity-30">Analyse idea <ArrowRight size={16} /></button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-7 text-xs text-[#99a57d]">Your idea is analysed and saved locally in this MVP. It is not sent to an AI service.</p>
        </div>
      </div>
    </div>
  )
}
