import { nice, pm, web } from './_src.js';
const S = 'Nephrology';
const KDIGO = (t) => web(`KDIGO Clinical Practice Guideline: ${t}`, 'https://kdigo.org/guidelines/');

export default [
  {
    topicId: 'nephro-na-1', system: S,
    title: 'Hyponatraemia — A Water Problem',
    objectives: [
      'Explain hyponatraemia as an excess of water relative to sodium',
      'Use volume status, serum osmolality and urine tests to classify causes',
      'Explain why chronic hyponatraemia must be corrected slowly',
    ],
    coreContent: `Hyponatraemia (serum sodium below 135 mmol/L) is the commonest electrolyte disorder in hospital. In most cases it reflects too much water rather than too little sodium, usually because antidiuretic hormone (ADH) is acting when it should not.

A structured approach:
- Confirm hypotonic hyponatraemia (low serum osmolality); exclude hyperglycaemia and pseudohyponatraemia.
- Assess severity of symptoms: headache, nausea, confusion, seizures, reduced consciousness.
- Check urine osmolality (is ADH active?) and urine sodium, interpreted with volume status.

Common causes: thiazide diuretics, SIADH (drugs, lung disease, CNS disease, malignancy, pain, nausea), hypovolaemia, heart failure, cirrhosis, adrenal insufficiency, hypothyroidism and very low solute intake.

Severe symptoms need urgent treatment with hypertonic saline under specialist guidance. In chronic hyponatraemia the brain has adapted, so correcting too fast risks osmotic demyelination syndrome. Limits on the rate of rise are part of every protocol.`,
    keyConcepts: [
      'SIADH is a diagnosis of exclusion: euvolaemia, concentrated urine, high urine sodium, normal adrenal and thyroid function',
      'Overcorrection is a preventable cause of permanent neurological injury',
      'Severity of symptoms, not the number alone, decides urgency',
    ],
    clinicalPearls: [
      'Check cortisol before diagnosing SIADH; adrenal insufficiency mimics it',
      'Watch for a sudden water diuresis once the cause is removed: sodium can rise too quickly',
    ],
    sources: [pm('Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014'), pm('Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations Am J Med 2013')],
    questions: [
      { stem: 'In most patients, hyponatraemia primarily reflects:', options: ['Water excess relative to sodium', 'Total body sodium deficiency in every case', 'Excess potassium', 'Laboratory error'], correct: 0, explanation: 'Hyponatraemia is usually a water-balance disorder driven by ADH action.', difficulty: 'Foundational' },
      { stem: 'Why must chronic hyponatraemia be corrected slowly?', options: ['Rapid correction risks osmotic demyelination', 'Rapid correction causes hypokalaemia only', 'Slow correction prevents infection', 'The kidneys cannot excrete sodium'], correct: 0, explanation: 'Brain cells adapt to chronic hypotonicity; a rapid rise in sodium can cause demyelination.', difficulty: 'Intermediate' },
      { stem: 'Before diagnosing SIADH, which condition should be excluded?', options: ['Adrenal insufficiency', 'Iron deficiency', 'Gout', 'Asthma'], correct: 0, explanation: 'Adrenal insufficiency and hypothyroidism can produce a picture identical to SIADH.', difficulty: 'Intermediate' },
      { stem: 'A patient with sodium 118 mmol/L is having seizures. Management priority is:', options: ['Urgent controlled correction with hypertonic saline under specialist guidance', 'Fluid restriction alone over a week', 'Discharge with diet advice', 'Rapid full normalisation within one hour'], correct: 0, explanation: 'Severe symptoms need a prompt, limited rise in sodium; full rapid normalisation is dangerous.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'nephro-k-1', system: S,
    title: 'Hyperkalaemia — Protect the Heart, Shift, Remove',
    objectives: [
      'Recognise the ECG changes of hyperkalaemia',
      'Describe the three steps of emergency management',
      'List common causes, especially medications',
    ],
    coreContent: `Hyperkalaemia is dangerous because potassium sets the resting membrane potential of cardiac cells. High potassium can cause bradycardia, conduction block and cardiac arrest.

ECG changes can include peaked T waves, flattened P waves, a prolonged PR interval, QRS widening and, late, a sine-wave pattern. The ECG is an imperfect guide; a normal ECG does not make a high potassium safe.

Emergency management follows three steps:
- Stabilise the myocardium with intravenous calcium when there are ECG changes or severe hyperkalaemia.
- Shift potassium into cells with insulin (given with glucose) and nebulised beta-agonist.
- Remove potassium from the body: treat the cause, potassium binders, diuretics if appropriate, and dialysis when needed.

Common causes include AKI and CKD, ACE inhibitors and ARBs, potassium-sparing diuretics, NSAIDs, trimethoprim, tissue breakdown (rhabdomyolysis, tumour lysis) and adrenal insufficiency. Rule out a haemolysed sample, but do not delay treatment if the ECG is abnormal.`,
    keyConcepts: [
      'Calcium does not lower potassium; it protects the heart for a limited time',
      'Insulin-glucose shifts potassium temporarily; hypoglycaemia is a common harm, so glucose must be monitored',
      'Definitive treatment removes potassium from the body',
    ],
    clinicalPearls: [
      'Repeat a "high potassium" from a difficult blood draw, but treat first if the ECG is abnormal',
      'Review the drug chart every time: many cases are medication-driven',
    ],
    sources: [web('UK Kidney Association: Clinical Practice Guidelines — Treatment of Acute Hyperkalaemia in Adults (2023)', 'https://ukkidney.org/health-professionals/guidelines/guidelines-commentaries'), pm('Resuscitation Council UK / ERC Guidelines 2021 cardiac arrest in special circumstances hyperkalaemia')],
    questions: [
      { stem: 'What is the role of intravenous calcium in hyperkalaemia?', options: ['Stabilises the cardiac membrane without lowering potassium', 'Removes potassium via the kidneys', 'Shifts potassium into cells permanently', 'Prevents hypoglycaemia'], correct: 0, explanation: 'Calcium protects the myocardium temporarily; other measures are needed to lower potassium.', difficulty: 'Foundational' },
      { stem: 'Which ECG change is classically associated with hyperkalaemia?', options: ['Peaked T waves', 'U waves', 'Delta waves', 'Prolonged QT with flat T waves'], correct: 0, explanation: 'Peaked T waves are an early sign; widening QRS and sine waves are late signs.', difficulty: 'Foundational' },
      { stem: 'A common harm of insulin–glucose therapy for hyperkalaemia is:', options: ['Hypoglycaemia', 'Hypercalcaemia', 'Hypernatraemia', 'Bronchospasm'], correct: 0, explanation: 'Hypoglycaemia is frequent, especially in kidney failure; glucose must be monitored for several hours.', difficulty: 'Intermediate' },
      { stem: 'Which medication commonly contributes to hyperkalaemia?', options: ['ACE inhibitor', 'Loop diuretic', 'Salbutamol', 'Thiazide diuretic'], correct: 0, explanation: 'ACE inhibitors and ARBs reduce aldosterone effect and potassium excretion.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'nephro-acidbase-1', system: S,
    title: 'Acid–Base — Reading the Blood Gas',
    objectives: [
      'Use a stepwise approach to interpret an arterial or venous blood gas',
      'Calculate and interpret the anion gap',
      'List causes of high anion gap and normal anion gap metabolic acidosis',
    ],
    coreContent: `A stepwise reading avoids mistakes:
1. pH: acidaemia or alkalaemia?
2. Primary process: is the PaCO₂ (respiratory) or bicarbonate (metabolic) moving in the direction that explains the pH?
3. Compensation: is it appropriate, or is there a second disorder?
4. In metabolic acidosis, calculate the anion gap: Na⁺ − (Cl⁻ + HCO₃⁻).

High anion gap metabolic acidosis means an unmeasured acid has been added:
- lactate (shock, sepsis, ischaemia, seizures, some drugs)
- ketones (diabetic, alcoholic or starvation ketoacidosis)
- kidney failure
- toxins (methanol, ethylene glycol, salicylate)

Normal anion gap (hyperchloraemic) acidosis means bicarbonate has been lost or chloride gained: diarrhoea, renal tubular acidosis, large volumes of saline, ureteric diversion.

Albumin is the main unmeasured anion, so a low albumin lowers the anion gap and can hide a high-gap acidosis; correct for it.`,
    keyConcepts: [
      'Compensation never fully corrects the pH; full correction suggests a mixed disorder',
      'Low albumin masks a raised anion gap',
      'A raised osmolar gap with high anion gap acidosis should prompt consideration of toxic alcohols',
    ],
    clinicalPearls: [
      'Ketoacidosis can occur with near-normal glucose, for example with SGLT2 inhibitors or alcohol',
      'Venous gases are adequate for pH and bicarbonate in many settings; arterial gas is needed for accurate PaO₂',
    ],
    sources: [pm('Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol 2007'), pm('Berend K, de Vries AP, Gans RO. Physiological approach to assessment of acid-base disturbances. N Engl J Med 2014')],
    questions: [
      { stem: 'How is the anion gap calculated?', options: ['Na⁺ − (Cl⁻ + HCO₃⁻)', 'Na⁺ + K⁺ − Cl⁻', 'HCO₃⁻ − Cl⁻', 'Cl⁻ − Na⁺'], correct: 0, explanation: 'The gap estimates unmeasured anions using measured sodium, chloride and bicarbonate.', difficulty: 'Foundational' },
      { stem: 'Which condition causes a normal anion gap metabolic acidosis?', options: ['Severe diarrhoea', 'Diabetic ketoacidosis', 'Lactic acidosis', 'Methanol poisoning'], correct: 0, explanation: 'Diarrhoea loses bicarbonate and causes hyperchloraemic, normal-gap acidosis.', difficulty: 'Foundational' },
      { stem: 'Why can a low serum albumin be misleading in acid–base analysis?', options: ['It lowers the anion gap and can mask a high-gap acidosis', 'It raises pH directly', 'It causes respiratory acidosis', 'It increases bicarbonate measurement error only'], correct: 0, explanation: 'Albumin is the main unmeasured anion; hypoalbuminaemia reduces the calculated gap.', difficulty: 'Intermediate' },
      { stem: 'A high anion gap acidosis with a raised osmolar gap should prompt concern for:', options: ['Toxic alcohol ingestion', 'Diarrhoea', 'Renal tubular acidosis', 'Vomiting'], correct: 0, explanation: 'Methanol and ethylene glycol raise both osmolar and anion gaps.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'nephro-glom-1', system: S,
    title: 'Glomerular Disease — Nephritic vs Nephrotic',
    objectives: [
      'Contrast the nephritic and nephrotic syndromes',
      'Name common causes of each',
      'Explain why rapidly progressive glomerulonephritis is an emergency',
    ],
    coreContent: `Glomerular diseases present along a spectrum between two patterns.

Nephrotic syndrome: heavy proteinuria (typically above about 3.5 g/day in adults), hypoalbuminaemia and oedema, often with hyperlipidaemia. The filter leaks protein but inflammation is usually limited. Causes include minimal change disease, membranous nephropathy, focal segmental glomerulosclerosis and diabetic kidney disease. Complications are thrombosis, infection and hyperlipidaemia.

Nephritic syndrome: glomerular inflammation causing haematuria (often with red cell casts), proteinuria usually below nephrotic range, hypertension, oedema and reduced GFR. Causes include IgA nephropathy, post-infectious glomerulonephritis, lupus nephritis, ANCA vasculitis and anti-GBM disease.

Rapidly progressive glomerulonephritis (RPGN) is a nephritic picture with kidney function falling over days to weeks. It needs urgent serology (ANCA, anti-GBM, complement, ANA) and usually biopsy, because early treatment can save kidney function.

Urinalysis and urine protein quantification (ACR or PCR) are the first steps; biopsy often provides the diagnosis.`,
    keyConcepts: [
      'Red cell casts indicate glomerular bleeding',
      'Nephrotic syndrome increases thrombosis risk, including renal vein thrombosis',
      'Lung haemorrhage with nephritis suggests a pulmonary–renal syndrome',
    ],
    clinicalPearls: [
      'Visible haematuria a day or two after a sore throat suggests IgA nephropathy; after 1–3 weeks suggests post-streptococcal disease',
      'Always dip the urine in unexplained AKI',
    ],
    sources: [KDIGO('2021 Management of Glomerular Diseases'), pm('Glomerulonephritis. Lancet 2016 review')],
    questions: [
      { stem: 'Which combination defines nephrotic syndrome?', options: ['Heavy proteinuria, hypoalbuminaemia and oedema', 'Haematuria, hypertension and red cell casts', 'Isolated haematuria', 'Pyuria and fever'], correct: 0, explanation: 'Nephrotic syndrome is a protein leak: heavy proteinuria with low albumin and oedema.', difficulty: 'Foundational' },
      { stem: 'Red cell casts in the urine indicate:', options: ['Glomerular inflammation', 'Bladder infection', 'Kidney stones', 'Urethral trauma'], correct: 0, explanation: 'Casts form in tubules; red cell casts mean red cells entered at the glomerulus.', difficulty: 'Foundational' },
      { stem: 'Why is rapidly progressive glomerulonephritis urgent?', options: ['Kidney function can be lost within weeks without treatment', 'It always resolves without treatment', 'It only causes mild proteinuria', 'It is caused by dehydration'], correct: 0, explanation: 'Early immunosuppression or plasma exchange (in specific causes) can preserve kidney function.', difficulty: 'Intermediate' },
      { stem: 'Which complication is particularly associated with nephrotic syndrome?', options: ['Venous thrombosis', 'Hypercalcaemia', 'Polycythaemia', 'Hypokalaemic paralysis'], correct: 0, explanation: 'Urinary loss of anticoagulant proteins and other changes create a hypercoagulable state.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'nephro-stones-1', system: S,
    title: 'Kidney Stones and Renal Colic',
    objectives: [
      'Recognise the presentation of renal colic',
      'Identify features that make an obstructed kidney an emergency',
      'Outline prevention after a first stone',
    ],
    coreContent: `Most kidney stones are calcium oxalate. Others include calcium phosphate, uric acid, struvite (infection-related) and cystine. Risk factors include low fluid intake, high salt and animal protein intake, obesity, hypercalciuria, hyperparathyroidism, gout and some bowel diseases.

Renal colic presents with severe loin pain radiating to the groin, often with nausea and haematuria. Patients typically cannot lie still, which contrasts with peritonitis.

Non-contrast CT of the kidneys, ureters and bladder is the standard imaging test in adults; ultrasound is preferred in pregnancy and is useful in children. Many small stones pass spontaneously.

An infected obstructed kidney (fever, rigors or sepsis with an obstructing stone) is a urological emergency: it needs urgent decompression with a nephrostomy or ureteric stent, plus antibiotics. Other red flags are a solitary kidney, bilateral obstruction and AKI.

After a stone, analyse it if possible, check serum calcium and urate, and advise high fluid intake. Further metabolic testing is aimed at recurrent or high-risk stone formers.`,
    keyConcepts: [
      'Infection behind an obstruction needs drainage, not antibiotics alone',
      'Hypercalcaemia from hyperparathyroidism is a treatable cause of recurrent stones',
      'Uric acid stones are radiolucent on plain X-ray but visible on CT',
    ],
    clinicalPearls: [
      'In an older patient with "renal colic", consider a leaking abdominal aortic aneurysm',
      'Fluid intake producing a high urine output is the simplest prevention for all stone types',
    ],
    sources: [nice('ng118', 'Renal and ureteric stones: assessment and management'), web('EAU Guidelines on Urolithiasis', 'https://uroweb.org/guidelines/urolithiasis')],
    questions: [
      { stem: 'The most common type of kidney stone is:', options: ['Calcium oxalate', 'Cystine', 'Struvite', 'Xanthine'], correct: 0, explanation: 'Calcium-containing stones, mostly calcium oxalate, make up the majority.', difficulty: 'Foundational' },
      { stem: 'A patient with a ureteric stone has fever and rigors. Management priority is:', options: ['Urgent decompression of the obstructed kidney plus antibiotics', 'Oral analgesia and discharge', 'Await spontaneous passage', 'Antibiotics alone for two weeks'], correct: 0, explanation: 'An infected obstructed kidney can cause rapid sepsis; drainage is essential.', difficulty: 'Intermediate' },
      { stem: 'Which imaging is standard for suspected renal colic in non-pregnant adults?', options: ['Non-contrast CT KUB', 'MRI with gadolinium', 'Plain chest radiograph', 'Barium swallow'], correct: 0, explanation: 'Non-contrast CT has high sensitivity for stones and alternative diagnoses.', difficulty: 'Foundational' },
      { stem: 'An older patient presents with first-ever "renal colic" and hypotension. Which diagnosis must be considered?', options: ['Ruptured abdominal aortic aneurysm', 'Simple constipation', 'Muscle strain', 'Migraine'], correct: 0, explanation: 'A leaking AAA can mimic renal colic and is immediately life-threatening.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'nephro-rrt-1', system: S,
    title: 'Kidney Replacement Therapy — When to Dialyse',
    objectives: [
      'List the urgent indications for dialysis in acute kidney injury',
      'Outline the modalities of kidney replacement therapy',
      'Recognise complications specific to patients on dialysis',
    ],
    coreContent: `Kidney replacement therapy (KRT) takes over the functions the kidneys can no longer perform: removing solutes and fluid and correcting electrolytes and acid–base.

Urgent indications in AKI are usually remembered as complications that do not respond to medical treatment:
- refractory hyperkalaemia
- severe metabolic acidosis
- fluid overload (for example pulmonary oedema) resistant to diuretics
- uraemic complications: pericarditis, encephalopathy, bleeding
- certain poisonings removable by dialysis (for example lithium, toxic alcohols, salicylates)

Modalities:
- Intermittent haemodialysis: efficient, a few hours several times a week.
- Continuous kidney replacement therapy: slower, used in haemodynamically unstable ICU patients.
- Peritoneal dialysis: uses the peritoneum as the membrane, often done at home.
- Kidney transplantation: the best long-term option for many with kidney failure.

In end-stage kidney disease, the decision to start dialysis rests on symptoms and complications rather than a single eGFR value. Conservative kidney management is a valid choice for some patients.`,
    keyConcepts: [
      'Dialysis indications are complications, not a creatinine number',
      'Continuous therapy is preferred when blood pressure cannot tolerate rapid fluid removal',
      'Vascular access (fistula, graft, catheter) is the lifeline for haemodialysis patients',
    ],
    clinicalPearls: [
      'Avoid venepuncture and blood pressure cuffs on an arm with a fistula',
      'Fever in a patient with a dialysis catheter is a line infection until proven otherwise',
    ],
    sources: [KDIGO('2012 Acute Kidney Injury'), nice('ng107', 'Renal replacement therapy and conservative management')],
    questions: [
      { stem: 'Which is an urgent indication for dialysis in AKI?', options: ['Hyperkalaemia refractory to medical treatment', 'Creatinine rise of 20%', 'Mild ankle oedema', 'Isolated proteinuria'], correct: 0, explanation: 'Life-threatening complications that do not respond to medical measures indicate dialysis.', difficulty: 'Foundational' },
      { stem: 'Uraemic pericarditis is:', options: ['An indication for dialysis', 'Treated with diuretics alone', 'A normal finding in CKD', 'A contraindication to dialysis'], correct: 0, explanation: 'Uraemic complications such as pericarditis and encephalopathy indicate KRT.', difficulty: 'Intermediate' },
      { stem: 'Why is continuous KRT used in unstable ICU patients?', options: ['Slower fluid and solute removal is better tolerated haemodynamically', 'It is cheaper', 'It needs no vascular access', 'It works faster than haemodialysis'], correct: 0, explanation: 'Gradual removal avoids the hypotension that intermittent dialysis can cause.', difficulty: 'Intermediate' },
      { stem: 'Which poisoning can be treated with dialysis?', options: ['Lithium', 'Digoxin in most cases', 'Paracetamol in all cases', 'Organophosphates'], correct: 0, explanation: 'Small, water-soluble, low protein-bound substances such as lithium are removed by dialysis.', difficulty: 'Advanced' },
    ],
  },
];
