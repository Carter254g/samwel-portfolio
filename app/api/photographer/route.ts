import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data: photographer, error } = await supabase
      .from('photographers')
      .select('id, name, bio, years_experience, projects_completed, profile_image_url, hero_image_url, about_image_url')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ photographer });
  } catch (error) {
    console.error('Public photographer GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch photographer' }, { status: 500 });
  }
}
