import type { AnalyzedIngredient, AnalysisSummary, BodyImpactTag, ProductCategory } from '../types';
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
  const foodKeywords = ['syrup', 'flour', 'sugar', 'salt', 'oil', 'flavor', 'flavour', 'preservative', 'meal', 'fat', 'dextrose', 'starch', 'snack', 'cheese', 'serving'];

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
          confidence: 0.95
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
      confidence: 0.88
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
      confidence: 0.9
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
      confidence: 0.9
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
      confidence: 0.92
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
      confidence: 0.88
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
      confidence: 0.75
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
    confidence: 0.6
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
    timestamp: new Date().toISOString()
  };
}
