export type ProductCategory = 'food' | 'haircare' | 'skincare' | 'personal_care';

export type RiskLevel = 'safe' | 'moderate' | 'harmful';

export type BodyImpactTag = 
  | 'Endocrine Disruptor'
  | 'Scalp & Skin Barrier Irritant'
  | 'Carcinogenic / Mutagenic Risk'
  | 'Gut Microbiome Disruptor'
  | 'Organ Toxicity Risk'
  | 'Microplastic & Accumulation'
  | 'Synthetic Allergen'
  | 'Bio-Compatible & Nourishing'
  | 'Metabolic Stressor'
  | 'Cellular Protective';

export interface DatabaseIngredient {
  name: string;
  aliases: string[];
  categories: ProductCategory[];
  riskLevel: RiskLevel;
  /** Penalty score deduction (0 = no harm / nourishing, up to 3.5 = severe toxin) */
  hazardScore: number;
  bodyImpact: string;
  tags: BodyImpactTag[];
  cleanAlternatives?: string[];
  regulatoryNotes?: string;
}

export interface AnalyzedIngredient {
  originalText: string;
  matchedName?: string;
  category: ProductCategory;
  riskLevel: RiskLevel;
  hazardScore: number;
  bodyImpact: string;
  tags: BodyImpactTag[];
  cleanAlternatives?: string[];
  regulatoryNotes?: string;
  confidence: number;
}

export interface AnalysisSummary {
  category: ProductCategory;
  overallScore: number; // 1 to 10
  ratingLabel: string; // e.g. "Toxic / Severe Health Risk", "Good & Safe for Body"
  verdictDescription: string;
  totalIngredients: number;
  harmfulCount: number;
  moderateCount: number;
  safeCount: number;
  bodyImpactFlags: BodyImpactTag[];
  criticalWarnings: string[];
  recommendations: string[];
  ingredients: AnalyzedIngredient[];
  analyzedWith: 'local-engine' | 'gemini-ai';
  timestamp: string;
}

export interface PresetSample {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  expectedScore: string;
  ingredientsText: string;
  badge: string;
}
