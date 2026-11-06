import type { 
  AnalyzedIngredient, 
  AnalysisSummary, 
  BodyImpactTag, 
  ProductCategory,
  NutritionalProfile,
  NutritionalSummary,
  NutritionTag
} from '../types';
import { INGREDIENTS_DATABASE } from '../data/ingredientsDatabase';

/**
 * Normalizes text for matching (lowercase, removes punctuation, trims)
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Split ingredient string into individual ingredients, taking care of nested parentheses
 */
export function parseIngredientText(rawText: string): string[] {
  // Strip "INGREDIENTS:", "Contains:", etc.
  const cleaned = rawText
    .replace(/^ingredients\s*:\s*/i, '')
    .replace(/^contains\s*:\s*/i, '')
    .replace(/^other ingredients\s*:\s*/i, '');

  const tokens: string[] = [];
  let current = '';
  let parenDepth = 0;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === '(' || char === '[' || char === '{') {
      parenDepth++;
      current += char;
    } else if (char === ')' || char === ']' || char === '}') {
      if (parenDepth > 0) parenDepth--;
      current += char;
    } else if ((char === ',' || char === ';' || char === '•' || char === '\n') && parenDepth === 0) {
      const trimmed = current.trim();
      if (trimmed && trimmed.length > 1) {
        tokens.push(trimmed.replace(/\.$/, ''));
      }
      current = '';
    } else {
      current += char;
    }
  }

  const lastTrimmed = current.trim();
  if (lastTrimmed && lastTrimmed.length > 1) {
    tokens.push(lastTrimmed.replace(/\.$/, ''));
  }

  return tokens.filter(t => t.length > 1 && !/^[0-9\s.,%]+$/.test(t));
}

/**
 * Auto-detects product category based on keywords
 */
export function detectCategory(text: string): ProductCategory {
  const lower = text.toLowerCase();
  
  const hairKeywords = ['shampoo', 'conditioner', 'hair', 'scalp', 'follicle', 'sulfate', 'sulphate', 'dimethicone', 'behentrimonium', 'keratin'];
  const skinKeywords = ['cream', 'lotion', 'serum', 'skin', 'face', 'spf', 'sunscreen', 'hyaluronic', 'ceramide', 'moisturizer', 'cleanser', 'toner'];
  const foodKeywords = ['syrup', 'flour', 'sugar', 'salt', 'oil', 'flavor', 'flavour', 'preservative', 'meal', 'fat', 'dextrose', 'starch', 'snack', 'cheese', 'serving', 'calorie', 'wheat', 'corn', 'cocoa', 'protein'];

  let hairScore = 0;
  let skinScore = 0;
  let foodScore = 0;

  hairKeywords.forEach(k => { if (lower.includes(k)) hairScore += 2; });
  skinKeywords.forEach(k => { if (lower.includes(k)) skinScore += 2; });
  foodKeywords.forEach(k => { if (lower.includes(k)) foodScore += 2; });

  if (hairScore > skinScore && hairScore > foodScore) return 'haircare';
  if (skinScore > hairScore && skinScore > foodScore) return 'skincare';
  if (foodScore > hairScore && foodScore > skinScore) return 'food';

  return 'personal_care';
}

/**
 * Heuristic nutrition evaluator for food ingredients not specifically found in DB
 */
