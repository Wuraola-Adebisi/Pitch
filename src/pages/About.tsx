import { Link } from 'react-router-dom'
import { ArrowRight, Eye, ShieldCheck, Workflow } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-paper px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-muted hover:text-ink">← Back to Pitch Arena</Link>
        <div className="mt-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">About Pitch Arena</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[.92] tracking-[-.055em] sm:text-7xl">A workspace for testing the thinking behind an idea.</h1>
          <p className="mt-7 text-lg leading-8 text-muted">Pitch Arena helps you turn a rough idea into a clear, defensible argument before you put it in front of someone. It breaks the idea into the parts that make a case work, shows what is supported, and surfaces what still needs an answer.</p>
        </div>
        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {[
            [Workflow, 'A complete argument', 'Idea → diagnosis → map → draft → challenge.'],
            [Eye, 'See the thinking', 'See the claims, assumptions, evidence and open questions that shape the argument.'],
            [ShieldCheck, 'Private by design', 'Your idea is processed in your browser and kept in your browser storage. You can clear it whenever you want.'],
          ].map(([Icon, title, body]) => (
            <div key={String(title)} className="rounded-2xl border border-line bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-line"><Icon size={16} /></div>
              <h2 className="mt-7 text-xl font-semibold">{String(title)}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{String(body)}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-line bg-smoky p-7">
          <p className="max-w-2xl text-sm leading-7 text-muted">Pitch Arena is built around one job: helping you understand whether an idea has a case behind it, where that case is weak, and what you need to strengthen before you present it.</p>
          <Link to="/app" className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-ink hover:bg-coral-dark">Open Pitch Arena <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}
