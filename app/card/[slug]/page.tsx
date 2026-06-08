'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates'; // Import to register templates
import Slideshow from '@/components/Slideshow';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import { Cake, Heart, Star } from 'lucide-react';
import LoadingAnimation from '@/components/animations/LoadingAnimation';
import PageTransition from '@/components/animations/PageTransition';
import TypewriterText from '@/components/animations/TypewriterText';
import AnimeEffects from '@/components/animations/AnimeEffects';
import GamingEffects from '@/components/animations/GamingEffects';
import LuxuryEffects from '@/components/animations/LuxuryEffects';
import RomanticEffects from '@/components/animations/RomanticEffects';
import DarkEffects from '@/components/animations/DarkEffects';

export default function CardPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [card, setCard] = useState<BirthdayCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchCard();
  }, [slug]);

  useEffect(() => {
    if (card && !showConfetti) {
      setShowConfetti(true);
    }
  }, [card]);

  const fetchCard = async () => {
    try {
      const { data, error } = await supabase
        .from('birthday_cards')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setCard(data);
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingAnimation size={60} color="#8B5CF6" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Card Not Found</h1>
          <p className="text-gray-600">The birthday card you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const template = getTemplate(card.template) || getTemplate('romantic');

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Not Found</h1>
          <p className="text-gray-600">The selected template is not available.</p>
        </div>
      </div>
    );
  }

  // Get template-specific effects component
  const getTemplateEffects = (templateId: string) => {
    switch (templateId) {
      case 'anime':
      case 'naruto':
        return <AnimeEffects enabled />;
      case 'gaming':
      case 'minecraft':
        return <GamingEffects enabled />;
      case 'luxury':
      case 'wedding':
        return <LuxuryEffects enabled />;
      case 'romantic':
        return <RomanticEffects enabled />;
      case 'dark':
        return <DarkEffects enabled />;
      default:
        return null;
    }
  };

  // Get decorative elements based on template
  const getDecorativeIcon = (type: string) => {
    switch (type) {
      case 'hearts':
        return Heart;
      case 'stars':
        return Star;
      case 'confetti':
        return Cake;
      default:
        return Star;
    }
  };

  const DecorativeIcon = template.decorativeElements?.enabled 
    ? getDecorativeIcon(template.decorativeElements.type)
    : null;

  return (
    <PageTransition>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background: template.backgroundEffects?.value || template.colors.background,
          fontFamily: template.fonts.heading,
        }}
      >
        {showConfetti && <Confetti />}
        <MusicPlayer musicUrl={card.music_url || template.music?.defaultUrl} />

        {/* Template-specific effects */}
        {getTemplateEffects(template.id)}

        {/* Decorative Elements */}
        {template.decorativeElements?.enabled && DecorativeIcon && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 opacity-20">
              <DecorativeIcon className="w-16 h-16 text-white animate-pulse" />
            </div>
            <div className="absolute top-20 right-20 opacity-20">
              <DecorativeIcon className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="absolute bottom-20 left-20 opacity-20">
              <DecorativeIcon className="w-20 h-20 text-white animate-pulse" />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <div className="text-center py-8 px-4">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in"
              style={{ 
                color: template.colors.text,
                fontFamily: template.fonts.heading,
              }}
            >
              Happy Birthday!
            </h1>
            <h2
              className="text-2xl md:text-4xl font-semibold animate-slide-up"
              style={{ 
                color: template.colors.accent,
                fontFamily: template.fonts.heading,
              }}
            >
              <TypewriterText text={card.recipient_name} speed={100} />
            </h2>
          </div>

          {/* Slideshow */}
          <div className="flex-1 px-4 pb-4">
            <div className="max-w-6xl mx-auto h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
              <Slideshow photos={card.photos} autoPlay={true} interval={4000} />
            </div>
          </div>

          {/* Message */}
          <div className="px-4 py-8">
            <div 
              className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 shadow-xl"
              style={{
                backgroundColor: template.colors.overlay || 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p
                className="text-lg md:text-xl text-center leading-relaxed"
                style={{ 
                  color: template.colors.text,
                  fontFamily: template.fonts.body,
                }}
              >
                {card.message}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-4 px-4">
            <p
              className="text-sm opacity-70"
              style={{ 
                color: template.colors.text,
                fontFamily: template.fonts.body,
              }}
            >
              Made with ❤️
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
