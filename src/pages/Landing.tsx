import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, CircleHelp, FileText, GitBranch, MessageCircleQuestion, Sparkles } from 'lucide-react'
import { usePitch } from '../lib/store'
import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'
import MapPreview from '../components/MapPreview'

const EXAMPLE = "We're building a tool that helps independent retailers predict what stock they'll need before they reorder."

const steps = [
  { n: '01', title: 'Paste the idea', body: 'Drop in the rough version. No deck, no prompt engineering, no polish required.' },
  { n: '02', title: 'Find the gaps', body: 'Pitch pulls out the pieces of the argument and shows which ones are actually present.' },
  { n: '03', title: 'Shape the case', body: 'Turn the useful material into a clear narrative, with unsupported claims left open.' },
  { n: '04', title: 'Pressure-test it', body: 'Answer the uncomfortable questions before they show up in the room.' },
]

const faqs = [
  ['Is this a deck generator?', 'No. The MVP starts with the argument. It can produce a structured pitch draft, but it deliberately leaves unsupported sections open.'],
  ['Does it send my idea to an AI model?', 'Not in this MVP. Analysis happens in your browser and the current idea is stored locally on your device.'],
  ['What should I put in?', 'A rough product idea, startup pitch, project proposal, or business concept. A few honest sentences are enough.'],
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
    <div className="min-h-screen overflow-hidden">
      <LandingNav />

      <main>
        <section className="noise relative px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-20">
          <div className="pointer-events-none absolute -right-24 top-12 h-64 w-64 rounded-full bg-lilac/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 top-48 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  AI-assisted pitch thinking
                </div>

                <h1 className="max-w-3xl font-display text-5xl leading-[.98] tracking-[-.03em] sm:text-7xl">
                  Your idea is not the pitch.
                  <span className="text-coral"> Make the argument.</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                  Pitch helps you turn a rough idea into a case people can follow: what hurts, who cares, why your approach matters, and what still needs proof.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-xs text-muted">
                  <span className="rounded-full bg-mint/70 px-3 py-1.5">No deck required</span>
                  <span className="rounded-full bg-yellow/70 px-3 py-1.5">No prompt engineering</span>
                  <span className="rounded-full bg-lilac/10 px-3 py-1.5">Built for rough ideas</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -right-3 -top-4 z-10 hidden rotate-3 rounded-2xl bg-yellow px-4 py-3 text-xs font-medium shadow-lg sm:block">
                  Start messy.
                </div>
                <div className="soft-shadow rounded-[2rem] border border-white/80 bg-white/75 p-2 backdrop-blur-xl">
                  <div className="rounded-[1.55rem] border border-line bg-card p-5 sm:p-7">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[.16em] text-coral">Start here</p>
                        <p className="mt-1 font-display text-2xl">What's the idea?</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                        <Sparkles size={17} />
                      </div>
                    </div>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={EXAMPLE}
                      rows={7}
                      maxLength={1500}
                      className="w-full resize-none rounded-2xl border border-line bg-paper/70 p-4 text-[15px] leading-6 placeholder:text-ink/30 focus:border-coral focus:outline-none"
                    />
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <button type="button" onClick={() => setText(EXAMPLE)} className="text-xs text-muted hover:text-ink">
                        Try an example
                      </button>
                      <button
                        type="button"
                        onClick={go}
                        disabled={!text.trim()}
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-coral disabled:translate-y-0 disabled:opacity-30"
                      >
                        Analyse idea <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="animate-float absolute -bottom-8 -left-7 hidden w-48 rounded-2xl border border-white bg-ink p-4 text-white shadow-xl sm:block">
                  <div className="mb-3 flex items-center gap-2 text-xs text-white/55">
                    <GitBranch size={13} /> Argument map
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-24 rounded-full bg-mint" />
                    <div className="h-2 w-32 rounded-full bg-white/15" />
                    <div className="h-2 w-20 rounded-full bg-coral" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 grid gap-3 sm:grid-cols-4">
              {steps.map((step) => (
                <div key={step.n} className="rounded-2xl border border-white/80 bg-white/50 p-5 backdrop-blur">
                  <p className="text-xs font-semibold text-coral">{step.n}</p>
                  <h2 className="mt-5 font-display text-xl">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-coral">How it works</p>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-tight sm:text-5xl">
                Less “write me a pitch”. More “let's see if this holds up.”
              </h2>
              <p className="mt-5 max-w-md leading-7 text-muted">
                The MVP is deliberately opinionated: it separates what you said from what you still need to prove.
              </p>
              <button onClick={() => navigate('/app')} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-coral">
                Try Pitch <ArrowRight size={15} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                [CircleHelp, 'Diagnose the idea', 'Find the audience, problem, promise, differentiation, proof, outcome and ask hiding in the rough copy.'],
                [GitBranch, 'Map the argument', 'See how each part connects. A strong solution does not rescue a vague problem.'],
                [FileText, 'Draft the pitch', 'Get a structured narrative from the material you actually supplied. Missing evidence stays visible.'],
                [MessageCircleQuestion, 'Challenge the case', 'Surface the questions your current argument cannot answer yet.'],
              ].map(([Icon, title, body], i) => (
                <div key={String(title)} className="group rounded-[1.5rem] border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-lg sm:p-7">
                  <div className="flex gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-paper text-ink transition group-hover:bg-coral group-hover:text-white">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-ink/30">0{i + 1}</span>
                        <h3 className="font-display text-2xl">{String(title)}</h3>
                      </div>
                      <p className="mt-2 max-w-xl leading-7 text-muted">{String(body)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-[#f0ece4] px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-coral">See the thinking</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">The argument stays on the page.</h2>
              <p className="mt-4 leading-7 text-muted">
                Instead of hiding the reasoning in a chat transcript, Pitch gives each part of the case a place to stand.
              </p>
            </div>
            <MapPreview />
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-coral text-white shadow-lg">
              <Sparkles size={22} />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Bring the messy version.</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
              You do not need the perfect wording. You need enough of an idea to find out what the argument is missing.
            </p>
            <button onClick={() => navigate('/app')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-coral">
              Start with an idea <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-7 text-center">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-coral">FAQ</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">A few useful answers.</h2>
            </div>
            <div className="overflow-hidden rounded-3xl border border-line bg-card">
              {faqs.map(([question, answer], i) => (
                <div key={question} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
                  >
                    <span className="font-medium">{question}</span>
                    <ChevronDown size={18} className={'shrink-0 transition-transform ' + (openFaq === i ? 'rotate-180' : '')} />
                  </button>
                  {openFaq === i && <p className="px-5 pb-5 leading-7 text-muted sm:px-7">{answer}</p>}
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
