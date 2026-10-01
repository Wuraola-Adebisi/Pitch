import { Link, useLocation } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

const steps = [
  { path: '/app', label: 'Idea' },
  { path: '/app/diagnosis', label: 'Diagnosis' },
  { path: '/app/map', label: 'Map' },
  { path: '/app/pitch', label: 'Draft' },
  { path: '/app/challenge', label: 'Challenge' },
]

export default function Header() {
  const { pathname } = useLocation()
  const { reset } = usePitch()
  const activeIndex = Math.max(0, steps.findIndex((s) => s.path === pathname))

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 font-display text-lg font-bold tracking-[-0.04em]">
          <span className="flex h-7 w-7 items-center justify-center bg-ink text-[11px] font-bold text-white">P</span>
          <span className="hidden sm:inline">Pitch</span>
        </Link>
        <nav className="flex flex-1 justify-center overflow-x-auto" aria-label="Pitch workflow">
          <div className="flex min-w-max items-center gap-0">
            {steps.map((s, i) => {
              const active = pathname === s.path
              const completed = i < activeIndex
              return (
                <Link
                  key={s.path}
                  to={s.path}
                  aria-current={active ? 'step' : undefined}
                  className={'border-b-2 px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-[13px] ' + (
                    active ? 'border-ink text-ink' : completed ? 'border-transparent text-ink/60 hover:text-ink' : 'border-transparent text-ink/30 hover:text-ink'
                  )}
                >
                  {s.label}
                </Link>
              )
            })}
          </div>
        </nav>
        <button
          type="button"
          onClick={() => { if (window.confirm('Start a new idea? Your current pitch will be cleared.')) reset() }}
          className="hidden shrink-0 items-center gap-1.5 border border-line bg-card px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-ink hover:text-ink sm:inline-flex"
        >
          <RotateCcw size={13} /> New
        </button>
      </div>
    </header>
  )
}
