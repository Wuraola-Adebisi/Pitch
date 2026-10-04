import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#171614]">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#282723] bg-[#100c0b]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-5 text-xs text-[#99a57d] sm:flex-row sm:px-8">
          <span>Pitch Arena · Your current idea stays in your browser.</span>
          <span className="flex gap-4">
            <Link to="/privacy" className="hover:text-[#f5f3ee]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#f5f3ee]">Terms</Link>
            <Link to="/" className="hover:text-[#f5f3ee]">Exit Pitch Arena</Link>
          </span>
        </div>
      </footer>
    </div>
  )
}
