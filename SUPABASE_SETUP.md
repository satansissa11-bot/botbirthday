# Supabase Setup Guide

Complete step-by-step guide to configure Supabase for the Birthday Gift Generator.

## Prerequisites

- A Supabase account (free tier works)
- This guide assumes you have just created a new Supabase project

## Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or select your existing project
3. Wait for the project to be ready (2-3 minutes)
4. Navigate to **Settings** > **API**
5. Copy the following values:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **anon/public key** (e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, navigate to **SQL Editor**
2. Click **New Query**
3. Copy and paste the complete SQL schema below
4. Click **Run** to execute

### Complete SQL Schema

```sql
-- ============================================
-- BIRTHDAY GIFT GENERATOR - DATABASE SCHEMA
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: birthday_cards
-- ============================================
CREATE TABLE IF NOT EXISTS birthday_cards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  sender_name TEXT,
  message TEXT NOT NULL,
  template TEXT NOT NULL DEFAULT 'romantic',
  photos TEXT[] NOT NULL DEFAULT '{}',
  cover_photo TEXT,
  music_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_birthday_cards_slug ON birthday_cards(slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_birthday_cards_created_at ON birthday_cards(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on birthday_cards table
ALTER TABLE birthday_cards ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations on birthday_cards
-- NOTE: For production, consider implementing proper authentication
CREATE POLICY "Allow all operations on birthday_cards" 
  ON birthday_cards 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- ============================================
-- AUTOMATIC TIMESTAMP TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_birthday_cards_updated_at ON birthday_cards;
CREATE TRIGGER update_birthday_cards_updated_at
  BEFORE UPDATE ON birthday_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================

-- Create storage bucket for birthday photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('birthday-photos', 'birthday-photos', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Policy: Allow public uploads to birthday-photos bucket
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'birthday-photos');

-- Policy: Allow public downloads from birthday-photos bucket
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
USING (bucket_id = 'birthday-photos');

-- Policy: Allow public updates to birthday-photos bucket
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
WITH CHECK (bucket_id = 'birthday-photos');

-- Policy: Allow public deletes from birthday-photos bucket
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'birthday-photos');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify table was created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'birthday_cards'
ORDER BY ordinal_position;

-- Verify storage bucket was created
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'birthday-photos';

-- Verify RLS policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'birthday_cards';
```

## Step 3: Verify Database Setup

After running the SQL, verify everything was created correctly:

### Check Table Structure
```sql
SELECT * FROM birthday_cards LIMIT 0;
```

You should see columns: id, slug, recipient_name, message, template, photos, music_url, created_at, updated_at

### Check Storage Bucket
1. Navigate to **Storage** in the left sidebar
2. You should see a bucket named `birthday-photos`
3. The bucket should be marked as **Public**

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root (same directory as package.json):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the placeholders with your actual Supabase credentials from Step 1.

### Example:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxNTEyMzQ1NiwibWF4IjoxNzE1NzA4NDU2fQ.example
```

## Step 5: Test the Connection

### Test Database Connection

Create a test file to verify your Supabase connection:

```javascript
// test-supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test: Create a test card
    const { data, error } = await supabase
      .from('birthday_cards')
      .insert({
        slug: 'test-connection-' + Date.now(),
        recipient_name: 'Test User',
        message: 'This is a test connection',
        template: 'romantic',
        photos: [],
      })
      .select();

    if (error) throw error;

    console.log('✅ Database connection successful!');
    console.log('✅ Test card created:', data[0]);

    // Clean up test card
    await supabase.from('birthday_cards').delete().eq('id', data[0].id);
    console.log('✅ Test card cleaned up');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
```

Run the test:
```bash
node test-supabase.js
```

### Test Storage Connection

```javascript
// test-storage.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testStorage() {
  try {
    // Create a simple test file
    const testContent = Buffer.from('Test file content');
    const fileName = 'test-' + Date.now() + '.txt';

    // Upload test file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('birthday-photos')
      .upload(fileName, testContent);

    if (uploadError) throw uploadError;

    console.log('✅ Storage upload successful!');

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('birthday-photos')
      .getPublicUrl(fileName);

    console.log('✅ Public URL:', publicUrl);

    // Clean up test file
    await supabase.storage.from('birthday-photos').remove([fileName]);
    console.log('✅ Test file cleaned up');

  } catch (error) {
    console.error('❌ Storage test failed:', error.message);
    process.exit(1);
  }
}

testStorage();
```

Run the test:
```bash
node test-storage.js
```

## Step 6: Configure for Production (Optional)

### For Enhanced Security

If you want to implement proper authentication in production:

```sql
-- Enable authentication-based RLS
ALTER TABLE birthday_cards ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read cards
CREATE POLICY "Allow authenticated read"
  ON birthday_cards
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to create cards
CREATE POLICY "Allow authenticated insert"
  ON birthday_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update their own cards
CREATE POLICY "Allow authenticated update own"
  ON birthday_cards
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = created_by::text);

-- Policy: Allow authenticated users to delete their own cards
CREATE POLICY "Allow authenticated delete own"
  ON birthday_cards
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = created_by::text);
```

### For Storage Security

```sql
-- More restrictive storage policies
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- Authenticated-only policies
CREATE POLICY "Authenticated uploads"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'birthday-photos');

CREATE POLICY "Authenticated downloads"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'birthday-photos');
```

## Step 7: Environment Variables Summary

### Required Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

### Optional Variables
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for admin operations (use with caution)

### For Vercel Deployment
Add these in Vercel project settings > Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 8: Troubleshooting

### Issue: "relation 'birthday_cards' does not exist"
**Solution**: Run the SQL schema from Step 2 in the SQL Editor

### Issue: "bucket not found"
**Solution**: 
1. Go to Storage section in Supabase
2. Manually create bucket named `birthday-photos`
3. Make it public
4. Run the storage policies SQL

### Issue: "new row violates row-level security policy"
**Solution**: 
1. Check RLS policies in SQL Editor: `SELECT * FROM pg_policies WHERE tablename = 'birthday_cards'`
2. Ensure policies allow the operations you need
3. For development, use the permissive policy provided in the schema

### Issue: Photos not uploading
**Solution**:
1. Verify storage bucket exists and is public
2. Check storage policies allow uploads
3. Ensure bucket name matches exactly: `birthday-photos`
4. Check Supabase storage limits (free tier: 1GB)

### Issue: Environment variables not loading
**Solution**:
1. Ensure `.env.local` is in project root
2. Restart development server after adding variables
3. For production, add variables in deployment platform settings

## Step 9: Verify Complete Setup

Run this verification query in SQL Editor:

```sql
-- Complete verification
SELECT 
  'Table exists' as check_item,
  COUNT(*) as status
FROM information_schema.tables 
WHERE table_name = 'birthday_cards'

UNION ALL

SELECT 
  'Storage bucket exists',
  COUNT(*)
FROM storage.buckets 
WHERE id = 'birthday-photos'

UNION ALL

SELECT 
  'RLS enabled',
  COUNT(*)
FROM pg_tables 
WHERE tablename = 'birthday_cards' AND relrowsecurity = true;

-- Expected output: All should return 1
```

## Next Steps

After completing Supabase setup:

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Test the admin dashboard at `http://localhost:3000/admin`
4. Test automation service: `npm run automation`
5. Deploy to Vercel when ready

## Support

If you encounter issues:
- Check Supabase logs: Dashboard > Logs
- Review SQL Editor execution history
- Verify environment variables are set correctly
- Check network connectivity to Supabase
