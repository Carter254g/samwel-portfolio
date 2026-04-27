import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET all services
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

    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('photographer_id', photographerId)
      .order('order_num', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ services });
  } catch (error) {
    console.error('[v0] Services GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      photographer_id,
      title,
      description,
      icon_name,
      order_num,
      is_active,
    } = body;

    if (!photographer_id || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: photographer_id, title, description' },
        { status: 400 }
      );
    }

    const { data: service, error } = await supabase
      .from('services')
      .insert({
        photographer_id,
        title,
        description,
        icon_name,
        order_num: order_num || 0,
        is_active: is_active !== false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error('[v0] Services POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

// PUT - Update service
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, icon_name, order_num, is_active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    const { data: service, error } = await supabase
      .from('services')
      .update({
        title,
        description,
        icon_name,
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

    return NextResponse.json({ service });
  } catch (error) {
    console.error('[v0] Services PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE - Remove service
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Services DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
