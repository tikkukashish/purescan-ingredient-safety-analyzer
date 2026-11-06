import type { DatabaseIngredient, ProductCategory } from '../types';

export const INGREDIENTS_DATABASE: DatabaseIngredient[] = [
  // ==========================================
  // HAIRCARE INGREDIENTS
  // ==========================================
  {
    name: 'Sodium Lauryl Sulfate (SLS)',
    aliases: ['sodium lauryl sulfate', 'sls', 'sodium dodecyl sulfate', 'sds'],
    categories: ['haircare', 'personal_care', 'skincare'],
    riskLevel: 'harmful',
    hazardScore: 3.2,
    bodyImpact: 'Aggressive surfactant that dissolves lipid bilayers of the scalp, strips natural oils, damages hair follicle integrity, and causes severe scalp barrier disruption, contact dermatitis, and micro-inflammation.',
    tags: ['Scalp & Skin Barrier Irritant', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Decyl Glucoside', 'Coco-Glucoside', 'Sodium Cocoyl Isethionate'],
    regulatoryNotes: 'Restricted in cosmetics by European regulations at high concentrations without rinse-off labeling.'
  },
  {
    name: 'Sodium Laureth Sulfate (SLES)',
    aliases: ['sodium laureth sulfate', 'sles', 'sodium lauryl ether sulfate'],
    categories: ['haircare', 'personal_care'],
    riskLevel: 'moderate',
    hazardScore: 2.1,
    bodyImpact: 'Ethoxylated surfactant prone to contamination with 1,4-dioxane and ethylene oxide (carcinogens). Causes scalp dryness, chronic follicle irritation, and barrier degradation.',
    tags: ['Scalp & Skin Barrier Irritant', 'Carcinogenic / Mutagenic Risk'],
    cleanAlternatives: ['Sodium Methyl Cocoyl Taurate', 'Disodium Laureth Sulfosuccinate (Gentle form)'],
    regulatoryNotes: 'Subject to industry impurity limits for 1,4-dioxane.'
  },
  {
    name: 'DMDM Hydantoin',
    aliases: ['dmdm hydantoin', 'glydant', '1,3-dimethylol-5,5-dimethylhydantoin'],
    categories: ['haircare', 'skincare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.5,
    bodyImpact: 'Formaldehyde-releaser preservative. Slowly discharges free formaldehyde (a recognized human Group 1 carcinogen) into the scalp and tissues, causing hair loss, scalp sensitization, severe burning, and allergic contact dermatitis.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Scalp & Skin Barrier Irritant', 'Synthetic Allergen'],
    cleanAlternatives: ['Leuconostoc/Radish Root Ferment', 'Sodium Levulinate', 'Potassium Sorbate'],
    regulatoryNotes: 'Banned or strictly capped in many regions due to formaldehyde liberation.'
  },
  {
    name: 'Methylisothiazolinone (MIT)',
    aliases: ['methylisothiazolinone', 'mit', '2-methyl-4-isothiazolin-3-one', 'kathon'],
    categories: ['haircare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.4,
    bodyImpact: 'Powerful synthetic biocide and extreme contact sensitizer. Induces severe allergic contact dermatitis, blistering, and neurotoxic cellular reactions in mammalian tissue tests.',
    tags: ['Synthetic Allergen', 'Scalp & Skin Barrier Irritant', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Ethylhexylglycerin', 'Gluconolactone'],
    regulatoryNotes: 'Banned in the European Union in leave-on cosmetic products and strictly limited in wash-off.'
  },
  {
    name: 'Methylchloroisothiazolinone (CMIT)',
    aliases: ['methylchloroisothiazolinone', 'cmit', 'chloromethylisothiazolinone'],
    categories: ['haircare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.5,
    bodyImpact: 'Extreme allergen and cytotoxic agent. Causes acute skin corrosion, immune hypersensitivity, and persistent contact eczema when absorbed through broken scalp barriers.',
    tags: ['Synthetic Allergen', 'Scalp & Skin Barrier Irritant'],
    cleanAlternatives: ['Rosemary Leaf Extract (antioxidant preservative)', 'Sodium Benzoate'],
    regulatoryNotes: 'EU Scientific Committee on Consumer Safety strictly regulates wash-off concentrations to 15 ppm combined.'
  },
  {
    name: 'Dimethicone (and Non-Soluble Silicones)',
    aliases: ['dimethicone', 'cyclomethicone', 'amodimethicone', 'cyclopentasiloxane'],
    categories: ['haircare', 'skincare'],
    riskLevel: 'moderate',
    hazardScore: 1.8,
    bodyImpact: 'Synthetic silicone polymer that deposits a plastic-like film over hair shafts and scalp. Smothers hair follicles, traps sweat, dead skin, and Malassezia yeast, leading to dandruff and compromised cellular respiration.',
    tags: ['Microplastic & Accumulation', 'Scalp & Skin Barrier Irritant'],
    cleanAlternatives: ['Broccoli Seed Oil', 'Hemisqualane', 'Plant-derived Squalane'],
    regulatoryNotes: 'Cyclotetrasiloxane (D4) and Cyclopentasiloxane (D5) face environmental and endocrine restrictions in the EU.'
  },
  {
    name: 'Synthetic Fragrance / Parfum',
    aliases: ['fragrance', 'parfum', 'synthetic fragrance', 'aroma'],
    categories: ['haircare', 'skincare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 2.8,
    bodyImpact: 'Trade-secret chemical blend frequently harboring diethyl phthalate (DEP), synthetic musks, and allergen aldehydes. Acts as an endocrine disruptor, crosses epidermal layers, and triggers systemic immune and migraine responses.',
    tags: ['Endocrine Disruptor', 'Synthetic Allergen', 'Scalp & Skin Barrier Irritant'],
    cleanAlternatives: ['Pure Essential Oil Blends (allergen-tested)', 'Unscented Formulations', 'Hydrosols'],
    regulatoryNotes: 'Exempt from specific ingredient disclosure under trade secret laws in many countries.'
  },
  {
    name: 'Behentrimonium Chloride',
    aliases: ['behentrimonium chloride', 'docosyltrimethylammonium chloride'],
    categories: ['haircare'],
    riskLevel: 'moderate',
    hazardScore: 1.9,
    bodyImpact: 'Quaternary ammonium conditioning salt. Known irritant to ocular tissues and sensitive scalps with potential for bioaccumulation and aquatic cytotoxicity.',
    tags: ['Scalp & Skin Barrier Irritant'],
    cleanAlternatives: ['Brassicyl Isoleucinate Esylate', 'Cetearyl Alcohol (fatty alcohol)'],
    regulatoryNotes: 'Regulated to max 3-5% in cosmetic formulations.'
  },
  {
    name: 'Coal Tar',
    aliases: ['coal tar', 'pix carbonis', 'tar solution'],
    categories: ['haircare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.8,
    bodyImpact: 'Distillation byproduct containing polycyclic aromatic hydrocarbons (PAHs). Established human carcinogen causing chromosomal damage, dermal photosensitivity, and organ system toxicity.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Salicylic Acid (Willow bark)', 'Tea Tree Oil', 'Ketoconazole'],
    regulatoryNotes: 'Banned in cosmetics in the EU, restricted in over-the-counter medicated shampoos in USA.'
  },

  // ==========================================
  // SKINCARE INGREDIENTS
  // ==========================================
  {
    name: 'Parabens (Methyl / Propyl / Butyl)',
    aliases: ['methylparaben', 'propylparaben', 'butylparaben', 'isobutylparaben', 'ethylparaben', 'paraben'],
    categories: ['skincare', 'haircare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.3,
    bodyImpact: 'Synthetic antimicrobial preservatives that penetrate dermal barriers and bind to estrogen receptors. Identified as endocrine disruptors linked to reproductive toxicity, accelerated aging in UV light, and detected in breast tissue biopsies.',
    tags: ['Endocrine Disruptor', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Sodium Anisate', 'Potassium Sorbate', 'Phenethyl Alcohol'],
    regulatoryNotes: 'Several long-chain parabens (isobutyl, isopropyl) are banned outright in the European Union.'
  },
  {
    name: 'Oxybenzone (Benzophenone-3)',
    aliases: ['oxybenzone', 'benzophenone-3', 'bp-3'],
    categories: ['skincare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.4,
    bodyImpact: 'Chemical UV filter that readily permeates human skin and enters the bloodstream and urine. Documented endocrine disruptor interfering with thyroid function, testosterone production, and causes coral reef DNA deformation.',
    tags: ['Endocrine Disruptor', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Non-Nano Zinc Oxide', 'Titanium Dioxide (topical non-nano)'],
    regulatoryNotes: 'Banned in Hawaii, Key West, and Palau to protect marine ecosystems and human endocrine health.'
  },
  {
    name: 'Octinoxate (Octyl Methoxycinnamate)',
    aliases: ['octinoxate', 'octyl methoxycinnamate', 'ethylhexyl methoxycinnamate'],
    categories: ['skincare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.1,
    bodyImpact: 'Endocrine disruptor with estrogenic and thyroid-suppressive activity. Readily passes through human dermal layers, inducing metabolic disturbances and generating reactive oxygen species (ROS) under sunlight.',
    tags: ['Endocrine Disruptor', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Zinc Oxide', 'Avobenzone (stabilized)'],
    regulatoryNotes: 'Banned in coral reef zones worldwide.'
  },
  {
    name: 'Hydroquinone',
    aliases: ['hydroquinone', '1,4-dihydroxybenzene', 'quinol'],
    categories: ['skincare'],
    riskLevel: 'harmful',
    hazardScore: 3.7,
    bodyImpact: 'Melanin inhibitor that exhibits cytotoxic effects on human melanocytes. Prolonged systemic exposure causes exogenous ochronosis (permanent blue-black tissue discoloration) and chromosome clastogenicity.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Alpha Arbutin', 'Tranexamic Acid', 'Azelaic Acid', 'Kojic Acid'],
    regulatoryNotes: 'Banned for over-the-counter sales in the EU and banned from OTC cosmetics in the USA under CARES Act.'
  },
  {
    name: 'Polyethylene Glycol (PEGs)',
    aliases: ['peg', 'polyethylene glycol', 'peg-100 stearate', 'peg-40 hydrogenated castor oil', 'peg-8'],
    categories: ['skincare', 'haircare', 'personal_care'],
    riskLevel: 'moderate',
    hazardScore: 2.0,
    bodyImpact: 'Petroleum-based penetration enhancers that alter skin barrier permittivity. Frequently contaminated with manufacturing byproducts 1,4-dioxane and ethylene oxide, both known genotoxic human carcinogens.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Scalp & Skin Barrier Irritant'],
    cleanAlternatives: ['Cetearyl Glucoside', 'Glyceryl Stearate SE', 'Sorbitan Olivate'],
    regulatoryNotes: 'Requires strict vacuum stripping to remove trace ethylene oxide and 1,4-dioxane.'
  },
  {
    name: 'Denatured Alcohol / Alcohol Denat',
    aliases: ['alcohol denat', 'alcohol denatured', 'sd alcohol 40', 'isopropyl alcohol'],
    categories: ['skincare', 'haircare'],
    riskLevel: 'moderate',
    hazardScore: 2.2,
    bodyImpact: 'Volatile drying alcohol that dissolves intercellular ceramides and fatty acids in the stratum corneum. Weakens the epidermal skin barrier, triggers cellular apoptosis in keratinocytes, and causes rebound hyper-secretion.',
    tags: ['Scalp & Skin Barrier Irritant'],
    cleanAlternatives: ['Fatty alcohols (Cetyl, Cetearyl, Stearyl Alcohol)', 'Witch Hazel (Alcohol-Free)'],
    regulatoryNotes: 'Generally recognized as safe as solvent, but warned against for compromised skin barriers.'
  },
  {
    name: 'BHA & BHT (Cosmetic Grade)',
    aliases: ['butylated hydroxyanisole', 'bha', 'butylated hydroxytoluene', 'bht'],
    categories: ['skincare', 'haircare', 'food'],
    riskLevel: 'harmful',
    hazardScore: 3.2,
    bodyImpact: 'Synthetic phenolic antioxidants that mimic estrogen, antagonize androgenic receptors, and exhibit hepatic and renal accumulation. Shown to induce oxidative organ stress in high chronic exposures.',
    tags: ['Endocrine Disruptor', 'Organ Toxicity Risk', 'Carcinogenic / Mutagenic Risk'],
    cleanAlternatives: ['Tocopherol (Pure Vitamin E)', 'Rosemary Oleoresin Extract (ROE)'],
    regulatoryNotes: 'BHA is classified by IARC as a Group 2B possible human carcinogen.'
  },
  {
    name: 'Phthalates (DEP, DBP, DEHP)',
    aliases: ['phthalate', 'diethyl phthalate', 'dep', 'dibutyl phthalate', 'dbp'],
    categories: ['skincare', 'haircare', 'personal_care'],
    riskLevel: 'harmful',
    hazardScore: 3.6,
    bodyImpact: 'Plasticizing fixative with potent endocrine-disrupting toxicity. Interferes with testosterone synthesis, disrupts thyroid homeostasis, and increases reproductive and developmental hazards.',
    tags: ['Endocrine Disruptor', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Triethyl Citrate', 'Plant Resins'],
    regulatoryNotes: 'Banned in cosmetics in the EU, tightly restricted in children’s products globally.'
  },
  {
    name: 'Triclosan',
    aliases: ['triclosan', '5-chloro-2-(2,4-dichlorophenoxy)phenol'],
    categories: ['personal_care', 'skincare'],
    riskLevel: 'harmful',
    hazardScore: 3.7,
    bodyImpact: 'Broad-spectrum chlorinated antibacterial agent. Disrupts endocrine hormone signaling (thyroid and sex hormones), fosters antimicrobial resistance, and forms toxic chlorophenols when exposed to sunlight.',
    tags: ['Endocrine Disruptor', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Tea Tree Oil', 'Colloidal Silver', 'Totarol'],
    regulatoryNotes: 'Banned in consumer antiseptic washes by US FDA in 2016.'
  },

  // ==========================================
  // FOOD & DIETARY INGREDIENTS
  // ==========================================
  {
    name: 'High Fructose Corn Syrup (HFCS)',
    aliases: ['high fructose corn syrup', 'hfcs', 'glucose-fructose syrup', 'isoglucose'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.1,
    bodyImpact: 'Industrially processed sweetener that bypasses insulin signaling directly into liver metabolism. Accelerates hepatic de novo lipogenesis, driving non-alcoholic fatty liver disease (NAFLD), systemic insulin resistance, and visceral inflammation.',
    tags: ['Metabolic Stressor', 'Gut Microbiome Disruptor'],
    cleanAlternatives: ['Raw Honey', 'Maple Syrup', 'Dates', 'Organic Fruit Purée'],
    regulatoryNotes: 'Widely used in USA; limited or regulated under sugar-tax regimes globally.',
    nutrition: { nutritionScore: 1.0, level: 'unhealthy', tags: ['Empty Calories', 'High Glycemic', 'Pro-Inflammatory', 'Nutrient Depleting'], nutritionImpact: 'Provides zero vitamins, minerals, or fiber. Spikes blood sugar rapidly, promotes insulin resistance, visceral fat storage, and chronic systemic inflammation.' }
  },
  {
    name: 'Partially Hydrogenated Oils (Trans Fats)',
    aliases: ['partially hydrogenated oil', 'trans fat', 'hydrogenated soybean oil', 'hydrogenated vegetable oil'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.9,
    bodyImpact: 'Artificial trans isomer fatty acids. Induces systemic vascular endothelial dysfunction, elevates atherogenic LDL cholesterol while depleting protective HDL, and drastically increases coronary heart disease risk.',
    tags: ['Organ Toxicity Risk', 'Metabolic Stressor'],
    cleanAlternatives: ['Cold-Pressed Extra Virgin Olive Oil', 'Avocado Oil', 'Grass-fed Butter'],
    regulatoryNotes: 'Banned by US FDA (GRAS revoked) and strictly limited under EU regulations.',
    nutrition: { nutritionScore: 1.0, level: 'unhealthy', tags: ['Pro-Inflammatory', 'Empty Calories', 'Nutrient Depleting'], nutritionImpact: 'Zero nutritional value. Stiffens cell membranes, blocks omega-3 utilization, and dramatically elevates cardiovascular disease risk.' }
  },
  {
    name: 'Red 40 (Allura Red AC / E129)',
    aliases: ['red 40', 'allura red', 'allura red ac', 'fd&c red no. 40', 'e129', 'ci 16035'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.3,
    bodyImpact: 'Petroleum-synthesized azo dye containing benzidine precursors. Triggers intestinal inflammation by stimulating serotonin production and damaging colonic DNA. Clinically correlated with neurobehavioral hyperactivity and ADHD in children.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Gut Microbiome Disruptor', 'Synthetic Allergen'],
    cleanAlternatives: ['Beet Juice Powder (Betanin)', 'Elderberry Extract', 'Paprika Oleoresin'],
    regulatoryNotes: 'In the European Union, requires mandatory warning label: "May have an adverse effect on activity and attention in children."',
    nutrition: { nutritionScore: 1.0, level: 'unhealthy', tags: ['Artificial Additive', 'Empty Calories', 'Low Nutrient Density'], nutritionImpact: 'Zero nutritional value — purely cosmetic petroleum-derived colorant with no vitamins, minerals, or caloric benefit.' }
  },
  {
    name: 'Yellow 5 (Tartrazine / E102)',
    aliases: ['yellow 5', 'tartrazine', 'fd&c yellow no. 5', 'e102', 'ci 19140'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.2,
    bodyImpact: 'Azo dye metabolizing into aromatic amines. Induces histamine release leading to urticaria, asthma, and severe hypersensitivity. Associated with oxidative stress in hepatic and renal parenchyma in animal models.',
    tags: ['Synthetic Allergen', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Turmeric (Curcumin)', 'Beta-Carotene', 'Saffron'],
    regulatoryNotes: 'Requires Southampton hyperactivity warning label in the European Union.',
    nutrition: { nutritionScore: 1.0, level: 'unhealthy', tags: ['Artificial Additive', 'Empty Calories'], nutritionImpact: 'No nutritional value. Synthetic petroleum dye used solely for color appeal.' }
  },
  {
    name: 'Yellow 6 (Sunset Yellow / E110)',
    aliases: ['yellow 6', 'sunset yellow', 'sunset yellow fcf', 'fd&c yellow no. 6', 'e110'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.2,
    bodyImpact: 'Synthetic sulfonated monoazo dye contaminated with known carcinogens like Sudan I. Provokes immune hypersensitivity, chromosomal aberrations in vitro, and pediatric hyperactivity.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Synthetic Allergen'],
    cleanAlternatives: ['Annatto Seed Extract', 'Carrot Concentrate'],
    regulatoryNotes: 'Requires warning label in the EU and banned in Norway and Sweden.',
    nutrition: { nutritionScore: 1.0, level: 'unhealthy', tags: ['Artificial Additive', 'Empty Calories'], nutritionImpact: 'No nutritional contribution. Petrochemical dye used purely for aesthetic color.' }
  },
  {
    name: 'Titanium Dioxide (E171 Food Grade)',
    aliases: ['titanium dioxide', 'e171', 'tio2', 'ci 77891'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.6,
    bodyImpact: 'Whitening nanoparticles that traverse intestinal epithelial layers and accumulate in Peyer’s patches, spleen, and liver. Causes genotoxicity, chromosome strand breaks, and persistent cellular inflammatory cascades.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Organ Toxicity Risk', 'Microplastic & Accumulation'],
    cleanAlternatives: ['Calcium Carbonate (food grade)', 'Rice Starch'],
    regulatoryNotes: 'Officially BANNED as a food additive across the entire European Union in 2022 following EFSA safety evaluation.',
    nutrition: { nutritionScore: 1.0, level: 'unhealthy', tags: ['Artificial Additive', 'Low Nutrient Density'], nutritionImpact: 'Purely cosmetic whitening agent with zero nutritional value and documented accumulation toxicity.' }
  },
  {
    name: 'Sodium Benzoate (E211)',
    aliases: ['sodium benzoate', 'e211', 'benzoate of soda'],
    categories: ['food', 'personal_care'],
    riskLevel: 'moderate',
    hazardScore: 2.3,
    bodyImpact: 'Synthetic antifungal preservative. When combined with Vitamin C (ascorbic acid) in acidic environments, converts into benzene—a potent human Group 1 carcinogen causing leukemia and bone marrow toxicity.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Fermented Cane Sugar', 'Vinegar / Acetic Acid', 'Citric Acid (organic)'],
    regulatoryNotes: 'Strict maximum allowable levels in beverages due to benzene formation.',
    nutrition: { nutritionScore: 2.0, level: 'poor', tags: ['Artificial Additive', 'Low Nutrient Density'], nutritionImpact: 'Synthetic preservative with no nutritional benefit. Serves only to extend shelf life.' }
  },
  {
    name: 'Potassium Bromate (E924)',
    aliases: ['potassium bromate', 'e924', 'bromated flour'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.9,
    bodyImpact: 'Flour maturing and dough conditioning agent. Recognized renal carcinogen and thyroid tumor promoter. Causes reactive oxidative damage and DNA base deletions.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Ascorbic Acid (Vitamin C)', 'Enzymatic Dough Conditioners (Amylase)'],
    regulatoryNotes: 'Banned in the European Union, Canada, Brazil, China, and the UK. Still permitted in USA.',
    nutrition: { nutritionScore: 1.0, level: 'unhealthy', tags: ['Artificial Additive', 'Low Nutrient Density'], nutritionImpact: 'Industrial processing agent with zero nutritional value and carcinogenic risk.' }
  },
  {
    name: 'Aspartame (E951)',
    aliases: ['aspartame', 'nutrasweet', 'equal', 'e951'],
    categories: ['food'],
    riskLevel: 'moderate',
    hazardScore: 2.6,
    bodyImpact: 'Non-nutritive dipeptide sweetener that hydrolyzes into methanol, aspartic acid, and phenylalanine. Reclassified by WHO/IARC as "possibly carcinogenic to humans" (Group 2B) and associated with gut microbiome dysbiosis.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Gut Microbiome Disruptor'],
    cleanAlternatives: ['Pure Stevia Leaf Extract', 'Monk Fruit Extract (Luo Han Guo)'],
    regulatoryNotes: 'Classified Group 2B carcinogen by WHO/IARC in 2023. Contraindicated for individuals with phenylketonuria (PKU).',
    nutrition: { nutritionScore: 2.0, level: 'poor', tags: ['Empty Calories', 'Artificial Additive', 'Nutrient Depleting'], nutritionImpact: 'Zero-calorie synthetic sweetener with no vitamins or minerals. Disrupts gut microbiome balance and may blunt natural satiety cues, promoting overeating.' }
  },
  {
    name: 'Sucralose (E955)',
    aliases: ['sucralose', 'splenda', 'e955', 'trichlorosucrose'],
    categories: ['food'],
    riskLevel: 'moderate',
    hazardScore: 2.4,
    bodyImpact: 'Chlorinated sucrose derivative that alters intestinal microflora, decimating beneficial Bifidobacteria and Lactobacilli. Generates toxic chloropropanols when heated or baked.',
    tags: ['Gut Microbiome Disruptor', 'Metabolic Stressor'],
    cleanAlternatives: ['Organic Allulose', 'Monk Fruit'],
    regulatoryNotes: 'Extensively studied; debates continue over high-temperature degradation and gut microflora shifts.',
    nutrition: { nutritionScore: 2.0, level: 'poor', tags: ['Empty Calories', 'Artificial Additive', 'Nutrient Depleting'], nutritionImpact: 'Zero-calorie synthetic sweetener. Provides no micronutrients and may impair glucose tolerance through gut microbiome disruption.' }
  },
  {
    name: 'Carrageenan (Degraded / Poligeenan Risk)',
    aliases: ['carrageenan', 'e407', 'irish moss extract'],
    categories: ['food'],
    riskLevel: 'moderate',
    hazardScore: 2.3,
    bodyImpact: 'Seaweed polysaccharide stabilizer. Induces intestinal epithelial inflammation, disrupts intestinal tight junctions (leaky gut), and can degrade into poligeenan, an established gastrointestinal ulcerogen.',
    tags: ['Gut Microbiome Disruptor', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Guar Gum', 'Acacia Fiber', 'Agar Agar'],
    regulatoryNotes: 'Banned in infant formula in the European Union.',
    nutrition: { nutritionScore: 3.0, level: 'poor', tags: ['Low Nutrient Density', 'Refined / Processed'], nutritionImpact: 'A texturizing agent with minimal soluble fiber. Provides negligible nutritional value beyond thickening.' }
  },
  {
    name: 'Sodium Nitrite / Nitrate (E250 / E251)',
    aliases: ['sodium nitrite', 'sodium nitrate', 'e250', 'e251', 'curing salt'],
    categories: ['food'],
    riskLevel: 'harmful',
    hazardScore: 3.5,
    bodyImpact: 'Processed meat preservative. In acidic stomach acid and high cooking heat, reacts with secondary amines to form nitrosamines—potent carcinogenic compounds linked to colorectal and gastric malignancies.',
    tags: ['Carcinogenic / Mutagenic Risk', 'Organ Toxicity Risk'],
    cleanAlternatives: ['Celery Juice Powder (naturally cured)', 'Sea Salt curing', 'Rosemary extract'],
    regulatoryNotes: 'Classified by WHO as linked directly to colorectal cancer risks in processed meats.',
    nutrition: { nutritionScore: 1.5, level: 'unhealthy', tags: ['Artificial Additive', 'Low Nutrient Density', 'Pro-Inflammatory'], nutritionImpact: 'Preservative with zero nutritional value. Associated with formation of carcinogenic nitrosamines in processed meats.' }
  },
  {
    name: 'Monosodium Glutamate (MSG / E621)',
    aliases: ['monosodium glutamate', 'msg', 'e621', 'hydrolyzed yeast'],
    categories: ['food'],
    riskLevel: 'moderate',
    hazardScore: 1.8,
    bodyImpact: 'Excitatory neurotransmitter precursor. While safe for majority, sensitive individuals experience transient headaches, flushing, numbness, and neuro-excitatory triggers.',
    tags: ['Synthetic Allergen'],
    cleanAlternatives: ['Mushroom Powder', 'Nutritional Yeast', 'Naturally Aged Parmesan'],
    regulatoryNotes: 'Approved globally as GRAS, requires declaration in ingredients.',
    nutrition: { nutritionScore: 4.0, level: 'neutral', tags: ['Low Nutrient Density', 'Artificial Additive'], nutritionImpact: 'Flavor enhancer with trace sodium. Provides umami taste but no essential vitamins, minerals, or macronutrients.' }
  },

  // ==========================================
  // SAFE / BENEFICIAL / CLEAN INGREDIENTS
  // ==========================================
  {
    name: 'Aloe Barbadensis Leaf Juice (Aloe Vera)',
    aliases: ['aloe barbadensis', 'aloe vera', 'aloe barbadensis leaf extract', 'aloe leaf juice'],
    categories: ['haircare', 'skincare', 'personal_care', 'food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Rich in polysaccharides (acemannan), vitamins A, C, and E. Restores skin and scalp moisture barrier, accelerates cellular re-epithelialization, and suppresses pro-inflammatory cytokines.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Argania Spinosa (Argan Oil)',
    aliases: ['argan oil', 'argania spinosa kernel oil', 'moroccan argan oil'],
    categories: ['haircare', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Abundant in essential fatty acids (oleic, linoleic) and squalene. Fortifies follicle cuticles, reduces transepidermal water loss (TEWL), and neutralizes free radicals.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Decyl Glucoside & Coco Glucoside',
    aliases: ['decyl glucoside', 'coco-glucoside', 'coco glucoside', 'lauryl glucoside'],
    categories: ['haircare', 'skincare', 'personal_care'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Gentle non-ionic surfactant derived from plant sugars and coconut. Cleanses without stripping intercellular lipid structures, fully biodegradable, and maintains balanced scalp pH.',
    tags: ['Bio-Compatible & Nourishing'],
    cleanAlternatives: []
  },
  {
    name: 'Hyaluronic Acid / Sodium Hyaluronate',
    aliases: ['hyaluronic acid', 'sodium hyaluronate', 'hydrolyzed hyaluronic acid'],
    categories: ['skincare', 'haircare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Endogenous glycosaminoglycan capable of binding 1,000 times its molecular weight in water. Hydrates intercellular dermal matrix, promotes cellular repair, and plumpness.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Ceramides (NP, AP, EOP)',
    aliases: ['ceramide', 'ceramide np', 'ceramide ap', 'ceramide eop', 'ceramides'],
    categories: ['skincare', 'haircare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Fundamental architectural lipids making up over 50% of the human stratum corneum. Seals moisture, prevents allergen ingress, and repairs compromised epidermal barriers.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Niacinamide (Vitamin B3)',
    aliases: ['niacinamide', 'nicotinamide', 'vitamin b3'],
    categories: ['skincare', 'haircare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Essential cellular co-enzyme (NAD+/NADH precursor). Strengthens lipid barrier, regulates sebaceous gland secretion, calms erythema, and improves microcirculation.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Squalane (Plant Derived)',
    aliases: ['squalane', 'plant squalane', 'olive squalane'],
    categories: ['skincare', 'haircare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Hydrogenated form of human sebum constituent squalene. 100% bio-compatible, non-comedogenic, prevents lipid peroxidation, and protects delicate epidermal lipids.',
    tags: ['Bio-Compatible & Nourishing'],
    cleanAlternatives: []
  },
  {
    name: 'Rosemary Leaf Extract & Oil',
    aliases: ['rosemary extract', 'rosmarinus officinalis', 'rosemary oil', 'rosmarinus officinalis leaf extract'],
    categories: ['haircare', 'skincare', 'food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Contains potent carnosic acid and rosmarinic acid. Improves micro-capillary perfusion to hair follicles, suppresses DHT binding in scalp trials, and acts as a natural antioxidant.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Centella Asiatica (Cica / Madecassoside)',
    aliases: ['centella asiatica', 'gotu kola', 'madecassoside', 'asiaticoside'],
    categories: ['skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Stimulates type I collagen synthesis, downregulates inflammation pathways (NF-kB), and accelerates tissue remodeling and wound healing.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Zinc Oxide (Non-Nano)',
    aliases: ['zinc oxide', 'non-nano zinc oxide'],
    categories: ['skincare', 'personal_care'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Inert mineral sun filter that sits atop the skin surface, reflecting UVA/UVB rays without penetrating into bloodstream or disrupting endocrine systems.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Rolled Oats (Avena Sativa)',
    aliases: ['rolled oats', 'oats', 'colloidal oatmeal', 'avena sativa kernel flour'],
    categories: ['food', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Rich in beta-glucan soluble fibers and avenanthramides. Lowers LDL cholesterol, nourishes beneficial gut microbiota, and calms systemic vascular inflammation.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 9.5, level: 'excellent', tags: ['High Fiber', 'Heart Healthy Fats', 'Vitamin & Mineral Dense', 'Anti-Inflammatory', 'Prebiotic / Probiotic', 'Whole Food Source'], nutritionImpact: 'Outstanding whole grain. Rich in beta-glucan soluble fiber that lowers cholesterol, manganese, phosphorus, magnesium, iron, and B-vitamins. Sustained slow-release energy with prebiotic gut benefits.' }
  },
  {
    name: 'Raw Honey / Organic Honey',
    aliases: ['honey', 'raw honey', 'organic honey', 'manuka honey'],
    categories: ['food', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Contains natural glucose oxidase, phenolic flavonoids, and prebiotics. Exhibits antimicrobial efficacy, supports gut lining integrity, and provides low-glycemic antioxidant energy.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 7.5, level: 'good', tags: ['Rich in Antioxidants', 'Prebiotic / Probiotic', 'Whole Food Source', 'Anti-Inflammatory'], nutritionImpact: 'Natural sweetener rich in polyphenols, flavonoids, and enzymes. Provides antimicrobial and prebiotic benefits. Still caloric sugar — healthful in moderation.' }
  },
  {
    name: 'Chia Seeds & Flaxseeds',
    aliases: ['chia seeds', 'flaxseeds', 'salvia hispanica', 'linum usitatissimum'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Powerhouse source of plant omega-3 alpha-linolenic acid (ALA), soluble mucilage fiber, and lignans. Reduces systemic vascular inflammation and stabilizes postprandial glucose.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 9.8, level: 'excellent', tags: ['High Fiber', 'Heart Healthy Fats', 'Complete Protein', 'Rich in Antioxidants', 'Anti-Inflammatory', 'Whole Food Source'], nutritionImpact: 'Nutritional powerhouses. Excellent source of omega-3 ALA, complete plant protein, soluble fiber, calcium, magnesium, and lignans. Stabilize blood sugar and lower cardiovascular risk.' }
  },
  {
    name: 'Cold Pressed Extra Virgin Olive Oil',
    aliases: ['extra virgin olive oil', 'olive oil', 'olea europaea fruit oil'],
    categories: ['food', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'High in oleic acid and oleocanthal (natural anti-inflammatory phenolic). Protects vascular endothelial lining, promotes longevity pathways, and reduces systemic oxidative stress.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 9.2, level: 'excellent', tags: ['Heart Healthy Fats', 'Rich in Antioxidants', 'Anti-Inflammatory', 'Whole Food Source'], nutritionImpact: 'Premium source of monounsaturated oleic acid and oleocanthal polyphenols. Protects cardiovascular system, reduces oxidative stress, and supports Mediterranean-diet longevity pathways.' }
  },
  {
    name: 'Turmeric & Curcumin',
    aliases: ['turmeric', 'curcumin', 'curcuma longa'],
    categories: ['food', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Potent natural polyphenol that inhibits NF-kB inflammatory cascades, reduces joint and bowel inflammation, and neutralizes intracellular reactive oxygen species.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 9.5, level: 'excellent', tags: ['Rich in Antioxidants', 'Anti-Inflammatory', 'Whole Food Source', 'Vitamin & Mineral Dense'], nutritionImpact: 'Exceptional medicinal spice. Curcumin is one of nature\'s most potent anti-inflammatory compounds. Rich in iron, manganese, and antioxidants. Supports joint, brain, and cardiovascular health.' }
  },

  // ==========================================
  // FOOD: SAFE BUT NUTRITIONALLY POOR / UNHEALTHY
  // ==========================================
  {
    name: 'Refined White Sugar (Sucrose)',
    aliases: ['sugar', 'cane sugar', 'sucrose', 'white sugar', 'granulated sugar', 'powdered sugar', 'invert sugar', 'icing sugar'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.5,
    bodyImpact: 'Caloric sweetener that is not acutely toxic but contributes to chronic metabolic stress when consumed in excess.',
    tags: ['Metabolic Stressor'],
    cleanAlternatives: ['Raw Honey', 'Coconut Sugar', 'Dates', 'Maple Syrup'],
    nutrition: { nutritionScore: 2.0, level: 'unhealthy', tags: ['Empty Calories', 'High Glycemic', 'Nutrient Depleting', 'Pro-Inflammatory'], nutritionImpact: 'Pure refined carbohydrate stripped of all vitamins, minerals, and fiber. Spikes blood glucose rapidly, promotes insulin resistance, dental cavities, visceral fat accumulation, and chronic low-grade inflammation.' }
  },
  {
    name: 'Enriched / Refined Wheat Flour (Maida)',
    aliases: ['enriched flour', 'wheat flour', 'refined flour', 'maida', 'all-purpose flour', 'bleached flour', 'enriched bleached flour', 'white flour'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.3,
    bodyImpact: 'Chemically bleached and stripped grain that is not acutely toxic but nutritionally depleted.',
    tags: ['Metabolic Stressor'],
    cleanAlternatives: ['Whole Wheat Flour', 'Almond Flour', 'Oat Flour', 'Millet Flour'],
    nutrition: { nutritionScore: 2.5, level: 'unhealthy', tags: ['Refined / Processed', 'High Glycemic', 'Nutrient Depleting', 'Low Nutrient Density'], nutritionImpact: 'Stripped of bran and germ during milling — loses 75% of B-vitamins, 90% of fiber, and most minerals. High glycemic index spikes blood sugar almost as fast as table sugar. Synthetic vitamins added back ("enriched") poorly compensate.' }
  },
  {
    name: 'Palm Oil / Refined Vegetable Oil',
    aliases: ['palm oil', 'vegetable oil', 'refined palm oil', 'palm kernel oil', 'soybean oil', 'canola oil', 'sunflower oil', 'corn oil', 'cottonseed oil'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.4,
    bodyImpact: 'Heavily refined seed and palm oils are not acutely toxic but are pro-inflammatory when consumed regularly.',
    tags: ['Metabolic Stressor'],
    cleanAlternatives: ['Extra Virgin Olive Oil', 'Avocado Oil', 'Cold-Pressed Coconut Oil', 'Ghee'],
    nutrition: { nutritionScore: 3.0, level: 'poor', tags: ['Pro-Inflammatory', 'Refined / Processed', 'Nutrient Depleting'], nutritionImpact: 'High in omega-6 linoleic acid which promotes inflammatory cascades when consumed in excess. Heavily refined with chemical solvents, deodorized, and bleached — destroying natural antioxidants. Imbalances the omega-6:omega-3 ratio.' }
  },
  {
    name: 'Maltodextrin',
    aliases: ['maltodextrin', 'corn maltodextrin', 'rice maltodextrin'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.3,
    bodyImpact: 'Highly processed starch derivative used as a filler and thickener. Not acutely toxic.',
    tags: ['Metabolic Stressor'],
    cleanAlternatives: ['Tapioca Starch (less processed)', 'Arrowroot Powder'],
    nutrition: { nutritionScore: 2.0, level: 'unhealthy', tags: ['Empty Calories', 'High Glycemic', 'Refined / Processed', 'Low Nutrient Density'], nutritionImpact: 'Ultra-processed starch with a glycemic index of 85-105 (higher than table sugar). Provides rapid glucose spikes with zero fiber, vitamins, or minerals. Often used as cheap bulking filler in processed foods.' }
  },
  {
    name: 'Corn Syrup / Glucose Syrup',
    aliases: ['corn syrup', 'glucose syrup', 'corn syrup solids', 'glucose solids'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.6,
    bodyImpact: 'Concentrated glucose solution from corn starch. Less harmful than HFCS but still a refined sugar with no nutritional value.',
    tags: ['Metabolic Stressor'],
    cleanAlternatives: ['Raw Honey', 'Brown Rice Syrup (organic)', 'Date Syrup'],
    nutrition: { nutritionScore: 1.5, level: 'unhealthy', tags: ['Empty Calories', 'High Glycemic', 'Refined / Processed', 'Nutrient Depleting'], nutritionImpact: 'Concentrated liquid sugar with glycemic index ~100. Provides rapid empty calories with zero fiber, protein, vitamins, or minerals. Drives blood sugar spikes and promotes lipogenesis.' }
  },
  {
    name: 'Modified Food Starch',
    aliases: ['modified food starch', 'modified corn starch', 'modified starch', 'modified tapioca starch'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.2,
    bodyImpact: 'Chemically or physically altered starch used as thickener. Generally recognized as safe.',
    tags: [],
    cleanAlternatives: ['Arrowroot Powder', 'Tapioca Starch', 'Kuzu Root Starch'],
    nutrition: { nutritionScore: 3.0, level: 'poor', tags: ['Refined / Processed', 'Low Nutrient Density', 'Empty Calories'], nutritionImpact: 'Industrially modified starch providing only empty carbohydrate calories. No protein, fiber, vitamins, or minerals. Filler ingredient common in ultra-processed foods.' }
  },
  {
    name: 'Artificial Flavor / Natural Flavor',
    aliases: ['artificial flavor', 'natural flavor', 'natural flavors', 'artificial flavoring', 'natural flavoring', 'flavor'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.3,
    bodyImpact: 'Flavoring compounds that are generally safe in regulated amounts but provide no nutritional benefit.',
    tags: [],
    cleanAlternatives: ['Real Spices & Herbs', 'Vanilla Bean', 'Citrus Zest', 'Cacao'],
    nutrition: { nutritionScore: 3.0, level: 'poor', tags: ['Artificial Additive', 'Low Nutrient Density'], nutritionImpact: 'Flavoring agents (often 50-100 undisclosed chemicals) with zero nutritional value. "Natural flavors" are lab-derived to mimic natural taste and do not carry the vitamins or phytonutrients of the real food source.' }
  },
  {
    name: 'Whey / Whey Protein',
    aliases: ['whey', 'whey protein', 'whey protein concentrate', 'whey protein isolate', 'whey powder'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Dairy-derived complete protein that supports muscle synthesis and immune function.',
    tags: ['Bio-Compatible & Nourishing'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 7.5, level: 'good', tags: ['Complete Protein', 'Vitamin & Mineral Dense'], nutritionImpact: 'High-quality complete protein with all essential amino acids and high leucine for muscle protein synthesis. Contains calcium, B-vitamins, and immunoglobulins. Highly bioavailable.' }
  },
  {
    name: 'Almonds / Tree Nuts',
    aliases: ['almonds', 'almond', 'walnuts', 'walnut', 'cashews', 'cashew', 'pecans', 'pecan', 'pistachios', 'pistachio', 'hazelnuts', 'hazelnut', 'tree nuts', 'mixed nuts', 'macadamia'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Nutrient-dense whole foods rich in healthy fats, protein, and minerals. Support cardiovascular and cognitive health.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 9.5, level: 'excellent', tags: ['Heart Healthy Fats', 'Complete Protein', 'High Fiber', 'Vitamin & Mineral Dense', 'Rich in Antioxidants', 'Anti-Inflammatory', 'Whole Food Source'], nutritionImpact: 'Outstanding nutrition. Rich in monounsaturated fats, vitamin E, magnesium, manganese, copper, and plant protein. Regular consumption reduces cardiovascular mortality by up to 20%. Excellent fiber and phytosterol content.' }
  },
  {
    name: 'Cinnamon',
    aliases: ['cinnamon', 'ceylon cinnamon', 'cinnamomum', 'cassia cinnamon'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Aromatic spice with potent antioxidant and anti-glycemic properties.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 9.0, level: 'excellent', tags: ['Rich in Antioxidants', 'Anti-Inflammatory', 'Whole Food Source', 'Vitamin & Mineral Dense'], nutritionImpact: 'Exceptional antioxidant spice — highest ORAC value among common spices. Contains cinnamaldehyde which improves insulin sensitivity, lowers fasting blood glucose, and reduces LDL cholesterol. Rich in manganese and calcium.' }
  },
  {
    name: 'Sea Salt / Sodium Chloride',
    aliases: ['salt', 'sea salt', 'sodium chloride', 'himalayan salt', 'kosher salt', 'table salt', 'iodized salt'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0.2,
    bodyImpact: 'Essential mineral for electrolyte balance. Excess intake linked to hypertension and cardiovascular strain.',
    tags: [],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 5.0, level: 'neutral', tags: ['Excess Sodium'], nutritionImpact: 'Essential electrolyte required for nerve function and fluid balance. In moderation, necessary for health. Excess intake (>2,300 mg/day) raises blood pressure and cardiovascular risk. Unrefined sea salt provides trace minerals; table salt is heavily processed.' }
  },
  {
    name: 'Glycerin / Vegetable Glycerin',
    aliases: ['glycerin', 'glycerol', 'vegetable glycerin', 'glycerine'],
    categories: ['food', 'personal_care'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Sugar alcohol humectant that is safe for consumption and topical use.',
    tags: ['Bio-Compatible & Nourishing'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 4.0, level: 'neutral', tags: ['Low Nutrient Density'], nutritionImpact: 'Caloric humectant (~4 cal/g) with no vitamins, minerals, or fiber. Safe and well-tolerated but provides no meaningful nutritional benefit beyond mild sweetness and moisture retention.' }
  },
  {
    name: 'Citric Acid',
    aliases: ['citric acid', 'e330', 'lemon acid'],
    categories: ['food', 'personal_care'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Natural organic acid found in citrus fruits. Safe acidity regulator and antioxidant.',
    tags: ['Bio-Compatible & Nourishing'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 5.0, level: 'neutral', tags: [], nutritionImpact: 'Naturally occurring in citrus fruits. Acts as a safe pH regulator and mild antioxidant. Provides no significant macronutrient or micronutrient value on its own, but supports mineral absorption.' }
  },
  {
    name: 'Xanthan Gum',
    aliases: ['xanthan gum', 'e415'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Fermented polysaccharide thickener. Well-tolerated and acts as soluble fiber.',
    tags: ['Bio-Compatible & Nourishing'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 5.5, level: 'neutral', tags: ['High Fiber'], nutritionImpact: 'Fermented polysaccharide that functions as soluble fiber in the gut. Improves texture in gluten-free foods. Well-tolerated; provides modest prebiotic benefit at low doses.' }
  },
  {
    name: 'Soy Lecithin',
    aliases: ['soy lecithin', 'lecithin', 'sunflower lecithin', 'e322'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Natural phospholipid emulsifier derived from soy or sunflower. Safe and well-tolerated.',
    tags: ['Bio-Compatible & Nourishing'],
    cleanAlternatives: [],
    nutrition: { nutritionScore: 5.5, level: 'neutral', tags: [], nutritionImpact: 'Phospholipid emulsifier providing choline (essential nutrient for brain and liver function). Sunflower lecithin is allergen-free alternative to soy. Minimal caloric contribution in typical use amounts.' }
  }

];

export const PRESET_SAMPLES = [
  {
    id: 'snack-processed',
    title: 'Ultra-Processed Cheesy Chips',
    category: 'food' as ProductCategory,
    description: 'Typical commercial junk food with petroleum dyes, trans fats, and artificial preservatives.',
    expectedScore: '1.8 / 10',
    badge: 'Toxic / Harmful',
    ingredientsText: 'Corn Meal, Partially Hydrogenated Soybean Oil, High Fructose Corn Syrup, Salt, Whey, Maltodextrin, Cheddar Cheese, Monosodium Glutamate, Artificial Flavor, Yellow 6 (Sunset Yellow), Red 40 (Allura Red), BHT (preservative), Sodium Benzoate.'
  },
  {
    id: 'shampoo-harsh',
    title: 'Harsh Chemical Sulfate Shampoo',
    category: 'haircare' as ProductCategory,
    description: 'Conventional drugstore shampoo packed with aggressive sulfates, formaldehyde releaser, and allergens.',
    expectedScore: '2.1 / 10',
    badge: 'Severe Scalp Irritant',
    ingredientsText: 'Water, Sodium Lauryl Sulfate (SLS), Sodium Laureth Sulfate (SLES), Cocamidopropyl Betaine, Dimethicone, DMDM Hydantoin, Methylisothiazolinone, Fragrance (Parfum), Behentrimonium Chloride, Sodium Chloride, Citric Acid, FD&C Yellow 5.'
  },
  {
    id: 'cream-toxic',
    title: 'Bleaching & Chemical Face Cream',
    category: 'skincare' as ProductCategory,
    description: 'Old-formula whitening cream with endocrine-disrupting chemicals and forbidden bleaching agents.',
    expectedScore: '1.5 / 10',
    badge: 'High Health Hazard',
    ingredientsText: 'Water, Mineral Oil, Hydroquinone (2%), Methylparaben, Propylparaben, Oxybenzone, Polyethylene Glycol (PEG-100 Stearate), Alcohol Denat, Synthetic Fragrance, BHT, Disodium EDTA.'
  },
  {
    id: 'food-empty-calories',
    title: 'Safe but Empty-Calorie Biscuit',
    category: 'food' as ProductCategory,
    description: 'Safe additives (no banned dyes/toxins) yet nutritionally depleted: refined maida, white sugar, and palm oil.',
    expectedScore: 'Safety 7.8 | Nutrition 2.2',
    badge: 'Safe but Unhealthy',
    ingredientsText: 'Enriched Wheat Flour (Maida), Sugar, Palm Oil, Corn Syrup, Salt, Artificial Flavor, Soy Lecithin, Citric Acid.'
  },
  {
    id: 'food-clean',
    title: 'Organic Honey & Nut Granola',
    category: 'food' as ProductCategory,
    description: 'Wholesome, clean food made of nutrient-dense natural ingredients with zero toxic additives.',
    expectedScore: '9.8 / 10',
    badge: 'Safe & Nourishing',
    ingredientsText: 'Rolled Oats (Avena Sativa), Raw Honey, Almonds, Chia Seeds, Cold Pressed Extra Virgin Olive Oil, Cinnamon, Sea Salt, Vanilla Bean Extract.'
  },
  {
    id: 'shampoo-clean',
    title: 'Clean Herbal Sulfate-Free Shampoo',
    category: 'haircare' as ProductCategory,
    description: 'Gentle scalp-friendly formula with plant glucosides, aloe vera, and stimulating rosemary extract.',
    expectedScore: '9.6 / 10',
    badge: 'Body-Friendly & Gentle',
    ingredientsText: 'Aloe Barbadensis Leaf Juice, Decyl Glucoside, Coco-Glucoside, Glycerin, Argania Spinosa (Argan Oil), Rosemary Leaf Extract, Hydrolyzed Wheat Protein, Panthenol (Provitamin B5), Sodium Cocoyl Isethionate, Xanthan Gum.'
  },
  {
    id: 'skincare-clean',
    title: 'Ceramide Barrier Recovery Serum',
    category: 'skincare' as ProductCategory,
    description: 'Dermatologist-grade bio-compatible skincare that reinforces skin barrier with zero endocrine disruptors.',
    expectedScore: '9.9 / 10',
    badge: 'Exceptional Skin Safety',
    ingredientsText: 'Water, Hyaluronic Acid, Ceramide NP, Ceramide AP, Ceramide EOP, Squalane (Plant Derived), Niacinamide, Centella Asiatica Extract, Glycerin, Tocopherol (Vitamin E).'
  }
];
