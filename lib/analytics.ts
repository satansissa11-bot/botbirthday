import { supabase } from '@/lib/supabase';
import { CardAnalytics, CardView, AnalyticsStats } from '@/lib/types';

// Generate a unique visitor ID using localStorage
export function getVisitorId(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
}

// Detect device type
export function getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

// Track card view
export async function trackCardView(cardId: string): Promise<void> {
  try {
    const visitorId = getVisitorId();
    const deviceType = getDeviceType();

    // Record the view
    const { error: viewError } = await supabase.from('card_views').insert({
      card_id: cardId,
      visitor_id: visitorId,
      device_type: deviceType,
      viewed_at: new Date().toISOString(),
    });

    if (viewError && viewError.code !== '23505') { // Ignore duplicate key errors
      console.error('Error tracking view:', viewError);
      return;
    }

    // Update or create analytics record
    const { data: existingAnalytics } = await supabase
      .from('card_analytics')
      .select('*')
      .eq('card_id', cardId)
      .single();

    if (existingAnalytics) {
      // Update existing analytics
      const { error: updateError } = await supabase
        .from('card_analytics')
        .update({
          total_views: existingAnalytics.total_views + 1,
          last_viewed: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('card_id', cardId);

      if (updateError) {
        console.error('Error updating analytics:', updateError);
      }
    } else {
      // Create new analytics record
      const { error: insertError } = await supabase.from('card_analytics').insert({
        card_id: cardId,
        total_views: 1,
        unique_visitors: 1,
        last_viewed: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('Error creating analytics:', insertError);
      }
    }
  } catch (error) {
    console.error('Error tracking card view:', error);
  }
}

// Get overall analytics stats
export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  try {
    const { data: cards } = await supabase.from('birthday_cards').select('id');
    const { data: analytics } = await supabase.from('card_analytics').select('total_views, unique_visitors');

    const totalCards = cards?.length || 0;
    const totalViews = analytics?.reduce((sum, a) => sum + a.total_views, 0) || 0;
    const totalUniqueVisitors = analytics?.reduce((sum, a) => sum + a.unique_visitors, 0) || 0;
    const averageViewsPerCard = totalCards > 0 ? totalViews / totalCards : 0;

    return {
      totalCards,
      totalViews,
      totalUniqueVisitors,
      averageViewsPerCard: Math.round(averageViewsPerCard * 100) / 100,
    };
  } catch (error) {
    console.error('Error getting analytics stats:', error);
    return {
      totalCards: 0,
      totalViews: 0,
      totalUniqueVisitors: 0,
      averageViewsPerCard: 0,
    };
  }
}

// Get most viewed cards
export async function getMostViewedCards(limit: number = 10): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('card_analytics')
      .select(`
        *,
        birthday_cards!inner (
          id,
          slug,
          recipient_name,
          template,
          created_at
        )
      `)
      .order('total_views', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting most viewed cards:', error);
    return [];
  }
}

// Get recent views
export async function getRecentViews(limit: number = 20): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('card_views')
      .select(`
        *,
        birthday_cards!inner (
          id,
          slug,
          recipient_name,
          template
        )
      `)
      .order('viewed_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting recent views:', error);
    return [];
  }
}

// Get views by device type
export async function getViewsByDevice(): Promise<{ mobile: number; desktop: number; tablet: number }> {
  try {
    const { data, error } = await supabase
      .from('card_views')
      .select('device_type');

    if (error) throw error;

    const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
    data?.forEach((view) => {
      const deviceType = view.device_type as keyof typeof deviceCounts;
      deviceCounts[deviceType]++;
    });

    return deviceCounts;
  } catch (error) {
    console.error('Error getting views by device:', error);
    return { mobile: 0, desktop: 0, tablet: 0 };
  }
}

// Get views over time (last 7 days)
export async function getViewsOverTime(): Promise<{ date: string; views: number }[]> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await supabase
      .from('card_views')
      .select('viewed_at')
      .gte('viewed_at', sevenDaysAgo.toISOString())
      .order('viewed_at', { ascending: true });

    if (error) throw error;

    // Group by date
    const viewsByDate: { [key: string]: number } = {};
    data?.forEach((view) => {
      const date = new Date(view.viewed_at).toISOString().split('T')[0];
      viewsByDate[date] = (viewsByDate[date] || 0) + 1;
    });

    // Fill in missing dates
    const result: { date: string; views: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      result.push({
        date: dateStr,
        views: viewsByDate[dateStr] || 0,
      });
    }

    return result;
  } catch (error) {
    console.error('Error getting views over time:', error);
    return [];
  }
}
