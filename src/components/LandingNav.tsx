import { Link } from 'react-router-dom'

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-[-0.04em]">
          <span className="flex h-7 w-7 items-center justify-center bg-ink text-[11px] font-bold text-white">P</span>
          Pitch
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-medium text-muted sm:flex">
          <a href="#method" className="transition-colors hover:text-ink">How it works</a>
          <a href="#argument-map" className="transition-colors hover:text-ink">Argument map</a>
        </nav>
        <Link to="/app" className="border border-ink bg-ink px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:border-coral hover:bg-coral">
          Try Pitch
        </Link>
      </div>
    </header>
  )
}
