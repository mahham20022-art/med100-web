// "Go further" links from a Med100 day to The Tract's own tools and guides:
// ICUCalc score pages, Fever Compass cause pages, Montage lessons, guides
// and topic hubs. Only links that exist; each one is checked at build time
// against the host's sitemap by hand when this list changes.
const T = 'https://thetract.org', IC = 'https://icucalc.thetract.org/scores', FV = 'https://fever.thetract.org/causes', EEG = 'https://learneeg.thetract.org/lessons';
const ic = (slug, name) => ({ label: `${name} calculator`, kind: 'ICUCalc', url: `${IC}/${slug}/` });
const fv = (slug, name) => ({ label: `${name} as a cause of fever`, kind: 'Fever Compass', url: `${FV}/${slug}/` });
const eeg = (slug, name) => ({ label: name, kind: 'Montage · EEG', url: `${EEG}/${slug}/` });
const tr = (path, name, kind = 'The Tract') => ({ label: name, kind, url: `${T}${path}` });

export const RELATED = {
  'cardio-hf-1': [],
  'cardio-acs-1': [ic('heart-score', 'HEART score'), ic('timi', 'TIMI')],
  'cardio-af-1': [ic('cha2ds2-vasc', 'CHA₂DS₂-VASc'), ic('has-bled', 'HAS-BLED')],
  'cardio-pericard-1': [],
  'pulm-pe-1': [ic('wells', 'Wells (PE)'), fv('venous-thromboembolism', 'Venous thromboembolism')],
  'heme-vte-1': [ic('padua-vte', 'Padua VTE'), ic('wells', 'Wells (PE)')],
  'id-sepsis-1': [ic('qsofa', 'qSOFA'), ic('sofa', 'SOFA'), tr('', 'Fever Compass', 'Fever Compass')].map((x) => x.label === 'Fever Compass' ? { ...x, url: 'https://fever.thetract.org/' } : x),
  'id-cap-1': [ic('curb-65', 'CURB-65'), fv('pneumonia', 'Pneumonia')],
  'id-uti-1': [fv('urinary-tract-infection-or-pyelonephritis', 'UTI and pyelonephritis')],
  'id-tb-1': [fv('tuberculosis', 'Tuberculosis')],
  'id-ie-1': [ic('duke-iscvid-2023', 'Duke-ISCVID 2023'), fv('infective-endocarditis', 'Infective endocarditis')],
  'id-malaria-1': [fv('malaria', 'Malaria'), fv('dengue', 'Dengue')],
  'id-meningitis-1': [fv('meningitis-or-encephalitis', 'Meningitis or encephalitis'), tr('/topics/infection/', 'Neurological infection', 'Topic hub')],
  'em-shock-1': [ic('sofa', 'SOFA'), ic('apache-ii', 'APACHE II')],
  'em-ards-1': [ic('murray-lung-injury-score', 'Murray Lung Injury Score')],
  'em-heat-1': [fv('heatstroke', 'Heatstroke')],
  'em-tox-1': [fv('serotonin-toxicity', 'Serotonin toxicity'), fv('neuroleptic-malignant-syndrome', 'Neuroleptic malignant syndrome')],
  'em-tbi-1': [ic('gcs', 'Glasgow Coma Scale'), tr('/neurocritical/', 'Neurocritical Guide (free PDF)')],
  'em-coma-1': [ic('gcs', 'Glasgow Coma Scale'), eeg('coma-brain-death-and-mimics', 'EEG in coma, brain death and mimics'), tr('/neurocritical/', 'Neurocritical Guide (free PDF)')],
  'em-arrest-1': [eeg('coma-brain-death-and-mimics', 'EEG after cardiac arrest: coma and prognosis')],
  'endo-adrenal-1': [fv('adrenal-crisis', 'Adrenal crisis')],
  'endo-thyroid-1': [fv('thyroid-storm', 'Thyroid storm')],
  'gi-pancreatitis-1': [fv('acute-pancreatitis', 'Acute pancreatitis')],
  'gi-cirrhosis-1': [ic('child-pugh', 'Child-Pugh')],
  'rheum-gout-1': [fv('gout-or-pseudogout', 'Gout or pseudogout')],
  'rheum-hotjoint-1': [fv('septic-arthritis', 'Septic arthritis')],
  'heme-transfusion-1': [fv('transfusion-reaction', 'Transfusion reaction')],
  'heme-lymphoma-1': [fv('lymphoma-other-cancer-or-inflammatory-disease', 'Cancer and inflammatory causes')],
  'psych-delirium-1': [ic('cam-icu', 'CAM-ICU'), ic('rass', 'RASS'), tr('/guides/delirium/', 'Delirium guide', 'Guide')],
  'psych-etoh-1': [fv('alcohol-withdrawal', 'Alcohol withdrawal'), tr('/guides/alcohol-and-the-brain/', 'Alcohol and the brain', 'Guide')],
  'psych-nms-1': [fv('neuroleptic-malignant-syndrome', 'Neuroleptic malignant syndrome'), fv('serotonin-toxicity', 'Serotonin toxicity')],
  'neuro-stroke-1': [ic('nihss', 'NIHSS'), ic('ich-score', 'ICH score'), tr('/guides/stroke-syndromes/', 'Classical stroke syndromes', 'Guide'), tr('/topics/stroke/', 'Stroke', 'Topic hub')],
  'neuro-seizure-1': [{ label: 'Seizure Compass: seizure, functional event or syncope?', kind: 'Tool', url: 'https://compass.thetract.org/' }, tr('/seizures/', 'The Book of Seizures (free)'), eeg('epileptiform-discharges-and-seizures', 'Epileptiform discharges and seizures on EEG')],
  'neuro-se-1': [eeg('icu-eeg', 'ICU EEG and non-convulsive status'), tr('/seizures/', 'The Book of Seizures (free)'), tr('/topics/epilepsy/', 'Epilepsy', 'Topic hub')],
  'neuro-headache-1': [tr('/guides/headache/', 'Headache Decoded', 'Guide'), tr('/guides/trigeminal-atlas/', 'The Trigeminal Atlas', 'Guide'), tr('/topics/headache/', 'Headache', 'Topic hub')],
  'neuro-ms-1': [tr('/topics/ms-neuroimmunology/', 'MS and neuroimmunology', 'Topic hub')],
  'neuro-pd-1': [tr('/topics/movement-disorders/', 'Movement disorders', 'Topic hub')],
  'neuro-gbs-1': [tr('/topics/neuromuscular/', 'Neuromuscular disease', 'Topic hub')],
  'neuro-mg-1': [tr('/topics/neuromuscular/', 'Neuromuscular disease', 'Topic hub')],
  'neuro-dementia-1': [tr('/topics/dementia/', 'Dementia', 'Topic hub'), tr('/guides/mental-status-examination/', 'Mental status examination', 'Guide')],
  'neuro-cord-1': [tr('/topics/neuro-oncology/', 'Neuro-oncology', 'Topic hub')],
};
// Fever Compass is offline for review (26 Nov 2026): its links are dropped here until it returns.
const OFFLINE = new Set(['Fever Compass']);
export const relatedFor = (topicId) => (RELATED[topicId] || []).filter((r) => !OFFLINE.has(r.kind));
