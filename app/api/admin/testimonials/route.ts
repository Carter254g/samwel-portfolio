import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET all testimonials
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

    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('photographer_id', photographerId)
      .order('order_num', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('[v0] Testimonials GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      photographer_id,
      client_name,
      client_title,
      content,
      rating,
      is_featured,
      order_num,
    } = body;

    if (!photographer_id || !client_name || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: photographer_id, client_name, content' },
        { status: 400 }
      );
    }

    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .insert({
        photographer_id,
        client_name,
        client_title,
        content,
        rating: rating || 5,
        is_featured: is_featured !== false,
        order_num: order_num || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error('[v0] Testimonials POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}

// PUT - Update testimonial
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      client_name,
      client_title,
      content,
      rating,
      is_featured,
      order_num,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }

    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .update({
        client_name,
        client_title,
        content,
        rating,
        is_featured,
        order_num,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ testimonial });
  } catch (error) {
    console.error('[v0] Testimonials PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE - Remove testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Testimonials DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
