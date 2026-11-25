import { nice, pm, web } from './_src.js';
const S = 'Pulmonology';
const ERS = (t) => web(`ERS/BTS guideline: ${t}`, 'https://www.brit-thoracic.org.uk/quality-improvement/guidelines/');

export default [
  {
    topicId: 'pulm-pe-1', system: S,
    title: 'Pulmonary Embolism — Probability, Testing and Risk',
    objectives: [
      'Apply pre-test probability before ordering D-dimer or imaging',
      'Explain why D-dimer is useful only to rule out PE in low or intermediate probability',
      'Stratify PE by haemodynamic status and right ventricular strain',
    ],
    coreContent: `Pulmonary embolism (PE) usually arises from deep vein thrombosis in the legs. Symptoms are non-specific: breathlessness, pleuritic chest pain, haemoptysis, syncope or tachycardia, and some patients have none of the classic features.

Diagnosis starts with clinical probability, using judgement or a validated score (for example Wells or the revised Geneva score):
- Low or intermediate probability: a negative D-dimer makes PE unlikely enough to stop. A positive D-dimer is not diagnostic and leads to imaging.
- High probability: go straight to imaging, usually CT pulmonary angiography (CTPA). D-dimer adds nothing here.

Risk then decides management. PE with shock or sustained hypotension is high risk and may need reperfusion. Normotensive patients are stratified further by clinical scores, right ventricular dysfunction on imaging and troponin. Anticoagulation is the treatment backbone for most patients.`,
    keyConcepts: [
      'D-dimer has high sensitivity but low specificity; it rules out, it does not rule in',
      'D-dimer rises with age, pregnancy, infection, cancer and surgery',
      'High-risk PE is defined by haemodynamic instability, not clot size',
    ],
    clinicalPearls: [
      'Unexplained tachycardia or new oxygen requirement in a post-operative patient: consider PE',
      'Ventilation–perfusion scanning is an alternative to CTPA when contrast or radiation is a concern',
    ],
    sources: [web('ESC 2019 Guidelines for the diagnosis and management of acute pulmonary embolism', 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines'), nice('ng158', 'Venous thromboembolic diseases: diagnosis, management and thrombophilia testing')],
    questions: [
      { stem: 'In which patient is a negative D-dimer most useful for excluding PE?', options: ['Low clinical probability', 'High clinical probability', 'Haemodynamically unstable patient', 'Any patient regardless of probability'], correct: 0, explanation: 'D-dimer is a rule-out test only when pre-test probability is not high.', difficulty: 'Foundational' },
      { stem: 'High-risk pulmonary embolism is defined mainly by:', options: ['Shock or sustained hypotension', 'Bilateral clots on CT', 'A raised D-dimer', 'Pleuritic chest pain'], correct: 0, explanation: 'Haemodynamic instability defines high-risk PE and changes management toward reperfusion.', difficulty: 'Intermediate' },
      { stem: 'Why is D-dimer often unhelpful in hospital inpatients?', options: ['It is frequently raised by surgery, infection, cancer and age', 'It cannot be measured in hospital', 'It is always negative in PE', 'It only measures arterial clots'], correct: 0, explanation: 'Many inpatient conditions raise D-dimer, reducing its specificity and its value as a rule-out test.', difficulty: 'Intermediate' },
      { stem: 'A patient with high clinical probability of PE should next have:', options: ['Imaging such as CTPA', 'D-dimer only', 'Discharge with follow-up', 'Spirometry'], correct: 0, explanation: 'With high probability a negative D-dimer cannot safely exclude PE, so imaging is required.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'pulm-effusion-1', system: S,
    title: 'Pleural Effusion — Transudate or Exudate',
    objectives: [
      'Describe how pleural fluid analysis separates transudates from exudates',
      'List the common causes of each type',
      'Recognise features that suggest empyema or a complicated parapneumonic effusion',
    ],
    coreContent: `A pleural effusion is fluid in the pleural space. The first question is whether it is a transudate (a systemic imbalance of pressures, such as heart failure, cirrhosis or nephrotic syndrome) or an exudate (local pleural disease, such as infection, malignancy, tuberculosis or pulmonary embolism).

Light's criteria classify the fluid as an exudate if any one of the following is met:
- pleural fluid protein / serum protein greater than 0.5
- pleural fluid LDH / serum LDH greater than 0.6
- pleural fluid LDH more than two-thirds of the upper limit of normal for serum LDH

Light's criteria are sensitive for exudates but can misclassify transudates after diuretics. Ultrasound guides safe aspiration. Fluid should go for protein, LDH, pH, glucose, microbiology and cytology as the clinical picture suggests.

In a patient with pneumonia, a pleural fluid pH below about 7.2, frank pus, or organisms on Gram stain point to a complicated effusion or empyema that needs drainage.`,
    keyConcepts: [
      'Bilateral effusions with heart failure are usually transudates and often need no tap',
      'A unilateral effusion, or one with fever or pain, should be sampled',
      'Malignant effusion is diagnosed by cytology, which can be negative on the first sample',
    ],
    clinicalPearls: [
      'Measure pH with a blood gas analyser, not litmus paper',
      'In tuberculosis-endemic regions, a lymphocytic exudate should prompt testing for TB pleuritis',
    ],
    sources: [web('BTS Guideline for Pleural Disease (2023)', 'https://www.brit-thoracic.org.uk/quality-improvement/guidelines/pleural-disease/'), pm('Light RW. Pleural effusions: the diagnostic separation of transudates and exudates. Ann Intern Med 1972')],
    questions: [
      { stem: 'Which finding classifies pleural fluid as an exudate by Light’s criteria?', options: ['Pleural/serum protein ratio above 0.5', 'Pleural/serum protein ratio below 0.3', 'Normal pleural LDH', 'Clear straw-coloured appearance'], correct: 0, explanation: 'Any one of the three Light’s criteria (protein ratio > 0.5, LDH ratio > 0.6, or high pleural LDH) defines an exudate.', difficulty: 'Foundational' },
      { stem: 'Which condition typically causes a transudative effusion?', options: ['Heart failure', 'Bacterial pneumonia', 'Lung cancer', 'Tuberculosis'], correct: 0, explanation: 'Transudates reflect systemic pressure imbalances such as heart failure, cirrhosis or hypoalbuminaemia.', difficulty: 'Foundational' },
      { stem: 'In a parapneumonic effusion, which finding most supports chest drain insertion?', options: ['Pleural fluid pH below about 7.2', 'Pleural fluid pH of 7.5', 'Small free-flowing effusion with normal pH', 'Serous fluid with no organisms'], correct: 0, explanation: 'Low pH, pus, or positive Gram stain indicate complicated effusion or empyema needing drainage.', difficulty: 'Intermediate' },
      { stem: 'Light’s criteria may misclassify a heart-failure effusion as an exudate when:', options: ['The patient has received diuretics', 'The patient is febrile', 'The effusion is bilateral', 'The patient is young'], correct: 0, explanation: 'Diuresis concentrates pleural protein and LDH, so true transudates can meet exudate criteria.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'pulm-ild-1', system: S,
    title: 'Interstitial Lung Disease — Pattern and Cause',
    objectives: [
      'Describe the typical presentation of fibrotic interstitial lung disease',
      'Explain the restrictive physiology and reduced gas transfer',
      'List causes to search for before labelling a disease idiopathic',
    ],
    coreContent: `Interstitial lung diseases (ILDs) are a group of disorders that inflame or scar the lung interstitium. Patients usually present with progressive exertional breathlessness and a dry cough. Fine "velcro" inspiratory crackles at the bases and finger clubbing are common in fibrotic disease.

Lung function typically shows a restrictive pattern: reduced lung volumes with a preserved or raised FEV1/FVC ratio, and a reduced diffusing capacity (DLCO). High-resolution CT is the key imaging test; patterns such as usual interstitial pneumonia (UIP) carry diagnostic weight.

Before calling a disease idiopathic pulmonary fibrosis (IPF), look for a cause:
- connective tissue disease (rheumatoid arthritis, systemic sclerosis, myositis)
- exposures: birds, moulds, occupational dusts (asbestos, silica)
- drugs (for example amiodarone, methotrexate, nitrofurantoin)
- sarcoidosis

Diagnosis is best made by a multidisciplinary discussion of clinical, radiological and, when needed, pathological findings.`,
    keyConcepts: [
      'Restrictive spirometry plus low DLCO is the classic ILD physiology',
      'Hypersensitivity pneumonitis depends on finding and removing the exposure',
      'IPF is a diagnosis of exclusion with a characteristic HRCT pattern',
    ],
    clinicalPearls: [
      'Ask about pet birds, feather duvets and damp housing in every new ILD',
      'Oxygen desaturation on walking can reveal disease before resting saturations fall',
    ],
    sources: [pm('Idiopathic Pulmonary Fibrosis (an Update) and Progressive Pulmonary Fibrosis in Adults: An Official ATS/ERS/JRS/ALAT Clinical Practice Guideline 2022'), nice('cg163', 'Idiopathic pulmonary fibrosis in adults: diagnosis and management')],
    questions: [
      { stem: 'Which lung function pattern is typical of fibrotic ILD?', options: ['Reduced lung volumes, preserved FEV1/FVC, reduced DLCO', 'Reduced FEV1/FVC that reverses with bronchodilator', 'Increased TLC and increased DLCO', 'Normal volumes with isolated raised DLCO'], correct: 0, explanation: 'Fibrosis stiffens the lung (restriction) and thickens the alveolar–capillary membrane (low DLCO).', difficulty: 'Foundational' },
      { stem: 'A patient who keeps pigeons develops progressive breathlessness and ILD. The most likely diagnosis to consider is:', options: ['Hypersensitivity pneumonitis', 'Asthma', 'Bronchiectasis', 'Pulmonary embolism'], correct: 0, explanation: 'Bird antigens are a classic cause of hypersensitivity pneumonitis; removing exposure is central to management.', difficulty: 'Intermediate' },
      { stem: 'Which drug is a recognised cause of pulmonary fibrosis?', options: ['Amiodarone', 'Paracetamol', 'Omeprazole', 'Levothyroxine'], correct: 0, explanation: 'Amiodarone, methotrexate and nitrofurantoin are well-known causes of drug-induced ILD.', difficulty: 'Foundational' },
      { stem: 'Which imaging test is central to classifying ILD?', options: ['High-resolution CT', 'Plain abdominal radiograph', 'Ventilation–perfusion scan', 'Echocardiography'], correct: 0, explanation: 'HRCT defines the pattern of interstitial disease and guides diagnosis.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'pulm-osa-1', system: S,
    title: 'Obstructive Sleep Apnoea',
    objectives: [
      'Describe the mechanism of obstructive sleep apnoea',
      'Recognise symptoms and risk factors',
      'Explain why untreated OSA matters for driving and cardiovascular health',
    ],
    coreContent: `In obstructive sleep apnoea (OSA) the upper airway collapses repeatedly during sleep, causing pauses in breathing (apnoeas) or reduced airflow (hypopnoeas), oxygen desaturation and brief arousals. Sleep becomes fragmented.

Typical features include loud snoring, witnessed pauses, choking or gasping at night, unrefreshing sleep and excessive daytime sleepiness. Risk factors are obesity, a large neck, male sex, older age, retrognathia, enlarged tonsils and alcohol or sedatives before bed.

Diagnosis uses home sleep testing or polysomnography, with severity graded by the apnoea–hypopnoea index (AHI). Questionnaires such as the Epworth Sleepiness Scale measure sleepiness but do not diagnose OSA.

Management includes weight reduction, avoiding alcohol and sedatives, positional measures and continuous positive airway pressure (CPAP) for symptomatic moderate to severe disease. Mandibular advancement devices help selected patients.`,
    keyConcepts: [
      'OSA is associated with hypertension, atrial fibrillation and impaired glucose control',
      'Sleepiness while driving is a safety issue with legal reporting duties in many countries',
      'CPAP works by splinting the upper airway open',
    ],
    clinicalPearls: [
      'Resistant hypertension should prompt screening for sleep apnoea',
      'Opioids and benzodiazepines can worsen sleep-disordered breathing',
    ],
    sources: [nice('ng202', 'Obstructive sleep apnoea/hypopnoea syndrome and obesity hypoventilation syndrome in over 16s'), pm('Clinical Practice Guideline for Diagnostic Testing for Adult Obstructive Sleep Apnea: AASM 2017')],
    questions: [
      { stem: 'The primary mechanism of obstructive sleep apnoea is:', options: ['Repeated upper airway collapse during sleep', 'Loss of central respiratory drive only', 'Bronchospasm at night', 'Pulmonary oedema'], correct: 0, explanation: 'OSA is obstructive: breathing effort continues but the upper airway collapses.', difficulty: 'Foundational' },
      { stem: 'Severity of OSA is graded with:', options: ['The apnoea–hypopnoea index', 'The Epworth Sleepiness Scale alone', 'Neck circumference alone', 'Peak expiratory flow'], correct: 0, explanation: 'AHI from a sleep study grades severity; the Epworth scale measures sleepiness.', difficulty: 'Intermediate' },
      { stem: 'Which treatment works by pneumatically splinting the upper airway?', options: ['CPAP', 'Inhaled corticosteroid', 'Supplemental oxygen alone', 'Antihistamine'], correct: 0, explanation: 'CPAP keeps the airway open with positive pressure throughout the respiratory cycle.', difficulty: 'Foundational' },
      { stem: 'Which condition is associated with untreated OSA?', options: ['Resistant hypertension', 'Hypothyroidism caused by CPAP', 'Iron overload', 'Hyperkalaemia'], correct: 0, explanation: 'Intermittent hypoxia and sympathetic activation link OSA with hypertension, especially resistant hypertension.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'pulm-ph-1', system: S,
    title: 'Pulmonary Hypertension',
    objectives: [
      'Define pulmonary hypertension by right heart catheterisation',
      'Outline the clinical classification groups',
      'Recognise signs of right ventricular strain',
    ],
    coreContent: `Pulmonary hypertension (PH) is raised pressure in the pulmonary circulation. It is defined at right heart catheterisation by a mean pulmonary arterial pressure above 20 mmHg (the threshold in current ESC/ERS guidance).

The clinical classification has five groups:
1. Pulmonary arterial hypertension (idiopathic, heritable, drug-associated, connective tissue disease, congenital heart disease)
2. PH due to left heart disease, the commonest cause
3. PH due to lung disease or hypoxia (COPD, ILD, sleep-disordered breathing)
4. Chronic thromboembolic PH (CTEPH)
5. Unclear or multifactorial mechanisms

Symptoms are non-specific: exertional breathlessness, fatigue, chest pain and exertional syncope. Signs of right heart strain include a loud pulmonary second sound, raised JVP, peripheral oedema and a right ventricular heave. Echocardiography estimates the probability of PH; catheterisation confirms it and measures the haemodynamics.`,
    keyConcepts: [
      'Left heart disease is the most common cause of PH',
      'CTEPH is important to find because it may be curable',
      'Exertional syncope in PH signals severe disease',
    ],
    clinicalPearls: [
      'Unexplained breathlessness after a PE that does not resolve should prompt assessment for CTEPH',
      'Patients with systemic sclerosis are screened for pulmonary arterial hypertension',
    ],
    sources: [web('2022 ESC/ERS Guidelines for the diagnosis and treatment of pulmonary hypertension', 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines'), pm('Haemodynamic definitions and updated clinical classification of pulmonary hypertension 7th World Symposium')],
    questions: [
      { stem: 'Which test confirms pulmonary hypertension?', options: ['Right heart catheterisation', 'Chest radiograph', 'Spirometry', 'D-dimer'], correct: 0, explanation: 'Echocardiography estimates probability; catheterisation measures pressures directly.', difficulty: 'Foundational' },
      { stem: 'The most common cause of pulmonary hypertension is:', options: ['Left heart disease', 'Idiopathic PAH', 'CTEPH', 'Schistosomiasis'], correct: 0, explanation: 'Group 2 PH from left heart disease is the largest group.', difficulty: 'Intermediate' },
      { stem: 'Why is it important to identify CTEPH?', options: ['It may be treatable with surgery or intervention', 'It needs no treatment', 'It is always fatal', 'It only affects children'], correct: 0, explanation: 'Pulmonary endarterectomy and other interventions can improve or cure CTEPH.', difficulty: 'Intermediate' },
      { stem: 'Which finding suggests right ventricular strain?', options: ['Raised JVP with peripheral oedema', 'Bilateral wheeze', 'Bradycardia alone', 'Basal dullness only'], correct: 0, explanation: 'Right heart failure produces systemic venous congestion.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'pulm-ptx-1', system: S,
    title: 'Pneumothorax — Primary, Secondary and Tension',
    objectives: [
      'Distinguish primary from secondary spontaneous pneumothorax',
      'Recognise tension pneumothorax as a clinical emergency',
      'Describe how symptoms, not size alone, guide management',
    ],
    coreContent: `A pneumothorax is air in the pleural space.
- Primary spontaneous pneumothorax occurs in people without known lung disease, typically tall young adults, often smokers.
- Secondary spontaneous pneumothorax occurs with underlying lung disease (COPD, cystic fibrosis, ILD, infection). It is less well tolerated and carries higher risk.
- Traumatic and iatrogenic pneumothoraces follow injury or procedures such as central line insertion.

Symptoms are sudden pleuritic chest pain and breathlessness. Signs may include reduced breath sounds and hyper-resonance on the affected side.

Tension pneumothorax happens when air enters the pleural space but cannot escape, raising intrathoracic pressure, reducing venous return and causing shock. It is a clinical diagnosis: severe distress, hypotension, hypoxia, raised neck veins and, late, tracheal deviation. Treatment is immediate decompression, without waiting for an X-ray.

Current guidance gives more weight to symptoms and patient factors than to radiological size when deciding between observation, aspiration and drainage.`,
    keyConcepts: [
      'Tension pneumothorax is diagnosed clinically and decompressed immediately',
      'Secondary pneumothorax is more dangerous than primary because lung reserve is low',
      'Smoking cessation reduces recurrence',
    ],
    clinicalPearls: [
      'Sudden deterioration in a ventilated patient: think tension pneumothorax',
      'Advise against air travel and diving until the pneumothorax has resolved and been assessed',
    ],
    sources: [web('BTS Guideline for Pleural Disease (2023): pneumothorax', 'https://www.brit-thoracic.org.uk/quality-improvement/guidelines/pleural-disease/'), pm('Advanced Trauma Life Support 10th edition tension pneumothorax')],
    questions: [
      { stem: 'A tension pneumothorax should be treated:', options: ['Immediately by decompression, based on clinical diagnosis', 'Only after CT confirmation', 'With observation and oxygen alone', 'After a 24-hour X-ray'], correct: 0, explanation: 'Tension pneumothorax is life-threatening; waiting for imaging delays decompression.', difficulty: 'Foundational' },
      { stem: 'Secondary spontaneous pneumothorax occurs in patients with:', options: ['Underlying lung disease such as COPD', 'Normal lungs only', 'Chest trauma only', 'Recent central line only'], correct: 0, explanation: 'Secondary pneumothorax complicates existing lung disease and is less well tolerated.', difficulty: 'Foundational' },
      { stem: 'Why does tension pneumothorax cause shock?', options: ['Raised intrathoracic pressure reduces venous return', 'It causes massive haemorrhage', 'It causes vasodilation from sepsis', 'It blocks the coronary arteries'], correct: 0, explanation: 'Rising pleural pressure compresses the mediastinum and impairs venous return, an obstructive shock.', difficulty: 'Intermediate' },
      { stem: 'Which risk factor is most associated with primary spontaneous pneumothorax?', options: ['Smoking in a tall young adult', 'Obesity in an older adult', 'Pregnancy', 'Hypothyroidism'], correct: 0, explanation: 'Primary pneumothorax classically affects tall young people, and smoking substantially increases risk.', difficulty: 'Intermediate' },
    ],
  },
];
