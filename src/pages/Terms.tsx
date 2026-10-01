import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <p className="uppercase tracking-[0.15em] text-xs text-ember font-medium mb-3">
            Legal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl mb-2">Terms of use</h1>
          <p className="text-ink/40 text-sm mb-12">Last updated October 2026</p>

          <div className="space-y-8 text-ink/70 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-ink mb-2">What you're using</h2>
              <p>
                Pitch is an MVP provided for use as a browser-based thinking
                tool. By using it, you acknowledge that the product is still
                under development and that its output may be incomplete.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">The diagnosis is heuristic, not AI</h2>
              <p>
                This version of Pitch runs on a local, rule-based engine rather
                than a remote AI model. The diagnosis, argument map, draft, and
                challenge questions are generated from keyword and sentence
                patterns. Treat the output as a starting point for thinking,
                not as expert advice or a substitute for your own judgment.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">No warranty</h2>
              <p>
                Pitch is provided as is. The analysis can be incomplete,
                inaccurate, or unsuitable for a particular idea. Features may
                change as the MVP develops.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">Ownership of your idea</h2>
              <p>
                Whatever you type into Pitch remains yours. The current MVP
                processes it locally in your browser and does not upload it to a
                server. This does not change any rights you may have in
                material you enter.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">Changes</h2>
              <p>
                These terms may change as the MVP develops. The current version
                has no user accounts, so the latest version of this page is the
                applicable one when you use the product.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
