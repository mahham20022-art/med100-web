// Static, crawlable pages for search engines: one page per day (days/<slug>/),
// an index (days/), sitemap.xml and robots.txt. The app itself is a hash-routed
// SPA, which search engines see as a single page. Run in CI before upload;
// output is git-ignored.  node scripts/seo/build.mjs
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { CURRICULUM, isReviewed, SOURCES_AS_OF } from '../../js/data/curriculum.js';
import { QUESTIONS_BY_TOPIC } from '../../js/data/questions.js';
import { relatedFor } from '../../js/data/days/related.js';

const BASE = 'https://med100.thetract.org';
const TODAY = new Date().toISOString().slice(0, 10);
const E = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = (s) => E(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, ' ').trim().replace(/[\s_-]+/g, '-').replace(/^-|-$/g, '');
export const slugOf = (d) => `day-${d.day}-${slugify(d.title.split(' — ')[0])}`;

function prose(text) {
  const out = []; let list = [], kind = null;
  const flush = () => { if (list.length) out.push(`<${kind}>${list.map((x) => `<li>${inline(x)}</li>`).join('')}</${kind}>`); list = []; kind = null; };
  for (const raw of text.split('\n')) {
    const s = raw.trim();
    if (!s) { flush(); continue; }
    const m = s.match(/^(\d+)\.\s+(.*)/);
    if (s.startsWith('- ')) { if (kind !== 'ul') { flush(); kind = 'ul'; } list.push(s.slice(2)); }
    else if (m) { if (kind !== 'ol') { flush(); kind = 'ol'; } list.push(m[2]); }
    else { flush(); out.push(`<p>${inline(s)}</p>`); }
  }
  flush(); return out.join('\n');
}

const CSS = `@font-face{font-family:Inter;src:url(__R__fonts/Inter-latin.woff2) format('woff2');font-weight:100 900;font-display:swap}
@font-face{font-family:InterD;src:url(__R__fonts/InterDisplay-SemiBold.woff);font-weight:600;font-display:swap}
*{box-sizing:border-box}body{margin:0;background:#FAF6EF;color:#161A22;font:17px/1.65 Inter,system-ui,sans-serif}
a{color:#161A22}header,main,footer{max-width:760px;margin:0 auto;padding:0 20px}
header{display:flex;align-items:center;gap:10px;padding-top:18px;padding-bottom:18px;border-bottom:1px solid #E6DED0}
.brand{display:flex;align-items:center;gap:9px;text-decoration:none;font:600 19px InterD,Inter,sans-serif}.brand i{font-style:normal;color:#D9452F}
.cta{margin-left:auto;background:#161A22;color:#FAF6EF;text-decoration:none;padding:9px 16px;border-radius:999px;font-weight:600;font-size:15px}
.eyebrow{font:600 12px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:#D9452F;margin:34px 0 10px}
.eyebrow span{color:#5B6170}h1{font:600 clamp(30px,6vw,44px)/1.1 InterD,Inter,sans-serif;letter-spacing:-.02em;margin:0 0 14px}
h2{font:600 22px/1.25 InterD,Inter,sans-serif;margin:34px 0 10px;padding-top:14px;border-top:1px solid #E6DED0}
.note{background:#FBEFD9;border-radius:12px;padding:12px 16px;font-size:15px;color:#5A4210}.note.ok{background:#E3F1E8;color:#1F5A37}
ul,ol{padding-left:22px}li{margin:4px 0}.q{background:#fff;border:1px solid #E6DED0;border-radius:12px;padding:14px 16px;margin:12px 0}
.q p{margin:0 0 8px;font-weight:600}.q ol{list-style:upper-alpha;margin:0 0 6px}details{font-size:15px;color:#3B4150}summary{cursor:pointer;color:#D9452F;font-weight:600}
.src li{font-size:15px}.open{display:inline-block;margin:28px 0 6px;background:#D9452F;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600}
.pn{display:flex;justify-content:space-between;gap:12px;margin:26px 0;font-size:15px}.pn a{text-decoration:none;max-width:48%}
.idx{list-style:none;padding:0}.idx li{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #E6DED0}.idx b{font:600 13px ui-monospace,monospace;color:#D9452F;min-width:58px;padding-top:3px}
.idx small{color:#5B6170;display:block}footer{padding-top:28px;padding-bottom:40px;color:#5B6170;font-size:14px;border-top:1px solid #E6DED0;margin-top:40px}`;

const MARK = '<svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="12" fill="#161A22"/><path d="M14 44V20l18 16 18-16v24" fill="none" stroke="#FAF6EF" stroke-width="5" stroke-linejoin="round"/><circle cx="32" cy="36" r="3.5" fill="#D9452F"/></svg>';

