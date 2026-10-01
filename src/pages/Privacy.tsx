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
                Pitch is a browser-based MVP. This policy explains what happens
                to the idea you type in, in plain terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">What Pitch does with your idea</h2>
              <p>
                The diagnosis, argument map, pitch, and challenge questions are
                generated entirely in your browser. Nothing you type is sent to
                a server or stored in a database. Your current idea is saved in
                your browser's local storage so it survives a refresh. It can
                be removed with the New button in the app.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">No accounts, no tracking</h2>
              <p>
                Pitch does not require an account and does not send the text of
                your idea to an analytics or AI service. The app currently does
                not use analytics or cross-site tracking.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">If this becomes a larger product</h2>
              <p>
                If the MVP later adds accounts, a server, analytics, or an AI
                provider, this policy will be updated before those features are
                introduced. Until then, avoid entering information that you
                would not want stored in your own browser.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">Questions</h2>
              <p>
                For questions about how the MVP handles data, refer to the
                current implementation and this policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
