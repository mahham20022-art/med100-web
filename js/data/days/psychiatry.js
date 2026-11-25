import { nice, pm, web } from './_src.js';
const S = 'Psychiatry';

export default [
  {
    topicId: 'psych-anxiety-1', system: S,
    title: 'Anxiety Disorders',
    objectives: [
      'Distinguish generalised anxiety disorder, panic disorder and phobias',
      'Exclude medical and substance causes of anxiety',
      'Describe the stepped-care approach to treatment',
    ],
    coreContent: `Anxiety disorders are common and often coexist with depression.

- Generalised anxiety disorder (GAD): excessive, difficult-to-control worry about many things on most days for at least six months, with restlessness, fatigue, poor concentration, irritability, muscle tension and sleep disturbance.
- Panic disorder: recurrent unexpected panic attacks (sudden surges of fear with palpitations, breathlessness, chest pain, dizziness, fear of dying) followed by persistent worry about further attacks or avoidance.
- Phobias: marked fear of specific objects or situations; social anxiety disorder centres on fear of scrutiny.
- Post-traumatic stress disorder and obsessive–compulsive disorder are classified separately but share features.

Before diagnosing an anxiety disorder, consider medical causes and mimics: thyrotoxicosis, arrhythmia, hypoglycaemia, phaeochromocytoma, asthma or COPD, caffeine, stimulants, alcohol or benzodiazepine withdrawal, and medications.

Treatment follows stepped care: education and self-help, then psychological therapies such as cognitive behavioural therapy, and medication where appropriate. Benzodiazepines are generally not recommended for long-term use because of dependence.`,
    keyConcepts: [
      'Panic attacks can mimic cardiac and respiratory emergencies; assess appropriately before reassuring',
      'CBT has strong evidence across anxiety disorders',
      'Avoidance maintains anxiety',
    ],
    clinicalPearls: [
      'Ask about alcohol: it is often used to self-treat anxiety and worsens it',
      'First panic attack in an older adult should prompt a careful medical assessment',
    ],
    sources: [nice('cg113', 'Generalised anxiety disorder and panic disorder in adults: management'), web('WHO ICD-11: Anxiety or fear-related disorders', 'https://icd.who.int/browse/2024-01/mms/en')],
    questions: [
      { stem: 'Excessive, uncontrollable worry about many topics for at least six months suggests:', options: ['Generalised anxiety disorder', 'Panic disorder', 'Specific phobia', 'Schizophrenia'], correct: 0, explanation: 'GAD involves persistent widespread worry with somatic symptoms.', difficulty: 'Foundational' },
      { stem: 'Which medical condition can mimic an anxiety disorder?', options: ['Thyrotoxicosis', 'Hypothyroidism only', 'Osteoarthritis', 'Iron overload'], correct: 0, explanation: 'Thyroid hormone excess causes palpitations, tremor, sweating and anxiety.', difficulty: 'Foundational' },
      { stem: 'Why are benzodiazepines generally avoided for long-term anxiety treatment?', options: ['Risk of dependence and tolerance', 'They are ineffective in all cases', 'They cause hyperthyroidism', 'They are banned worldwide'], correct: 0, explanation: 'Long-term use carries dependence, cognitive effects and withdrawal risks.', difficulty: 'Intermediate' },
      { stem: 'Recurrent unexpected surges of intense fear with palpitations and fear of dying suggest:', options: ['Panic disorder', 'GAD only', 'OCD', 'Bipolar disorder'], correct: 0, explanation: 'Unexpected panic attacks plus worry about further attacks define panic disorder.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'psych-scz-1', system: S,
    title: 'Schizophrenia and Psychosis',
    objectives: [
      'Describe positive, negative and cognitive symptoms',
      'Exclude organic causes of a first psychotic episode',
      'Explain the importance of early intervention and physical health monitoring',
    ],
    coreContent: `Psychosis is a loss of contact with reality: hallucinations, delusions and disorganised thinking. Schizophrenia is a chronic psychotic disorder, usually starting in late adolescence or early adulthood.

Symptom domains:
- Positive: hallucinations (often auditory), delusions, thought disorder.
- Negative: reduced motivation, emotional expression, speech and social engagement.
- Cognitive: problems with attention, memory and executive function.

A first episode of psychosis needs assessment for secondary causes: substances (cannabis, stimulants, alcohol withdrawal), medications (corticosteroids, dopaminergic drugs), delirium, epilepsy, autoimmune encephalitis (for example anti-NMDA receptor), thyroid disease, HIV and syphilis, and brain lesions. Atypical features such as confusion, seizures, abnormal movements or autonomic instability should prompt urgent neurological evaluation.

Early intervention services improve outcomes. Antipsychotic medication is combined with psychological and social support. Antipsychotics carry metabolic side effects (weight gain, diabetes, dyslipidaemia), so physical health monitoring is part of care; people with severe mental illness die earlier, largely from cardiovascular disease.`,
    keyConcepts: [
      'Visual hallucinations and confusion suggest an organic cause',
      'Cannabis use is associated with psychosis risk',
      'Physical health is a core part of psychiatric care',
    ],
    clinicalPearls: [
      'New psychosis with seizures or dyskinesias in a young woman: consider anti-NMDA receptor encephalitis',
      'Clozapine requires blood monitoring for neutropenia',
    ],
    sources: [nice('cg178', 'Psychosis and schizophrenia in adults: prevention and management'), pm('Dalmau J et al. An update on anti-NMDA receptor encephalitis for neurologists and psychiatrists. Lancet Neurol 2019')],
    questions: [
      { stem: 'Which is a negative symptom of schizophrenia?', options: ['Reduced motivation', 'Auditory hallucinations', 'Persecutory delusions', 'Thought disorder'], correct: 0, explanation: 'Negative symptoms are loss of normal functions.', difficulty: 'Foundational' },
      { stem: 'A first psychotic episode with seizures and abnormal movements should prompt evaluation for:', options: ['Autoimmune encephalitis', 'Primary schizophrenia only', 'Simple anxiety', 'Personality disorder'], correct: 0, explanation: 'Anti-NMDA receptor encephalitis can present with psychosis, seizures and dyskinesias.', difficulty: 'Advanced' },
      { stem: 'Why is metabolic monitoring important in people taking antipsychotics?', options: ['Antipsychotics can cause weight gain, diabetes and dyslipidaemia', 'They always cause hypoglycaemia', 'They cure diabetes', 'It is not important'], correct: 0, explanation: 'Metabolic side effects contribute to excess cardiovascular mortality.', difficulty: 'Intermediate' },
      { stem: 'Prominent visual hallucinations with fluctuating confusion suggest:', options: ['Delirium or an organic cause', 'Typical schizophrenia', 'GAD', 'Social anxiety'], correct: 0, explanation: 'Visual hallucinations and fluctuating attention point to organic causes.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'psych-delirium-1', system: S,
    title: 'Delirium',
    objectives: [
      'Define delirium and recognise hypoactive presentations',
      'Use a structured screening tool',
      'Search systematically for precipitating causes',
    ],
    coreContent: `Delirium is an acute, fluctuating disturbance of attention and awareness, with other cognitive changes, caused by a medical condition, substance or medication. It is common in older inpatients, after surgery and in intensive care, and is associated with longer stays, institutionalisation, dementia and death.

Types:
- Hyperactive: agitation, restlessness, hallucinations.
- Hypoactive: withdrawn, drowsy, quiet. Often missed and associated with worse outcomes.
- Mixed.

Screening tools such as the 4AT (alertness, AMT4, attention, acute change) are quick and validated.

Predisposing factors: older age, dementia, frailty, sensory impairment, severe illness. Precipitants are often multiple:
- infection, hypoxia, dehydration, electrolyte disturbance, hypoglycaemia
- drugs: opioids, benzodiazepines, anticholinergics, sedatives; alcohol or drug withdrawal
- urinary retention, constipation, pain, sleep deprivation
- stroke, seizures, head injury

Management treats the causes and uses non-drug measures: orientation, glasses and hearing aids, mobilisation, sleep, hydration, family involvement. Antipsychotics are reserved for severe distress or risk, at the lowest dose and shortest duration; avoid them in Parkinson disease and Lewy body dementia.`,
    keyConcepts: [
      'Inattention is the core feature',
      'Hypoactive delirium is easy to miss',
      'Delirium is a medical emergency that signals underlying illness',
    ],
    clinicalPearls: [
      'Check for urinary retention and constipation in every delirious older patient',
      'Review the drug chart for anticholinergic burden',
    ],
    sources: [nice('cg103', 'Delirium: prevention, diagnosis and management in hospital and long-term care'), web('The 4AT — rapid clinical test for delirium', 'https://www.the4at.com/'), pm('Wilson JE et al. Delirium. Nat Rev Dis Primers 2020')],
    questions: [
      { stem: 'The core feature of delirium is:', options: ['Disturbed attention with acute onset and fluctuation', 'Gradual memory loss over years', 'Isolated hallucinations with clear attention', 'Low mood for two weeks'], correct: 0, explanation: 'Inattention, acute onset and fluctuation define delirium.', difficulty: 'Foundational' },
      { stem: 'Which delirium subtype is most often missed?', options: ['Hypoactive', 'Hyperactive', 'Mixed', 'Agitated'], correct: 0, explanation: 'Quiet, drowsy patients may be overlooked.', difficulty: 'Foundational' },
      { stem: 'Which medication class commonly precipitates delirium?', options: ['Anticholinergics', 'Topical emollients', 'Vitamin D', 'Iron supplements'], correct: 0, explanation: 'Anticholinergic drugs impair cognition, especially in older adults.', difficulty: 'Intermediate' },
      { stem: 'Antipsychotics for delirium should be avoided in patients with:', options: ['Lewy body dementia or Parkinson disease', 'Hypertension', 'Asthma', 'Osteoarthritis'], correct: 0, explanation: 'Severe sensitivity reactions and worsening parkinsonism can occur.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'psych-etoh-1', system: S,
    title: 'Alcohol Withdrawal and Wernicke Encephalopathy',
    objectives: [
      'Describe the timeline of alcohol withdrawal',
      'Recognise delirium tremens and withdrawal seizures',
      'Explain why thiamine is given to at-risk patients',
    ],
    coreContent: `Alcohol withdrawal develops when a person with alcohol dependence stops or reduces drinking. Chronic alcohol enhances GABA activity and suppresses glutamate; withdrawal removes this, causing CNS hyperexcitability.

Typical timeline (varies between patients):
- 6–24 hours: tremor, sweating, anxiety, nausea, tachycardia, insomnia.
- 12–48 hours: withdrawal seizures (usually generalised).
- 48–72 hours onwards: delirium tremens: confusion, hallucinations (often visual), agitation, fever and autonomic instability. It has significant mortality without treatment.

Withdrawal is assessed with structured scales (for example CIWA-Ar) and treated with benzodiazepines following local protocols.

Wernicke encephalopathy results from thiamine deficiency: confusion, ophthalmoplegia or nystagmus, and ataxia, although the full triad is often absent. Untreated, it can lead to Korsakoff syndrome (severe amnesia with confabulation). At-risk patients should receive parenteral thiamine, and glucose should not delay thiamine in malnourished patients.

Look for coexisting problems: hypoglycaemia, electrolyte disturbance (low magnesium, phosphate, potassium), head injury, infection and liver disease.`,
    keyConcepts: [
      'Withdrawal seizures and delirium tremens are medical emergencies',
      'Wernicke encephalopathy is a clinical diagnosis; treat on suspicion',
      'Refeeding can precipitate electrolyte shifts in malnourished patients',
    ],
    clinicalPearls: [
      'A first seizure in someone who drinks heavily still needs evaluation for other causes',
      'Low magnesium makes hypokalaemia hard to correct',
    ],
    sources: [nice('cg100', 'Alcohol-use disorders: diagnosis and management of physical complications'), nice('cg115', 'Alcohol-use disorders: diagnosis, assessment and management of harmful drinking and alcohol dependence'), pm('Sechi G, Serra A. Wernicke\'s encephalopathy: new clinical settings and recent advances. Lancet Neurol 2007')],
    questions: [
      { stem: 'Delirium tremens typically begins:', options: ['About 48–72 hours after the last drink', 'Within the first hour', 'After two weeks', 'Only during intoxication'], correct: 0, explanation: 'DTs usually occur later than tremor and seizures.', difficulty: 'Intermediate' },
      { stem: 'The classic triad of Wernicke encephalopathy is:', options: ['Confusion, ophthalmoplegia/nystagmus and ataxia', 'Fever, rash and neck stiffness', 'Tremor, bradykinesia and rigidity', 'Headache, vomiting and papilloedema'], correct: 0, explanation: 'The triad is often incomplete; treat when suspected.', difficulty: 'Foundational' },
      { stem: 'Wernicke encephalopathy is caused by deficiency of:', options: ['Thiamine (vitamin B1)', 'Vitamin B12', 'Vitamin C', 'Folate'], correct: 0, explanation: 'Thiamine is a cofactor for glucose metabolism in neurons.', difficulty: 'Foundational' },
      { stem: 'First-line treatment of alcohol withdrawal is usually:', options: ['Benzodiazepines guided by a protocol', 'Antipsychotics alone', 'Beta-blockers alone', 'More alcohol'], correct: 0, explanation: 'Benzodiazepines treat withdrawal and reduce seizure and DT risk.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'psych-suicide-1', system: S,
    title: 'Self-Harm and Suicide Risk — Assessment and Safety',
    objectives: [
      'Ask about suicidal thoughts directly and safely',
      'Explain why risk prediction tools should not determine care',
      'Describe the elements of a psychosocial assessment and safety plan',
    ],
    coreContent: `Asking directly about suicidal thoughts does not increase risk and is an essential clinical skill. People who self-harm have a markedly higher risk of later suicide.

Current guidance (for example NICE NG225) advises against using risk scales or tools to predict future suicide or to decide who should or should not receive treatment, because they perform poorly. Instead, carry out a needs-based psychosocial assessment:
- the person's current thoughts, plans, intent and access to means
- what happened, and what led to it
- mental health conditions, substance use, physical health
- social circumstances, relationships, losses, debt, safety, protective factors
- the person's own view of what would help

Medical treatment of any self-harm comes first and should be given with the same respect as any other presentation.

A collaborative safety plan identifies warning signs, coping strategies, people and places that help, professional contacts, and steps to reduce access to means. Follow-up and continuity matter.`,
    keyConcepts: [
      'Asking about suicide is safe and necessary',
      'Risk scales should not decide who gets care',
      'Reducing access to lethal means saves lives',
    ],
    clinicalPearls: [
      'Paracetamol overdose can look well initially: treat by protocol, not by appearance',
      'Treat people who self-harm with compassion; stigma reduces help-seeking',
    ],
    sources: [nice('ng225', 'Self-harm: assessment, management and preventing recurrence'), web('WHO: Suicide fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/suicide')],
    questions: [
      { stem: 'Asking a patient directly whether they are thinking of suicide:', options: ['Does not increase risk and is recommended', 'Plants the idea and increases risk', 'Should be avoided', 'Is only for psychiatrists'], correct: 0, explanation: 'Direct, compassionate enquiry is safe and enables help.', difficulty: 'Foundational' },
      { stem: 'According to current NICE guidance, suicide risk scales should:', options: ['Not be used to predict suicide or to decide treatment', 'Be the main basis for discharge', 'Replace clinical assessment', 'Be used to exclude patients from care'], correct: 0, explanation: 'Risk tools predict poorly; a needs-based psychosocial assessment is advised.', difficulty: 'Intermediate' },
      { stem: 'Which intervention is supported to reduce suicide at a population level?', options: ['Reducing access to lethal means', 'Avoiding discussion of suicide', 'Routine use of risk scores', 'Discharge without follow-up'], correct: 0, explanation: 'Means restriction is one of the best-evidenced suicide prevention strategies.', difficulty: 'Intermediate' },
      { stem: 'A safety plan should include:', options: ['Warning signs, coping strategies, support contacts and means reduction', 'Only a phone number for the emergency department', 'A promise not to self-harm', 'Nothing written down'], correct: 0, explanation: 'Collaborative safety plans contain practical, personalised steps.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'psych-nms-1', system: S,
    title: 'Neuroleptic Malignant Syndrome vs Serotonin Syndrome',
    objectives: [
      'Recognise the features of NMS and serotonin syndrome',
      'Distinguish them by drug history, onset and examination',
      'Describe initial management principles',
    ],
    coreContent: `Both are drug-induced hyperthermic emergencies with altered mental state and autonomic instability. Distinguishing them matters because management differs.

Neuroleptic malignant syndrome (NMS):
- Triggered by dopamine antagonists (antipsychotics, some antiemetics) or abrupt withdrawal of dopaminergic drugs in Parkinson disease.
- Develops over days.
- "Lead-pipe" rigidity, bradykinesia, fever, confusion, autonomic instability.
- Raised creatine kinase, leukocytosis; risk of rhabdomyolysis and AKI.

Serotonin syndrome:
- Triggered by serotonergic drugs, often in combination or after a dose increase (SSRIs, SNRIs, MAOIs, tramadol, linezolid, triptans, MDMA, lithium).
- Develops within hours.
- Neuromuscular hyperactivity: clonus (inducible, spontaneous or ocular), hyperreflexia, tremor, especially in the legs; agitation, diarrhoea, mydriasis, sweating, hyperthermia.
- The Hunter criteria help with diagnosis.

Management of both: stop the causative drug(s), supportive care, cooling, fluids and benzodiazepines for agitation, with specialist advice on specific antidotes. Severe hyperthermia needs critical care.`,
    keyConcepts: [
      'Clonus and hyperreflexia point to serotonin syndrome; rigidity and bradyreflexia point to NMS',
      'Serotonin syndrome is fast; NMS is slower',
      'Stopping levodopa abruptly can cause an NMS-like syndrome',
    ],
    clinicalPearls: [
      'Linezolid and tramadol are easily overlooked serotonergic drugs',
      'Check creatine kinase and kidney function in any hyperthermic rigid patient',
    ],
    sources: [pm('Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med 2005'), pm('Dunkley EJ et al. The Hunter Serotonin Toxicity Criteria. QJM 2003'), pm('Neuroleptic malignant syndrome: a review from a clinically oriented perspective. Curr Neuropharmacol 2015')],
    questions: [
      { stem: 'Inducible clonus and hyperreflexia after starting tramadol in a patient on an SSRI suggest:', options: ['Serotonin syndrome', 'Neuroleptic malignant syndrome', 'Malignant hyperthermia', 'Heat stroke only'], correct: 0, explanation: 'Clonus is the key feature of serotonin toxicity.', difficulty: 'Foundational' },
      { stem: 'Lead-pipe rigidity, fever and raised CK after starting haloperidol suggest:', options: ['Neuroleptic malignant syndrome', 'Serotonin syndrome', 'Anticholinergic toxicity', 'Hypothyroidism'], correct: 0, explanation: 'NMS follows dopamine antagonist exposure with rigidity and hyperthermia.', difficulty: 'Foundational' },
      { stem: 'Which statement about onset is correct?', options: ['Serotonin syndrome usually develops within hours; NMS over days', 'NMS develops within minutes', 'Both always take weeks', 'Serotonin syndrome develops over months'], correct: 0, explanation: 'Time course helps distinguish the two.', difficulty: 'Intermediate' },
      { stem: 'Which antibiotic has serotonergic activity?', options: ['Linezolid', 'Amoxicillin', 'Doxycycline', 'Ceftriaxone'], correct: 0, explanation: 'Linezolid is a weak MAO inhibitor.', difficulty: 'Advanced' },
    ],
  },
];
