import { createClient } from "@supabase/supabase-js";

const SUPABASE: { URL: string; KEY: string } = {
	URL: import.meta.env.VITE_SUPABASE_URL,
	KEY: import.meta.env.VITE_SUPABASE_KEY,
};

if (!SUPABASE.URL || !SUPABASE.KEY) {
	console.error("Supabase URL or Key not found");
}

const supabaseClient = createClient(SUPABASE.URL, SUPABASE.KEY);

export default supabaseClient;
