-- Script pour supprimer toutes les propriétés existantes
-- Utilisez ce script si vous voulez supprimer toutes les données de test

-- Supprimer toutes les données liées aux propriétés
DELETE FROM favorites;
DELETE FROM appointments;
DELETE FROM property_amenities;
DELETE FROM property_images;
DELETE FROM properties;

-- Afficher un message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Toutes les propriétés et données associées ont été supprimées avec succès.';
END $$;
