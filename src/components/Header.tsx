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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-ink text-xs text-white">P</span>
          Pitch
        </Link>
        <nav className="flex flex-1 justify-center overflow-x-auto" aria-label="Pitch workflow">
          <div className="flex min-w-max items-center gap-1 rounded-full border border-line bg-white/55 p-1 shadow-sm backdrop-blur">
            {steps.map((s, i) => {
              const active = pathname === s.path
              const completed = i < activeIndex
              return (
                <Link
                  key={s.path}
                  to={s.path}
                  aria-current={active ? 'step' : undefined}
                  className={
                    'rounded-full px-3 py-1.5 text-xs transition sm:px-3.5 sm:text-sm ' +
                    (active
                      ? 'bg-ink font-semibold text-white shadow-sm'
                      : completed
                        ? 'text-ink/65 hover:bg-mint/60'
                        : 'text-ink/35 hover:bg-ink/5 hover:text-ink')
                  }
                >
                  {s.label}
                </Link>
              )
            })}
          </div>
        </nav>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Start a new idea? Your current pitch will be cleared.')) reset()
          }}
          className="hidden shrink-0 items-center gap-1.5 rounded-full border border-line bg-white/50 px-3 py-2 text-xs text-muted transition hover:border-ink/20 hover:text-ink sm:inline-flex"
        >
          <RotateCcw size={13} />
          New
        </button>
      </div>
    </header>
  )
}
