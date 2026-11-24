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
      explanation: 'Orthopnea (dyspnea when lying flat, relieved by sitting up) is far more specific for heart failure than exertional dyspnea alone, which has many causes.',
    },
  ],
  'pulm-asthma-1': [
    {
      id: 'q1',
      stem: 'What distinguishes asthma\'s airway obstruction from that of COPD on spirometry?',
      options: [
        'Asthma shows a restrictive pattern',
        'Asthma\'s obstruction significantly improves with bronchodilator',
        'COPD improves more than asthma with bronchodilator',
        'There is no spirometric difference',
      ],
      correct: 1,
      explanation: 'Asthma is characterized by substantially reversible obstruction on bronchodilator testing; COPD\'s obstruction is comparatively fixed.',
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
      stem: 'Why is a non-contrast CT head the mandatory first imaging study in suspected acute stroke?',
      options: [
        'It confirms the exact size of an ischemic infarct',
        'It reliably rules out hemorrhage before any time-sensitive reperfusion therapy is considered',
        'It is the only study that can detect a stroke at all',
        'It takes longer than MRI, allowing more time to plan',
      ],
      correct: 1,
      explanation: 'The critical first job of non-contrast CT is excluding hemorrhage, since reperfusion therapies intended for ischemic stroke would be harmful in a hemorrhagic stroke.',
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
      stem: 'On spirometry, how does COPD’s obstruction typically differ from asthma’s after bronchodilator is given?',
      options: [
        'COPD’s obstruction improves dramatically, more than asthma’s',
        'COPD’s obstruction improves only minimally, unlike asthma’s substantial reversibility',
        'Neither condition shows any obstruction on spirometry',
        'COPD causes a restrictive, not obstructive, pattern',
      ],
      correct: 1,
      explanation: 'COPD’s airflow limitation is largely fixed/structural, so bronchodilator produces only minimal improvement, unlike asthma’s substantially reversible obstruction.',
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
