import { Link } from 'react-router-dom'

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#282723] bg-[#100c0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3 font-display text-lg font-bold tracking-[-0.04em]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eb4604] text-xs font-bold text-[#f5f3ee]">P</span>
          Pitch
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#99a57d] sm:flex">
          <a href="#method" className="transition-colors hover:text-[#f5f3ee]">Inside Pitch Arena Arena</a>
          <a href="#argument-map" className="transition-colors hover:text-[#f5f3ee]">Argument map</a>
          <Link to="/method" className="transition-colors hover:text-[#f5f3ee]">The method</Link>
        </nav>
        <Link to="/app" className="rounded-full bg-[#eb4604] px-5 py-2.5 text-[13px] font-semibold text-[#f5f3ee] transition-colors hover:bg-[#f77e0d]">
          Try Pitch Arena
        </Link>
      </div>
    </header>
  )
}
