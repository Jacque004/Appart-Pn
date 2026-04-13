# Scripts SQL AppartPN — Supabase

Dans **Supabase → SQL Editor**, exécutez dans cet ordre :

1. `01-create-tables.sql`
2. `06-create-profile-trigger.sql`
3. `02-enable-rls.sql`
4. `05-create-storage-buckets.sql`
5. `03-seed-data.sql` (optionnel, après inscription d’un premier utilisateur)

Si `properties` existait déjà sans visite virtuelle : `04-add-virtual-tour.sql`  
(avec `01` à jour, `virtual_tour_url` est déjà créée pour les nouvelles bases.)

**Tout en une fois :** `all-in-one.sql` (sans seed).

**Nettoyage démo :** `07-cleanup-properties.sql`

Ensuite : URLs auth (`http://localhost:5173`) + `.env` avec les clés Supabase.
