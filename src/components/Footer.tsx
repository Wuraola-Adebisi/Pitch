import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white/30">
      <div className="mx-auto max-w-6xl px-6 py-14 grid sm:grid-cols-[1.4fr_1fr_1fr] gap-10">
        <div>
          <p className="font-display text-xl mb-3">Pitch</p>
          <p className="text-ink/50 text-sm max-w-xs leading-relaxed">
            An argument diagnostician, not a copywriter. Pitch checks the
            case before it writes the deck.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-ink/40 mb-4">
            Product
          </p>
          <ul className="space-y-2.5 text-sm text-ink/60">
            <li>
              <Link to="/#method" className="hover:text-ink transition-colors">
                The Method
              </Link>
            </li>
            <li>
              <Link to="/#argument-map" className="hover:text-ink transition-colors">
                The Argument Map
              </Link>
            </li>
            <li>
              <Link to="/app" className="hover:text-ink transition-colors">
                Open Pitch
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-ink/40 mb-4">
            Legal
          </p>
          <ul className="space-y-2.5 text-sm text-ink/60">
            <li>
              <Link to="/privacy" className="hover:text-ink transition-colors">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-ink transition-colors">
                Terms of use
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-ink/40 flex flex-col sm:flex-row gap-2 justify-between">
          <span>&copy; {new Date().getFullYear()} Pitch. Prototype, built as a portfolio piece.</span>
          <span>Mock reasoning engine, no data leaves your browser.</span>
        </div>
      </div>
    </footer>
  )
}
