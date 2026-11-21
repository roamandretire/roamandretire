import { supabase } from '@/lib/supabase';
import type { Destination } from '@/types/destination';


export default async function HomePage() {
  const { data: destinations, error } = await supabase
    .from('destinations')
    .select('*')
    .order('rank', { ascending: true });

  if (error) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
        <pre className="bg-red-50 p-4 rounded text-sm text-red-800 border border-red-200">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }

  const items = (destinations ?? []) as Destination[];
  const chiangMai = items.find((d) => d.slug === 'chiang-mai-thailand');
  const guam = items.find((d) => d.slug === 'guam-usa-territory');

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Roam and Retire — Database Verification
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Connected to Supabase. Total records retrieved:{' '}
          <span className="font-semibold text-emerald-600">{items.length}</span> / 200
        </p>
      </div>

      {/* Target Row Sanity Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chiangMai && (
          <div className="border rounded-lg p-4 bg-slate-50 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Rank #{chiangMai.rank}
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                ${chiangMai.monthly_cost_usd}/mo
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {chiangMai.city_name}, {chiangMai.country}
            </h2>
            <p className="text-xs text-slate-600 italic">{chiangMai.why_retirees_pick_it}</p>
            <div className="text-xs text-slate-700 space-y-1 pt-2 border-t border-slate-200">
              <div>Healthcare: {chiangMai.healthcare_score}/100</div>
              <div>Safety: {chiangMai.safety_score}/100</div>
              <div>Canada Stay: {chiangMai.tourist_stay_days_ca} days ({chiangMai.stay_days_ca_num} num)</div>
              <div>Neighborhood 1: {chiangMai.expat_neighborhood_1}</div>
              <div className="text-amber-700 font-mono text-[11px] mt-1">{chiangMai.data_notes}</div>
            </div>
          </div>
        )}

        {guam && (
          <div className="border rounded-lg p-4 bg-slate-50 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Rank #{guam.rank}
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                ${guam.monthly_cost_usd}/mo
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {guam.city_name}, {guam.country}
            </h2>
            <p className="text-xs text-slate-600 italic">{guam.why_retirees_pick_it}</p>
            <div className="text-xs text-slate-700 space-y-1 pt-2 border-t border-slate-200">
              <div>US Stay Text: {guam.tourist_stay_days_us}</div>
              <div>
                US Stay Num:{' '}
                <span className="font-mono bg-slate-200 px-1 py-0.5 rounded">
                  {guam.stay_days_us_num === null ? 'NULL (Unlimited)' : guam.stay_days_us_num}
                </span>
              </div>
              <div className="text-amber-700 font-mono text-[11px] mt-1">{guam.data_notes}</div>
            </div>
          </div>
        )}
      </div>

      {/* Ranks 1 to 5 Quick Check */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 border-b text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Top 5 Destinations (Sanity Order Check)
        </div>
        <ul className="divide-y text-sm">
          {items.slice(0, 5).map((d) => (
            <li key={d.slug} className="px-4 py-2 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-500 mr-2">#{d.rank}</span>
                <span className="font-medium text-slate-900">{d.city_name}</span>,{' '}
                <span className="text-slate-600">{d.country}</span>
              </div>
              <div className="text-slate-700 font-mono">${d.monthly_cost_usd}/mo</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}