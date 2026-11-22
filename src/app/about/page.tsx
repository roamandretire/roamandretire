import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Index Methodology & Scoring System | Roam and Retire',
  description:
    'How Roam and Retire calculates living costs, healthcare ratings, visa friendliness, and livability scores across 200 global destinations.',
  openGraph: {
    title: 'Index Methodology & Scoring System | Roam and Retire',
    description:
      'Detailed methodology for the Roam and Retire 200-City Relocation Index: cost bases, 10-score axes, and data auditing criteria.',
    type: 'article',
    url: 'https://www.roamandretire.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 font-black flex items-center justify-center text-sm">
              R
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Roam <span className="text-teal-600">&amp;</span> Retire
            </span>
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
            Data Governance &amp; Research Standards
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Index Methodology &amp; Scoring Criteria
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Roam and Retire is an independent, quantitative relocation and slow-travel index evaluating 200 international destinations across cost, healthcare, safety, climate, and legal stay parameters.
          </p>
        </div>

        {/* Section 1: Core Mission */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">1. Purpose &amp; Editorial Independence</h2>
          <p>
            The Roam and Retire Index was built to solve a single problem: international relocation decisions are frequently distorted by vague travel blogs, sponsored influencer reels, and uncalibrated cost estimates. We provide single retirees, early retirees, and extended slow-travelers with structured, comparable data to evaluate international destinations objectively.
          </p>
          <p>
            Our index operates as an independent research project. We do not accept sponsored placements, paid rankings, or promotional listings from tourism boards, real estate developers, or municipal agencies. All destinations are scored according to uniform benchmarks.
          </p>
        </section>

        {/* Section 2: Cost Calculation */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">2. Monthly Cost Methodology (USD)</h2>
          <p>
            The headline monthly cost reflects estimated baseline living expenses for a single person. Note that <strong>comprehensive international health insurance is completely excluded</strong> from this headline figure and must be budgeted separately.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Rent Basis:</strong> Built from Numbeo data by combining single-person monthly costs excluding rent with the average of Numbeo&apos;s city-centre and outside-centre one-bedroom rents—representing a citywide average rather than expat-neighbourhood pricing. The expat neighbourhoods listed on each city page are areas where expats commonly live, and actual rents there can run higher than the citywide average.</li>
            <li><strong>Groceries &amp; Dining:</strong> A balanced mix of local fresh markets, quality regional dining, and select imported grocery staples based on citywide cost data.</li>
            <li><strong>Routine Healthcare:</strong> Covers out-of-pocket routine primary care and basic pharmacy needs only. International health insurance is not included in the headline monthly cost and must be budgeted separately.</li>
            <li><strong>Local Mobility:</strong> Ride-hailing, public transit, or occasional short-term mobility within the city (excluding vehicle ownership or depreciation costs).</li>
            <li><strong>Recreation &amp; Fitness:</strong> Gym memberships, social activities, and modest discretionary entertainment.</li>
          </ul>
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 space-y-2 mt-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Data Source Hierarchy</h3>
            <p className="text-xs text-slate-600">
              Costs are Numbeo-based where sample size allows—with contributor counts displayed per city—or otherwise use verified guide estimates, explicitly labelled as such on each destination. International health insurance is excluded across all destinations regardless of cost source.
            </p>
          </div>
        </section>

        {/* Section 3: 10-Axis Metric Scoring */}
        <section className="space-y-4 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">3. The 10-Score Livability Axis (0–100 Scale)</h2>
          <p>
            Every city receives normalized 0–100 scores across ten independent vectors:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">1. Cost of Living Score</span>
              Inversely correlated with USD spend. High scores indicate exceptional purchasing power and low baseline living costs.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">2. Healthcare Quality Score</span>
              Evaluates private hospital accreditation (JCI standards), specialist availability, diagnostic facilities, and emergency response capabilities.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">3. Safety &amp; Security Score</span>
              Combines official violent crime metrics, property theft rates, walkability at night, and general political stability.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">4. Climate &amp; Weather Score</span>
              Evaluates year-round temperature comfort, humidity levels, air quality (AQI tracking), and exposure to severe weather or seasonal monsoon extremes.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">5. Visa Friendliness Score</span>
              Considers formal retirement visas, passive income thresholds, tourist stay allowances, digital nomad permits, and procedural renewal ease.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">6. Expat Community Score</span>
              Measures the density of international residents, active social and recreational clubs, community support infrastructure, and integration opportunities.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">7. Infrastructure Score</span>
              Evaluates high-speed broadband reliability, power grid stability, municipal water safety, walkability, and regional/international airport access.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">8. English Proficiency Score</span>
              Reflects the prevalence of English in medical facilities, government offices, rental negotiations, and daily commercial transactions (benchmarked against EF EPI metrics where available).
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">9. Entertainment &amp; Nightlife Score</span>
              Measures the diversity of dining scenes, cultural events, live music venues, social gathering spots, and active evening entertainment.
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <span className="font-bold text-slate-900 block mb-1">10. Dating Score</span>
              Evaluates the social scene, international presence, demographic balance, and openness for single retirees and slow-travelers looking to build relationships.
            </div>
          </div>
        </section>

        {/* Section 4: Data Flags & Continuous Auditing */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">4. Data Audits &amp; Known Edge Cases</h2>
          <p>
            Immigration laws and living costs evolve constantly. Every row in our database maintains an individual <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">as_of_date</code> audit timestamp. Key institutional policies and caveats include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Tourist Stay Limits:</strong> Reflect official bilateral visa exemptions and eVisa allowances for Canadian and United States passport holders as of late 2026 (including Thailand&apos;s 30-day exemption standard implemented September 15, 2026).</li>
            <li><strong>Territorial Status:</strong> Locations such as Guam (USA Territory) are explicitly handled with unlimited stay provisions for US passport holders.</li>
            <li><strong>Provisional Scores:</strong> Where standardized multi-year survey data is incomplete—such as the Cyprus English proficiency rating (flagged with EF 2025 provisional data)—scores are explicitly annotated in the city&apos;s audit dossier.</li>
          </ul>
        </section>

        {/* Section 5: Corrections & Community Feedback */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-700 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-bold text-slate-900">5. Continuous QA &amp; Corrections</h2>
          <p>
            We welcome direct on-the-ground verification from expats, residents, and legal practitioners. If you observe an outdated visa requirement, shifting municipal policy, or noticeable cost discrepancy, click the <strong>&ldquo;Report Outdated Info&rdquo;</strong> button located on each city dossier or contact our research desk directly at{' '}
            <a href="mailto:hello@roamandretire.com" className="text-teal-700 font-bold hover:underline">
              hello@roamandretire.com
            </a>
            . Submissions are reviewed monthly and applied directly to the master dataset.
          </p>
        </section>
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Roam and Retire. Verified relocation data.
          </div>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-teal-700 font-semibold">Scoring Methodology</a>
            <a href="/privacy" className="hover:text-slate-800">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-800">Terms of Use</a>
            <a href="/disclosure" className="hover:text-slate-800">FTC Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
}