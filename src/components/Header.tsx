import React from 'react';
import { ShieldCheck, Sparkles, Key, Zap, RefreshCw } from 'lucide-react';

interface HeaderProps {
  hasGeminiKey: boolean;
  onOpenApiKeyModal: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  hasGeminiKey,
  onOpenApiKeyModal,
  onReset
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={onReset}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white tracking-tight">PureScan</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Body Impact 1-10
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Food, Haircare & Skincare Toxicity Analyzer
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onReset}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center space-x-1.5"
            title="Start new analysis"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            onClick={onOpenApiKeyModal}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 border transition-all ${
              hasGeminiKey
                ? 'bg-purple-950/40 border-purple-500/40 text-purple-300 hover:bg-purple-900/50 shadow-sm shadow-purple-500/10'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            {hasGeminiKey ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>Gemini AI Connected</span>
              </>
            ) : (
              <>
                <Key className="w-3.5 h-3.5 text-slate-400" />
                <span>Add Gemini Key (Optional)</span>
              </>
            )}
          </button>

          <div className="hidden lg:flex items-center space-x-1 px-2.5 py-1 bg-slate-800/60 rounded-md border border-slate-700/50 text-[11px] text-slate-400">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>Local Engine Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};
