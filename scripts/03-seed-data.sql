-- Insert sample properties
-- This script will use the first user found in auth.users
-- Make sure you have at least one user registered before running this script

DO $$
DECLARE
  sample_user_id uuid;
BEGIN
  -- Get the first user ID from auth.users
  SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
  
  -- Check if a user exists
  IF sample_user_id IS NULL THEN
    RAISE EXCEPTION 'No user found in auth.users. Please create a user account first before running this seed script.';
  END IF;
  
  -- Insert sample properties
  INSERT INTO properties (owner_id, title, description, property_type, price, bedrooms, bathrooms, surface_area, address, neighborhood, latitude, longitude, is_available)
  VALUES 
    (
      sample_user_id,
      'Villa Moderne avec Piscine',
      'Magnifique villa moderne située dans un quartier calme de Pointe-Noire. Cette propriété spacieuse dispose d''une piscine privée, d''un grand jardin et d''une vue imprenable. Idéale pour une famille.',
      'villa',
      850000,
      4,
      3,
      250,
      '15 Avenue de la Liberté',
      'Mpita',
      -4.7692,
      11.8644,
      true
    ),
    (
      sample_user_id,
      'Appartement Spacieux Centre-Ville',
      'Bel appartement au cœur de Pointe-Noire, proche de tous les commerces et services. Lumineux et bien agencé avec balcon donnant sur la ville.',
      'apartment',
      450000,
      3,
      2,
      120,
      '42 Rue du Commerce',
      'Centre-Ville',
      -4.7774,
      11.8636,
      true
    ),
    (
      sample_user_id,
      'Studio Meublé Moderne',
      'Studio entièrement meublé et équipé, parfait pour un jeune professionnel ou étudiant. Cuisine équipée, salle de bain moderne, internet inclus.',
      'studio',
      180000,
      1,
      1,
      35,
      '8 Boulevard de la Paix',
      'Loandjili',
      -4.7583,
      11.8558,
      true
    ),
    (
      sample_user_id,
      'Villa Familiale avec Jardin',
      'Grande villa familiale avec un beau jardin arboré. Quartier résidentiel sécurisé, proche des écoles internationales. Garage pour 2 véhicules.',
      'villa',
      720000,
      5,
      3,
      280,
      '23 Rue des Palmiers',
      'Tié-Tié',
      -4.7825,
      11.8472,
      true
    ),
    (
      sample_user_id,
      'Appartement Vue Mer',
      'Superbe appartement avec vue sur l''océan Atlantique. Terrasse spacieuse, cuisine moderne, résidence sécurisée avec piscine commune.',
      'apartment',
      580000,
      2,
      2,
      95,
      '67 Avenue de l''Océan',
      'Côte Sauvage',
      -4.7456,
      11.8389,
      true
    ),
    (
      sample_user_id,
      'Studio Proche Université',
      'Studio pratique situé à proximité de l''université Marien Ngouabi. Idéal pour étudiant, calme et sécurisé.',
      'studio',
      150000,
      1,
      1,
      30,
      '12 Rue de l''Université',
      'Ngoyo',
      -4.7912,
      11.8701,
      true
    ),
    (
      sample_user_id,
      'Villa de Luxe Bord de Mer',
      'Villa d''exception en bord de mer avec accès privé à la plage. Architecture contemporaine, piscine à débordement, 6 chambres dont une suite parentale.',
      'villa',
      1500000,
      6,
      4,
      400,
      '3 Corniche de la Mer',
      'Côte Sauvage',
      -4.7401,
      11.8356,
      true
    ),
    (
      sample_user_id,
      'Appartement Rénové 3 Pièces',
      'Appartement entièrement rénové dans un immeuble récent. Climatisation dans toutes les pièces, parking sécurisé, ascenseur.',
      'apartment',
      380000,
      2,
      1,
      85,
      '34 Avenue des Flamboyants',
      'Mpita',
      -4.7715,
      11.8623,
      true
    );

  -- Add sample images for properties (using placeholder images)
  INSERT INTO property_images (property_id, image_url, is_primary, display_order)
  SELECT 
    id,
    '/placeholder.svg?height=400&width=600',
    true,
    0
  FROM properties
  WHERE owner_id = sample_user_id AND property_type = 'villa'
  LIMIT 1;

  INSERT INTO property_images (property_id, image_url, is_primary, display_order)
  SELECT 
    id,
    '/placeholder.svg?height=400&width=600',
    true,
    0
  FROM properties
  WHERE owner_id = sample_user_id AND property_type = 'apartment'
  LIMIT 1;

  INSERT INTO property_images (property_id, image_url, is_primary, display_order)
  SELECT 
    id,
    '/placeholder.svg?height=400&width=600',
    true,
    0
  FROM properties
  WHERE owner_id = sample_user_id AND property_type = 'studio'
  LIMIT 1;

  -- Add sample amenities
  INSERT INTO property_amenities (property_id, amenity)
  SELECT id, unnest(ARRAY['Piscine', 'Jardin', 'Garage', 'Climatisation', 'Sécurité 24/7', 'Internet'])
  FROM properties
  WHERE owner_id = sample_user_id AND property_type = 'villa'
  LIMIT 1;

  INSERT INTO property_amenities (property_id, amenity)
  SELECT id, unnest(ARRAY['Balcon', 'Ascenseur', 'Parking', 'Climatisation', 'Internet'])
  FROM properties
  WHERE owner_id = sample_user_id AND property_type = 'apartment'
  LIMIT 1;

  INSERT INTO property_amenities (property_id, amenity)
  SELECT id, unnest(ARRAY['Meublé', 'Climatisation', 'Internet', 'Cuisine équipée'])
  FROM properties
  WHERE owner_id = sample_user_id AND property_type = 'studio'
  LIMIT 1;
  
  RAISE NOTICE 'Sample data inserted successfully for user %', sample_user_id;
END $$;
