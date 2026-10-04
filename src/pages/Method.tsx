import { Link } from 'react-router-dom'
import { ArrowRight, CircleHelp, FileText, GitBranch, MessageCircleQuestion } from 'lucide-react'

const parts = [
  ['01', 'Read', CircleHelp, 'Pitch Arena first reads the source material for the pieces an argument usually needs: audience, problem, promise, differentiation, proof, outcome, timing and ask.'],
  ['02', 'Trace', GitBranch, 'Those pieces are not independent cards. Pitch Arena treats them as a chain and makes the weak links visible.'],
  ['03', 'Draft', FileText, 'The draft is assembled from what you actually supplied. Missing proof stays open so you know what still needs support.'],
  ['04', 'Challenge', MessageCircleQuestion, 'The final pass turns gaps into pressure questions: what might someone ask, and which part of the case does that question attack?'],
]

export default function Method() {
  return (
    <div className="min-h-screen bg-paper px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-muted hover:text-ink">← Back to Pitch Arena</Link>
        <div className="mt-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">The method</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[.92] tracking-[-.055em] sm:text-7xl">Pitch Arena makes the reasoning visible.</h1>
          <p className="mt-7 text-lg leading-8 text-muted">The product is built around a simple idea: a stronger pitch is not necessarily a more polished paragraph. It is an argument whose claims, assumptions and evidence can be inspected.</p>
        </div>
        <div className="mt-16 grid gap-3 sm:grid-cols-2">
          {parts.map(([number, title, Icon, body]) => (
            <article key={String(number)} className="rounded-2xl border border-line bg-card p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-coral">{String(number)}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-line"><Icon size={16} /></div>
              </div>
              <h2 className="mt-8 text-2xl font-semibold">{String(title)}</h2>
              <p className="mt-3 leading-7 text-muted">{String(body)}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 rounded-[2rem] border border-line bg-smoky p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">The rule</p>
          <p className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">If the source does not establish it, Pitch Arena does not pretend that it does.</p>
          <Link to="/app" className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-ink hover:bg-coral-dark">Try Pitch Arena <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}
