import { createClient } from '@supabase/supabase-js';
import type { Destination } from '@/types/destination';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables in .env.local');
}

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: Destination;
        Insert: Destination;
        Update: Partial<Destination>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);