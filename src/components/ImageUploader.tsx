import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { PRESET_SAMPLES } from '../data/ingredientsDatabase';
import type { OcrProgress } from '../services/ocrService';
import type { ProductCategory } from '../types';

interface ImageUploaderProps {
  onImageSelected: (dataUrl: string) => void;
  onPresetSelected: (ingredientsText: string, category: ProductCategory) => void;
  onCameraClick: () => void;
  isProcessingOcr: boolean;
  ocrProgress: OcrProgress | null;
  selectedImageUrl: string | null;
  onClearImage: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  onPresetSelected,
  onCameraClick,
  isProcessingOcr,
  ocrProgress,
  selectedImageUrl,
  onClearImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImageSelected(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 transition-all text-center flex flex-col items-center justify-center ${
          isDragOver
            ? 'border-emerald-500 bg-emerald-500/10'
            : selectedImageUrl
            ? 'border-slate-700 bg-slate-900/60'
            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {selectedImageUrl ? (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="relative max-h-64 rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
              <img
                src={selectedImageUrl}
                alt="Selected Ingredients"
                className="max-h-64 w-auto object-contain rounded-2xl"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={onClearImage}
                  className="px-3.5 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-medium rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>

            {isProcessingOcr && ocrProgress && (
              <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span>{ocrProgress.message}</span>
                  </span>
                  <span className="font-mono text-emerald-400">{ocrProgress.percent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-200"
                    style={{ width: `${ocrProgress.percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Upload or snap an ingredients label
            </h3>
            <p className="text-xs text-slate-400 max-w-md mb-6">
              Drop an image of any food nutrition label, shampoo, conditioner, or skincare ingredient list. PureScan extracts text & evaluates body safety.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Browse Photo</span>
              </button>

              <button
                type="button"
                onClick={onCameraClick}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Open Camera</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Preset Demo Samples */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Try Instant Demo Samples
            </h4>
          </div>
          <span className="text-[11px] text-slate-500">
            Click any card to analyze immediately
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_SAMPLES.map((sample) => {
            const isHarmful = sample.badge.includes('Toxic') || sample.badge.includes('Irritant') || sample.badge.includes('Hazard');
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onPresetSelected(sample.ingredientsText, sample.category)}
                className="text-left p-3.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-0.5 bg-slate-800 rounded-md">
                      {sample.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                        isHarmful
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {isHarmful ? (
                        <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
                      ) : (
                        <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                      )}
                      {sample.badge}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-xs group-hover:text-emerald-400 transition-colors">
                    {sample.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {sample.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-300">
                  <span>Score: <strong className="text-slate-200">{sample.expectedScore}</strong></span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
