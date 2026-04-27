import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET all portfolio images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const photographerId = searchParams.get('photographer_id');

    if (!photographerId) {
      return NextResponse.json(
        { error: 'photographer_id is required' },
        { status: 400 }
      );
    }

    const { data: images, error } = await supabase
      .from('portfolio_images')
      .select('*')
      .eq('photographer_id', photographerId)
      .order('order_num', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('[v0] Portfolio GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio images' },
      { status: 500 }
    );
  }
}

// POST - Create new portfolio image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      photographer_id,
      title,
      description,
      image_url,
      category,
      order_num,
      is_active,
    } = body;

    if (!photographer_id || !title || !image_url) {
      return NextResponse.json(
        { error: 'Missing required fields: photographer_id, title, image_url' },
        { status: 400 }
      );
    }

    const { data: image, error } = await supabase
      .from('portfolio_images')
      .insert({
        photographer_id,
        title,
        description,
        image_url,
        category,
        order_num: order_num || 0,
        is_active: is_active !== false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    console.error('[v0] Portfolio POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio image' },
      { status: 500 }
    );
  }
}

// PUT - Update portfolio image
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, image_url, category, order_num, is_active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const { data: image, error } = await supabase
      .from('portfolio_images')
      .update({
        title,
        description,
        image_url,
        category,
        order_num,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error('[v0] Portfolio PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio image' },
      { status: 500 }
    );
  }
}

// DELETE - Remove portfolio image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('portfolio_images')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Portfolio DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio image' },
      { status: 500 }
    );
  }
}
