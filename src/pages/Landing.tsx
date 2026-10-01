import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowDown,
  Search,
  GitBranch,
  FileText,
  Swords,
  X,
  Check,
} from 'lucide-react'
import { usePitch } from '../lib/store'
import LandingNav from '../components/LandingNav'
import MapPreview from '../components/MapPreview'
import Footer from '../components/Footer'

const EXAMPLE =
  "I'm building an app that helps small businesses manage their inventory without spreadsheets."

const journey = ['Raw idea', 'Diagnosis', 'Argument map', 'Pitch', 'Challenge']

const method = [
  {
    icon: Search,
    step: '01',
    title: 'Diagnose',
    body: 'Pitch extracts the audience, problem, promise, differentiation, proof, outcome, and ask from what you wrote, and shows what it could and couldn\u2019t find.',
  },
  {
    icon: GitBranch,
    step: '02',
    title: 'Map the argument',
    body: 'Seven stages, from problem to ask. Click any one to see what you have, what is missing, and what evidence would close the gap.',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Build the pitch',
    body: 'A five to seven section pitch, written from the map rather than the raw idea, in the order an audience actually needs to hear it.',
  },
  {
    icon: Swords,
    step: '04',
    title: 'Challenge it',
    body: 'Pitch attacks its own output before anyone else does, with the sharpest objections a skeptical listener would raise first.',
  },
]

export default function Landing() {
  const [text, setText] = useState('')
  const { submit } = usePitch()
  const navigate = useNavigate()

  const go = () => {
    if (!text.trim()) return
    submit(text.trim())
    navigate('/app/diagnosis')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--color-ember) 10%, transparent), transparent 70%)',
            }}
          />
          <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
            <p className="uppercase tracking-[0.2em] text-xs text-ember font-medium mb-5">
              AI pitch strategist
            </p>
            <h1 className="font-display text-4xl sm:text-6xl leading-[1.08] mb-6">
              Most pitches don't fail on delivery.
              <br />
              They fail on argument.
            </h1>
            <p className="text-ink/60 text-lg max-w-xl mx-auto mb-10">
              Pitch reads your idea the way an investor would. It finds where
              the case is strong, where it's thin, and builds the argument
              before it writes a single slide.
            </p>

            <div className="border border-line bg-white/60 shadow-[0_1px_0_0_rgba(23,20,16,0.03)] rounded-2xl p-1 text-left max-w-2xl mx-auto">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={EXAMPLE}
                rows={3}
                className="w-full resize-none bg-transparent p-5 font-display text-lg leading-relaxed placeholder:text-ink/30 focus:outline-none"
              />
              <div className="flex items-center justify-between px-4 pb-3">
                <button
                  onClick={() => setText(EXAMPLE)}
                  className="text-xs text-ink/40 hover:text-ink/70 transition-colors"
                >
                  Use an example
                </button>
                <button
                  onClick={go}
                  disabled={!text.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium disabled:opacity-30 hover:bg-ember transition-colors"
                >
                  Diagnose this pitch
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Journey strip */}
            <div className="mt-10 flex items-center justify-center gap-1.5 overflow-x-auto px-2 text-xs text-ink/45">
              {journey.map((stop, i) => (
                <span key={stop} className="flex items-center gap-1.5 shrink-0">
                  <span className="rounded-full border border-line px-3 py-1">
                    {stop}
                  </span>
                  {i < journey.length - 1 && <ArrowRight size={12} className="text-ink/25" />}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 grid sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-dashed border-ink/20 p-7">
              <div className="h-9 w-9 rounded-full bg-ink/5 text-ink/50 flex items-center justify-center mb-5">
                <X size={16} />
              </div>
              <p className="uppercase tracking-[0.15em] text-xs text-ink/40 mb-3">
                The usual way
              </p>
              <h2 className="font-display text-2xl mb-4">
                A prompt goes in, a deck comes out.
              </h2>
              <p className="text-ink/60 leading-relaxed">
                Most AI pitch tools turn a rough idea straight into slides.
                The writing looks finished. The argument underneath never
                gets checked, so the gaps just get better formatting.
              </p>
            </div>
            <div className="rounded-2xl border border-moss/30 bg-moss/5 p-7">
              <div className="h-9 w-9 rounded-full bg-moss/15 text-moss flex items-center justify-center mb-5">
                <Check size={16} />
              </div>
              <p className="uppercase tracking-[0.15em] text-xs text-ember mb-3">
                What Pitch does instead
              </p>
              <h2 className="font-display text-2xl mb-4">
                The idea gets diagnosed first.
              </h2>
              <p className="text-ink/60 leading-relaxed">
                Before any pitch is written, Pitch checks whether the
                audience is named, the differentiation holds up, and there's
                proof behind the claim. What's missing gets flagged, not
                papered over.
              </p>
            </div>
          </div>
        </section>

        {/* The Method */}
        <section id="method" className="border-t border-line bg-white/30">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="uppercase tracking-[0.15em] text-xs text-ember font-medium mb-3">
              The method
            </p>
            <h2 className="font-display text-3xl sm:text-4xl mb-14 max-w-xl">
              Four passes between your idea and a pitch worth giving.
            </h2>

            <div className="grid sm:grid-cols-4 gap-6">
              {method.map(({ icon: Icon, step, title, body }, i) => (
                <div key={step} className="relative">
                  <div className="rounded-2xl border border-line bg-white/60 p-6 h-full">
                    <div className="h-10 w-10 rounded-full border border-line flex items-center justify-center text-ink/60 mb-5">
                      <Icon size={17} />
                    </div>
                    <p className="text-xs text-ink/40 mb-1">{step}</p>
                    <h3 className="font-display text-lg mb-2">{title}</h3>
                    <p className="text-ink/60 text-sm leading-relaxed">{body}</p>
                  </div>
                  {i < method.length - 1 && (
                    <>
                      <span className="hidden sm:flex absolute top-11 -right-6 h-6 w-6 items-center justify-center text-ink/20">
                        <ArrowRight size={16} />
                      </span>
                      <span className="sm:hidden flex justify-center py-3 text-ink/20">
                        <ArrowDown size={16} />
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Argument Map preview */}
        <section id="argument-map" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="uppercase tracking-[0.15em] text-xs text-ember font-medium mb-3">
              The Argument Map
            </p>
            <h2 className="font-display text-3xl sm:text-4xl mb-4 max-w-xl">
              The reasoning stays visible, not buried in a chat log.
            </h2>
            <p className="text-ink/60 max-w-xl mb-10">
              Every stage of the argument is laid out on its own, with a
              status color showing how strong it is. Click a stage to see
              what you have, what's missing, and what evidence would
              strengthen it.
            </p>
            <MapPreview />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden border-t border-line bg-ink text-paper">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle, color-mix(in srgb, var(--color-paper) 8%, transparent) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl sm:text-4xl mb-5">
              Give it your raw idea.
            </h2>
            <p className="text-paper/60 mb-9 max-w-md mx-auto">
              Two sentences is enough to start. Pitch will tell you what's
              already strong and what still needs to be built.
            </p>
            <button
              onClick={() => navigate('/app')}
              className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 text-sm font-medium hover:bg-ember hover:text-paper transition-colors"
            >
              Diagnose your pitch
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
