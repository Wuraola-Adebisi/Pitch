import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <p className="uppercase tracking-[0.15em] text-xs text-ember font-medium mb-3">
            Legal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl mb-2">Privacy policy</h1>
          <p className="text-ink/40 text-sm mb-12">Last updated October 2026</p>

          <div className="space-y-8 text-ink/70 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-ink mb-2">What this page covers</h2>
              <p>
                Pitch is a prototype built to show how an AI pitch strategist
                could work. This policy explains what happens to the idea
                you type in, in plain terms, not legal boilerplate.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">What Pitch does with your idea</h2>
              <p>
                The diagnosis, argument map, pitch, and challenge questions
                are generated entirely in your browser. Nothing you type is
                sent to a server, stored in a database, or seen by anyone
                else. Refreshing the page clears it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">No accounts, no tracking</h2>
              <p>
                Pitch does not ask you to sign up, does not use cookies to
                track you across sites, and does not run analytics on what
                you type. There is nothing to opt out of, because nothing is
                collected.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">If this becomes a real product</h2>
              <p>
                A production version of Pitch would need a real policy
                covering account data, storage, and any AI provider used to
                process pitches. This page will be rewritten before that
                happens. Until then, treat Pitch as a demo, not a service
                handling sensitive business information.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">Questions</h2>
              <p>
                This is a portfolio project. Reach out to the builder
                directly with any questions about how it works.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
