# PureScan — Ingredient Safety & Body Impact Analyzer

**PureScan** is a web application designed to evaluate ingredient lists from **Food**, **Haircare**, and **Skincare / Personal Care** products. It rates products on a strict **1 to 10 scale** based on the biological effect their ingredients have on the human body:

- **1 to 2.5 — Non-Consumable / Hazardous to Body**: Contains toxic additives, harsh chemicals (like harsh sulfates, formaldehyde releasers, endocrine disruptors, carcinogenic food dyes, trans fats) that compromise biological tissues.
- **3.0 to 4.5 — High Health Hazard / Harsh Effects**: Contains ingredients that disrupt natural barriers, cause contact dermatitis, or induce metabolic/gut stress.
- **5.0 to 6.9 — Moderate Concern / Caution Advised**: Mixed formulation containing potential irritants or synthetic preservatives.
- **7.0 to 8.4 — Good / Safe & Body-Friendly**: Clean, mild ingredients with minimal bodily impact.
- **8.5 to 10.0 — Exceptional / Safe & Nourishing**: Completely pure, bio-compatible, non-toxic, and cellular-protective ingredients.

---

## Key Features

1. **Multi-Category Health Analysis**:
   - **Haircare**: Identifies harsh sulfates (SLS/SLES) that strip scalp lipid barriers, formaldehyde releasers (DMDM Hydantoin), silicones (Dimethicone) that smother hair follicles, and fragrance allergens.
   - **Skincare**: Evaluates dermal absorption, endocrine disruption (Parabens, Oxybenzone, Phthalates), barrier-stripping alcohols, and cytotoxic agents (Hydroquinone).
   - **Food & Nutrition**: Assesses metabolic stress (High Fructose Corn Syrup), cardiovascular damage (Trans Fats), DNA and gut inflammation (Red 40, Yellow 5, Titanium Dioxide E171), and microbiome disruptors (Artificial Sweeteners).

2. **Image OCR & Live Camera**:
   - **Client-Side OCR**: Powered by Tesseract.js directly inside your browser. No image uploads to third-party servers required.
   - **Webcam / Mobile Camera**: Snap nutrition and ingredient labels right from your phone or laptop.
   - **6 Instant Presets**: Test real-world examples (Processed Chips, Sulfate Shampoo, Toxic Bleaching Cream, Clean Granola, Gentle Shampoo, Barrier Recovery Serum).

3. **Hybrid Intelligence**:
   - **Built-in Local Toxicology Database**: Works 100% offline out-of-the-box with zero API keys.
   - **Optional Google Gemini AI**: Connect your Gemini API key (stored securely in browser `localStorage`) to activate Gemini 2.5 Flash for multimodal deep reasoning and advanced biochemical evaluations.

4. **Interactive Visual Dashboard**:
   - Animated circular score gauge (1-10) with dynamic color gradients.
   - Critical health warnings & biological impact tags (Endocrine, Barrier, Microbiome, Carcinogenic, etc.).
   - Searchable, filterable breakdown of each ingredient with clean alternative suggestions.
   - Export & share options: Copy formatted Markdown report, download JSON, or print/save as PDF.

---

## Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```
