'use client';

import React, { useState, useMemo } from 'react';
import type { Destination } from '@/types/destination';

interface Props {
  initialDestinations: Destination[];
}

type PassportFilter = 'all' | 'ca_90' | 'ca_180' | 'us_90' | 'us_180';

export default function InteractiveMatrix({ initialDestinations }: Props) {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [maxMonthlyCost, setMaxMonthlyCost] = useState<number>(3500);
  const [minHealthcareScore, setMinHealthcareScore] = useState<number>(0);
  const [minSafetyScore, setMinSafetyScore] = useState<number>(0);
  const [minVisaScore, setMinVisaScore] = useState<number>(0);
  const [minEnglishProficiency, setMinEnglishProficiency] = useState<number>(0);
  const [passportFilter, setPassportFilter] = useState<PassportFilter>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'cost_asc' | 'cost_desc' | 'healthcare' | 'safety'>('rank');

  // Extract unique regions dynamically
  const regions = useMemo(() => {
    const list = Array.from(new Set(initialDestinations.map((d) => d.region))).filter(Boolean);
    return ['All', ...list];
  }, [initialDestinations]);

  // Core Filtering Logic (Adhering to frontend_build_notes.md)
  const filteredDestinations = useMemo(() => {
    return initialDestinations.filter((item) => {
      // 1. Search Query (matches city name, country, or slug)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.city_name.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        const matchesSlug = item.slug.toLowerCase().includes(q);
        if (!matchesName && !matchesCountry && !matchesSlug) return false;
      }

      // 2. Region Filter
      if (selectedRegion !== 'All' && item.region !== selectedRegion) {
        return false;
      }

      // 3. Monthly Cost Ceiling
      if (item.monthly_cost_usd > maxMonthlyCost) {
        return false;
      }

      // 4. Metric Scores (0–100)
      if (item.healthcare_score < minHealthcareScore) return false;
      if (item.safety_score < minSafetyScore) return false;
      if (item.visa_friendliness_score < minVisaScore) return false;
      if (item.english_proficiency < minEnglishProficiency) return false;

      // 5. Passport & Tourist Stay Days (Rule #1: Guam NULL stay_days_us_num passes any US filter)
      if (passportFilter === 'ca_90') {
        if (!item.stay_days_ca_num || item.stay_days_ca_num < 90) return false;
      } else if (passportFilter === 'ca_180') {
        if (!item.stay_days_ca_num || item.stay_days_ca_num < 180) return false;
      } else if (passportFilter === 'us_90') {
        // NULL for Guam = Unlimited -> passes unconditionally
        if (item.slug !== 'guam-usa-territory') {
          if (!item.stay_days_us_num || item.stay_days_us_num < 90) return false;
        }
      } else if (passportFilter === 'us_180') {
        // NULL for Guam = Unlimited -> passes unconditionally
        if (item.slug !== 'guam-usa-territory') {
          if (!item.stay_days_us_num || item.stay_days_us_num < 180) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank;
      if (sortBy === 'cost_asc') return a.monthly_cost_usd - b.monthly_cost_usd;
      if (sortBy === 'cost_desc') return b.monthly_cost_usd - a.monthly_cost_usd;
      if (sortBy === 'healthcare') return b.healthcare_score - a.healthcare_score;
      if (sortBy === 'safety') return b.safety_score - a.safety_score;
      return 0;
    });
  }, [
    initialDestinations,
    searchQuery,
    selectedRegion,
    maxMonthlyCost,
    minHealthcareScore,
    minSafetyScore,
    minVisaScore,
    minEnglishProficiency,
    passportFilter,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setMaxMonthlyCost(3500);
    setMinHealthcareScore(0);
    setMinSafetyScore(0);
    setMinVisaScore(0);
    setMinEnglishProficiency(0);
    setPassportFilter('all');
    setSortBy('rank');
  };

  return (
    <div className="space-y-8">
      {/* Search & Top Controls */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search by city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="rank">Index Rank (#1 - #200)</option>
                <option value="cost_asc">Cost: Low to High</option>
                <option value="cost_desc">Cost: High to Low</option>
                <option value="healthcare">Healthcare Score</option>
                <option value="safety">Safety Score</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 underline px-2 py-1"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-4">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedRegion === region
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Sliders & Passport Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Max Cost Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Max Monthly Cost</span>
              <span className="font-bold text-teal-700">${maxMonthlyCost.toLocaleString()} / mo</span>
            </div>
            <input
              type="range"
              min="500"
              max="3500"
              step="50"
              value={maxMonthlyCost}
              onChange={(e) => setMaxMonthlyCost(Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$500</span>
              <span>$3,500+</span>
            </div>
          </div>

          {/* Min Healthcare Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Min Healthcare</span>
              <span className="font-bold text-teal-700">{minHealthcareScore}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minHealthcareScore}
              onChange={(e) => setMinHealthcareScore(Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Any</span>
              <span>95+</span>
            </div>
          </div>

          {/* Min Safety Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Min Safety</span>
              <span className="font-bold text-teal-700">{minSafetyScore}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minSafetyScore}
              onChange={(e) => setMinSafetyScore(Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Any</span>
              <span>95+</span>
            </div>
          </div>

          {/* Min Visa Friendliness Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Min Visa Friendliness</span>
              <span className="font-bold text-teal-700">{minVisaScore}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minVisaScore}
              onChange={(e) => setMinVisaScore(Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Any</span>
              <span>95+</span>
            </div>
          </div>

          {/* Min English Proficiency */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Min English Proficiency</span>
              <span className="font-bold text-teal-700">{minEnglishProficiency}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minEnglishProficiency}
              onChange={(e) => setMinEnglishProficiency(Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Any</span>
              <span>95+</span>
            </div>
          </div>

          {/* Passport Stay Days Dropdown */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-700">Passport Tourist Stay</div>
            <select
              value={passportFilter}
              onChange={(e) => setPassportFilter(e.target.value as PassportFilter)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="all">Any Stay Length</option>
              <option value="ca_90">Canada: 90+ Days Visa-Free/e-Visa</option>
              <option value="ca_180">Canada: 180 Days Visa-Free</option>
              <option value="us_90">USA: 90+ Days (incl. Guam)</option>
              <option value="us_180">USA: 180 Days (incl. Guam)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center px-1">
        <h2 className="text-sm font-semibold text-slate-600">
          Showing <span className="text-slate-900 font-bold">{filteredDestinations.length}</span> destinations
        </h2>
      </div>

      {/* Responsive Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.slug}
            className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="p-5 space-y-4">
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      #{dest.rank}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{dest.region}</span>
                  </div>
                  {/* Display UTF-8 city_name and country per Rule #3 */}
                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-teal-800 group-hover:underline"><a href={`/city/${dest.slug}`} className="after:absolute after:inset-0">{dest.city_name}</a></h3>
                  <div className="text-xs font-medium text-slate-600">{dest.country}</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">
                    ${dest.monthly_cost_usd.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">USD / Month</div>
                </div>
              </div>

              {/* Pitch */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {dest.why_retirees_pick_it}
              </p>

              {/* 4 Score Highlights */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="bg-slate-50 p-1.5 rounded">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Health</div>
                  <div className="text-xs font-bold text-slate-800">{dest.healthcare_score}</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Safety</div>
                  <div className="text-xs font-bold text-slate-800">{dest.safety_score}</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Visa</div>
                  <div className="text-xs font-bold text-slate-800">{dest.visa_friendliness_score}</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">English</div>
                  <div className="text-xs font-bold text-slate-800">{dest.english_proficiency}</div>
                </div>
              </div>

              {/* Expat Neighborhoods (Rule #2: Only render populated slots) */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Expat Areas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dest.expat_neighborhood_1 && (
                    <span className="text-[11px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-100">
                      {dest.expat_neighborhood_1}
                    </span>
                  )}
                  {dest.expat_neighborhood_2 && (
                    <span className="text-[11px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-100">
                      {dest.expat_neighborhood_2}
                    </span>
                  )}
                  {dest.expat_neighborhood_3 && (
                    <span className="text-[11px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-100">
                      {dest.expat_neighborhood_3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer: Visa & Stay Badges */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Stay:</span>
                <span className="text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  CA: {dest.tourist_stay_days_ca}d
                </span>
                <span className="text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  US: {dest.tourist_stay_days_us === 'Unlimited' ? 'Unlimited' : `${dest.tourist_stay_days_us}d`}
                </span>
              </div>

              {/* ASCII slug routing key */}
              <a
                href={`/city/${dest.slug}`}
                className="font-bold text-teal-700 hover:text-teal-900 text-xs"
              >
                View Dossier &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-sm">No destinations match your exact criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-3 text-xs font-semibold text-teal-700 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
