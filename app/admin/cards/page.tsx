'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { BirthdayCard } from '@/lib/types';
import { Edit, Trash2, Eye, Plus, BarChart3, Bot } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function AllCards() {
  const [cards, setCards] = useState<BirthdayCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('birthday_cards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Handle photos array - might be returned as JSON string from PostgreSQL
      const processedCards = (data || []).map(card => {
        let processedPhotos = card.photos;
        if (typeof card.photos === 'string') {
          try {
            processedPhotos = JSON.parse(card.photos);
          } catch (e) {
            console.error('Failed to parse photos JSON:', e);
            processedPhotos = [];
          }
        }
        return {
          ...card,
          photos: processedPhotos
        };
      });
      
      setCards(processedCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      const { error } = await supabase.from('birthday_cards').delete().eq('id', id);
      if (error) throw error;
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Error deleting card. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Birthday Cards</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/analytics"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>
          <Link
            href="/admin/automation"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Bot className="w-5 h-5" />
            Automation
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New
          </Link>
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No birthday cards created yet</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 mt-4 text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-5 h-5" />
            Create your first card
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow overflow-hidden">
              {card.photos.length > 0 && (
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={card.photos[0]}
                    alt={card.recipient_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {card.recipient_name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created: {formatDate(card.created_at)}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {card.message}
                </p>
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/card/${card.slug}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <Link
                    href={`/admin/edit/${card.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    aria-label="Delete card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
