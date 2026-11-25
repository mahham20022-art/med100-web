import { nice, pm, web } from './_src.js';
const S = 'Infectious Disease';

export default [
  {
    topicId: 'id-cap-1', system: S,
    title: 'Community-Acquired Pneumonia',
    objectives: [
      'Recognise the clinical and radiological features of pneumonia',
      'Use severity assessment to guide the place of care',
      'Name the common causative organisms',
    ],
    coreContent: `Community-acquired pneumonia (CAP) is an acute infection of the lung parenchyma acquired outside hospital. Symptoms include cough, fever, breathlessness, pleuritic chest pain and sputum; older patients may present with confusion or falls alone. Signs include tachypnoea, crackles and bronchial breathing. A chest radiograph showing new consolidation confirms the diagnosis in most settings.

Streptococcus pneumoniae is the commonest bacterial cause. Others include Haemophilus influenzae, Mycoplasma pneumoniae, Legionella, Staphylococcus aureus (especially after influenza) and respiratory viruses.

Severity scores (for example CURB-65: confusion, urea, respiratory rate, blood pressure, age 65 or over) support, but do not replace, clinical judgement about whether a patient can be treated at home, needs admission or needs critical care. Hypoxaemia, multilobar disease, sepsis and inability to take oral treatment all matter.

Antibiotic choice follows local guidance based on severity and resistance patterns. Review the diagnosis if the patient does not improve within a few days: consider empyema, abscess, an unusual organism, tuberculosis or an alternative diagnosis such as PE or malignancy.`,
    keyConcepts: [
      'Confusion in an older adult can be the only sign of pneumonia',
      'Severity scores guide but do not override judgement',
      'Failure to improve should prompt a search for complications',
    ],
    clinicalPearls: [
      'Repeat the chest radiograph after recovery in smokers and older adults to exclude underlying malignancy, per local guidance',
      'Legionella: think of it with hyponatraemia, diarrhoea and travel or water-system exposure',
    ],
    sources: [nice('ng250', 'Pneumonia: diagnosis and management'), pm('Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the ATS and IDSA 2019')],
    questions: [
      { stem: 'The most common bacterial cause of community-acquired pneumonia is:', options: ['Streptococcus pneumoniae', 'Pseudomonas aeruginosa', 'Escherichia coli', 'Clostridioides difficile'], correct: 0, explanation: 'Pneumococcus remains the leading bacterial cause of CAP.', difficulty: 'Foundational' },
      { stem: 'CURB-65 includes:', options: ['Confusion, urea, respiratory rate, blood pressure, age ≥65', 'CRP, urine output, respiratory rate, bilirubin', 'Cough, urea, radiograph, blood cultures', 'Creatinine, uric acid, rash, BMI'], correct: 0, explanation: 'CURB-65 helps estimate mortality risk and guide place of care.', difficulty: 'Foundational' },
      { stem: 'A patient with pneumonia is not improving after several days of appropriate antibiotics. Which should be considered?', options: ['Empyema or lung abscess', 'Treatment is always working', 'Stopping all investigations', 'Simple viral cold'], correct: 0, explanation: 'Non-response warrants a search for complications, resistant or unusual organisms, or an alternative diagnosis.', difficulty: 'Intermediate' },
      { stem: 'Pneumonia with hyponatraemia, diarrhoea and recent hotel stay suggests:', options: ['Legionella', 'Pneumocystis', 'Aspiration', 'Tuberculosis'], correct: 0, explanation: 'Legionella is associated with water systems, and often hyponatraemia and GI symptoms.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'id-uti-1', system: S,
    title: 'Urinary Tract Infection and Pyelonephritis',
    objectives: [
      'Distinguish cystitis, pyelonephritis and asymptomatic bacteriuria',
      'Explain why asymptomatic bacteriuria is usually not treated',
      'Identify complicated UTI and urosepsis',
    ],
    coreContent: `Urinary tract infection (UTI) ranges from lower tract infection (cystitis) to upper tract infection (pyelonephritis) and urosepsis. Escherichia coli is the commonest organism.

- Cystitis: dysuria, frequency, urgency, suprapubic pain, without systemic features.
- Pyelonephritis: fever, loin pain, rigors, nausea, with or without lower tract symptoms.
- Asymptomatic bacteriuria: bacteria in the urine without symptoms. It is common in older adults and catheterised patients and should generally not be treated, except in pregnancy and before certain urological procedures.

Urine dipstick testing becomes unreliable in older people (over 65 in NICE guidance) and in catheterised patients because bacteriuria is so common; diagnosis there depends on symptoms and signs. A positive dipstick in a confused older patient without urinary symptoms should not automatically be labelled UTI.

Complicated UTI includes infection in men, pregnancy, structural or functional urinary tract abnormality, catheters, immunosuppression, and obstruction. Obstructed infected kidneys need drainage. Send urine culture before antibiotics in complicated or upper tract infection.`,
    keyConcepts: [
      'Treating asymptomatic bacteriuria drives resistance and C. difficile without benefit',
      'Do not use dipsticks to diagnose UTI in older adults',
      'Pyelonephritis with obstruction is a urological emergency',
    ],
    clinicalPearls: [
      'Recurrent UTI in a man needs evaluation for prostate or urinary tract abnormality',
      '"Confusion plus positive dipstick" often hides another diagnosis; look for it',
    ],
    sources: [nice('ng109', 'Urinary tract infection (lower): antimicrobial prescribing'), nice('ng111', 'Pyelonephritis (acute): antimicrobial prescribing'), pm('Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria: 2019 Update by the IDSA')],
    questions: [
      { stem: 'Asymptomatic bacteriuria should generally be treated in:', options: ['Pregnancy', 'Older adults in care homes', 'People with long-term catheters', 'All patients with a positive dipstick'], correct: 0, explanation: 'Pregnancy is a key exception because bacteriuria increases the risk of pyelonephritis and adverse outcomes.', difficulty: 'Foundational' },
      { stem: 'Fever, loin pain and rigors suggest:', options: ['Pyelonephritis', 'Simple cystitis', 'Urethritis only', 'Asymptomatic bacteriuria'], correct: 0, explanation: 'Systemic features and flank pain indicate upper tract infection.', difficulty: 'Foundational' },
      { stem: 'Why is urine dipstick testing unreliable in older adults?', options: ['Asymptomatic bacteriuria is very common', 'Dipsticks only work in children', 'Older people never get UTIs', 'Leukocytes are never present'], correct: 0, explanation: 'High background bacteriuria means positive tests have low predictive value.', difficulty: 'Intermediate' },
      { stem: 'The most common organism causing UTI is:', options: ['Escherichia coli', 'Staphylococcus aureus', 'Streptococcus pneumoniae', 'Candida'], correct: 0, explanation: 'E. coli causes most community UTIs.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'id-tb-1', system: S,
    title: 'Tuberculosis',
    objectives: [
      'Recognise pulmonary and extrapulmonary presentations of TB',
      'Distinguish latent TB infection from active disease',
      'Describe the principles of diagnosis and public health control',
    ],
    coreContent: `Tuberculosis is caused by Mycobacterium tuberculosis, spread by airborne droplets from people with infectious pulmonary disease. It remains one of the leading infectious causes of death worldwide.

Pulmonary TB: cough for more than two to three weeks, haemoptysis, fever, night sweats and weight loss. The chest radiograph classically shows upper-lobe disease, cavitation or lymphadenopathy, but may be atypical, especially with HIV.

Extrapulmonary TB affects lymph nodes, pleura, spine (Pott disease), meninges, abdomen, pericardium, kidneys and more. TB meningitis is subacute and often devastating if diagnosis is delayed.

Latent TB infection: immune evidence of infection (tuberculin skin test or interferon-gamma release assay) without active disease. It is not infectious but can reactivate, especially with HIV, diabetes, immunosuppressive drugs (including anti-TNF therapy) or malnutrition.

Diagnosis of active disease uses sputum or tissue microscopy, culture and nucleic acid amplification tests (for example Xpert MTB/RIF, which also detects rifampicin resistance). Treatment requires a multi-drug regimen for months, with adherence support. TB is notifiable; contact tracing is part of care.`,
    keyConcepts: [
      'IGRA and skin tests cannot distinguish latent from active TB',
      'Screen for latent TB before starting biologic immunosuppression',
      'Drug resistance is detected by molecular tests and culture',
    ],
    clinicalPearls: [
      'Offer HIV testing to everyone diagnosed with TB',
      'A lymphocytic exudative pleural effusion in an endemic area suggests TB pleuritis',
    ],
    sources: [web('WHO consolidated guidelines on tuberculosis', 'https://www.who.int/publications/i/item/9789240107243'), nice('ng33', 'Tuberculosis')],
    questions: [
      { stem: 'Latent TB infection differs from active TB because it is:', options: ['Not infectious and without disease', 'Always symptomatic', 'Always visible on chest radiograph', 'Diagnosed by sputum smear'], correct: 0, explanation: 'Latent infection shows immune evidence of exposure without disease or transmission.', difficulty: 'Foundational' },
      { stem: 'Before starting anti-TNF therapy, patients should be screened for:', options: ['Latent tuberculosis', 'Hepatitis A', 'Influenza', 'Iron deficiency'], correct: 0, explanation: 'Anti-TNF drugs increase the risk of reactivating latent TB.', difficulty: 'Intermediate' },
      { stem: 'Which test detects M. tuberculosis and rifampicin resistance rapidly?', options: ['Nucleic acid amplification test (e.g. Xpert MTB/RIF)', 'Tuberculin skin test', 'Chest radiograph', 'ESR'], correct: 0, explanation: 'Molecular tests identify TB DNA and resistance-associated mutations within hours.', difficulty: 'Intermediate' },
      { stem: 'Which test should be offered to every patient diagnosed with TB?', options: ['HIV test', 'Thyroid function', 'Lipid profile', 'Echocardiogram'], correct: 0, explanation: 'HIV coinfection changes treatment and prognosis.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'id-hiv-1', system: S,
    title: 'HIV — Testing, Natural History and Prevention',
    objectives: [
      'Describe the natural history of untreated HIV infection',
      'Explain why early testing and treatment matter',
      'Recognise indicator conditions that should prompt testing',
    ],
    coreContent: `HIV infects CD4 T cells. Untreated infection progresses through:
- Acute (primary) infection: a flu-like or glandular-fever-like illness with fever, rash, sore throat and lymphadenopathy, a few weeks after exposure. Viral load is very high and transmission risk is high.
- Chronic infection: often years without symptoms while CD4 count gradually falls.
- Advanced disease (AIDS): opportunistic infections and cancers, such as Pneumocystis pneumonia, cerebral toxoplasmosis, cryptococcal meningitis, tuberculosis and Kaposi sarcoma.

Effective antiretroviral therapy (ART) suppresses viral replication, restores immunity and gives near-normal life expectancy. People with a sustained undetectable viral load do not transmit HIV sexually ("undetectable = untransmittable").

Testing should be routine and normalised. Indicator conditions that should prompt an HIV test include TB, pneumonia, unexplained lymphadenopathy, shingles in a young adult, sexually transmitted infections, hepatitis B or C, lymphoma, oral candidiasis and unexplained weight loss or cytopenias.

Prevention includes condoms, pre-exposure prophylaxis (PrEP), post-exposure prophylaxis (PEP) started as early as possible after exposure, and treatment as prevention.`,
    keyConcepts: [
      'Acute HIV may test negative on antibody-only assays; combined antigen/antibody tests detect it earlier',
      'Undetectable viral load means no sexual transmission',
      'Late diagnosis is the main driver of HIV-related death in many settings',
    ],
    clinicalPearls: [
      'Offer an HIV test in any patient with TB or an STI',
      'PEP should be started as soon as possible after exposure, ideally within hours',
    ],
    sources: [web('WHO consolidated guidelines on HIV prevention, testing, treatment, service delivery and monitoring', 'https://www.who.int/publications/i/item/9789240031593'), web('BHIVA guidelines', 'https://www.bhiva.org/guidelines')],
    questions: [
      { stem: 'A patient with a sustained undetectable HIV viral load on ART:', options: ['Does not transmit HIV sexually', 'Remains highly infectious sexually', 'No longer needs treatment', 'Has been cured'], correct: 0, explanation: 'Undetectable = untransmittable for sexual transmission; treatment must continue.', difficulty: 'Foundational' },
      { stem: 'Which condition should prompt HIV testing?', options: ['Tuberculosis', 'Simple tension headache', 'Ingrown toenail', 'Hypothyroidism in an older woman'], correct: 0, explanation: 'TB is a classic HIV indicator condition.', difficulty: 'Foundational' },
      { stem: 'A febrile rash with sore throat and lymphadenopathy three weeks after a high-risk exposure suggests:', options: ['Primary HIV infection', 'Allergy', 'Chronic HIV', 'Measles in every case'], correct: 0, explanation: 'Acute HIV causes a mononucleosis-like illness with very high viral load.', difficulty: 'Intermediate' },
      { stem: 'Why might an antibody-only test miss acute HIV?', options: ['Antibodies may not yet be detectable', 'HIV never causes antibodies', 'The virus is absent in blood', 'Antibody tests detect only hepatitis'], correct: 0, explanation: 'Fourth-generation tests detect p24 antigen and shorten the window period.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'id-ie-1', system: S,
    title: 'Infective Endocarditis',
    objectives: [
      'Recognise the presentations of infective endocarditis',
      'Explain the role of blood cultures and echocardiography',
      'Identify patients at higher risk',
    ],
    coreContent: `Infective endocarditis (IE) is infection of the endocardium, usually a heart valve. It is uncommon but serious, with high mortality.

Presentations vary from acute sepsis (often Staphylococcus aureus) to a subacute illness with fever, fatigue, weight loss and night sweats (often viridans streptococci or enterococci). Look for a new or changing murmur, embolic events (stroke, splenic or renal infarcts, limb ischaemia), heart failure, and immunological signs such as splinter haemorrhages, Janeway lesions, Osler nodes, Roth spots and haematuria.

Risk factors: prosthetic valves or devices, previous IE, congenital heart disease, rheumatic or degenerative valve disease, injecting drug use (often right-sided, tricuspid), haemodialysis and indwelling lines.

Diagnosis uses the modified Duke criteria (updated by the ISCVID in 2023) combining microbiology and imaging:
- Several sets of blood cultures taken before antibiotics, from separate venepunctures.
- Echocardiography: transthoracic first, transoesophageal when suspicion remains or for prosthetic valves.

Management involves prolonged intravenous antibiotics and an endocarditis team. Surgery is needed for heart failure, uncontrolled infection or high embolic risk.`,
    keyConcepts: [
      'Take blood cultures before antibiotics in any fever with a murmur',
      'Staphylococcus aureus bacteraemia should always prompt assessment for endocarditis',
      'A negative transthoracic echo does not exclude IE',
    ],
    clinicalPearls: [
      'Stroke with fever: consider septic emboli from endocarditis',
      'Tricuspid endocarditis in people who inject drugs often presents with septic pulmonary emboli',
    ],
    sources: [web('2023 ESC Guidelines for the management of endocarditis', 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines'), pm('The 2023 Duke-International Society for Cardiovascular Infectious Diseases Criteria for Infective Endocarditis')],
    questions: [
      { stem: 'Before starting antibiotics in suspected endocarditis, it is essential to:', options: ['Take multiple sets of blood cultures', 'Perform a CT head', 'Check thyroid function', 'Start anticoagulation'], correct: 0, explanation: 'Identifying the organism is central to diagnosis and treatment.', difficulty: 'Foundational' },
      { stem: 'Which organism commonly causes acute, aggressive endocarditis?', options: ['Staphylococcus aureus', 'Viridans streptococci in all cases', 'Lactobacillus', 'Candida only'], correct: 0, explanation: 'S. aureus causes rapidly destructive endocarditis with high mortality.', difficulty: 'Intermediate' },
      { stem: 'Endocarditis in people who inject drugs most often affects the:', options: ['Tricuspid valve', 'Mitral valve only', 'Aortic valve only', 'Pulmonary valve only'], correct: 0, explanation: 'Right-sided endocarditis is typical and can cause septic pulmonary emboli.', difficulty: 'Intermediate' },
      { stem: 'A transthoracic echo is normal but suspicion of prosthetic-valve endocarditis remains. Next step:', options: ['Transoesophageal echocardiography', 'Stop investigating', 'Exercise ECG', 'Spirometry'], correct: 0, explanation: 'TOE is more sensitive, particularly for prosthetic valves and abscesses.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'id-malaria-1', system: S,
    title: 'Malaria — Fever in a Returning Traveller',
    objectives: [
      'Recognise malaria as an emergency in anyone with fever after travel to an endemic area',
      'Describe the diagnostic tests',
      'Identify features of severe falciparum malaria',
    ],
    coreContent: `Malaria is caused by Plasmodium parasites transmitted by Anopheles mosquitoes. Plasmodium falciparum causes most severe disease and deaths; P. vivax and P. ovale can relapse from dormant liver stages; P. knowlesi can also cause severe disease.

Any fever in a person who has been in a malaria-endemic area (typically within the past few months, longer for vivax/ovale) is malaria until proven otherwise. Symptoms are non-specific: fever, rigors, headache, myalgia, vomiting, diarrhoea. There may be no cyclical pattern.

Diagnosis: thick and thin blood films (repeated if negative and suspicion persists) and/or rapid diagnostic antigen tests. Films also estimate parasite percentage and species.

Features of severe falciparum malaria include impaired consciousness or seizures (cerebral malaria), respiratory distress, shock, severe anaemia, hypoglycaemia, acidosis, AKI, jaundice, bleeding and high parasitaemia. Severe malaria needs intravenous treatment (artesunate in current WHO guidance) and close monitoring, often in critical care.

Prevention includes bite avoidance, bed nets and chemoprophylaxis matched to the destination.`,
    keyConcepts: [
      'One negative film does not exclude malaria; repeat as guided by local protocols',
      'Falciparum malaria can deteriorate within hours',
      'Hypoglycaemia is common in severe malaria and with quinine treatment',
    ],
    clinicalPearls: [
      'Ask every febrile patient where they have travelled, including visits to family',
      'People who grew up in endemic areas lose partial immunity after living away',
    ],
    sources: [web('WHO Guidelines for malaria', 'https://www.who.int/publications/i/item/guidelines-for-malaria'), pm('UK malaria treatment guidelines 2016 J Infect')],
    questions: [
      { stem: 'A traveller returning from sub-Saharan Africa has fever. The first priority is to:', options: ['Exclude malaria with blood films or rapid tests', 'Prescribe antibiotics and discharge', 'Wait for the fever to recur', 'Perform a CT abdomen'], correct: 0, explanation: 'Malaria must be excluded urgently in any febrile traveller from an endemic area.', difficulty: 'Foundational' },
      { stem: 'Which species causes most severe malaria and deaths?', options: ['Plasmodium falciparum', 'Plasmodium malariae', 'Plasmodium ovale', 'Plasmodium vivax in all cases'], correct: 0, explanation: 'P. falciparum causes severe and cerebral malaria.', difficulty: 'Foundational' },
      { stem: 'Which feature indicates severe malaria?', options: ['Impaired consciousness', 'Mild headache', 'Low-grade fever alone', 'Myalgia alone'], correct: 0, explanation: 'Neurological impairment is a criterion for severe malaria.', difficulty: 'Intermediate' },
      { stem: 'Which Plasmodium species can relapse from dormant liver forms?', options: ['P. vivax and P. ovale', 'P. falciparum only', 'P. knowlesi only', 'None'], correct: 0, explanation: 'Hypnozoites of vivax and ovale need additional treatment to prevent relapse.', difficulty: 'Advanced' },
    ],
  },
];
