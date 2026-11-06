import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, ShieldAlert, CheckCircle2, Trash2 } from 'lucide-react';
import { getStoredGeminiKey, saveGeminiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyChange: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeyChange }) => {
  const [keyInput, setKeyInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKeyInput(getStoredGeminiKey());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveGeminiKey(keyInput.trim());
    setSavedSuccess(true);
    onKeyChange();
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleRemove = () => {
    saveGeminiKey('');
    setKeyInput('');
    onKeyChange();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Google Gemini API Key</h3>
            <p className="text-xs text-slate-400">Enhance analysis with multimodal AI intelligence</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-start space-x-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                <strong>PureScan works 100% offline without an API key</strong> using our built-in curated toxicology database & client-side OCR.
              </span>
            </div>
            <div className="flex items-start space-x-2 text-slate-400">
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
              <span>
                Adding a key unlocks Gemini 2.5 Flash for deep multimodal image reading and granular biochemical reasoning. Your key is stored strictly in your browser's <code className="text-slate-300">localStorage</code>.
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 underline underline-offset-2"
            >
              Get a free Gemini API key at Google AI Studio
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>API key updated successfully!</span>
            </div>
          )}

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
            {getStoredGeminiKey() && (
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl border border-rose-500/20 transition-colors flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Key</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/25 transition-all"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
