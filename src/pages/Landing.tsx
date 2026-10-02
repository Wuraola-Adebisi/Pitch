import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, CircleHelp, FileText, GitBranch, MessageCircleQuestion } from 'lucide-react'
import { usePitch } from '../lib/usePitch'
import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'
import MapPreview from '../components/MapPreview'

const EXAMPLE = "We're building a tool that helps independent retailers predict what stock they'll need before they reorder."

const steps = [
  { n: '01', title: 'Put it on the table', body: 'Start with the rough version. No deck, no polished language, no performance.' },
  { n: '02', title: 'Pull it apart', body: 'See which claims are established, which are assumptions, and which need evidence.' },
  { n: '03', title: 'Connect the case', body: 'Follow the logic from problem to solution instead of treating each point as a separate box.' },
  { n: '04', title: 'Push back', body: 'Find the questions that could make someone hesitate, object, or ask for proof.' },
]

const faqs = [
  ['Is this a deck generator?', 'No. Pitch starts with the argument. It can produce a structured draft, but unsupported sections remain visible.'],
  ['Does it send my idea to an AI model?', 'Not in this MVP. Analysis happens in your browser and the current idea is stored locally on your device.'],
  ['What should I put in?', 'A product idea, startup concept, project proposal, service, or business case. A few honest sentences are enough.'],
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
        <section className="overflow-hidden border-b border-line px-5 py-14 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-coral">
                  <span className="h-2.5 w-2.5 rounded-full bg-coral" />A workspace for the argument
                </div>
                <h1 className="mt-8 max-w-5xl font-display text-6xl font-bold leading-[.88] tracking-[-.065em] sm:text-8xl lg:text-[7.3rem]">
                  What are you<br /><span className="text-coral">actually saying?</span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                  Pitch takes a rough idea apart, traces the logic underneath it, and shows you where the case is strong, assumed, or unfinished.
                </p>
                <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
                  <span>Argument first</span><span className="text-muted">Local-first MVP</span><span className="text-muted">No fake AI</span>
                </div>
              </div>

              <div className="relative lg:pb-2">
                <div className="absolute -left-8 -top-8 hidden h-16 w-16 border-l border-t border-coral lg:block" />
                <div className="border-2 border-ink bg-card">
                  <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3.5">
                    <span className="text-xs font-semibold uppercase tracking-[.15em]">Put the rough version here</span>
                    <span className="font-mono text-[10px] text-muted">01</span>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={EXAMPLE}
                    rows={8}
                    maxLength={1500}
                    aria-label="Idea to analyse"
                    className="w-full resize-none bg-card p-5 text-base leading-7 placeholder:text-ink/25 focus:outline-none sm:p-6"
                  />
                  <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
                    <button type="button" onClick={() => setText(EXAMPLE)} className="text-xs font-medium text-muted underline decoration-line underline-offset-4 hover:text-ink">Use an example</button>
                    <button type="button" onClick={go} disabled={!text.trim()} className="inline-flex items-center gap-2 bg-coral px-4 py-2.5 text-sm font-semibold text-card transition-colors hover:bg-coral-dark disabled:opacity-30">
                      Pull it apart <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>Runs in your browser</span><span>Nothing to configure</span>
                </div>
              </div>
            </div>

            <div className="mt-20 grid border-y border-line sm:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.n} className={'py-6 sm:px-6 sm:py-7 ' + (i > 0 ? 'border-t border-line sm:border-l sm:border-t-0' : '')}>
                  <p className="font-mono text-[10px] font-semibold tracking-[.14em] text-coral">{step.n}</p>
                  <h2 className="mt-6 text-lg font-semibold tracking-[-.02em]">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-coral">The method</p>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-[.94] tracking-[-.05em] sm:text-6xl">Good arguments have a shape.</h2>
              <p className="mt-6 max-w-md text-base leading-7 text-muted">
                Pitch makes that shape visible. It is less interested in making an idea sound impressive than in making its logic inspectable.
              </p>
              <button onClick={() => navigate('/app')} className="mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-sm font-semibold hover:border-coral hover:text-coral">
                Put an idea through it <ArrowRight size={15} />
              </button>
            </div>

            <div className="border-t-2 border-ink">
              {[
                [CircleHelp, 'Read', 'Find the audience, problem, promise, differentiation, proof, outcome, timing and ask hiding in the rough copy.'],
                [GitBranch, 'Trace', 'Follow the relationships between those pieces. A weak link should interrupt the chain, not disappear inside a card.'],
                [FileText, 'Draft', 'Turn the material into a structured case. Claims you did not establish stay marked as unfinished.'],
                [MessageCircleQuestion, 'Push back', 'Surface questions the current argument does not answer cleanly.'],
              ].map(([Icon, title, body], i) => (
                <div key={String(title)} className="grid gap-5 border-b border-line py-7 sm:grid-cols-[48px_150px_1fr] sm:items-start sm:gap-7">
                  <div className="flex h-10 w-10 items-center justify-center border border-ink bg-card"><Icon size={17} /></div>
                  <div className="flex items-center gap-3"><span className="font-mono text-[10px] text-coral">0{i + 1}</span><h3 className="font-semibold">{String(title)}</h3></div>
                  <p className="max-w-xl text-sm leading-6 text-muted">{String(body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="argument-map" className="border-y border-ink px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-coral">The useful bit</p>
                <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[.94] tracking-[-.05em] sm:text-6xl">See where the argument breaks.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted">The map follows the logic from problem to ask. Missing pieces stay visible instead of being quietly filled in.</p>
            </div>
            <MapPreview />
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 border-y border-line py-12 sm:py-16 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-coral">Start here</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[.94] tracking-[-.05em] sm:text-6xl">Bring the messy version.</h2>
              <p className="mt-5 max-w-xl leading-7 text-muted">You do not need the perfect wording. You need enough of an idea to find out what the argument is missing.</p>
            </div>
            <button onClick={() => navigate('/app')} className="inline-flex w-fit items-center gap-2 bg-coral px-6 py-3.5 text-sm font-semibold text-card hover:bg-coral-dark">
              Start with an idea <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.16em] text-coral">Questions</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.04em] sm:text-5xl">Before you use it.</h2></div>
            <div className="border-t-2 border-ink">
              {faqs.map(([question, answer], i) => (
                <div key={question} className="border-b border-line">
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                    <span className="font-semibold">{question}</span>
                    <ChevronDown size={18} className={'shrink-0 transition-transform ' + (openFaq === i ? 'rotate-180' : '')} />
                  </button>
                  {openFaq === i && <p className="max-w-2xl pb-5 pr-8 leading-7 text-muted">{answer}</p>}
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
