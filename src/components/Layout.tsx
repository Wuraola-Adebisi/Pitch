import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line py-6">
        <div className="mx-auto max-w-5xl px-6 text-xs text-ink/40 flex flex-col sm:flex-row gap-2 justify-between">
          <span>Pitch. An argument diagnostician, not a copywriter.</span>
          <span className="flex gap-4">
            <Link to="/privacy" className="hover:text-ink/70 transition-colors">
              Privacy policy
            </Link>
            <Link to="/terms" className="hover:text-ink/70 transition-colors">
              Terms of use
            </Link>
          </span>
        </div>
      </footer>
    </div>
  )
}
