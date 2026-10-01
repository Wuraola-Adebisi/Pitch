import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-5 text-xs text-ink/40 sm:flex-row sm:px-6">
          <span>Pitch · Your idea stays in this browser.</span>
          <span className="flex gap-4">
            <Link to="/privacy" className="transition-colors hover:text-ink/70">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-ink/70">Terms</Link>
          </span>
        </div>
      </footer>
    </div>
  )
}