function deriveFoodNutrition(raw: string): NutritionalProfile {
  const lower = raw.toLowerCase();

  // Sugars & Sweeteners
  if (/\b(sugar|syrup|dextrose|fructose|maltose|sucrose|glucose|agave|molasses|honey)\b/i.test(lower)) {
    if (lower.includes('honey')) {
      return {
        nutritionScore: 7.0,
        level: 'good',
        tags: ['Rich in Antioxidants', 'Prebiotic / Probiotic', 'Whole Food Source'],
        nutritionImpact: 'Natural sweetener with beneficial enzymes and antioxidants, though still caloric sugar.'
      };
    }
    return {
      nutritionScore: 2.0,
      level: 'unhealthy',
      tags: ['Empty Calories', 'High Glycemic', 'Nutrient Depleting', 'Pro-Inflammatory'],
      nutritionImpact: 'Refined sweetener with zero vitamins, fiber, or minerals. Spikes blood glucose and promotes lipogenesis.'
    };
  }

  // Refined Grains & Starches
  if (/\b(flour|starch|maida|semolina|maltodextrin|cornstarch|white rice|tapioca)\b/i.test(lower)) {
    if (lower.includes('whole wheat') || lower.includes('whole grain') || lower.includes('almond flour') || lower.includes('oat flour')) {
      return {
        nutritionScore: 8.5,
        level: 'excellent',
        tags: ['High Fiber', 'Whole Food Source', 'Vitamin & Mineral Dense'],
        nutritionImpact: 'Intact whole grain or nut flour providing complex carbohydrates, magnesium, and dietary fiber.'
      };
    }
    return {
      nutritionScore: 2.5,
      level: 'unhealthy',
      tags: ['Refined / Processed', 'High Glycemic', 'Low Nutrient Density'],
      nutritionImpact: 'Milled refined starch stripped of the fibrous germ and bran. Fast glycemic response with minimal micronutrients.'
    };
  }

  // Whole foods: Fruits, Veggies, Seeds, Berries, Nuts, Oats, Beans
  if (/\b(oat|berry|apple|banana|berry|blueberry|strawberry|almond|walnut|chia|flax|seed|nut|bean|lentil|pea|spinach|carrot|broccoli|quinoa|rice|avocado|mushroom|tomato|onion|garlic)\b/i.test(lower)) {
    return {
      nutritionScore: 9.2,
      level: 'excellent',
      tags: ['Whole Food Source', 'Vitamin & Mineral Dense', 'High Fiber', 'Rich in Antioxidants', 'Anti-Inflammatory'],
      nutritionImpact: 'Wholesome, unrefined food source rich in micronutrients, dietary fiber, and cellular protective phytochemicals.'
    };
  }

  // Healthy Proteins & Dairy
  if (/\b(egg|chicken|salmon|tuna|turkey|beef|yogurt|curd|milk|whey|casein|tofu|tempeh)\b/i.test(lower)) {
    return {
      nutritionScore: 8.5,
      level: 'excellent',
      tags: ['Complete Protein', 'Vitamin & Mineral Dense', 'Whole Food Source'],
      nutritionImpact: 'Bioavailable protein rich in essential amino acids, supporting tissue repair and satiety.'
    };
  }

  // Oils & Fats
  if (/\b(oil|butter|ghee|fat|shortening|lard)\b/i.test(lower)) {
    if (/\b(olive|avocado|walnut|flaxseed)\b/i.test(lower)) {
      return {
        nutritionScore: 9.0,
        level: 'excellent',
        tags: ['Heart Healthy Fats', 'Rich in Antioxidants', 'Anti-Inflammatory'],
        nutritionImpact: 'Unrefined, cold-pressed plant fat rich in monounsaturated oleic acid and protective polyphenols.'
      };
    }
    if (/\b(hydrogenated|trans)\b/i.test(lower)) {
      return {
        nutritionScore: 1.0,
        level: 'unhealthy',
        tags: ['Pro-Inflammatory', 'Empty Calories', 'Nutrient Depleting'],
        nutritionImpact: 'Destructive artificial trans fat that damages vascular endothelium and elevates cardiovascular risk.'
      };
    }
    return {
      nutritionScore: 3.5,
      level: 'poor',
      tags: ['Refined / Processed', 'Pro-Inflammatory'],
      nutritionImpact: 'Heavily refined industrial seed or palm oil. High in omega-6 fatty acids with loss of natural micronutrients.'
    };
  }

  // Salt & Sodium
  if (/\b(salt|sodium|chloride)\b/i.test(lower)) {
    return {
      nutritionScore: 5.0,
      level: 'neutral',
      tags: ['Excess Sodium'],
      nutritionImpact: 'Essential electrolyte required in small amounts, but contributes to elevated blood pressure in excess.'
    };
  }

  // Additives & Preservatives
  if (/\b(preservative|benzoate|sorbate|color|dye|flavor|gum|lecithin|edta|bht|bha)\b/i.test(lower)) {
    return {
      nutritionScore: 2.0,
      level: 'poor',
      tags: ['Artificial Additive', 'Low Nutrient Density'],
      nutritionImpact: 'Synthetic or industrial additive with zero nutritional density; serves only processing or shelf-life roles.'
    };
  }

  // Default neutral food nutrition
  return {
    nutritionScore: 5.0,
    level: 'neutral',
    tags: [],
    nutritionImpact: 'Standard food component providing minor energetic or structural role with neutral nutrient density.'
  };
}

/**
 * Match an ingredient against known database and heuristic rules
 */
