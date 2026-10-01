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
                Pitch is a prototype, built to demonstrate a product idea
                rather than to run a live service. By using it, you're
                trying a demo, not entering an agreement for an ongoing
                product.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">The diagnosis is heuristic, not AI</h2>
              <p>
                This version of Pitch runs on a local, rule-based engine
                rather than a real model. The diagnosis, argument map, and
                challenge questions are generated from keyword and sentence
                patterns, not genuine reasoning about your idea. Don't treat
                the output as expert advice, and don't use it as the only
                input into a real pitch, raise, or business decision.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">No warranty</h2>
              <p>
                Pitch is provided as is, with no guarantee that the
                diagnosis is accurate, complete, or suited to your specific
                idea. It's a prototype built to show a concept, not a
                finished product.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">Ownership of your idea</h2>
              <p>
                Whatever you type into Pitch stays yours. Since it never
                leaves your browser, there's nothing for anyone else to
                claim rights over.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">Changes</h2>
              <p>
                These terms may change as the prototype changes. Since
                there are no accounts, there's no notice system beyond this
                page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
