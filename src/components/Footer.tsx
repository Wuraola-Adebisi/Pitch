import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#282723] bg-[#100c0b]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3 font-display text-xl font-bold tracking-[-.04em]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eb4604] text-xs text-[#f5f3ee]">P</span>
              Pitch
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#99a57d]">A thinking workspace for turning rough ideas into clearer, more defensible arguments.</p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#282723] bg-[#1c1b17] px-3.5 py-2 text-[11px] text-[#99a57d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#99a57d]" />
              Local-first MVP
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">Product</p>
            <ul className="mt-5 space-y-3 text-sm text-[#99a57d]">
              <li><Link to="/app" className="hover:text-[#f5f3ee]">Workspace</Link></li>
              <li><Link to="/app/map" className="hover:text-[#f5f3ee]">Argument map</Link></li>
              <li><Link to="/app/pitch" className="hover:text-[#f5f3ee]">Draft</Link></li>
              <li><Link to="/app/challenge" className="hover:text-[#f5f3ee]">Challenge</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-[#99a57d]">
              <li><a href="/#method" className="hover:text-[#f5f3ee]">Inside Pitch</a></li>
              <li><Link to="/about" className="hover:text-[#f5f3ee]">About Pitch</Link></li>
              <li><Link to="/method" className="hover:text-[#f5f3ee]">The method</Link></li>
              <li><a href="/#argument-map" className="hover:text-[#f5f3ee]">See the map</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">Notes</p>
            <ul className="mt-5 space-y-3 text-sm text-[#99a57d]">
              <li><Link to="/privacy" className="hover:text-[#f5f3ee]">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-[#f5f3ee]">Terms</Link></li>
              <li><a href="mailto:hello@pitch.local" className="inline-flex items-center gap-1 hover:text-[#f5f3ee]">Feedback <ArrowUpRight size={13} /></a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-[#282723] bg-[#1c1b17] p-5 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <p className="text-sm font-semibold">Ready to see what your idea is actually saying?</p>
            <p className="mt-1 text-xs leading-5 text-[#99a57d]">Start with the rough version. You can change it later.</p>
          </div>
          <Link to="/app" className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#eb4604] px-5 py-2.5 text-xs font-semibold text-[#f5f3ee] hover:bg-[#f77e0d] sm:mt-0">
            Open Pitch <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="border-t border-[#282723]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#99a57d] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>Pitch · A small product for clearer thinking.</span>
          <span>No account · No remote AI · Your current idea stays in your browser</span>
        </div>
      </div>
    </footer>
  )
}
