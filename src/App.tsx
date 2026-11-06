import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ApiKeyModal } from './components/ApiKeyModal';
import { CameraCapture } from './components/CameraCapture';
import { ImageUploader } from './components/ImageUploader';
import { IngredientEditor } from './components/IngredientEditor';
import { ScoreGauge } from './components/ScoreGauge';
import { BodyImpactSummary } from './components/BodyImpactSummary';
import { IngredientList } from './components/IngredientList';
import { ExportModal } from './components/ExportModal';

import type { ProductCategory, AnalysisSummary } from './types';
import { analyzeIngredients, detectCategory } from './services/analyzer';
import { extractTextFromImage } from './services/ocrService';
import type { OcrProgress } from './services/ocrService';
import { getStoredGeminiKey, analyzeWithGemini } from './services/geminiService';
import { Share2, Sparkles, AlertCircle, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [ingredientsText, setIngredientsText] = useState<string>('');
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<ProductCategory>('personal_care');

  const [isProcessingOcr, setIsProcessingOcr] = useState<boolean>(false);
  const [ocrProgress, setOcrProgress] = useState<OcrProgress | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [summary, setSummary] = useState<AnalysisSummary | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);
  const [useGemini, setUseGemini] = useState<boolean>(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Check stored Gemini key on mount
  useEffect(() => {
    const key = getStoredGeminiKey();
    setHasGeminiKey(!!key);
    if (key) {
      setUseGemini(true);
    }
  }, []);

  const handleKeyChange = () => {
    const key = getStoredGeminiKey();
    setHasGeminiKey(!!key);
    if (key) {
      setUseGemini(true);
    } else {
      setUseGemini(false);
    }
  };

  const executeAnalysis = async (textToAnalyze: string, targetCategory: ProductCategory, imgBase64?: string) => {
    if (!textToAnalyze.trim()) {
      setAnalysisError('Please provide ingredients text or an image.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      let result: AnalysisSummary;

      if (useGemini && hasGeminiKey) {
        try {
          result = await analyzeWithGemini(textToAnalyze, targetCategory, imgBase64);
        } catch (geminiErr: any) {
          console.warn('Gemini AI failed, falling back to local engine:', geminiErr);
          result = analyzeIngredients(textToAnalyze, targetCategory);
        }
      } else {
        result = analyzeIngredients(textToAnalyze, targetCategory);
      }

      setSummary(result);

      // Trigger celebratory confetti if exceptionally clean (score >= 8.5)
      if (result.overallScore >= 8.5) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError(err.message || 'Failed to complete analysis. Please verify ingredients format.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle image upload / selection
  const handleImageSelected = async (dataUrl: string) => {
    setSelectedImageUrl(dataUrl);
    setAnalysisError(null);
    setIsProcessingOcr(true);
    setOcrProgress({ percent: 5, message: 'Loading image...' });

    try {
      const extractedText = await extractTextFromImage(dataUrl, (p) => setOcrProgress(p));
      setIsProcessingOcr(false);
      setOcrProgress(null);

      if (extractedText.trim()) {
        setIngredientsText(extractedText);
        const autoCat = detectCategory(extractedText);
        setCategory(autoCat);
        executeAnalysis(extractedText, autoCat, dataUrl);
      } else {
        setAnalysisError('No readable text was detected from this image. Please enter ingredients manually.');
      }
    } catch (err: any) {
      setIsProcessingOcr(false);
      setOcrProgress(null);
      setAnalysisError(err.message || 'Error processing OCR.');
    }
  };

  // Handle Preset Selection
  const handlePresetSelected = (text: string, cat: ProductCategory) => {
    setSelectedImageUrl(null);
    setIngredientsText(text);
    setCategory(cat);
    executeAnalysis(text, cat);
  };

  const handleReset = () => {
    setIngredientsText('');
    setSelectedImageUrl(null);
    setSummary(null);
    setAnalysisError(null);
    setCategory('personal_care');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        hasGeminiKey={hasGeminiKey}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biochemical Health Evaluation & Toxicity Scoring</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Check If It’s Safe For Your Body
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Snap or upload an ingredient list from <span className="text-white font-medium">Food</span>, <span className="text-white font-medium">Haircare</span>, or <span className="text-white font-medium">Skincare</span>. We evaluate the direct biological effect of every compound on the human body on a <strong>1 to 10 scale</strong>.
          </p>
        </div>

        {/* Error notification if any */}
        {analysisError && (
          <div className="max-w-3xl mx-auto p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 text-xs flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{analysisError}</span>
            </div>
            <button
              onClick={() => setAnalysisError(null)}
              className="text-rose-400 hover:text-white text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Uploader & Presets */}
          <div className="lg:col-span-6 space-y-6">
            <ImageUploader
              onImageSelected={handleImageSelected}
              onPresetSelected={handlePresetSelected}
              onCameraClick={() => setIsCameraOpen(true)}
              isProcessingOcr={isProcessingOcr}
              ocrProgress={ocrProgress}
              selectedImageUrl={selectedImageUrl}
              onClearImage={() => setSelectedImageUrl(null)}
            />
          </div>

          {/* Right Column: Text Editor & Analyze Controls */}
          <div className="lg:col-span-6">
            <IngredientEditor
              ingredientsText={ingredientsText}
              onTextChange={setIngredientsText}
              category={category}
              onCategoryChange={(newCat) => {
                setCategory(newCat);
                if (summary && ingredientsText.trim()) {
                  executeAnalysis(ingredientsText, newCat, selectedImageUrl || undefined);
                }
              }}
              onAnalyze={() => executeAnalysis(ingredientsText, category, selectedImageUrl || undefined)}
              isAnalyzing={isAnalyzing}
              useGemini={useGemini}
              hasGeminiKey={hasGeminiKey}
              onToggleGemini={setUseGemini}
              onClear={() => setIngredientsText('')}
            />
          </div>
        </div>

        {/* Results Section */}
        {summary && (
          <div ref={resultsRef} className="pt-8 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Comprehensive Toxicological Report
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Physiological Safety Rating
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share / Export</span>
              </button>
            </div>

            {/* Score Radial Gauge */}
            <ScoreGauge summary={summary} />

            {/* Biological Impact Dimensions & Warnings */}
            <BodyImpactSummary summary={summary} />

            {/* Detailed Ingredient-by-Ingredient Breakdown */}
            <IngredientList ingredients={summary.ingredients} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} PureScan — Ingredient Safety & Health Evaluation Engine</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Food • Haircare • Skincare</span>
            <span>•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-emerald-400 flex items-center space-x-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyChange={handleKeyChange}
      />

      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          setIsCameraOpen(false);
          handleImageSelected(dataUrl);
        }}
      />

      {summary && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          summary={summary}
        />
      )}
    </div>
  );
};

export default App;
