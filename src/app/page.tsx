import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import type { Destination } from '@/types/destination';
import InteractiveMatrix from '@/components/InteractiveMatrix';

// Next.js Cache Components helper: caches database response
async function getDestinations(): Promise<Destination[]> {
  'use cache';
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('rank', { ascending: true });

  if (error) {
    console.error('Supabase query error:', error);
    return [];
  }

  return (data ?? []) as Destination[];
}

// Fallback loader while data resolves
function ExplorerSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-44 bg-slate-100 rounded-xl border border-slate-200" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 bg-slate-100 rounded-xl border border-slate-200" />
        ))}
      </div>
    </div>
  );
}

async function ExplorerContainer() {
  const destinations = await getDestinations();
  return <InteractiveMatrix initialDestinations={destinations} />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Roam and Retire" className="h-12 w-auto" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="/compare/chiang-mai-vs-da-nang"
              className="text-slate-600 hover:text-slate-900 hidden sm:inline-block"
            >
              Showdown: Chiang Mai vs Da Nang
            </a>
            <a
              href="https://youtube.com/@RoamAndRetireTV"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 py-12 sm:py-16 min-h-[520px] sm:min-h-[600px] flex items-center">
        <img
          src="/images/hero-beach.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[60%_55%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/70" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white text-xs font-semibold">
            <span>200 Verified Global Hubs</span>
            <span className="text-teal-300">•</span>
            <span>Data as of Nov 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            The Data-Driven Index for Slow Travel & Global Living
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal">
            Filter 200 international retirement and extended-stay destinations by monthly budget,
            healthcare quality, safety scores, and verified passport stay limits.
          </p>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center">
          <p className="text-sm text-slate-600"><span className="text-base font-black text-slate-900">200</span> Destinations Researched</p>
          <p className="text-sm text-slate-600"><span className="text-base font-black text-slate-900">10-Category</span> Cost &amp; Livability Scoring</p>
          <p className="text-sm text-slate-600"><span className="text-base font-black text-slate-900">100% Independent</span> — No Sponsored Ranks</p>
        </div>
      </section>

      {/* Main Interactive Matrix Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<ExplorerSkeleton />}>
          <ExplorerContainer />
        </Suspense>
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Roam and Retire. Personal research and relocation index.
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
