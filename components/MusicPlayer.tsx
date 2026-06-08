'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl?: string;
  canPlay?: boolean;
}

export default function MusicPlayer({ musicUrl, canPlay = true }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.5;
    }
  }, [isMuted]);

  useEffect(() => {
    if (canPlay && audioRef.current && !isPlaying) {
      // Auto-play when gift is opened
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play was blocked, user needs to click play
      });
    }
  }, [canPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!musicUrl) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} loop src={musicUrl} />
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-gray-700" />
          ) : (
            <Play className="w-5 h-5 text-gray-700" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-gray-700" />
          ) : (
            <Volume2 className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}
