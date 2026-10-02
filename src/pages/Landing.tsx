import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, CircleHelp, FileText, GitBranch, MessageCircleQuestion } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'
import MapPreview from '../components/MapPreview'

const EXAMPLE = "We're building a tool that helps independent retailers predict what stock they'll need before they reorder."

const steps = [
  { n: '01', title: 'Start rough', body: 'Put the idea down before you start polishing the pitch.' },
  { n: '02', title: 'Read what is there', body: 'Separate what you actually said from what the argument still assumes.' },
  { n: '03', title: 'Trace the case', body: 'See how the problem, audience, solution, proof and ask depend on each other.' },
  { n: '04', title: 'Pressure-test it', body: 'Surface the questions that could interrupt the case before somebody else does.' },
]

const faqs = [
  ['Is this a deck generator?', 'No. Pitch starts with the reasoning underneath the deck. It can produce a structured draft, but unsupported sections remain visible.'],
  ['Does it use an AI model?', 'Not in this MVP. The analysis runs in your browser using a local rule-based engine.'],
  ['What can I put in?', 'A product idea, startup concept, service, project proposal, business case, or anything you need to make a clearer argument for.'],
  ['Does Pitch save my idea?', 'The current idea is stored in your browser so the workflow survives a refresh. There is no account or remote database in this MVP.'],
]

