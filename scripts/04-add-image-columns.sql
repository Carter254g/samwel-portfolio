-- Migration: Add image URL columns for site images management
-- Run this in your Supabase SQL Editor BEFORE deploying

-- Add hero image and about image columns to photographers table
ALTER TABLE photographers
  ADD COLUMN IF NOT EXISTS hero_image_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS about_image_url VARCHAR(500);

-- Create Supabase Storage bucket for portfolio images
-- (Run this in Supabase SQL Editor OR create via the Supabase Dashboard → Storage)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: allow public reads
CREATE POLICY IF NOT EXISTS "portfolio_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

-- Storage RLS: allow service role to upload
CREATE POLICY IF NOT EXISTS "portfolio_images_service_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images');

-- Storage RLS: allow service role to delete
CREATE POLICY IF NOT EXISTS "portfolio_images_service_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-images');

-- Confirm columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'photographers'
  AND column_name IN ('hero_image_url', 'about_image_url');
