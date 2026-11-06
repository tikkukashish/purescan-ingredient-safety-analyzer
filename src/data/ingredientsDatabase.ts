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
    regulatoryNotes: 'Widely used in USA; limited or regulated under sugar-tax regimes globally.'
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
    regulatoryNotes: 'Banned by US FDA (GRAS revoked) and strictly limited under EU regulations.'
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
    regulatoryNotes: 'In the European Union, requires mandatory warning label: "May have an adverse effect on activity and attention in children."'
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
    regulatoryNotes: 'Requires Southampton hyperactivity warning label in the European Union.'
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
    regulatoryNotes: 'Requires warning label in the EU and banned in Norway and Sweden.'
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
    regulatoryNotes: 'Officially BANNED as a food additive across the entire European Union in 2022 following EFSA safety evaluation.'
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
    regulatoryNotes: 'Strict maximum allowable levels in beverages due to benzene formation.'
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
    regulatoryNotes: 'Banned in the European Union, Canada, Brazil, China, and the UK. Still permitted in USA.'
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
    regulatoryNotes: 'Classified Group 2B carcinogen by WHO/IARC in 2023. Contraindicated for individuals with phenylketonuria (PKU).'
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
    regulatoryNotes: 'Extensively studied; debates continue over high-temperature degradation and gut microflora shifts.'
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
    regulatoryNotes: 'Banned in infant formula in the European Union.'
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
    regulatoryNotes: 'Classified by WHO as linked directly to colorectal cancer risks in processed meats.'
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
    regulatoryNotes: 'Approved globally as GRAS, requires declaration in ingredients.'
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
    cleanAlternatives: []
  },
  {
    name: 'Raw Honey / Organic Honey',
    aliases: ['honey', 'raw honey', 'organic honey', 'manuka honey'],
    categories: ['food', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Contains natural glucose oxidase, phenolic flavonoids, and prebiotics. Exhibits antimicrobial efficacy, supports gut lining integrity, and provides low-glycemic antioxidant energy.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Chia Seeds & Flaxseeds',
    aliases: ['chia seeds', 'flaxseeds', 'salvia hispanica', 'linum usitatissimum'],
    categories: ['food'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Powerhouse source of plant omega-3 alpha-linolenic acid (ALA), soluble mucilage fiber, and lignans. Reduces systemic vascular inflammation and stabilizes postprandial glucose.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Cold Pressed Extra Virgin Olive Oil',
    aliases: ['extra virgin olive oil', 'olive oil', 'olea europaea fruit oil'],
    categories: ['food', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'High in oleic acid and oleocanthal (natural anti-inflammatory phenolic). Protects vascular endothelial lining, promotes longevity pathways, and reduces systemic oxidative stress.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
  },
  {
    name: 'Turmeric & Curcumin',
    aliases: ['turmeric', 'curcumin', 'curcuma longa'],
    categories: ['food', 'skincare'],
    riskLevel: 'safe',
    hazardScore: 0,
    bodyImpact: 'Potent natural polyphenol that inhibits NF-kB inflammatory cascades, reduces joint and bowel inflammation, and neutralizes intracellular reactive oxygen species.',
    tags: ['Bio-Compatible & Nourishing', 'Cellular Protective'],
    cleanAlternatives: []
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
