import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate & Advertising Disclosure | Roam and Retire',
  description:
    'FTC compliance and commercial disclosure for Roam and Retire. Details on affiliate relationships, commissions, and editorial independence.',
  openGraph: {
    title: 'Affiliate & Advertising Disclosure | Roam and Retire',
    description:
      'Transparency statement regarding how Roam and Retire generates revenue through affiliate links without compromising editorial ranking data.',
    type: 'article',
    url: 'https://www.roamandretire.com/disclosure',
  },
};

export default function DisclosurePage() {
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
            Consumer Transparency &amp; FTC Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Affiliate &amp; Commercial Disclosure
          </h1>
          <p className="text-xs text-slate-500">
            Effective Date: November 20, 2026 &bull; Last Updated: November 2026
          </p>
        </div>

        {/* Section 1: Plain-Language Summary */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900">Plain-Language Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Roam and Retire is an independently funded research index. To maintain the site, update our datasets, and keep access completely free to readers without intrusive display ads, paywalls, or sponsored destination rankings, we participate in affiliate marketing programs.
          </p>
          <p className="text-xs leading-relaxed text-slate-600">
            When you click on certain outbound links across our destination profiles, comparisons, or articles and subsequently purchase a product or sign up for a service, Roam and Retire may earn a referral fee or commission from the merchant. <strong>This occurs at absolutely no additional cost to you.</strong>
          </p>
        </section>

        {/* Section 2: Strict Editorial Firewall */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">1. Strict Editorial Independence &amp; Scoring Firewall</h2>
          <p>
            Our core mission is to provide uncompromised, quantitative relocation data. To protect the integrity of our 200-City Relocation Index, we adhere to the following non-negotiable standards:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
            <li>
              <strong>No Paid Placements or Boosted Ranks:</strong> Municipalities, tourism bureaus, property developers, and relocation agencies cannot pay to be included in our index or to elevate a destination&apos;s rank.
            </li>
            <li>
              <strong>Objective Scoring:</strong> Every 0–100 score (Healthcare, Safety, Climate, Visa Friendliness, etc.) is calculated using our uniform methodology based on public data sources, crowdsourced benchmarks, and verified guide estimates. An affiliate partnership never alters a city&apos;s score.
            </li>
            <li>
              <strong>Unbiased Budget Data:</strong> All monthly living cost estimates are calculated from independent crowdsourced metrics (Numbeo) or documented guide estimates. International health insurance is explicitly excluded across all cities, and housing costs reflect citywide averages rather than premium expat marketing claims.
            </li>
          </ul>
        </section>

        {/* Section 3: Active Affiliate Verticals */}
        <section className="space-y-4 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">2. Categories of Affiliate Relationships</h2>
          <p>
            You may encounter outbound referral links across the following specialized expat and slow-travel service areas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-1.5">
              <span className="font-bold text-slate-900 block">Expat &amp; Travel Health Insurance (IPMI)</span>
              <p className="text-slate-600">
                Because headline living costs exclude medical insurance, we link to insurance built for long stays abroad. Our current partner in this category is SafetyWing (Nomad Insurance and Nomad Insurance Complete); if you buy through our links we may earn a commission at no extra cost to you. Other providers mentioned in our guides (such as Cigna Global or Allianz Care) are editorial mentions only, not affiliate partners, unless listed below.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-1.5">
              <span className="font-bold text-slate-900 block">Monthly Furnished Rentals</span>
              <p className="text-slate-600">
                We provide outbound links to verified mid-term rental platforms (such as Flatio or Booking.com) pre-filtered to prominent expat neighborhoods to assist in scouting 30-to-90-day stays.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-1.5">
              <span className="font-bold text-slate-900 block">Cross-Border Banking &amp; Foreign Exchange</span>
              <p className="text-slate-600">
                Links to international money transfer services and multi-currency account providers (such as Wise or OFX) to help travelers minimize currency conversion spreads and international wire fees.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-1.5">
              <span className="font-bold text-slate-900 block">Language Learning Platforms</span>
              <p className="text-slate-600">
                When a destination features moderate or low English proficiency, we may suggest structured language learning tools (such as Babbel or Preply) to assist with local integration.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-1.5 md:col-span-2">
              <span className="font-bold text-slate-900 block">Digital Security &amp; VPN Services</span>
              <p className="text-slate-600">
                To safeguard financial logins and personal data on unsecured public Wi-Fi networks abroad, we may recommend established virtual private network providers (such as NordVPN or Surfshark).
              </p>
            </div>
          </div>

          <p>
            <strong>Current affiliate partners (November 2026):</strong> SafetyWing — travel medical and long-term health insurance for nomads and long-stay travellers. This list is updated whenever a partnership is added or ends.
          </p>
        </section>

        {/* Section 4: Reader Responsibility */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">3. Independent Due Diligence</h2>
          <p>
            While we only highlight services we believe offer legitimate value to international slow-travelers and retirees, we do not operate, underwrite, or control these third-party companies.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            You are solely responsible for reviewing the terms, pricing, cancellation policies, insurance coverage terms, and background qualifications of any third-party provider prior to executing an agreement, booking accommodation, or buying an insurance policy.
          </p>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-bold text-slate-900">4. Contact &amp; Questions</h2>
          <p>
            If you have questions regarding our affiliate relationships, want to report a broken referral link, or seek further clarification on our commercial practices, please contact:
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
            <a href="/terms" className="hover:text-slate-800">Terms of Use</a>
            <a href="/disclosure" className="text-teal-700 font-semibold">FTC Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
}