-- Migration: Add missing columns to birthday_cards table
-- This script adds sender_name and cover_photo columns if they don't exist

-- Add sender_name column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'birthday_cards' 
        AND column_name = 'sender_name'
    ) THEN
        ALTER TABLE birthday_cards ADD COLUMN sender_name TEXT;
    END IF;
END $$;

-- Add cover_photo column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'birthday_cards' 
        AND column_name = 'cover_photo'
    ) THEN
        ALTER TABLE birthday_cards ADD COLUMN cover_photo TEXT;
    END IF;
END $$;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'birthday_cards'
ORDER BY ordinal_position;
