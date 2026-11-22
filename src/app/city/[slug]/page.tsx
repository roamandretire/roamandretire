import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { Destination } from '@/types/destination';
import { getDestinationHeroImage } from '@/lib/destination-media';
import CityCostBreakdown from '@/components/CityCostBreakdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getDestination(slug: string): Promise<Destination | null> {
  'use cache';
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Destination;
}

export async function generateStaticParams() {
  const { data: destinations } = await supabase
    .from('destinations')
    .select('slug');

  return ((destinations ?? []) as { slug: string }[]).map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = await getDestination(slug);

  if (!dest) {
    return { title: 'Destination Not Found — Roam and Retire' };
  }

  const neighborhoods = [
    dest.expat_neighborhood_1,
    dest.expat_neighborhood_2,
    dest.expat_neighborhood_3,
  ]
    .filter(Boolean)
    .join(', ');

  const title = `${dest.city_name}, ${dest.country} Cost of Living & Expat Guide | Roam and Retire`;
  const description = `Retire or slow-travel in ${dest.city_name}, ${dest.country} for $${dest.monthly_cost_usd}/mo. Healthcare score: ${dest.healthcare_score}/100, safety: ${dest.safety_score}/100. Top expat areas: ${neighborhoods}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://roamandretire.com/city/${dest.slug}`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const dest = await getDestination(slug);

  if (!dest) {
    notFound();
  }

  const heroImage = getDestinationHeroImage(dest.slug, dest.region);

  // 10 Metric / Score Axes mapped to display labels
  const scores = [
    { label: 'Cost of Living', score: dest.cost_of_living_score, category: 'Budget' },
    { label: 'Healthcare Quality', score: dest.healthcare_score, category: 'Services' },
    { label: 'Safety & Security', score: dest.safety_score, category: 'Livability' },
    { label: 'Climate & Weather', score: dest.climate_score, category: 'Environment' },
    { label: 'Visa Friendliness', score: dest.visa_friendliness_score, category: 'Residency' },
    { label: 'Expat Community', score: dest.expat_community_score, category: 'Social' },
    { label: 'Infrastructure', score: dest.infrastructure_score, category: 'Services' },
    { label: 'English Proficiency', score: dest.english_proficiency, category: 'Communication' },
    { label: 'Entertainment & Nightlife', score: dest.entertainment_nightlife_score, category: 'Lifestyle' },
    { label: 'Dating Score', score: dest.dating_score, category: 'Social' },
  ];

  // Sparse slot rule: only mount cards for populated neighborhood columns
  const neighborhoods = [
    { name: dest.expat_neighborhood_1, desc: dest.nbhd_1_desc },
    { name: dest.expat_neighborhood_2, desc: dest.nbhd_2_desc },
    { name: dest.expat_neighborhood_3, desc: dest.nbhd_3_desc },
  ].filter((n): n is { name: string; desc: string | null } => Boolean(n.name));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 font-black flex items-center justify-center text-sm">
              R
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Roam <span className="text-teal-600">&amp;</span> Retire
            </span>
          </a>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="/" className="text-slate-600 hover:text-slate-900">
              &larr; Back to 200 Index
            </a>
            <a
              href={`mailto:hello@roamandretire.com?subject=Report%20Outdated%20Info:%20${dest.slug}`}
              className="text-slate-500 hover:text-amber-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200"
            >
              Report Outdated Info
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header with Photography & Gradient Scrim */}
      <section className="relative bg-slate-900 text-white py-14 sm:py-20 overflow-hidden">
        <img
          src={heroImage.src}
          alt={`${dest.city_name}, ${dest.country}`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-900/10"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-black">
              INDEX RANK #{dest.rank}
            </span>
            <span>{dest.region}</span>
            <span>&bull;</span>
            <span>{dest.country}</span>
            <span>&bull;</span>
            <span className="text-slate-300 font-normal">Audited: {dest.as_of_date}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {dest.city_name}
              </h1>
              <p className="text-lg text-slate-200 mt-2 max-w-2xl leading-relaxed">
                {dest.why_retirees_pick_it}
              </p>
            </div>

            <div className="bg-slate-900/85 backdrop-blur-sm border border-slate-700/80 rounded-xl p-5 text-right min-w-[220px]">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Single Retiree / Mo
              </div>
              {dest.monthly_cost_low_usd != null && dest.monthly_cost_high_usd != null ? (
                <>
                  <div className="text-2xl sm:text-3xl font-black text-teal-400 mt-1 whitespace-nowrap">
                    ${dest.monthly_cost_low_usd.toLocaleString()} &ndash; ${dest.monthly_cost_high_usd.toLocaleString()}+
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    USD / Month &bull; Typical: ${dest.monthly_cost_usd.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Range from researched neighbourhood rents &bull; Basis: {dest.cost_basis}
                    {dest.numbeo_contributors ? ` (${dest.numbeo_contributors} contributors)` : ''}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 mt-1">
                    ${dest.monthly_cost_usd.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    USD / Month &bull; Basis: {dest.cost_basis}
                    {dest.numbeo_contributors ? ` (${dest.numbeo_contributors} contributors)` : ''}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Data Notes Callout (if present) */}
        {dest.data_notes && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-xs text-amber-900">
            <span className="font-bold">Important Audit Note:</span> {dest.data_notes}
          </div>
        )}

        {/* 10-Score Metric Scorecard */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">10-Category Livability Scorecard</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against the Roam and Retire 200-City Relocation Index (0 to 100 benchmark).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {scores.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{item.label}</span>
                  <span className="font-mono font-bold text-slate-900">{item.score} / 100</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, item.score))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Affiliate Trigger: IPMI Placement under Healthcare */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-lg">
            <span className="text-slate-600">
              Planning long-term healthcare in {dest.city_name}? Compare global expat medical policies:
            </span>
            <a
              href={`https://safetywing.com/nomad-insurance?subid=${dest.slug}-ipmi`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-teal-700 hover:text-teal-900 whitespace-nowrap"
            >
              Check Expat Health Cover &rarr;
            </a>
          </div>
        </section>

        {/* Top Expat Neighborhood Enclaves */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Top Expat Neighborhoods</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified long-stay residential hubs with reliable internet, walkability, and amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {neighborhoods.map((nbhd, idx) => (
              <div key={nbhd.name} className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2">
                <div className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  Enclave #{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{nbhd.name}</h3>
                {nbhd.desc && (
                  <p className="text-xs text-slate-600 leading-relaxed">{nbhd.desc}</p>
                )}
                <div className="pt-2">
                  <a
                    href={`https://www.flatio.com/search?q=${encodeURIComponent(`${nbhd.name}, ${dest.city_name}`)}&subid=${dest.slug}-nbhd-${idx + 1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-teal-700 hover:underline"
                  >
                    Check Monthly Rentals &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Researched Cost Breakdown (renders only when populated) */}
        <CityCostBreakdown dest={dest} />

        {/* Visa & Stay Limits + Seasonality Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visa & Stay Overview */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900">Visa &amp; Tourist Stay Limits</h2>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {dest.visa_ease}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="border border-slate-200 p-3 rounded-lg text-center">
                  <div className="text-[10px] font-bold uppercase text-slate-500">Canadian Passport</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">
                    {dest.tourist_stay_days_ca}
                  </div>
                  <div className="text-[10px] text-slate-500">days without extension</div>
                </div>

                <div className="border border-slate-200 p-3 rounded-lg text-center">
                  <div className="text-[10px] font-bold uppercase text-slate-500">US Passport</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">
                    {dest.tourist_stay_days_us}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {dest.slug === 'guam-usa-territory' ? 'US soil' : 'days without extension'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              National Language: <span className="font-semibold text-slate-800">{dest.national_language}</span>
              {dest.english_proficiency < 65 && (
                <span className="block mt-1">
                  English is less common here.{' '}
                  <a
                    href={`https://www.babbel.com?subid=${dest.slug}-lang`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-teal-700 hover:underline"
                  >
                    Learn basic {dest.national_language} &rarr;
                  </a>
                </span>
              )}
            </div>
          </section>

          {/* Seasonality Strip */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900">Seasonal Climate Windows</h2>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <span className="font-bold text-emerald-900 uppercase text-[10px] block">
                    Peak Season (Best Weather / High Demand)
                  </span>
                  <span className="text-emerald-800 font-semibold">{dest.peak_season}</span>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <span className="font-bold text-amber-900 uppercase text-[10px] block">
                    Shoulder Season (Value &amp; Fewer Crowds)
                  </span>
                  <span className="text-amber-800 font-semibold">{dest.shoulder_season}</span>
                </div>

                <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg">
                  <span className="font-bold text-slate-700 uppercase text-[10px] block">
                    Off Season (Monsoon, Heat, or Winter)
                  </span>
                  <span className="text-slate-800 font-semibold">{dest.off_season}</span>
                </div>
              </div>
            </div>

          </section>
        </div>

        {/* YouTube Video Embed Slot (renders dynamically when populated) */}
        {dest.youtube_video_id ? (
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Video Walkthrough &amp; On-the-Ground Dossier</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-200">
              <iframe
                src={`https://www.youtube.com/embed/${dest.youtube_video_id}`}
                title={`${dest.city_name} Relocation Breakdown`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        ) : (
          <section className="bg-slate-100 border border-dashed border-slate-300 rounded-xl p-8 text-center space-y-2">
            <h3 className="text-sm font-bold text-slate-700">Video Dossier Coming Soon</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Our full on-the-ground cost and living analysis for {dest.city_name} is in production for{' '}
              <a
                href="https://youtube.com/@RoamAndRetireTV"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-700 hover:underline"
              >
                @RoamAndRetireTV
              </a>
              .
            </p>
          </section>
        )}
      </main>

      {/* Global Minimal Footer */}
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
