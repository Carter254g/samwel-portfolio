-- Create portfolios table for gallery items
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_role VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  service_type VARCHAR(100),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create photographers table for basic info
CREATE TABLE IF NOT EXISTS photographers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  experience_years INTEGER,
  email VARCHAR(255),
  phone VARCHAR(20),
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE photographers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "portfolios_public_read" ON portfolios FOR SELECT USING (true);
CREATE POLICY "services_public_read" ON services FOR SELECT USING (true);
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "photographers_public_read" ON photographers FOR SELECT USING (true);

-- Create policy for inserting contact submissions
CREATE POLICY "contact_submissions_public_insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_submissions_public_read" ON contact_submissions FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX portfolios_category_idx ON portfolios(category);
CREATE INDEX portfolios_featured_idx ON portfolios(featured);
CREATE INDEX services_order_idx ON services(order_index);
CREATE INDEX testimonials_featured_idx ON testimonials(featured);
