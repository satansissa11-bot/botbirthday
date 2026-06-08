-- Create card_analytics table
CREATE TABLE IF NOT EXISTS card_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID NOT NULL REFERENCES birthday_cards(id) ON DELETE CASCADE,
  total_views INTEGER NOT NULL DEFAULT 0,
  unique_visitors INTEGER NOT NULL DEFAULT 0,
  last_viewed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(card_id)
);

-- Create card_views table
CREATE TABLE IF NOT EXISTS card_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID NOT NULL REFERENCES birthday_cards(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL,
  device_type TEXT NOT NULL CHECK (device_type IN ('mobile', 'desktop', 'tablet')),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(card_id, visitor_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_card_views_card_id ON card_views(card_id);
CREATE INDEX IF NOT EXISTS idx_card_views_viewed_at ON card_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_card_analytics_total_views ON card_analytics(total_views DESC);

-- Enable Row Level Security
ALTER TABLE card_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_views ENABLE ROW LEVEL SECURITY;

-- Create policies for card_analytics
CREATE POLICY "Anyone can view card_analytics"
  ON card_analytics FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert card_analytics"
  ON card_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update card_analytics"
  ON card_analytics FOR UPDATE
  USING (true);

-- Create policies for card_views
CREATE POLICY "Anyone can view card_views"
  ON card_views FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert card_views"
  ON card_views FOR INSERT
  WITH CHECK (true);

-- Create function to update card_analytics when a new view is inserted
CREATE OR REPLACE FUNCTION update_card_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO card_analytics (card_id, total_views, unique_visitors, last_viewed)
  VALUES (NEW.card_id, 1, 1, NEW.viewed_at)
  ON CONFLICT (card_id) DO UPDATE SET
    total_views = card_analytics.total_views + 1,
    unique_visitors = card_analytics.unique_visitors + 1,
    last_viewed = NEW.viewed_at,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS on_card_view_insert ON card_views;
CREATE TRIGGER on_card_view_insert
  AFTER INSERT ON card_views
  FOR EACH ROW
  EXECUTE FUNCTION update_card_analytics();
