'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  coverPhoto?: string;
  onCoverPhotoChange?: (coverPhoto: string) => void;
}

export default function PhotoUpload({ photos, onPhotosChange, coverPhoto, onCoverPhotoChange }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newPhotos: string[] = [...photos];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('birthday-photos')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('birthday-photos')
          .getPublicUrl(filePath);

        newPhotos.push(publicUrl);
      }

      onPhotosChange(newPhotos);
    } catch (error) {
      console.error('Error uploading photos:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
    
    // Remove cover photo if it was the deleted photo
    if (coverPhoto === photos[index] && onCoverPhotoChange) {
      onCoverPhotoChange('');
    }
  };

  const setAsCoverPhoto = (photo: string) => {
    if (onCoverPhotoChange) {
      onCoverPhotoChange(photo);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all',
            uploading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          )}
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload Photos
            </>
          )}
        </label>
        <span className="text-sm text-gray-600">
          {photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded
        </span>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group h-32">
              <Image
                src={photo}
                alt={`Uploaded photo ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
              {onCoverPhotoChange && (
                <button
                  onClick={() => setAsCoverPhoto(photo)}
                  className={cn(
                    'absolute bottom-2 left-2 px-2 py-1 text-xs rounded-full transition-all',
                    coverPhoto === photo
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/80 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100'
                  )}
                >
                  {coverPhoto === photo ? 'Cover' : 'Set Cover'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {photos.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No photos uploaded yet</p>
          <p className="text-sm text-gray-400 mt-1">Click above to upload photos</p>
        </div>
      )}
    </div>
  );
}
