import type { AnalysisSummary, ProductCategory } from '../types';

export const GEMINI_STORAGE_KEY = 'ingredient_analyzer_gemini_api_key';

export function getStoredGeminiKey(): string {
  try {
    return localStorage.getItem(GEMINI_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function saveGeminiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(GEMINI_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to save API key to localStorage', e);
  }
}

/**
 * Call Google Gemini 2.5 Flash API with ingredients text or image base64
 */
export async function analyzeWithGemini(
  text: string,
  category: ProductCategory,
  imageBase64?: string
): Promise<AnalysisSummary> {
  const apiKey = getStoredGeminiKey();
  if (!apiKey) {
    throw new Error('No Gemini API Key provided. Please add one in settings or use the local engine.');
  }

  const prompt = `You are an expert toxicologist, biochemist, and registered dietitian evaluating consumer products.
Analyze the following product ingredients for physiological health impact on the human body.
The user specifies that the safety rating must be strictly based on the biological effect the ingredients have on the human body for its intended context.
For example, harsh sulfates in shampoo destroy the scalp barrier and follicle integrity (hazard rating), endocrine disruptors in skincare absorb into the bloodstream, and ultra-processed food dyes or trans fats cause gut/liver/metabolic toxicity.

IMPORTANT: For FOOD category products, you MUST evaluate BOTH:
1. "overallScore" (1.0 to 10.0): Additive / Toxicity Safety (1 = toxic/banned additives/trans fats, 10 = completely safe non-toxic).
2. "nutritionalSummary": How healthy/nutritious it is to consume (1 = empty calories/refined sugar/maida/processed oils, 10 = whole-food nutrient dense superfood with high fiber/vitamins/minerals).

Product Category: ${category}
Ingredients List:
${text}

Respond ONLY with a valid JSON object strictly matching this schema, without any markdown formatting or backticks:
{
  "category": "${category}",
  "overallScore": number (1.0 to 10.0),
  "ratingLabel": string,
  "verdictDescription": string,
  "totalIngredients": number,
  "harmfulCount": number,
  "moderateCount": number,
  "safeCount": number,
  "bodyImpactFlags": string[],
  "criticalWarnings": string[],
  "recommendations": string[],
  ${category === 'food' ? `"nutritionalSummary": {
    "score": number (1.0 to 10.0, evaluating nutritional density and healthiness),
    "label": string (e.g. "Superb Whole-Food Nutrition", "Nutrient-Dense & Wholesome", "Moderate Nutritional Value", "Nutritionally Depleted / Processed", "Ultra-Processed Junk / Empty Calories"),
    "description": string (explanation of whether it provides real nutrients vs empty calories),
    "excellentCount": number,
    "goodCount": number,
    "neutralCount": number,
    "poorCount": number,
    "unhealthyCount": number,
    "topNutritionTags": string[],
    "topConcernTags": string[],
    "healthTips": string[]
  },` : ''}
  "ingredients": [
    {
      "originalText": string,
      "matchedName": string,
      "category": "${category}",
      "riskLevel": "safe" | "moderate" | "harmful",
      "hazardScore": number,
      "bodyImpact": string,
      "tags": string[],
      "cleanAlternatives": string[],
      "confidence": number,
      ${category === 'food' ? `"nutrition": {
        "nutritionScore": number (1.0 to 10.0),
        "level": "excellent" | "good" | "neutral" | "poor" | "unhealthy",
        "tags": string[],
        "nutritionImpact": string
      }` : ''}
    }
  ]
}`;

  const contents: any[] = [];
  const parts: any[] = [{ text: prompt }];

  if (imageBase64) {
    const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (match) {
      parts.unshift({
        inline_data: {
          mime_type: match[1],
          data: match[2]
        }
      });
    }
  }

  contents.push({ parts });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawJson) {
    throw new Error('Received empty response from Gemini AI.');
  }

  const parsed = JSON.parse(rawJson);
  return {
    ...parsed,
    analyzedWith: 'gemini-ai',
    timestamp: new Date().toISOString()
  };
}
