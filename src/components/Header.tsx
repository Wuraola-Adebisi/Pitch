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
    <header className="sticky top-0 z-40 border-b border-[#282723] bg-[#100c0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3 font-display text-lg font-bold tracking-[-0.04em]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eb4604] text-[11px] font-bold text-[#f5f3ee]">P</span>
          <span className="hidden sm:inline">Pitch</span>
        </Link>
        <nav className="flex flex-1 justify-center overflow-x-auto" aria-label="Pitch workflow">
          <div className="flex min-w-max items-center gap-1 rounded-full border border-[#282723] bg-[#1c1b17] p-1">
            {steps.map((s, i) => {
              const active = pathname === s.path
              const completed = i < activeIndex
              return (
                <Link
                  key={s.path}
                  to={s.path}
                  aria-current={active ? 'step' : undefined}
                  className={'rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-[13px] ' + (
                    active ? 'bg-[#eb4604] text-[#f5f3ee]' : completed ? 'text-[#f5f3ee]/70 hover:text-[#f5f3ee]' : 'text-[#99a57d] hover:text-[#f5f3ee]'
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
          className="hidden shrink-0 items-center gap-1.5 border border-[#282723] bg-[#1c1b17] px-3 py-2 text-xs font-medium text-[#99a57d] transition-colors hover:border-[#eb4604] hover:text-[#f5f3ee] sm:inline-flex"
        >
          <RotateCcw size={13} /> New
        </button>
      </div>
    </header>
  )
}