function page({ path, title, desc, body, R, ld }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${E(title)}</title><meta name="description" content="${E(desc)}"><link rel="canonical" href="${BASE}/${path}">
<meta property="og:type" content="article"><meta property="og:title" content="${E(title)}"><meta property="og:description" content="${E(desc)}"><meta property="og:url" content="${BASE}/${path}"><meta property="og:site_name" content="Med100 · The Tract">
<meta name="author" content="The Tract · Independent Neurology Press"><meta name="theme-color" content="#FAF6EF">
<link rel="icon" type="image/svg+xml" href="${R}icons/med100-mark.svg"><style>${CSS.replace(/__R__/g, R)}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>window.goatcounter={path:function(p){return 'med100'+p.replace(/^\/med100-web/,'')}}</script><script data-goatcounter="https://naaajm.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script></head><body>
<header><a class="brand" href="${R}days/">${MARK}<span>Med<i>100</i></span></a><a class="cta" href="${R}">Open the app</a></header>
<main>${body}</main>
<footer>Med100 is a free study aid published by <a href="https://thetract.org/">The Tract · Independent Neurology Press</a>. Editor: Dr Mohamed Najm, neurologist in neurocritical care and neurological emergencies. Educational content only, not medical advice; check anything you would act on against current guidelines. <a href="mailto:contact@thetract.org">contact@thetract.org</a></footer>
</body></html>`;
}

const PUB = { '@type': 'Organization', name: 'The Tract', url: 'https://thetract.org/' };
const days = CURRICULUM.filter((d) => !d.comingSoon);
rmSync('days', { recursive: true, force: true });

days.forEach((d, i) => {
  const slug = slugOf(d), R = '../../';
  const qs = QUESTIONS_BY_TOPIC[d.topicId] || [];
  const ok = isReviewed(d);
  const prev = days[i - 1], next = days[i + 1];
  const desc = `Day ${d.day} of Med100 (${d.system}): ${d.objectives.join('; ')}.`.slice(0, 300);
  const body = `<div class="eyebrow">Day ${d.day} <span>· ${E(d.system)}</span></div><h1>${E(d.title)}</h1>
${ok ? `<p class="note ok">Checked against the sources below by ${E(d.review.by)} · ${E(d.review.date)}</p>` : '<p class="note">Not yet clinically reviewed. Use it as a study aid and check anything you would act on against current guidelines.</p>'}
<h2>By the end you can</h2><ol>${d.objectives.map((x) => `<li>${inline(x)}</li>`).join('')}</ol>
<h2>Core material</h2>${prose(d.coreContent)}
<h2>Key concepts</h2><ul>${d.keyConcepts.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>
<h2>Clinical pearls</h2><ul>${d.clinicalPearls.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>
<h2>Test yourself</h2>${qs.map((q, n) => `<div class="q"><p>${n + 1}. ${E(q.stem)}</p><ol>${q.options.map((o) => `<li>${E(o)}</li>`).join('')}</ol><details><summary>Show answer</summary><p><b>${String.fromCharCode(65 + q.correct)}. ${E(q.options[q.correct])}</b> ${E(q.explanation)}</p></details></div>`).join('')}
${(d.sources || []).length ? `<h2>Sources</h2><ol class="src">${d.sources.map((s) => `<li><a href="${E(s.url)}" rel="nofollow noopener">${E(s.label)}</a></li>`).join('')}</ol><p style="font-size:14px;color:#5B6170">Editions current as of ${SOURCES_AS_OF}. Drafted with AI assistance from these sources and checked by the editor before a page is marked as checked.</p>` : ''}
${relatedFor(d.topicId).length ? `<h2>Go further on The Tract</h2><ul>${relatedFor(d.topicId).map((r) => `<li><a href="${E(r.url)}?ref=med100">${E(r.label)}</a> <small style="color:#5B6170">· ${E(r.kind)}</small></li>`).join('')}</ul>` : ''}
<a class="open" href="${R}#/topic/${d.day}">Study day ${d.day} in the app</a>
<nav class="pn">${prev ? `<a href="../${slugOf(prev)}/">← Day ${prev.day}: ${E(prev.title.split(' — ')[0])}</a>` : '<span></span>'}${next ? `<a href="../${slugOf(next)}/" style="text-align:right">Day ${next.day}: ${E(next.title.split(' — ')[0])} →</a>` : ''}</nav>`;
  const ld = { '@context': 'https://schema.org', '@type': 'LearningResource', name: d.title, description: desc, educationalLevel: 'Medical students and junior doctors', learningResourceType: 'Lesson', about: d.system, inLanguage: 'en', url: `${BASE}/days/${slug}/`, publisher: PUB, isAccessibleForFree: true, isPartOf: { '@type': 'Course', name: 'Med100', url: `${BASE}/` } };
  mkdirSync(`days/${slug}`, { recursive: true });
  writeFileSync(`days/${slug}/index.html`, page({ path: `days/${slug}/`, title: `Day ${d.day}: ${d.title} | Med100`, desc, body, R, ld }));
});

const systems = [...new Set(days.map((d) => d.system))].sort();
const idx = `<div class="eyebrow">Med100 <span>· 100 days</span></div><h1>100 days of core medicine, one topic a day</h1>
<p>A free study companion for medical students and junior doctors from <a href="https://thetract.org/">The Tract</a>. Each day has learning objectives, core material, key concepts, clinical pearls and four questions with explanations, with the guidelines and papers behind it. No drug doses or treatment protocols. ${systems.length} specialties: ${systems.map(E).join(', ')}.</p>
<a class="open" href="../">Start the 100-day challenge</a>
<h2>All topics</h2><ul class="idx">${days.map((d) => `<li><b>Day ${d.day}</b><span><a href="${slugOf(d)}/">${E(d.title)}</a><small>${E(d.system)}</small></span></li>`).join('')}</ul>`;
writeFileSync('days/index.html', page({ path: 'days/', title: 'All 100 topics | Med100 — 100 days of core medicine', desc: 'Med100: 100 daily topics across 12 specialties of internal medicine, emergency medicine, psychiatry and obstetrics, with 400 questions and sources. Free, from The Tract.', body: idx, R: '../',
  ld: { '@context': 'https://schema.org', '@type': 'Course', name: 'Med100', description: '100 days of core medicine, one topic a day.', provider: PUB, url: `${BASE}/`, isAccessibleForFree: true, inLanguage: 'en', hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'P100D' } } }));

const urls = [`${BASE}/`, `${BASE}/days/`, ...days.map((d) => `${BASE}/days/${slugOf(d)}/`)];
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
console.log(`SEO pages: ${days.length} days + index, sitemap with ${urls.length} URLs`);
