import { Link, useLocation } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import { usePitch } from '../lib/store'

const steps = [
  { path: '/app', label: 'Idea' },
  { path: '/app/diagnosis', label: 'Diagnosis' },
  { path: '/app/map', label: 'Map' },
  { path: '/app/pitch', label: 'Pitch' },
  { path: '/app/challenge', label: 'Challenge' },
]

export default function Header() {
  const { pathname } = useLocation()
  const { reset } = usePitch()
  const activeIndex = Math.max(0, steps.findIndex((s) => s.path === pathname))

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="shrink-0 font-display text-2xl tracking-tight">
          Pitch
        </Link>

        <nav className="flex-1 overflow-x-auto" aria-label="Pitch workflow">
          <div className="flex min-w-max items-center justify-end gap-1 text-xs sm:justify-center sm:text-sm">
            {steps.map((s, i) => {
              const active = pathname === s.path
              const completed = i < activeIndex
              return (
                <span key={s.path} className="flex items-center">
                  <Link
                    to={s.path}
                    aria-current={active ? 'step' : undefined}
                    className={
                      'rounded-full px-2.5 py-1.5 transition-colors sm:px-3 ' +
                      (active
                        ? 'bg-ink text-paper'
                        : completed
                          ? 'text-moss hover:bg-moss/10'
                          : 'text-ink/45 hover:bg-ink/5 hover:text-ink')
                    }
                  >
                    {s.label}
                  </Link>
                  {i < steps.length - 1 && <span className="px-0.5 text-ink/15">/</span>}
                </span>
              )
            })}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Start a new pitch? Your current idea will be cleared.')) reset()
          }}
          className="hidden shrink-0 items-center gap-1.5 text-xs text-ink/40 transition-colors hover:text-ink sm:inline-flex"
        >
          <RotateCcw size={13} />
          New
        </button>
      </div>
    </header>
  )
}
