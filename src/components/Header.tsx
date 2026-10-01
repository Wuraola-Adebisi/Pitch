import { Link, useLocation } from 'react-router-dom'

const steps = [
  { path: '/app', label: 'Idea' },
  { path: '/app/diagnosis', label: 'Diagnosis' },
  { path: '/app/map', label: 'Argument Map' },
  { path: '/app/pitch', label: 'Pitch' },
  { path: '/app/challenge', label: 'Challenge' },
]

export default function Header() {
  const { pathname } = useLocation()
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Pitch
        </Link>
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          {steps.map((s, i) => {
            const active = pathname === s.path
            return (
              <span key={s.path} className="flex items-center">
                <Link
                  to={s.path}
                  className={
                    'px-3 py-1.5 rounded-full transition-colors ' +
                    (active
                      ? 'bg-ink text-paper'
                      : 'text-ink/60 hover:text-ink')
                  }
                >
                  {s.label}
                </Link>
                {i < steps.length - 1 && (
                  <span className="text-ink/20 px-0.5">/</span>
                )}
              </span>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
