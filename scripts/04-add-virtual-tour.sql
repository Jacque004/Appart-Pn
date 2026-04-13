-- Add virtual_tour_url column to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS virtual_tour_url TEXT;

-- Add comment
COMMENT ON COLUMN properties.virtual_tour_url IS 'URL de la visite virtuelle 3D du logement';
