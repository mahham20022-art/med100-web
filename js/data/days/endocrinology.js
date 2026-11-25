import { nice, pm, web } from './_src.js';
const S = 'Endocrinology';

export default [
  {
    topicId: 'endo-dka-1', system: S,
    title: 'Diabetic Emergencies — DKA and HHS',
    objectives: [
      'Contrast diabetic ketoacidosis with the hyperosmolar hyperglycaemic state',
      'Describe the diagnostic criteria for DKA',
      'Explain the priorities of treatment: fluid, insulin, potassium and the cause',
    ],
    coreContent: `Diabetic ketoacidosis (DKA) results from insulin deficiency with excess counter-regulatory hormones. Lipolysis feeds ketone production, causing a high anion gap metabolic acidosis. It typically develops over hours to a day and is most common in type 1 diabetes, though it occurs in type 2.

Diagnosis requires all three: raised glucose (or known diabetes), ketonaemia (or significant ketonuria) and metabolic acidosis (low pH or bicarbonate).

The hyperosmolar hyperglycaemic state (HHS) develops over days, usually in older people with type 2 diabetes. There is enough insulin to limit ketosis, but glucose and osmolality climb very high, causing profound dehydration and altered consciousness.

Treatment priorities:
- Fluid resuscitation.
- Insulin to stop ketogenesis (in DKA) once potassium is known; glucose is added when it falls, so insulin can continue until ketones clear.
- Potassium: total body potassium is depleted even when serum levels are normal or high, and insulin drives it into cells.
- Find and treat the trigger: infection, missed insulin, myocardial infarction, new diabetes, SGLT2 inhibitors.`,
    keyConcepts: [
      'Normal or high serum potassium in DKA hides total body depletion',
      'Euglycaemic DKA can occur with SGLT2 inhibitors, pregnancy or starvation',
      'HHS carries high risk of thrombosis and needs slower correction of osmolality',
    ],
    clinicalPearls: [
      'Measure blood ketones directly; follow ketone clearance, not glucose alone',
      'Abdominal pain is common in DKA but can also be a cause such as pancreatitis or appendicitis',
    ],
    sources: [web('Joint British Diabetes Societies for Inpatient Care: Management of DKA in adults (2023)', 'https://abcd.care/joint-british-diabetes-societies-jbds-inpatient-care-group'), pm('Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care 2024')],
    questions: [
      { stem: 'Which triad defines diabetic ketoacidosis?', options: ['Hyperglycaemia (or known diabetes), ketonaemia and metabolic acidosis', 'Hypoglycaemia, ketonaemia and alkalosis', 'Hyperglycaemia, hyponatraemia and hypertension', 'Glycosuria, fever and tachycardia'], correct: 0, explanation: 'DKA requires evidence of diabetes or high glucose, raised ketones and acidosis.', difficulty: 'Foundational' },
      { stem: 'Why must potassium be monitored closely when treating DKA?', options: ['Insulin shifts potassium into cells, and total body potassium is depleted', 'Insulin raises potassium dangerously', 'Fluids contain no water', 'Potassium is irrelevant in DKA'], correct: 0, explanation: 'Treatment unmasks the depletion; hypokalaemia is a leading cause of harm during DKA treatment.', difficulty: 'Intermediate' },
      { stem: 'Compared with DKA, HHS is characterised by:', options: ['Very high osmolality and dehydration with little ketosis', 'Severe ketoacidosis with normal glucose', 'Rapid onset over minutes', 'Mainly young people with type 1 diabetes'], correct: 0, explanation: 'HHS evolves over days with extreme hyperglycaemia and hyperosmolality without major ketosis.', difficulty: 'Foundational' },
      { stem: 'A patient taking an SGLT2 inhibitor is acidotic with ketones but glucose is only mildly raised. This suggests:', options: ['Euglycaemic DKA', 'HHS', 'Lactic acidosis only', 'Normal response to the drug'], correct: 0, explanation: 'SGLT2 inhibitors can cause DKA with near-normal glucose; ketones must be checked.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'endo-adrenal-1', system: S,
    title: 'Adrenal Insufficiency and Adrenal Crisis',
    objectives: [
      'Distinguish primary from secondary adrenal insufficiency',
      'Recognise the features of adrenal crisis',
      'Explain why treatment must not wait for test results in suspected crisis',
    ],
    coreContent: `Adrenal insufficiency means inadequate cortisol production.
- Primary (Addison disease): the adrenal glands fail, most often autoimmune; other causes include tuberculosis (important in many regions), haemorrhage and metastases. Aldosterone is also lost, causing salt wasting and hyperkalaemia; high ACTH causes skin pigmentation.
- Secondary: the pituitary fails to make ACTH. Aldosterone is preserved because it is regulated by renin–angiotensin.
- The commonest cause overall is suppression from long-term glucocorticoid therapy that is stopped suddenly.

Chronic symptoms are vague: fatigue, weight loss, nausea, abdominal pain, dizziness and salt craving.

Adrenal crisis is a life-threatening emergency with hypotension or shock, vomiting, abdominal pain, confusion, hyponatraemia, hyperkalaemia and hypoglycaemia, often triggered by infection or surgery. If crisis is suspected, take a blood sample for cortisol and ACTH if possible, but give parenteral hydrocortisone and fluids immediately without waiting for results.

Patients on replacement need "sick day rules" (increase dose during illness) and an emergency injection kit and card.`,
    keyConcepts: [
      'Hyperpigmentation points to primary disease (high ACTH)',
      'Stopping long-term steroids abruptly can cause adrenal crisis',
      'Treatment of suspected crisis precedes confirmation',
    ],
    clinicalPearls: [
      'Unexplained hypotension resistant to fluids and vasopressors in a patient on long-term steroids: give hydrocortisone',
      'The short Synacthen test confirms the diagnosis once the patient is stable',
    ],
    sources: [pm('Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline 2016'), web('Society for Endocrinology: Adrenal crisis emergency guidance', 'https://www.endocrinology.org/clinical-practice/clinical-guidance/adrenal-crisis/')],
    questions: [
      { stem: 'Which feature suggests primary rather than secondary adrenal insufficiency?', options: ['Skin hyperpigmentation', 'Normal potassium', 'Low ACTH', 'Preserved aldosterone'], correct: 0, explanation: 'High ACTH in primary disease stimulates melanocytes, causing pigmentation.', difficulty: 'Foundational' },
      { stem: 'In suspected adrenal crisis, hydrocortisone should be given:', options: ['Immediately, without waiting for cortisol results', 'Only after a Synacthen test', 'Only if potassium is normal', 'After 24 hours of observation'], correct: 0, explanation: 'Adrenal crisis is lethal if untreated; diagnostic tests can follow treatment.', difficulty: 'Foundational' },
      { stem: 'The most common cause of adrenal insufficiency overall is:', options: ['Suppression from exogenous glucocorticoids', 'Adrenal metastases', 'Congenital adrenal hyperplasia', 'Adrenal haemorrhage'], correct: 0, explanation: 'Long-term steroid therapy suppresses the HPA axis; abrupt withdrawal unmasks insufficiency.', difficulty: 'Intermediate' },
      { stem: 'Why is hyperkalaemia less typical in secondary adrenal insufficiency?', options: ['Aldosterone is regulated mainly by renin–angiotensin and is preserved', 'Cortisol excretes potassium', 'The pituitary produces aldosterone', 'ACTH is high'], correct: 0, explanation: 'Mineralocorticoid production continues when only ACTH is deficient.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'endo-cushing-1', system: S,
    title: 'Cushing Syndrome',
    objectives: [
      'Recognise the clinical features of glucocorticoid excess',
      'Describe the first-line screening tests',
      'Outline how the source is localised once excess is confirmed',
    ],
    coreContent: `Cushing syndrome is the clinical result of prolonged glucocorticoid excess. The commonest cause is exogenous steroid medication. Endogenous causes are ACTH-dependent (pituitary adenoma, called Cushing disease, or ectopic ACTH from a tumour) or ACTH-independent (adrenal adenoma or carcinoma).

Features that discriminate best include easy bruising, facial plethora, proximal muscle weakness and wide purple striae. Other features include central weight gain, rounded face, hypertension, diabetes, osteoporosis, mood change, menstrual disturbance and infections.

Screening for endogenous excess (after excluding exogenous steroids) uses one or more of:
- overnight low-dose dexamethasone suppression test
- late-night salivary cortisol
- 24-hour urinary free cortisol

Once excess is confirmed, ACTH separates dependent from independent causes, then imaging and sometimes inferior petrosal sinus sampling localise the source. Because tests have false positives (alcohol, depression, obesity, severe illness), this work-up belongs with endocrinology.`,
    keyConcepts: [
      'Always ask about steroids, including inhaled, topical and injected forms',
      'Proximal myopathy and easy bruising help separate Cushing syndrome from simple obesity',
      'Biochemical confirmation comes before imaging',
    ],
    clinicalPearls: [
      'Rapid onset with severe hypokalaemia suggests ectopic ACTH',
      'An incidental adrenal mass should be assessed for autonomous cortisol secretion',
    ],
    sources: [pm('Consensus on diagnosis and management of Cushing\'s disease: a guideline update. Lancet Diabetes Endocrinol 2021'), pm('The Diagnosis of Cushing\'s Syndrome: An Endocrine Society Clinical Practice Guideline 2008')],
    questions: [
      { stem: 'The most common cause of Cushing syndrome is:', options: ['Exogenous glucocorticoid use', 'Pituitary adenoma', 'Adrenal carcinoma', 'Ectopic ACTH'], correct: 0, explanation: 'Iatrogenic steroids are the leading cause; ask about all routes of administration.', difficulty: 'Foundational' },
      { stem: 'Which is a first-line screening test for endogenous Cushing syndrome?', options: ['Overnight low-dose dexamethasone suppression test', 'Random morning cortisol alone', 'Pituitary MRI', 'Adrenal CT'], correct: 0, explanation: 'Screening confirms biochemical excess before any imaging.', difficulty: 'Intermediate' },
      { stem: 'Which features most help distinguish Cushing syndrome from obesity?', options: ['Proximal muscle weakness and easy bruising', 'Weight gain alone', 'Hypertension alone', 'Fatigue alone'], correct: 0, explanation: 'Discriminating features include bruising, plethora, proximal myopathy and wide purple striae.', difficulty: 'Intermediate' },
      { stem: 'Rapid-onset glucocorticoid excess with marked hypokalaemia suggests:', options: ['Ectopic ACTH secretion', 'Adrenal adenoma', 'Exogenous topical steroid', 'Simple obesity'], correct: 0, explanation: 'Very high cortisol from ectopic ACTH overwhelms renal enzyme protection, causing mineralocorticoid effects.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'endo-calcium-1', system: S,
    title: 'Hypercalcaemia and the Parathyroid',
    objectives: [
      'Name the two commonest causes of hypercalcaemia',
      'Use PTH to separate PTH-mediated from non-PTH-mediated causes',
      'Recognise severe hypercalcaemia and its initial management principles',
    ],
    coreContent: `Primary hyperparathyroidism and malignancy account for most cases of hypercalcaemia. The first test after confirming a raised (albumin-adjusted or ionised) calcium is parathyroid hormone (PTH).

- PTH raised or inappropriately normal: PTH-mediated. Primary hyperparathyroidism (usually a single adenoma) is the main cause; familial hypocalciuric hypercalcaemia is a benign mimic; tertiary hyperparathyroidism follows long-standing CKD.
- PTH suppressed: non-PTH-mediated. Think malignancy (PTH-related peptide, bone metastases, myeloma), vitamin D excess, granulomatous disease (sarcoidosis, TB), thiazides, lithium, immobilisation, thyrotoxicosis.

Symptoms ("bones, stones, groans and psychic moans"): bone pain, kidney stones, polyuria and thirst, constipation, abdominal pain, fatigue, confusion. Severe hypercalcaemia can cause AKI, arrhythmia and coma.

Initial management of severe symptomatic hypercalcaemia includes intravenous fluids to restore volume and further treatment such as bisphosphonates, guided by the cause.`,
    keyConcepts: [
      'PTH is the pivotal test',
      'Hypercalcaemia of malignancy usually indicates advanced disease',
      'Polyuria from hypercalcaemia worsens dehydration, which worsens hypercalcaemia',
    ],
    clinicalPearls: [
      'Check myeloma screen in an older patient with hypercalcaemia, anaemia and kidney impairment',
      'Low urine calcium with high serum calcium and mild PTH rise suggests familial hypocalciuric hypercalcaemia: avoid unnecessary surgery',
    ],
    sources: [web('Society for Endocrinology: Emergency management of acute hypercalcaemia in adult patients', 'https://www.endocrinology.org/clinical-practice/clinical-guidance/'), nice('ng132', 'Hyperparathyroidism (primary): diagnosis, assessment and initial management')],
    questions: [
      { stem: 'The most useful first test in confirmed hypercalcaemia is:', options: ['Parathyroid hormone', 'Serum sodium', 'Thyroid ultrasound', 'Bone marrow biopsy'], correct: 0, explanation: 'PTH separates PTH-mediated from non-PTH-mediated causes.', difficulty: 'Foundational' },
      { stem: 'Hypercalcaemia with a suppressed PTH should prompt consideration of:', options: ['Malignancy', 'Primary hyperparathyroidism', 'Familial hypocalciuric hypercalcaemia', 'Tertiary hyperparathyroidism'], correct: 0, explanation: 'A suppressed PTH means the calcium comes from another source, often malignancy.', difficulty: 'Intermediate' },
      { stem: 'Which drug can raise serum calcium?', options: ['Thiazide diuretic', 'Loop diuretic', 'Bisphosphonate', 'Calcitonin'], correct: 0, explanation: 'Thiazides reduce urinary calcium excretion.', difficulty: 'Intermediate' },
      { stem: 'First-line initial management of severe symptomatic hypercalcaemia includes:', options: ['Intravenous fluid to restore volume', 'Calcium supplements', 'Fluid restriction', 'Vitamin D'], correct: 0, explanation: 'Patients are volume depleted; rehydration improves renal calcium excretion.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'endo-hypo-1', system: S,
    title: 'Hypoglycaemia',
    objectives: [
      'Recognise autonomic and neuroglycopenic symptoms',
      'Describe immediate treatment in conscious and unconscious patients',
      'List causes beyond diabetes treatment',
    ],
    coreContent: `Hypoglycaemia is a low blood glucose that causes symptoms or risk of harm. In people treated for diabetes, a glucose below 4.0 mmol/L (72 mg/dL) is commonly used as the alert threshold, and below 3.0 mmol/L (54 mg/dL) is clinically significant.

Symptoms come in two groups:
- Autonomic: sweating, tremor, palpitations, hunger, anxiety.
- Neuroglycopenic: confusion, behaviour change, slurred speech, focal deficits, seizures, coma.

Repeated episodes can blunt the warning symptoms ("impaired awareness of hypoglycaemia").

Treatment: a conscious patient who can swallow takes fast-acting carbohydrate, then a longer-acting carbohydrate once recovered. An unconscious or unsafe patient needs intravenous glucose or glucagon. Always check glucose in anyone with altered consciousness, seizures or a stroke-like presentation.

In diabetes, insulin and sulfonylureas are the main causes; kidney impairment, missed meals, exercise and alcohol add risk. Outside diabetes, consider alcohol, liver failure, adrenal insufficiency, sepsis, insulinoma, factitious insulin use and post-bariatric surgery hypoglycaemia.`,
    keyConcepts: [
      'Check capillary glucose in every patient with altered consciousness',
      'Sulfonylurea-induced hypoglycaemia can recur for many hours',
      'Impaired awareness increases the risk of severe episodes',
    ],
    clinicalPearls: [
      'Hypoglycaemia can mimic stroke with focal weakness',
      'Glucagon is less effective in alcohol-related or starvation hypoglycaemia because glycogen stores are depleted',
    ],
    sources: [web('JBDS: The hospital management of hypoglycaemia in adults with diabetes mellitus', 'https://abcd.care/joint-british-diabetes-societies-jbds-inpatient-care-group'), pm('ADA Standards of Care in Diabetes 2025 Glycemic Goals and Hypoglycemia')],
    questions: [
      { stem: 'Which symptom is neuroglycopenic rather than autonomic?', options: ['Confusion', 'Sweating', 'Tremor', 'Palpitations'], correct: 0, explanation: 'Neuroglycopenic symptoms reflect brain glucose deprivation.', difficulty: 'Foundational' },
      { stem: 'An unconscious patient with hypoglycaemia should receive:', options: ['Intravenous glucose or glucagon', 'Oral glucose tablets', 'Insulin', 'Observation only'], correct: 0, explanation: 'Oral treatment is unsafe when the airway is not protected.', difficulty: 'Foundational' },
      { stem: 'Why does sulfonylurea-induced hypoglycaemia need prolonged monitoring?', options: ['It can recur for many hours', 'It resolves within minutes', 'It never recurs', 'Glucose rises spontaneously'], correct: 0, explanation: 'Long-acting insulin secretion continues; recurrence is common, especially with kidney impairment.', difficulty: 'Intermediate' },
      { stem: 'Glucagon is less effective in hypoglycaemia caused by:', options: ['Alcohol or starvation', 'Insulin overdose in a fed patient', 'Exercise in a well-nourished patient', 'Missed meal in type 1 diabetes'], correct: 0, explanation: 'Glucagon releases glycogen; depleted stores limit its effect.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'endo-pituitary-1', system: S,
    title: 'Pituitary Disorders — Too Much, Too Little, Mass Effect',
    objectives: [
      'Describe the three ways a pituitary lesion presents',
      'Recognise prolactinoma and acromegaly',
      'Identify pituitary apoplexy as an emergency',
    ],
    coreContent: `Pituitary lesions, mostly benign adenomas, present in three ways:
- Hormone excess: prolactin (prolactinoma), growth hormone (acromegaly), ACTH (Cushing disease), and rarely TSH.
- Hormone deficiency (hypopituitarism): from compression of normal tissue. ACTH deficiency is the most dangerous because it can cause adrenal crisis.
- Mass effect: headache and visual field loss, classically bitemporal hemianopia from chiasm compression.

Prolactinoma causes menstrual disturbance, galactorrhoea and infertility in women and low libido and erectile dysfunction in men. Many drugs raise prolactin (antipsychotics, metoclopramide), as does hypothyroidism and pregnancy. Prolactinomas are usually treated medically.

Acromegaly causes enlarging hands, feet and jaw, coarse features, sweating, sleep apnoea, hypertension and diabetes. It is screened for with IGF-1.

Pituitary apoplexy is haemorrhage or infarction of a pituitary tumour: sudden severe headache, visual loss, ophthalmoplegia and reduced consciousness. It needs urgent steroid cover and neurosurgical and endocrine assessment.`,
    keyConcepts: [
      'Bitemporal hemianopia suggests a lesion at the optic chiasm',
      'Check for adrenal and thyroid deficiency in any pituitary mass',
      'Replace cortisol before thyroxine in combined deficiency',
    ],
    clinicalPearls: [
      'Sudden "thunderclap" headache with visual loss: think pituitary apoplexy as well as subarachnoid haemorrhage',
      'A mildly raised prolactin with a large tumour may reflect stalk compression rather than prolactinoma',
    ],
    sources: [pm('Hormonal Replacement in Hypopituitarism in Adults: An Endocrine Society Clinical Practice Guideline 2016'), pm('UK guidelines for the management of pituitary apoplexy. Clin Endocrinol 2011')],
    questions: [
      { stem: 'A pituitary macroadenoma compressing the optic chiasm typically causes:', options: ['Bitemporal hemianopia', 'Homonymous hemianopia', 'Central scotoma in one eye', 'Complete blindness in one eye'], correct: 0, explanation: 'Crossing nasal fibres at the chiasm carry temporal fields.', difficulty: 'Foundational' },
      { stem: 'Which deficiency in hypopituitarism is most immediately dangerous?', options: ['ACTH deficiency', 'Growth hormone deficiency', 'Gonadotrophin deficiency', 'Prolactin deficiency'], correct: 0, explanation: 'ACTH deficiency causes cortisol deficiency and risk of adrenal crisis.', difficulty: 'Intermediate' },
      { stem: 'Which test screens for acromegaly?', options: ['IGF-1', 'Prolactin', 'TSH', 'Cortisol'], correct: 0, explanation: 'IGF-1 reflects integrated growth hormone secretion.', difficulty: 'Intermediate' },
      { stem: 'Sudden severe headache, visual loss and ophthalmoplegia in a patient with a pituitary tumour suggest:', options: ['Pituitary apoplexy', 'Migraine', 'Prolactinoma flare', 'Tension headache'], correct: 0, explanation: 'Apoplexy is haemorrhage or infarction of the tumour and needs urgent steroids and specialist care.', difficulty: 'Foundational' },
    ],
  },
];
