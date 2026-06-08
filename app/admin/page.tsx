'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';
import { getAllTemplates } from '@/lib/templateRegistry';
import '@/templates'; // Import to register templates
import PhotoUpload from '@/components/PhotoUpload';
import { Save, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CreateCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    recipient_name: '',
    message: '',
    template: 'romantic',
    photos: [] as string[],
    music_url: '',
  });

  useEffect(() => {
    // Load templates from registry
    const loadedTemplates = getAllTemplates();
    setTemplates(loadedTemplates);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = generateSlug(formData.recipient_name);

      const { error } = await supabase.from('birthday_cards').insert({
        slug,
        recipient_name: formData.recipient_name,
        message: formData.message,
        template: formData.template,
        photos: formData.photos,
        music_url: formData.music_url || null,
      });

      if (error) throw error;

      router.push(`/admin/cards`);
    } catch (error) {
      console.error('Error creating card:', error);
      alert('Error creating card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Birthday Card</h1>
      
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
            placeholder="Enter recipient's name"
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
            placeholder="Write a heartfelt birthday message..."
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
          <p className="mt-1 text-sm text-gray-500">
            Enter a URL to an audio file for background music
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Create Card
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
