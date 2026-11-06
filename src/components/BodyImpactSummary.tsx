import React from 'react';
import type { AnalysisSummary, BodyImpactTag } from '../types';
import { 
  AlertTriangle, 
  Dna, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Activity, 
  Bug, 
  Layers, 
  HeartHandshake 
} from 'lucide-react';

interface BodyImpactSummaryProps {
  summary: AnalysisSummary;
}

export const BodyImpactSummary: React.FC<BodyImpactSummaryProps> = ({ summary }) => {
  const { criticalWarnings, bodyImpactFlags, recommendations, overallScore } = summary;

  const getTagIcon = (tag: BodyImpactTag) => {
    switch (tag) {
      case 'Endocrine Disruptor':
        return Activity;
      case 'Scalp & Skin Barrier Irritant':
        return Flame;
      case 'Carcinogenic / Mutagenic Risk':
        return Dna;
      case 'Gut Microbiome Disruptor':
        return Bug;
      case 'Microplastic & Accumulation':
        return Layers;
      case 'Bio-Compatible & Nourishing':
      case 'Cellular Protective':
        return HeartHandshake;
      default:
        return ShieldAlert;
    }
  };

  const isTagHarmful = (tag: BodyImpactTag) => {
    return tag !== 'Bio-Compatible & Nourishing' && tag !== 'Cellular Protective';
  };

  return (
    <div className="space-y-4">
      {/* Critical Warnings */}
      {criticalWarnings.length > 0 && (
        <div className="bg-rose-950/30 border border-rose-500/30 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-sm tracking-wide uppercase">
              Critical Physiological Health Warnings
            </h3>
          </div>
          <p className="text-xs text-rose-300/80">
            The following ingredients directly compromise bodily tissues, protective barriers, or organ systems:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {criticalWarnings.map((warning, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-900/80 border border-rose-500/20 rounded-2xl flex items-start space-x-3 text-xs text-slate-200"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Biological Impact Dimensions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div>
          <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-1">
            Detected Biological & Tissue Impacts
          </h3>
          <p className="text-xs text-slate-400">
            Categorized by their specific physiological reaction on the human body:
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {bodyImpactFlags.map((tag) => {
            const Icon = getTagIcon(tag);
            const harmful = isTagHarmful(tag);
            return (
              <div
                key={tag}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border ${
                  harmful
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tag}</span>
              </div>
            );
          })}
        </div>

        {/* Clean Alternatives Recommendation */}
        {recommendations.length > 0 && overallScore < 8.0 && (
          <div className="pt-4 border-t border-slate-800/60 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Recommended Healthier & Body-Safe Alternatives
              </h4>
            </div>
            <p className="text-xs text-slate-400">
              When shopping, look for formulas that swap toxic surfactants and synthetics for clean actives:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {recommendations.map((alt, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center space-x-1.5 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{alt}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
