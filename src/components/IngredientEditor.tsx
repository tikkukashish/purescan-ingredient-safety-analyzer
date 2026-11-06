import React from 'react';
import type { ProductCategory } from '../types';
import { Sparkles, Cpu, Utensils, Scissors, Sparkle, HeartPulse, RefreshCw } from 'lucide-react';

interface IngredientEditorProps {
  ingredientsText: string;
  onTextChange: (text: string) => void;
  category: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  useGemini: boolean;
  hasGeminiKey: boolean;
  onToggleGemini: (val: boolean) => void;
  onClear: () => void;
}

export const IngredientEditor: React.FC<IngredientEditorProps> = ({
  ingredientsText,
  onTextChange,
  category,
  onCategoryChange,
  onAnalyze,
  isAnalyzing,
  useGemini,
  hasGeminiKey,
  onToggleGemini,
  onClear
}) => {
  const categories: { id: ProductCategory; label: string; icon: any }[] = [
    { id: 'food', label: 'Food & Nutrition', icon: Utensils },
    { id: 'haircare', label: 'Haircare (Shampoos/Dyes)', icon: Scissors },
    { id: 'skincare', label: 'Skincare (Creams/Serums)', icon: Sparkle },
    { id: 'personal_care', label: 'Personal & Body Care', icon: HeartPulse }
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      {/* Category selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Target Category
          </label>
          <span className="text-[11px] text-slate-500">
            Determines biological exposure route & health thresholds
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/10'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Text Area */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Extracted / Input Ingredients
          </label>
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>{ingredientsText.split(',').filter(x => x.trim()).length} ingredients detected</span>
            {ingredientsText && (
              <button
                type="button"
                onClick={onClear}
                className="text-slate-500 hover:text-rose-400 transition-colors"
              >
                Clear text
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={ingredientsText}
            onChange={(e) => onTextChange(e.target.value)}
            rows={4}
            placeholder="e.g. Water, Sodium Lauryl Sulfate, Dimethicone, Fragrance, Methylparaben, DMDM Hydantoin..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 font-mono transition-all leading-relaxed"
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          You can edit, fix OCR typos, or paste additional ingredients separated by commas or newlines.
        </p>
      </div>

      {/* Analysis Mode & Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/60">
        {/* Toggle between Local Engine and Gemini AI */}
        <div className="flex items-center space-x-2">
          {hasGeminiKey ? (
            <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => onToggleGemini(false)}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                  !useGemini
                    ? 'bg-slate-800 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Local Rules Engine</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleGemini(true)}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                  useGemini
                    ? 'bg-purple-900/60 text-purple-200 font-medium border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Gemini AI (Deep Bio-Reasoning)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800/80">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Analyzing with Local Toxicology Knowledge Base</span>
            </div>
          )}
        </div>

        {/* Submit Analyze Button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!ingredientsText.trim() || isAnalyzing}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Evaluating Biological Impact...</span>
            </>
          ) : (
            <>
              <HeartPulse className="w-4 h-4" />
              <span>Analyze Body Safety (1-10)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
