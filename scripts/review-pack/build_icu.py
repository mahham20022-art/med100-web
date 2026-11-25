#!/usr/bin/env python3
"""ICU practice review pack (one PDF) for the editor's own sign-off.

    node -e "import('./js/data/icu/questions.js').then(m=>console.log(JSON.stringify(m)))" > /tmp/icu.json
    python3 scripts/review-pack/build_icu.py /tmp/icu.json out/
"""
import asyncio, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build import CSS, BEAT, LOGO, E, TODAY

EXTRA = """
.q.edited{border-color:#D9452F;border-width:1.5px}
.edit{margin-top:2mm;padding:2mm 3mm;background:#FCEDE9;border-radius:4px;font-size:8.5pt;color:#7A2414}
.ex b{color:#161A22}
.ref{font-size:8.5pt;color:#5B6170;margin-top:1.5mm}
.topic{page-break-before:always}
.rv-mini{border:1.5px solid #161A22;border-radius:6px;padding:3mm 4mm;margin-top:4mm;break-inside:avoid}
.rv-mini .chk{margin-bottom:2mm}
.lines div{height:6.5mm}
.cover h1{margin-top:8mm}.cover .box{padding:4mm 5mm}
"""

def q_html(q, n, edits):
    e = edits.get(q['id'])
    opts = ''.join(f'<li class="{"ok" if j == q["correct"] else ""}">{E(o)}</li>' for j, o in enumerate(q['options']))
    return f'''<div class="q{' edited' if e else ''}"><span class="tag mono mut">{E(q['id'])} · {E(q['difficulty'])}</span>
<div class="stem">Q{n}. {E(q['stem'])}</div><ol>{opts}</ol>
<div class="ex">{q['explanation']}</div>
<div class="ref">Source: {E(q['ref'])}</div>
{f'<div class="edit"><b>Changed in pre-check:</b> {E(e)}</div>' if e else ''}</div>'''

def build(data):
    qs, topics = data['ICU_QUESTIONS'], data['ICU_TOPICS']
    edits = {x['id']: x['why'] for x in data['ICU_EDITS']}
    by = {t['slug']: [q for q in qs if q['topicSlug'] == t['slug']] for t in topics}
    toc = ''.join(f'<div><b>{E(t["name"])}</b> — {len(by[t["slug"]])} questions</div>' for t in topics)
    erows = ''.join(f'<tr><td>{E(x["id"])}</td><td>{E(x["why"])}</td><td></td></tr>' for x in data['ICU_EDITS'])
    n = 0; sections = []
    for t in topics:
        items = []
        for q in by[t['slug']]:
            n += 1; items.append(q_html(q, n, edits))
        sections.append(f'''<section class="topic"><div class="dayhead"><div class="mono"><span class="red">ICU practice</span> &nbsp;·&nbsp; <span class="mut">{len(by[t['slug']])} questions</span></div><h2>{E(t['name'])}</h2></div>
{''.join(items)}
<div class="rv-mini"><h3 style="font-size:10pt;margin-bottom:2mm">Editor check — {E(t['name'])}</h3>
<div class="chk"><span>Keys correct</span><span>Doses match current guidance</span><span>Sources adequate</span><span>Changes needed (below)</span></div>
<div class="lines"><div></div><div></div><div></div></div></div></section>''')
    srows = ''.join(f'<tr><td>{E(t["name"])}</td><td>{len(by[t["slug"]])}</td><td></td><td></td></tr>' for t in topics)
    body = f'''<section class="cover">
<div class="brand">{LOGO}<span>Med<i>100</i></span><span class="mono mut" style="margin-left:auto">Editor review pack</span></div>
<h1>ICU practice</h1>
<div class="sub">{len(qs)} critical care questions moved from Najm ICUCalc into Med100 as a separate ICU practice section. They are live, labelled “not yet reviewed by the editor”, until this pack is signed off.</div>
{BEAT}
<div class="box"><h3>How this pack was prepared</h3><ol>
<li>All {len(qs)} questions were read against the guidance they cite (SSC 2021, ARDS trials, ACLS/ILCOR, KDIGO, PADIS, PROPPR, CRASH-2, WATERFALL, ADA, AHA/ASA 2026).</li>
<li>{len(edits)} questions were changed before going live: wrong keys, a missing value, outdated stroke guidance, and wording that allowed two answers. Each is boxed in red with the reason; the full list is on the next page.</li>
<li>Unlike the 100-day curriculum, these questions contain doses. The app says so above every session and tells users to check against local protocols.</li>
</ol></div>
<div class="box" style="margin-top:4mm"><h3>What to check</h3>
Every key and explanation, every dose and threshold, and that the source still supports the statement. Tick each topic box; when all are done, sign the last page and the label in the app changes to “Checked by Dr Mohamed Najm · date”.</div>
<div class="toc">{toc}</div>
<div class="meta"><div><span class="mono mut">Publisher</span><br>The Tract · thetract.org</div><div><span class="mono mut">Editor</span><br>Dr Mohamed Najm</div><div><span class="mono mut">Prepared</span><br>{TODAY}</div></div>
</section>
<section class="topic"><div class="dayhead"><div class="mono red">Pre-check</div><h2>The {len(edits)} questions changed before going live</h2></div>
<table><tr><th style="width:22mm">Question</th><th>What was wrong and what changed</th><th style="width:22mm">Agree?</th></tr>{erows}</table>
<p class="mut" style="margin-top:4mm;font-size:9pt">Kept as written: card-01 (door-to-balloon 90 min is the AHA figure; ESC uses 60/120), sep-06 (12-hour window is the SSC wording), rsi-06.</p></section>
{''.join(sections)}
<section class="topic"><div class="dayhead"><div class="mono red">Sign-off</div><h2>ICU practice — editor sign-off</h2></div>
<p>I have checked the topics marked below against their sources, including every dose, and they are accurate for an ICU-level study aid as of the date below.</p>
<table><tr><th>Topic</th><th style="width:16mm">Qs</th><th style="width:32mm">Approved / changes</th><th style="width:24mm">Initials</th></tr>{srows}</table>
<div class="sig" style="margin-top:10mm"><span>Dr Mohamed Najm</span><span>Date</span></div><div class="sig"><div></div><div></div></div></section>'''
    return f'<!doctype html><html><head><meta charset="utf-8"><title>Med100 ICU practice review</title><style>{CSS}{EXTRA}</style></head><body>{body}</body></html>'

async def main(src, outdir):
    from playwright.async_api import async_playwright
    os.makedirs(outdir, exist_ok=True)
    hp = os.path.join(outdir, 'Med100-ICU-practice-review.html')
    open(hp, 'w').write(build(json.load(open(src))))
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--allow-file-access-from-files'])
        pg = await b.new_page(); await pg.goto('file://' + hp); await pg.wait_for_timeout(500)
        await pg.pdf(path=hp[:-5] + '.pdf', format='A4', print_background=True, display_header_footer=True, header_template='<span></span>',
            footer_template='<div style="font:7pt Inter,sans-serif;color:#888;width:100%;padding:0 16mm;display:flex;justify-content:space-between"><span>Med100 · ICU practice review pack · The Tract</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
            margin={'top': '16mm', 'bottom': '18mm', 'left': '16mm', 'right': '16mm'})
        await b.close()
    os.remove(hp)

if __name__ == '__main__':
    asyncio.run(main(sys.argv[1], sys.argv[2]))
