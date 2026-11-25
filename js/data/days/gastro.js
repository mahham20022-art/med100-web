import { nice, pm, web } from './_src.js';
const S = 'Gastroenterology';

export default [
  {
    topicId: 'gi-ugib-1', system: S,
    title: 'Upper Gastrointestinal Bleeding',
    objectives: [
      'Recognise the presentations of upper GI bleeding',
      'Use risk scores to identify low-risk patients',
      'Describe the priorities of resuscitation and endoscopy',
    ],
    coreContent: `Upper gastrointestinal bleeding (UGIB) arises proximal to the ligament of Treitz. It presents as haematemesis (fresh blood or "coffee grounds"), melaena (black, tarry stool) or, with brisk bleeding, fresh blood per rectum with haemodynamic compromise.

Common causes: peptic ulcer disease, oesophagitis, gastritis, varices (in liver disease), Mallory–Weiss tears and malignancy.

Approach:
- Resuscitate: airway, large-bore access, blood transfusion with a restrictive threshold in most patients, correction of coagulopathy where appropriate.
- Risk-stratify: the Glasgow–Blatchford score identifies very low-risk patients who may be managed as outpatients; the Rockall score adds endoscopic findings.
- Endoscopy within 24 hours for most admitted patients, sooner when unstable.
- In suspected variceal bleeding, add vasoactive drugs and antibiotic prophylaxis per guidelines.

Review anticoagulants, antiplatelets and NSAIDs. Test for and treat Helicobacter pylori after ulcer bleeding.`,
    keyConcepts: [
      'Melaena indicates blood that has passed through the gut; usually an upper source',
      'A raised urea relative to creatinine supports upper GI bleeding',
      'Variceal bleeding needs a different bundle of care',
    ],
    clinicalPearls: [
      'Tachycardia can be masked by beta-blockers; look at the whole picture',
      'Liberal transfusion can increase portal pressure and re-bleeding in variceal haemorrhage',
    ],
    sources: [nice('cg141', 'Acute upper gastrointestinal bleeding in over 16s: management'), pm('Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage: ESGE Guideline Update 2021')],
    questions: [
      { stem: 'Black, tarry stool is called:', options: ['Melaena', 'Haematochezia', 'Steatorrhoea', 'Haematemesis'], correct: 0, explanation: 'Melaena results from digested blood and usually indicates an upper GI source.', difficulty: 'Foundational' },
      { stem: 'Which score identifies very low-risk UGIB patients before endoscopy?', options: ['Glasgow–Blatchford score', 'CURB-65', 'Wells score', 'GCS'], correct: 0, explanation: 'A very low Glasgow–Blatchford score can support outpatient management.', difficulty: 'Intermediate' },
      { stem: 'After a bleeding peptic ulcer, which infection should be tested for?', options: ['Helicobacter pylori', 'Hepatitis A', 'Clostridioides difficile', 'Giardia'], correct: 0, explanation: 'Eradicating H. pylori reduces ulcer recurrence and re-bleeding.', difficulty: 'Foundational' },
      { stem: 'In suspected variceal bleeding, management includes:', options: ['Vasoactive drugs and antibiotic prophylaxis alongside endoscopy', 'Delaying endoscopy for a week', 'Liberal transfusion to high haemoglobin', 'NSAIDs for pain'], correct: 0, explanation: 'Variceal bleeding has a specific care bundle including vasoactive therapy and antibiotics.', difficulty: 'Advanced' },
    ],
  },
  {
    topicId: 'gi-pud-1', system: S,
    title: 'Dyspepsia, Peptic Ulcer and Helicobacter pylori',
    objectives: [
      'Identify the main causes of peptic ulcer disease',
      'List alarm features that require endoscopy',
      'Describe how H. pylori is diagnosed',
    ],
    coreContent: `Dyspepsia is upper abdominal pain or discomfort, often with bloating, early satiety or nausea. Most cases are functional, but peptic ulcer disease and, less commonly, cancer must be considered.

The two main causes of peptic ulcer are:
- Helicobacter pylori infection
- NSAIDs and aspirin
Others include smoking, other ulcerogenic drugs, and rarely gastrinoma.

Alarm features that call for urgent endoscopy include GI bleeding, dysphagia, persistent vomiting, unintended weight loss, an upper abdominal mass and iron deficiency anaemia, with age thresholds set by local guidance.

H. pylori testing uses the urea breath test or stool antigen test. Proton pump inhibitors (and recent antibiotics) can cause false negatives, so they should be stopped for a period before testing. Treatment combines acid suppression with antibiotics, guided by local resistance patterns, and success should be confirmed in selected patients.

Complications of ulcers include bleeding, perforation (sudden severe pain with peritonism) and gastric outlet obstruction.`,
    keyConcepts: [
      'H. pylori and NSAIDs cause most ulcers',
      'PPIs suppress H. pylori and cause false-negative tests',
      'Alarm features change the approach from empirical treatment to endoscopy',
    ],
    clinicalPearls: [
      'Sudden severe epigastric pain with a rigid abdomen: think perforated ulcer and look for free air',
      'H. pylori is associated with gastric cancer and MALT lymphoma',
    ],
    sources: [nice('cg184', 'Gastro-oesophageal reflux disease and dyspepsia in adults: investigation and management'), pm('Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report. Gut 2022')],
    questions: [
      { stem: 'The two commonest causes of peptic ulcer disease are:', options: ['H. pylori and NSAIDs', 'Stress and spicy food', 'Gastrinoma and alcohol', 'Viral infection and caffeine'], correct: 0, explanation: 'H. pylori and NSAID/aspirin use account for most ulcers.', difficulty: 'Foundational' },
      { stem: 'Why should PPIs be stopped before an H. pylori breath test?', options: ['They can cause false-negative results', 'They cause false-positive results', 'They increase urease activity', 'They have no effect on the test'], correct: 0, explanation: 'PPIs suppress the organism and reduce urease activity.', difficulty: 'Intermediate' },
      { stem: 'Which is an alarm feature in dyspepsia?', options: ['Dysphagia', 'Mild bloating after large meals', 'Occasional heartburn', 'Burping'], correct: 0, explanation: 'Dysphagia, bleeding, weight loss and anaemia need endoscopy.', difficulty: 'Foundational' },
      { stem: 'Sudden severe epigastric pain with a rigid abdomen in a patient taking NSAIDs suggests:', options: ['Perforated peptic ulcer', 'Functional dyspepsia', 'Biliary colic', 'Gastroenteritis'], correct: 0, explanation: 'Perforation causes chemical peritonitis and needs urgent surgical assessment.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'gi-pancreatitis-1', system: S,
    title: 'Acute Pancreatitis',
    objectives: [
      'Apply the diagnostic criteria for acute pancreatitis',
      'Name the common causes',
      'Describe early management principles and severity markers',
    ],
    coreContent: `Acute pancreatitis is acute inflammation of the pancreas. Diagnosis requires two of three (revised Atlanta classification):
- typical abdominal pain (epigastric, often radiating to the back)
- serum lipase or amylase at least three times the upper limit of normal
- characteristic imaging findings

Gallstones and alcohol cause most cases. Others: hypertriglyceridaemia, hypercalcaemia, ERCP, drugs, trauma, autoimmune disease, infection and tumours.

Severity is classified by organ failure and local complications:
- Mild: no organ failure or complications.
- Moderately severe: transient organ failure (under 48 hours) or local complications.
- Severe: persistent organ failure beyond 48 hours.

Early management is supportive: careful fluid resuscitation (avoiding both under- and over-filling), analgesia, early oral or enteral feeding as tolerated, and monitoring for organ failure. Ultrasound looks for gallstones. CT is not needed for diagnosis when the picture is clear; it is used later if complications are suspected. Gallstone pancreatitis needs plans for cholecystectomy to prevent recurrence.`,
    keyConcepts: [
      'The degree of lipase rise does not predict severity',
      'Persistent organ failure defines severe pancreatitis',
      'Routine prophylactic antibiotics are not recommended',
    ],
    clinicalPearls: [
      'Check triglycerides and calcium when gallstones and alcohol are absent',
      'Early CT can underestimate necrosis; reserve it for diagnostic doubt or deterioration',
    ],
    sources: [pm('Banks PA et al. Classification of acute pancreatitis 2012: revision of the Atlanta classification. Gut 2013'), nice('ng104', 'Pancreatitis'), pm('American College of Gastroenterology Guidelines: Management of Acute Pancreatitis 2024')],
    questions: [
      { stem: 'Diagnosis of acute pancreatitis requires:', options: ['Two of: typical pain, lipase/amylase ≥3× normal, characteristic imaging', 'CT in every case', 'A lipase level only', 'Jaundice and fever'], correct: 0, explanation: 'Revised Atlanta criteria require two of the three features.', difficulty: 'Foundational' },
      { stem: 'The two commonest causes of acute pancreatitis are:', options: ['Gallstones and alcohol', 'Mumps and trauma', 'Drugs and hypothermia', 'Scorpion venom and ERCP'], correct: 0, explanation: 'Gallstones and alcohol account for most cases.', difficulty: 'Foundational' },
      { stem: 'Severe acute pancreatitis is defined by:', options: ['Organ failure persisting more than 48 hours', 'Lipase more than 10 times normal', 'Pain lasting a week', 'Any fluid collection'], correct: 0, explanation: 'Persistent organ failure is the defining feature of severe disease.', difficulty: 'Intermediate' },
      { stem: 'Which metabolic cause should be checked when gallstones and alcohol are absent?', options: ['Hypertriglyceridaemia', 'Hypokalaemia', 'Hypoglycaemia', 'Hyponatraemia'], correct: 0, explanation: 'Very high triglycerides and hypercalcaemia are recognised causes.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'gi-cirrhosis-1', system: S,
    title: 'Cirrhosis and Its Complications',
    objectives: [
      'Describe the main causes of cirrhosis',
      'Explain portal hypertension and its consequences',
      'Recognise decompensation: ascites, variceal bleeding, encephalopathy, jaundice',
    ],
    coreContent: `Cirrhosis is advanced liver fibrosis with distorted architecture and regenerative nodules. Major causes are alcohol, metabolic dysfunction-associated steatotic liver disease (MASLD), chronic hepatitis B and C, autoimmune and cholestatic diseases, and haemochromatosis.

Compensated cirrhosis may cause no symptoms. Decompensation is marked by:
- Ascites: from portal hypertension and sodium retention. Diagnostic paracentesis is needed in new ascites and in any patient with ascites who deteriorates, to exclude spontaneous bacterial peritonitis (SBP).
- Variceal bleeding: a medical emergency.
- Hepatic encephalopathy: confusion, altered sleep, asterixis; often triggered by infection, bleeding, constipation, electrolyte disturbance or sedatives.
- Jaundice.

Other complications include hepatorenal syndrome, hepatocellular carcinoma (surveillance with ultrasound in at-risk patients), malnutrition and sarcopenia.

Severity is assessed with Child–Pugh and MELD scores. Removing the cause (stopping alcohol, treating viral hepatitis) can stabilise or improve disease. Transplant referral is considered in decompensated disease.`,
    keyConcepts: [
      'Always tap new ascites and look for SBP when a cirrhotic patient deteriorates',
      'Find the precipitant in hepatic encephalopathy',
      'Avoid NSAIDs in cirrhosis because of kidney injury risk',
    ],
    clinicalPearls: [
      'SBP may present only with confusion or worsening kidney function, without abdominal pain',
      'Hepatocellular carcinoma surveillance is advised in cirrhosis',
    ],
    sources: [pm('EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis. J Hepatol 2018'), nice('ng50', 'Cirrhosis in over 16s: assessment and management')],
    questions: [
      { stem: 'A patient with cirrhosis and ascites becomes confused. Which test is essential?', options: ['Diagnostic paracentesis to look for SBP', 'Lumbar puncture in all cases', 'Upper GI barium study', 'Thyroid ultrasound'], correct: 0, explanation: 'SBP is common, often subtle, and treatable.', difficulty: 'Intermediate' },
      { stem: 'Which is a common precipitant of hepatic encephalopathy?', options: ['Constipation', 'High-fibre diet', 'Regular exercise', 'Vitamin D supplement'], correct: 0, explanation: 'Constipation, infection, GI bleeding and sedatives commonly precipitate encephalopathy.', difficulty: 'Foundational' },
      { stem: 'Ascites in cirrhosis is mainly caused by:', options: ['Portal hypertension with sodium retention', 'Right heart failure only', 'Peritoneal cancer only', 'Excess dietary water'], correct: 0, explanation: 'Portal hypertension and splanchnic vasodilation activate sodium-retaining systems.', difficulty: 'Foundational' },
      { stem: 'Which drug class should generally be avoided in cirrhosis?', options: ['NSAIDs', 'Lactulose', 'Vitamins', 'Proton pump inhibitors in every case'], correct: 0, explanation: 'NSAIDs increase the risk of kidney injury and bleeding.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'gi-hepatitis-1', system: S,
    title: 'Viral Hepatitis B and C',
    objectives: [
      'Interpret the basic hepatitis B serology markers',
      'Describe the natural history of hepatitis C',
      'Explain why testing matters for cirrhosis and cancer prevention',
    ],
    coreContent: `Hepatitis B (HBV) and hepatitis C (HCV) are blood-borne viruses that cause chronic liver disease, cirrhosis and hepatocellular carcinoma.

Hepatitis B serology:
- HBsAg positive: current infection (acute or chronic; chronic if over 6 months).
- Anti-HBc positive: past or current infection.
- Anti-HBs positive alone: immunity from vaccination.
- Anti-HBs and anti-HBc positive: resolved past infection.
Chronic HBV is more likely when infection is acquired at birth or in early childhood. Perinatal transmission is prevented by vaccinating the baby at birth (with immunoglobulin where indicated) and antiviral treatment in pregnancy for mothers with high viral load.

Hepatitis C: most acute infections are asymptomatic and many become chronic. Transmission is mainly through blood (injecting drug use, unsafe medical procedures, transfusion before screening). Screening uses an antibody test; current infection is confirmed by HCV RNA or core antigen. Direct-acting antivirals cure the large majority of patients with short courses.

Both infections may be silent for decades. Testing at-risk groups finds people before cirrhosis develops.`,
    keyConcepts: [
      'HBsAg means current infection; anti-HBs means immunity',
      'A positive HCV antibody needs RNA testing to confirm active infection',
      'HCV is curable; HBV is controllable',
    ],
    clinicalPearls: [
      'Screen for HBV before chemotherapy or rituximab: reactivation can be fatal',
      'Hepatitis B vaccination of healthcare workers is standard',
    ],
    sources: [web('WHO Guidelines for the prevention, diagnosis, care and treatment for people with chronic hepatitis B infection (2024)', 'https://www.who.int/publications/i/item/9789240090903'), pm('EASL recommendations on treatment of hepatitis C: Final update of the series. J Hepatol 2020')],
    questions: [
      { stem: 'Anti-HBs positive with negative HBsAg and negative anti-HBc indicates:', options: ['Immunity from vaccination', 'Chronic hepatitis B', 'Acute hepatitis B', 'Resolved infection'], correct: 0, explanation: 'Vaccine induces only anti-HBs; anti-HBc indicates natural infection.', difficulty: 'Intermediate' },
      { stem: 'A positive hepatitis C antibody test should be followed by:', options: ['HCV RNA testing', 'Immediate liver biopsy', 'No further tests', 'Hepatitis A serology only'], correct: 0, explanation: 'Antibody may persist after clearance; RNA confirms current infection.', difficulty: 'Foundational' },
      { stem: 'Before starting rituximab, patients should be screened for:', options: ['Hepatitis B', 'Hepatitis E', 'Rotavirus', 'Rubella'], correct: 0, explanation: 'B-cell depletion can cause severe HBV reactivation.', difficulty: 'Advanced' },
      { stem: 'Which statement about chronic hepatitis C is correct?', options: ['Direct-acting antivirals cure most patients', 'It cannot be treated', 'It is spread mainly by coughing', 'It always causes symptoms early'], correct: 0, explanation: 'Modern DAAs achieve sustained virological response in the large majority.', difficulty: 'Foundational' },
    ],
  },
  {
    topicId: 'gi-coeliac-1', system: S,
    title: 'Coeliac Disease',
    objectives: [
      'Recognise typical and atypical presentations',
      'Describe serological testing and why gluten must be continued before testing',
      'List complications of untreated disease',
    ],
    coreContent: `Coeliac disease is an immune-mediated enteropathy triggered by gluten in genetically susceptible people (HLA-DQ2/DQ8). It damages the small intestinal mucosa (villous atrophy).

Presentations range widely:
- Gastrointestinal: diarrhoea, bloating, abdominal pain, weight loss.
- Non-gastrointestinal: iron deficiency anaemia, fatigue, osteoporosis, raised liver enzymes, infertility, dermatitis herpetiformis, peripheral neuropathy or ataxia.
- Silent: found through screening of high-risk groups (type 1 diabetes, autoimmune thyroid disease, first-degree relatives, Down syndrome).

First-line testing is IgA tissue transglutaminase antibody (tTG) with total IgA (IgA deficiency gives false negatives). Testing is only reliable if the patient is eating gluten. Duodenal biopsy confirms the diagnosis in most adults.

Treatment is a lifelong strict gluten-free diet with dietitian support. Untreated disease is associated with nutritional deficiency, osteoporosis and a small increased risk of small bowel lymphoma.`,
    keyConcepts: [
      'Check total IgA with tTG serology',
      'A gluten-free diet before testing causes false negatives',
      'Iron deficiency without a clear cause should prompt coeliac testing',
    ],
    clinicalPearls: [
      'Dermatitis herpetiformis is an itchy blistering rash on extensor surfaces and is the skin form of coeliac disease',
      'Persistent symptoms on a "gluten-free" diet are most often due to ongoing gluten exposure',
    ],
    sources: [nice('ng20', 'Coeliac disease: recognition, assessment and management'), pm('British Society of Gastroenterology guidelines on the diagnosis and management of coeliac disease. Gut 2014')],
    questions: [
      { stem: 'First-line serological test for coeliac disease is:', options: ['IgA tissue transglutaminase with total IgA', 'Anti-nuclear antibody', 'Rheumatoid factor', 'Faecal calprotectin alone'], correct: 0, explanation: 'IgA tTG is sensitive; total IgA identifies IgA deficiency causing false negatives.', difficulty: 'Foundational' },
      { stem: 'Why must patients continue eating gluten before coeliac testing?', options: ['Antibodies and mucosal changes may resolve on a gluten-free diet', 'Gluten improves test sensitivity for other diseases', 'It prevents anaemia', 'It is not necessary'], correct: 0, explanation: 'Withdrawing gluten causes false-negative serology and biopsy.', difficulty: 'Intermediate' },
      { stem: 'Which skin condition is associated with coeliac disease?', options: ['Dermatitis herpetiformis', 'Psoriasis', 'Acne vulgaris', 'Vitiligo only'], correct: 0, explanation: 'DH is a blistering rash caused by gluten sensitivity.', difficulty: 'Foundational' },
      { stem: 'Which group should be offered coeliac testing?', options: ['People with type 1 diabetes', 'People with seasonal allergies', 'People with tension headache', 'People with myopia'], correct: 0, explanation: 'Autoimmune conditions such as type 1 diabetes and thyroid disease increase risk.', difficulty: 'Intermediate' },
    ],
  },
  {
    topicId: 'gi-crc-1', system: S,
    title: 'Colorectal Cancer — Symptoms and Screening',
    objectives: [
      'Recognise symptoms that should prompt colorectal cancer investigation',
      'Explain the role of faecal immunochemical testing',
      'Describe the adenoma–carcinoma sequence as the basis of screening',
    ],
    coreContent: `Colorectal cancer (CRC) is one of the commonest cancers worldwide. Most develop from adenomatous polyps over years (the adenoma–carcinoma sequence), which is why screening and polyp removal reduce both incidence and mortality.

Symptoms that should prompt investigation include change in bowel habit, rectal bleeding, iron deficiency anaemia, unexplained weight loss, abdominal or rectal mass and abdominal pain. Right-sided tumours often present with anaemia; left-sided and rectal tumours more often with bleeding or change in bowel habit.

Faecal immunochemical testing (FIT) detects human haemoglobin in stool. It is used in population screening programmes and, in some health systems, to triage symptomatic patients. Colonoscopy is the definitive test, allowing biopsy and polyp removal; CT colonography is an alternative in some patients.

Risk factors include age, family history, inflammatory bowel disease, inherited syndromes (Lynch syndrome, familial adenomatous polyposis), obesity, smoking, alcohol, red and processed meat, and low physical activity. Rising incidence in younger adults is recognised internationally.`,
    keyConcepts: [
      'Unexplained iron deficiency anaemia in an adult needs lower and upper GI evaluation',
      'Screening finds and removes precancerous polyps',
      'Strong family history may require earlier colonoscopic surveillance',
    ],
    clinicalPearls: [
      'Do not attribute rectal bleeding to haemorrhoids without considering cancer in at-risk patients',
      'Lynch syndrome also raises the risk of endometrial and other cancers',
    ],
    sources: [nice('ng12', 'Suspected cancer: recognition and referral'), nice('dg56', 'Quantitative faecal immunochemical testing to guide colorectal cancer pathway referral in primary care'), web('WHO/IARC: Colorectal cancer fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/colorectal-cancer')],
    questions: [
      { stem: 'Most colorectal cancers develop from:', options: ['Adenomatous polyps', 'Hyperplastic haemorrhoids', 'Anal fissures', 'Diverticula'], correct: 0, explanation: 'The adenoma–carcinoma sequence is the basis of screening.', difficulty: 'Foundational' },
      { stem: 'Right-sided colon cancer commonly presents with:', options: ['Iron deficiency anaemia', 'Bright red rectal bleeding only', 'Tenesmus', 'Pencil-thin stools'], correct: 0, explanation: 'Occult bleeding from the right colon often causes anaemia without visible blood.', difficulty: 'Intermediate' },
      { stem: 'Faecal immunochemical testing detects:', options: ['Human haemoglobin in stool', 'Fat in stool', 'Bacterial DNA only', 'Parasites'], correct: 0, explanation: 'FIT is specific for human globin and used in screening and triage.', difficulty: 'Foundational' },
      { stem: 'Which inherited condition increases colorectal and endometrial cancer risk?', options: ['Lynch syndrome', 'Marfan syndrome', 'Gilbert syndrome', 'Turner syndrome'], correct: 0, explanation: 'Lynch syndrome is a mismatch repair defect causing multiple cancer risks.', difficulty: 'Advanced' },
    ],
  },
];
