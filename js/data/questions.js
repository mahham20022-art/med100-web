import { CURRICULUM } from './curriculum.js';
import { LATER_QUESTIONS } from './days/index.js';
// A curated MCQ bank, written to match curriculum.js's real days. Not
// sourced from Firestore's `mcqs`/`mcqAnswers` collections: those are
// server-write-only and currently empty (the Editorial publish pipeline
// needs a Cloud Function, which needs the Blaze plan, not yet upgraded)
// — and `mcqAnswers` is architecturally unreadable by any client even
// once populated (the answer key never ships to the browser), so a
// client-only question engine was never going to be able to use those
// collections directly. This bank is this app's own, honestly local,
// content.
export const QUESTIONS_BY_TOPIC = {
  'cardio-hf-1': [
    {
      id: 'q1',
      stem: 'A patient with heart failure has a preserved ejection fraction of 55%. What is the primary functional problem?',
      options: [
        'The ventricle contracts too weakly',
        'The ventricle fails to relax and fill normally',
        'The valves are regurgitant',
        'The heart rate is too slow to maintain output',
      ],
      correct: 1,
      explanation: 'HFpEF is fundamentally a diastolic problem — the chamber contracts adequately but is too stiff to fill properly, raising filling pressures.',
    },
    {
      id: 'q2',
      stem: 'Which symptom is most specific for heart failure, as opposed to dyspnea in general?',
      options: ['Dyspnea on exertion', 'Orthopnea', 'Fatigue', 'Cough'],
      correct: 1,
      explanation: 'Orthopnoea is more suggestive of heart failure than exertional dyspnoea alone, but it is not diagnostic and must be interpreted with examination and objective evidence.',
    },
  ],
  'pulm-asthma-1': [
    {
      id: 'q1',
      stem: 'Which spirometric finding supports variable expiratory airflow limitation in a patient with suspected asthma?',
      options: [
        'Asthma shows a restrictive pattern',
        'An increase in FEV1 of at least 12% and 200 mL after bronchodilator',
        'COPD improves more than asthma with bronchodilator',
        'There is no spirometric difference',
      ],
      correct: 1,
      explanation: 'A significant bronchodilator response supports variable airflow limitation and asthma, but is not exclusive to asthma: some patients with COPD also show reversibility. Interpret spirometry alongside symptoms and clinical context.',
    },
    {
      id: 'q2',
      stem: 'A "silent chest" during a severe asthma exacerbation most likely indicates:',
      options: [
        'The attack is resolving',
        'Airflow is so reduced that no wheeze can be generated',
        'The patient has recovered normal lung function',
        'A new pneumothorax has definitely occurred',
      ],
      correct: 1,
      explanation: 'A silent chest in severe asthma is ominous — it reflects airflow too low to generate audible wheeze, not improvement.',
    },
  ],
  'nephro-aki-1': [
    {
      id: 'q1',
      stem: 'Muddy brown granular casts on urine microscopy are classically associated with which AKI category?',
      options: ['Prerenal azotemia', 'Acute tubular necrosis', 'Postrenal obstruction', 'Normal kidney function'],
      correct: 1,
      explanation: 'Muddy brown casts reflect sloughed tubular epithelial cells, a hallmark of intrinsic damage from acute tubular necrosis.',
    },
    {
      id: 'q2',
      stem: 'A patient with volume depletion and rising creatinine is found to have a BUN:creatinine ratio of 25:1. This pattern is most consistent with:',
      options: ['Postrenal obstruction', 'Intrinsic glomerulonephritis', 'A prerenal process', 'A normal finding with no significance'],
      correct: 2,
      explanation: 'An elevated BUN:creatinine ratio (>20:1) in the setting of volume depletion suggests a prerenal mechanism, though it is a supportive clue, not a definitive test.',
    },
  ],
  'endo-dm-1': [
    {
      id: 'q1',
      stem: 'A lean 24-year-old presents with new polyuria, polydipsia, and unintentional weight loss. This presentation is most typical of:',
      options: ['Type 2 diabetes', 'Type 1 diabetes', 'A normal stress response', 'Chronic kidney disease'],
      correct: 1,
      explanation: 'Acute onset with weight loss in a young, lean patient reflects absolute insulin deficiency, classic for Type 1 diabetes.',
    },
    {
      id: 'q2',
      stem: 'C-peptide testing is most useful for distinguishing Type 1 from Type 2 diabetes because it reflects:',
      options: [
        'Exogenous insulin dose administered',
        'The amount of endogenous insulin the pancreas is producing',
        'Average blood glucose over 3 months',
        'Kidney function',
      ],
      correct: 1,
      explanation: 'C-peptide is co-secreted with endogenous insulin, so a low level indicates little remaining endogenous insulin production — low in Type 1, often preserved early in Type 2.',
    },
  ],
  'neuro-stroke-1': [
    {
      id: 'q1',
      stem: 'In most emergency settings, why is non-contrast CT head commonly the initial imaging study in suspected acute stroke?',
      options: [
        'It confirms the exact size of an ischemic infarct',
        'It rapidly identifies intracranial haemorrhage before time-sensitive reperfusion treatment is considered',
        'It is the only study that can detect a stroke at all',
        'It takes longer than MRI, allowing more time to plan',
      ],
      correct: 1,
      explanation: 'Non-contrast CT is widely used first because it is fast and detects acute haemorrhage. Imaging pathways vary by setting and availability; vascular imaging is added when large-vessel occlusion is suspected, and treatment should not be delayed unnecessarily.',
    },
    {
      id: 'q2',
      stem: 'A patient describes the sudden onset of "the worst headache of my life." This description is classically associated with:',
      options: ['Ischemic stroke', 'Subarachnoid hemorrhage', 'Tension headache', 'Migraine without aura'],
      correct: 1,
      explanation: 'A sudden, severe "thunderclap" headache is a classic presentation of subarachnoid hemorrhage and warrants urgent evaluation.',
    },
  ],
  'id-sepsis-1': [
    {
      id: 'q1',
      stem: 'Modern definitions characterize sepsis primarily as:',
      options: [
        'Any infection plus a fever',
        'A dysregulated host response to infection causing organ dysfunction',
        'A positive blood culture',
        'An elevated white blood cell count alone',
      ],
      correct: 1,
      explanation: 'Sepsis is defined by life-threatening organ dysfunction from a dysregulated host response — not simply the presence of infection or fever.',
    },
    {
      id: 'q2',
      stem: 'An elderly patient with a urinary tract infection develops new confusion but no fever. This should be interpreted as:',
      options: [
        'Sepsis is excluded because there is no fever',
        'A possible early sign of sepsis — elderly patients may not mount a febrile response',
        'Evidence the infection is resolving',
        'An unrelated finding to be ignored',
      ],
      correct: 1,
      explanation: 'Elderly and immunosuppressed patients often fail to mount a fever even with sepsis; new confusion is a classic, easily-missed early sign.',
    },
  ],
  'pulm-copd-1': [
    {
      id: 'q1',
      stem: 'Which spirometric criterion supports a diagnosis of COPD in a patient with compatible symptoms and exposure history?',
      options: [
        'Post-bronchodilator FEV1/FVC remains below 0.70',
        'FEV1/FVC is persistently below 0.70 after bronchodilator',
        'Neither condition shows any obstruction on spirometry',
        'COPD causes a restrictive, not obstructive, pattern',
      ],
      correct: 1,
      explanation: 'COPD is supported by persistent post-bronchodilator airflow obstruction (FEV1/FVC below 0.70) in the appropriate clinical context. Bronchodilator reversibility alone does not reliably distinguish COPD from asthma.',
    },
    {
      id: 'q2',
      stem: 'A lifelong never-smoker is diagnosed with COPD. What should this prompt?',
      options: [
        'Nothing — COPD requires no risk factor',
        'Confidence the diagnosis is Crohn’s disease instead',
        'A search for an alternative cause, such as alpha-1 antitrypsin deficiency',
        'Reassurance that COPD cannot occur without smoking',
      ],
      correct: 2,
      explanation: 'Since smoking is the dominant risk factor, COPD in a never-smoker should prompt looking for an alternative cause such as alpha-1 antitrypsin deficiency.',
    },
  ],
  'gi-ibd-1': [
    {
      id: 'q1',
      stem: 'Which feature is characteristic of Crohn’s disease but not ulcerative colitis?',
      options: ['Continuous colonic involvement from the rectum', 'Transmural inflammation with skip lesions', 'Limited to mucosal involvement', 'Always confined to the colon'],
      correct: 1,
      explanation: 'Crohn’s disease is transmural and can show patchy "skip lesions" anywhere from mouth to anus, unlike UC’s continuous, mucosa-limited colonic involvement.',
    },
    {
      id: 'q2',
      stem: 'Perianal fistulas and abscesses are a hallmark most associated with:',
      options: ['Ulcerative colitis', 'Crohn’s disease', 'Irritable bowel syndrome', 'Diverticulitis'],
      correct: 1,
      explanation: 'Transmural inflammation in Crohn’s disease predisposes to fistula and abscess formation, essentially not seen as a primary feature of ulcerative colitis.',
    },
  ],
  'rheum-ra-1': [
    {
      id: 'q1',
      stem: 'Which joint pattern is classic for rheumatoid arthritis?',
      options: [
        'Symmetric involvement of MCPs and PIPs, sparing the DIPs',
        'Asymmetric large-joint involvement only',
        'DIP-predominant involvement',
        'Spine-only involvement',
      ],
      correct: 0,
      explanation: 'RA classically causes symmetric small-joint polyarthritis of the MCPs/PIPs/wrists while sparing the DIP joints, unlike osteoarthritis.',
    },
    {
      id: 'q2',
      stem: 'Morning stiffness lasting close to an hour, improving with movement, is most suggestive of:',
      options: ['Mechanical joint disease', 'Inflammatory joint disease such as RA', 'Normal aging', 'Acute trauma'],
      correct: 1,
      explanation: 'Prolonged morning stiffness that improves with activity is a hallmark of inflammatory arthritis like RA, versus the brief stiffness of mechanical disease.',
    },
  ],
  'heme-anemia-1': [
    {
      id: 'q1',
      stem: 'A patient has microcytic anemia with low ferritin. The most likely cause is:',
      options: ['Vitamin B12 deficiency', 'Iron deficiency', 'Anemia of chronic disease', 'Folate deficiency'],
      correct: 1,
      explanation: 'Microcytic anemia with low ferritin is the classic pattern of iron deficiency anemia.',
    },
    {
      id: 'q2',
      stem: 'Macrocytic anemia with neurologic symptoms points more toward which deficiency?',
      options: ['Iron', 'Folate', 'Vitamin B12', 'Vitamin C'],
      correct: 2,
      explanation: 'B12 deficiency can cause neurologic damage in addition to macrocytic anemia, making it the more likely culprit when neurologic symptoms are present.',
    },
  ],
  'psych-mood-1': [
    {
      id: 'q1',
      stem: 'Before diagnosing unipolar major depression, it is important to screen for:',
      options: ['Past manic or hypomanic episodes', 'Family history of diabetes', 'Childhood allergies', 'Recent travel history'],
      correct: 0,
      explanation: 'Missing a past manic/hypomanic episode risks misdiagnosing bipolar depression as unipolar depression, which changes treatment considerations.',
    },
    {
      id: 'q2',
      stem: 'Which feature distinguishes mania from hypomania?',
      options: [
        'Mania never involves irritability',
        'Mania causes marked impairment or psychotic features; hypomania does not',
        'Hypomania lasts longer than mania',
        'There is no meaningful difference',
      ],
      correct: 1,
      explanation: 'Mania is distinguished by marked functional impairment or psychotic features and longer minimum duration; hypomania is milder and shorter.',
    },
  ],
  'obgyn-preeclampsia-1': [
    {
      id: 'q1',
      stem: 'Preeclampsia is defined as new hypertension after 20 weeks gestation plus:',
      options: [
        'A family history of hypertension',
        'Evidence of end-organ involvement (e.g. proteinuria or other severe features)',
        'Maternal age over 35 alone',
        'Any headache during pregnancy',
      ],
      correct: 1,
      explanation: 'Preeclampsia requires new hypertension after 20 weeks together with evidence of end-organ involvement, not hypertension alone.',
    },
    {
      id: 'q2',
      stem: 'What is the only definitive treatment for preeclampsia?',
      options: ['Bed rest', 'Delivery of the placenta', 'Antibiotics', 'Insulin therapy'],
      correct: 1,
      explanation: 'Since abnormal placental development drives the disease, delivery is the only definitive treatment; earlier management focuses on controlling severity until delivery is appropriate.',
    },
  ],
  'cardio-arrhythmia-1': [
    {
      id: 'q1',
      stem: 'What is the single most important factor determining the urgency of managing an arrhythmia?',
      options: ['The exact rhythm name', 'Hemodynamic stability', 'The patient’s age', 'Time of day'],
      correct: 1,
      explanation: 'Hemodynamic stability — not the specific rhythm label — is the key factor determining how urgently an arrhythmia must be addressed.',
    },
    {
      id: 'q2',
      stem: 'A wide-complex tachycardia of uncertain origin should be assumed to be:',
      options: ['Supraventricular until proven otherwise', 'Ventricular until proven otherwise', 'Always benign', 'Sinus tachycardia'],
      correct: 1,
      explanation: 'Given the consequences of misclassification, wide-complex tachycardia is treated as ventricular in origin until proven otherwise.',
    },
  ],
  'nephro-ckd-1': [
    {
      id: 'q1',
      stem: 'CKD staging is primarily based on:',
      options: ['Blood pressure alone', 'Estimated GFR and albuminuria', 'Serum sodium', 'Patient age'],
      correct: 1,
      explanation: 'CKD is staged using estimated GFR together with albuminuria, not blood pressure or age alone.',
    },
    {
      id: 'q2',
      stem: 'Anemia in CKD is typically due to:',
      options: ['Iron deficiency only', 'Reduced erythropoietin production', 'Vitamin B12 deficiency', 'Excess red cell destruction'],
      correct: 1,
      explanation: 'As kidney function declines, reduced erythropoietin production is the primary driver of CKD-associated anemia, typically normocytic.',
    },
  ],
  'endo-thyroid-1': [
    {
      id: 'q1',
      stem: 'In primary hypothyroidism, what is the expected pattern of TSH and free T4?',
      options: ['Both low', 'Both high', 'TSH high, free T4 low', 'TSH low, free T4 high'],
      correct: 2,
      explanation: 'In primary hypothyroidism, the pituitary raises TSH in an attempt to stimulate an underactive thyroid, while free T4 remains low.',
    },
    {
      id: 'q2',
      stem: 'Eye findings such as proptosis point specifically toward which cause of hyperthyroidism?',
      options: ['Hashimoto’s thyroiditis', 'Graves’ disease', 'Iodine deficiency', 'Pituitary adenoma'],
      correct: 1,
      explanation: 'Ophthalmopathy is a distinctive feature of the autoimmune process in Graves’ disease, not a generic feature of hyperthyroidism from any cause.',
    },
  ],
  'neuro-seizure-1': [
    {
      id: 'q1',
      stem: 'A seizure that begins in one hemisphere and may or may not impair awareness is classified as:',
      options: ['Generalized', 'Focal', 'Absence', 'Psychogenic'],
      correct: 1,
      explanation: 'Focal (partial) seizures begin in one network in one hemisphere, with or without impaired awareness, distinguishing them from generalized seizures.',
    },
    {
      id: 'q2',
      stem: 'A single seizure with a clear provoking cause (e.g. severe hypoglycemia) is best described as:',
      options: ['Epilepsy', 'A provoked seizure, not epilepsy', 'A focal seizure specifically', 'A psychogenic event'],
      correct: 1,
      explanation: 'Epilepsy requires a tendency toward recurrent, unprovoked seizures; a single seizure with a clear reversible provoking cause is not the same diagnosis.',
    },
  ],
  'id-meningitis-1': [
    {
      id: 'q1',
      stem: 'Which CSF pattern is classic for bacterial meningitis?',
      options: [
        'Lymphocyte-predominant, normal glucose',
        'Neutrophil-predominant, high protein, low glucose',
        'No white cells at all',
        'High glucose, low protein',
      ],
      correct: 1,
      explanation: 'Bacterial meningitis classically shows a neutrophil-predominant pleocytosis with elevated protein and low glucose (consumed by bacteria).',
    },
    {
      id: 'q2',
      stem: 'If bacterial meningitis is strongly suspected in an acutely unwell patient, antibiotics should:',
      options: [
        'Wait until lumbar puncture results return',
        'Be started empirically without delay',
        'Only be given if fever is present',
        'Be withheld until blood cultures result',
      ],
      correct: 1,
      explanation: 'Outcomes in bacterial meningitis are strongly time-dependent, so empiric antibiotics are started promptly rather than delayed for confirmatory testing.',
    },
  ],
  'em-shock-1': [
    {
      id: 'q1',
      stem: 'Shock is best defined as:',
      options: [
        'Any blood pressure below normal',
        'Inadequate tissue perfusion relative to metabolic demand',
        'A heart rate above 100',
        'Loss of consciousness',
      ],
      correct: 1,
      explanation: 'Shock is fundamentally about inadequate tissue perfusion, not simply a low blood pressure reading.',
    },
    {
      id: 'q2',
      stem: 'A trauma patient in shock with distended neck veins after chest trauma should raise concern for:',
      options: [
        'Straightforward hypovolemic shock only',
        'Obstructive shock, such as tamponade or tension pneumothorax',
        'Anaphylactic shock',
        'No specific concern — this is a normal finding',
      ],
      correct: 1,
      explanation: 'Distended neck veins after chest trauma suggest an obstructive process like cardiac tamponade or tension pneumothorax, changing the first response from fluids alone.',
    },
  ],
};

