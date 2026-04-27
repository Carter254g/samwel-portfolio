-- Insert photographer info
INSERT INTO photographers (name, bio, experience_years, email) VALUES
(
  'Alexander Stone',
  'A visionary photographer with 30 years of experience capturing the essence of moments. Specializing in landscapes, still-life, and architectural photography, I blend technical precision with artistic vision.',
  30,
  'contact@alexanderstone.com'
)
ON CONFLICT DO NOTHING;

-- Insert services
INSERT INTO services (title, description, icon, order_index) VALUES
(
  'Wedding Session',
  'Capture your most important day with elegant and timeless photography. Full day coverage with creative direction and stunning final images.',
  'heart',
  1
),
(
  'Studio Shooting',
  'Professional studio sessions with premium lighting setup. Perfect for portraits, product photography, and commercial projects.',
  'camera',
  2
),
(
  'Product Shoot',
  'High-quality product photography for e-commerce and marketing. We showcase your products in the best light.',
  'box',
  3
),
(
  'Video Shooting',
  'Professional videography for events, commercials, and social media content. Full post-production included.',
  'video',
  4
)
ON CONFLICT DO NOTHING;

-- Insert portfolio items
INSERT INTO portfolios (title, description, image_url, category, featured) VALUES
(
  'Romantic Wedding Dance',
  'A timeless moment capturing the grace and connection between two souls on their special day.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
  'wedding',
  true
),
(
  'Portrait in Golden Light',
  'Stunning portrait photography with natural lighting and authentic expression.',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
  'portrait',
  true
),
(
  'Landscape Serenity',
  'Majestic landscape capturing nature''s untouched beauty and vast horizons.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'landscape',
  true
),
(
  'Product Detail Work',
  'Professional product photography highlighting texture and elegance.',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
  'product',
  false
),
(
  'Wedding Ceremony',
  'Beautiful ceremonial moments filled with emotion and tradition.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
  'wedding',
  false
),
(
  'Studio Portrait',
  'Professional studio portrait with controlled lighting and composition.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  'portrait',
  false
),
(
  'Mountain Wilderness',
  'Breathtaking mountain landscape with dramatic lighting and composition.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'landscape',
  false
),
(
  'Commercial Product Shot',
  'High-end product photography for commercial use.',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
  'product',
  false
)
ON CONFLICT DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (client_name, client_role, content, rating, featured) VALUES
(
  'Sarah & Michael Johnson',
  'Wedding Couple',
  'Alexander captured every precious moment of our wedding day with such artistry and professionalism. The photos tell our story beautifully. Highly recommended!',
  5,
  true
),
(
  'Emma Davis',
  'CEO, Creative Studios',
  'Outstanding work. The commercial product shots exceeded our expectations. Professional, creative, and delivered on time.',
  5,
  true
),
(
  'James Wilson',
  'Art Director',
  'Incredible attention to detail and lighting. Alexander''s technical expertise combined with artistic vision makes him a top-tier photographer.',
  5,
  false
),
(
  'Rebecca Chen',
  'Marketing Manager',
  'We use Alexander''s photographs for all our promotional materials. Consistent quality and creative approach.',
  5,
  false
)
ON CONFLICT DO NOTHING;
