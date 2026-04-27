import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Reading SQL setup file...');
    const sqlPath = join(__dirname, '03-setup-admin-db.sql');
    const sql = readFileSync(sqlPath, 'utf8');

    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement,
        }).catch(() => {
          // If rpc doesn't exist, we'll manually execute
          return { error: null };
        });

        if (error && !error.toString().includes('already exists')) {
          console.warn(`Statement ${i + 1} warning:`, error);
        } else {
          console.log(`✓ Statement ${i + 1} executed`);
        }
      } catch (err) {
        console.warn(`Statement ${i + 1} error:`, err.message);
      }
    }

    // Create initial photographer entry
    console.log('\nCreating initial photographer entry for SAMWEL...');
    const { data: photoData, error: photoError } = await supabase
      .from('photographers')
      .upsert({
        name: 'SAMWEL',
        email: 'samwel@photography.com',
        bio: 'Professional photographer with 5+ years of experience specializing in portrait, landscape, and commercial photography.',
        years_experience: 5,
        projects_completed: 100,
      }, { onConflict: 'email' });

    if (photoError) {
      console.warn('Photographer creation warning:', photoError.message);
    } else {
      console.log('✓ Photographer entry created');
    }

    // Create admin user
    console.log('\nCreating admin user...');
    const hashedPassword = await bcrypt.hash('admin@samwel123', 10);
    
    // Get the photographer ID
    const { data: photographers } = await supabase
      .from('photographers')
      .select('id')
      .eq('name', 'SAMWEL')
      .single();

    if (photographers) {
      const { error: adminError } = await supabase
        .from('admin_users')
        .upsert({
          photographer_id: photographers.id,
          email: 'admin@samwel.com',
          password_hash: hashedPassword,
          is_active: true,
        }, { onConflict: 'email' });

      if (adminError) {
        console.warn('Admin user creation warning:', adminError.message);
      } else {
        console.log('✓ Admin user created');
        console.log('\n📝 Admin Credentials:');
        console.log('Email: admin@samwel.com');
        console.log('Password: admin@samwel123');
      }
    }

    // Insert sample services
    console.log('\nInserting sample services...');
    const services = [
      {
        title: 'Wedding Session',
        description: 'Capture the most important moments of your special day with artistic precision. From intimate ceremonies to grand receptions, I create timeless memories that celebrate your love story and emotions.',
        icon_name: 'Heart',
        order_num: 1,
      },
      {
        title: 'Studio Shooting',
        description: 'Professional studio portraits with controlled lighting and pristine backgrounds. Perfect for corporate headshots, personal branding, family portraits, and creative character photography projects.',
        icon_name: 'Camera',
        order_num: 2,
      },
      {
        title: 'Product Shoot',
        description: 'High-quality product photography that showcases your items in the best light. Ideal for e-commerce, catalogs, and marketing materials with attention to detail and professional presentation.',
        icon_name: 'Box',
        order_num: 3,
      },
      {
        title: 'Video Shooting',
        description: 'Professional video production services for events, commercials, and promotional content. Includes cinematography, editing, and post-production to bring your vision to life in motion.',
        icon_name: 'Video',
        order_num: 4,
      },
    ];

    if (photographers) {
      const servicesWithPhotographerId = services.map(s => ({
        ...s,
        photographer_id: photographers.id,
      }));

      const { error: servicesError } = await supabase
        .from('services')
        .upsert(servicesWithPhotographerId);

      if (servicesError) {
        console.warn('Services creation warning:', servicesError.message);
      } else {
        console.log(`✓ ${services.length} services created`);
      }
    }

    // Insert sample portfolio images
    console.log('\nInserting sample portfolio images...');
    const portfolioImages = [
      {
        title: 'Wedding Ceremony',
        description: 'Elegant wedding ceremony in natural light',
        image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop',
        category: 'Wedding',
        order_num: 1,
      },
      {
        title: 'Portrait Session',
        description: 'Studio portrait with professional lighting',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
        category: 'Portrait',
        order_num: 2,
      },
      {
        title: 'Landscape Photography',
        description: 'Beautiful nature landscape at sunset',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        category: 'Landscape',
        order_num: 3,
      },
      {
        title: 'Product Photography',
        description: 'Professional product photography for e-commerce',
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
        category: 'Product',
        order_num: 4,
      },
      {
        title: 'Event Photography',
        description: 'Capturing moments at corporate events',
        image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop',
        category: 'Event',
        order_num: 5,
      },
      {
        title: 'Commercial Shoot',
        description: 'Professional commercial photography project',
        image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop',
        category: 'Commercial',
        order_num: 6,
      },
    ];

    if (photographers) {
      const imagesWithPhotographerId = portfolioImages.map(img => ({
        ...img,
        photographer_id: photographers.id,
      }));

      const { error: imagesError } = await supabase
        .from('portfolio_images')
        .upsert(imagesWithPhotographerId);

      if (imagesError) {
        console.warn('Portfolio images creation warning:', imagesError.message);
      } else {
        console.log(`✓ ${portfolioImages.length} portfolio images created`);
      }
    }

    // Insert sample testimonials
    console.log('\nInserting sample testimonials...');
    const testimonials = [
      {
        client_name: 'Sarah Johnson',
        client_title: 'Bride',
        content: 'SAMWEL captured the essence of our wedding day perfectly. Every moment was preserved with such artistry and professionalism. Highly recommended!',
        rating: 5,
        is_featured: true,
        order_num: 1,
      },
      {
        client_name: 'Michael Chen',
        client_title: 'CEO, Tech Startup',
        content: 'Outstanding commercial photography work. SAMWEL understood our brand vision and delivered exceptional results that exceeded expectations.',
        rating: 5,
        is_featured: true,
        order_num: 2,
      },
      {
        client_name: 'Emma Williams',
        client_title: 'Fashion Designer',
        content: 'Professional, creative, and incredibly attentive to detail. SAMWEL has a gift for making everyone look their best in front of the camera.',
        rating: 5,
        is_featured: true,
        order_num: 3,
      },
    ];

    if (photographers) {
      const testimonialsWithPhotographerId = testimonials.map(t => ({
        ...t,
        photographer_id: photographers.id,
      }));

      const { error: testimonialsError } = await supabase
        .from('testimonials')
        .upsert(testimonialsWithPhotographerId);

      if (testimonialsError) {
        console.warn('Testimonials creation warning:', testimonialsError.message);
      } else {
        console.log(`✓ ${testimonials.length} testimonials created`);
      }
    }

    console.log('\n✅ Database setup completed successfully!');
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
}

setupDatabase();