export function analyzeSingleIngredient(raw: string, category: ProductCategory): AnalyzedIngredient {
  const normRaw = normalize(raw);

  // 1. Check exact or alias match in database
  for (const item of INGREDIENTS_DATABASE) {
    const isCategoryRelevant = item.categories.includes(category) || item.categories.includes('personal_care');
    
    // Check aliases
    for (const alias of item.aliases) {
      const normAlias = normalize(alias);
      if (normRaw === normAlias || normRaw.includes(normAlias) || normAlias.includes(normRaw)) {
        let nutrition = item.nutrition;
        if (!nutrition && category === 'food') {
          nutrition = deriveFoodNutrition(raw);
        }

        return {
          originalText: raw,
          matchedName: item.name,
          category,
          riskLevel: item.riskLevel,
          hazardScore: isCategoryRelevant ? item.hazardScore : item.hazardScore * 0.8,
          bodyImpact: item.bodyImpact,
          tags: item.tags,
          cleanAlternatives: item.cleanAlternatives,
          regulatoryNotes: item.regulatoryNotes,
          confidence: 0.95,
          nutrition: category === 'food' ? nutrition : undefined
        };
      }
    }
  }

  // 2. Heuristic Pattern Rules based on physiological body effects

  // Sulfates (Harsh detergent stripping lipid mantle)
  if (/\b(sulfate|sulphate|lauryl|laureth)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Sulfated Surfactant (SLS/SLES family)',
      category,
      riskLevel: 'harmful',
      hazardScore: 3.0,
      bodyImpact: 'Aggressive foaming agent that disrupts cellular membranes, strips natural lipid barriers of the scalp/skin, and precipitates folliculitis and irritant dermatitis.',
      tags: ['Scalp & Skin Barrier Irritant'],
      cleanAlternatives: ['Coco-Glucoside', 'Decyl Glucoside', 'Sodium Cocoyl Glutamate'],
      confidence: 0.88,
      nutrition: category === 'food' ? deriveFoodNutrition(raw) : undefined
    };
  }

  // Parabens (Endocrine disruption)
  if (/\b\w*paraben\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Paraben Preservative',
      category,
      riskLevel: 'harmful',
      hazardScore: 3.2,
      bodyImpact: 'Synthetic antimicrobial that mimics estrogen in human tissue, perturbing endocrine hormone balance and cellular reproductive pathways.',
      tags: ['Endocrine Disruptor', 'Organ Toxicity Risk'],
      cleanAlternatives: ['Radish Root Ferment', 'Potassium Sorbate', 'Sodium Levulinate'],
      confidence: 0.9,
      nutrition: category === 'food' ? deriveFoodNutrition(raw) : undefined
    };
  }

  // Silicones (Pore clogging / non-biodegradable accumulation)
  if (/\b\w*(methicone|siloxane|silicone)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Synthetic Silicone Polymer',
      category,
      riskLevel: 'moderate',
      hazardScore: 1.8,
      bodyImpact: 'Forms an occlusive plastic film that suffocates scalp pores, traps sebum and microbial flora, and causes product buildup requiring harsh strippers.',
      tags: ['Microplastic & Accumulation', 'Scalp & Skin Barrier Irritant'],
      cleanAlternatives: ['Plant Squalane', 'Broccoli Seed Oil', 'Hemisqualane'],
      confidence: 0.85
    };
  }

  // Formaldehyde Releasers
  if (/\b(dmdm|hydantoin|quaternium-15|diazolidinyl urea|imidazolidinyl urea)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Formaldehyde-Releasing Biocide',
      category,
      riskLevel: 'harmful',
      hazardScore: 3.6,
      bodyImpact: 'Continuously decomposes into volatile formaldehyde—a known human Group 1 carcinogen that triggers severe immune sensitization, hair loss, and contact eczema.',
      tags: ['Carcinogenic / Mutagenic Risk', 'Synthetic Allergen'],
      cleanAlternatives: ['Ethylhexylglycerin', 'Gluconolactone'],
      confidence: 0.92
    };
  }

  // Artificial Food Dyes & Azo Colorants
  if (/\b(red \d+|yellow \d+|blue \d+|fd&c|e102|e110|e129|e133|caramel color)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Synthetic Azo Food Dye / Petroleum Colorant',
      category,
      riskLevel: 'harmful',
      hazardScore: 3.2,
      bodyImpact: 'Petroleum derivative associated with intestinal mucosal inflammation, histamine hypersensitivity reactions, and neurobehavioral hyperactivity in children.',
      tags: ['Carcinogenic / Mutagenic Risk', 'Synthetic Allergen', 'Gut Microbiome Disruptor'],
      cleanAlternatives: ['Beet Powder', 'Curcumin / Turmeric', 'Spirulina Extract'],
      confidence: 0.9,
      nutrition: category === 'food' ? deriveFoodNutrition(raw) : undefined
    };
  }

  // Trans Fats & Hydrogenated Oils
  if (/\b(hydrogenated|trans fat|shortening)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Hydrogenated Lipid / Trans Fat',
      category,
      riskLevel: 'harmful',
      hazardScore: 3.8,
      bodyImpact: 'Damages vascular endothelial lining, drives systemic cardiovascular inflammation, elevates pro-atherogenic LDL, and stiffens cellular membranes.',
      tags: ['Organ Toxicity Risk', 'Metabolic Stressor'],
      cleanAlternatives: ['Cold-Pressed Olive Oil', 'Avocado Oil'],
      confidence: 0.92,
      nutrition: category === 'food' ? deriveFoodNutrition(raw) : undefined
    };
  }

  // Synthetic Sweeteners
  if (/\b(aspartame|sucralose|acesulfame|saccharin)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Synthetic Non-Nutritive Sweetener',
      category,
      riskLevel: 'moderate',
      hazardScore: 2.4,
      bodyImpact: 'Alters gut microbiome composition, diminishes beneficial gut commensals, and may impair metabolic glucose tolerance.',
      tags: ['Gut Microbiome Disruptor', 'Metabolic Stressor'],
      cleanAlternatives: ['Pure Stevia Leaf', 'Organic Monk Fruit'],
      confidence: 0.88,
      nutrition: category === 'food' ? deriveFoodNutrition(raw) : undefined
    };
  }

  // Phthalates / Fragrance
  if (/\b(fragrance|parfum|perfume|aroma|phthalate)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: 'Synthetic Fragrance / Phthalate Complex',
      category,
      riskLevel: 'harmful',
      hazardScore: 2.8,
      bodyImpact: 'Unregulated chemical blend frequently containing diethyl phthalate. Acts as a hormone disruptor, crosses dermal barriers, and triggers allergies and migraines.',
      tags: ['Endocrine Disruptor', 'Synthetic Allergen'],
      cleanAlternatives: ['Essential Oils (Steam-distilled)', 'Naturally Unscented'],
      confidence: 0.87
    };
  }

  // Natural plant extracts & clean ingredients
  if (/\b(extract|juice|water|aqua|oil|butter|flour|meal|seed|oat|honey|protein|vitamin|salt|acid)\b/i.test(raw)) {
    return {
      originalText: raw,
      matchedName: raw.charAt(0).toUpperCase() + raw.slice(1),
      category,
      riskLevel: 'safe',
      hazardScore: 0,
      bodyImpact: 'Naturally derived or bio-compatible ingredient that provides nourishing cellular building blocks with zero or negligible toxicological load on the human body.',
      tags: ['Bio-Compatible & Nourishing'],
      confidence: 0.75,
      nutrition: category === 'food' ? deriveFoodNutrition(raw) : undefined
    };
  }

  // Default unknown / neutral
  return {
    originalText: raw,
    matchedName: raw.charAt(0).toUpperCase() + raw.slice(1),
    category,
    riskLevel: 'safe',
    hazardScore: 0.2,
    bodyImpact: 'Commonly utilized formulation compound with minimal documented acute toxicity under standard consumer usage.',
    tags: ['Bio-Compatible & Nourishing'],
    confidence: 0.6,
    nutrition: category === 'food' ? deriveFoodNutrition(raw) : undefined
  };
}

