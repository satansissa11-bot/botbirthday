'use client';

import { useState } from 'react';
import { MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';

interface ShareButtonsProps {
  cardUrl: string;
  cardTitle?: string;
}

export default function ShareButtons({ cardUrl, cardTitle = 'Birthday Card' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `Check out this birthday card for ${cardTitle}! 🎉\n\n${cardUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* WhatsApp Share Button */}
      <button
        onClick={handleWhatsAppShare}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span>WhatsApp</span>
      </button>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Open Card Button */}
      <a
        href={cardUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        aria-label="Open card in new tab"
      >
        <ExternalLink className="w-5 h-5" />
        <span>Open Card</span>
      </a>
    </div>
  );
}
