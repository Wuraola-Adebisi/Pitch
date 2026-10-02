import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#282723] bg-[#100c0b]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-8 sm:py-18">
        <div>
          <p className="flex items-center gap-3 font-display text-lg font-bold tracking-[-.04em]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eb4604] text-xs text-[#f5f3ee]">P</span>
            Pitch
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#99a57d]">A thinking tool for turning rough ideas into clearer arguments.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">Product</p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#99a57d]">
            <li><Link to="/#method" className="hover:text-[#f5f3ee]">How it works</Link></li>
            <li><Link to="/#argument-map" className="hover:text-[#f5f3ee]">Argument map</Link></li>
            <li><Link to="/app" className="hover:text-[#f5f3ee]">Try Pitch</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">Info</p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#99a57d]">
            <li><Link to="/privacy" className="hover:text-[#f5f3ee]">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-[#f5f3ee]">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#282723]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#99a57d] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>Pitch · A small product for clearer thinking.</span>
          <span>Ideas stay in your browser in this MVP.</span>
        </div>
      </div>
    </footer>
  )
}
