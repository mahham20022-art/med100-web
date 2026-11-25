import { nice, pm, web } from './_src.js';
const S = 'Obstetrics/Gynecology';

export default [
  {
    topicId: 'obgyn-ectopic-1', system: S,
    title: 'Ectopic Pregnancy and Early Pregnancy Bleeding',
    objectives: [
      'Consider ectopic pregnancy in every woman of reproductive age with abdominal pain or bleeding',
      'Use pregnancy testing and transvaginal ultrasound in the assessment',
      'Recognise ruptured ectopic pregnancy as a surgical emergency',
    ],
    coreContent: `An ectopic pregnancy implants outside the uterine cavity, most often in the fallopian tube. It is a leading cause of early pregnancy death.

Symptoms: abdominal or pelvic pain, vaginal bleeding, amenorrhoea, shoulder-tip pain (from diaphragmatic irritation by blood), dizziness or collapse. Some women do not know they are pregnant, and symptoms can mimic gastroenteritis or a urinary infection.

Risk factors include previous ectopic, tubal damage (pelvic inflammatory disease, surgery), assisted reproduction, smoking and an intrauterine device in place at conception, but many have none.

Assessment:
- A pregnancy test for any woman of reproductive age with abdominal pain, bleeding or collapse.
- Transvaginal ultrasound to locate the pregnancy.
- Serial serum hCG when the location is unclear (pregnancy of unknown location).

Rupture with haemoperitoneum causes shock and needs immediate resuscitation and surgery. Stable ectopic pregnancies may be managed expectantly, medically or surgically depending on clinical features, hCG level and ultrasound findings.

Other causes of early pregnancy bleeding include miscarriage (threatened, inevitable, incomplete, complete, missed) and molar pregnancy.`,
    keyConcepts: [
      'Pregnancy test in every woman of reproductive age with abdominal pain or collapse',
      'An empty uterus with a positive test is ectopic until proven otherwise',
      'Shoulder-tip pain can signal intraperitoneal blood',
    ],
    clinicalPearls: [
      'Rhesus-negative women may need anti-D after certain early pregnancy events, per local guidance',
      'Diarrhoea and dizziness with a positive pregnancy test can be ectopic, not gastroenteritis',
    ],
    sources: [nice('ng126', 'Ectopic pregnancy and miscarriage: diagnosis and initial management'), web('RCOG Green-top Guideline No. 21: Diagnosis and Management of Ectopic Pregnancy', 'https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/')],
    questions: [
      { stem: 'A woman of reproductive age presents with abdominal pain and dizziness. The first essential test is:', options: ['Pregnancy test', 'Abdominal X-ray', 'Lipid profile', 'Thyroid function'], correct: 0, explanation: 'Ectopic pregnancy must be considered in all women of reproductive age.', difficulty: 'Foundational' },
      { stem: 'Shoulder-tip pain in suspected ectopic pregnancy suggests:', options: ['Intraperitoneal blood irritating the diaphragm', 'Musculoskeletal strain only', 'Gastric reflux', 'Pneumonia'], correct: 0, explanation: 'Blood in the peritoneum refers pain to the shoulder via the phrenic nerve.', difficulty: 'Intermediate' },
      { stem: 'The most common site of ectopic pregnancy is:', options: ['Fallopian tube', 'Ovary', 'Cervix', 'Abdominal cavity'], correct: 0, explanation: 'Most ectopic pregnancies are tubal.', difficulty: 'Foundational' },
      { stem: 'A positive pregnancy test with no intrauterine or extrauterine pregnancy seen on ultrasound is termed:', options: ['Pregnancy of unknown location', 'Complete miscarriage confirmed', 'Molar pregnancy', 'Normal pregnancy'], correct: 0, explanation: 'Serial hCG and follow-up are needed until location is established.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'obgyn-gdm-1', system: S,
    title: 'Gestational Diabetes',
    objectives: [
      'Define gestational diabetes and identify risk factors',
      'Describe the maternal and fetal risks',
      'Explain the importance of postnatal follow-up',
    ],
    coreContent: `Gestational diabetes mellitus (GDM) is hyperglycaemia first recognised in pregnancy that does not meet criteria for overt diabetes. Placental hormones increase insulin resistance, particularly in the second and third trimesters.

Risk factors include obesity, previous GDM, previous macrosomic baby, family history of diabetes, and ethnicity with high diabetes prevalence (including Middle Eastern, South Asian and African heritage). Diagnosis uses an oral glucose tolerance test, with criteria and timing that differ between guidelines (for example NICE versus WHO/IADPSG).

Risks of uncontrolled GDM:
- Fetal: macrosomia, shoulder dystocia, birth injury, neonatal hypoglycaemia, polyhydramnios, stillbirth.
- Maternal: pre-eclampsia, caesarean birth and a high lifetime risk of type 2 diabetes.

Management starts with diet and physical activity and glucose self-monitoring; medication is added when targets are not met. Babies are monitored for hypoglycaemia after birth.

After delivery, GDM usually resolves, but women need testing for persisting diabetes and regular long-term screening, as many develop type 2 diabetes later.`,
    keyConcepts: [
      'GDM increases future type 2 diabetes risk substantially',
      'Neonatal hypoglycaemia follows fetal hyperinsulinaemia',
      'Diagnostic criteria vary between guidelines',
    ],
    clinicalPearls: [
      'Pre-existing diabetes in pregnancy needs preconception care and higher-dose folic acid in many guidelines',
      'Glucose often normalises immediately after delivery of the placenta',
    ],
    sources: [nice('ng3', 'Diabetes in pregnancy: management from preconception to the postnatal period'), web('WHO: Diagnostic criteria and classification of hyperglycaemia first detected in pregnancy', 'https://www.who.int/publications/i/item/WHO-NMH-MND-13.2')],
    questions: [
      { stem: 'Which neonatal complication is associated with gestational diabetes?', options: ['Hypoglycaemia', 'Hyperglycaemia', 'Hypercalcaemia', 'Polycythaemia only'], correct: 0, explanation: 'Fetal hyperinsulinaemia persists briefly after birth, causing hypoglycaemia.', difficulty: 'Foundational' },
      { stem: 'Women with previous GDM have increased lifetime risk of:', options: ['Type 2 diabetes', 'Type 1 diabetes only', 'Hypothyroidism only', 'Gout'], correct: 0, explanation: 'GDM reveals underlying insulin resistance.', difficulty: 'Foundational' },
      { stem: 'The test used to diagnose gestational diabetes is:', options: ['Oral glucose tolerance test', 'Random urine glucose', 'Serum insulin', 'Thyroid function'], correct: 0, explanation: 'An OGTT is standard; criteria vary by guideline.', difficulty: 'Intermediate' },
      { stem: 'Why does insulin resistance increase in later pregnancy?', options: ['Placental hormones antagonise insulin', 'The pancreas stops working', 'Glucose absorption stops', 'Maternal weight decreases'], correct: 0, explanation: 'Placental lactogen and other hormones increase insulin resistance.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'obgyn-pph-1', system: S,
    title: 'Postpartum Haemorrhage',
    objectives: [
      'Define postpartum haemorrhage',
      'Use the "4 Ts" to identify causes',
      'Describe the principles of a coordinated emergency response',
    ],
    coreContent: `Postpartum haemorrhage (PPH) is a leading cause of maternal death worldwide. Primary PPH is commonly defined as blood loss of 500 mL or more within 24 hours of birth; secondary PPH occurs from 24 hours to 12 weeks.

Causes follow the "4 Ts":
- Tone: uterine atony, the commonest cause.
- Trauma: tears, uterine rupture, inversion.
- Tissue: retained placenta or membranes.
- Thrombin: coagulopathy.

Risk factors include prolonged labour, multiple pregnancy, macrosomia, polyhydramnios, previous PPH, placenta praevia or accreta and anaemia, but PPH often occurs in women without risk factors. Blood loss is frequently underestimated; measured loss and early warning scores help.

The response is coordinated and simultaneous: call for help, ABC resuscitation, uterine massage and uterotonic drugs, empty the bladder, examine for trauma and retained tissue, check clotting, give tranexamic acid early as recommended by WHO, and escalate to blood products and surgical measures as needed.

Prevention includes active management of the third stage of labour and treating anaemia during pregnancy.`,
    keyConcepts: [
      'Uterine atony causes most PPH',
      'Young healthy women compensate well; hypotension is a late sign',
      'Tranexamic acid works best when given early',
    ],
    clinicalPearls: [
      'Measure blood loss rather than estimate it',
      'Secondary PPH is often associated with infection or retained products',
    ],
    sources: [web('WHO recommendations for the prevention and treatment of postpartum haemorrhage', 'https://www.who.int/publications/i/item/9789240085398'), web('RCOG Green-top Guideline No. 52: Prevention and Management of Postpartum Haemorrhage', 'https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/'), pm('WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality in postpartum haemorrhage. Lancet 2017')],
    questions: [
      { stem: 'The most common cause of postpartum haemorrhage is:', options: ['Uterine atony', 'Coagulopathy', 'Uterine inversion', 'Retained membranes only'], correct: 0, explanation: '"Tone" is the leading cause among the 4 Ts.', difficulty: 'Foundational' },
      { stem: 'The "4 Ts" of PPH are:', options: ['Tone, Trauma, Tissue, Thrombin', 'Temperature, Tachycardia, Tachypnoea, Tension', 'Tumour, Toxin, Trauma, Thrombosis', 'Time, Test, Treat, Transfer'], correct: 0, explanation: 'This framework organises the search for the cause.', difficulty: 'Foundational' },
      { stem: 'Why can PPH be underestimated in young women?', options: ['They compensate well and hypotension appears late', 'They never bleed heavily', 'Blood loss is always measured accurately', 'Tachycardia is impossible'], correct: 0, explanation: 'Physiological compensation masks significant blood loss.', difficulty: 'Intermediate' },
      { stem: 'Tranexamic acid in PPH is most effective when given:', options: ['Early, within hours of birth', 'Only after 24 hours', 'Only after hysterectomy', 'Never'], correct: 0, explanation: 'WOMAN trial showed benefit, greatest with early administration.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'obgyn-aub-1', system: S,
    title: 'Abnormal Uterine Bleeding — PALM-COEIN',
    objectives: [
      'Use the PALM-COEIN classification',
      'Recognise when endometrial assessment is needed',
      'Always consider pregnancy',
    ],
    coreContent: `Abnormal uterine bleeding (AUB) describes bleeding that is abnormal in frequency, regularity, duration or volume, or that occurs between periods or after menopause.

The FIGO PALM-COEIN system classifies causes in non-pregnant women of reproductive age:
- Structural (PALM): Polyp, Adenomyosis, Leiomyoma (fibroids), Malignancy and hyperplasia.
- Non-structural (COEIN): Coagulopathy, Ovulatory dysfunction (for example PCOS, thyroid disease, hyperprolactinaemia), Endometrial, Iatrogenic (hormones, anticoagulants, IUDs), Not otherwise classified.

Assessment: always exclude pregnancy first. Take a history including bleeding pattern, impact on life, contraception, sexual history and family history of bleeding disorders. Check full blood count for anaemia. Pelvic examination and ultrasound assess for structural causes. Screen for a bleeding disorder if heavy bleeding has occurred since menarche.

Postmenopausal bleeding is endometrial cancer until proven otherwise and needs urgent assessment. Persistent intermenstrual or postcoital bleeding needs cervical assessment.`,
    keyConcepts: [
      'Exclude pregnancy first',
      'Postmenopausal bleeding needs urgent investigation',
      'Heavy menstrual bleeding is a common cause of iron deficiency',
    ],
    clinicalPearls: [
      'Heavy periods since menarche suggest a bleeding disorder such as von Willebrand disease',
      'Obesity and PCOS increase endometrial hyperplasia risk through unopposed oestrogen',
    ],
    sources: [pm('Munro MG et al. The two FIGO systems for normal and abnormal uterine bleeding symptoms and classification of causes. Int J Gynaecol Obstet 2018'), nice('ng88', 'Heavy menstrual bleeding: assessment and management'), nice('ng12', 'Suspected cancer: recognition and referral')],
    questions: [
      { stem: 'In PALM-COEIN, the "L" stands for:', options: ['Leiomyoma', 'Lymphoma', 'Lupus', 'Lichen sclerosus'], correct: 0, explanation: 'Leiomyomas (fibroids) are a structural cause.', difficulty: 'Foundational' },
      { stem: 'Bleeding in a postmenopausal woman should be investigated for:', options: ['Endometrial cancer', 'Normal ovulation', 'Dysmenorrhoea only', 'Urinary infection only'], correct: 0, explanation: 'Postmenopausal bleeding needs urgent endometrial assessment.', difficulty: 'Foundational' },
      { stem: 'Heavy menstrual bleeding since menarche suggests:', options: ['A bleeding disorder such as von Willebrand disease', 'Menopause', 'Ectopic pregnancy', 'Fibroids in every case'], correct: 0, explanation: 'Lifelong heavy bleeding prompts screening for coagulopathy.', difficulty: 'Intermediate' },
      { stem: 'The first step in assessing abnormal uterine bleeding in a reproductive-age woman is:', options: ['Exclude pregnancy', 'Hysterectomy', 'MRI pelvis', 'Start hormone therapy'], correct: 0, explanation: 'Pregnancy-related bleeding must be excluded first.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'obgyn-pcos-1', system: S,
    title: 'Polycystic Ovary Syndrome',
    objectives: [
      'Apply the diagnostic criteria for PCOS',
      'Exclude conditions that mimic PCOS',
      'Describe the long-term metabolic and endometrial risks',
    ],
    coreContent: `Polycystic ovary syndrome (PCOS) is one of the commonest endocrine conditions in women of reproductive age.

Diagnosis in adults (Rotterdam criteria, endorsed by the 2023 international guideline) requires two of three:
- ovulatory dysfunction (irregular or absent cycles)
- clinical or biochemical hyperandrogenism (hirsutism, acne, raised androgens)
- polycystic ovarian morphology on ultrasound (or raised AMH in adults)
after excluding other causes: thyroid disease, hyperprolactinaemia, non-classic congenital adrenal hyperplasia, Cushing syndrome and androgen-secreting tumours. Ultrasound is not used for diagnosis within eight years of menarche.

PCOS is associated with insulin resistance, obesity, type 2 diabetes, dyslipidaemia, sleep apnoea, depression and anxiety, and infertility. Chronic anovulation exposes the endometrium to unopposed oestrogen, increasing the risk of endometrial hyperplasia and cancer.

Management is tailored to the woman's goals: lifestyle measures, cycle regulation and endometrial protection, treatment of hirsutism and acne, fertility treatment, and screening for metabolic complications.`,
    keyConcepts: [
      'PCOS is a diagnosis of exclusion',
      'Rapidly progressive virilisation suggests an androgen-secreting tumour',
      'Regular withdrawal bleeds protect the endometrium',
    ],
    clinicalPearls: [
      'Screen for glucose intolerance and lipid abnormalities in women with PCOS',
      'Ask about mood and eating patterns; both are common concerns in PCOS',
    ],
    sources: [pm('Recommendations from the 2023 International Evidence-based Guideline for the Assessment and Management of Polycystic Ovary Syndrome'), pm('Rotterdam ESHRE/ASRM-Sponsored PCOS Consensus Workshop Group. Revised 2003 consensus on diagnostic criteria')],
    questions: [
      { stem: 'PCOS diagnosis in adults requires:', options: ['Two of: ovulatory dysfunction, hyperandrogenism, polycystic morphology (with exclusions)', 'All three features in every case', 'Ultrasound only', 'Raised prolactin'], correct: 0, explanation: 'Rotterdam criteria require two of three after excluding mimics.', difficulty: 'Foundational' },
      { stem: 'Why does PCOS increase endometrial cancer risk?', options: ['Chronic anovulation causes unopposed oestrogen exposure', 'High progesterone levels', 'Low insulin levels', 'Frequent ovulation'], correct: 0, explanation: 'Without ovulation there is no progesterone to oppose oestrogen.', difficulty: 'Intermediate' },
      { stem: 'Rapid-onset virilisation with deepening voice suggests:', options: ['An androgen-secreting tumour', 'Typical PCOS', 'Hypothyroidism', 'Pregnancy'], correct: 0, explanation: 'PCOS causes gradual changes; rapid virilisation needs urgent evaluation.', difficulty: 'Advanced' },
      { stem: 'Which metabolic condition is associated with PCOS?', options: ['Insulin resistance', 'Hyperthyroidism', 'Hypercalcaemia', 'Hypokalaemia'], correct: 0, explanation: 'Insulin resistance is a central feature in many women with PCOS.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'obgyn-cervix-1', system: S,
    title: 'Cervical Screening and HPV',
    objectives: [
      'Explain the role of high-risk HPV in cervical cancer',
      'Describe HPV-based primary screening',
      'Recognise symptoms that need investigation regardless of screening',
    ],
    coreContent: `Persistent infection with high-risk human papillomavirus (HPV), especially types 16 and 18, causes almost all cervical cancers. Most HPV infections clear spontaneously; persistence can lead to cervical intraepithelial neoplasia (CIN) and, over years, invasive cancer.

Prevention:
- HPV vaccination before exposure prevents infection with vaccine types. WHO now supports single-dose schedules for younger recipients.
- Screening detects precancer so it can be treated. Many programmes now use primary HPV testing, with cytology for those who test positive; self-sampling increases uptake.
- Treatment of high-grade CIN (for example by excision) prevents progression.

The WHO cervical cancer elimination strategy targets high vaccination coverage, high-performance screening coverage and treatment of precancer and cancer.

Screening is for people without symptoms. Postcoital bleeding, intermenstrual bleeding, persistent abnormal discharge or a visible cervical abnormality should be investigated directly, even if a recent screening test was normal.`,
    keyConcepts: [
      'HPV testing is more sensitive than cytology for detecting high-grade disease',
      'A normal screening test does not explain new symptoms',
      'Vaccination does not replace screening',
    ],
    clinicalPearls: [
      'Immunosuppressed women, including those with HIV, need more frequent screening',
      'HPV also causes oropharyngeal, anal, vulval, vaginal and penile cancers',
    ],
    sources: [web('WHO guideline for screening and treatment of cervical pre-cancer lesions (2nd edition, 2021)', 'https://www.who.int/publications/i/item/9789240030824'), web('WHO Global strategy to accelerate the elimination of cervical cancer', 'https://www.who.int/initiatives/cervical-cancer-elimination-initiative')],
    questions: [
      { stem: 'Almost all cervical cancers are caused by:', options: ['Persistent high-risk HPV infection', 'Herpes simplex virus', 'Chlamydia', 'Candida'], correct: 0, explanation: 'High-risk HPV, especially types 16 and 18, causes nearly all cervical cancers.', difficulty: 'Foundational' },
      { stem: 'Postcoital bleeding in a woman with a normal screening test six months ago should be:', options: ['Investigated with clinical assessment of the cervix', 'Ignored because screening was normal', 'Treated only with antibiotics', 'Rechecked in five years'], correct: 0, explanation: 'Screening is for asymptomatic people; symptoms need direct assessment.', difficulty: 'Intermediate' },
      { stem: 'Why is primary HPV testing used in many screening programmes?', options: ['It is more sensitive for high-grade lesions than cytology', 'It diagnoses cancer directly', 'It replaces vaccination', 'It is only used after cancer'], correct: 0, explanation: 'HPV testing detects more CIN2+ and allows longer safe intervals.', difficulty: 'Intermediate' },
      { stem: 'Which group needs more frequent cervical screening?', options: ['Women living with HIV', 'Women who have been vaccinated', 'Women over 70 with normal history', 'Women with asthma'], correct: 0, explanation: 'Immunosuppression increases persistence and progression of HPV.', difficulty: 'Advanced' },
    ],
  },
];
