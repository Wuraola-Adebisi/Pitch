import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <p className="uppercase tracking-[0.15em] text-xs text-ember font-medium mb-3">Legal</p>
          <h1 className="font-display text-3xl sm:text-4xl mb-2">Privacy policy</h1>
          <p className="text-ink/40 text-sm mb-12">Last updated October 2026</p>

          <div className="space-y-8 text-ink/70 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-ink mb-2">1. Scope</h2>
              <p>
                This policy describes how the current Pitch MVP handles information when you use
                the website and its browser-based workspace. It reflects the product as it exists
                today and will be updated if the way information is handled changes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">2. Your idea text</h2>
              <p>
                The current MVP processes the idea you enter in your browser. The idea text is not
                sent to an AI provider, analytics service, or Pitch database. The app stores the
                current idea in your browser’s local storage so the workflow can survive a refresh.
                This storage remains on your device and can be cleared through the app’s controls
                or your browser settings.
              </p>
              <p className="mt-3">
                Pitch does not use your submitted idea to train an AI model in this MVP, because no
                remote AI model receives the idea.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">3. Important confidentiality limitation</h2>
              <p>
                Local processing does not make Pitch a confidential-storage service. Your browser,
                device, extensions, operating system, or other software may have their own ways of
                accessing or backing up browser data. Do not treat the product as an NDA, secure
                document vault, or legal confidentiality arrangement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">4. Technical information</h2>
              <p>
                Like most websites, the hosting and delivery infrastructure may process limited
                technical information needed to deliver the site, such as an IP address, request
                information, browser or device information, and security or performance logs.
                Pitch does not currently use this information to identify you through an account
                or build an advertising profile. The exact technical data retained by the hosting
                provider is governed by that provider’s own policies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">5. No account and no current analytics</h2>
              <p>
                The current MVP does not require an account and does not use analytics, advertising
                trackers, or cross-site tracking for the Pitch workspace. If those features are
                introduced, this policy will be updated before or when they are introduced.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">6. Your choices</h2>
              <p>
                You can clear the idea stored by the app using its available reset or clear
                controls. You can also clear Pitch’s local storage through your browser settings.
                You may stop using the service at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">7. Future changes</h2>
              <p>
                If Pitch later adds accounts, remote storage, AI processing, payments, analytics,
                or other material data practices, this policy will be revised to describe what is
                collected, why it is used, where it is processed, and what choices are available.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-2">8. Questions</h2>
              <p>
                For privacy questions, use the contact method provided by the product owner. The
                current MVP does not have an in-product account or support system.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
