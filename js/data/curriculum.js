// The 100-day curriculum. Days 1-18 are below; days 19-100 live in
// js/data/days/<specialty>.js so each specialty can be sent to its own
// reviewer. Every day carries its own review status and sources (see
// docs/CONTENT.md): nothing is called "reviewed" until a named clinician
// has checked it against the listed sources. Content is a study-aid
// outline at a foundational, textbook level — classifications,
// mechanisms, clinical reasoning frames — deliberately without specific
// dosing or treatment algorithms.
import { LATER_DAYS } from './days/index.js';
import { EARLY_SOURCES } from './days/early-sources.js';

const EARLY_DAYS = [
  {
    day: 1,
    title: 'Heart Failure — The Big Picture',
    system: 'Cardiology',
    topicId: 'cardio-hf-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Define heart failure in terms of impaired pump function, not just low ejection fraction',
      'Distinguish HFrEF from HFpEF and why the distinction changes management',
      'Recognize the classic signs/symptoms split between left- and right-sided failure',
    ],
    coreContent: `Heart failure is a clinical syndrome, not a single disease — the heart cannot pump enough blood to meet the body's demands, or can only do so at abnormally high filling pressures.

Two broad categories matter clinically:
- HFrEF (reduced ejection fraction, typically <40%) — a problem of contraction (systolic dysfunction).
- HFpEF (preserved ejection fraction, typically >=50%) — the chamber contracts normally but fails to relax and fill properly (diastolic dysfunction).

Left-sided failure backs up into the lungs: dyspnea, orthopnea, paroxysmal nocturnal dyspnea, crackles.
Right-sided failure backs up into the systemic venous system: peripheral edema, jugular venous distension, hepatomegaly.
Many patients have both, since the two sides share a circulation.`,
    keyConcepts: [
      'Ejection fraction splits management pathways (HFrEF has far more evidence-based drug therapy than HFpEF)',
      'Neurohormonal activation (RAAS, sympathetic) initially compensates, then drives disease progression',
      'BNP/NT-proBNP rises with wall stress and is useful to rule out heart failure when low',
    ],
    clinicalPearls: [
      'Orthopnea and PND are more specific for heart failure than dyspnea on exertion alone',
      'A normal BNP in an acutely dyspneic patient makes heart failure unlikely',
    ],
  },
  {
    day: 2,
    title: 'Asthma — Pathophysiology to Presentation',
    system: 'Pulmonology',
    topicId: 'pulm-asthma-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Explain the three components of asthma pathophysiology: inflammation, bronchoconstriction, airway remodeling',
      'Recognize the classic triad of symptoms and common triggers',
      'Understand why asthma is reversible airway obstruction, in contrast to COPD',
    ],
    coreContent: `Asthma is chronic airway inflammation with episodic, reversible bronchoconstriction.

Three mechanisms combine:
1. Inflammation — eosinophilic/Th2-driven in the classic allergic phenotype, causing airway edema and mucus hypersecretion.
2. Bronchoconstriction — smooth muscle hyperresponsiveness to triggers (allergens, cold air, exercise, irritants).
3. Airway remodeling — with chronic poorly controlled disease, structural changes (smooth muscle hypertrophy, subepithelial fibrosis) that can become partially irreversible.

Classic triad: wheeze, cough, dyspnea — often worse at night/early morning, episodic rather than constant.

The key distinguishing feature from COPD: asthma's obstruction is substantially reversible with bronchodilator (and improves between attacks), whereas COPD's is largely fixed.`,
    keyConcepts: [
      'Spirometry: obstructive pattern (reduced FEV1/FVC) that improves significantly with bronchodilator (reversibility)',
      'Peak flow variability is a hallmark — asthma symptoms and lung function fluctuate, unlike fixed COPD obstruction',
      'Exercise, cold air, and viral URIs are common triggers distinct from allergen exposure',
    ],
    clinicalPearls: [
      'A "silent chest" in an asthma exacerbation is an ominous sign — it means too little air is moving to generate a wheeze, not improvement',
      'Nocturnal symptoms are a marker of poor control, not just a coincidence of timing',
    ],
  },
  {
    day: 3,
    title: 'Acute Kidney Injury — The Three Buckets',
    system: 'Nephrology',
    topicId: 'nephro-aki-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Classify AKI into prerenal, intrinsic, and postrenal causes',
      'Describe the basic diagnostic approach to localize the cause',
      'Understand why prerenal azotemia is functionally reversible if corrected early',
    ],
    coreContent: `AKI is a sudden decline in kidney function — the diagnostic approach starts by sorting the cause into one of three buckets, since each has a different fix.

Prerenal: the kidney itself is structurally fine, but it isn't being perfused adequately (volume depletion, heart failure, severe hypotension). Reversible if perfusion is restored before intrinsic damage sets in.

Intrinsic: damage to the kidney tissue itself — most commonly acute tubular necrosis (ATN) from prolonged ischemia or nephrotoxins, but also glomerulonephritis or interstitial nephritis.

Postrenal: obstruction somewhere in the urinary tract (stones, prostatic enlargement, tumor) causing back-pressure. Often reversible once the obstruction is relieved, but can become irreversible if prolonged.

Prolonged, uncorrected prerenal injury is the classic way intrinsic ATN develops — the categories form a continuum, not always a clean line.`,
    keyConcepts: [
      'Urine studies (FeNa, urine sodium, microscopy) help distinguish prerenal from intrinsic causes',
      'Muddy brown casts on urine microscopy are classic for ATN',
      'A bladder scan or renal ultrasound screens quickly for postrenal obstruction',
    ],
    clinicalPearls: [
      'A BUN:creatinine ratio >20:1 suggests a prerenal process, though it is not perfectly specific',
      'Always rule out obstruction (postrenal) early — it is one of the few AKI causes fixed by a single intervention',
    ],
  },
  {
    day: 4,
    title: 'Diabetes Mellitus — Type 1 vs Type 2',
    system: 'Endocrinology',
    topicId: 'endo-dm-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Contrast the core mechanism of Type 1 (autoimmune beta-cell destruction) vs Type 2 (insulin resistance plus relative deficiency)',
      'Recognize typical presentations at diagnosis for each type',
      'Understand the diagnostic criteria categories (fasting glucose, OGTT, A1c) at a conceptual level',
    ],
    coreContent: `Type 1 diabetes is autoimmune destruction of pancreatic beta cells, leading to absolute insulin deficiency. It typically presents in children/young adults, often acutely (polyuria, polydipsia, weight loss, sometimes diabetic ketoacidosis), because there is essentially no insulin reserve left to buffer the decline.

Type 2 diabetes starts with insulin resistance in peripheral tissues (muscle, fat, liver); the pancreas initially compensates with more insulin, but beta-cell function gradually declines, leading to relative insulin deficiency. It typically presents more insidiously in adults, often found incidentally on routine labs, and is strongly associated with obesity and sedentary lifestyle.

Diagnosis in both rests on the same lab categories — fasting plasma glucose, oral glucose tolerance test, or A1c (reflecting average glycemia over ~3 months) — the type is distinguished by clinical context and, when needed, antibody/C-peptide testing, not by the glucose number itself.`,
    keyConcepts: [
      'C-peptide is low in Type 1 (little endogenous insulin being made) and often normal/high early in Type 2 (compensatory hyperinsulinemia)',
      'DKA is a Type 1 hallmark presentation; HHS (hyperosmolar hyperglycemic state) is more typical of severe Type 2 decompensation',
      'A1c reflects average glycemic control, not a single point-in-time glucose',
    ],
    clinicalPearls: [
      'Not every new diabetic who is an adult has Type 2 — consider latent autoimmune diabetes of adulthood (LADA) in a lean adult with a rapid decline in control',
      'Weight loss at diagnosis is a red flag pointing toward absolute insulin deficiency, not simply "poorly controlled Type 2"',
    ],
  },
  {
    day: 5,
    title: 'Stroke — Ischemic vs Hemorrhagic',
    system: 'Neurology',
    topicId: 'neuro-stroke-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Differentiate ischemic from hemorrhagic stroke by mechanism and why imaging comes before treatment',
      'Recognize the time-sensitivity of ischemic stroke management',
      'Understand the basic utility of a non-contrast CT head as the first study',
    ],
    coreContent: `Stroke is a sudden neurologic deficit from disrupted blood supply to the brain — but the two broad mechanisms are treated in opposite directions, which is why imaging must come first.

Ischemic stroke (~85% of strokes) results from a blocked vessel (thrombosis or embolism) cutting off blood supply to brain tissue. Time-sensitive reperfusion strategies exist, but only within defined time windows from symptom onset.

Hemorrhagic stroke results from bleeding into brain tissue (intracerebral) or into the subarachnoid space, often from hypertension, vascular malformations, or aneurysm rupture. Giving a clot-dissolving therapy intended for ischemic stroke to a hemorrhagic stroke patient would be actively harmful — which is precisely why a non-contrast CT head is the mandatory first step before any time-sensitive intervention: it reliably distinguishes "bleeding" from "no bleeding" even though early ischemia can be subtle on CT.`,
    keyConcepts: [
      'Non-contrast CT is fast and highly sensitive for acute blood — its main job here is to exclude hemorrhage, not to confirm ischemia',
      '"Time is brain" — the eligibility window for reperfusion therapy in ischemic stroke is measured in hours from last-known-well',
      'Risk factors overlap (hypertension, atrial fibrillation for ischemic; hypertension, aneurysms for hemorrhagic) but mechanisms diverge sharply',
    ],
    clinicalPearls: [
      'A sudden "worst headache of my life" points more toward subarachnoid hemorrhage than ischemic stroke',
      'Establishing the exact last-known-well time is often the single most important history point in acute stroke care',
    ],
  },
  {
    day: 6,
    title: 'Sepsis — Recognizing the Syndrome',
    system: 'Infectious Disease',
    topicId: 'id-sepsis-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Define sepsis as a dysregulated host response to infection causing organ dysfunction, not simply "a bad infection"',
      'Recognize common early clinical clues suggesting sepsis',
      'Understand why early recognition changes outcomes',
    ],
    coreContent: `Sepsis is life-threatening organ dysfunction caused by a dysregulated host response to infection — the key shift in modern definitions is that it is the body's own inflammatory/immune response, not the pathogen itself, that drives the damage.

This matters clinically: a patient can look only mildly unwell from the infection itself but already be sliding into organ dysfunction — altered mentation, rising lactate, falling blood pressure, dropping urine output, worsening oxygenation — which is what actually defines sepsis, distinguishing it from an infection that remains localized and uncomplicated.

Septic shock is the subset with persistent hypotension requiring vasopressors to maintain adequate blood pressure despite adequate fluid resuscitation, plus a lactate elevation reflecting tissue hypoperfusion.`,
    keyConcepts: [
      'Organ dysfunction, not fever or white count alone, is what defines sepsis in current frameworks',
      'Lactate is a marker of tissue hypoperfusion/anaerobic metabolism and trends are tracked to judge response to treatment',
      'Source control (identifying and addressing the focus of infection) is as important as antimicrobial therapy',
    ],
    clinicalPearls: [
      'An elderly or immunosuppressed patient with sepsis may not mount a fever at all — absence of fever does not exclude sepsis',
      'New confusion in an elderly patient with a urinary tract infection is a classic, easily-missed early sepsis presentation',
    ],
  },
  {
    day: 7,
    title: 'COPD — Fixed Obstruction and Phenotypes',
    system: 'Pulmonology',
    topicId: 'pulm-copd-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Contrast COPD’s largely fixed airflow obstruction with asthma’s reversible obstruction',
      'Describe the two classic clinical phenotypes and why they are a spectrum, not strict categories',
      'Understand why smoking history is central to the diagnosis',
    ],
    coreContent: `COPD is chronic, largely irreversible airflow limitation, almost always driven by long-term exposure to noxious particles — overwhelmingly cigarette smoke in most patients, though occupational dusts and biomass fuel exposure matter too.

Two classic descriptive phenotypes are taught, though most real patients sit somewhere on a spectrum between them:
- "Pink puffer" (emphysema-predominant): airspace destruction and loss of elastic recoil, often thin, with pursed-lip breathing to keep airways open longer on exhalation.
- "Blue bloater" (chronic-bronchitis-predominant): chronic productive cough, more V/Q mismatch, more prone to hypoxemia and cor pulmonale.

Unlike asthma, spirometry shows obstruction that improves only minimally, if at all, with bronchodilator — the obstruction is structural (airway remodeling, lost elastic recoil), not primarily reversible smooth-muscle constriction.`,
    keyConcepts: [
      'Spirometry: FEV1/FVC ratio is reduced and does not normalize substantially with bronchodilator, unlike asthma',
      'Chronic bronchitis is defined clinically (productive cough most days for 3+ months in 2 consecutive years), emphysema structurally (airspace destruction)',
      'Exacerbations are typically triggered by respiratory infections and are a major driver of disease progression',
    ],
    clinicalPearls: [
      'A COPD diagnosis in a lifelong never-smoker should prompt a search for an alternative cause (e.g. alpha-1 antitrypsin deficiency)',
      'Pursed-lip breathing is a learned compensation that increases airway pressure and slows expiration, not a sign of panic',
    ],
  },
  {
    day: 8,
    title: 'Inflammatory Bowel Disease — Crohn’s vs Ulcerative Colitis',
    system: 'Gastroenterology',
    topicId: 'gi-ibd-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Distinguish the pattern of bowel involvement in Crohn’s disease from ulcerative colitis',
      'Recognize characteristic extraintestinal associations',
      'Understand why the distinction changes surgical and long-term management',
    ],
    coreContent: `Both are chronic immune-mediated bowel inflammation, but the pattern of involvement differs in ways that matter clinically.

Ulcerative colitis involves the colon only, continuously from the rectum proximally, and is limited to the mucosa — which is why a colectomy can be curative for refractory disease.

Crohn’s disease can affect any part of the GI tract from mouth to anus, characteristically with "skip lesions" (patchy, non-continuous involvement) and transmural inflammation (through the full bowel wall) — which is why it is prone to fistulas, strictures, and abscesses, and why surgery is not curative (disease can recur elsewhere).`,
    keyConcepts: [
      'Transmural inflammation (Crohn’s) predisposes to fistulas and strictures; mucosal-only inflammation (UC) predisposes to bleeding and, long-term, colorectal cancer risk',
      'Both are associated with extraintestinal manifestations: uveitis, erythema nodosum, and axial arthritis/spondyloarthritis among them',
      'Smoking is associated with worse Crohn’s disease but appears somewhat protective for ulcerative colitis — an unusual, often-tested distinction',
    ],
    clinicalPearls: [
      'Rectal sparing with patchy proximal disease points toward Crohn’s; continuous disease starting at the rectum points toward UC',
      'Perianal fistulas/abscesses are a Crohn’s hallmark essentially never seen as a primary UC feature',
    ],
  },
  {
    day: 9,
    title: 'Rheumatoid Arthritis — A Systemic Autoimmune Disease',
    system: 'Rheumatology',
    topicId: 'rheum-ra-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Describe the typical joint distribution and pattern of morning stiffness in RA',
      'Recognize RA as a systemic disease, not only a joint disease',
      'Understand the basic role of autoantibodies (RF, anti-CCP) in diagnosis',
    ],
    coreContent: `Rheumatoid arthritis is a chronic autoimmune disease causing symmetric inflammatory polyarthritis, classically affecting the small joints of the hands (MCPs, PIPs) and wrists, sparing the DIP joints — a pattern that helps distinguish it from osteoarthritis, which characteristically does involve the DIPs.

A hallmark feature is prolonged morning stiffness (classically over 30-60 minutes) that improves with movement — inflammatory stiffness behaves this way, in contrast to the brief stiffness of mechanical/degenerative joint disease.

RA is systemic: beyond joints, it can cause rheumatoid nodules, interstitial lung disease, and increased cardiovascular risk from chronic systemic inflammation — the joints are the most visible manifestation, not the whole disease.`,
    keyConcepts: [
      'Symmetric small-joint polyarthritis sparing the DIPs is the classic pattern, versus osteoarthritis which favors DIPs and is typically less symmetric',
      'Rheumatoid factor and anti-CCP antibodies support the diagnosis; anti-CCP is more specific for RA',
      'Chronic synovial inflammation can progressively erode joint cartilage and bone if poorly controlled',
    ],
    clinicalPearls: [
      'Morning stiffness duration is a genuinely useful discriminator: minutes (mechanical) versus the better part of an hour or more (inflammatory)',
      'A patient with long-standing RA and new chest symptoms deserves consideration of interstitial lung disease, not just reflexive reassurance',
    ],
  },
  {
    day: 10,
    title: 'Anemia — A Framework by Cell Size',
    system: 'Hematology/Oncology',
    topicId: 'heme-anemia-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Use MCV to sort anemia into microcytic, normocytic, and macrocytic categories',
      'Name the classic cause in each category',
      'Understand why this framework is the practical starting point for any anemia work-up',
    ],
    coreContent: `Anemia is low hemoglobin/hematocrit, and the single most useful first branch point in working it out is the mean corpuscular volume (MCV) — how big the red cells are.

Microcytic (MCV low): the classic cause is iron deficiency (impaired hemoglobin synthesis), but thalassemia and anemia of chronic disease can also be microcytic.

Normocytic (MCV normal): often anemia of chronic disease, or acute blood loss, or early iron deficiency before cell size has fully dropped; hemolysis can also present as normocytic.

Macrocytic (MCV high): classically vitamin B12 or folate deficiency (impaired DNA synthesis slows cell division, leaving cells large), but also seen with alcohol use and some medications.

This framework doesn’t replace a full work-up, but it reliably narrows the differential before further testing.`,
    keyConcepts: [
      'Iron deficiency anemia is microcytic and often accompanied by low ferritin; anemia of chronic disease is also often microcytic/normocytic but with normal-to-high ferritin',
      'B12/folate deficiency causes macrocytosis through impaired DNA synthesis, not a problem with hemoglobin itself',
      'Reticulocyte count helps distinguish underproduction (low retic) from increased destruction/loss (appropriately high retic)',
    ],
    clinicalPearls: [
      'New iron deficiency in an adult, especially a man or postmenopausal woman, warrants looking for a source of blood loss (e.g. GI), not just replacing iron',
      'A macrocytic anemia with neurologic symptoms points more toward B12 deficiency than folate, since B12 deficiency can also cause neurologic damage',
    ],
  },
  {
    day: 11,
    title: 'Mood Disorders — Major Depression vs Bipolar Disorder',
    system: 'Psychiatry',
    topicId: 'psych-mood-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Recognize the core diagnostic features of a major depressive episode',
      'Distinguish a manic from a hypomanic episode',
      'Understand why screening for past mania matters before treating depression',
    ],
    coreContent: `Major depressive disorder requires a persistent depressed mood or loss of interest/pleasure, plus associated symptoms (sleep, appetite, concentration, energy, guilt, psychomotor changes, suicidal ideation) present for at least two weeks and causing real functional impairment.

Bipolar disorder involves episodes of mania or hypomania, usually (though not always) alongside depressive episodes. Mania involves a distinct period of abnormally elevated, expansive, or irritable mood with increased energy, lasting at least a week (or any duration if hospitalization is required), severe enough to cause marked impairment or psychotic features. Hypomania is a milder, shorter version (at least 4 days) that does not cause marked impairment and has no psychotic features.

This distinction matters enormously in practice: treating a bipolar depressive episode as if it were unipolar depression, without recognizing the bipolar pattern, risks precipitating a manic switch.`,
    keyConcepts: [
      'A full diagnostic interview for depression should always screen for any past manic or hypomanic episodes before concluding "unipolar"',
      'Mania is distinguished from hypomania mainly by severity/duration and the presence of marked functional impairment or psychotic features',
      'Psychomotor and sleep changes can go in either direction (increased or decreased) within depressive episodes, which is a common source of confusion',
    ],
    clinicalPearls: [
      'Grandiosity, decreased need for sleep (not insomnia — genuinely not feeling tired), and racing thoughts are classic mania features, not just "high energy"',
      'A patient who reports past "great, productive, barely-slept" periods between depressive episodes should raise suspicion for an unrecognized bipolar pattern',
    ],
  },
  {
    day: 12,
    title: 'Preeclampsia — New Hypertension in Pregnancy',
    system: 'Obstetrics/Gynecology',
    topicId: 'obgyn-preeclampsia-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Define preeclampsia and when in pregnancy it is considered',
      'Recognize features that define "severe" disease',
      'Understand why delivery is the only definitive treatment',
    ],
    coreContent: `Preeclampsia is new-onset hypertension after 20 weeks of gestation, together with evidence of end-organ involvement — classically proteinuria, but the current framework also recognizes it without proteinuria if other severe features are present (e.g. thrombocytopenia, impaired liver function, renal insufficiency, pulmonary edema, new headache, or visual disturbances).

The underlying mechanism is abnormal placental development leading to widespread maternal endothelial dysfunction — which is why it is a multi-system disease, not simply "high blood pressure during pregnancy."

Delivery of the placenta is the only definitive treatment; management before that point (at earlier gestational ages) focuses on controlling severe hypertension and monitoring for progression, balancing maternal risk against fetal prematurity.`,
    keyConcepts: [
      'Severe features (very high blood pressure, visual symptoms, right-upper-quadrant pain, low platelets, impaired liver/renal function) change management urgency substantially',
      'Eclampsia is preeclampsia plus new seizures — a distinct, more severe entity requiring urgent management',
      'HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets) is a severe variant that can occur with or without prominent hypertension',
    ],
    clinicalPearls: [
      'A pregnant patient after 20 weeks with a new severe headache or visual changes should be evaluated for preeclampsia, not reflexively treated as a primary headache disorder',
      'Blood pressure can look only modestly elevated while other severe features (platelets, liver enzymes) are already markedly abnormal — the numbers alone do not tell the whole story',
    ],
  },
  {
    day: 13,
    title: 'Arrhythmias — Stable vs Unstable, Not Just Fast vs Slow',
    system: 'Cardiology',
    topicId: 'cardio-arrhythmia-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Classify arrhythmias broadly into bradyarrhythmias and tachyarrhythmias',
      'Understand why hemodynamic stability, not the rhythm name, drives the urgency of management',
      'Recognize signs of instability that change the management pathway',
    ],
    coreContent: `Arrhythmias are broadly either too slow (bradyarrhythmias — sinus node dysfunction, AV block) or too fast (tachyarrhythmias — supraventricular or ventricular in origin).

The single most important branch point in acute management is not the specific rhythm name but whether the patient is hemodynamically stable or unstable. Instability (hypotension, altered mental status, signs of shock, ischemic chest pain, or acute heart failure caused by the rhythm) changes everything about the urgency and approach, regardless of which specific arrhythmia is present.

A stable patient allows time for a more deliberate work-up (12-lead ECG, identifying the specific rhythm, considering reversible causes like electrolyte disturbances). An unstable patient needs the rhythm addressed urgently, often before a fully detailed diagnosis is even complete.`,
    keyConcepts: [
      'Wide-complex tachycardia should be treated as ventricular in origin until proven otherwise, given the consequences of misclassifying it',
      'Reversible/correctable causes (electrolyte abnormalities, hypoxia, ischemia, drug effects) should always be considered alongside the rhythm itself',
      'Vagal maneuvers and other diagnostic/therapeutic steps are reasonable in a stable patient but are not substitutes for urgent rhythm correction in an unstable one',
    ],
    clinicalPearls: [
      '"Treat the patient, not the monitor" is a genuinely useful habit — a stable patient with an abnormal-looking rhythm often tolerates a more careful work-up than panic would suggest',
      'New-onset atrial fibrillation with a rapid rate in an unstable patient is managed differently from the same rhythm found incidentally in a stable one, even though the ECG looks similar',
    ],
  },
  {
    day: 14,
    title: 'Chronic Kidney Disease — Staging and Its Downstream Effects',
    system: 'Nephrology',
    topicId: 'nephro-ckd-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Understand that CKD staging is based on estimated GFR (and albuminuria)',
      'Recognize the major downstream complications of declining kidney function',
      'Distinguish CKD’s gradual course from the abrupt onset of AKI',
    ],
    coreContent: `Chronic kidney disease is defined by sustained (3+ months) reduced kidney function and/or markers of kidney damage (such as albuminuria), staged mainly by estimated GFR — progressing from mildly reduced function through to kidney failure.

As GFR declines, predictable downstream problems accumulate, because the kidney does far more than filter waste: it regulates fluid/electrolyte balance, activates vitamin D, and produces erythropoietin. This is why advancing CKD brings a recognizable cluster of complications — anemia (reduced erythropoietin), mineral and bone disease (disrupted calcium/phosphate/vitamin D handling), metabolic acidosis, and fluid overload/hypertension.

The gradual, often asymptomatic early course is what makes CKD different from AKI in practice — many patients are identified incidentally on routine labs well before symptoms from kidney dysfunction itself appear.`,
    keyConcepts: [
      'eGFR and albuminuria together, not creatinine alone, define and stage CKD',
      'Secondary hyperparathyroidism develops as the kidney loses its ability to activate vitamin D and excrete phosphate, driving mineral bone disease',
      'Anemia of CKD is typically normocytic and due to reduced erythropoietin production, not primarily iron deficiency, though both can coexist',
    ],
    clinicalPearls: [
      'A "normal" creatinine can still mean significantly reduced GFR in a patient with low muscle mass — creatinine alone can be misleading without considering eGFR',
      'Hypertension is both a common cause and a common consequence of CKD, which is why blood pressure control is central to slowing progression',
    ],
  },
  {
    day: 15,
    title: 'Thyroid Disorders — Hypo- vs Hyperthyroidism',
    system: 'Endocrinology',
    topicId: 'endo-thyroid-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Contrast the metabolic direction of hypo- vs hyperthyroidism and their typical symptoms',
      'Understand the basic logic of TSH/free T4 interpretation',
      'Recognize Graves’ disease and Hashimoto’s thyroiditis as the classic autoimmune causes of each',
    ],
    coreContent: `Thyroid hormone sets the body’s metabolic rate, so disease in either direction produces a recognizably opposite symptom pattern.

Hypothyroidism (most commonly from Hashimoto’s thyroiditis, autoimmune destruction of the thyroid) slows metabolism: fatigue, cold intolerance, weight gain, constipation, bradycardia, and a classically elevated TSH with low free T4 in primary disease (the pituitary senses low thyroid hormone and tries harder to stimulate the gland).

Hyperthyroidism (classically Graves’ disease, an autoimmune condition where antibodies stimulate the TSH receptor directly) speeds metabolism: weight loss despite normal/increased appetite, heat intolerance, tachycardia/palpitations, tremor, and anxiety, with a suppressed TSH and elevated free T4.

The TSH-first approach to interpretation works because, in primary thyroid disease, TSH moves in the opposite direction of thyroid hormone, acting as a sensitive early marker.`,
    keyConcepts: [
      'In primary thyroid disease, TSH and free T4 move in opposite directions; in pituitary (secondary) disease, this relationship can break down',
      'Graves’ disease has distinctive features beyond generic hyperthyroidism — ophthalmopathy (eye involvement) and sometimes pretibial myxedema — from the autoimmune process itself',
      'Hashimoto’s thyroiditis can transiently cause a hyperthyroid phase (thyroiditis releasing stored hormone) before progressing to hypothyroidism',
    ],
    clinicalPearls: [
      'Bradycardia with fatigue and cold intolerance should prompt thyroid testing even when the presentation is vague and nonspecific',
      'Eye findings (proptosis, lid lag) point specifically toward Graves’ disease, not toward hyperthyroidism from other causes',
    ],
  },
  {
    day: 16,
    title: 'Seizures and Epilepsy — Focal vs Generalized',
    system: 'Neurology',
    topicId: 'neuro-seizure-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Distinguish focal (partial) seizures from generalized seizures by onset and awareness',
      'Understand the difference between a single seizure and epilepsy',
      'Recognize the basic approach to a first-time seizure',
    ],
    coreContent: `Seizures are classified first by where they start. Focal seizures begin in one network of neurons in one hemisphere, and may or may not impair awareness (previously called "simple" vs "complex" partial seizures). Generalized seizures involve both hemispheres from the onset, including the classic tonic-clonic ("grand mal") pattern, but also absence seizures (brief lapses in awareness without convulsions) and others.

A single seizure is not the same as epilepsy — epilepsy is a disease defined by a tendency toward recurrent, unprovoked seizures, not a one-time event with a clear provoking cause (such as a fever, acute metabolic disturbance, or alcohol withdrawal).

A first-time seizure work-up focuses on identifying provoking/reversible causes (electrolyte disturbances, hypoglycemia, infection, structural brain lesions) before labeling someone as having epilepsy.`,
    keyConcepts: [
      'Focal seizures can secondarily generalize, spreading from a focal onset to involve both hemispheres',
      'Absence seizures are a generalized seizure type that can be subtle and easily mistaken for simple inattention, especially in children',
      'A postictal state (confusion, drowsiness after the seizure) is typical after tonic-clonic seizures and is a useful supporting clue when the event itself wasn’t witnessed',
    ],
    clinicalPearls: [
      'A detailed description of what happened immediately before, during, and after the event (ideally from a witness) is often more diagnostically useful than any single test',
      'Tongue biting (especially lateral) and loss of bladder control support a seizure over other causes of transient loss of consciousness, such as syncope',
    ],
  },
  {
    day: 17,
    title: 'Meningitis — Recognizing a Neurologic Emergency',
    system: 'Infectious Disease',
    topicId: 'id-meningitis-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Recognize the classic triad of meningitis and its limitations',
      'Understand the basic rationale for lumbar puncture',
      'Distinguish bacterial from viral meningitis at a conceptual level',
    ],
    coreContent: `Meningitis is inflammation of the meninges, most often from infection. The classic triad — fever, neck stiffness, and altered mental status — is taught widely, but in practice all three are present in only a minority of actual cases, so a lower threshold of suspicion matters, especially in the very young, the elderly, or the immunosuppressed.

Lumbar puncture with cerebrospinal fluid analysis is the central diagnostic step: cell count/differential, protein, glucose, and Gram stain/culture together usually distinguish bacterial from viral (aseptic) meningitis. Bacterial meningitis classically shows a markedly elevated neutrophil-predominant white cell count, high protein, and low glucose (bacteria consume it); viral meningitis typically shows a lymphocyte-predominant pattern with normal glucose.

Bacterial meningitis is a true emergency — outcomes are strongly time-dependent, which is why antibiotics are often started empirically before confirmatory results return.`,
    keyConcepts: [
      'Low CSF glucose (relative to blood glucose) is a classic marker favoring bacterial over viral meningitis',
      'Kernig’s and Brudzinski’s signs support the diagnosis when present but have limited sensitivity — their absence does not exclude meningitis',
      'A non-blanching petechial/purpuric rash alongside signs of meningitis raises particular concern for meningococcal disease',
    ],
    clinicalPearls: [
      'Treatment should never be delayed awaiting lumbar puncture results when bacterial meningitis is strongly suspected in an acutely unwell patient',
      'Subtle presentations (irritability, lethargy, poor feeding) rather than classic signs are common in infants — the textbook triad is an adult-leaning pattern',
    ],
  },
  {
    day: 18,
    title: 'Shock — One Final Common Pathway, Several Starting Points',
    system: 'Emergency/Critical Care',
    topicId: 'em-shock-1',
    review: { status: 'unreviewed' },
    sources: [],
    objectives: [
      'Define shock as inadequate tissue perfusion, not simply low blood pressure',
      'Classify shock into its four major categories by underlying mechanism',
      'Recognize why identifying the type of shock changes the appropriate first response',
    ],
    coreContent: `Shock is a state of inadequate tissue perfusion relative to metabolic demand — blood pressure can be a clue, but the real problem is tissue-level hypoperfusion, which is why shock can occasionally occur even with a blood pressure that isn’t dramatically low.

Four broad mechanisms are classically taught:
- Hypovolemic: inadequate circulating volume (hemorrhage, severe dehydration).
- Cardiogenic: the heart fails as a pump despite adequate volume (e.g. a large myocardial infarction).
- Distributive: pathologic vasodilation drops systemic vascular resistance (septic shock is the prototype, also anaphylactic and neurogenic shock).
- Obstructive: a mechanical obstruction to blood flow (e.g. cardiac tamponade, massive pulmonary embolism, tension pneumothorax).

Each category points toward a different first move — volume for hypovolemic shock, source control and vasopressors for septic shock, relieving the mechanical obstruction for obstructive shock — which is why correctly categorizing the shock state, not just recognizing "shock" in general, is the clinically useful step.`,
    keyConcepts: [
      'Cool, clammy skin suggests high systemic vascular resistance (hypovolemic/cardiogenic); warm, flushed skin suggests low resistance (early distributive/septic)',
      'Jugular venous distension helps separate cardiogenic/obstructive shock (often elevated) from hypovolemic shock (typically flat)',
      'Lactate elevation reflects the shared downstream problem — inadequate perfusion — across all four categories, not a specific cause',
    ],
    clinicalPearls: [
      'Giving large volumes of fluid to a patient in cardiogenic shock can worsen pulmonary edema — the category of shock genuinely changes the correct first step, not just the label',
      'A trauma patient in shock with distended neck veins and a mechanism consistent with chest trauma should raise concern for tamponade or tension pneumothorax, not be assumed hypovolemic by default',
    ],
  },
];

const DAYS = [
  ...EARLY_DAYS.map((d) => ({ ...d, sources: d.sources && d.sources.length ? d.sources : (EARLY_SOURCES[d.topicId] || []) })),
  ...LATER_DAYS,
];

// Any day not written yet falls back to an explicit "coming soon" stub.
const byDay = new Map(DAYS.map((d) => [d.day, d]));

/** True only when a clinician has signed the day off against its sources. */
export function isReviewed(day) {
  return !!(day && day.review && day.review.status === 'reviewed' && day.sources && day.sources.length);
}
export const CURRICULUM = Array.from({ length: 100 }, (_, i) => {
  const day = i + 1;
  return byDay.get(day) || { day, comingSoon: true, title: 'Coming soon', system: '—' };
});

export function getDay(day) {
  return CURRICULUM.find((d) => d.day === Number(day));
}

export function getDayByTopicId(topicId) {
  return CURRICULUM.find((d) => d.topicId === topicId);
}
