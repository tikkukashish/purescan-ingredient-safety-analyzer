import React from 'react';
import type { NutritionalSummary } from '../types';
import { Apple, Sparkles, AlertCircle, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

interface NutritionalHealthCardProps {
  summary: NutritionalSummary;
}

export const NutritionalHealthCard: React.FC<NutritionalHealthCardProps> = ({ summary }) => {
  const {
    score,
    label,
    description,
    excellentCount,
    goodCount,
    neutralCount,
    poorCount,
    unhealthyCount,
    topNutritionTags,
    topConcernTags,
    healthTips
  } = summary;

  const getScoreTheme = (val: number) => {
    if (val >= 8.5) {
      return {
        stroke: '#10b981', // emerald
        badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        barBg: 'from-emerald-500 to-teal-400',
        text: 'text-emerald-400'
      };
    } else if (val >= 7.0) {
      return {
        stroke: '#84cc16', // lime
        badgeBg: 'bg-lime-500/15 border-lime-500/30 text-lime-300',
        barBg: 'from-lime-500 to-emerald-400',
        text: 'text-lime-400'
      };
    } else if (val >= 5.0) {
      return {
        stroke: '#eab308', // amber
        badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        barBg: 'from-amber-500 to-yellow-400',
        text: 'text-amber-400'
      };
    } else if (val >= 3.0) {
      return {
        stroke: '#f97316', // orange
        badgeBg: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
        barBg: 'from-orange-500 to-amber-400',
        text: 'text-orange-400'
      };
    } else {
      return {
        stroke: '#ef4444', // red
        badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
        barBg: 'from-rose-500 to-red-400',
        text: 'text-rose-400'
      };
    }
  };

  const theme = getScoreTheme(score);

  // SVG Gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(10, (score / 10) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/10">
            <Apple className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Nutritional Health & Wholesomeness
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                Food Nutrition
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates if this food actively nourishes your body with whole nutrients vs empty calories
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Safe ≠ Nutritious</span>
        </div>
      </div>

      {/* Main Score & Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Score Dial */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#1e293b"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 10px ${theme.stroke}35)`
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white tracking-tight">
                {score.toFixed(1)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Nutrient Score
              </span>
            </div>
          </div>

          <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}`}>
            {label}
          </div>
        </div>

        {/* Narrative & Distribution */}
        <div className="lg:col-span-8 space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {description}
          </p>

          {/* Ingredient Quality Breakdown Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Ingredient Nutrition Breakdown</span>
              <span>
                {excellentCount + goodCount} wholesome / {poorCount + unhealthyCount} depleted
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <div className="font-bold text-sm text-emerald-400">{excellentCount}</div>
                <div className="truncate">Whole Food</div>
              </div>

              <div className="p-2 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300">
                <div className="font-bold text-sm text-teal-400">{goodCount}</div>
                <div className="truncate">Nutritious</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300">
                <div className="font-bold text-sm text-slate-200">{neutralCount}</div>
                <div className="truncate">Neutral</div>
              </div>

              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                <div className="font-bold text-sm text-amber-400">{poorCount}</div>
                <div className="truncate">Refined</div>
              </div>

              <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
                <div className="font-bold text-sm text-rose-400">{unhealthyCount}</div>
                <div className="truncate">Empty Cal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags: Wholesome Highlights vs Nutritional Concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Wholesome Highlights */}
        {topNutritionTags.length > 0 && (
          <div className="p-4 bg-emerald-950/25 border border-emerald-500/20 rounded-2xl space-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Nourishing Health Benefits</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {topNutritionTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-lg text-[11px] font-medium flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nutritional Concerns */}
        {topConcernTags.length > 0 && (
          <div className="p-4 bg-amber-950/25 border border-amber-500/20 rounded-2xl space-y-2">
            <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Nutritional Red Flags</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {topConcernTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-lg text-[11px] font-medium flex items-center space-x-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Practical Health & Dietitian Tips */}
      {healthTips.length > 0 && (
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Dietitian Health Advice</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {healthTips.map((tip, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
