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
    <div className="min-h-screen bg-[#171614]">
      <LandingNav />
      <main>
        <section className="overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">
                  <span className="h-2 w-2 rounded-full bg-[#eb4604]" />A workspace for the argument
                </div>
                <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[.92] tracking-[-.055em] sm:text-7xl lg:text-[6.8rem]">
                  What are you <span className="text-[#eb4604]">actually saying?</span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-[#f5f3ee]/70 sm:text-xl">
                  Pitch takes a rough idea apart, traces the logic underneath it, and shows you where the case is strong, assumed, or unfinished.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#282723] bg-[#1c1b17] px-3.5 py-2 text-xs text-[#99a57d]">Argument first</span>
                  <span className="rounded-full border border-[#282723] bg-[#1c1b17] px-3.5 py-2 text-xs text-[#99a57d]">Local-first MVP</span>
                  <span className="rounded-full border border-[#282723] bg-[#1c1b17] px-3.5 py-2 text-xs text-[#99a57d]">No fake AI</span>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-[#1c1b17] p-2 shadow-2xl shadow-black/30">
                <div className="rounded-[1.25rem] border border-[#282723] bg-[#171614] p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#99a57d]">Start with the rough version</p>
                      <p className="mt-1 text-sm text-[#f5f3ee]/50">A few honest sentences is enough.</p>
                    </div>
                    <span className="rounded-full bg-[#282723] px-3 py-1.5 font-mono text-[10px] text-[#99a57d]">01</span>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={EXAMPLE}
                    rows={8}
                    maxLength={1500}
                    aria-label="Idea to analyse"
                    className="mt-5 w-full resize-none rounded-2xl border border-[#282723] bg-[#282723]/60 p-5 text-base leading-7 text-[#f5f3ee] placeholder:text-[#f5f3ee]/25 focus:border-[#eb4604] focus:outline-none"
                  />
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <button type="button" onClick={() => setText(EXAMPLE)} className="px-1 text-xs font-medium text-[#99a57d] underline decoration-[#282723] underline-offset-4 hover:text-[#f5f3ee]">Use an example</button>
                    <button type="button" onClick={go} disabled={!text.trim()} className="inline-flex items-center gap-2 rounded-full bg-[#eb4604] px-5 py-3 text-sm font-semibold text-[#f5f3ee] transition-colors hover:bg-[#f77e0d] disabled:opacity-30">
                      Pull it apart <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 pb-2 pt-3 text-[11px] text-[#99a57d]">
                  <span>Runs in your browser</span><span>Nothing to configure</span>
                </div>
              </div>
            </div>

            <div className="mt-20 grid gap-3 sm:grid-cols-4">
              {steps.map((step) => (
                <div key={step.n} className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-5 sm:p-6">
                  <p className="font-mono text-[10px] font-semibold tracking-[.14em] text-[#eb4604]">{step.n}</p>
                  <h2 className="mt-6 text-lg font-semibold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#99a57d]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">The method</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[.96] tracking-[-.045em] sm:text-6xl">Good arguments have a shape.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#f5f3ee]/60">Less interested in making an idea sound impressive. More interested in making its logic inspectable.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                [CircleHelp, 'Read', 'Find the audience, problem, promise, differentiation, proof, outcome, timing and ask hiding in the rough copy.'],
                [GitBranch, 'Trace', 'Follow the relationships between those pieces. A weak link should interrupt the chain, not disappear inside a card.'],
                [FileText, 'Draft', 'Turn the material into a structured case. Claims you did not establish stay marked as unfinished.'],
                [MessageCircleQuestion, 'Push back', 'Surface questions the current argument does not answer cleanly.'],
              ].map(([Icon, title, body], i) => (
                <div key={String(title)} className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#282723] text-[#f5f3ee]"><Icon size={17} /></div>
                    <span className="font-mono text-[10px] text-[#eb4604]">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">{String(title)}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[#99a57d]">{String(body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="argument-map" className="bg-[#100c0b] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">The useful bit</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[.96] tracking-[-.045em] sm:text-6xl">See where the argument breaks.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#99a57d]">Missing pieces stay visible instead of being quietly filled in.</p>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#282723] bg-[#171614] p-2">
              <MapPreview />
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl rounded-[1.5rem] bg-[#1c1b17] p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">Start here</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[.96] tracking-[-.045em] sm:text-6xl">Bring the messy version.</h2>
              <p className="mt-5 max-w-xl leading-7 text-[#f5f3ee]/60">You do not need the perfect wording. You need enough of an idea to find out what the argument is missing.</p>
            </div>
            <button onClick={() => navigate('/app')} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#eb4604] px-6 py-3.5 text-sm font-semibold text-[#f5f3ee] hover:bg-[#f77e0d] lg:mt-0">
              Start with an idea <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#99a57d]">Questions</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.04em] sm:text-5xl">Before you use it.</h2></div>
            <div className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-2">
              {faqs.map(([question, answer], i) => (
                <div key={question} className="border-b border-[#282723] last:border-b-0">
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-6 rounded-xl px-4 py-5 text-left">
                    <span className="font-semibold">{question}</span>
                    <ChevronDown size={18} className={'shrink-0 text-[#99a57d] transition-transform ' + (openFaq === i ? 'rotate-180' : '')} />
                  </button>
                  {openFaq === i && <p className="max-w-2xl px-4 pb-5 pr-8 leading-7 text-[#99a57d]">{answer}</p>}
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
