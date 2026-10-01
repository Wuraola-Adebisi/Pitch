import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-8 sm:py-16">
        <div>
          <p className="flex items-center gap-2.5 font-display text-lg font-bold tracking-[-.04em]">
            <span className="flex h-7 w-7 items-center justify-center bg-ink text-[11px] text-white">P</span>
            Pitch
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">A thinking tool for turning rough ideas into clearer arguments.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Product</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link to="/#method" className="hover:text-ink">How it works</Link></li>
            <li><Link to="/#argument-map" className="hover:text-ink">Argument map</Link></li>
            <li><Link to="/app" className="hover:text-ink">Try Pitch</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Info</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link to="/privacy" className="hover:text-ink">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-ink">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>Pitch · A small product for clearer thinking.</span>
          <span>Ideas stay in your browser in this MVP.</span>
        </div>
      </div>
    </footer>
  )
}
