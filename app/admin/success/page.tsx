'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, PartyPopper, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const dynamic = 'force-dynamic';

function CardSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cardUrl, setCardUrl] = useState('');
  const [cardTitle, setCardTitle] = useState('');

  useEffect(() => {
    const url = searchParams.get('url');
    const title = searchParams.get('title');
    
    if (url) {
      setCardUrl(url);
    } else {
      // If no URL provided, redirect to cards page
      router.push('/admin/cards');
    }
    
    if (title) {
      setCardTitle(title);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
              <div className="relative bg-green-100 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Card Created Successfully! 🎉
            </h1>
            <p className="text-gray-600">
              Your birthday card is ready to share
            </p>
          </div>

          {/* Card URL Display */}
          {cardUrl && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={cardUrl}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                />
              </div>
            </div>
          )}

          {/* Share Buttons */}
          {cardUrl && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Share Your Card
              </label>
              <ShareButtons cardUrl={cardUrl} cardTitle={cardTitle} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Create Another Card
            </Link>
            <Link
              href="/admin/cards"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <PartyPopper className="w-5 h-5" />
              View All Cards
            </Link>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Share via WhatsApp for instant delivery</li>
              <li>• Copy the link to share on any platform</li>
              <li>• Open the card to preview before sharing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    }>
      <CardSuccessContent />
    </Suspense>
  );
}