/**
 * Computes nutritional health summary specifically for food category
 */
function calculateNutritionalSummary(ingredients: AnalyzedIngredient[]): NutritionalSummary {
  let weightedScoreSum = 0;
  let totalWeight = 0;

  let excellentCount = 0;
  let goodCount = 0;
  let neutralCount = 0;
  let poorCount = 0;
  let unhealthyCount = 0;

  const positiveTagCounts = new Map<NutritionTag, number>();
  const concernTagCounts = new Map<NutritionTag, number>();

  ingredients.forEach((ing, index) => {
    const nut = ing.nutrition || deriveFoodNutrition(ing.originalText);
    
    // Position weighting: top ingredients represent 70-80% of food weight
    const weight = index < 3 ? 1.5 : index < 6 ? 1.1 : 0.8;
    weightedScoreSum += nut.nutritionScore * weight;
    totalWeight += weight;

    switch (nut.level) {
      case 'excellent':
        excellentCount++;
        break;
      case 'good':
        goodCount++;
        break;
      case 'neutral':
        neutralCount++;
        break;
      case 'poor':
        poorCount++;
        break;
      case 'unhealthy':
        unhealthyCount++;
        break;
    }

    nut.tags.forEach(t => {
      if (['High Fiber', 'Rich in Antioxidants', 'Heart Healthy Fats', 'Complete Protein', 'Vitamin & Mineral Dense', 'Anti-Inflammatory', 'Prebiotic / Probiotic', 'Whole Food Source'].includes(t)) {
        positiveTagCounts.set(t, (positiveTagCounts.get(t) || 0) + 1);
      } else {
        concernTagCounts.set(t, (concernTagCounts.get(t) || 0) + 1);
      }
    });
  });

  let rawScore = totalWeight > 0 ? weightedScoreSum / totalWeight : 5.0;

  // Penalty adjustments for high amounts of unhealthy elements
  if (unhealthyCount >= 3) {
    rawScore = Math.min(rawScore, 3.2);
  } else if (unhealthyCount >= 2) {
    rawScore = Math.min(rawScore, 4.5);
  }

  const score = Math.max(1.0, Math.min(10.0, Number(rawScore.toFixed(1))));

  let label = '';
  let description = '';
  const healthTips: string[] = [];

  if (score >= 8.5) {
    label = 'Superb Whole-Food Nutrition';
    description = 'Exceptional nutritional quality! Dominated by unrefined whole foods, complex fibers, beneficial fats, and cellular-protective antioxidants with minimal processing.';
    healthTips.push('Excellent choice for sustained cellular energy and metabolic vitality.');
    healthTips.push('Provides high prebiotic fiber supporting beneficial gut flora.');
  } else if (score >= 7.0) {
    label = 'Nutrient-Dense & Wholesome';
    description = 'Good nutritional profile with solid micronutrient and macronutrient foundation. Contains mostly wholesome ingredients with limited empty calories.';
    healthTips.push('Good daily dietary choice with favorable nutrient-to-calorie ratio.');
  } else if (score >= 5.0) {
    label = 'Moderate Nutritional Value';
    description = 'Mixed composition. Contains some caloric or structural food ingredients, but lacks high fiber density or includes moderate refined carbohydrates/sodium.';
    healthTips.push('Pair with high-fiber whole vegetables or nuts to balance blood glucose absorption.');
  } else if (score >= 3.0) {
    label = 'Nutritionally Depleted / Processed';
    description = 'Low nutritional value. Dominated by refined starches, sugars, or processed seed oils that provide empty calories while offering very few vitamins or protective phytonutrients.';
    healthTips.push('Watch portion sizes to avoid rapid insulin spikes and reactive hypoglycemia.');
    healthTips.push('Consider swapping for whole-grain or unrefined alternatives.');
  } else {
    label = 'Ultra-Processed Junk / Empty Calories';
    description = 'Severely depleted nutritional profile. Composed largely of industrial fats, high glycemic sugars, and artificial additives that drive metabolic inflammation and visceral fat storage.';
    healthTips.push('Provides almost zero essential micronutrients or dietary fiber.');
    healthTips.push('Frequent consumption promotes chronic metabolic syndrome and liver fat accumulation.');
  }

  // Sort top tags
  const topNutritionTags = Array.from(positiveTagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(e => e[0]);

  const topConcernTags = Array.from(concernTagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(e => e[0]);

  return {
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
  };
}

/**
 * Main Analysis Engine
 */
export function analyzeIngredients(
  rawText: string,
  categoryOverride?: ProductCategory
): AnalysisSummary {
  const category = categoryOverride || detectCategory(rawText);
  const rawList = parseIngredientText(rawText);

  if (rawList.length === 0) {
    return {
      category,
      overallScore: 10,
      ratingLabel: 'No Ingredients Detected',
      verdictDescription: 'Please provide or upload a readable ingredient list.',
      totalIngredients: 0,
      harmfulCount: 0,
      moderateCount: 0,
      safeCount: 0,
      bodyImpactFlags: [],
      criticalWarnings: [],
      recommendations: [],
      ingredients: [],
      analyzedWith: 'local-engine',
      timestamp: new Date().toISOString()
    };
  }

  const analyzedIngredients: AnalyzedIngredient[] = [];
  let harmfulCount = 0;
  let moderateCount = 0;
  let safeCount = 0;
  let totalHazardPenalty = 0;
  const tagSet = new Set<BodyImpactTag>();
  const criticalWarnings: string[] = [];
  const recommendationsSet = new Set<string>();

  rawList.forEach((rawIng, index) => {
    const analyzed = analyzeSingleIngredient(rawIng, category);
    analyzedIngredients.push(analyzed);

    // Position weighting: top ingredients comprise the bulk of formula
    const positionWeight = index < 3 ? 1.35 : index < 6 ? 1.15 : 0.85;
    const penalty = analyzed.hazardScore * positionWeight;
    totalHazardPenalty += penalty;

    if (analyzed.riskLevel === 'harmful') {
      harmfulCount++;
      if (criticalWarnings.length < 4) {
        criticalWarnings.push(
          `Contains ${analyzed.matchedName || analyzed.originalText}: ${analyzed.bodyImpact}`
        );
      }
    } else if (analyzed.riskLevel === 'moderate') {
      moderateCount++;
    } else {
      safeCount++;
    }

    analyzed.tags.forEach(t => tagSet.add(t));
    if (analyzed.cleanAlternatives && analyzed.cleanAlternatives.length > 0) {
      analyzed.cleanAlternatives.forEach(alt => recommendationsSet.add(alt));
    }
  });

  // Calculate rating out of 10
  // Base 10.0, deduct totalHazardPenalty normalized
  // If harmful ingredients are present, rating drops sharply to reflect bodily harm
  let score = 10.0 - (totalHazardPenalty * 1.4);

  // If there are multiple severe harmful ingredients, cap the score below 3
  if (harmfulCount >= 3) {
    score = Math.min(score, 2.8);
  } else if (harmfulCount === 2) {
    score = Math.min(score, 4.2);
  } else if (harmfulCount === 1) {
    score = Math.min(score, 5.8);
  } else if (moderateCount >= 3) {
    score = Math.min(score, 6.8);
  }

  score = Math.max(1.0, Math.min(10.0, Number(score.toFixed(1))));

  // Verdict & Labels
  let ratingLabel = '';
  let verdictDescription = '';

  if (score <= 2.5) {
    ratingLabel = 'Hazardous / Extreme Biological Harm';
    verdictDescription = category === 'food'
      ? 'NOT SAFE for human consumption. Contains toxic additives, trans fats, or industrial compounds linked to chronic systemic disease and cellular damage.'
      : 'NOT SAFE for regular human use. Contains aggressive chemical agents that compromise physiological barriers, disrupt hormones, and cause toxic accumulation.';
  } else if (score <= 4.5) {
    ratingLabel = 'Poor Safety / High Health Concern';
    verdictDescription = category === 'food'
      ? 'Heavily processed with ingredients that promote metabolic stress, intestinal permeability, and inflammatory cascades.'
      : `High-risk formulation. Contains harsh irritants (like sulfates or allergens) that strip physiological barriers and incite micro-inflammation.`;
  } else if (score <= 6.9) {
    ratingLabel = 'Moderate / Acceptable with Reservations';
    verdictDescription = 'Mixed composition. Contains some acceptable elements alongside synthetic additives or potential irritants that sensitive individuals should avoid.';
  } else if (score <= 8.5) {
    ratingLabel = 'Good / Body-Friendly';
    verdictDescription = 'Clean and generally safe for human health. Low chemical toxicity burden with minimal adverse bodily effects.';
  } else {
    ratingLabel = 'Exceptional / Pure & Nourishing';
    verdictDescription = category === 'food'
      ? 'Completely safe and nourishing for human consumption. Composed of wholesome, bio-compatible, nutrient-dense ingredients.'
      : 'Excellently formulated with gentle, body-compatible, non-toxic natural actives that protect and nurture cellular health.';
  }

  // Calculate nutritional summary if food category
  const nutritionalSummary = category === 'food' 
    ? calculateNutritionalSummary(analyzedIngredients) 
    : undefined;

  return {
    category,
    overallScore: score,
    ratingLabel,
    verdictDescription,
    totalIngredients: rawList.length,
    harmfulCount,
    moderateCount,
    safeCount,
    bodyImpactFlags: Array.from(tagSet),
    criticalWarnings,
    recommendations: Array.from(recommendationsSet).slice(0, 5),
    ingredients: analyzedIngredients,
    analyzedWith: 'local-engine',
    timestamp: new Date().toISOString(),
    nutritionalSummary
  };
}
