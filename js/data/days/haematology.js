import { nice, pm, web } from './_src.js';
const S = 'Hematology/Oncology';

export default [
  {
    topicId: 'heme-vte-1', system: S,
    title: 'Venous Thromboembolism and Anticoagulation Principles',
    objectives: [
      'Recognise deep vein thrombosis and its risk factors',
      'Distinguish provoked from unprovoked VTE',
      'Describe the main bleeding risks of anticoagulation',
    ],
    coreContent: `Venous thromboembolism (VTE) includes deep vein thrombosis (DVT) and pulmonary embolism. Virchow's triad explains the risk: stasis, endothelial injury and hypercoagulability.

DVT presents with unilateral leg swelling, pain, warmth and tenderness, but signs are unreliable. Probability scoring (for example two-level Wells), D-dimer in lower-probability patients and compression ultrasound make the diagnosis.

Risk factors:
- Transient (provoking): major surgery, hospital admission with immobility, trauma, plaster cast, pregnancy and postpartum, oestrogen therapy, long-haul travel.
- Persistent: active cancer, antiphospholipid syndrome, inherited thrombophilia, inflammatory disease.

Provoked VTE with a resolved trigger usually needs a limited course of anticoagulation. Unprovoked VTE or a persistent risk factor raises the question of longer-term treatment, weighed against bleeding risk.

Anticoagulant classes include direct oral anticoagulants, vitamin K antagonists (warfarin) and heparins. Each has specific interactions, kidney considerations and reversal strategies. Prevention of hospital-acquired VTE through risk assessment and prophylaxis is a major patient-safety measure.`,
    keyConcepts: [
      'Clinical signs alone cannot confirm or exclude DVT',
      'Unprovoked VTE should prompt a clinical assessment for cancer, guided by history and examination',
      'Anticoagulation decisions balance recurrence against bleeding risk',
    ],
    clinicalPearls: [
      'Antiphospholipid syndrome is an important reason to avoid DOACs in some patients',
      'A swollen whole leg with groin pain may indicate iliofemoral DVT',
    ],
    sources: [nice('ng158', 'Venous thromboembolic diseases: diagnosis, management and thrombophilia testing'), nice('ng89', 'Venous thromboembolism in over 16s: reducing the risk of hospital-acquired DVT or PE'), pm('Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline 2021')],
    questions: [
      { stem: 'Virchow’s triad consists of:', options: ['Stasis, endothelial injury and hypercoagulability', 'Fever, rash and arthralgia', 'Pain, pallor and pulselessness', 'Hypoxia, hypotension and tachycardia'], correct: 0, explanation: 'These three factors underlie thrombus formation.', difficulty: 'Foundational' },
      { stem: 'Which test confirms DVT in most patients?', options: ['Compression ultrasound', 'D-dimer alone', 'Chest radiograph', 'Ankle–brachial index'], correct: 0, explanation: 'Ultrasound visualises non-compressible veins; D-dimer is a rule-out test.', difficulty: 'Foundational' },
      { stem: 'A DVT after major surgery that has fully recovered is classified as:', options: ['Provoked by a transient risk factor', 'Unprovoked', 'Cancer-associated', 'Inherited'], correct: 0, explanation: 'Surgery is a transient provoking factor, often justifying a limited course.', difficulty: 'Intermediate' },
      { stem: 'In which condition may DOACs be inappropriate?', options: ['Antiphospholipid syndrome (high-risk)', 'Provoked DVT after surgery', 'Atrial fibrillation without valve disease', 'Unprovoked distal DVT'], correct: 0, explanation: 'In high-risk APS, warfarin is generally preferred because DOACs performed worse in trials.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'heme-plt-1', system: S,
    title: 'Thrombocytopenia — ITP, TTP and HIT',
    objectives: [
      'Approach a low platelet count systematically',
      'Recognise TTP as a medical emergency',
      'Identify heparin-induced thrombocytopenia',
    ],
    coreContent: `Thrombocytopenia is a platelet count below the normal range. First exclude pseudothrombocytopenia (clumping in EDTA tubes) by looking at the film.

Mechanisms: reduced production (marrow disease, B12/folate deficiency, alcohol, drugs), increased destruction or consumption, and sequestration (hypersplenism).

Three diagnoses not to miss:
- Immune thrombocytopenia (ITP): isolated thrombocytopenia from autoimmune destruction, often with mucocutaneous bleeding; a diagnosis of exclusion.
- Thrombotic thrombocytopenic purpura (TTP): severe ADAMTS13 deficiency causing microvascular thrombosis. Features: thrombocytopenia with microangiopathic haemolytic anaemia (schistocytes, raised LDH), often with neurological symptoms, fever or kidney involvement. It is an emergency treated with plasma exchange; platelet transfusion is generally avoided unless life-threatening bleeding.
- Heparin-induced thrombocytopenia (HIT): antibodies against heparin–PF4 complexes, typically 5–10 days after heparin exposure, with a fall in platelets of more than 50% and paradoxical thrombosis. Stop all heparin and use a non-heparin anticoagulant. The 4Ts score estimates probability.

Other causes include sepsis and DIC, pregnancy-related causes (HELLP), drugs, and liver disease.`,
    keyConcepts: [
      'Thrombocytopenia plus schistocytes plus haemolysis: think TTP',
      'HIT causes thrombosis, not usually bleeding',
      'Always review the blood film',
    ],
    clinicalPearls: [
      'Stop heparin flushes too when HIT is suspected',
      'Isolated low platelets in an otherwise well patient on a new drug: review the drug chart',
    ],
    sources: [pm('ISTH guideline for the diagnosis of thrombotic thrombocytopenic purpura 2020'), pm('American Society of Hematology 2018 guidelines for management of venous thromboembolism: heparin-induced thrombocytopenia'), pm('American Society of Hematology 2019 guidelines for immune thrombocytopenia')],
    questions: [
      { stem: 'Thrombocytopenia with schistocytes, raised LDH and confusion suggests:', options: ['Thrombotic thrombocytopenic purpura', 'Immune thrombocytopenia', 'Iron deficiency', 'Pseudothrombocytopenia'], correct: 0, explanation: 'TTP produces microangiopathic haemolysis, thrombocytopenia and organ ischaemia.', difficulty: 'Intermediate' },
      { stem: 'Heparin-induced thrombocytopenia typically occurs:', options: ['5–10 days after starting heparin', 'Within one hour of the first dose', 'Only after one year', 'Only with warfarin'], correct: 0, explanation: 'Antibody formation takes several days; earlier onset can occur with recent prior exposure.', difficulty: 'Foundational' },
      { stem: 'The major clinical danger of HIT is:', options: ['Thrombosis', 'Isolated nosebleeds only', 'Hyperkalaemia', 'Hypoglycaemia'], correct: 0, explanation: 'HIT is prothrombotic despite low platelets.', difficulty: 'Intermediate' },
      { stem: 'Before investigating a low platelet count further, which simple check is important?', options: ['Blood film to exclude platelet clumping', 'Bone marrow biopsy', 'CT abdomen', 'Genetic testing'], correct: 0, explanation: 'EDTA-induced clumping causes falsely low counts.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'heme-haemolysis-1', system: S,
    title: 'Haemolytic Anaemia',
    objectives: [
      'Recognise the laboratory signature of haemolysis',
      'Use the direct antiglobulin test to separate immune from non-immune causes',
      'List inherited and acquired causes',
    ],
    coreContent: `Haemolysis is premature destruction of red cells. The laboratory signature:
- anaemia with raised reticulocytes
- raised unconjugated bilirubin and LDH
- low haptoglobin
- blood film changes (spherocytes, schistocytes, bite cells, sickle cells)

The direct antiglobulin test (DAT, Coombs test) detects antibody or complement on red cells:
- DAT positive: autoimmune haemolytic anaemia (warm, often idiopathic or associated with lymphoproliferative disease or SLE; cold agglutinin disease), drug-induced, alloimmune (transfusion reaction, haemolytic disease of the newborn).
- DAT negative: hereditary causes (spherocytosis, G6PD deficiency, sickle cell disease, thalassaemia), microangiopathic haemolysis (TTP, haemolytic uraemic syndrome, DIC, mechanical valves), infections (malaria), and paroxysmal nocturnal haemoglobinuria.

G6PD deficiency causes episodic haemolysis triggered by oxidant stress: certain drugs (for example primaquine, dapsone), fava beans and infection. It is common in people from Africa, the Middle East, the Mediterranean and Asia.

Intravascular haemolysis can cause haemoglobinuria (dark urine) and AKI.`,
    keyConcepts: [
      'Raised reticulocytes show the marrow is responding',
      'DAT is the pivotal first test',
      'Schistocytes indicate microangiopathic haemolysis',
    ],
    clinicalPearls: [
      'Check G6PD status before prescribing primaquine or dapsone in at-risk populations',
      'Folate requirements rise in chronic haemolysis',
    ],
    sources: [pm('The diagnosis and management of primary autoimmune haemolytic anaemia. Br J Haematol 2017'), pm('Luzzatto L, Ally M, Notaro R. Glucose-6-phosphate dehydrogenase deficiency. Blood 2020')],
    questions: [
      { stem: 'Which pattern suggests haemolysis?', options: ['Raised reticulocytes, LDH and unconjugated bilirubin with low haptoglobin', 'Low reticulocytes with high ferritin', 'Raised conjugated bilirubin with normal LDH', 'High haptoglobin with low LDH'], correct: 0, explanation: 'Red-cell destruction releases LDH and haemoglobin, which binds haptoglobin.', difficulty: 'Foundational' },
      { stem: 'A positive direct antiglobulin test indicates:', options: ['Immune-mediated haemolysis', 'Iron deficiency', 'Hereditary spherocytosis in every case', 'G6PD deficiency'], correct: 0, explanation: 'DAT detects antibodies or complement on red cells.', difficulty: 'Foundational' },
      { stem: 'Haemolysis after eating fava beans suggests:', options: ['G6PD deficiency', 'Sickle cell disease', 'Warm autoimmune haemolysis', 'Iron deficiency'], correct: 0, explanation: 'Fava beans cause oxidant stress, triggering haemolysis in G6PD deficiency.', difficulty: 'Intermediate' },
      { stem: 'Schistocytes on a blood film suggest:', options: ['Microangiopathic haemolytic anaemia', 'Iron deficiency', 'Vitamin B12 deficiency', 'Hereditary spherocytosis'], correct: 0, explanation: 'Red cells fragmented in damaged microvessels appear as schistocytes.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'heme-leuk-1', system: S,
    title: 'Leukaemias — Acute and Chronic',
    objectives: [
      'Distinguish acute from chronic leukaemia',
      'Recognise the presentation of acute leukaemia as an emergency',
      'Describe the typical features of CLL and CML',
    ],
    coreContent: `Leukaemias are malignancies of blood-forming cells.

Acute leukaemias (AML, ALL): rapid accumulation of immature blasts crowds out normal haematopoiesis. Presentation reflects marrow failure:
- anaemia: fatigue, breathlessness
- neutropenia: infections
- thrombocytopenia: bruising, bleeding
Other features: bone pain, hepatosplenomegaly, gum infiltration (some AML subtypes), and DIC (classically acute promyelocytic leukaemia, a haematological emergency). A blood film showing blasts needs same-day haematology referral. ALL is the commonest childhood cancer.

Chronic leukaemias:
- Chronic lymphocytic leukaemia (CLL): older adults, often found incidentally with lymphocytosis; may cause lymphadenopathy, infections and autoimmune cytopenias. Many patients are monitored without treatment for years.
- Chronic myeloid leukaemia (CML): driven by the BCR::ABL1 fusion (Philadelphia chromosome). High white count with a spectrum of myeloid cells, and splenomegaly. Targeted tyrosine kinase inhibitors transformed the prognosis.

Tumour lysis syndrome can occur at presentation or with treatment, especially with high white counts.`,
    keyConcepts: [
      'Pancytopenia with blasts is acute leukaemia until proven otherwise',
      'Suspected acute promyelocytic leukaemia needs urgent treatment because of bleeding risk',
      'Many patients with early CLL need monitoring rather than treatment',
    ],
    clinicalPearls: [
      'Fever in a patient with leukaemia on chemotherapy: treat as neutropenic sepsis immediately',
      'Very high white counts can cause leukostasis (breathlessness, confusion, visual symptoms)',
    ],
    sources: [nice('ng12', 'Suspected cancer: recognition and referral'), pm('Diagnosis and management of AML in adults: 2022 recommendations from an international expert panel on behalf of the ELN')],
    questions: [
      { stem: 'Acute leukaemia commonly presents with:', options: ['Features of marrow failure: anaemia, infection, bleeding', 'Isolated hypertension', 'Isolated weight gain', 'Joint hypermobility'], correct: 0, explanation: 'Blasts crowd out normal haematopoiesis.', difficulty: 'Foundational' },
      { stem: 'The Philadelphia chromosome (BCR::ABL1) is characteristic of:', options: ['Chronic myeloid leukaemia', 'Chronic lymphocytic leukaemia', 'Hodgkin lymphoma', 'Multiple myeloma'], correct: 0, explanation: 'BCR::ABL1 defines CML and is targeted by tyrosine kinase inhibitors.', difficulty: 'Intermediate' },
      { stem: 'Which leukaemia is classically associated with DIC at presentation?', options: ['Acute promyelocytic leukaemia', 'CLL', 'CML in chronic phase', 'Hairy cell leukaemia'], correct: 0, explanation: 'APL releases procoagulant material causing DIC and haemorrhage.', difficulty: 'Advanced' },
      { stem: 'An older patient with incidental lymphocytosis and no symptoms most likely has:', options: ['Chronic lymphocytic leukaemia', 'Acute myeloid leukaemia', 'Aplastic anaemia', 'Sickle cell disease'], correct: 0, explanation: 'CLL is often found on routine blood counts.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'heme-lymphoma-1', system: S,
    title: 'Lymphoma',
    objectives: [
      'Recognise lymphadenopathy that warrants investigation',
      'Distinguish Hodgkin from non-Hodgkin lymphoma in broad terms',
      'Explain why excision biopsy is preferred for diagnosis',
    ],
    coreContent: `Lymphomas are malignancies of lymphocytes, presenting mostly with lymphadenopathy, and sometimes with extranodal disease.

Lymphadenopathy needing investigation: nodes that are persistent (more than a few weeks), enlarging, hard, matted, supraclavicular, or associated with systemic symptoms. Systemic "B symptoms" are fever, drenching night sweats and weight loss of more than 10% over six months.

Hodgkin lymphoma: bimodal age distribution, often cervical or mediastinal nodes, Reed–Sternberg cells on pathology. It is highly curable.

Non-Hodgkin lymphoma: a large heterogeneous group.
- Aggressive types (for example diffuse large B-cell lymphoma) grow quickly but are often curable.
- Indolent types (for example follicular lymphoma) grow slowly and may not need immediate treatment.

Diagnosis requires tissue: excision or core biopsy, because fine-needle aspiration often cannot show node architecture. Staging uses PET-CT.

Emergencies include superior vena cava obstruction, spinal cord compression, tumour lysis syndrome and hypercalcaemia.`,
    keyConcepts: [
      'B symptoms carry prognostic significance',
      'Fine-needle aspiration is usually not enough to diagnose lymphoma',
      'Supraclavicular nodes are more often malignant',
    ],
    clinicalPearls: [
      'Pain in lymph nodes after alcohol is a rare but classic Hodgkin feature',
      'Consider HIV testing in patients with lymphoma',
    ],
    sources: [nice('ng52', 'Non-Hodgkin\'s lymphoma: diagnosis and management'), nice('ng12', 'Suspected cancer: recognition and referral'), pm('The 5th edition of the World Health Organization Classification of Haematolymphoid Tumours: Lymphoid Neoplasms 2022')],
    questions: [
      { stem: 'Which are B symptoms in lymphoma?', options: ['Fever, drenching night sweats and significant weight loss', 'Bruising, bleeding and anaemia', 'Itching, rash and diarrhoea', 'Cough, wheeze and sputum'], correct: 0, explanation: 'B symptoms reflect systemic disease and affect prognosis.', difficulty: 'Foundational' },
      { stem: 'Why is excision or core biopsy preferred over FNA in suspected lymphoma?', options: ['Node architecture is needed for classification', 'FNA is more painful', 'FNA is always positive', 'Excision avoids staging'], correct: 0, explanation: 'Pathological subtype depends on architecture and immunohistochemistry.', difficulty: 'Intermediate' },
      { stem: 'Reed–Sternberg cells are characteristic of:', options: ['Hodgkin lymphoma', 'Follicular lymphoma', 'CLL', 'Myeloma'], correct: 0, explanation: 'Reed–Sternberg cells are the hallmark of classical Hodgkin lymphoma.', difficulty: 'Foundational' },
      { stem: 'Which imaging is standard for staging most lymphomas?', options: ['PET-CT', 'Plain radiograph only', 'Ultrasound only', 'Bone scan'], correct: 0, explanation: 'PET-CT stages disease and assesses response in FDG-avid lymphomas.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'heme-oncem-1', system: S,
    title: 'Oncological Emergencies',
    objectives: [
      'Recognise neutropenic sepsis and its urgency',
      'Identify tumour lysis syndrome and superior vena cava obstruction',
      'Link cancer to hypercalcaemia and cord compression',
    ],
    coreContent: `Oncological emergencies can occur at presentation or during treatment. Several are covered elsewhere (metastatic cord compression, hypercalcaemia); the others to know:

Neutropenic sepsis: fever or signs of sepsis in a patient with a low neutrophil count, most often after chemotherapy. It can deteriorate within hours, and signs of infection may be muted. Treat immediately with empirical broad-spectrum antibiotics per local policy, within an hour of arrival, without waiting for the neutrophil count.

Tumour lysis syndrome (TLS): rapid tumour cell breakdown releases potassium, phosphate and uric acid, with secondary hypocalcaemia. Consequences: AKI, arrhythmia, seizures. High-risk tumours: high-grade lymphomas, acute leukaemias with high white count. Prevention (hydration and urate-lowering drugs) is key.

Superior vena cava obstruction: facial and arm swelling, distended neck and chest veins, breathlessness, worse on lying flat. Causes include lung cancer, lymphoma and thrombosis around catheters. A tissue diagnosis guides treatment where possible.

Other emergencies: raised intracranial pressure from brain metastases, hyperviscosity, cardiac tamponade from malignant effusion, and immunotherapy-related toxicities.`,
    keyConcepts: [
      'Neutropenic sepsis: antibiotics first, count later',
      'TLS is best prevented, not treated',
      'Immunotherapy side effects can affect any organ',
    ],
    clinicalPearls: [
      'Ask every unwell patient about recent chemotherapy or immunotherapy',
      'Immune checkpoint inhibitors can cause colitis, hepatitis, pneumonitis, endocrinopathies and myocarditis',
    ],
    sources: [nice('cg151', 'Neutropenic sepsis: prevention and management in people with cancer'), pm('Cairo MS, Bishop M. Tumour lysis syndrome: new therapeutic strategies and classification. Br J Haematol 2004'), pm('Management of toxicities from immunotherapy: ESMO Clinical Practice Guideline 2022')],
    questions: [
      { stem: 'A febrile patient 10 days after chemotherapy should receive:', options: ['Immediate empirical antibiotics without waiting for the blood count', 'Antibiotics only if neutropenia is confirmed', 'Paracetamol and discharge', 'Observation for 24 hours'], correct: 0, explanation: 'Neutropenic sepsis is time-critical.', difficulty: 'Foundational' },
      { stem: 'Tumour lysis syndrome causes:', options: ['Hyperkalaemia, hyperphosphataemia, hyperuricaemia and hypocalcaemia', 'Hypokalaemia and hypophosphataemia', 'Hypercalcaemia only', 'Hypernatraemia only'], correct: 0, explanation: 'Released intracellular contents cause these electrolyte disturbances.', difficulty: 'Intermediate' },
      { stem: 'Facial swelling and distended neck veins in a smoker suggest:', options: ['Superior vena cava obstruction', 'Allergic reaction only', 'Heart failure only', 'Thyroid cyst'], correct: 0, explanation: 'Lung cancer is a leading cause of SVC obstruction.', difficulty: 'Foundational' },
      { stem: 'Diarrhoea in a patient on an immune checkpoint inhibitor should raise concern for:', options: ['Immune-related colitis', 'Normal side effect requiring no assessment', 'Coeliac disease only', 'Lactose intolerance only'], correct: 0, explanation: 'Immune-related colitis can be severe and needs prompt assessment.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'heme-scd-1', system: S,
    title: 'Sickle Cell Disease',
    objectives: [
      'Explain the pathophysiology of sickling',
      'Recognise acute complications, especially acute chest syndrome',
      'Describe the principles of acute painful crisis management',
    ],
    coreContent: `Sickle cell disease (SCD) is an inherited haemoglobin disorder (HbSS and related genotypes). Deoxygenated HbS polymerises, deforming red cells, causing haemolysis and vaso-occlusion. It is common in people of African, Middle Eastern (including the Arabian Peninsula), Indian and Mediterranean ancestry.

Acute complications:
- Acute painful crisis: the commonest reason for admission. Prompt, adequate analgesia (assessment within 30 minutes of arrival in many guidelines) is a standard of care.
- Acute chest syndrome: new infiltrate on chest imaging with fever, chest pain or respiratory symptoms. It is a leading cause of death; watch for it in every admitted patient.
- Stroke, especially in children.
- Splenic sequestration (children) and aplastic crisis (parvovirus B19).
- Infection: functional asplenia increases the risk from encapsulated organisms.
- Priapism.

Chronic complications include kidney disease, pulmonary hypertension, avascular necrosis, retinopathy and leg ulcers.

Hydroxycarbamide reduces crises in many patients. Transfusion is used for specific indications under specialist guidance.`,
    keyConcepts: [
      'Pain in sickle cell disease is real and needs prompt treatment',
      'Acute chest syndrome can develop during an admission for pain',
      'Functional asplenia requires vaccination and infection awareness',
    ],
    clinicalPearls: [
      'Incentive spirometry helps prevent acute chest syndrome in admitted patients',
      'A sudden drop in haemoglobin with low reticulocytes suggests aplastic crisis',
    ],
    sources: [nice('cg143', 'Sickle cell disease: managing acute painful episodes in hospital'), pm('Guideline on the management of acute chest syndrome in sickle cell disease. Br J Haematol 2015'), pm('Kato GJ et al. Sickle cell disease. Nat Rev Dis Primers 2018')],
    questions: [
      { stem: 'Acute chest syndrome is defined by:', options: ['New chest radiograph infiltrate with fever or respiratory symptoms', 'Chest pain with normal imaging only', 'Pneumothorax', 'Rib fracture'], correct: 0, explanation: 'ACS combines new infiltrate with clinical respiratory features.', difficulty: 'Intermediate' },
      { stem: 'Patients with sickle cell disease are at increased risk from encapsulated bacteria because of:', options: ['Functional asplenia', 'High platelet count', 'Excess neutrophils', 'Iron deficiency'], correct: 0, explanation: 'Repeated splenic infarction leads to loss of splenic function.', difficulty: 'Foundational' },
      { stem: 'A sudden fall in haemoglobin with very low reticulocytes in SCD suggests:', options: ['Aplastic crisis, often parvovirus B19', 'Splenic sequestration only', 'Iron overload', 'Normal variation'], correct: 0, explanation: 'Parvovirus temporarily halts erythropoiesis.', difficulty: 'Advanced' },
      { stem: 'The standard for analgesia in acute sickle pain is:', options: ['Prompt assessment and adequate analgesia soon after arrival', 'Delay until imaging is complete', 'Paracetamol only regardless of severity', 'No analgesia to avoid dependence'], correct: 0, explanation: 'Guidelines emphasise rapid assessment and effective pain relief.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'heme-transfusion-1', system: S,
    title: 'Blood Transfusion and Transfusion Reactions',
    objectives: [
      'Describe the principles of safe transfusion practice',
      'Recognise acute transfusion reactions',
      'Distinguish TACO from TRALI',
    ],
    coreContent: `Transfusion saves lives but carries risks. Safe practice depends on correct indication, patient identification at every step, and close monitoring during the first minutes.

Restrictive red cell thresholds are appropriate for most stable adults; acute bleeding is managed by clinical response and protocols rather than by a single number.

Acute reactions:
- ABO-incompatible transfusion: usually from identification error. Fever, rigors, hypotension, loin pain, haemoglobinuria, DIC. Stop the transfusion immediately; it is a never event.
- Febrile non-haemolytic reaction: common and usually mild.
- Allergic reactions, from urticaria to anaphylaxis.
- Transfusion-associated circulatory overload (TACO): pulmonary oedema from volume overload, often in older patients and those with heart or kidney disease. Hypertension and raised JVP are typical.
- Transfusion-related acute lung injury (TRALI): non-cardiogenic pulmonary oedema within 6 hours, often with hypotension and fever.
- Bacterial contamination: especially with platelets, causing sepsis.

If a reaction is suspected: stop the transfusion, keep the line open, check the patient and the unit identity, assess ABCDE, and report through the haemovigilance system.`,
    keyConcepts: [
      'Identification errors cause the most dangerous reactions',
      'TACO is linked to volume and rate; TRALI is an inflammatory lung injury',
      'Most reactions occur in the first 15 minutes',
    ],
    clinicalPearls: [
      'Transfuse one unit at a time in stable patients and reassess',
      'Check the bedside identity of every unit, every time',
    ],
    sources: [nice('ng24', 'Blood transfusion'), web('SHOT (Serious Hazards of Transfusion) annual report and definitions', 'https://www.shotuk.org/'), pm('Guideline on the investigation and management of acute transfusion reactions. Br J Haematol 2023')],
    questions: [
      { stem: 'The most common cause of ABO-incompatible transfusion is:', options: ['Patient identification error', 'Faulty blood bags', 'Bacterial contamination', 'Iron overload'], correct: 0, explanation: 'Wrong-patient errors drive ABO incompatibility.', difficulty: 'Foundational' },
      { stem: 'Breathlessness with hypertension and raised JVP during transfusion in an older patient suggests:', options: ['TACO', 'TRALI', 'Febrile non-haemolytic reaction', 'Urticaria'], correct: 0, explanation: 'TACO is volume overload, often with hypertension and signs of congestion.', difficulty: 'Intermediate' },
      { stem: 'The first action when a severe transfusion reaction is suspected is:', options: ['Stop the transfusion', 'Speed up the transfusion', 'Give the next unit', 'Wait for the reaction to settle'], correct: 0, explanation: 'Stopping the transfusion limits exposure; then assess and investigate.', difficulty: 'Foundational' },
      { stem: 'Acute non-cardiogenic pulmonary oedema with hypotension within 6 hours of transfusion suggests:', options: ['TRALI', 'TACO', 'Delayed haemolytic reaction', 'Iron overload'], correct: 0, explanation: 'TRALI is an inflammatory lung injury, often with hypotension.', difficulty: 'Advanced' },
    ],
  },
];
