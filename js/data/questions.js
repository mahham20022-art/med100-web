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
};

export function getQuestionsForTopic(topicId) {
  return QUESTIONS_BY_TOPIC[topicId] || [];
}
