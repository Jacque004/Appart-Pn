import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Variables d'environnement manquantes!")
  console.error("Assurez-vous que SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont définies.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

console.log("🚀 Début de la configuration de la base de données AppartPN...\n")

// SQL pour créer les tables
const createTablesSql = `
-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('owner', 'tenant', 'both')) DEFAULT 'tenant',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT CHECK (property_type IN ('villa', 'apartment', 'studio')) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  surface_area INTEGER NOT NULL,
  address TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  city TEXT DEFAULT 'Pointe-Noire',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create property_amenities table
CREATE TABLE IF NOT EXISTS property_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  amenity TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  tenant_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_owner ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_neighborhood ON properties(neighborhood);
CREATE INDEX IF NOT EXISTS idx_properties_available ON properties(is_available);
CREATE INDEX IF NOT EXISTS idx_property_images_property ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_appointments_property ON appointments(property_id);
CREATE INDEX IF NOT EXISTS idx_appointments_tenant ON appointments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_owner ON appointments(owner_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
`

const enableRlsSql = `
-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Properties policies
CREATE POLICY "Properties are viewable by everyone"
  ON properties FOR SELECT
  USING (true);

CREATE POLICY "Owners can insert own properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own properties"
  ON properties FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own properties"
  ON properties FOR DELETE
  USING (auth.uid() = owner_id);

-- Property images policies
CREATE POLICY "Property images are viewable by everyone"
  ON property_images FOR SELECT
  USING (true);

CREATE POLICY "Property owners can manage images"
  ON property_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Property amenities policies
CREATE POLICY "Property amenities are viewable by everyone"
  ON property_amenities FOR SELECT
  USING (true);

CREATE POLICY "Property owners can manage amenities"
  ON property_amenities FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_amenities.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Appointments policies
CREATE POLICY "Users can view their own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() = owner_id);

CREATE POLICY "Tenants can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Users can update their own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = tenant_id OR auth.uid() = owner_id);

-- Favorites policies
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);
`

async function setupDatabase() {
  try {
    console.log("📋 Étape 1/3: Création des tables...")
    const { error: createError } = await supabase.rpc("exec_sql", { sql: createTablesSql })

    if (createError) {
      console.error("❌ Erreur lors de la création des tables:", createError.message)
      console.log("\n💡 Note: Supabase ne permet pas d'exécuter du SQL arbitraire via l'API.")
      console.log("Veuillez exécuter les scripts SQL manuellement via le SQL Editor de Supabase.")
      process.exit(1)
    }

    console.log("✅ Tables créées avec succès!\n")

    console.log("🔒 Étape 2/3: Activation de Row Level Security...")
    const { error: rlsError } = await supabase.rpc("exec_sql", { sql: enableRlsSql })

    if (rlsError) {
      console.error("❌ Erreur lors de l'activation de RLS:", rlsError.message)
      process.exit(1)
    }

    console.log("✅ Row Level Security activé!\n")

    console.log("✅ Configuration terminée avec succès!")
    console.log("\n🎉 Votre base de données AppartPN est prête!")
    console.log("Vous pouvez maintenant créer des comptes et publier des annonces.")
  } catch (error) {
    console.error("❌ Erreur inattendue:", error.message)
    console.log("\n💡 Solution alternative:")
    console.log("Exécutez les scripts SQL manuellement dans cet ordre:")
    console.log("1. scripts/01-create-tables.sql")
    console.log("2. scripts/02-enable-rls.sql")
    console.log("3. scripts/03-seed-data.sql")
    process.exit(1)
  }
}

setupDatabase()
