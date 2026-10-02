import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import ConfirmResetDialog from './ConfirmResetDialog'

const steps = [
  { path: '/app', label: 'Idea' },
  { path: '/app/diagnosis', label: 'Diagnosis' },
  { path: '/app/map', label: 'Map' },
  { path: '/app/pitch', label: 'Draft' },
  { path: '/app/challenge', label: 'Challenge' },
]

export default function Header() {
  const { pathname } = useLocation()
  const { reset, raw, diagnosis, pitch } = usePitch()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const activeIndex = Math.max(0, steps.findIndex((s) => s.path === pathname))

  const copyDraft = async () => {
    if (!pitch) return
    const text = [pitch.title, ...pitch.sections.map((s) => s.heading + '\n' + s.body)].join('\n\n')
    await navigator.clipboard?.writeText(text)
    setConfirmOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-smoky/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3.5 sm:gap-5 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3 font-display text-lg font-bold tracking-[-0.04em]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-[11px] font-bold text-ink">P</span><span className="hidden sm:inline">Pitch</span></Link>
          <nav className="flex min-w-0 flex-1 justify-start overflow-x-auto" aria-label="Pitch workflow">
            <div className="mx-auto flex min-w-max items-center gap-1 rounded-full border border-line bg-card p-1">
              {steps.map((s, i) => {
                const active = pathname === s.path
                const completed = i < activeIndex
                const available = i === 0 || Boolean(raw && diagnosis)
                return <Link key={s.path} to={available ? s.path : '/app'} aria-current={active ? 'step' : undefined} aria-disabled={!available} tabIndex={available ? undefined : -1} className={'rounded-full px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:py-2.5 sm:text-[13px] ' + (active ? 'bg-coral text-ink' : completed ? 'text-ink/70 hover:text-ink' : available ? 'text-muted hover:text-ink' : 'text-muted/40')}>{s.label}</Link>
              })}
            </div>
          </nav>
          <button type="button" onClick={() => setConfirmOpen(true)} className="inline-flex shrink-0 items-center gap-1.5 border border-line bg-card px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-coral hover:text-ink"><RotateCcw size={13} /><span className="hidden sm:inline">New</span></button>
        </div>
      </header>
      <ConfirmResetDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => { reset(); setConfirmOpen(false); }} onCopy={copyDraft} hasDraft={Boolean(pitch)} />
    </>
  )
}