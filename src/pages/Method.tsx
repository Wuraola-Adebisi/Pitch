import { Link } from 'react-router-dom'
import { ArrowRight, CircleHelp, FileText, GitBranch, MessageCircleQuestion } from 'lucide-react'

const parts = [
  ['01', 'Read', CircleHelp, 'Pitch first reads the source material for the pieces an argument usually needs: audience, problem, promise, differentiation, proof, outcome, timing and ask.'],
  ['02', 'Trace', GitBranch, 'Those pieces are not independent cards. Pitch treats them as a chain and makes the weak links visible.'],
  ['03', 'Draft', FileText, 'The draft is assembled from what you actually supplied. Missing proof is marked as missing instead of being fabricated.'],
  ['04', 'Challenge', MessageCircleQuestion, 'The final pass turns gaps into pressure questions: what might someone ask, and which part of the case does that question attack?'],
]

export default function Method() {
  return (
    <div className="min-h-screen bg-[#171614] px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-[#99a57d] hover:text-[#f5f3ee]">← Back to Pitch</Link>
        <div className="mt-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">The method</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[.92] tracking-[-.055em] sm:text-7xl">Pitch makes the reasoning visible.</h1>
          <p className="mt-7 text-lg leading-8 text-[#99a57d]">The product is built around a simple idea: a stronger pitch is not necessarily a more polished paragraph. It is an argument whose claims, assumptions and evidence can be inspected.</p>
        </div>
        <div className="mt-16 grid gap-3 sm:grid-cols-2">
          {parts.map(([number, title, Icon, body]) => (
            <article key={String(number)} className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#eb4604]">{String(number)}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282723]"><Icon size={16} /></div>
              </div>
              <h2 className="mt-8 text-2xl font-semibold">{String(title)}</h2>
              <p className="mt-3 leading-7 text-[#99a57d]">{String(body)}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 rounded-[2rem] border border-[#282723] bg-[#100c0b] p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">The rule</p>
          <p className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">If the source does not establish it, Pitch does not pretend that it does.</p>
          <Link to="/app" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#eb4604] px-5 py-3 text-sm font-semibold text-[#f5f3ee] hover:bg-[#f77e0d]">Try the workflow <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}
