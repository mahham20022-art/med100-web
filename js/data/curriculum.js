// The 100-day curriculum. Real, reviewed content for the days listed in
// DAYS below; every other day (1-100) is generated as a `comingSoon`
// stub so the Challenge/Topics UI has a full 100-day structure to
// render and navigate, without pretending 100 days of real content
// exist yet. Content here is a study-aid outline at a foundational,
// textbook level — classifications, mechanisms, clinical reasoning
// frames — deliberately not specific dosing or treatment algorithms,
// which is exactly where a non-clinician-reviewed resource is riskiest
// to get subtly wrong.
const DAYS = [
  {
    day: 1,
    title: 'Heart Failure — The Big Picture',
    system: 'Cardiology',
    topicId: 'cardio-hf-1',
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
];

// Fill the rest of the 1-100 range as explicit "coming soon" stubs so
// Challenge/Topics can render a complete 100-day structure honestly.
const byDay = new Map(DAYS.map((d) => [d.day, d]));
export const CURRICULUM = Array.from({ length: 100 }, (_, i) => {
  const day = i + 1;
  return byDay.get(day) || { day, comingSoon: true, title: 'Coming soon', system: '—' };
});

export function getDay(day) {
  return CURRICULUM.find((d) => d.day === Number(day));
}
