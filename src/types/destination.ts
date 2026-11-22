export interface CostItemsBreakdown {
  // Monthly anchors (USD)
  utilities_85m2?: number | null;
  internet?: number | null;
  mobile_plan?: number | null;
  fitness_club?: number | null;
  cinema?: number | null;
  transport_pass?: number | null;
  transport_note?: string | null;
  // Per-item everyday prices (USD) — stored flat alongside the anchors
  inexpensive_meal?: number | null;
  meal_for_two_midrange?: number | null;
  combo_meal?: number | null;
  local_beer?: number | null;
  cappuccino?: number | null;
  water_1_5l?: number | null;
  milk_1l?: number | null;
  bread_500g?: number | null;
  rice_1kg?: number | null;
  eggs_12?: number | null;
  chicken_1kg?: number | null;
  bananas_1kg?: number | null;
  local_ride?: number | null;
  gasoline_1l?: number | null;
}

export interface Destination {
  rank: number;
  city_name: string;
  country: string;
  region: string;
  why_retirees_pick_it: string;
  monthly_cost_usd: number;
  monthly_cost_low_usd: number | null;
  monthly_cost_high_usd: number | null;
  cost_basis: string;
  numbeo_contributors: number | null;
  visa_ease: string;
  cost_of_living_score: number;
  healthcare_score: number;
  safety_score: number;
  climate_score: number;
  visa_friendliness_score: number;
  expat_community_score: number;
  infrastructure_score: number;
  english_proficiency: number;
  entertainment_nightlife_score: number;
  dating_score: number;
  peak_season: string;
  shoulder_season: string;
  off_season: string;
  national_language: string;
  tourist_stay_days_ca: string;
  tourist_stay_days_us: string;
  stay_days_ca_num: number | null;
  stay_days_us_num: number | null;
  expat_neighborhood_1: string;
  expat_neighborhood_2: string | null;
  expat_neighborhood_3: string | null;
  slug: string;
  country_slug: string;
  as_of_date: string;
  data_notes: string | null;
  youtube_video_id: string | null;

  // Step 2 enrichment fields (populated only for researched cities)
  nbhd_1_rent_low_usd: number | null;
  nbhd_1_rent_high_usd: number | null;
  nbhd_2_rent_low_usd: number | null;
  nbhd_2_rent_high_usd: number | null;
  nbhd_3_rent_low_usd: number | null;
  nbhd_3_rent_high_usd: number | null;
  nbhd_1_desc: string | null;
  nbhd_2_desc: string | null;
  nbhd_3_desc: string | null;
  nbhd_rent_caveat: string | null;
  cost_items_json: CostItemsBreakdown | null;
  breakdown_as_of: string | null;
  breakdown_sources: string | null;
}
