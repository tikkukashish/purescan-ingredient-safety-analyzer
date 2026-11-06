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

export type NutritionLevel = 'excellent' | 'good' | 'neutral' | 'poor' | 'unhealthy';

export type NutritionTag =
  | 'High Fiber'
  | 'Rich in Antioxidants'
  | 'Heart Healthy Fats'
  | 'Complete Protein'
  | 'Vitamin & Mineral Dense'
  | 'Anti-Inflammatory'
  | 'Prebiotic / Probiotic'
  | 'Whole Food Source'
  | 'Empty Calories'
  | 'Refined / Processed'
  | 'High Glycemic'
  | 'Pro-Inflammatory'
  | 'Nutrient Depleting'
  | 'Excess Sodium'
  | 'Artificial Additive'
  | 'Low Nutrient Density';

export interface NutritionalProfile {
  /** 1 = nutritionally void / harmful, 10 = superb whole-food nutrition */
  nutritionScore: number;
  level: NutritionLevel;
  tags: NutritionTag[];
  /** Short explanation of nutritional value or lack thereof */
  nutritionImpact: string;
}

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
  /** Nutritional profile for food-category ingredients */
  nutrition?: NutritionalProfile;
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
  /** Nutritional profile (food category only) */
  nutrition?: NutritionalProfile;
}

export interface NutritionalSummary {
  /** 1 to 10 nutritional health score */
  score: number;
  label: string;
  description: string;
  excellentCount: number;
  goodCount: number;
  neutralCount: number;
  poorCount: number;
  unhealthyCount: number;
  topNutritionTags: NutritionTag[];
  topConcernTags: NutritionTag[];
  healthTips: string[];
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
  /** Nutritional health summary (food category only) */
  nutritionalSummary?: NutritionalSummary;
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
