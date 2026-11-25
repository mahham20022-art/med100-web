// Sources for days 1-18 (written before per-day sources existed).
// Reviewers check each day's text against these.
import { nice, pm, web } from './_src.js';
const ESC = (t) => web(`ESC Clinical Practice Guidelines: ${t}`, 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines');

export const EARLY_SOURCES = {
  'cardio-hf-1': [web('2026 ESC Guidelines for the management of heart failure (Eur Heart J, Aug 2026)', 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Heart-Failure'), nice('ng106', 'Chronic heart failure in adults: diagnosis and management')],
  'pulm-asthma-1': [web('Global Initiative for Asthma (GINA) 2025 Strategy Report', 'https://ginasthma.org/reports/'), nice('ng245', 'Asthma: diagnosis, monitoring and chronic asthma management (BTS, NICE, SIGN)')],
  'nephro-aki-1': [web('KDIGO Clinical Practice Guideline for Acute Kidney Injury (2012)', 'https://kdigo.org/guidelines/acute-kidney-injury/'), nice('ng148', 'Acute kidney injury: prevention, detection and management')],
  'endo-dm-1': [web('ADA Standards of Care in Diabetes — 2026', 'https://diabetesjournals.org/care/issue/49/Supplement_1'), nice('ng28', 'Type 2 diabetes in adults: management')],
  'neuro-stroke-1': [web('2026 AHA/ASA Guideline for the Early Management of Patients With Acute Ischemic Stroke (Stroke, Jan 2026)', 'https://pubmed.ncbi.nlm.nih.gov/41582814/'), web('European Stroke Organisation guidelines', 'https://eso-stroke.org/guidelines/eso-guideline-directory/'), nice('ng128', 'Stroke and transient ischaemic attack in over 16s: diagnosis and initial management')],
  'id-sepsis-1': [pm('Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA 2016'), pm('Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021')],
  'pulm-copd-1': [web('Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2025 Report', 'https://goldcopd.org/2025-gold-report/'), nice('ng115', 'Chronic obstructive pulmonary disease in over 16s: diagnosis and management')],
  'gi-ibd-1': [pm('British Society of Gastroenterology consensus guidelines on the management of inflammatory bowel disease in adults. Gut 2019'), pm('ECCO Guidelines on Therapeutics in Crohn\'s Disease: Medical Treatment 2024')],
  'rheum-ra-1': [pm('2010 Rheumatoid arthritis classification criteria: an ACR/EULAR collaborative initiative'), pm('EULAR recommendations for the management of rheumatoid arthritis with synthetic and biological DMARDs: 2022 update'), nice('ng100', 'Rheumatoid arthritis in adults: management')],
  'heme-anemia-1': [pm('Guidelines for the management of iron deficiency anaemia. British Society of Gastroenterology Gut 2021'), web('WHO guideline on use of ferritin concentrations to assess iron status (2020)', 'https://www.who.int/publications/i/item/9789240000124')],
  'psych-mood-1': [nice('ng222', 'Depression in adults: treatment and management'), nice('cg185', 'Bipolar disorder: assessment and management')],
  'obgyn-preeclampsia-1': [nice('ng133', 'Hypertension in pregnancy: diagnosis and management'), pm('The 2021 International Society for the Study of Hypertension in Pregnancy classification, diagnosis & management recommendations')],
  'cardio-arrhythmia-1': [web('Resuscitation Council UK: Adult tachycardia and bradycardia algorithms (2025)', 'https://www.resus.org.uk/library/2025-resuscitation-guidelines'), ESC('2024 Guidelines for the management of atrial fibrillation')],
  'nephro-ckd-1': [web('KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease', 'https://kdigo.org/guidelines/ckd-evaluation-and-management/'), nice('ng203', 'Chronic kidney disease: assessment and management')],
  'endo-thyroid-1': [nice('ng145', 'Thyroid disease: assessment and management'), pm('2016 American Thyroid Association Guidelines for Diagnosis and Management of Hyperthyroidism and Other Causes of Thyrotoxicosis')],
  'neuro-seizure-1': [pm('Fisher RS et al. Operational classification of seizure types by the ILAE. Epilepsia 2017'), nice('ng217', 'Epilepsies in children, young people and adults')],
  'id-meningitis-1': [nice('ng240', 'Meningitis (bacterial) and meningococcal disease: recognition, diagnosis and management'), pm('ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect 2016')],
  'em-shock-1': [pm('Vincent JL, De Backer D. Circulatory shock. N Engl J Med 2013'), pm('Consensus on circulatory shock and hemodynamic monitoring. Task force of the ESICM 2014')],
};
