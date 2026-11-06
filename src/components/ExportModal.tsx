import React, { useState } from 'react';
import type { AnalysisSummary } from '../types';
import { X, Copy, Download, Printer, Check } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: AnalysisSummary;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, summary }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    return `# PureScan Ingredient Safety Report
**Product Category:** ${summary.category.toUpperCase()}
**Overall Safety Rating:** ${summary.overallScore.toFixed(1)} / 10 (${summary.ratingLabel})
**Verdict:** ${summary.verdictDescription}
**Analysis Engine:** ${summary.analyzedWith}
**Date:** ${new Date(summary.timestamp).toLocaleString()}

---

## Breakdown
- Total Ingredients: ${summary.totalIngredients}
- Harmful / Toxic: ${summary.harmfulCount}
- Moderate Concern: ${summary.moderateCount}
- Safe / Biocompatible: ${summary.safeCount}

## Critical Body Impact Warnings
${summary.criticalWarnings.length > 0 ? summary.criticalWarnings.map(w => `- ⚠️ ${w}`).join('\n') : 'No severe health warnings.'}

## Health Impact Tags
${summary.bodyImpactFlags.map(t => `- ${t}`).join('\n')}

## Recommended Clean Alternatives
${summary.recommendations.map(r => `- ${r}`).join('\n')}

## Full Ingredient Details
${summary.ingredients.map((ing, i) => `${i + 1}. **${ing.matchedName || ing.originalText}** [${ing.riskLevel.toUpperCase()}]\n   - Body Effect: ${ing.bodyImpact}\n   - Tags: ${ing.tags.join(', ')}`).join('\n\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(summary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `purescan-report-${summary.category}-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white">Share & Export Safety Report</h3>
        <p className="text-xs text-slate-400">
          Save or export your 1-10 ingredient evaluation for documentation, shopping guides, or sharing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={handleCopyMarkdown}
            className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </div>
            <span className="text-xs font-semibold text-white">
              {copied ? 'Copied!' : 'Copy Summary'}
            </span>
            <span className="text-[10px] text-slate-500">Markdown format</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Download JSON</span>
            <span className="text-[10px] text-slate-500">Full toxicology data</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Print / Save PDF</span>
            <span className="text-[10px] text-slate-500">Browser print view</span>
          </button>
        </div>

        <div className="pt-2">
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">
            Markdown Preview
          </label>
          <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-mono text-slate-400 max-h-48 overflow-y-auto whitespace-pre-wrap">
            {generateMarkdown()}
          </pre>
        </div>
      </div>
    </div>
  );
};
