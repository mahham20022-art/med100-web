// A static 100-day topic outline, grouped by medical system — placeholder
// table-of-contents content for the web preview (no AI-generated topic
// content here, unlike the native app). Titles only, no clinical claims.
const SYSTEMS = [
  { name: 'Cardiology', items: ['Heart Failure', 'Arrhythmias', 'Ischemic Heart Disease', 'Valvular Disease', 'Hypertension', 'Cardiomyopathies', 'Pericardial Disease', 'Congenital Heart Disease'] },
  { name: 'Pulmonology', items: ['Asthma', 'COPD', 'Pneumonia', 'Pulmonary Embolism', 'ARDS', 'Pleural Effusion', 'Interstitial Lung Disease', 'Lung Cancer'] },
  { name: 'Gastroenterology', items: ['Peptic Ulcer Disease', 'IBD', 'Liver Cirrhosis', 'Pancreatitis', 'GI Bleeding', 'Hepatitis', 'Biliary Disease', 'Malabsorption'] },
  { name: 'Nephrology', items: ['Acute Kidney Injury', 'Chronic Kidney Disease', 'Glomerulonephritis', 'Electrolyte Disorders', 'Acid-Base Disorders', 'Nephrotic Syndrome'] },
  { name: 'Endocrinology', items: ['Diabetes Mellitus', 'Thyroid Disorders', 'Adrenal Disorders', 'Pituitary Disorders', 'Calcium Disorders', 'Lipid Disorders'] },
  { name: 'Neurology', items: ['Stroke', 'Seizures', 'Headache Syndromes', 'Dementia', 'Peripheral Neuropathy', 'Movement Disorders', 'Multiple Sclerosis'] },
  { name: 'Infectious Disease', items: ['Sepsis', 'Meningitis', 'Endocarditis', 'Tuberculosis', 'HIV/AIDS', 'Antibiotic Stewardship', 'Fever of Unknown Origin'] },
  { name: 'Hematology/Oncology', items: ['Anemia', 'Leukemia', 'Lymphoma', 'Coagulopathies', 'Thrombocytopenia', 'Solid Tumor Oncology'] },
  { name: 'Rheumatology', items: ['Rheumatoid Arthritis', 'SLE', 'Vasculitis', 'Gout', 'Spondyloarthropathies'] },
  { name: 'Emergency/Critical Care', items: ['Shock', 'ACLS Principles', 'Toxicology Basics', 'Trauma Primary Survey', 'Mechanical Ventilation'] },
  { name: 'Psychiatry', items: ['Mood Disorders', 'Anxiety Disorders', 'Psychotic Disorders', 'Substance Use Disorders'] },
  { name: 'Obstetrics/Gynecology', items: ['Normal Pregnancy', 'Preeclampsia', 'Menstrual Disorders', 'Contraception'] },
  { name: 'Pediatrics', items: ['Growth & Development', 'Common Childhood Infections', 'Congenital Anomalies Overview'] },
  { name: 'Surgery', items: ['Acute Abdomen', 'Pre-op Evaluation', 'Wound Healing', 'Post-op Complications'] },
];

function buildTopics() {
  const flat = [];
  for (const system of SYSTEMS) {
    for (const item of system.items) {
      flat.push({ title: item, system: system.name });
    }
  }
  // Repeat/cycle the outline to fill exactly 100 days.
  const topics = [];
  for (let day = 1; day <= 100; day++) {
    const base = flat[(day - 1) % flat.length];
    topics.push({ day, title: base.title, system: base.system });
  }
  return topics;
}

export const TOPICS = buildTopics();
