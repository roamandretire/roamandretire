import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Roam and Retire',
  description:
    'Terms of Use and legal disclaimers for Roam and Retire. Information on dataset limitations, third-party services, and user responsibilities.',
  openGraph: {
    title: 'Terms of Use | Roam and Retire',
    description:
      'Legal terms, disclaimers, and guidelines governing the use of Roam and Retire relocation indices and data.',
    type: 'article',
    url: 'https://www.roamandretire.com/terms',
  },
};

export default function TermsPage() {
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
            Legal Terms &amp; Conditions
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-500">
            Effective Date: November 20, 2026 &bull; Last Updated: November 2026
          </p>
        </div>

        {/* Section 1: Agreement to Terms */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Roam and Retire (&ldquo;the Website,&rdquo; accessible at{' '}
            <a href="https://www.roamandretire.com" className="text-teal-700 font-medium hover:underline">
              https://www.roamandretire.com
            </a>
            ), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use the Website.
          </p>
        </section>

        {/* Section 2: Informational Purposes Only */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">2. No Professional, Legal, Tax, or Medical Advice</h2>
          <p>
            All content, scores, datasets, tools, comparisons, and guides provided on Roam and Retire are published solely for general informational, educational, and research purposes.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
            <li>
              <strong>No Immigration or Legal Advice:</strong> Visa rules, bilateral tourist stay exemptions, and residency requirements change frequently based on bilateral diplomatic agreements and national immigration policy shifts. Nothing on this website constitutes legal or immigration counsel. Always verify current entry requirements with official consulates, embassies, or qualified immigration attorneys prior to booking travel or relocating.
            </li>
            <li>
              <strong>No Financial or Tax Advice:</strong> Living cost benchmarks, exchange rate estimates, and budget projections do not constitute financial, investment, or international tax advice. Cross-border taxation, tax residency triggers, and double-taxation treaties require individualized consultation with certified cross-border accounting or tax professionals.
            </li>
            <li>
              <strong>No Medical Advice:</strong> Healthcare quality scores and commentary reflect general facility accessibility and public benchmarks; they do not assess specific treatment capabilities or substitute for medical consultation.
            </li>
          </ul>
        </section>

        {/* Section 3: Dataset Accuracy & Limitations */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">3. Dataset Limits &amp; Cost Assumptions</h2>
          <p>
            While we conduct continuous audits and maintain an individual audit date (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">as_of_date</code>) for each destination:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>
              <strong>Insurance Excluded:</strong> All headline monthly living costs completely exclude international health insurance policies, which must be budgeted independently based on personal age, pre-existing conditions, and coverage preferences.
            </li>
            <li>
              <strong>Citywide Average Rents:</strong> Housing figures reflect citywide averages calculated from verified crowdsourced data (Numbeo) or regional guide estimates. Popular expat enclaves may command higher monthly rental rates.
            </li>
            <li>
              <strong>Inflation &amp; Currency Volatility:</strong> Rental rates, grocery prices, and local transit fares fluctuate due to inflation and foreign exchange movements. Published metrics are estimates and do not represent guaranteed fixed rates.
            </li>
          </ul>
        </section>

        {/* Section 4: External Links & Affiliate Disclaimers */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">4. Third-Party Services &amp; Affiliate Links</h2>
          <p>
            The Website contains outbound links to third-party services, including international health insurance carriers, short-term rental platforms, language learning programs, and currency exchange providers.
          </p>
          <p>
            Some of these outbound links are affiliate links, meaning Roam and Retire may earn a commission if you make a purchase or sign up for a service, at no additional cost to you. Roam and Retire does not operate, control, guarantee, or endorse third-party platforms. Any agreements, bookings, or disputes are strictly between you and the respective third-party provider.
          </p>
        </section>

        {/* Section 5: Intellectual Property */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">5. Intellectual Property</h2>
          <p>
            All original website design, compilation structure, 10-category scoring models, editorial summaries, and comparative layout code on Roam and Retire are the property of Roam and Retire and are protected by applicable copyright, database, and intellectual property laws. You may reference or cite our findings for personal, non-commercial purposes with appropriate attribution and a direct link back to the respective destination dossier. Bulk scraping, unauthorized republishing, or commercial syndication of our database without written consent is strictly prohibited.
          </p>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Roam and Retire, its creators, and operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or reliance on any information, scores, visa summaries, or third-party recommendations provided on this Website. All content is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind.
          </p>
        </section>

        {/* Section 7: Contact */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-bold text-slate-900">7. Questions &amp; Corrections</h2>
          <p>
            If you have questions about these Terms of Use or wish to flag inaccurate data, please reach out to:
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
            <a href="/privacy" className="hover:text-slate-800">Privacy Policy</a>
            <a href="/terms" className="text-teal-700 font-semibold">Terms of Use</a>
            <a href="/disclosure" className="hover:text-slate-800">FTC Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
}