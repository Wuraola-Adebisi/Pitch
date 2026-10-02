import { Link } from 'react-router-dom'
import { ArrowRight, Eye, ShieldCheck, Workflow } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-[#171614] px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-[#99a57d] hover:text-[#f5f3ee]">← Back to Pitch</Link>
        <div className="mt-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">About Pitch</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[.92] tracking-[-.055em] sm:text-7xl">A small tool for thinking before presenting.</h1>
          <p className="mt-7 text-lg leading-8 text-[#99a57d]">Pitch is an intentionally small MVP for people who have an idea but need to understand the argument before they turn it into a deck, proposal, product page or conversation.</p>
        </div>
        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {[
            [Workflow, 'A complete loop', 'Idea → diagnosis → map → draft → challenge.'],
            [Eye, 'Useful without theatre', 'The current MVP uses local rules instead of pretending a remote model is doing work it is not doing.'],
            [ShieldCheck, 'Local by default', 'There is no account or backend in the MVP. Your current idea stays in browser storage.'],
          ].map(([Icon, title, body]) => (
            <div key={String(title)} className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282723]"><Icon size={16} /></div>
              <h2 className="mt-7 text-xl font-semibold">{String(title)}</h2>
              <p className="mt-3 text-sm leading-6 text-[#99a57d]">{String(body)}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-[#282723] bg-[#100c0b] p-7">
          <p className="max-w-2xl text-sm leading-7 text-[#99a57d]">Pitch is still an MVP. The point is to make the reasoning loop useful first, then add richer evidence, revision and collaboration features around it.</p>
          <Link to="/app" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#eb4604] px-5 py-3 text-sm font-semibold text-[#f5f3ee] hover:bg-[#f77e0d]">Open Pitch <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}
