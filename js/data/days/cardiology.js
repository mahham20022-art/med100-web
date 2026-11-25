import { nice, pm, web } from './_src.js';
const S = 'Cardiology';
const ESC = (t) => web(`ESC Clinical Practice Guidelines: ${t}`, 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines');

export default [
  {
    topicId: 'cardio-acs-1', system: S,
    title: 'Acute Coronary Syndromes — STEMI vs NSTE-ACS',
    objectives: [
      'Define acute coronary syndrome as a spectrum caused by acute myocardial ischaemia',
      'Separate STEMI from NSTE-ACS by the ECG, because the two pathways differ in urgency',
      'Explain the role of high-sensitivity troponin in diagnosing myocardial infarction',
    ],
    coreContent: `Acute coronary syndrome (ACS) covers unstable angina, non-ST-elevation myocardial infarction (NSTEMI) and ST-elevation myocardial infarction (STEMI). Most cases start with rupture or erosion of an atherosclerotic plaque and thrombus formation.

The first ECG, recorded within minutes of arrival, splits the pathway:
- Persistent ST elevation (or an equivalent pattern) suggests acute coronary occlusion: the priority is immediate reperfusion, usually primary PCI.
- No persistent ST elevation (NSTE-ACS): diagnosis rests on symptoms, serial ECGs and high-sensitivity troponin, with timing of angiography guided by risk.

Myocardial infarction requires a rise and/or fall of cardiac troponin with at least one value above the 99th percentile, plus evidence of ischaemia (symptoms, new ECG changes, imaging or angiographic thrombus). Troponin rises in many non-ischaemic conditions too: myocarditis, pulmonary embolism, sepsis, renal failure, tachyarrhythmia. A single raised value is not a diagnosis.`,
    keyConcepts: [
      'Time is myocardium: STEMI care is organised around minimising the time to reperfusion',
      'A normal first ECG does not exclude ACS; repeat it, especially if pain recurs',
      'Type 2 myocardial infarction is a supply–demand mismatch without acute plaque rupture',
    ],
    clinicalPearls: [
      'Posterior MI can present as ST depression in V1–V3; posterior leads (V7–V9) help reveal it',
      'Women, older adults and people with diabetes more often present without classic chest pain',
    ],
    sources: [ESC('2023 Guidelines for the management of acute coronary syndromes'), pm('Fourth Universal Definition of Myocardial Infarction (2018)')],
    questions: [
      { stem: 'Which finding defines the STEMI pathway rather than NSTE-ACS?', options: ['Persistent ST elevation (or equivalent) on the ECG', 'A troponin above the 99th percentile', 'Chest pain lasting more than 20 minutes', 'T-wave inversion in lateral leads'], correct: 0, explanation: 'The ECG, not the troponin, separates the two pathways: persistent ST elevation suggests acute occlusion needing immediate reperfusion.', difficulty: 'Foundational' },
      { stem: 'A raised troponin with a rise and fall, chest pain and new ST depression is most consistent with:', options: ['Myocardial infarction', 'Stable angina', 'Pericarditis in every case', 'Normal variation'], correct: 0, explanation: 'Dynamic troponin above the 99th percentile plus evidence of ischaemia meets the universal definition of myocardial infarction.', difficulty: 'Foundational' },
      { stem: 'Which statement about troponin is correct?', options: ['It can rise in non-ischaemic conditions such as myocarditis or pulmonary embolism', 'Any raised value proves plaque rupture', 'It is unaffected by kidney function', 'It peaks within five minutes of symptom onset'], correct: 0, explanation: 'Troponin marks myocardial injury of any cause; the clinical context decides whether that injury is an infarction.', difficulty: 'Intermediate' },
      { stem: 'ST depression in V1–V3 with tall R waves in a patient with chest pain should raise concern for:', options: ['Posterior myocardial infarction', 'Left bundle branch block only', 'Hyperkalaemia', 'Normal early repolarisation'], correct: 0, explanation: 'Posterior infarction is reflected as ST depression in the anterior leads; posterior leads V7–V9 can show the ST elevation directly.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'cardio-htn-1', system: S,
    title: 'Hypertension — Confirming the Diagnosis and Looking for Causes',
    objectives: [
      'Explain why a single clinic reading is not enough to diagnose hypertension',
      'Describe the role of ambulatory and home blood pressure monitoring',
      'List clues that should prompt a search for secondary hypertension',
    ],
    coreContent: `Hypertension is common, usually silent, and a major modifiable cause of stroke, heart failure, kidney disease and dementia. Because clinic readings are affected by measurement technique and the "white-coat" effect, the diagnosis is confirmed out of the clinic: ambulatory monitoring (ABPM) or home monitoring.

Assessment has three parts:
- Confirm the level of blood pressure with correct technique and out-of-office readings.
- Estimate overall cardiovascular risk and look for target-organ damage: urine albumin, eGFR, ECG for left ventricular hypertrophy, fundi when indicated.
- Ask whether the cause might be secondary.

Clues to secondary hypertension include onset at a young age, resistant hypertension despite several drugs, abrupt worsening, hypokalaemia (think primary aldosteronism), paroxysms of headache, sweating and palpitations (phaeochromocytoma), snoring and daytime sleepiness (obstructive sleep apnoea), and features of kidney or endocrine disease.`,
    keyConcepts: [
      'White-coat hypertension: high in clinic, normal out of clinic; masked hypertension is the reverse',
      'Primary aldosteronism is one of the commonest secondary causes and is under-diagnosed',
      'Treatment decisions combine blood pressure level with overall cardiovascular risk',
    ],
    clinicalPearls: [
      'Very high blood pressure with acute organ damage (encephalopathy, pulmonary oedema, AKI, retinal haemorrhages) is a hypertensive emergency, not just a high number',
      'Check technique before escalating treatment: cuff size, posture and rest all change the reading',
    ],
    sources: [nice('ng136', 'Hypertension in adults: diagnosis and management'), ESC('2024 Guidelines for the management of elevated blood pressure and hypertension')],
    questions: [
      { stem: 'A patient has a clinic blood pressure of 152/94 mmHg on one occasion. What is the most appropriate next step to confirm hypertension?', options: ['Ambulatory or home blood pressure monitoring', 'Start three drugs immediately', 'Renal biopsy', 'No further assessment'], correct: 0, explanation: 'Out-of-office measurement confirms the diagnosis and identifies white-coat hypertension.', difficulty: 'Foundational' },
      { stem: 'Hypertension with unexplained hypokalaemia most strongly suggests:', options: ['Primary aldosteronism', 'Hypothyroidism', 'White-coat hypertension', 'Essential hypertension only'], correct: 0, explanation: 'Aldosterone excess causes sodium retention and potassium loss; hypokalaemia is a classic (though not universal) clue.', difficulty: 'Intermediate' },
      { stem: 'Masked hypertension means:', options: ['Normal clinic readings but raised out-of-clinic readings', 'Raised clinic readings but normal home readings', 'Hypertension only during exercise', 'Hypertension caused by medication'], correct: 0, explanation: 'Masked hypertension is missed by clinic readings and carries risk similar to sustained hypertension.', difficulty: 'Intermediate' },
      { stem: 'Which feature makes severely raised blood pressure a hypertensive emergency?', options: ['Evidence of acute target-organ damage', 'A systolic value above 160 mmHg alone', 'Absence of symptoms', 'A family history of hypertension'], correct: 0, explanation: 'The emergency is defined by acute organ injury, not by the number alone.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'cardio-af-1', system: S,
    title: 'Atrial Fibrillation — Rate, Rhythm and Stroke Prevention',
    objectives: [
      'Recognise atrial fibrillation on the ECG and at the bedside',
      'Explain the three management questions: stroke risk, rate and rhythm',
      'Describe how stroke risk and bleeding risk are weighed in anticoagulation decisions',
    ],
    coreContent: `Atrial fibrillation (AF) is the commonest sustained arrhythmia. Disorganised atrial activity produces an irregularly irregular ventricular response with no consistent P waves. The atria do not contract effectively, and blood stasis in the left atrial appendage allows thrombus to form, which is why AF is a major cause of cardioembolic stroke.

Management runs through three questions:
- Stroke prevention: estimate thromboembolic risk with a validated score (for example CHA₂DS₂-VASc) and decide on oral anticoagulation, while identifying and correcting modifiable bleeding risk factors.
- Rate control: slow the ventricular response to relieve symptoms and protect ventricular function.
- Rhythm control: restore and maintain sinus rhythm when it is likely to help the patient, for example persistent symptoms or recent-onset AF.

Always look for triggers and associated conditions: hypertension, valve disease, heart failure, thyrotoxicosis, alcohol, sleep apnoea, infection.`,
    keyConcepts: [
      'An unstable patient with AF and a pulse needs urgent electrical cardioversion, not a risk score',
      'Antiplatelet drugs are not a substitute for anticoagulation for stroke prevention in AF',
      'Bleeding-risk tools identify modifiable risks; a high score is not by itself a reason to withhold anticoagulation',
    ],
    clinicalPearls: [
      'Cardioversion of AF lasting more than about 48 hours, or of unknown duration, carries embolic risk unless the patient is anticoagulated or a thrombus is excluded',
      'New AF should prompt a thyroid function test',
    ],
    sources: [nice('ng196', 'Atrial fibrillation: diagnosis and management'), ESC('2024 Guidelines for the management of atrial fibrillation')],
    questions: [
      { stem: 'Which ECG pattern is characteristic of atrial fibrillation?', options: ['Irregularly irregular QRS complexes without consistent P waves', 'Regular narrow complexes at 150/min with sawtooth waves', 'Progressive PR prolongation before a dropped beat', 'Regular wide complexes'], correct: 0, explanation: 'The hallmark of AF is an irregularly irregular rhythm with no organised atrial activity.', difficulty: 'Foundational' },
      { stem: 'Why does atrial fibrillation increase stroke risk?', options: ['Ineffective atrial contraction allows thrombus to form, especially in the left atrial appendage', 'It causes cerebral vasospasm', 'It raises intracranial pressure', 'It always lowers blood pressure'], correct: 0, explanation: 'Stasis in the non-contracting atrium, mainly the appendage, promotes thrombus that can embolise to the brain.', difficulty: 'Foundational' },
      { stem: 'A patient with AF has hypotension, confusion and chest pain. The immediate priority is:', options: ['Urgent synchronised electrical cardioversion', 'Calculating a stroke-risk score', 'Outpatient Holter monitoring', 'Starting aspirin alone'], correct: 0, explanation: 'Haemodynamic instability attributable to AF requires immediate restoration of an effective rhythm.', difficulty: 'Intermediate' },
      { stem: 'Which statement about bleeding-risk scores in AF is correct?', options: ['They mainly flag modifiable risks to correct', 'A high score always means anticoagulation is contraindicated', 'They replace stroke-risk assessment', 'They are only used after a stroke'], correct: 0, explanation: 'Guidelines use bleeding-risk assessment to find and address modifiable factors rather than as an automatic reason to withhold anticoagulation.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'cardio-valves-1', system: S,
    title: 'Valvular Heart Disease — Aortic Stenosis and Mitral Regurgitation',
    objectives: [
      'Describe the classic murmurs of aortic stenosis and mitral regurgitation',
      'List the symptoms that mark severe aortic stenosis as high risk',
      'Explain why echocardiography is the key investigation',
    ],
    coreContent: `Aortic stenosis (AS) in adults is most often degenerative calcification, or a bicuspid valve in younger patients. The left ventricle hypertrophies to push blood through a narrowed outlet. AS can be silent for years; once symptoms appear (exertional breathlessness, angina, syncope), prognosis without valve intervention is poor.

Mitral regurgitation (MR) is either primary (a problem of the valve itself, such as prolapse or a ruptured chord) or secondary (the valve is structurally normal but the ventricle or annulus is dilated). Acute severe MR, for example after papillary muscle rupture, causes sudden pulmonary oedema; chronic MR is tolerated for longer as the left atrium and ventricle enlarge.

Examination findings:
- AS: ejection systolic murmur at the right upper sternal edge radiating to the carotids; a slow-rising pulse and a soft second heart sound suggest severity.
- MR: pansystolic murmur at the apex radiating to the axilla.

Transthoracic echocardiography confirms the lesion, grades severity and assesses ventricular function, which guides the timing of intervention.`,
    keyConcepts: [
      'Symptomatic severe aortic stenosis is an indication for valve intervention',
      'Primary and secondary MR are different diseases with different treatments',
      'Murmur loudness does not reliably reflect severity; a failing ventricle may produce a quieter murmur',
    ],
    clinicalPearls: [
      'Exertional syncope in an older patient with an ejection systolic murmur needs echocardiography',
      'New pulmonary oedema and a new murmur after myocardial infarction suggest papillary muscle rupture or ventricular septal rupture',
    ],
    sources: [ESC('2021 ESC/EACTS Guidelines for the management of valvular heart disease'), pm('2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease')],
    questions: [
      { stem: 'An ejection systolic murmur at the right upper sternal edge radiating to the carotids is classic for:', options: ['Aortic stenosis', 'Mitral regurgitation', 'Mitral stenosis', 'Aortic regurgitation'], correct: 0, explanation: 'AS produces a crescendo–decrescendo ejection murmur best heard at the aortic area and transmitted to the carotids.', difficulty: 'Foundational' },
      { stem: 'Which symptom in a patient with severe aortic stenosis signals a need for intervention?', options: ['Exertional syncope', 'Occasional palpitations at rest only', 'Seasonal rhinitis', 'Mild ankle swelling in hot weather alone'], correct: 0, explanation: 'Angina, syncope and breathlessness mark symptomatic severe AS, which carries a poor prognosis without valve replacement.', difficulty: 'Intermediate' },
      { stem: 'Secondary (functional) mitral regurgitation is caused by:', options: ['Left ventricular or annular dilatation with a structurally normal valve', 'Rheumatic thickening of the leaflets only', 'Infective destruction of the leaflets only', 'Congenital cleft valve only'], correct: 0, explanation: 'In secondary MR the leaflets are normal but cannot coapt because the ventricle or annulus has dilated.', difficulty: 'Intermediate' },
      { stem: 'Which investigation is central to grading valve disease?', options: ['Transthoracic echocardiography', 'Chest radiograph alone', 'Exercise ECG in symptomatic severe AS', 'D-dimer'], correct: 0, explanation: 'Echocardiography measures valve anatomy, gradients, regurgitant severity and ventricular function.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'cardio-pericard-1', system: S,
    title: 'Pericardial Disease — Pericarditis and Tamponade',
    objectives: [
      'Recognise the clinical and ECG features of acute pericarditis',
      'Explain how pericardial effusion becomes tamponade',
      'Identify the bedside signs of tamponade that demand urgent drainage',
    ],
    coreContent: `Acute pericarditis causes sharp chest pain that is worse lying flat and eased by sitting forward, sometimes with a pericardial friction rub. The ECG may show widespread concave ST elevation with PR depression. Most cases in high-income settings are viral or idiopathic; other causes include tuberculosis (important in many regions), autoimmune disease, uraemia, malignancy and post-cardiac injury syndromes.

Tamponade depends on the speed of accumulation more than the volume. The pericardium can stretch slowly to hold a large chronic effusion, but a small rapid bleed (after trauma or cardiac surgery) can compress the heart. Rising pericardial pressure limits filling, stroke volume falls, and the patient becomes hypotensive and tachycardic.

Bedside signs include raised jugular venous pressure, hypotension, muffled heart sounds and pulsus paradoxus. Echocardiography shows the effusion and chamber collapse. Tamponade is treated by pericardial drainage; it is a clinical diagnosis supported by echo, not an echo diagnosis alone.`,
    keyConcepts: [
      'Pericarditis pain is positional and pleuritic; ischaemic pain usually is not',
      'Speed of accumulation, not size, determines whether an effusion causes tamponade',
      'Pulsus paradoxus is an exaggerated fall in systolic pressure on inspiration',
    ],
    clinicalPearls: [
      'Recurrent pericarditis is common; treat the first episode fully and look for a specific cause',
      'Hypotension with distended neck veins after chest trauma: think tamponade or tension pneumothorax',
    ],
    sources: [ESC('2015 Guidelines for the diagnosis and management of pericardial diseases (2025 update in progress)'), pm('Cardiac tamponade review Lancet')],
    questions: [
      { stem: 'Chest pain eased by sitting forward with widespread concave ST elevation and PR depression suggests:', options: ['Acute pericarditis', 'Inferior STEMI', 'Aortic dissection', 'Pulmonary embolism'], correct: 0, explanation: 'Positional pain with diffuse ST elevation and PR depression is the classic pattern of pericarditis.', difficulty: 'Foundational' },
      { stem: 'What mainly determines whether a pericardial effusion causes tamponade?', options: ['The speed of fluid accumulation', 'The colour of the fluid', 'The patient’s height', 'The presence of a friction rub'], correct: 0, explanation: 'Rapid accumulation overwhelms pericardial compliance even when the volume is small.', difficulty: 'Intermediate' },
      { stem: 'Pulsus paradoxus is:', options: ['An exaggerated inspiratory fall in systolic blood pressure', 'A pulse that is stronger on inspiration', 'An irregularly irregular pulse', 'A collapsing pulse'], correct: 0, explanation: 'In tamponade, inspiratory filling of the right heart shifts the septum and reduces left ventricular output more than normal.', difficulty: 'Intermediate' },
      { stem: 'Definitive treatment of cardiac tamponade is:', options: ['Pericardial drainage', 'Diuretics', 'Beta-blockade', 'Observation only'], correct: 0, explanation: 'Removing fluid relieves the compression; diuretics reduce preload and can worsen the haemodynamics.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'cardio-lipids-1', system: S,
    title: 'Dyslipidaemia and Cardiovascular Risk',
    objectives: [
      'Explain why LDL cholesterol is a causal factor in atherosclerosis',
      'Describe how total cardiovascular risk guides prevention decisions',
      'Recognise clinical clues to familial hypercholesterolaemia',
    ],
    coreContent: `Atherosclerotic cardiovascular disease (ASCVD) is driven by cumulative exposure to apolipoprotein B–containing lipoproteins, of which LDL is the main one. Genetic, epidemiological and trial evidence shows that lowering LDL cholesterol reduces cardiovascular events, and the benefit is proportional to the absolute reduction.

Prevention is organised around total risk:
- Secondary prevention: people with established ASCVD are at high risk and need intensive LDL lowering.
- Primary prevention: risk is estimated with a validated calculator, then adjusted for factors such as diabetes, chronic kidney disease, family history and ethnicity.

Lifestyle (stopping smoking, diet, physical activity, weight) underpins every plan. Statins are first-line drug therapy; other agents are added when targets are not met.

Familial hypercholesterolaemia (FH) is an inherited cause of very high LDL from birth. Clues: very high LDL, tendon xanthomas, premature coronary disease in the patient or first-degree relatives. Cascade testing of relatives finds others who benefit from early treatment.`,
    keyConcepts: [
      'Lower LDL for longer means lower risk',
      'Absolute risk, not cholesterol alone, decides how intensively to treat in primary prevention',
      'Muscle symptoms on statins are common complaints but true statin myopathy is uncommon',
    ],
    clinicalPearls: [
      'Check for secondary causes of high lipids: hypothyroidism, nephrotic syndrome, cholestasis, drugs',
      'A young patient with myocardial infarction should prompt assessment for familial hypercholesterolaemia',
    ],
    sources: [ESC('2019 ESC/EAS Guidelines for the management of dyslipidaemias (2025 focused update)'), nice('ng238', 'Cardiovascular disease: risk assessment and reduction, including lipid modification')],
    questions: [
      { stem: 'Which lipoprotein is the principal causal target in atherosclerotic disease prevention?', options: ['LDL (apoB-containing lipoproteins)', 'HDL', 'Chylomicrons in fasting plasma', 'Albumin'], correct: 0, explanation: 'Causal evidence links LDL and other apoB-containing particles to atherosclerosis; lowering LDL reduces events.', difficulty: 'Foundational' },
      { stem: 'Tendon xanthomas and very high LDL in a young adult with a family history of early myocardial infarction suggest:', options: ['Familial hypercholesterolaemia', 'Hypothyroidism only', 'Normal variation', 'Nephrotic syndrome'], correct: 0, explanation: 'These are classic features of familial hypercholesterolaemia; relatives should be tested.', difficulty: 'Intermediate' },
      { stem: 'In primary prevention, the decision to start lipid-lowering therapy is guided mainly by:', options: ['Estimated total cardiovascular risk', 'HDL level alone', 'Triglycerides alone', 'Body weight alone'], correct: 0, explanation: 'Risk calculators combine several factors; treatment intensity follows absolute risk.', difficulty: 'Intermediate' },
      { stem: 'Which is a secondary cause of raised cholesterol to exclude?', options: ['Hypothyroidism', 'Iron deficiency', 'Vitamin C deficiency', 'Hyperthyroidism'], correct: 0, explanation: 'Hypothyroidism reduces LDL clearance; treating it can lower cholesterol.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'cardio-cm-1', system: S,
    title: 'Cardiomyopathies — Dilated and Hypertrophic',
    objectives: [
      'Define cardiomyopathy as heart muscle disease not explained by coronary, valve or pressure loading alone',
      'Contrast dilated and hypertrophic cardiomyopathy in structure and presentation',
      'Explain why hypertrophic cardiomyopathy matters in young people with syncope',
    ],
    coreContent: `Cardiomyopathies are diseases of the heart muscle that are not fully explained by coronary disease, valve disease or abnormal loading conditions such as hypertension.

Dilated cardiomyopathy (DCM): a dilated, poorly contracting left ventricle. Causes include genetic variants, alcohol, previous myocarditis, chemotherapy, pregnancy (peripartum cardiomyopathy) and tachyarrhythmia. It presents as heart failure, arrhythmia or embolism.

Hypertrophic cardiomyopathy (HCM): usually genetic (sarcomere protein variants, autosomal dominant). The ventricular wall is abnormally thick, often asymmetrically in the septum. In some patients the thickened septum and the mitral valve obstruct the outflow tract, especially when preload falls (dehydration, standing) or contractility rises.

Many HCM patients have few symptoms; others have breathlessness, chest pain, palpitations or syncope. A minority are at risk of sudden cardiac death, which is why unexplained syncope in a young person, a family history of sudden death, or an abnormal ECG needs cardiology assessment. First-degree relatives should be screened.`,
    keyConcepts: [
      'Cardiomyopathies are diagnosed by imaging (echo, cardiac MRI) plus clinical and family history',
      'Outflow obstruction in HCM is dynamic: it worsens with reduced preload',
      'Family screening is part of managing inherited cardiomyopathy',
    ],
    clinicalPearls: [
      'Exertional syncope in an athlete is never "just a faint" until structural heart disease is excluded',
      'Peripartum cardiomyopathy should be considered in new heart failure late in pregnancy or the months after delivery',
    ],
    sources: [ESC('2023 Guidelines for the management of cardiomyopathies'), pm('2024 AHA/ACC Guideline for the Management of Hypertrophic Cardiomyopathy')],
    questions: [
      { stem: 'Which structural feature defines hypertrophic cardiomyopathy?', options: ['Unexplained left ventricular wall thickening', 'A dilated thin-walled ventricle', 'Isolated right atrial enlargement', 'Pericardial thickening'], correct: 0, explanation: 'HCM is wall thickening not explained by loading conditions such as hypertension or aortic stenosis.', difficulty: 'Foundational' },
      { stem: 'Left ventricular outflow obstruction in HCM typically worsens with:', options: ['Dehydration or standing up', 'Squatting', 'Increased preload', 'Lying flat with legs raised'], correct: 0, explanation: 'Reduced preload makes the ventricle smaller and increases dynamic obstruction.', difficulty: 'Advanced' },
      { stem: 'Which is a recognised cause of dilated cardiomyopathy?', options: ['Excess alcohol', 'Hypertrophic sarcomere variant in every case', 'Aortic coarctation only', 'Iron deficiency without anaemia'], correct: 0, explanation: 'Alcohol is a classic toxic cause of DCM; others include genetic variants, myocarditis and chemotherapy.', difficulty: 'Foundational' },
      { stem: 'A 17-year-old collapses during football and has a family history of sudden death. The priority is:', options: ['Cardiology assessment for structural or electrical heart disease', 'Reassurance that it was a simple faint', 'Neurology referral only', 'Iron supplements'], correct: 0, explanation: 'Exertional syncope with a family history of sudden death needs evaluation for HCM and other inherited conditions.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'cardio-syncope-1', system: S,
    title: 'Syncope — Separating Benign from Dangerous',
    objectives: [
      'Define syncope and distinguish it from seizure and other causes of collapse',
      'Classify syncope as reflex, orthostatic or cardiac',
      'Identify high-risk features that need urgent cardiac assessment',
    ],
    coreContent: `Syncope is transient loss of consciousness from global cerebral hypoperfusion, with rapid onset, short duration and spontaneous complete recovery.

Three main groups:
- Reflex (vasovagal, situational, carotid sinus): triggered by standing for long periods, pain, fear, heat, micturition or coughing; usually preceded by warmth, sweating, nausea and visual dimming. The commonest cause and usually benign.
- Orthostatic hypotension: on standing, from volume depletion, drugs (antihypertensives, diuretics, alpha-blockers) or autonomic failure (Parkinson disease, diabetes).
- Cardiac: arrhythmia (bradyarrhythmia, ventricular tachycardia, channelopathies) or structural disease (aortic stenosis, hypertrophic cardiomyopathy, PE). This group carries the risk of sudden death.

Every patient needs a careful history (ideally from a witness), examination including lying and standing blood pressure, and a 12-lead ECG.

High-risk features include syncope during exertion or lying down, palpitations immediately before, no prodrome, a family history of sudden death at a young age, known structural heart disease or heart failure, and an abnormal ECG (for example conduction disease, long or short QT, Brugada pattern, pre-excitation, signs of cardiomyopathy).

Brief jerking movements are common in syncope and do not by themselves indicate epilepsy.`,
    keyConcepts: [
      'The ECG is the essential test in every syncope',
      'Exertional syncope is cardiac until proven otherwise',
      'Short myoclonic jerks occur in syncope; prolonged post-event confusion suggests seizure',
    ],
    clinicalPearls: [
      'Ask what the patient was doing, what they felt before, and how quickly they recovered',
      'A bitten side of the tongue favours epileptic seizure over syncope',
    ],
    sources: [ESC('2018 Guidelines for the diagnosis and management of syncope'), nice('cg109', 'Transient loss of consciousness ("blackouts") in over 16s')],
    questions: [
      { stem: 'Which feature makes syncope high risk?', options: ['Syncope during exertion', 'Prodrome of warmth and nausea after prolonged standing', 'Syncope at the sight of blood', 'Syncope after micturition in a young man'], correct: 0, explanation: 'Exertional syncope suggests arrhythmia or structural heart disease.', difficulty: 'Foundational' },
      { stem: 'Which investigation should every patient with syncope have?', options: ['12-lead ECG', 'EEG', 'CT head', 'Tilt-table test'], correct: 0, explanation: 'The ECG identifies arrhythmic and structural clues to cardiac syncope.', difficulty: 'Foundational' },
      { stem: 'A few seconds of myoclonic jerks during a faint:', options: ['Are common in syncope and do not prove epilepsy', 'Confirm epilepsy', 'Require anti-seizure medication', 'Indicate stroke'], correct: 0, explanation: 'Cerebral hypoperfusion often produces brief jerks.', difficulty: 'Intermediate' },
      { stem: 'Dizziness and collapse on standing in a patient recently started on an alpha-blocker suggests:', options: ['Orthostatic hypotension', 'Ventricular tachycardia', 'Vasovagal syncope from pain', 'Hypoglycaemia'], correct: 0, explanation: 'Antihypertensive and alpha-blocking drugs commonly cause orthostatic hypotension.', difficulty: 'Intermediate' },
    ],
  },
];
