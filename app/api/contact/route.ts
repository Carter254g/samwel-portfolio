import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, serviceType, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, we'll just log the submission
    // In production, this would save to a database or send an email
    console.log('[v0] Contact form submission:', {
      name,
      email,
      phone,
      serviceType,
      message,
      submittedAt: new Date().toISOString(),
    });

    // TODO: Integrate with Supabase to save contact_submissions
    // const supabase = createClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // );
    
    // const { error } = await supabase
    //   .from('contact_submissions')
    //   .insert({
    //     name,
    //     email,
    //     phone,
    //     service_type: serviceType,
    //     message,
    //   });

    // if (error) {
    //   throw error;
    // }

    return NextResponse.json(
      { success: true, message: 'Contact submission received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
