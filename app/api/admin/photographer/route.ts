import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET photographer profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const photographerId = searchParams.get('photographer_id');

    const query = supabase
      .from('photographers')
      .select('*');

    if (photographerId) {
      query.eq('id', photographerId);
    }

    const { data: photographer, error } = await query.single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ photographer });
  } catch (error) {
    console.error('Photographer GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch photographer' }, { status: 500 });
  }
}

// PUT - Update photographer profile (name, bio, hero image, about image)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      bio,
      years_experience,
      projects_completed,
      profile_image_url,
      hero_image_url,
      about_image_url,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Photographer ID is required' }, { status: 400 });
    }

    const { data: photographer, error } = await supabase
      .from('photographers')
      .update({
        ...(name !== undefined && { name }),
        ...(bio !== undefined && { bio }),
        ...(years_experience !== undefined && { years_experience }),
        ...(projects_completed !== undefined && { projects_completed }),
        ...(profile_image_url !== undefined && { profile_image_url }),
        ...(hero_image_url !== undefined && { hero_image_url }),
        ...(about_image_url !== undefined && { about_image_url }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ photographer });
  } catch (error) {
    console.error('Photographer PUT error:', error);
    return NextResponse.json({ error: 'Failed to update photographer' }, { status: 500 });
  }
}
