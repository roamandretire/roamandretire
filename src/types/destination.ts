export interface Destination {
  rank: number;
  city_name: string;
  country: string;
  region: string;
  why_retirees_pick_it: string;
  monthly_cost_usd: number;
  cost_basis: string;
  numbeo_contributors: number | null;
  visa_ease: string;

  // 10 Metric / Score Axes (0-100)
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

  // Seasonality & Language
  peak_season: string;
  shoulder_season: string;
  off_season: string;
  national_language: string;

  // Tourist Stays
  tourist_stay_days_ca: string;
  tourist_stay_days_us: string;
  stay_days_ca_num: number | null;
  stay_days_us_num: number | null; // NULL for Guam (Unlimited for US passports)

  // Neighborhoods
  expat_neighborhood_1: string;
  expat_neighborhood_2: string;
  expat_neighborhood_3: string | null;

  // Routing, Freshness & Integration
  slug: string;
  country_slug: string;
  as_of_date: string;
  data_notes: string | null;
  youtube_video_id: string | null;
}
