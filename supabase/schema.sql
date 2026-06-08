-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create birthday_cards table
CREATE TABLE birthday_cards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  message TEXT NOT NULL,
  template TEXT NOT NULL DEFAULT 'romantic',
  photos TEXT[] NOT NULL DEFAULT '{}',
  music_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_birthday_cards_slug ON birthday_cards(slug);

-- Create index on created_at for sorting
CREATE INDEX idx_birthday_cards_created_at ON birthday_cards(created_at DESC);

-- Add RLS (Row Level Security)
ALTER TABLE birthday_cards ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on birthday_cards" 
  ON birthday_cards 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_birthday_cards_updated_at
  BEFORE UPDATE ON birthday_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
