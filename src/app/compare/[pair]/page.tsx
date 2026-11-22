import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { Destination } from '@/types/destination';

interface PageProps {
  params: Promise<{ pair: string }>;
}

async function resolveDestination(part: string): Promise<Destination | null> {
  'use cache';
  const normalized = part.trim().toLowerCase();
  if (!normalized) return null;

  // 1. Try exact slug match first (e.g., "chiang-mai-thailand")
  const { data: exactData, error: exactError } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', normalized)
    .limit(1);

  if (!exactError && exactData && exactData.length > 0) {
    return exactData[0] as Destination;
  }

  // 2. Fallback: match slug starting with "${normalized}-" (e.g., "chiang-mai" -> "chiang-mai-thailand")
  const { data: prefixData, error: prefixError } = await supabase
    .from('destinations')
    .select('*')
    .like('slug', `${normalized}-%`)
    .order('rank', { ascending: true })
    .limit(1);

  if (!prefixError && prefixData && prefixData.length > 0) {
    return prefixData[0] as Destination;
  }

  return null;
}

export async function generateStaticParams() {
  return [{ pair: 'chiang-mai-vs-da-nang' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const parts = pair.split('-vs-');
  if (parts.length !== 2) {
    return { title: 'Comparison Not Found — Roam and Retire' };
  }

  const [d1, d2] = await Promise.all([
    resolveDestination(parts[0]),
    resolveDestination(parts[1]),
  ]);

  if (!d1 || !d2) {
    return { title: 'Comparison Not Found — Roam and Retire' };
  }

  const title = `${d1.city_name} vs ${d2.city_name}: Expat Cost & Livability Showdown | Roam and Retire`;
  const description = `Compare ${d1.city_name} ($${d1.monthly_cost_usd}/mo) vs ${d2.city_name} ($${d2.monthly_cost_usd}/mo). Full breakdown across healthcare, safety, visa friendliness, and seasonal weather.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://roamandretire.com/compare/${pair}`,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { pair } = await params;
  const parts = pair.split('-vs-');
  if (parts.length !== 2) {
    notFound();
  }

  const [d1, d2] = await Promise.all([
    resolveDestination(parts[0]),
    resolveDestination(parts[1]),
  ]);

  if (!d1 || !d2) {
    notFound();
  }

  const metricRows = [
    { label: 'Index Rank', val1: `#${d1.rank}`, val2: `#${d2.rank}`, winner: d1.rank < d2.rank ? 1 : 2 },
    { label: 'Monthly Cost (Single USD)', val1: `$${d1.monthly_cost_usd}`, val2: `$${d2.monthly_cost_usd}`, winner: d1.monthly_cost_usd < d2.monthly_cost_usd ? 1 : 2 },
    { label: 'Cost Basis', val1: `${d1.cost_basis} (${d1.numbeo_contributors ?? 'N/A'})`, val2: `${d2.cost_basis} (${d2.numbeo_contributors ?? 'N/A'})`, winner: null },
    { label: 'Healthcare Quality', val1: `${d1.healthcare_score} / 100`, val2: `${d2.healthcare_score} / 100`, winner: d1.healthcare_score > d2.healthcare_score ? 1 : (d1.healthcare_score < d2.healthcare_score ? 2 : null) },
    { label: 'Safety & Security', val1: `${d1.safety_score} / 100`, val2: `${d2.safety_score} / 100`, winner: d1.safety_score > d2.safety_score ? 1 : (d1.safety_score < d2.safety_score ? 2 : null) },
    { label: 'Climate Score', val1: `${d1.climate_score} / 100`, val2: `${d2.climate_score} / 100`, winner: d1.climate_score > d2.climate_score ? 1 : (d1.climate_score < d2.climate_score ? 2 : null) },
    { label: 'Visa Friendliness', val1: `${d1.visa_friendliness_score} / 100`, val2: `${d2.visa_friendliness_score} / 100`, winner: d1.visa_friendliness_score > d2.visa_friendliness_score ? 1 : (d1.visa_friendliness_score < d2.visa_friendliness_score ? 2 : null) },
    { label: 'Expat Community', val1: `${d1.expat_community_score} / 100`, val2: `${d2.expat_community_score} / 100`, winner: d1.expat_community_score > d2.expat_community_score ? 1 : (d1.expat_community_score < d2.expat_community_score ? 2 : null) },
    { label: 'Infrastructure', val1: `${d1.infrastructure_score} / 100`, val2: `${d2.infrastructure_score} / 100`, winner: d1.infrastructure_score > d2.infrastructure_score ? 1 : (d1.infrastructure_score < d2.infrastructure_score ? 2 : null) },
    { label: 'English Proficiency', val1: `${d1.english_proficiency} / 100`, val2: `${d2.english_proficiency} / 100`, winner: d1.english_proficiency > d2.english_proficiency ? 1 : (d1.english_proficiency < d2.english_proficiency ? 2 : null) },
    { label: 'Entertainment & Nightlife', val1: `${d1.entertainment_nightlife_score} / 100`, val2: `${d2.entertainment_nightlife_score} / 100`, winner: d1.entertainment_nightlife_score > d2.entertainment_nightlife_score ? 1 : (d1.entertainment_nightlife_score < d2.entertainment_nightlife_score ? 2 : null) },
    { label: 'Dating Score', val1: `${d1.dating_score} / 100`, val2: `${d2.dating_score} / 100`, winner: d1.dating_score > d2.dating_score ? 1 : (d1.dating_score < d2.dating_score ? 2 : null) },
  ];

  const n1 = [d1.expat_neighborhood_1, d1.expat_neighborhood_2, d1.expat_neighborhood_3].filter(Boolean);
  const n2 = [d2.expat_neighborhood_1, d2.expat_neighborhood_2, d2.expat_neighborhood_3].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Roam and Retire" className="h-12 w-auto" />
          </a>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="/" className="text-slate-600 hover:text-slate-900">
              &larr; Back to 200 Index
            </a>
            <a
              href="https://youtube.com/@RoamAndRetireTV"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Watch Video #1 Showdown
            </a>
          </div>
        </div>
      </header>

      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider">
            Video #1 Head-to-Head Comparison
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {d1.city_name} <span className="text-teal-400 font-light text-2xl sm:text-4xl">vs</span> {d2.city_name}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            The $1,000/month budget benchmark showdown: comparing healthcare, long-term visas, living costs, and expat enclaves.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  RANK #{d1.rank}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">{d1.city_name}</h2>
                <div className="text-xs text-slate-500 font-medium">{d1.country} &bull; {d1.region}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-teal-700">${d1.monthly_cost_usd}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">USD / Month</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{d1.why_retirees_pick_it}</p>
            {d1.data_notes && (
              <div className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 p-2.5 rounded">
                <span className="font-bold">Note:</span> {d1.data_notes}
              </div>
            )}
            <div className="pt-2">
              <a
                href={`/city/${d1.slug}`}
                className="text-xs font-bold text-teal-700 hover:text-teal-900"
              >
                View Full {d1.city_name} Dossier &rarr;
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  RANK #{d2.rank}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">{d2.city_name}</h2>
                <div className="text-xs text-slate-500 font-medium">{d2.country} &bull; {d2.region}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-teal-700">${d2.monthly_cost_usd}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">USD / Month</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{d2.why_retirees_pick_it}</p>
            {d2.data_notes && (
              <div className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 p-2.5 rounded">
                <span className="font-bold">Note:</span> {d2.data_notes}
              </div>
            )}
            <div className="pt-2">
              <a
                href={`/city/${d2.slug}`}
                className="text-xs font-bold text-teal-700 hover:text-teal-900"
              >
                View Full {d2.city_name} Dossier &rarr;
              </a>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Direct Metric Comparison</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Green highlight indicates the stronger score or lower cost between both locations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Metric / Score</th>
                  <th className="py-3 px-4 font-bold text-slate-900">{d1.city_name}</th>
                  <th className="py-3 px-4 font-bold text-slate-900">{d2.city_name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metricRows.map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-700">{row.label}</td>
                    <td className={`py-3 px-4 font-medium ${row.winner === 1 ? 'text-teal-700 font-bold bg-teal-50/50' : 'text-slate-800'}`}>
                      {row.val1}
                    </td>
                    <td className={`py-3 px-4 font-medium ${row.winner === 2 ? 'text-teal-700 font-bold bg-teal-50/50' : 'text-slate-800'}`}>
                      {row.val2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Visa &amp; Tourist Stays</h3>
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-800">{d1.city_name}:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">{d1.visa_ease}</p>
                <div className="text-slate-500 pt-1">
                  Passport Stays: Canada {d1.tourist_stay_days_ca} &bull; USA {d1.tourist_stay_days_us}
                </div>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800">{d2.city_name}:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">{d2.visa_ease}</p>
                <div className="text-slate-500 pt-1">
                  Passport Stays: Canada {d2.tourist_stay_days_ca} &bull; USA {d2.tourist_stay_days_us}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Top Expat Enclaves</h3>
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-slate-800">{d1.city_name}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {n1.map((name, i) => (
                    <a
                      key={name}
                      href={`https://www.flatio.com/search?q=${encodeURIComponent(`${name}, ${d1.city_name}`)}&subid=${d1.slug}-nbhd-${i + 1}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 px-2.5 py-1 rounded border border-slate-200 text-[11px]"
                    >
                      {name} &rarr;
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800">{d2.city_name}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {n2.map((name, i) => (
                    <a
                      key={name}
                      href={`https://www.flatio.com/search?q=${encodeURIComponent(`${name}, ${d2.city_name}`)}&subid=${d2.slug}-nbhd-${i + 1}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 px-2.5 py-1 rounded border border-slate-200 text-[11px]"
                    >
                      {name} &rarr;
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-teal-900 text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold">Relocating to Southeast Asia?</h3>
            <p className="text-xs text-teal-100 max-w-xl">
              Compare comprehensive expat health insurance options with inpatient, outpatient, and regional evacuation coverage for Thailand and Vietnam.
            </p>
          </div>
          <a
            href="https://safetywing.com/nomad-insurance?subid=showdown-cng-dad-ipmi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-400 hover:bg-teal-300 text-slate-950 px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors"
          >
            Compare Expat Policies &rarr;
          </a>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Roam and Retire. Verified relocation data.
          </div>
          <div className="flex items-center gap-4">
            <a href="/about" className="hover:text-slate-800">Scoring Methodology</a>
            <a href="/privacy" className="hover:text-slate-800">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-800">Terms of Use</a>
            <a href="/disclosure" className="hover:text-slate-800">FTC Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
