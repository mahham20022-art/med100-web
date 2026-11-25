import { nice, pm, web } from './_src.js';
const S = 'Emergency/Critical Care';
const ERC = web('European Resuscitation Council Guidelines 2025', 'https://www.cprguidelines.eu/');

export default [
  {
    topicId: 'em-arrest-1', system: S,
    title: 'Cardiac Arrest and Post-Resuscitation Care',
    objectives: [
      'Describe the chain of survival and high-quality CPR',
      'Distinguish shockable from non-shockable rhythms',
      'Recall the reversible causes (4 Hs and 4 Ts)',
    ],
    coreContent: `Survival from cardiac arrest depends on the chain of survival: early recognition and call for help, early CPR, early defibrillation, and post-resuscitation care.

High-quality CPR means compressions of adequate depth and rate, full recoil, minimal interruptions and avoiding excessive ventilation.

Rhythms:
- Shockable: ventricular fibrillation and pulseless ventricular tachycardia. Defibrillate promptly; each delay reduces survival.
- Non-shockable: asystole and pulseless electrical activity (PEA). Continue CPR and give adrenaline early, while searching for causes.

Reversible causes:
- 4 Hs: Hypoxia, Hypovolaemia, Hypo/hyperkalaemia and metabolic causes, Hypothermia.
- 4 Ts: Thrombosis (coronary or pulmonary), Tension pneumothorax, Tamponade, Toxins.

After return of spontaneous circulation (ROSC): ABCDE reassessment, a 12-lead ECG (urgent coronary angiography if STEMI), controlled oxygen and ventilation avoiding both hypoxia and hyperoxia, blood pressure support, temperature control avoiding fever, glucose control, and a delayed, multimodal approach to neuroprognostication.

Drug doses and timings follow current resuscitation guidelines.`,
    keyConcepts: [
      'Minimise pauses in compressions',
      'Early defibrillation is the most important intervention for VF',
      'Neurological prognosis should not be decided too early after ROSC',
    ],
    clinicalPearls: [
      'Point-of-care ultrasound during pulse checks can help identify tamponade or hypovolaemia, but must not prolong pauses',
      'Do not withhold CPR for fear of rib fractures',
    ],
    sources: [ERC, web('Resuscitation Council UK: 2025 Resuscitation Guidelines', 'https://www.resus.org.uk/library/2025-resuscitation-guidelines'), pm('Nolan JP et al. European Resuscitation Council and European Society of Intensive Care Medicine guidelines 2021: post-resuscitation care')],
    questions: [
      { stem: 'Which rhythms are shockable?', options: ['Ventricular fibrillation and pulseless VT', 'Asystole and PEA', 'Sinus bradycardia', 'Atrial flutter with a pulse'], correct: 0, explanation: 'VF and pulseless VT respond to defibrillation.', difficulty: 'Foundational' },
      { stem: 'Which is one of the "4 Ts" of reversible causes?', options: ['Tension pneumothorax', 'Tachypnoea', 'Tremor', 'Thyroiditis'], correct: 0, explanation: 'The 4 Ts are thrombosis, tension pneumothorax, tamponade and toxins.', difficulty: 'Foundational' },
      { stem: 'After ROSC, which oxygenation strategy is recommended?', options: ['Avoid both hypoxia and hyperoxia', 'Maintain maximum FiO₂ indefinitely', 'Withhold oxygen', 'Target saturations below 85%'], correct: 0, explanation: 'Titrated oxygen avoids secondary injury from both extremes.', difficulty: 'Intermediate' },
      { stem: 'Why should neuroprognostication after cardiac arrest be delayed and multimodal?', options: ['Early single tests can wrongly predict poor outcome', 'Brain function never changes', 'It is not required', 'Families request it'], correct: 0, explanation: 'Sedation and temperature confound early assessment; several modalities improve accuracy.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'em-anaph-1', system: S,
    title: 'Anaphylaxis',
    objectives: [
      'Recognise anaphylaxis by its airway, breathing and circulation features',
      'Explain why intramuscular adrenaline is first-line',
      'Describe observation and follow-up after an episode',
    ],
    coreContent: `Anaphylaxis is a severe, life-threatening systemic hypersensitivity reaction. It is likely when there is a sudden onset of:
- Airway problems: throat or tongue swelling, hoarseness, stridor.
- Breathing problems: wheeze, breathlessness, hypoxia.
- Circulation problems: hypotension, collapse, tachycardia.
Skin or mucosal changes (urticaria, flushing, angioedema) are common but are absent in a minority.

Common triggers: foods, drugs (antibiotics, NSAIDs, neuromuscular blockers), insect stings and latex.

Intramuscular adrenaline into the anterolateral thigh is the first-line treatment and should be given promptly; repeat after about five minutes if there is no improvement. Other measures: call for help, position (lie flat, raise legs; sit up if breathing is difficult; left lateral if pregnant), high-flow oxygen, IV fluids for shock. Antihistamines treat skin symptoms but do not treat airway or circulatory compromise. Refractory anaphylaxis needs critical care input.

After treatment, observe for recurrence (biphasic reactions), measure mast cell tryptase as advised, refer to an allergy service, and provide adrenaline auto-injectors with training where indicated.`,
    keyConcepts: [
      'Do not delay adrenaline for antihistamines or steroids',
      'Absence of rash does not exclude anaphylaxis',
      'Beta-blockers can make anaphylaxis harder to treat',
    ],
    clinicalPearls: [
      'Sudden collapse during an infusion of antibiotics or contrast: think anaphylaxis',
      'Teach patients to use auto-injectors, not just carry them',
    ],
    sources: [web('Resuscitation Council UK: Emergency treatment of anaphylaxis (2021)', 'https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis'), pm('EAACI guidelines: Anaphylaxis (2021 update). Allergy 2022'), web('World Allergy Organization Anaphylaxis Guidance 2020', 'https://www.worldallergy.org/')],
    questions: [
      { stem: 'The first-line treatment for anaphylaxis is:', options: ['Intramuscular adrenaline', 'Oral antihistamine', 'Intravenous hydrocortisone', 'Nebulised saline'], correct: 0, explanation: 'Adrenaline reverses airway oedema, bronchospasm and hypotension.', difficulty: 'Foundational' },
      { stem: 'The preferred site for intramuscular adrenaline is:', options: ['Anterolateral thigh', 'Gluteal muscle', 'Deltoid in all cases', 'Subcutaneous abdomen'], correct: 0, explanation: 'The thigh gives rapid absorption.', difficulty: 'Foundational' },
      { stem: 'Antihistamines in anaphylaxis:', options: ['Treat skin symptoms but not airway or circulatory compromise', 'Replace adrenaline', 'Treat hypotension effectively', 'Should be given before adrenaline'], correct: 0, explanation: 'They are adjuncts only.', difficulty: 'Intermediate' },
      { stem: 'Which medication can make anaphylaxis more resistant to treatment?', options: ['Beta-blockers', 'Paracetamol', 'Vitamin C', 'Proton pump inhibitors'], correct: 0, explanation: 'Beta-blockade blunts adrenaline response.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'em-trauma-1', system: S,
    title: 'Major Trauma — The Primary Survey',
    objectives: [
      'Describe the structured primary survey',
      'Identify immediately life-threatening injuries',
      'Explain damage-control resuscitation principles',
    ],
    coreContent: `Major trauma care follows a structured approach that finds and treats immediate threats to life in order of priority.

Primary survey (variations include <C>ABCDE):
- Catastrophic haemorrhage: direct pressure, tourniquets for limb bleeding.
- Airway with cervical spine protection.
- Breathing: look for tension pneumothorax, open pneumothorax, massive haemothorax and flail chest.
- Circulation: identify sources of bleeding (chest, abdomen, pelvis, long bones, external), large-bore access, blood products.
- Disability: GCS, pupils, glucose.
- Exposure: full examination while preventing hypothermia.

Damage-control resuscitation in haemorrhagic shock:
- Early blood products in balanced ratios via a major haemorrhage protocol.
- Tranexamic acid early (within 3 hours of injury).
- Permissive hypotension in selected patients without head injury until bleeding is controlled.
- Prevent the lethal combination of hypothermia, acidosis and coagulopathy.
- Rapid transfer for definitive haemorrhage control (surgery or interventional radiology).

Imaging (eFAST, whole-body CT when stable enough) supports but does not replace the primary survey.`,
    keyConcepts: [
      'Treat life threats as they are found',
      'Tachycardia may be absent in older or beta-blocked patients',
      'Hypothermia worsens coagulopathy',
    ],
    clinicalPearls: [
      'Bind a suspected pelvic fracture early; do not repeatedly "spring" the pelvis',
      'Anticoagulated patients with head injury need a low threshold for CT',
    ],
    sources: [nice('ng39', 'Major trauma: assessment and initial management'), web('American College of Surgeons: ATLS (Advanced Trauma Life Support)', 'https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/'), pm('CRASH-2 trial collaborators. Effects of tranexamic acid on death in trauma patients with significant haemorrhage. Lancet 2010')],
    questions: [
      { stem: 'In the <C>ABCDE approach, <C> stands for:', options: ['Catastrophic haemorrhage', 'Cervical X-ray', 'Consciousness', 'CT scan'], correct: 0, explanation: 'Control of massive external bleeding comes first.', difficulty: 'Foundational' },
      { stem: 'Tranexamic acid in trauma is most beneficial when given:', options: ['Within 3 hours of injury', 'After 24 hours', 'Only after surgery', 'Only in head injury'], correct: 0, explanation: 'CRASH-2 showed benefit when given early; late administration may harm.', difficulty: 'Intermediate' },
      { stem: 'The "lethal triad" in trauma includes:', options: ['Hypothermia, acidosis and coagulopathy', 'Hypertension, bradycardia and hypoxia', 'Fever, rash and arthralgia', 'Hyperglycaemia, hyponatraemia, hypokalaemia'], correct: 0, explanation: 'Each worsens the others and increases mortality.', difficulty: 'Foundational' },
      { stem: 'Why may an older trauma patient have significant bleeding without tachycardia?', options: ['Beta-blockers or reduced physiological reserve', 'Older people do not bleed', 'Tachycardia always occurs', 'Hypothermia speeds the heart'], correct: 0, explanation: 'Medications and ageing blunt compensatory responses.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'em-ards-1', system: S,
    title: 'Acute Respiratory Failure and ARDS',
    objectives: [
      'Distinguish type 1 and type 2 respiratory failure',
      'Define ARDS',
      'Describe lung-protective ventilation principles',
    ],
    coreContent: `Respiratory failure is failure of gas exchange:
- Type 1 (hypoxaemic): low PaO₂ with normal or low PaCO₂. Causes include pneumonia, pulmonary oedema, PE and ARDS.
- Type 2 (hypercapnic): raised PaCO₂ from inadequate ventilation. Causes include COPD, neuromuscular weakness, chest wall disease, obesity hypoventilation and sedative drugs.

Acute respiratory distress syndrome (ARDS) is acute, diffuse inflammatory lung injury with increased permeability. Berlin definition: onset within one week of a known insult, bilateral opacities not fully explained by effusions, collapse or nodules, respiratory failure not fully explained by heart failure or fluid overload, and impaired oxygenation (PaO₂/FiO₂ ratio) on PEEP. A 2023 global definition expands this to include patients on high-flow oxygen and settings with limited resources.

Common triggers: pneumonia, sepsis, aspiration, pancreatitis, trauma, transfusion.

Management is supportive: treat the cause, lung-protective ventilation (low tidal volumes based on predicted body weight, limited plateau pressures, appropriate PEEP), conservative fluid strategy once shock is resolved, and prone positioning in moderate to severe ARDS.

Non-invasive ventilation is particularly effective for hypercapnic respiratory failure in COPD exacerbations.`,
    keyConcepts: [
      'Type 2 failure means ventilation is inadequate',
      'Tidal volume is set by predicted, not actual, body weight',
      'Prone positioning improves survival in severe ARDS',
    ],
    clinicalPearls: [
      'Rising CO₂ in a tired asthmatic is a sign of impending arrest',
      'Controlled oxygen targets apply in patients at risk of hypercapnia',
    ],
    sources: [pm('ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA 2012'), pm('A New Global Definition of Acute Respiratory Distress Syndrome. Am J Respir Crit Care Med 2024'), pm('ESICM guidelines on acute respiratory distress syndrome: definition, phenotyping and respiratory support strategies 2023')],
    questions: [
      { stem: 'Type 2 respiratory failure is defined by:', options: ['Raised PaCO₂', 'Low PaO₂ with low PaCO₂ only', 'Normal blood gases', 'Raised haemoglobin'], correct: 0, explanation: 'Hypercapnia reflects inadequate alveolar ventilation.', difficulty: 'Foundational' },
      { stem: 'Low tidal volume ventilation in ARDS is calculated using:', options: ['Predicted body weight', 'Actual body weight', 'Body surface area', 'Age only'], correct: 0, explanation: 'Lung size relates to height and sex, not actual weight.', difficulty: 'Intermediate' },
      { stem: 'Which intervention improves survival in moderate to severe ARDS?', options: ['Prone positioning', 'High tidal volumes', 'Routine high-dose steroids for all', 'Liberal fluids'], correct: 0, explanation: 'Prone ventilation improves oxygenation and survival in selected patients.', difficulty: 'Advanced' },
      { stem: 'Non-invasive ventilation is especially effective in:', options: ['Hypercapnic COPD exacerbations', 'Tension pneumothorax', 'Upper airway obstruction from anaphylaxis', 'Cardiac arrest'], correct: 0, explanation: 'NIV reduces intubation and mortality in hypercapnic COPD exacerbations.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'em-paracetamol-1', system: S,
    title: 'Paracetamol (Acetaminophen) Overdose',
    objectives: [
      'Explain the mechanism of paracetamol hepatotoxicity',
      'Use the timing of ingestion to guide management',
      'Recognise patients who need treatment without waiting for levels',
    ],
    coreContent: `Paracetamol is one of the commonest drugs taken in overdose. In overdose, normal metabolic pathways saturate and more drug is converted to the toxic metabolite NAPQI. Glutathione stores are depleted, and NAPQI injures hepatocytes.

Patients are often well early on, which is why the clinical appearance must not be trusted. Liver injury typically appears after 24 hours, peaks around 72–96 hours, and can progress to acute liver failure.

Management depends on timing and the ingestion pattern:
- Acute single ingestion with known time: measure the paracetamol level at four hours or later and plot it against the treatment nomogram used in your country.
- Staggered ingestion, unknown time, or presentation late (after 8 hours) with a significant ingestion: start treatment without waiting for the level.
Acetylcysteine replenishes glutathione and is most effective when started within 8 hours of ingestion, but it is still given in late presentations.

Check liver function, INR, kidney function, glucose, and acid–base. Assess for co-ingestion and provide psychosocial assessment once medically safe. Specialist liver units define criteria for transplant referral.`,
    keyConcepts: [
      'A four-hour level is needed for nomogram interpretation in acute ingestion',
      'Do not delay acetylcysteine when presentation is late or timing is unclear',
      'Early well appearance does not exclude severe toxicity',
    ],
    clinicalPearls: [
      'Rising INR and falling pH are markers of severe liver injury',
      'Acetylcysteine reactions are usually non-allergic and manageable; they are rarely a reason to stop treatment permanently',
    ],
    sources: [web('UK TOXBASE / MHRA guidance on intravenous acetylcysteine for paracetamol overdose', 'https://www.gov.uk/drug-safety-update/paracetamol-overdose-simplification-of-the-use-of-intravenous-acetylcysteine'), pm('Management of Acetaminophen (Paracetamol) Toxicity: 2023 US/Canadian Consensus. JAMA Netw Open 2023')],
    questions: [
      { stem: 'The toxic metabolite of paracetamol is:', options: ['NAPQI', 'Glutathione', 'Acetylcysteine', 'Glucuronide'], correct: 0, explanation: 'NAPQI causes hepatocyte injury when glutathione is depleted.', difficulty: 'Foundational' },
      { stem: 'For an acute single paracetamol ingestion with known time, the level should be taken:', options: ['At four hours or later after ingestion', 'Immediately on arrival at 30 minutes', 'Only after 48 hours', 'Never'], correct: 0, explanation: 'Earlier levels cannot be interpreted on the nomogram.', difficulty: 'Intermediate' },
      { stem: 'A patient presents 12 hours after a large paracetamol ingestion. Management:', options: ['Start acetylcysteine without waiting for the level', 'Wait for the level before any treatment', 'Discharge if they look well', 'Give activated charcoal only'], correct: 0, explanation: 'Late presentation with significant ingestion requires immediate treatment.', difficulty: 'Intermediate' },
      { stem: 'Acetylcysteine works mainly by:', options: ['Replenishing glutathione', 'Increasing paracetamol absorption', 'Blocking opioid receptors', 'Chelating iron'], correct: 0, explanation: 'It provides cysteine for glutathione synthesis.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'em-tox-1', system: S,
    title: 'Toxidromes — Recognising Poisoning Patterns',
    objectives: [
      'Recognise the main toxidromes',
      'Use pupil size, skin, heart rate and temperature to narrow the cause',
      'Know when to contact a poisons service',
    ],
    coreContent: `A toxidrome is a cluster of signs that points to a class of poison. Examining pupils, skin, heart rate, temperature, bowel sounds and mental state gives a lot of information quickly.

- Opioid: reduced consciousness, slow shallow breathing, pinpoint pupils.
- Sympathomimetic (cocaine, amphetamines): agitation, tachycardia, hypertension, hyperthermia, dilated pupils, sweating.
- Anticholinergic (antihistamines, tricyclics, some plants): delirium, dilated pupils, dry flushed skin, hyperthermia, urinary retention, reduced bowel sounds ("hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter").
- Cholinergic (organophosphates, nerve agents): salivation, lacrimation, urination, diarrhoea, bronchorrhoea, bradycardia, small pupils, muscle fasciculations and weakness. Organophosphate poisoning is a major cause of death in agricultural regions.
- Sedative-hypnotic (benzodiazepines, alcohol): drowsiness with relatively normal vital signs and pupils.
- Serotonin toxicity: clonus, hyperreflexia, agitation, hyperthermia.

Supportive care (airway, breathing, circulation, glucose, temperature) is the foundation. Specific antidotes exist for some poisonings. Mixed ingestions are common, and toxidromes overlap. Contact a national poisons information service for specific advice.`,
    keyConcepts: [
      'Sweating distinguishes sympathomimetic from anticholinergic toxicity',
      'Pinpoint pupils with respiratory depression suggest opioids',
      'A 12-lead ECG is essential in poisoning (QRS and QT)',
    ],
    clinicalPearls: [
      'Tricyclic antidepressant overdose: watch for QRS widening, seizures and arrhythmia',
      'Healthcare workers need protection from contamination in organophosphate exposure',
    ],
    sources: [web('TOXBASE (UK National Poisons Information Service)', 'https://www.toxbase.org/'), web('WHO: Poisoning prevention and management', 'https://www.who.int/teams/environment-climate-change-and-health/chemical-safety-and-health/incidents-poisonings'), pm('Eddleston M et al. Management of acute organophosphorus pesticide poisoning. Lancet 2008')],
    questions: [
      { stem: 'Pinpoint pupils, respiratory depression and reduced consciousness suggest:', options: ['Opioid toxicity', 'Anticholinergic toxicity', 'Sympathomimetic toxicity', 'Serotonin syndrome'], correct: 0, explanation: 'This is the classic opioid toxidrome.', difficulty: 'Foundational' },
      { stem: 'Which feature distinguishes sympathomimetic from anticholinergic toxicity?', options: ['Sweating in sympathomimetic; dry skin in anticholinergic', 'Pupil size', 'Heart rate', 'Temperature'], correct: 0, explanation: 'Both cause mydriasis, tachycardia and hyperthermia, but anticholinergics dry the skin.', difficulty: 'Intermediate' },
      { stem: 'Salivation, bronchorrhoea, bradycardia and fasciculations suggest:', options: ['Organophosphate poisoning', 'Cocaine use', 'Benzodiazepine overdose', 'Antihistamine overdose'], correct: 0, explanation: 'Cholinesterase inhibition causes muscarinic and nicotinic excess.', difficulty: 'Foundational' },
      { stem: 'Which investigation is essential in most poisoned patients?', options: ['12-lead ECG', 'Bone densitometry', 'Spirometry', 'Thyroid ultrasound'], correct: 0, explanation: 'Many drugs affect cardiac conduction (QRS, QT).', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'em-heat-1', system: S,
    title: 'Heat Illness and Heat Stroke',
    objectives: [
      'Distinguish heat exhaustion from heat stroke',
      'Explain why rapid cooling is the priority',
      'Identify people at increased risk',
    ],
    coreContent: `Heat illness ranges from heat cramps and heat exhaustion to life-threatening heat stroke. It is common in hot climates and during heatwaves, and its burden is rising.

Heat exhaustion: fatigue, headache, nausea, dizziness, heavy sweating and tachycardia, with normal mental status and core temperature usually below 40 °C. It responds to rest, cooling and fluids.

Heat stroke: core temperature typically above 40 °C with central nervous system dysfunction (confusion, seizures, coma). Two forms:
- Classic (non-exertional): older adults, chronic illness, people without cooling, often during heatwaves; skin may be dry.
- Exertional: young, fit people (athletes, workers, soldiers, pilgrims) during heavy exertion; sweating may persist.

Complications include rhabdomyolysis, AKI, liver injury, DIC and multi-organ failure.

Rapid cooling is the priority: the duration of hyperthermia drives outcome. Cold-water immersion is the most effective method for exertional heat stroke; evaporative cooling and ice packs are alternatives. Antipyretics such as paracetamol do not work because the hypothalamic set point is not raised.

Risk factors: age extremes, cardiovascular disease, obesity, dehydration, alcohol, anticholinergic drugs, diuretics, antipsychotics and stimulants.`,
    keyConcepts: [
      'Confusion plus hyperthermia is heat stroke until proven otherwise',
      'Cool first, transport second when cooling is available',
      'Antipyretics are ineffective in heat stroke',
    ],
    clinicalPearls: [
      'Sweating does not exclude exertional heat stroke',
      'Check CK, kidney function and coagulation in every heat stroke patient',
    ],
    sources: [pm('Bouchama A et al. Classic and exertional heatstroke. Nat Rev Dis Primers 2022'), web('WHO: Heat and health fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health'), pm('Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Heat Illness: 2019 Update')],
    questions: [
      { stem: 'Which feature distinguishes heat stroke from heat exhaustion?', options: ['Central nervous system dysfunction', 'Heavy sweating', 'Headache', 'Fatigue'], correct: 0, explanation: 'Neurological dysfunction with hyperthermia defines heat stroke.', difficulty: 'Foundational' },
      { stem: 'The most effective cooling method for exertional heat stroke is:', options: ['Cold-water immersion', 'Oral paracetamol', 'Warm blankets', 'Fan only in a hot room'], correct: 0, explanation: 'Cold-water immersion gives the fastest cooling rates.', difficulty: 'Intermediate' },
      { stem: 'Why are antipyretics ineffective in heat stroke?', options: ['The hypothalamic set point is not raised', 'They are absorbed too slowly', 'They raise temperature', 'They cause dehydration'], correct: 0, explanation: 'Heat stroke is failure of heat dissipation, not fever.', difficulty: 'Intermediate' },
      { stem: 'Which drug class increases risk of heat illness?', options: ['Anticholinergics', 'Inhaled bronchodilators in all cases', 'Vitamin supplements', 'Topical steroids'], correct: 0, explanation: 'Anticholinergics impair sweating.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'em-tbi-1', system: S,
    title: 'Traumatic Brain Injury',
    objectives: [
      'Assess head injury severity with the GCS',
      'Identify patients who need CT imaging',
      'Describe the principles of preventing secondary brain injury',
    ],
    coreContent: `Traumatic brain injury (TBI) ranges from concussion to severe injury with coma. The primary injury happens at impact; much of the management aims to prevent secondary injury from hypoxia, hypotension, raised intracranial pressure, hypo- or hyperglycaemia, fever and seizures.

Severity is commonly graded by GCS: mild (13–15), moderate (9–12) and severe (8 or less). Pupils and focal signs add information.

CT head indications (NICE NG232 and similar rules) include GCS below 13 on initial assessment or below 15 two hours after injury, suspected open or depressed skull fracture, signs of basal skull fracture, post-traumatic seizure, focal neurological deficit, more than one episode of vomiting, and anticoagulant use. Age and dangerous mechanism also lower the threshold.

Severe TBI care:
- Secure the airway, avoid hypoxia and hypotension.
- Maintain adequate cerebral perfusion, normocapnia, head-up positioning, avoid jugular compression.
- Neurosurgical referral for mass lesions; ICP monitoring in selected patients.

Signs of herniation include a dilated unreactive pupil, falling GCS, hypertension with bradycardia (Cushing response) and abnormal posturing.

Epidural haematoma classically follows a temporal fracture with middle meningeal artery injury; a lucid interval may occur before rapid decline.`,
    keyConcepts: [
      'Hypoxia and hypotension worsen outcome after TBI',
      'Anticoagulated patients need early CT even after minor injury',
      'A lucid interval does not exclude a serious bleed',
    ],
    clinicalPearls: [
      'Always assess the cervical spine in head injury',
      'Hypoglycaemia and intoxication can lower GCS; do not attribute everything to alcohol',
    ],
    sources: [nice('ng232', 'Head injury: assessment and early management'), web('Brain Trauma Foundation: Guidelines for the Management of Severe TBI, 4th edition', 'https://braintrauma.org/coma/guidelines'), pm('Maas AIR et al. Traumatic brain injury: progress and challenges in prevention, clinical care, and research. Lancet Neurol 2022')],
    questions: [
      { stem: 'A GCS of 8 or less after head injury indicates:', options: ['Severe traumatic brain injury', 'Mild concussion', 'No brain injury', 'Moderate injury only'], correct: 0, explanation: 'GCS ≤8 defines severe TBI and usually requires airway protection.', difficulty: 'Foundational' },
      { stem: 'Which factors most worsen secondary brain injury?', options: ['Hypoxia and hypotension', 'Mild hypertension', 'Normal glucose', 'Normocapnia'], correct: 0, explanation: 'Even brief episodes of hypoxia or hypotension worsen outcome.', difficulty: 'Foundational' },
      { stem: 'A patient on warfarin with a minor head injury and normal GCS should:', options: ['Have a CT head per guideline', 'Be discharged without assessment', 'Have a skull X-ray only', 'Wait 48 hours before any imaging'], correct: 0, explanation: 'Anticoagulation raises the risk of intracranial haemorrhage.', difficulty: 'Intermediate' },
      { stem: 'Hypertension, bradycardia and irregular breathing after TBI suggest:', options: ['Raised intracranial pressure (Cushing response)', 'Hypovolaemic shock', 'Anaphylaxis', 'Sepsis'], correct: 0, explanation: 'The Cushing response is a late sign of herniation.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'em-coma-1', system: S,
    title: 'The Unconscious Patient — A Structured Approach',
    objectives: [
      'Apply a structured approach to reduced consciousness',
      'Identify rapidly reversible causes',
      'Use examination to separate structural from metabolic causes',
    ],
    coreContent: `Reduced consciousness is a medical emergency with a wide differential. A structured approach stabilises first, then diagnoses.

Immediate steps:
- ABC: secure the airway, oxygen, circulation.
- Glucose: check capillary glucose immediately.
- Look for reversible causes: opioid toxicity (consider naloxone), hypoxia, hypotension, hypothermia, thiamine deficiency in at-risk patients.

Causes fall into broad groups:
- Structural: stroke, intracranial haemorrhage, tumour, abscess, trauma.
- Metabolic/toxic: hypoglycaemia, hyponatraemia, hypercapnia, uraemia, liver failure, drugs and alcohol, sepsis, hypothermia.
- Infective: meningitis, encephalitis.
- Seizure-related: post-ictal state, non-convulsive status epilepticus.

Examination clues:
- Lateralising signs or asymmetric pupils suggest a structural lesion.
- Symmetrical findings with reactive pupils often suggest a metabolic or toxic cause.
- Neck stiffness, fever or rash suggest infection.
- Brainstem signs (abnormal eye movements, breathing patterns) localise the lesion.

Collateral history from family, ambulance crew and medication lists is often decisive. CT head is needed when the cause is not clear or a structural lesion is suspected.`,
    keyConcepts: [
      '"Don\'t ever forget glucose"',
      'Asymmetry suggests structure; symmetry suggests metabolism',
      'Non-convulsive status is a hidden cause of coma',
    ],
    clinicalPearls: [
      'Pupils usually remain reactive in metabolic coma, a useful localising principle',
      'A GCS motor score is the most reliable component in intubated or aphasic patients',
    ],
    sources: [pm('Edlow JA et al. Diagnosis of reversible causes of coma. Lancet 2014'), pm('Posner JB, Saper CB, Schiff ND, Claassen J. Plum and Posner\'s Diagnosis and Treatment of Stupor and Coma, 5th ed.'), pm('Teasdale G et al. The Glasgow Coma Scale at 40 years: standing the test of time. Lancet Neurol 2014')],
    questions: [
      { stem: 'Which test should be done immediately in any unconscious patient?', options: ['Capillary glucose', 'MRI brain', 'Lumbar puncture', 'Thyroid function'], correct: 0, explanation: 'Hypoglycaemia is common, dangerous and instantly reversible.', difficulty: 'Foundational' },
      { stem: 'Unequal pupils and hemiparesis in a comatose patient suggest:', options: ['A structural intracranial lesion', 'Metabolic encephalopathy', 'Hypoglycaemia only', 'Normal sleep'], correct: 0, explanation: 'Lateralising signs point to structural pathology.', difficulty: 'Intermediate' },
      { stem: 'Symmetrical reactive pupils in a comatose patient often suggest:', options: ['Metabolic or toxic cause', 'Uncal herniation', 'Third nerve palsy', 'Brainstem stroke'], correct: 0, explanation: 'Pupillary reflexes are relatively resistant to metabolic insults.', difficulty: 'Advanced' },
      { stem: 'A malnourished patient with alcohol use disorder and confusion should receive:', options: ['Parenteral thiamine', 'Oral vitamin C', 'Iron infusion', 'Vitamin K only'], correct: 0, explanation: 'Wernicke encephalopathy is treated on suspicion.', difficulty: 'Foundational' },
    ],
  },
];
