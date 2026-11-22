import type { CostItemsBreakdown, Destination } from '@/types/destination';

interface CityCostBreakdownProps {
  dest: Destination;
}

function parseCostItems(raw: Destination['cost_items_json']): CostItemsBreakdown | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as CostItemsBreakdown;
    } catch {
      return null;
    }
  }
  return raw;
}

function formatUsd(value: number | null | undefined): string | null {
  if (typeof value !== 'number' || Number.isNaN(value)) return null;
  return `$${value.toFixed(2)}`;
}

function formatRentRange(
  low: number | null | undefined,
  high: number | null | undefined
): string | null {
  const hasLow = typeof low === 'number' && !Number.isNaN(low);
  const hasHigh = typeof high === 'number' && !Number.isNaN(high);
  if (hasLow && hasHigh) return `$${low.toLocaleString()}–$${high.toLocaleString()} / mo`;
  if (hasLow) return `From $${low.toLocaleString()} / mo`;
  if (hasHigh) return `Up to $${high.toLocaleString()} / mo`;
  return null;
}

export default function CityCostBreakdown({ dest }: CityCostBreakdownProps) {
  const itemsData = parseCostItems(dest.cost_items_json);

  const enclaves = [
    {
      name: dest.expat_neighborhood_1,
      low: dest.nbhd_1_rent_low_usd,
      high: dest.nbhd_1_rent_high_usd,
    },
    {
      name: dest.expat_neighborhood_2,
      low: dest.nbhd_2_rent_low_usd,
      high: dest.nbhd_2_rent_high_usd,
    },
    {
      name: dest.expat_neighborhood_3,
      low: dest.nbhd_3_rent_low_usd,
      high: dest.nbhd_3_rent_high_usd,
    },
  ].filter((n): n is {
    name: string;
    low: number | null;
    high: number | null;
  } => Boolean(n.name));

  const hasRentRanges = enclaves.some((e) => formatRentRange(e.low, e.high) !== null);
  const hasMonthlyAnchors = Boolean(
    itemsData &&
      (formatUsd(itemsData.utilities_85m2) ||
        formatUsd(itemsData.internet) ||
        formatUsd(itemsData.mobile_plan) ||
        formatUsd(itemsData.fitness_club) ||
        formatUsd(itemsData.cinema) ||
        formatUsd(itemsData.transport_pass) ||
        Boolean(itemsData.transport_note))
  );

  const perItemEntries: Array<{ label: string; value: string | null }> = itemsData
    ? [
        { label: 'Inexpensive Meal', value: formatUsd(itemsData.inexpensive_meal) },
        { label: 'Meal for 2 (Mid-Range)', value: formatUsd(itemsData.meal_for_two_midrange) },
        { label: "McDonald's / Combo Meal", value: formatUsd(itemsData.combo_meal) },
        { label: 'Local Beer (Restaurant)', value: formatUsd(itemsData.local_beer) },
        { label: 'Cappuccino', value: formatUsd(itemsData.cappuccino) },
        { label: 'Water (1.5L)', value: formatUsd(itemsData.water_1_5l) },
        { label: 'Milk (1L)', value: formatUsd(itemsData.milk_1l) },
        { label: 'Bread (500g)', value: formatUsd(itemsData.bread_500g) },
        { label: 'Rice (1kg)', value: formatUsd(itemsData.rice_1kg) },
        { label: 'Eggs (12)', value: formatUsd(itemsData.eggs_12) },
        { label: 'Chicken (1kg)', value: formatUsd(itemsData.chicken_1kg) },
        { label: 'Bananas (1kg)', value: formatUsd(itemsData.bananas_1kg) },
        { label: 'Local Ride', value: formatUsd(itemsData.local_ride) },
        { label: 'Gasoline (1L)', value: formatUsd(itemsData.gasoline_1l) },
      ].filter((entry): entry is { label: string; value: string } => entry.value !== null)
    : [];

  const hasAnyBreakdown =
    hasRentRanges ||
    hasMonthlyAnchors ||
    perItemEntries.length > 0 ||
    Boolean(dest.nbhd_rent_caveat) ||
    Boolean(dest.breakdown_as_of) ||
    Boolean(dest.breakdown_sources);

  if (!hasAnyBreakdown) {
    return null;
  }

  const monthlyAnchorRows: Array<{ label: string; value: string }> = [];
  if (itemsData) {
    const u = formatUsd(itemsData.utilities_85m2);
    const i = formatUsd(itemsData.internet);
    const m = formatUsd(itemsData.mobile_plan);
    const f = formatUsd(itemsData.fitness_club);
    const c = formatUsd(itemsData.cinema);
    const tp = formatUsd(itemsData.transport_pass);

    if (u) monthlyAnchorRows.push({ label: 'Utilities (85 m²)', value: u });
    if (i) monthlyAnchorRows.push({ label: 'Internet', value: i });
    if (m) monthlyAnchorRows.push({ label: 'Mobile Plan', value: m });
    if (f) monthlyAnchorRows.push({ label: 'Fitness Club', value: f });
    if (c) monthlyAnchorRows.push({ label: 'Cinema', value: c });
    if (tp) monthlyAnchorRows.push({ label: 'Transit Pass', value: tp });
  }

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Expat Enclave Rents &amp; Itemized Cost Breakdown
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Citywide headline is ${dest.monthly_cost_usd.toLocaleString()}/mo ({dest.cost_basis}).
            International health insurance is excluded from headline monthly costs.
          </p>
        </div>
        {dest.breakdown_as_of && (
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded self-start sm:self-auto">
            Breakdown as of {dest.breakdown_as_of}
          </span>
        )}
      </div>

      {hasRentRanges && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Researched Furnished 1BR Enclave Rent Ranges (USD)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {enclaves.map((enclave) => {
              const rangeLabel = formatRentRange(enclave.low, enclave.high);
              if (!rangeLabel) return null;
              return (
                <div
                  key={enclave.name}
                  className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/70 space-y-1.5"
                >
                  <div className="font-bold text-sm text-slate-900">{enclave.name}</div>
                  <div className="text-sm font-black text-teal-700">{rangeLabel}</div>
                </div>
              );
            })}
          </div>
          {dest.nbhd_rent_caveat && (
            <div className="text-xs bg-amber-50 text-amber-950 border border-amber-200 rounded-lg p-3 leading-relaxed">
              <span className="font-bold">Rent &amp; Stock Caveat:</span> {dest.nbhd_rent_caveat}
            </div>
          )}
        </div>
      )}

      {hasMonthlyAnchors && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Monthly Cost Anchors (USD)
          </h3>
          {monthlyAnchorRows.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {monthlyAnchorRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border border-slate-100 bg-slate-50 px-3 py-2 rounded"
                >
                  <span className="text-slate-600">{row.label}</span>
                  <span className="font-bold text-slate-900">{row.value}</span>
                </div>
              ))}
            </div>
          )}
          {itemsData?.transport_note && (
            <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-3.5 py-2.5">
              <span className="font-semibold text-slate-800">Local Transit Note:</span>{' '}
              {itemsData.transport_note}
            </p>
          )}
        </div>
      )}

      {perItemEntries.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Itemized Everyday Prices (USD)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
            {perItemEntries.map((entry) => (
              <div
                key={entry.label}
                className="flex items-center justify-between border border-slate-100 bg-white px-3 py-2 rounded"
              >
                <span className="text-slate-600 truncate pr-2">{entry.label}</span>
                <span className="font-semibold text-slate-900 shrink-0">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {dest.breakdown_sources && (
        <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
          <span className="font-semibold text-slate-700">Sources:</span> {dest.breakdown_sources}
        </div>
      )}
    </section>
  );
}

