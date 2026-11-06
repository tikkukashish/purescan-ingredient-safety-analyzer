import React, { useState } from 'react';
import type { AnalyzedIngredient, RiskLevel, ProductCategory } from '../types';
import { Search, AlertTriangle, ShieldCheck, ShieldAlert, ChevronDown, ChevronUp, CheckCircle, Info, Apple, Sparkles } from 'lucide-react';

interface IngredientListProps {
  ingredients: AnalyzedIngredient[];
  category?: ProductCategory;
}

export const IngredientList: React.FC<IngredientListProps> = ({ ingredients, category }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filtered = ingredients.filter((item) => {
    const matchesSearch =
      item.originalText.toLowerCase().includes(search.toLowerCase()) ||
      (item.matchedName && item.matchedName.toLowerCase().includes(search.toLowerCase())) ||
      item.bodyImpact.toLowerCase().includes(search.toLowerCase()) ||
      (item.nutrition && item.nutrition.nutritionImpact.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = filter === 'all' || item.riskLevel === filter;

    return matchesSearch && matchesFilter;
  });

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'harmful':
        return {
          bg: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
          label: 'Harmful / Toxic to Body',
          icon: AlertTriangle
        };
      case 'moderate':
        return {
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
          label: 'Moderate Concern',
          icon: ShieldAlert
        };
      case 'safe':
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
          label: 'Safe & Biocompatible',
          icon: ShieldCheck
        };
    }
  };

  const getNutritionPill = (nut: NonNullable<AnalyzedIngredient['nutrition']>) => {
    switch (nut.level) {
      case 'excellent':
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          label: `Whole Food (${nut.nutritionScore.toFixed(1)})`
        };
      case 'good':
        return {
          bg: 'bg-teal-500/15 border-teal-500/30 text-teal-300',
          label: `Nutritious (${nut.nutritionScore.toFixed(1)})`
        };
      case 'neutral':
        return {
          bg: 'bg-slate-800/80 border-slate-700 text-slate-300',
          label: `Neutral (${nut.nutritionScore.toFixed(1)})`
        };
      case 'poor':
        return {
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          label: `Refined (${nut.nutritionScore.toFixed(1)})`
        };
      case 'unhealthy':
        return {
          bg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
          label: `Empty Cal (${nut.nutritionScore.toFixed(1)})`
        };
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Detailed Ingredient Breakdown ({ingredients.length})
          </h3>
          <p className="text-xs text-slate-400">
            Click on any ingredient to view physiological mechanisms{category === 'food' ? ', dietary health & nutrition' : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ingredient..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Risk Level Filter Pills */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({ingredients.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('harmful')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filter === 'harmful'
                  ? 'bg-rose-500/20 text-rose-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-rose-300'
              }`}
            >
              Harmful ({ingredients.filter(x => x.riskLevel === 'harmful').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('moderate')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filter === 'moderate'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              Moderate ({ingredients.filter(x => x.riskLevel === 'moderate').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('safe')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filter === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              Safe ({ingredients.filter(x => x.riskLevel === 'safe').length})
            </button>
          </div>
        </div>
      </div>

      {/* Ingredient Items */}
      <div className="space-y-2 pt-1">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No ingredients matching filter criteria.
          </div>
        ) : (
          filtered.map((item, idx) => {
            const badge = getRiskBadge(item.riskLevel);
            const BadgeIcon = badge.icon;
            const isExpanded = expandedIndex === idx;
            const nutritionPill = item.nutrition ? getNutritionPill(item.nutrition) : null;

            return (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="p-4 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-4">
                    <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-400 shrink-0">
                      {idx + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.matchedName || item.originalText}
                        </h4>
                        {item.matchedName && item.matchedName !== item.originalText && (
                          <span className="text-[10px] text-slate-500 truncate hidden sm:inline">
                            (from "{item.originalText}")
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5 max-w-md md:max-w-xl">
                        {item.bodyImpact}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {/* Nutrition pill if food */}
                    {nutritionPill && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border flex items-center space-x-1 ${nutritionPill.bg}`}>
                        <Apple className="w-2.5 h-2.5 shrink-0" />
                        <span className="hidden sm:inline">{nutritionPill.label}</span>
                      </span>
                    )}

                    {/* Safety badge */}
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border flex items-center space-x-1 ${badge.bg}`}>
                      <BadgeIcon className="w-3 h-3 shrink-0" />
                      <span className="hidden sm:inline">{badge.label}</span>
                    </span>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </div>
                </div>

                {/* Expanded Biological & Nutrition Detail Drawer */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-slate-900/40 border-t border-slate-800/60 space-y-3 text-xs">
                    {/* Body physiological safety impact */}
                    <div>
                      <h5 className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                        <Info className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Physiological Effect on Human Body</span>
                      </h5>
                      <p className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        {item.bodyImpact}
                      </p>
                    </div>

                    {/* Nutritional Value section for food items */}
                    {item.nutrition && (
                      <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-emerald-300 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                            <Apple className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Nutritional Health Value</span>
                          </h5>
                          <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                            Score: {item.nutrition.nutritionScore.toFixed(1)} / 10 ({item.nutrition.level})
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {item.nutrition.nutritionImpact}
                        </p>
                        {item.nutrition.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.nutrition.tags.map((ntag) => (
                              <span
                                key={ntag}
                                className="px-2 py-0.5 bg-slate-950 text-slate-300 rounded text-[10px] border border-slate-800 flex items-center space-x-1"
                              >
                                <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                                <span>{ntag}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                          Health Impact Classification
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md text-[10px] font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Regulatory Notes */}
                    {item.regulatoryNotes && (
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-[11px] flex items-start space-x-2">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>
                          <strong>Regulatory Status:</strong> {item.regulatoryNotes}
                        </span>
                      </div>
                    )}

                    {/* Alternatives */}
                    {item.cleanAlternatives && item.cleanAlternatives.length > 0 && (
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                          Clean Body-Safe Alternatives:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.cleanAlternatives.map((alt) => (
                            <span
                              key={alt}
                              className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-md text-[10px] font-medium flex items-center space-x-1"
                            >
                              <CheckCircle className="w-2.5 h-2.5" />
                              <span>{alt}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
