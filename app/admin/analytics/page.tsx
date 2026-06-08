'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Eye, Users, TrendingUp, Calendar, Smartphone, Monitor, Tablet } from 'lucide-react';
import { getAnalyticsStats, getMostViewedCards, getRecentViews, getViewsByDevice, getViewsOverTime } from '@/lib/analytics';
import { AnalyticsStats } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [mostViewedCards, setMostViewedCards] = useState<any[]>([]);
  const [recentViews, setRecentViews] = useState<any[]>([]);
  const [deviceData, setDeviceData] = useState<{ mobile: number; desktop: number; tablet: number }>({ mobile: 0, desktop: 0, tablet: 0 });
  const [viewsOverTime, setViewsOverTime] = useState<{ date: string; views: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [statsData, mostViewedData, recentViewsData, deviceDataResult, viewsOverTimeData] = await Promise.all([
        getAnalyticsStats(),
        getMostViewedCards(10),
        getRecentViews(20),
        getViewsByDevice(),
        getViewsOverTime(),
      ]);

      setStats(statsData);
      setMostViewedCards(mostViewedData);
      setRecentViews(recentViewsData);
      setDeviceData(deviceDataResult);
      setViewsOverTime(viewsOverTimeData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const deviceChartData = [
    { name: 'Mobile', value: deviceData.mobile, color: '#8B5CF6' },
    { name: 'Desktop', value: deviceData.desktop, color: '#3B82F6' },
    { name: 'Tablet', value: deviceData.tablet, color: '#10B981' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your birthday card performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cards"
          value={stats?.totalCards || 0}
          icon={<Calendar className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Total Views"
          value={stats?.totalViews || 0}
          icon={<Eye className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Unique Visitors"
          value={stats?.totalUniqueVisitors || 0}
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Avg Views/Card"
          value={stats?.averageViewsPerCard || 0}
          icon={<TrendingUp className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Views Over Time (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device Breakdown Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed Cards */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Viewed Cards</h3>
          <div className="space-y-3">
            {mostViewedCards.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No views yet</p>
            ) : (
              mostViewedCards.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.birthday_cards.recipient_name}</p>
                    <p className="text-sm text-gray-600">{item.birthday_cards.template}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{item.total_views}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Views */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Views</h3>
          <div className="space-y-3">
            {recentViews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No views yet</p>
            ) : (
              recentViews.map((view) => (
                <div key={view.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {view.device_type === 'mobile' && <Smartphone className="w-4 h-4 text-purple-600" />}
                    {view.device_type === 'desktop' && <Monitor className="w-4 h-4 text-blue-600" />}
                    {view.device_type === 'tablet' && <Tablet className="w-4 h-4 text-green-600" />}
                    <div>
                      <p className="font-medium text-gray-900">{view.birthday_cards.recipient_name}</p>
                      <p className="text-sm text-gray-600">{new Date(view.viewed_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) {
  const colorClasses = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`${colorClasses[color as keyof typeof colorClasses]} p-3 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
