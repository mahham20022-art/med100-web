import { nice, pm, web } from './_src.js';
const S = 'Rheumatology';

export default [
  {
    topicId: 'rheum-sle-1', system: S,
    title: 'Systemic Lupus Erythematosus',
    objectives: [
      'Recognise the multisystem features of SLE',
      'Interpret ANA and specific antibodies appropriately',
      'Identify lupus nephritis and other organ-threatening disease',
    ],
    coreContent: `Systemic lupus erythematosus (SLE) is a chronic autoimmune disease, most common in women of childbearing age, with immune complex and autoantibody-mediated injury to many organs.

Features include:
- Constitutional: fatigue, fever, weight loss.
- Mucocutaneous: malar rash, photosensitivity, oral ulcers, discoid lesions, alopecia.
- Musculoskeletal: non-erosive arthritis.
- Serositis: pleurisy, pericarditis.
- Renal: lupus nephritis (proteinuria, haematuria, rising creatinine).
- Haematological: cytopenias, haemolytic anaemia.
- Neurological: seizures, psychosis, cognitive dysfunction.

ANA is highly sensitive (a negative test makes SLE unlikely) but not specific; low-titre ANA is common in healthy people. Anti-dsDNA and anti-Sm are more specific. Low complement and rising anti-dsDNA can accompany active disease, especially nephritis. Antiphospholipid antibodies increase thrombosis and pregnancy loss risk.

Classification criteria (EULAR/ACR 2019) require a positive ANA as an entry criterion. Urinalysis and blood pressure should be checked at every visit because nephritis can be silent.`,
    keyConcepts: [
      'ANA rules out more than it rules in',
      'Lupus nephritis is often silent: dip the urine',
      'Hydroxychloroquine is a foundation of SLE treatment for most patients',
    ],
    clinicalPearls: [
      'Pregnancy planning in SLE needs specialist input, especially with antiphospholipid or anti-Ro antibodies',
      'Fever in a patient with lupus on immunosuppression is infection until proven otherwise',
    ],
    sources: [pm('2019 European League Against Rheumatism/American College of Rheumatology Classification Criteria for Systemic Lupus Erythematosus'), pm('EULAR recommendations for the management of systemic lupus erythematosus: 2023 update')],
    questions: [
      { stem: 'A negative ANA in a patient with possible SLE:', options: ['Makes SLE unlikely', 'Confirms SLE', 'Has no value', 'Proves drug-induced lupus'], correct: 0, explanation: 'ANA is very sensitive for SLE; a negative result argues strongly against it.', difficulty: 'Foundational' },
      { stem: 'Which antibody is relatively specific for SLE?', options: ['Anti-dsDNA', 'ANA', 'Rheumatoid factor', 'Anti-CCP'], correct: 0, explanation: 'Anti-dsDNA and anti-Sm are more specific than ANA.', difficulty: 'Intermediate' },
      { stem: 'Why should urine be tested at every SLE review?', options: ['Lupus nephritis can be asymptomatic', 'Urine tests detect rashes', 'It measures ANA', 'To check for pregnancy only'], correct: 0, explanation: 'Proteinuria and haematuria may be the first signs of nephritis.', difficulty: 'Foundational' },
      { stem: 'Antiphospholipid antibodies in SLE increase the risk of:', options: ['Thrombosis and pregnancy loss', 'Hypercalcaemia', 'Gout', 'Hyperthyroidism'], correct: 0, explanation: 'Antiphospholipid syndrome causes arterial and venous thrombosis and obstetric complications.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'rheum-gout-1', system: S,
    title: 'Gout and Calcium Pyrophosphate Disease',
    objectives: [
      'Recognise the typical acute gout attack',
      'Explain why serum urate can be normal during an attack',
      'Distinguish gout from pseudogout by crystal analysis',
    ],
    coreContent: `Gout is inflammatory arthritis caused by monosodium urate crystals deposited after prolonged hyperuricaemia. The classic attack is sudden, severe pain, swelling and redness of the first metatarsophalangeal joint, often at night, reaching peak within 24 hours. Ankles, knees, wrists and hands are also affected. Tophi form in chronic disease.

Risk factors include male sex, CKD, diuretics, obesity, alcohol (especially beer and spirits), diets high in purines and fructose, metabolic syndrome and genetics.

Serum urate can be normal or low during an acute attack, so a normal value does not exclude gout; recheck after the flare.

Joint aspiration is the definitive test:
- Gout: needle-shaped crystals, negatively birefringent under polarised light.
- Calcium pyrophosphate deposition (CPPD, "pseudogout"): rhomboid crystals, weakly positively birefringent. Typically older patients, knees and wrists, often with chondrocalcinosis on X-ray.

Always consider septic arthritis in a hot swollen joint; crystals and infection can coexist. Long-term urate-lowering therapy is aimed at a target urate to dissolve crystals.`,
    keyConcepts: [
      'Normal urate during a flare does not exclude gout',
      'Crystals do not exclude infection',
      'Urate-lowering therapy can trigger flares when started; prophylaxis helps',
    ],
    clinicalPearls: [
      'Gout associates strongly with cardiovascular and kidney disease: assess risk',
      'CPPD in a young patient should prompt a search for haemochromatosis, hyperparathyroidism or hypomagnesaemia',
    ],
    sources: [nice('ng219', 'Gout: diagnosis and management'), pm('2016 updated EULAR evidence-based recommendations for the management of gout')],
    questions: [
      { stem: 'Negatively birefringent needle-shaped crystals indicate:', options: ['Gout', 'Pseudogout', 'Septic arthritis', 'Rheumatoid arthritis'], correct: 0, explanation: 'Monosodium urate crystals are needle-shaped and negatively birefringent.', difficulty: 'Foundational' },
      { stem: 'During an acute gout attack, serum urate:', options: ['May be normal', 'Is always very high', 'Is always zero', 'Confirms the diagnosis'], correct: 0, explanation: 'Urate can fall during inflammation; measure again after the flare.', difficulty: 'Intermediate' },
      { stem: 'Chondrocalcinosis on knee X-ray in an older patient with a hot knee suggests:', options: ['Calcium pyrophosphate disease', 'Gout only', 'Osteoarthritis only', 'Psoriatic arthritis'], correct: 0, explanation: 'Cartilage calcification is typical of CPPD.', difficulty: 'Intermediate' },
      { stem: 'Finding crystals in a hot joint aspirate means:', options: ['Infection is not excluded; culture is still needed', 'Infection is excluded', 'No further tests are needed', 'Antibiotics must be stopped'], correct: 0, explanation: 'Crystal arthritis and septic arthritis can coexist.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'rheum-spa-1', system: S,
    title: 'Spondyloarthritis — Inflammatory Back Pain',
    objectives: [
      'Distinguish inflammatory from mechanical back pain',
      'Recognise the extra-articular features of spondyloarthritis',
      'Describe the role of HLA-B27 and MRI',
    ],
    coreContent: `Axial spondyloarthritis (including ankylosing spondylitis) is chronic inflammation of the sacroiliac joints and spine, typically starting before age 45.

Features of inflammatory back pain:
- insidious onset, lasting more than three months
- morning stiffness for more than 30 minutes
- improves with exercise, not with rest
- pain in the second half of the night
- alternating buttock pain

Related features include enthesitis (for example Achilles), dactylitis, peripheral arthritis, anterior uveitis, psoriasis and inflammatory bowel disease. Peripheral spondyloarthritis includes psoriatic arthritis and reactive arthritis (after GI or genitourinary infection).

HLA-B27 supports the diagnosis but is present in many healthy people and absent in some patients. MRI of the sacroiliac joints can show inflammation before radiographic damage (non-radiographic axial spondyloarthritis). CRP may be normal.

Treatment includes regular exercise and physiotherapy, NSAIDs, and biologic therapy for persistent active disease. Diagnosis is often delayed by years, which is why the pattern matters.`,
    keyConcepts: [
      'Inflammatory back pain improves with movement',
      'Acute anterior uveitis needs urgent eye assessment',
      'Normal X-ray and CRP do not exclude axial spondyloarthritis',
    ],
    clinicalPearls: [
      'Ask young adults with chronic back pain about uveitis, psoriasis and bowel symptoms',
      'A painful red eye with photophobia in a patient with back pain: anterior uveitis',
    ],
    sources: [nice('ng65', 'Spondyloarthritis in over 16s: diagnosis and management'), pm('ASAS-EULAR recommendations for the management of axial spondyloarthritis: 2022 update')],
    questions: [
      { stem: 'Which feature suggests inflammatory rather than mechanical back pain?', options: ['Improvement with exercise', 'Worse with activity and better with rest', 'Sudden onset after lifting', 'Age over 70 at onset'], correct: 0, explanation: 'Inflammatory back pain improves with movement and worsens with rest.', difficulty: 'Foundational' },
      { stem: 'Which eye condition is associated with spondyloarthritis?', options: ['Acute anterior uveitis', 'Cataract only', 'Myopia', 'Glaucoma only'], correct: 0, explanation: 'Anterior uveitis is a common extra-articular feature.', difficulty: 'Foundational' },
      { stem: 'HLA-B27 in suspected axial spondyloarthritis:', options: ['Supports but does not confirm the diagnosis', 'Confirms the diagnosis', 'Excludes the diagnosis', 'Is unrelated'], correct: 0, explanation: 'HLA-B27 is present in many healthy people and absent in some patients.', difficulty: 'Intermediate' },
      { stem: 'Which imaging can detect early sacroiliitis before X-ray changes?', options: ['MRI', 'Plain radiograph', 'Ultrasound abdomen', 'DEXA scan'], correct: 0, explanation: 'MRI shows bone marrow oedema of early inflammation.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'rheum-gca-1', system: S,
    title: 'Giant Cell Arteritis and Polymyalgia Rheumatica',
    objectives: [
      'Recognise the features of GCA and PMR',
      'Explain why GCA is a sight-threatening emergency',
      'Describe how diagnosis is confirmed without delaying treatment',
    ],
    coreContent: `Giant cell arteritis (GCA) is a large-vessel vasculitis of people over 50, affecting the aorta and its branches, especially the temporal and ophthalmic arteries.

Features:
- new headache, often temporal
- scalp tenderness, jaw or tongue claudication
- visual symptoms: transient visual loss, diplopia; permanent visual loss can occur suddenly
- systemic symptoms: fever, weight loss, fatigue
- raised ESR/CRP in most patients

Suspected GCA should be treated urgently with glucocorticoids, without waiting for confirmatory tests, because visual loss is often irreversible. Diagnosis is then confirmed by fast-track specialist assessment: temporal artery ultrasound or biopsy (biopsy remains positive for some days after starting steroids), or other vascular imaging for large-vessel disease.

Polymyalgia rheumatica (PMR) causes bilateral shoulder and hip girdle pain and stiffness, worse in the morning, in older adults with raised inflammatory markers. It overlaps with GCA: ask every PMR patient about GCA symptoms. PMR responds rapidly to low-dose glucocorticoids; a poor response should prompt reconsideration of the diagnosis.`,
    keyConcepts: [
      'Treat suspected GCA immediately; confirm afterwards',
      'Visual symptoms in GCA need same-day specialist input',
      'Long-term glucocorticoids need bone protection and monitoring',
    ],
    clinicalPearls: [
      'Jaw claudication is one of the most specific symptoms of GCA',
      'PMR mimics include rheumatoid arthritis in older adults, myeloma and other cancers',
    ],
    sources: [pm('British Society for Rheumatology guideline on diagnosis and treatment of giant cell arteritis 2020'), pm('2023 EULAR recommendations for the management of giant cell arteritis and other large vessel vasculitis'), pm('2015 Recommendations for the management of polymyalgia rheumatica: EULAR/ACR collaborative initiative')],
    questions: [
      { stem: 'In suspected giant cell arteritis, glucocorticoids should be started:', options: ['Immediately, before confirmatory tests', 'Only after biopsy result', 'Only if vision is already lost', 'After three months'], correct: 0, explanation: 'Visual loss is often irreversible, so treatment should not be delayed.', difficulty: 'Foundational' },
      { stem: 'Which symptom is highly suggestive of GCA?', options: ['Jaw claudication', 'Bilateral hand tremor', 'Morning hand stiffness in a 30-year-old', 'Lower back pain after lifting'], correct: 0, explanation: 'Jaw claudication reflects ischaemia of masticatory muscles.', difficulty: 'Foundational' },
      { stem: 'Polymyalgia rheumatica typically affects:', options: ['Shoulder and hip girdles in older adults', 'Small hand joints in young adults', 'Single large joint acutely', 'The lumbar spine in young men'], correct: 0, explanation: 'PMR causes bilateral proximal girdle pain and stiffness.', difficulty: 'Foundational' },
      { stem: 'A patient with presumed PMR does not improve on low-dose steroids. This should prompt:', options: ['Reconsideration of the diagnosis', 'Doubling the dose indefinitely', 'Stopping all follow-up', 'Reassurance only'], correct: 0, explanation: 'PMR usually responds rapidly; poor response suggests an alternative diagnosis.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'rheum-anca-1', system: S,
    title: 'ANCA-Associated Vasculitis',
    objectives: [
      'Describe the main forms of ANCA-associated vasculitis',
      'Recognise pulmonary–renal syndrome',
      'Explain why urgent diagnosis matters',
    ],
    coreContent: `ANCA-associated vasculitis (AAV) is inflammation of small blood vessels linked to anti-neutrophil cytoplasmic antibodies. Main forms:
- Granulomatosis with polyangiitis (GPA): upper airway (sinusitis, nasal crusting, epistaxis, saddle-nose), lungs (nodules, cavities) and kidneys; usually PR3-ANCA.
- Microscopic polyangiitis (MPA): kidneys and lungs without granulomas; usually MPO-ANCA.
- Eosinophilic granulomatosis with polyangiitis (EGPA): asthma, eosinophilia, neuropathy and other organ involvement.

Common features include constitutional symptoms, rash (palpable purpura), mononeuritis multiplex, and rapidly progressive glomerulonephritis with haematuria and proteinuria.

Pulmonary–renal syndrome (alveolar haemorrhage with glomerulonephritis) is an emergency: haemoptysis, falling haemoglobin, infiltrates on imaging and AKI. Other causes include anti-GBM disease and SLE.

Diagnosis rests on clinical features, ANCA serology and tissue biopsy (often kidney). Early immunosuppressive treatment protects organ function. Infection must be considered because it mimics vasculitis and complicates treatment.`,
    keyConcepts: [
      'ANCA testing supports but does not replace clinical assessment',
      'Haematuria with AKI in a systemically unwell patient needs urgent ANCA and anti-GBM testing',
      'Mononeuritis multiplex suggests vasculitic neuropathy',
    ],
    clinicalPearls: [
      'Persistent "sinusitis" with haematuria should prompt consideration of GPA',
      'Endocarditis can cause positive ANCA and mimic vasculitis',
    ],
    sources: [pm('EULAR recommendations for the management of ANCA-associated vasculitis: 2022 update'), pm('2022 American College of Rheumatology/EULAR classification criteria for granulomatosis with polyangiitis')],
    questions: [
      { stem: 'Sinus disease, lung nodules and glomerulonephritis suggest:', options: ['Granulomatosis with polyangiitis', 'Gout', 'Polymyalgia rheumatica', 'Osteoarthritis'], correct: 0, explanation: 'GPA classically involves the upper airway, lungs and kidneys.', difficulty: 'Foundational' },
      { stem: 'Haemoptysis with AKI and haematuria should raise concern for:', options: ['Pulmonary–renal syndrome', 'Simple bronchitis', 'Renal colic', 'Asthma'], correct: 0, explanation: 'Alveolar haemorrhage with glomerulonephritis is an emergency needing urgent serology.', difficulty: 'Intermediate' },
      { stem: 'Asthma, eosinophilia and neuropathy suggest:', options: ['EGPA', 'MPA', 'GPA', 'Behçet disease'], correct: 0, explanation: 'EGPA combines asthma, eosinophilia and vasculitis.', difficulty: 'Intermediate' },
      { stem: 'Which condition can mimic ANCA vasculitis, including positive ANCA?', options: ['Infective endocarditis', 'Hypothyroidism', 'Iron deficiency', 'Migraine'], correct: 0, explanation: 'Endocarditis can cause ANCA positivity, glomerulonephritis and embolic lesions.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'rheum-hotjoint-1', system: S,
    title: 'The Acute Hot Swollen Joint',
    objectives: [
      'Treat the acute hot joint as septic arthritis until proven otherwise',
      'Describe the role of joint aspiration',
      'List the differential diagnosis',
    ],
    coreContent: `An acutely hot, swollen, painful joint is septic arthritis until proven otherwise. Septic arthritis can destroy a joint within days and carries significant mortality, especially in older adults and those with prosthetic joints.

Risk factors: age, diabetes, rheumatoid arthritis, prosthetic joint, recent joint surgery or injection, skin infection, immunosuppression and injecting drug use. Staphylococcus aureus is the most common organism; Neisseria gonorrhoeae is important in sexually active young adults.

Key step: aspirate the joint before antibiotics where this can be done without delay, and send fluid for Gram stain, culture, cell count and crystal microscopy. Take blood cultures. A normal temperature or normal inflammatory markers do not exclude infection.

Differential diagnosis:
- crystal arthritis (gout, CPPD)
- reactive arthritis
- haemarthrosis (trauma, anticoagulation, haemophilia)
- inflammatory arthritis presenting in one joint
- cellulitis or bursitis near the joint

Prosthetic joint infection needs orthopaedic involvement; avoid aspirating a prosthetic joint outside the specialist setting where local policy advises.`,
    keyConcepts: [
      'Aspirate before antibiotics when possible',
      'Fever may be absent in septic arthritis',
      'Crystals do not exclude infection',
    ],
    clinicalPearls: [
      'Gonococcal arthritis may present with migratory arthralgia, tenosynovitis and skin pustules',
      'Pain on any passive movement of the joint suggests intra-articular pathology rather than periarticular inflammation',
    ],
    sources: [pm('BSR & BHPR, BOA, RCGP and BSAC guidelines for management of the hot swollen joint in adults. Rheumatology 2006'), pm('Ross JJ. Septic arthritis of native joints. Infect Dis Clin North Am 2017')],
    questions: [
      { stem: 'An acute hot swollen knee should be managed as:', options: ['Septic arthritis until proven otherwise', 'Osteoarthritis flare', 'Muscle strain', 'Gout without testing'], correct: 0, explanation: 'Delay in treating septic arthritis causes joint destruction and mortality.', difficulty: 'Foundational' },
      { stem: 'The most common cause of septic arthritis in adults is:', options: ['Staphylococcus aureus', 'Escherichia coli', 'Candida', 'Mycobacterium leprae'], correct: 0, explanation: 'S. aureus is the commonest organism.', difficulty: 'Foundational' },
      { stem: 'Before antibiotics, the most important step in suspected septic arthritis is:', options: ['Joint aspiration for Gram stain, culture and microscopy', 'MRI of the joint', 'Uric acid level', 'Physiotherapy'], correct: 0, explanation: 'Synovial fluid analysis identifies infection and crystals.', difficulty: 'Intermediate' },
      { stem: 'A young sexually active adult with migratory joint pain, tenosynovitis and pustules suggests:', options: ['Disseminated gonococcal infection', 'Rheumatoid arthritis', 'Gout', 'Osteoarthritis'], correct: 0, explanation: 'Disseminated gonococcal infection has this characteristic triad.', difficulty: 'Advanced' },
    ],
  },
];