export function getQuestionsForTopic(topicId) {
  return QUESTIONS_BY_TOPIC[topicId] || [];
}


// Additional curated questions, explicitly tagged by difficulty.
QUESTIONS_BY_TOPIC['cardio-hf-1'].push(
  { id: 'q3', stem: "Which haemodynamic change most directly explains pulmonary crackles in left-sided heart failure?", options: ["Raised pulmonary capillary hydrostatic pressure","Reduced systemic venous pressure","Increased alveolar surfactant production","Reduced left atrial pressure"], correct: 0, explanation: "Elevated left-sided filling pressures are transmitted to pulmonary veins and capillaries, promoting interstitial and alveolar fluid accumulation.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Raised jugular venous pressure and peripheral oedema in heart failure primarily reflect:", options: ["Systemic venous congestion","Isolated pulmonary arterial obstruction","Reduced plasma sodium","Increased ejection fraction"], correct: 0, explanation: "Raised right-sided filling pressure produces systemic venous congestion, often seen as elevated JVP and dependent oedema.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['pulm-asthma-1'].push(
  { id: 'q3', stem: "Which spirometric finding supports variable expiratory airflow limitation in asthma?", options: ["Reduced FEV1/FVC that improves after bronchodilator","Persistently increased FEV1/FVC","Reduced TLC with normal FEV1/FVC","Isolated reduced diffusing capacity"], correct: 0, explanation: "Asthma commonly produces obstruction that improves after bronchodilator. Normal spirometry between episodes does not exclude asthma.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Which inflammatory cell is strongly associated with classic type 2-high asthma?", options: ["Eosinophil","Erythrocyte","Platelet","Fibroblast only"], correct: 0, explanation: "Type 2-high asthma is commonly associated with eosinophilic airway inflammation, although asthma is biologically heterogeneous.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['nephro-aki-1'].push(
  { id: 'q3', stem: "Hydronephrosis on renal ultrasound in a patient with AKI should prompt assessment for:", options: ["Postrenal urinary obstruction","Prerenal hypoperfusion only","Glomerular hyperfiltration","Isolated rhabdomyolysis"], correct: 0, explanation: "Hydronephrosis indicates collecting-system dilatation and should prompt assessment for urinary tract obstruction.", difficulty: 'Foundational' },
  { id: 'q4', stem: "Why can fractional excretion of sodium be misleading in AKI?", options: ["Diuretics and clinical states alter sodium handling","It directly measures GFR","It is always high in prerenal AKI","It is unaffected by CKD"], correct: 0, explanation: "Diuretics, sepsis and intrinsic renal disorders can alter sodium handling; FeNa must be interpreted in clinical context.", difficulty: 'Advanced' },
);
QUESTIONS_BY_TOPIC['endo-dm-1'].push(
  { id: 'q3', stem: "Which mechanism is central to diabetic ketoacidosis?", options: ["Insulin deficiency with increased counter-regulatory hormones","Excess insulin suppressing lipolysis","Isolated aldosterone deficiency","Increased peripheral glucose uptake"], correct: 0, explanation: "Insulin deficiency plus counter-regulatory hormones promotes lipolysis and hepatic ketone production.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Which test estimates average glycaemia over roughly the preceding two to three months?", options: ["HbA1c","Single random glucose","Urine ketones","Fasting insulin"], correct: 0, explanation: "HbA1c reflects glycation over the lifespan of circulating erythrocytes and estimates average glycaemia over recent months.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['neuro-stroke-1'].push(
  { id: 'q3', stem: "In suspected acute ischaemic stroke, CT angiography primarily helps identify:", options: ["Large-vessel occlusion and arterial anatomy","Exact age of every infarct","Microscopic neuronal injury","Cerebral amyloid"], correct: 0, explanation: "CTA identifies arterial occlusion or stenosis and helps determine eligibility for endovascular thrombectomy in the appropriate context.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Sudden focal neurological symptoms resolving completely after 20 minutes should be interpreted as:", options: ["Possible TIA requiring urgent assessment","Benign because symptoms resolved","Confirmed haemorrhagic stroke","No need for vascular risk assessment"], correct: 0, explanation: "Transient focal symptoms may represent TIA and carry early stroke risk; resolution does not remove the need for urgent evaluation.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['id-sepsis-1'].push(
  { id: 'q3', stem: "Which variable is included in the SOFA score?", options: ["Platelet count","Body mass index","Serum amylase","Visual acuity"], correct: 0, explanation: "SOFA assesses respiratory, coagulation, liver, cardiovascular, neurological and renal dysfunction; platelet count is the coagulation component.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Why must lactate be interpreted in clinical context in suspected sepsis?", options: ["It rises from several causes and is not infection-specific","It directly measures bacterial load","Normal lactate excludes sepsis","It measures oxygen saturation"], correct: 0, explanation: "Lactate can rise with impaired perfusion, adrenergic stimulation, seizures, impaired clearance and other causes.", difficulty: 'Advanced' },
);
QUESTIONS_BY_TOPIC['pulm-copd-1'].push(
  { id: 'q3', stem: "In a patient with established COPD, which additional spirometric measure is used to grade airflow limitation?", options: ["Post-bronchodilator FEV1 expressed as a percentage of predicted","Pre-bronchodilator FEV1 above 80% predicted","TLC below 80% predicted","DLCO above 120% predicted"], correct: 0, explanation: "After confirming persistent airflow obstruction, GOLD grades spirometric severity using post-bronchodilator FEV1 percent predicted.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Which intervention most clearly slows smoking-related accelerated lung-function decline in COPD?", options: ["Smoking cessation","Routine antibiotics without infection","Long-term oral steroids for all","Avoiding physical activity"], correct: 0, explanation: "Smoking cessation is the key intervention to reduce ongoing tobacco-related lung injury.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['gi-ibd-1'].push(
  { id: 'q3', stem: "Which extraintestinal manifestation may occur in both Crohn disease and ulcerative colitis?", options: ["Peripheral inflammatory arthritis","Disease limited exclusively to bowel","Obligate pancreatic destruction","Congenital gallbladder absence"], correct: 0, explanation: "Peripheral inflammatory arthritis can accompany either Crohn disease or ulcerative colitis.", difficulty: 'Foundational' },
  { id: 'q4', stem: "Ulcerative colitis classically causes continuous inflammation beginning in the rectum, predominantly involving:", options: ["Mucosa","Full bowel wall in all cases","Serosa only","Mesenteric fat only"], correct: 0, explanation: "Ulcerative colitis classically causes continuous mucosal inflammation beginning in the rectum.", difficulty: 'Intermediate' },
);
QUESTIONS_BY_TOPIC['rheum-ra-1'].push(
  { id: 'q3', stem: "Which antibody is generally more specific for rheumatoid arthritis than rheumatoid factor?", options: ["Anti-CCP (ACPA)","ANA","Anti-mitochondrial antibody","Anti-centromere antibody"], correct: 0, explanation: "Anti-CCP antibodies have relatively high specificity for rheumatoid arthritis and may predate clinical disease.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "What is the principal purpose of early DMARD therapy in rheumatoid arthritis?", options: ["Limit structural joint damage and persistent inflammation","Provide immediate analgesia only","Eradicate bacterial joint infection","Reverse established deformity in every patient"], correct: 0, explanation: "Early DMARD treatment aims to suppress inflammation and prevent progressive erosive joint damage.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['heme-anemia-1'].push(
  { id: 'q3', stem: "Which laboratory pattern is most consistent with iron deficiency anaemia?", options: ["Low ferritin with increased TIBC","High ferritin with high transferrin saturation","High serum iron with low TIBC","High ferritin in every case"], correct: 0, explanation: "Iron deficiency typically produces low ferritin and increased transferrin/TIBC, although inflammation can elevate ferritin.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "A low reticulocyte count in a patient with anaemia suggests:", options: ["Reduced effective red-cell production","A brisk marrow response","Acute haemolysis is proven","Recent major blood loss is proven"], correct: 0, explanation: "An inadequate reticulocyte response suggests reduced marrow production relative to the degree of anaemia.", difficulty: 'Intermediate' },
);
QUESTIONS_BY_TOPIC['psych-mood-1'].push(
  { id: 'q3', stem: "Which feature distinguishes mania from hypomania?", options: ["Marked impairment, hospitalisation or psychosis may occur","Symptoms always last less than 24 hours","No change in energy","Occurs only with intoxication"], correct: 0, explanation: "Mania causes marked impairment, may require hospitalisation or include psychosis; these are not features of hypomania.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Before attributing new elevated mood to bipolar disorder, assess:", options: ["Medication, substance and medical causes","Only preferred sleep schedule","Routine brain biopsy","Exclude all family history"], correct: 0, explanation: "Substances, prescribed medications and medical or neurological conditions can produce secondary mood symptoms.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['obgyn-preeclampsia-1'].push(
  { id: 'q3', stem: "New hypertension after 20 weeks can support preeclampsia when accompanied by:", options: ["Proteinuria or specified maternal end-organ dysfunction","Peripheral oedema alone","First-trimester nausea only","A single mildly elevated temperature"], correct: 0, explanation: "Preeclampsia is new hypertension after 20 weeks with proteinuria or, without it, specified maternal organ dysfunction.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Which neurological symptom in suspected preeclampsia is concerning for severe disease?", options: ["Persistent severe headache or visual disturbance","Mild fatigue after exercise","Rhinorrhoea","Motion sickness"], correct: 0, explanation: "Persistent severe headache and visual symptoms can indicate cerebral involvement and require urgent obstetric assessment.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['cardio-arrhythmia-1'].push(
  { id: 'q3', stem: "A tachyarrhythmia patient has hypotension, altered mental status and shock. What principle guides immediate management?", options: ["Urgent treatment of instability, commonly synchronized cardioversion when appropriate","Outpatient Holter monitoring","Oral rate control and discharge","Exercise stress test first"], correct: 0, explanation: "An unstable tachyarrhythmia requires immediate resuscitative management; synchronized cardioversion is generally indicated for an amenable rhythm with a pulse.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Which ECG feature is characteristic of atrial fibrillation?", options: ["Irregularly irregular rhythm without consistent P waves","Regular rhythm with P before every QRS","Fixed PR with dropped QRS","Sawtooth baseline in all cases"], correct: 0, explanation: "Atrial fibrillation typically produces absent discrete P waves and an irregularly irregular ventricular response.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['nephro-ckd-1'].push(
  { id: 'q3', stem: "Chronic kidney disease is generally defined by abnormalities present for at least:", options: ["Three months","One week","Two weeks","One month"], correct: 0, explanation: "CKD requires kidney structural or functional abnormalities with implications for health, present for at least three months.", difficulty: 'Foundational' },
  { id: 'q4', stem: "Which measure is used with eGFR to classify albuminuria in CKD?", options: ["Urine albumin-to-creatinine ratio","Serum sodium-to-potassium ratio","Urine ketones","Serum amylase"], correct: 0, explanation: "CKD risk classification combines GFR category with albuminuria category, commonly assessed by urine albumin-to-creatinine ratio.", difficulty: 'Intermediate' },
);
QUESTIONS_BY_TOPIC['endo-thyroid-1'].push(
  { id: 'q3', stem: "Which biochemical pattern is typical of overt primary hypothyroidism?", options: ["Raised TSH with low free T4","Suppressed TSH with high free T4","Suppressed TSH with low free T4 in every case","Normal TSH with high T3"], correct: 0, explanation: "Primary thyroid failure reduces negative feedback, producing elevated TSH and low free T4 in overt disease.", difficulty: 'Foundational' },
  { id: 'q4', stem: "A patient has suppressed TSH and suspected thyrotoxicosis. Which tests quantify hormone excess?", options: ["Free T4 and/or T3","Ferritin alone","Urine ACR","Cortisol alone"], correct: 0, explanation: "Free T4 and T3 characterize circulating thyroid hormone excess when TSH is suppressed.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['neuro-seizure-1'].push(
  { id: 'q3', stem: "A convulsive seizure lasting five minutes or longer should raise concern for:", options: ["Convulsive status epilepticus","Simple faint only","Migraine aura","Sleep disorder"], correct: 0, explanation: "The operational treatment threshold for convulsive status epilepticus is five minutes, or recurrent seizures without recovery.", difficulty: 'Intermediate' },
  { id: 'q4', stem: "Which feature supports focal-onset seizure?", options: ["Initial symptoms localising to one hemisphere","Generalised symptoms with no focal onset in every case","Fever a week later","Normal interictal examination"], correct: 0, explanation: "Focal seizures originate within networks in one hemisphere and may begin with lateralised motor, sensory, autonomic or cognitive symptoms.", difficulty: 'Foundational' },
);
QUESTIONS_BY_TOPIC['id-meningitis-1'].push(
  { id: 'q3', stem: "Which finding in suspected bacterial meningitis supports considering neuroimaging before LP?", options: ["New focal deficit or markedly impaired consciousness","Mild sore throat","Normal neurological exam in stable patient","Seasonal allergy"], correct: 0, explanation: "Focal deficit, markedly impaired consciousness, new seizure or papilloedema may indicate mass effect and require imaging before LP. Do not delay empiric treatment if suspected bacterial meningitis.", difficulty: 'Advanced' },
  { id: 'q4', stem: "Why should empiric antibiotics not be delayed when bacterial meningitis is strongly suspected?", options: ["Delay in effective treatment is associated with worse outcomes","CSF culture becomes positive only after antibiotics","Antibiotics immediately normalise ICP","Exam identifies organism with certainty"], correct: 0, explanation: "Bacterial meningitis is time-critical. If LP or imaging delays treatment, obtain blood cultures when feasible and start empiric therapy promptly per local guidance.", difficulty: 'Intermediate' },
);
QUESTIONS_BY_TOPIC['em-shock-1'].push(
  { id: 'q3', stem: "Which finding is consistent with impaired tissue perfusion in shock?", options: ["Altered mentation with cool peripheries and prolonged capillary refill","Isolated fever with normal perfusion","Normal lactate in all circumstances","Mild tachycardia after exercise"], correct: 0, explanation: "Shock is inadequate tissue perfusion. Altered mentation, cool peripheries and prolonged capillary refill are clinical clues interpreted with the full haemodynamic picture.", difficulty: 'Foundational' },
  { id: 'q4', stem: "Which haemodynamic pattern is typical of early distributive septic shock?", options: ["Reduced systemic vascular resistance with often increased cardiac output","Markedly increased SVR in every case","Isolated elevated left atrial pressure","Absence of peripheral vasodilation"], correct: 0, explanation: "Early distributive shock commonly features vasodilation and reduced systemic vascular resistance; cardiac output may be normal or elevated.", difficulty: 'Intermediate' },
);

Object.assign(QUESTIONS_BY_TOPIC, LATER_QUESTIONS);

export function getQuestionBank({ system = 'all', difficulty = 'all' } = {}) {
  return Object.entries(QUESTIONS_BY_TOPIC).flatMap(([topicId, items]) => {
    const day = CURRICULUM.find((entry) => entry.topicId === topicId);
    if (!day || day.comingSoon || (system !== 'all' && day.system !== system)) return [];
    return items.map((question, index) => ({
      ...question, topicId, day: day.day, topicTitle: day.title, system: day.system,
      difficulty: question.difficulty || (index === 0 ? 'Foundational' : 'Intermediate'),
    })).filter((question) => difficulty === 'all' || question.difficulty === difficulty);
  });
}
export function getQuestionBankSystems() {
  return [...new Set(getQuestionBank().map((question) => question.system))].sort();
}
