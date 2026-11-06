import React from 'react';
import type { AnalysisSummary } from '../types';
import { ShieldCheck, ShieldAlert, AlertTriangle, Skull, Heart } from 'lucide-react';

interface ScoreGaugeProps {
  summary: AnalysisSummary;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ summary }) => {
  const { overallScore, ratingLabel, verdictDescription, harmfulCount, moderateCount, safeCount, category } = summary;

  // Determine color palette based on score (1.0 to 10.0)
  const getColorData = (score: number) => {
    if (score <= 2.5) {
      return {
        stroke: '#ef4444', // Red
        bgGlow: 'from-rose-500/20 to-red-600/5',
        badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
        icon: Skull,
        badgeText: 'Non-Consumable / Hazardous to Body'
      };
    } else if (score <= 4.5) {
      return {
        stroke: '#f97316', // Orange
        bgGlow: 'from-orange-500/20 to-amber-600/5',
        badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
        icon: AlertTriangle,
        badgeText: 'High Health Hazard / Harsh Effects'
      };
    } else if (score <= 6.9) {
      return {
        stroke: '#eab308', // Yellow
        bgGlow: 'from-yellow-500/20 to-amber-600/5',
        badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/25',
        icon: ShieldAlert,
        badgeText: 'Moderate Concern / Caution Advised'
      };
    } else if (score <= 8.4) {
      return {
        stroke: '#84cc16', // Lime
        bgGlow: 'from-lime-500/20 to-emerald-600/5',
        badgeBg: 'bg-lime-500/10 text-lime-400 border-lime-500/25',
        icon: ShieldCheck,
        badgeText: 'Good / Safe & Body-Friendly'
      };
    } else {
      return {
        stroke: '#10b981', // Emerald
        bgGlow: 'from-emerald-500/20 to-teal-600/5',
        badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
        icon: Heart,
        badgeText: 'Exceptional / Safe & Nourishing'
      };
    }
  };

  const theme = getColorData(overallScore);
  const BadgeIcon = theme.icon;

  // SVG Gauge Calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  // Score is 1 to 10; map 0 to 10 for percentage fill
  const percentage = Math.min(100, Math.max(10, (overallScore / 10) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 shadow-2xl bg-gradient-to-br ${theme.bgGlow}`}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left: Gauge Circle */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Background SVG Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#1e293b"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 12px ${theme.stroke}40)`
                }}
              />
            </svg>

            {/* Score Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-white tracking-tight">
                {overallScore.toFixed(1)}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                out of 10
              </span>
            </div>
          </div>

          <div className={`mt-3 px-3.5 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${theme.badgeBg}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{theme.badgeText}</span>
          </div>
        </div>

        {/* Center / Right: Evaluation Details */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Category: {category.toUpperCase().replace('_', ' ')}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                {summary.analyzedWith === 'gemini-ai' ? 'Analyzed via Gemini 2.5 Flash' : 'Analyzed via PureScan Engine'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {ratingLabel}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mt-2 max-w-2xl">
              {verdictDescription}
            </p>
          </div>

          {/* Stat Pills */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-md mx-auto lg:mx-0">
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center">
              <div className="text-xl font-black text-rose-400">{harmfulCount}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-rose-300/80">Harmful / Toxic</div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center">
              <div className="text-xl font-black text-amber-400">{moderateCount}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-300/80">Moderate Concern</div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
              <div className="text-xl font-black text-emerald-400">{safeCount}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300/80">Safe & Gentle</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
