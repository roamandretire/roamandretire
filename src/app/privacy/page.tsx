import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Roam and Retire',
  description:
    'Privacy Policy for Roam and Retire. Details on data collection, email subscriptions, analytics, and affiliate tracking.',
  openGraph: {
    title: 'Privacy Policy | Roam and Retire',
    description:
      'Information on how Roam and Retire handles analytics, email list signups, and outbound partner links.',
    type: 'article',
    url: 'https://www.roamandretire.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Roam and Retire" className="h-12 w-auto" />
          </a>

          <a href="/" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
            &larr; Back to 200 Index
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
            Legal &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Effective Date: November 20, 2026 &bull; Last Updated: November 2026
          </p>
        </div>

        {/* Section 1: Overview */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">1. Overview</h2>
          <p>
            Roam and Retire (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates{' '}
            <a href="https://www.roamandretire.com" className="text-teal-700 font-medium hover:underline">
              https://www.roamandretire.com
            </a>
            . We respect your privacy and believe in minimal data footprint design. We do not require account registration, do not process user passwords, and do not sell, rent, or trade your personal information to data brokers or advertising exchanges.
          </p>
        </section>

        {/* Section 2: Information Collected */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">2. Information We Collect</h2>
          <p>We collect limited information only in the following contexts:</p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
            <li>
              <strong>Voluntary Email Subscriptions:</strong> If you voluntarily subscribe to our monthly visa and living cost change alerts via our email subscription box, we collect your email address. Email distribution is handled by our third-party email provider (Beehiiv). You may unsubscribe at any time via the one-click unsubscribe link included in the footer of every email.
            </li>
            <li>
              <strong>Direct Correspondence:</strong> If you submit feedback, report outdated destination data, or contact us at{' '}
              <a href="mailto:hello@roamandretire.com" className="text-teal-700 font-medium hover:underline">
                hello@roamandretire.com
              </a>
              , we retain your email address and message content solely to investigate the inquiry and update our records.
            </li>
            <li>
              <strong>Standard Web Analytics:</strong> We use basic measurement tools (such as Google Analytics 4) to monitor aggregate traffic patterns (e.g., page views, popular search filters, referral sources, browser types, and approximate geographic region). This data is anonymized and used exclusively to optimize site speed and content structure.
            </li>
          </ul>
        </section>

        {/* Section 3: Cookies & Tracking */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">3. Cookies &amp; Outbound Tracking Links</h2>
          <p>
            Roam and Retire does not drop invasive behavioral profiling cookies or third-party ad network pixels.
          </p>
          <p>
            When you click an outbound link to a third-party partner service (such as international expat health insurance, foreign exchange tools, or monthly furnished rental platforms), the URL may contain a referral tag or sub-identifier (e.g.,{' '}
            <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">subid=chiang-mai-ipmi</code>). This tag informs the destination merchant that the referral originated from Roam and Retire so we may earn an affiliate commission at no extra cost to you.
          </p>
          <p>
            Third-party partner websites maintain their own independent privacy policies, terms, and cookie management practices. We encourage you to review their policies upon landing on their domains.
          </p>
        </section>

        {/* Section 4: Data Retention & Security */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">4. Data Retention &amp; Security</h2>
          <p>
            We retain email addresses only as long as you remain an active subscriber to our updates. If you unsubscribe, your email is permanently suppressed or deleted from our active distribution lists. We employ industry-standard encryption protocols (HTTPS/SSL) across all pages of Roam and Retire to secure data in transit.
          </p>
        </section>

        {/* Section 5: Your Rights */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">5. Your Privacy Rights</h2>
          <p>
            Depending on your jurisdiction (including Canada under PIPEDA, the European Economic Area under GDPR, or the United States), you have the right to request access to, correction of, or deletion of any personal information we hold (specifically your email address).
          </p>
          <p>
            To exercise these rights, simply email{' '}
            <a href="mailto:hello@roamandretire.com" className="text-teal-700 font-medium hover:underline">
              hello@roamandretire.com
            </a>{' '}
            with the subject line &ldquo;Privacy Request.&rdquo;
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-bold text-slate-900">6. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or our data handling practices, contact:
          </p>
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 text-xs space-y-1 text-slate-700">
            <div className="font-bold text-slate-900">Roam and Retire Research Desk</div>
            <div>Email:{' '}
              <a href="mailto:hello@roamandretire.com" className="text-teal-700 font-semibold hover:underline">
                hello@roamandretire.com
              </a>
            </div>
            <div>Website:{' '}
              <a href="https://www.roamandretire.com" className="text-teal-700 font-semibold hover:underline">
                https://www.roamandretire.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Roam and Retire. Verified relocation data.
          </div>
          <div className="flex items-center gap-4">
            <a href="/about" className="hover:text-slate-800">Scoring Methodology</a>
            <a href="/privacy" className="text-teal-700 font-semibold">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-800">Terms of Use</a>
            <a href="/disclosure" className="hover:text-slate-800">FTC Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
}