import { Link } from 'react-router-dom'

export default function LandingNav() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Pitch
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-ink/60">
          <a href="#method" className="hover:text-ink transition-colors">
            The Method
          </a>
          <a href="#argument-map" className="hover:text-ink transition-colors">
            The Argument Map
          </a>
        </nav>
        <Link
          to="/app"
          className="rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ember transition-colors"
        >
          Open Pitch
        </Link>
      </div>
    </header>
  )
}
