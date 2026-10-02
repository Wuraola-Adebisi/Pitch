import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <p className="uppercase tracking-[0.15em] text-xs text-ember font-medium mb-3">Legal</p>
          <h1 className="font-display text-3xl sm:text-4xl mb-2">Terms of use</h1>
          <p className="text-ink/40 text-sm mb-12">Last updated October 2026</p>

          <div className="space-y-8 text-ink/70 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-ink mb-2">1. What Pitch is</h2>
              <p>
                Pitch is a browser-based MVP for inspecting and strengthening arguments. It is
                provided on an experimental basis and may contain errors, omissions, or features
                that change or stop working.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">2. Your ideas and other content</h2>
              <p>
                You retain whatever rights you already have in ideas, text, documents, or other
                material you enter into Pitch. Using Pitch does not transfer ownership of that
                material to Pitch. You are responsible for making sure you have the right to enter
                any material you submit.
              </p>
              <p className="mt-3">
                Pitch is not a confidentiality service and your submission should not be treated
                as being under an NDA. The current MVP processes idea text in your browser and
                does not upload it to a remote database or AI provider, but browser-local storage
                is not a substitute for a contractual confidentiality arrangement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">3. How the analysis works</h2>
              <p>
                The current MVP uses a local, rule-based engine rather than a remote AI model.
                Its diagnosis, argument map, draft, and challenge questions are generated from
                patterns in the text you provide. Results can be incomplete or wrong and should be
                reviewed by you before you rely on them.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">4. No professional advice</h2>
              <p>
                Pitch does not provide legal, financial, investment, medical, accounting,
                regulatory, or other professional advice. Nothing produced by the product should
                be treated as a substitute for qualified professional advice or independent
                verification.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">5. Acceptable use</h2>
              <p>
                Do not use Pitch to submit material you do not have permission to use, personal
                information you are not authorised to process, malicious code, or content intended
                to facilitate unlawful activity. You are responsible for the content you enter and
                for how you use the results.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">6. Availability and disclaimers</h2>
              <p>
                Pitch is provided on an “as is” and “as available” basis to the extent permitted
                by applicable law. No representation is made that the service will be uninterrupted,
                error-free, secure, or suitable for every purpose. You remain responsible for
                decisions made using the product or its outputs.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">7. Changes</h2>
              <p>
                These terms may be updated as Pitch develops. The latest version published on this
                page applies when you use the product. If the product later introduces accounts,
                remote processing, payments, AI providers, or other material changes, the relevant
                terms and privacy disclosures will be updated to reflect them.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