export default function Landing() {
  const [text, setText] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { submit } = usePitch()
  const navigate = useNavigate()

  const go = () => {
    if (!text.trim()) return
    submit(text.trim())
    navigate('/app/diagnosis')
  }

  return (
    <div className="min-h-screen bg-paper">
      <LandingNav />
      <main>
        <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
          <div className="pointer-events-none absolute left-1/2 top-16 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-coral/[0.07] blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <div className="relative mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[.16em] text-muted">
                A workspace for better arguments
              </div>
              <h1 className="mx-auto mt-8 max-w-5xl font-display text-5xl font-bold leading-[.88] tracking-[-.065em] sm:text-7xl lg:text-[7rem]">
                Turn the messy idea into a <span className="text-coral">case.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">
                Pitch helps you inspect an idea, trace its logic, build a grounded draft, and find the questions it still needs to answer.
              </p>
            </div>

            <div className="relative mx-auto mt-14 max-w-5xl">
              <div className="absolute -inset-8 rounded-[3rem] bg-coral/[0.035] blur-2xl" />
              <div className="relative rounded-[2rem] border border-line bg-card p-2 shadow-2xl shadow-black/40">
                <div className="rounded-[1.5rem] border border-line bg-smoky p-5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-xs font-bold text-ink">P</span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[.14em] text-muted">Live workspace</p>
                        <p className="mt-1 text-sm text-ink/50">Start with the version you actually have.</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted">01 / IDEA</span>
                  </div>

                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={7}
                    maxLength={1500}
                    aria-label="Idea to analyse"
                    className="mt-6 w-full resize-none rounded-2xl border border-line bg-card p-5 text-base leading-7 text-ink placeholder:text-ink/25 focus:border-coral focus:outline-none sm:p-6 sm:text-lg"
                  />

                  <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                      Nothing leaves this browser in the MVP
                    </div>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setText(EXAMPLE)} className="text-xs font-medium text-muted underline decoration-line underline-offset-4 hover:text-ink">Use an example</button>
                      <button type="button" onClick={go} disabled={!text.trim()} className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-coral-dark disabled:opacity-30">
                        Analyse idea <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden items-center justify-center gap-2 px-4 pb-2 pt-3 text-[11px] uppercase tracking-[.12em] text-muted sm:flex">
                  <span className="rounded-full bg-line px-3 py-1">Idea</span>
                  <span className="text-line">→</span>
                  <span className="rounded-full bg-line px-3 py-1">Diagnosis</span>
                  <span className="text-line">→</span>
                  <span className="rounded-full bg-coral/15 px-3 py-1 text-coral">Map</span>
                  <span className="text-line">→</span>
                  <span className="rounded-full bg-line px-3 py-1">Draft</span>
                  <span className="text-line">→</span>
                  <span className="rounded-full bg-line px-3 py-1">Challenge</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.n} className="group rounded-2xl border border-line bg-card/75 p-5 transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold tracking-[.14em] text-coral">{step.n}</span>
                    {i === 3 && <span className="h-2 w-2 rounded-full bg-muted" />}
                  </div>
                  <h2 className="mt-7 text-lg font-semibold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="border-y border-line bg-smoky px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Inside Pitch</p>
                <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[.94] tracking-[-.05em] sm:text-6xl">Your argument, made inspectable.</h2>
                <p className="mt-6 max-w-lg leading-7 text-muted">Pitch is deliberately not a button that turns a sentence into a polished-looking presentation. It exposes the reasoning underneath.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [CircleHelp, 'Read', 'Find the audience, problem, promise, differentiation, proof, outcome, timing and ask hiding in the source.'],
                  [GitBranch, 'Trace', 'See which parts depend on each other and where an unsupported link changes the case.'],
                  [FileText, 'Draft', 'Build a structured case while keeping unsupported sections visibly unfinished.'],
                  [MessageCircleQuestion, 'Push back', 'Turn gaps into questions you can answer before the argument meets a real person.'],
                ].map(([Icon, title, body], i) => (
                  <div key={String(title)} className="rounded-2xl border border-line bg-card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-line text-ink"><Icon size={16} /></div>
                      <span className="font-mono text-[11px] text-coral">0{i + 1}</span>
                    </div>
                    <h3 className="mt-7 text-xl font-semibold">{String(title)}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{String(body)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="argument-map" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Argument map</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[.94] tracking-[-.05em] sm:text-6xl">See the chain, not a pile of cards.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted">A missing link should be obvious. Pitch does not quietly fill the hole for you.</p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-line bg-card p-2 shadow-2xl shadow-black/20">
              <MapPreview />
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-smoky px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">A real workflow</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[.94] tracking-[-.05em] sm:text-6xl">Five screens. One argument.</h2>
              <p className="mt-6 max-w-lg leading-7 text-muted">You can move through the whole thing without creating an account, connecting a model, or pretending the rough idea was finished.</p>
              <button type="button" onClick={() => navigate('/app')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-ink hover:bg-coral-dark">
                Enter the workspace <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['01', 'Idea', 'Write the source material.'],
                ['02', 'Diagnosis', 'See what is actually present.'],
                ['03', 'Map', 'Inspect the relationships.'],
                ['04', 'Draft', 'Turn the material into a case.'],
                ['05', 'Challenge', 'Find the unanswered questions.'],
              ].map(([n, title, body]) => (
                <div key={n} className="rounded-2xl border border-line bg-card p-5">
                  <span className="font-mono text-[11px] text-coral">{n}</span>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-line bg-card p-7 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Built for unfinished thinking</p>
                <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[.94] tracking-[-.05em] sm:text-6xl">Bring the messy version.</h2>
                <p className="mt-5 max-w-lg leading-7 text-ink/60">The useful output is not a prettier sentence. It is knowing which sentence needs evidence, which claim is carrying the case, and what someone is likely to question.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {['Claim', 'Assumption', 'Evidence', 'Question'].map((label, i) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-4">
                    <span className={'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ' + (i === 1 || i === 3 ? 'bg-coral/15 text-coral' : 'bg-line text-ink')}>
                      {i === 0 ? 'C' : i === 1 ? 'A' : i === 2 ? 'E' : '?'}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                    <Check size={14} className="ml-auto text-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Questions</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-[-.04em] sm:text-5xl">Before you use it.</h2>
            </div>
            <div className="rounded-2xl border border-line bg-card p-2">
              {faqs.map(([question, answer], i) => (
                <div key={question} className="border-b border-line last:border-b-0">
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-6 rounded-xl px-4 py-5 text-left">
                    <span className="font-semibold">{question}</span>
                    <ChevronDown size={18} className={'shrink-0 text-muted transition-transform ' + (openFaq === i ? 'rotate-180' : '')} />
                  </button>
                  {openFaq === i && <p className="max-w-2xl px-4 pb-5 pr-8 leading-7 text-muted">{answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
