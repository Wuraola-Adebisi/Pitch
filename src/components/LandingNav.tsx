import { Link } from 'react-router-dom'

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-ink text-sm text-white">P</span>
          Pitch
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted sm:flex">
          <a href="#method" className="transition hover:text-ink">How it works</a>
          <a href="#argument-map" className="transition hover:text-ink">Argument map</a>
        </nav>
        <Link to="/app" className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-coral">
          Try Pitch
        </Link>
      </div>
    </header>
  )
}
