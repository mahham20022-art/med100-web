import { nice, pm, web } from './_src.js';
const S = 'Neurology';

export default [
  {
    topicId: 'neuro-ms-1', system: S,
    title: 'Multiple Sclerosis — Dissemination in Space and Time',
    objectives: [
      'Describe the typical clinical attacks of multiple sclerosis',
      'Explain the principle of dissemination in space and time',
      'Recognise red flags that suggest an alternative diagnosis',
    ],
    coreContent: `Multiple sclerosis (MS) is an immune-mediated demyelinating disease of the central nervous system, most often starting in young adults and more common in women.

Typical first attacks (clinically isolated syndromes) develop over days and recover partly or fully over weeks:
- optic neuritis: painful eye movement and reduced vision in one eye
- partial transverse myelitis: sensory level, bladder symptoms, Lhermitte phenomenon
- brainstem syndromes: internuclear ophthalmoplegia, diplopia, vertigo

Diagnosis (McDonald criteria) requires lesions disseminated in space (different CNS regions) and in time (new lesions over time, or enhancing and non-enhancing lesions together, or CSF-specific oligoclonal bands as a substitute in the 2017 criteria), after reasonable exclusion of alternatives. MRI of the brain and spinal cord is central; CSF supports the diagnosis.

Red flags for another diagnosis include very severe optic neuritis with poor recovery or bilateral onset, longitudinally extensive myelitis, intractable hiccups or vomiting, prominent cortical signs or systemic features. These should prompt testing for aquaporin-4 and MOG antibodies and other mimics.

Disease-modifying therapies reduce relapses and new MRI lesions; choice depends on activity, risk and patient preference.`,
    keyConcepts: [
      'MS attacks evolve over days, not seconds',
      'MRI must be interpreted in context; white matter spots are common and non-specific',
      'NMOSD and MOGAD are distinct diseases that can mimic MS',
    ],
    clinicalPearls: [
      'Bilateral internuclear ophthalmoplegia in a young adult strongly suggests MS',
      'Uhthoff phenomenon: symptoms worsen temporarily with heat or exercise',
    ],
    sources: [pm('Thompson AJ et al. Diagnosis of multiple sclerosis: 2017 revisions of the McDonald criteria. Lancet Neurol 2018'), nice('ng220', 'Multiple sclerosis in adults: management')],
    questions: [
      { stem: 'The diagnosis of MS requires evidence of:', options: ['Dissemination of lesions in space and time', 'A single lesion on MRI', 'Positive aquaporin-4 antibodies', 'Peripheral nerve demyelination'], correct: 0, explanation: 'McDonald criteria require lesions in different CNS regions and at different times, with alternatives excluded.', difficulty: 'Foundational' },
      { stem: 'Painful eye movement with reduced vision in one eye in a young adult suggests:', options: ['Optic neuritis', 'Acute angle-closure glaucoma', 'Retinal detachment', 'Pituitary apoplexy'], correct: 0, explanation: 'Typical demyelinating optic neuritis is unilateral and painful on eye movement.', difficulty: 'Foundational' },
      { stem: 'Which finding is a red flag for a diagnosis other than MS?', options: ['Longitudinally extensive transverse myelitis', 'Partial myelitis with good recovery', 'Unilateral optic neuritis with recovery', 'Internuclear ophthalmoplegia'], correct: 0, explanation: 'Lesions spanning three or more vertebral segments suggest NMOSD or MOGAD.', difficulty: 'Advanced' },
      { stem: 'Temporary worsening of MS symptoms after a hot bath is called:', options: ['Uhthoff phenomenon', 'Lhermitte sign', 'Babinski sign', 'Romberg sign'], correct: 0, explanation: 'Heat slows conduction in demyelinated fibres; it is not a new relapse.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'neuro-pd-1', system: S,
    title: 'Parkinson Disease and Parkinsonism',
    objectives: [
      'Define parkinsonism as bradykinesia plus rest tremor or rigidity',
      'Distinguish Parkinson disease from drug-induced and atypical parkinsonism',
      'Recognise the non-motor features',
    ],
    coreContent: `Parkinsonism is a clinical syndrome: bradykinesia (slowness with progressive decrement in speed or amplitude of repeated movements) plus rest tremor, rigidity, or both. Parkinson disease (PD) is the commonest cause, resulting from loss of dopaminergic neurons in the substantia nigra.

Supportive features of PD include asymmetric onset, rest tremor, a clear and sustained response to dopaminergic therapy and, later, levodopa-induced dyskinesia.

Important mimics:
- Drug-induced parkinsonism: antipsychotics, metoclopramide, prochlorperazine, some calcium-channel blockers. Usually symmetrical.
- Atypical parkinsonism: progressive supranuclear palsy (early falls, vertical gaze palsy), multiple system atrophy (early autonomic failure, cerebellar signs), dementia with Lewy bodies (early dementia, hallucinations, fluctuation), corticobasal syndrome.
- Vascular parkinsonism and essential tremor.

Non-motor symptoms often precede motor signs: loss of smell, REM sleep behaviour disorder, constipation, depression. Later: cognitive impairment, hallucinations, orthostatic hypotension and falls.

PD is a clinical diagnosis; imaging mainly excludes other causes.`,
    keyConcepts: [
      'Bradykinesia is required for parkinsonism',
      'Early falls and poor levodopa response suggest atypical parkinsonism',
      'Dopamine antagonists can precipitate severe reactions in Lewy body disease',
    ],
    clinicalPearls: [
      'Never stop dopaminergic medication abruptly in hospital; it risks a hyperthermia–rigidity syndrome',
      'Metoclopramide and haloperidol should be avoided in PD',
    ],
    sources: [pm('Postuma RB et al. MDS clinical diagnostic criteria for Parkinson\'s disease. Mov Disord 2015'), nice('ng71', 'Parkinson\'s disease in adults')],
    questions: [
      { stem: 'Which feature is essential to define parkinsonism?', options: ['Bradykinesia', 'Rest tremor alone', 'Cogwheel rigidity alone', 'Postural instability alone'], correct: 0, explanation: 'Parkinsonism requires bradykinesia with rest tremor or rigidity.', difficulty: 'Foundational' },
      { stem: 'Early falls with vertical gaze palsy suggest:', options: ['Progressive supranuclear palsy', 'Parkinson disease', 'Essential tremor', 'Drug-induced parkinsonism'], correct: 0, explanation: 'PSP features early postural instability and supranuclear vertical gaze palsy.', difficulty: 'Intermediate' },
      { stem: 'Which drug should be avoided in Parkinson disease?', options: ['Haloperidol', 'Paracetamol', 'Levodopa', 'Domperidone in most cases'], correct: 0, explanation: 'Dopamine antagonists worsen parkinsonism and can cause severe reactions.', difficulty: 'Foundational' },
      { stem: 'REM sleep behaviour disorder is relevant to Parkinson disease because it:', options: ['Can precede motor symptoms by years', 'Proves drug-induced parkinsonism', 'Excludes Parkinson disease', 'Occurs only after levodopa'], correct: 0, explanation: 'RBD is a prodromal marker of alpha-synuclein disorders.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'neuro-headache-1', system: S,
    title: 'Headache — Primary Patterns and Red Flags',
    objectives: [
      'Recognise migraine, tension-type and cluster headache',
      'Identify red flags for secondary headache',
      'Describe the immediate approach to thunderclap headache',
    ],
    coreContent: `Most headaches are primary. Recognising the patterns avoids unnecessary scans; recognising red flags avoids missed emergencies.

Primary headaches:
- Migraine: recurrent attacks of moderate to severe, often unilateral, throbbing headache with nausea, light and sound sensitivity, worse with activity; some have aura (visual or sensory symptoms spreading over minutes).
- Tension-type: bilateral, pressing, mild to moderate, without significant nausea.
- Cluster: strictly unilateral orbital pain lasting 15–180 minutes with ipsilateral tearing, red eye, nasal symptoms or ptosis, and restlessness; occurs in bouts.

Red flags (SNNOOP10 is one checklist) include:
- Thunderclap onset (maximal within a minute)
- New headache after age 50, or in pregnancy or postpartum
- Fever, neck stiffness, rash, immunosuppression or cancer
- Focal deficit, confusion, seizure, papilloedema
- Positional headache, or headache worse on coughing or straining
- Jaw claudication or scalp tenderness in older patients (giant cell arteritis)

Thunderclap headache must be investigated urgently for subarachnoid haemorrhage, with CT and, depending on timing and result, lumbar puncture. Other causes include reversible cerebral vasoconstriction syndrome, venous sinus thrombosis, arterial dissection and pituitary apoplexy.

Frequent use of acute analgesics can cause medication-overuse headache.`,
    keyConcepts: [
      'The history makes the diagnosis in most headaches',
      'A normal CT does not exclude all causes of thunderclap headache',
      'Medication overuse sustains chronic daily headache',
    ],
    clinicalPearls: [
      'Ask "what were you doing when it started?": a remembered moment of onset suggests thunderclap',
      'Headache with new Horner syndrome or neck pain suggests carotid dissection',
    ],
    sources: [web('International Classification of Headache Disorders, 3rd edition (ICHD-3)', 'https://ichd-3.org/'), pm('Do TP et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology 2019'), nice('cg150', 'Headaches in over 12s: diagnosis and management')],
    questions: [
      { stem: 'Strictly unilateral orbital pain for 45 minutes with tearing, nasal congestion and restlessness suggests:', options: ['Cluster headache', 'Tension-type headache', 'Migraine without aura', 'Medication-overuse headache'], correct: 0, explanation: 'Short severe unilateral attacks with cranial autonomic features and agitation are typical of cluster headache.', difficulty: 'Foundational' },
      { stem: 'A headache reaching maximal intensity within one minute requires urgent assessment for:', options: ['Subarachnoid haemorrhage', 'Tension-type headache', 'Sinusitis', 'Eye strain'], correct: 0, explanation: 'Thunderclap headache is a red flag; SAH is the key diagnosis to exclude.', difficulty: 'Foundational' },
      { stem: 'New headache in a 72-year-old with jaw claudication should prompt urgent evaluation for:', options: ['Giant cell arteritis', 'Cluster headache', 'Migraine with aura', 'Tension-type headache'], correct: 0, explanation: 'GCA threatens vision and needs prompt assessment and treatment.', difficulty: 'Intermediate' },
      { stem: 'Daily headache in a patient taking analgesics on most days suggests:', options: ['Medication-overuse headache', 'Brain tumour in every case', 'Cluster headache', 'Trigeminal neuralgia'], correct: 0, explanation: 'Frequent acute medication use can perpetuate chronic headache.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'neuro-gbs-1', system: S,
    title: 'Guillain–Barré Syndrome',
    objectives: [
      'Recognise the typical presentation of GBS',
      'Explain supportive investigations and their timing',
      'Identify the complications that make GBS dangerous',
    ],
    coreContent: `Guillain–Barré syndrome (GBS) is an acute immune-mediated polyradiculoneuropathy, often following a respiratory or gastrointestinal infection (for example Campylobacter jejuni) a few weeks earlier.

Classic presentation: progressive, fairly symmetrical weakness, usually starting in the legs, with reduced or absent reflexes, reaching its worst within four weeks. Sensory symptoms and back or limb pain are common. Variants include Miller Fisher syndrome (ophthalmoplegia, ataxia, areflexia).

Investigations:
- CSF often shows raised protein with a normal cell count (albuminocytological dissociation), but may be normal in the first week.
- Nerve conduction studies show demyelinating or axonal patterns, and can also be normal early.
A markedly raised CSF cell count should prompt consideration of other diagnoses.

The danger lies in complications:
- Respiratory failure from diaphragm weakness: monitor vital capacity, and watch for weak cough, neck flexion weakness and bulbar dysfunction.
- Autonomic instability: arrhythmias and blood pressure swings.
- Venous thromboembolism, pain, pressure injury.

Immunotherapy (intravenous immunoglobulin or plasma exchange) is used in patients who cannot walk unaided or are deteriorating.`,
    keyConcepts: [
      'Normal early CSF and NCS do not exclude GBS',
      'Oxygen saturation falls late in neuromuscular respiratory failure',
      'Reflexes are reduced or absent in GBS',
    ],
    clinicalPearls: [
      'Ask the patient to count aloud on one breath: a bedside clue to falling vital capacity',
      'A clear sensory level suggests a spinal cord problem, not GBS',
    ],
    sources: [pm('Leonhard SE et al. Diagnosis and management of Guillain-Barré syndrome in ten steps. Nat Rev Neurol 2019'), pm('European Academy of Neurology/Peripheral Nerve Society guideline on diagnosis and treatment of Guillain-Barré syndrome 2023')],
    questions: [
      { stem: 'Which combination is typical of GBS?', options: ['Progressive symmetrical weakness with reduced or absent reflexes', 'Spastic weakness with brisk reflexes', 'Weakness with a sensory level and urinary retention', 'Fatigable ptosis only'], correct: 0, explanation: 'GBS is a peripheral neuropathy: flaccid weakness with hyporeflexia.', difficulty: 'Foundational' },
      { stem: 'Albuminocytological dissociation in CSF means:', options: ['Raised protein with normal cell count', 'Raised cell count with normal protein', 'Low glucose with high protein', 'Blood-stained fluid'], correct: 0, explanation: 'This classic pattern supports GBS but can be absent in the first week.', difficulty: 'Intermediate' },
      { stem: 'Why is oxygen saturation an unreliable early marker of respiratory failure in GBS?', options: ['Hypoxaemia occurs late in neuromuscular weakness', 'GBS causes hyperoxia', 'Pulse oximetry does not work in neuropathy', 'GBS never affects breathing'], correct: 0, explanation: 'Vital capacity and clinical signs fall before saturation drops.', difficulty: 'Advanced' },
      { stem: 'Which infection classically precedes GBS?', options: ['Campylobacter jejuni gastroenteritis', 'Streptococcal pharyngitis in every case', 'Urinary tract infection', 'Malaria'], correct: 0, explanation: 'Molecular mimicry after Campylobacter infection is a well-described trigger.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'neuro-mg-1', system: S,
    title: 'Myasthenia Gravis',
    objectives: [
      'Describe fatigable weakness at the neuromuscular junction',
      'List the confirmatory tests',
      'Recognise myasthenic crisis and its triggers',
    ],
    coreContent: `Myasthenia gravis (MG) is an autoimmune disease of the neuromuscular junction, usually with antibodies against the acetylcholine receptor (AChR) and less commonly against MuSK or LRP4.

The hallmark is fatigable weakness: it worsens with repeated use and through the day, and improves with rest.
- Ocular: ptosis and diplopia, often the first features; some patients stay purely ocular.
- Bulbar: dysarthria, dysphagia, nasal speech.
- Limb and neck weakness, usually proximal.
- Reflexes and sensation are normal.

Diagnosis uses antibody testing, neurophysiology (repetitive nerve stimulation, single-fibre EMG) and the clinical picture. CT of the chest looks for thymoma.

Myasthenic crisis is respiratory failure from weakness of breathing or bulbar muscles. Triggers include infection, surgery, pregnancy, tapering of immunosuppression and drugs that impair neuromuscular transmission (for example aminoglycosides, fluoroquinolones, magnesium, some beta-blockers). Monitoring is clinical and with vital capacity, not saturation alone.`,
    keyConcepts: [
      'Fatigability distinguishes MG from most myopathies',
      'Thymoma is associated with MG and should be sought',
      'Many common drugs can worsen myasthenia',
    ],
    clinicalPearls: [
      'Sustained upgaze for a minute can bring out ptosis',
      'Check the drug chart before giving antibiotics or magnesium to a patient with MG',
    ],
    sources: [pm('International Consensus Guidance for Management of Myasthenia Gravis: 2020 Update. Neurology 2021'), pm('Gilhus NE. Myasthenia Gravis. N Engl J Med 2016')],
    questions: [
      { stem: 'The characteristic weakness of myasthenia gravis is:', options: ['Fatigable, worsening with repeated use', 'Constant and unaffected by activity', 'Associated with absent reflexes', 'Accompanied by a sensory level'], correct: 0, explanation: 'Postsynaptic receptor loss makes transmission fail with repeated activation.', difficulty: 'Foundational' },
      { stem: 'Which imaging should be performed after diagnosing MG?', options: ['CT or MRI of the chest for thymoma', 'MRI lumbar spine', 'Echocardiogram', 'Abdominal ultrasound'], correct: 0, explanation: 'Thymoma is associated with MG and affects management.', difficulty: 'Intermediate' },
      { stem: 'Which antibiotic class can worsen myasthenia gravis?', options: ['Aminoglycosides', 'Penicillins in most cases', 'Cephalosporins in most cases', 'Nitrofurantoin'], correct: 0, explanation: 'Aminoglycosides and fluoroquinolones can impair neuromuscular transmission.', difficulty: 'Intermediate' },
      { stem: 'Myasthenic crisis is defined by:', options: ['Respiratory or bulbar weakness needing ventilatory support', 'Isolated ptosis', 'Muscle cramps', 'Mild diplopia'], correct: 0, explanation: 'Crisis means weakness severe enough to threaten breathing or airway protection.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'neuro-dementia-1', system: S,
    title: 'Dementia — Types and Reversible Contributors',
    objectives: [
      'Define dementia and distinguish it from delirium',
      'Describe the main dementia subtypes',
      'List reversible contributors to check in every assessment',
    ],
    coreContent: `Dementia is an acquired decline in cognition severe enough to interfere with independence in everyday activities. Mild cognitive impairment is decline that does not yet affect independence.

Delirium differs: acute onset, fluctuating course and inattention. Delirium can complicate dementia, and it must be excluded before diagnosing dementia.

Main subtypes:
- Alzheimer disease: early episodic memory loss, gradual progression.
- Vascular dementia: stepwise or gradual decline with vascular risk factors, often slowed thinking and executive dysfunction.
- Dementia with Lewy bodies: fluctuating cognition, visual hallucinations, parkinsonism, REM sleep behaviour disorder; marked sensitivity to antipsychotics.
- Frontotemporal dementia: earlier onset, behavioural change or language decline with relatively preserved memory early on.

Assessment combines history from the patient and an informant, cognitive testing, examination and investigations. Look for contributors that can be treated: hypothyroidism, B12 deficiency, depression, medication side effects (especially anticholinergics and sedatives), hearing and vision loss, alcohol, normal pressure hydrocephalus and structural lesions.`,
    keyConcepts: [
      'Delirium is acute and fluctuating; dementia is usually gradual',
      'Anticholinergic medication burden worsens cognition',
      'Antipsychotics can be dangerous in Lewy body dementia',
    ],
    clinicalPearls: [
      'Gait disturbance, urinary incontinence and cognitive decline together suggest normal pressure hydrocephalus',
      'An informant history is often more informative than a cognitive score',
    ],
    sources: [nice('ng97', 'Dementia: assessment, management and support for people living with dementia and their carers'), pm('Livingston G et al. Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission')],
    questions: [
      { stem: 'Which feature distinguishes delirium from dementia?', options: ['Acute onset with fluctuating attention', 'Gradual memory decline over years', 'Normal attention throughout', 'Absence of any cognitive change'], correct: 0, explanation: 'Inattention and fluctuation are core features of delirium.', difficulty: 'Foundational' },
      { stem: 'Fluctuating cognition, visual hallucinations and parkinsonism suggest:', options: ['Dementia with Lewy bodies', 'Alzheimer disease', 'Frontotemporal dementia', 'Vascular dementia'], correct: 0, explanation: 'These are core clinical features of DLB.', difficulty: 'Intermediate' },
      { stem: 'Which is a potentially reversible contributor to cognitive impairment?', options: ['Vitamin B12 deficiency', 'Advanced age', 'Female sex', 'Family history of dementia'], correct: 0, explanation: 'B12 deficiency, hypothyroidism, depression and drugs should be checked in every assessment.', difficulty: 'Foundational' },
      { stem: 'Early personality change and disinhibition in a 55-year-old with relatively preserved memory suggest:', options: ['Behavioural variant frontotemporal dementia', 'Alzheimer disease', 'Normal ageing', 'Delirium'], correct: 0, explanation: 'bvFTD often presents with behavioural change before memory loss.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'neuro-se-1', system: S,
    title: 'Status Epilepticus — Time-Critical Treatment',
    objectives: [
      'Define convulsive status epilepticus using the operational time points',
      'Describe the staged treatment approach',
      'Recognise non-convulsive status epilepticus',
    ],
    coreContent: `Status epilepticus is a seizure that fails to stop by the mechanisms that normally end it, or that starts mechanisms causing prolonged seizures. The ILAE gives two time points for convulsive status:
- t1 = 5 minutes: treatment should begin.
- t2 = 30 minutes: long-term consequences such as neuronal injury become likely.

Treatment is staged and time-based:
1. Early: airway, oxygen, glucose check, and a first-line benzodiazepine.
2. Established (continuing despite benzodiazepine): a second-line intravenous anti-seizure medication.
3. Refractory: anaesthetic agents with intensive care support and EEG monitoring.

Throughout, look for and treat the cause: hypoglycaemia, hyponatraemia, infection (meningitis, encephalitis), stroke, intracranial haemorrhage, drug or alcohol withdrawal, toxicity, and missed anti-seizure medication.

Non-convulsive status epilepticus has ongoing electrographic seizures without obvious convulsions. Suspect it when a patient does not wake as expected after a seizure, or has unexplained fluctuating confusion. EEG is needed to diagnose it.

Specific drug choices and doses follow local protocols based on current guidelines.`,
    keyConcepts: [
      'Under-dosing the first benzodiazepine is a common, harmful error',
      'Each delay makes the seizure harder to stop',
      'Failure to wake after a seizure needs EEG',
    ],
    clinicalPearls: [
      'Pseudo-resistance: functional seizures can mimic status; look for closed eyes resisting opening and side-to-side movements, but treat if in doubt',
      'In eclampsia, magnesium is the treatment of choice for seizures',
    ],
    sources: [pm('Trinka E et al. A definition and classification of status epilepticus — Report of the ILAE Task Force. Epilepsia 2015'), pm('Glauser T et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults. Epilepsy Curr 2016'), nice('ng217', 'Epilepsies in children, young people and adults')],
    questions: [
      { stem: 'According to the ILAE, treatment of convulsive status epilepticus should start after:', options: ['5 minutes', '30 minutes', '60 minutes', '24 hours'], correct: 0, explanation: 't1 for convulsive status is 5 minutes; t2 (risk of long-term consequences) is 30 minutes.', difficulty: 'Foundational' },
      { stem: 'Seizures continuing after an adequate first benzodiazepine dose require:', options: ['A second-line intravenous anti-seizure medication', 'Waiting another 30 minutes', 'Oral medication only', 'Discharge'], correct: 0, explanation: 'Established status needs a second-line IV agent without delay.', difficulty: 'Intermediate' },
      { stem: 'A patient fails to regain consciousness 40 minutes after a convulsion stops. What should be considered?', options: ['Non-convulsive status epilepticus, needing EEG', 'Normal post-ictal sleep in every case', 'Malingering', 'Migraine'], correct: 0, explanation: 'Prolonged failure to recover suggests ongoing electrographic seizures.', difficulty: 'Advanced' },
      { stem: 'Which bedside test must be checked early in every seizing patient?', options: ['Capillary glucose', 'Serum amylase', 'Urine pregnancy test before treatment', 'Lipid profile'], correct: 0, explanation: 'Hypoglycaemia is a rapidly reversible cause of seizures.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'neuro-cord-1', system: S,
    title: 'Spinal Cord Compression and Cauda Equina Syndrome',
    objectives: [
      'Recognise the features of spinal cord compression',
      'Distinguish cauda equina syndrome',
      'Explain why urgent MRI and treatment preserve function',
    ],
    coreContent: `Spinal cord compression is an emergency: outcome depends on function at the time of treatment.

Causes include metastatic cancer (breast, lung, prostate, kidney, myeloma), disc herniation, epidural abscess, haematoma, trauma and vertebral collapse.

Features of cord compression:
- back pain, often preceding neurological signs; pain that is worse lying flat, or at night, in someone with cancer is a red flag
- leg weakness, initially may be flaccid then spastic, with brisk reflexes and extensor plantars below the level
- a sensory level
- bladder and bowel dysfunction (often late)

Cauda equina syndrome involves the lumbosacral nerve roots below the end of the cord. Features: saddle anaesthesia, bladder dysfunction (retention or altered sensation), bowel dysfunction, sexual dysfunction, and bilateral or unilateral sciatica. Reflexes are reduced (lower motor neuron).

Both need urgent whole-spine or lumbar MRI. Management depends on cause: corticosteroids and oncology input for metastatic compression, neurosurgical decompression, and antibiotics with drainage for abscess.`,
    keyConcepts: [
      'Ambulatory status at diagnosis predicts outcome in malignant cord compression',
      'Cauda equina gives lower motor neuron signs; cord compression gives upper motor neuron signs below the level',
      'Fever with back pain and neurological signs: suspect epidural abscess',
    ],
    clinicalPearls: [
      'Ask every patient with back pain about saddle numbness and bladder function',
      'A post-void bladder scan helps but does not exclude cauda equina syndrome',
    ],
    sources: [nice('ng234', 'Spinal metastases and metastatic spinal cord compression'), web('GIRFT National Suspected Cauda Equina Syndrome Pathway (2023)', 'https://gettingitrightfirsttime.co.uk/')],
    questions: [
      { stem: 'Saddle anaesthesia and urinary retention with sciatica suggest:', options: ['Cauda equina syndrome', 'Simple mechanical back pain', 'Peripheral neuropathy', 'Myasthenia gravis'], correct: 0, explanation: 'Sacral root involvement causes saddle sensory loss and sphincter dysfunction.', difficulty: 'Foundational' },
      { stem: 'A patient with prostate cancer develops back pain and leg weakness. Investigation of choice:', options: ['Urgent MRI of the whole spine', 'Plain spine radiograph', 'Bone scan next week', 'Nerve conduction studies'], correct: 0, explanation: 'Metastatic cord compression requires urgent MRI, often of the whole spine.', difficulty: 'Foundational' },
      { stem: 'Which finding suggests spinal cord compression rather than cauda equina syndrome?', options: ['Brisk reflexes with extensor plantar responses', 'Absent ankle reflexes', 'Flaccid areflexic legs with saddle anaesthesia', 'Isolated sciatica'], correct: 0, explanation: 'Cord compression causes upper motor neuron signs below the lesion.', difficulty: 'Intermediate' },
      { stem: 'Back pain, fever and new leg weakness in a person who injects drugs suggest:', options: ['Spinal epidural abscess', 'Muscle strain', 'Migraine', 'Renal colic'], correct: 0, explanation: 'Epidural abscess is a surgical emergency in at-risk patients.', difficulty: 'Intermediate' },
    ],
  },
];
