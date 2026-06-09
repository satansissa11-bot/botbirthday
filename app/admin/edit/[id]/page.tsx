'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BirthdayCard } from '@/lib/types';
import { getAllTemplates } from '@/lib/templateRegistry';
import '@/templates'; // Import to register templates
import PhotoUpload from '@/components/PhotoUpload';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function EditCard() {
  const router = useRouter();
  const params = useParams();
  const cardId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [card, setCard] = useState<BirthdayCard | null>(null);
  const [formData, setFormData] = useState({
    recipient_name: '',
    sender_name: '',
    message: '',
    template: 'romantic',
    photos: [] as string[],
    cover_photo: '',
    music_url: '',
  });

  const fetchCard = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('birthday_cards')
        .select('*')
        .eq('id', cardId)
        .single();

      if (error) throw error;

      setCard(data);
      setFormData({
        recipient_name: data.recipient_name,
        sender_name: data.sender_name || '',
        message: data.message,
        template: data.template,
        photos: data.photos,
        cover_photo: data.cover_photo || '',
        music_url: data.music_url || '',
      });
    } catch (error) {
      console.error('Error fetching card:', error);
      alert('Error loading card. Please try again.');
      router.push('/admin/cards');
    } finally {
      setLoading(false);
    }
  }, [cardId, router]);

  useEffect(() => {
    // Load templates from registry
    const loadedTemplates = getAllTemplates();
    setTemplates(loadedTemplates);
    fetchCard();
  }, [fetchCard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('birthday_cards')
        .update({
          recipient_name: formData.recipient_name,
          sender_name: formData.sender_name || null,
          message: formData.message,
          template: formData.template,
          photos: formData.photos,
          cover_photo: formData.cover_photo || null,
          music_url: formData.music_url || null,
        })
        .eq('id', cardId);

      if (error) throw error;

      router.push('/admin/cards');
    } catch (error) {
      console.error('Error updating card:', error);
      alert('Error updating card. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/cards"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cards
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Birthday Card</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
        {/* Recipient Name */}
        <div>
          <label htmlFor="recipient_name" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Name *
          </label>
          <input
            type="text"
            id="recipient_name"
            required
            value={formData.recipient_name}
            onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Sender Name */}
        <div>
          <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name (optional)
          </label>
          <input
            type="text"
            id="sender_name"
            value={formData.sender_name}
            onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Birthday Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Birthday Message *
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Template Selection */}
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
            Choose Template *
          </label>
          <select
            id="template"
            required
            value={formData.template}
            onChange={(e) => setFormData({ ...formData, template: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name} - {template.description}
              </option>
            ))}
          </select>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Photos
          </label>
          <PhotoUpload
            photos={formData.photos}
            onPhotosChange={(photos) => setFormData({ ...formData, photos })}
            coverPhoto={formData.cover_photo}
            onCoverPhotoChange={(coverPhoto) => setFormData({ ...formData, cover_photo: coverPhoto })}
          />
        </div>

        {/* Music URL */}
        <div>
          <label htmlFor="music_url" className="block text-sm font-medium text-gray-700 mb-2">
            Background Music URL (optional)
          </label>
          <input
            type="url"
            id="music_url"
            value={formData.music_url}
            onChange={(e) => setFormData({ ...formData, music_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://example.com/music.mp3"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
