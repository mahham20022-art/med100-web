#!/usr/bin/env python3
"""Build one specialist review pack (PDF) per Med100 specialty.

    node scripts/review-pack/export.mjs > /tmp/med100.json
    python3 scripts/review-pack/build.py /tmp/med100.json out/

Each pack: cover with reviewer instructions, then every day of that
specialty (content, concepts, pearls, MCQs with keys, sources) with a
review box, then a sign-off sheet. Printed with headless Chrome.
"""
import asyncio, html, json, os, re, sys
from datetime import date
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONTS = 'file://' + os.path.join(ROOT, 'fonts')
E = html.escape
TODAY = date.today().strftime('%d %B %Y')

def inline(t):
    t = E(t)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    return t

def prose(text):
    out, lst, kind = [], [], None
    def flush():
        nonlocal lst, kind
        if lst:
            tag = 'ol' if kind == 'ol' else 'ul'
            out.append(f'<{tag}>' + ''.join(f'<li>{inline(x)}</li>' for x in lst) + f'</{tag}>')
        lst, kind = [], None
    for line in text.split('\n'):
        s = line.strip()
        if not s:
            flush(); continue
        m = re.match(r'^(\d+)\.\s+(.*)', s)
        if s.startswith('- '):
            if kind != 'ul': flush(); kind = 'ul'
            lst.append(s[2:])
        elif m:
            if kind != 'ol': flush(); kind = 'ol'
            lst.append(m.group(2))
        else:
            flush(); out.append(f'<p>{inline(s)}</p>')
    flush()
    return '\n'.join(out)

def src_host(u):
    h = urlparse(u).netloc.replace('www.', '')
    return 'PubMed search' if 'pubmed' in h else h

CSS = f"""
@font-face{{font-family:Inter;src:url('{FONTS}/Inter-latin.woff2') format('woff2');font-weight:100 900}}
@font-face{{font-family:InterD;src:url('{FONTS}/InterDisplay-Bold.woff');font-weight:700}}
@font-face{{font-family:InterD;src:url('{FONTS}/InterDisplay-SemiBold.woff');font-weight:600}}
@page{{size:A4;margin:16mm 16mm 18mm}}
*{{box-sizing:border-box}}
body{{font:10pt/1.5 Inter,system-ui,sans-serif;color:#161A22;margin:0}}
h1,h2,h3{{font-family:InterD,Inter,sans-serif;letter-spacing:-.01em;margin:0}}
.mono{{font:600 7.5pt/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase}}
.red{{color:#D9452F}} .mut{{color:#5B6170}}
/* cover */
.cover{{display:flex;flex-direction:column;page-break-after:always}}
.brand{{display:flex;align-items:center;gap:10px;font:700 15pt InterD,Inter}}
.brand i{{font-style:normal;color:#D9452F}}
.cover h1{{font-size:30pt;line-height:1.08;margin:12mm 0 3mm}}
.cover .sub{{font-size:12pt;color:#5B6170;max-width:150mm}}
.beat{{margin:5mm 0}}
.box{{border:1px solid #E3DCCF;border-radius:6px;padding:5mm 6mm;background:#FBF8F2}}
.box h3{{font-size:11pt;margin-bottom:2mm}}
.box ol{{margin:0;padding-left:5mm}} .box li{{margin:1.2mm 0}}
.meta{{margin-top:6mm;display:grid;grid-template-columns:1.3fr 1.2fr .7fr;gap:4mm;font-size:8pt}}
.meta div{{border-top:1.5px solid #161A22;padding-top:2mm}}
.toc{{margin-top:5mm;columns:3;column-gap:6mm;font-size:8pt}}
.toc div{{break-inside:avoid;padding:1mm 0;border-bottom:1px dotted #D8D0C0}}
/* day */
.day{{page-break-before:always}}
.dayhead{{border-bottom:2px solid #161A22;padding-bottom:3mm;margin-bottom:4mm}}
.dayhead h2{{font-size:19pt;line-height:1.15;margin-top:2mm}}
h3.sec{{break-after:avoid;font-size:10.5pt;margin:5mm 0 2mm;display:flex;gap:6px;align-items:baseline}}
h3.sec span{{font:600 7.5pt ui-monospace,monospace;color:#D9452F}}
p{{margin:0 0 2mm}} ul,ol{{margin:0 0 2mm;padding-left:5.5mm}} li{{margin:.6mm 0}}
.q{{border:1px solid #E3DCCF;border-radius:5px;padding:3mm 4mm;margin:2.5mm 0;break-inside:avoid}}
.q .stem{{font-weight:600;margin-bottom:1.5mm}}
.q ol{{list-style:upper-alpha;margin:0 0 1.5mm}}
.q li.ok{{font-weight:600}} .q li.ok::after{{content:'  ✓ key';color:#1F7A4D;font:600 7.5pt ui-monospace,monospace}}
.q .ex{{font-size:9pt;color:#3B4150}}
.q .tag{{float:right}}
.src li{{font-size:9pt}} .src a{{color:#161A22}} .src small{{color:#5B6170}}
.review{{border:1.5px solid #161A22;border-radius:6px;padding:4mm 5mm;margin-top:5mm;break-inside:avoid}}
.review h3{{font-size:10.5pt;margin-bottom:2.5mm}}
.chk{{display:flex;flex-wrap:wrap;gap:3mm 7mm;font-size:9.5pt;margin-bottom:3mm}}
.chk span::before{{content:'';display:inline-block;width:3.2mm;height:3.2mm;border:1.2px solid #161A22;border-radius:1px;margin-right:2mm;vertical-align:-.5mm}}
.lines div{{border-bottom:1px solid #BDB5A6;height:7mm}}
.sig{{display:grid;grid-template-columns:2fr 1fr;gap:6mm;margin-top:3mm;font-size:8.5pt;color:#5B6170}}
.sig div{{border-bottom:1px solid #161A22;height:8mm}}
table{{width:100%;border-collapse:collapse;font-size:9pt;margin-top:4mm}}
th,td{{border:1px solid #CFC7B8;padding:2mm;text-align:left;vertical-align:top}}
th{{background:#F3EEE4}}
"""

BEAT = '<svg class="beat" width="210" height="24" viewBox="0 0 210 24"><path d="M0 14h40l6-8 6 16 6-12 4 4h60l6-10 6 18 6-12 4 4h66" fill="none" stroke="#D9452F" stroke-width="1.6"/></svg>'
LOGO = '<svg width="26" height="26" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#161A22"/><path d="M14 44V20l18 16 18-16v24" fill="none" stroke="#FAF6EF" stroke-width="5" stroke-linejoin="round"/><circle cx="32" cy="36" r="3.5" fill="#D9452F"/></svg>'

def day_html(d, n, total):
    qs = ''.join(
        f'''<div class="q"><span class="tag mono mut">{E(q.get("difficulty") or ("Foundational" if i == 0 else "Intermediate"))}</span>
        <div class="stem">Q{i+1}. {E(q["stem"])}</div>
        <ol>{"".join(f'<li class="{"ok" if j == q["correct"] else ""}">{E(o)}</li>' for j, o in enumerate(q["options"]))}</ol>
        <div class="ex"><b>Explanation:</b> {E(q["explanation"])}</div></div>''' for i, q in enumerate(d['questions']))
    srcs = ''.join(f'<li>{E(s["label"])}<br><small><a href="{E(s["url"])}">{E(src_host(s["url"]))}</a></small></li>' for s in d.get('sources', []))
    return f'''<section class="day">
<div class="dayhead"><div class="mono"><span class="red">Day {d["day"]}</span> &nbsp;·&nbsp; {E(d["system"])} &nbsp;·&nbsp; <span class="mut">Topic {n} of {total}</span></div>
<h2>{E(d["title"])}</h2></div>
<h3 class="sec"><span>01</span>Learning objectives</h3><ol>{"".join(f"<li>{inline(x)}</li>" for x in d["objectives"])}</ol>
<h3 class="sec"><span>02</span>Core content</h3>{prose(d["coreContent"])}
<h3 class="sec"><span>03</span>Key concepts</h3><ul>{"".join(f"<li>{inline(x)}</li>" for x in d["keyConcepts"])}</ul>
<h3 class="sec"><span>04</span>Clinical pearls</h3><ul>{"".join(f"<li>{inline(x)}</li>" for x in d["clinicalPearls"])}</ul>
<h3 class="sec"><span>05</span>Questions ({len(d["questions"])}) — answer key marked</h3>{qs}
<h3 class="sec"><span>06</span>Sources to check against</h3><ol class="src">{srcs}</ol>
<div class="review"><h3>Reviewer — Day {d["day"]}</h3>
<div class="chk"><span>Accurate as written</span><span>Minor corrections (below)</span><span>Major changes needed</span><span>Sources adequate</span><span>Add / replace a source</span><span>Questions: keys correct</span></div>
<div class="lines"><div></div><div></div><div></div><div></div><div></div></div>
<div class="sig"><span>Reviewer name</span><span>Date</span></div><div class="sig"><div></div><div></div></div>
</div></section>'''

def pack_html(system, days):
    toc = ''.join(f'<div><b>Day {d["day"]}</b> — {E(d["title"])}</div>' for d in days)
    nq = sum(len(d['questions']) for d in days)
    rows = ''.join(f'<tr><td>{d["day"]}</td><td>{E(d["title"])}</td><td></td><td></td></tr>' for d in days)
    body = f'''<section class="cover">
<div class="brand">{LOGO}<span>Med<i>100</i></span><span class="mono mut" style="margin-left:auto">Specialist review pack</span></div>
<h1>{E(system)}</h1>
<div class="sub">{len(days)} topics · {nq} questions from the Med100 100-day medical curriculum, sent for review by a specialist before anything is marked as clinically reviewed.</div>
{BEAT}
<div class="box"><h3>What we are asking</h3><ol>
<li>Read each topic as a specialist. Is anything wrong, outdated or misleading? Is anything important missing for a medical student or junior doctor?</li>
<li>Check the answer key and explanation of every question. Flag any question with more than one defensible answer.</li>
<li>Check that the listed sources support the text. Suggest a better or more current source where needed (guideline title and year is enough).</li>
<li>Write corrections in the box under each topic, tick one status, and sign. Short notes are fine; tracked wording is welcome but not required.</li>
</ol></div>
<div class="box" style="margin-top:4mm"><h3>Scope of the content</h3>
Med100 is a free study aid, written at a foundational textbook level: definitions, mechanisms, classifications and clinical reasoning. It deliberately leaves out drug doses and step-by-step treatment protocols. Please judge it against that aim. Each topic stays labelled <i>“not yet clinically reviewed”</i> in the app until a named specialist has signed it off; with your permission your name will appear as reviewer on the topics you approve.</div>
<div class="toc">{toc}</div>
<div class="meta"><div><span class="mono mut">Publisher</span><br>The Tract · Independent Neurology Press · thetract.org</div>
<div><span class="mono mut">Editor · returns to</span><br>Dr Mohamed Najm · contact@thetract.org</div>
<div><span class="mono mut">Prepared</span><br>{TODAY}</div></div>
</section>
{"".join(day_html(d, i+1, len(days)) for i, d in enumerate(days))}
<section class="day"><div class="dayhead"><div class="mono red">Sign-off</div><h2>{E(system)} — reviewer sign-off</h2></div>
<p>By signing, I confirm I have reviewed the topics marked “approved” below against the listed sources, and that they are accurate for a foundational study aid as of the review date.</p>
<table><tr><th style="width:12mm">Day</th><th>Topic</th><th style="width:30mm">Approved / changes</th><th style="width:35mm">Initials</th></tr>{rows}</table>
<div class="sig" style="margin-top:10mm"><span>Full name, specialty, institution</span><span>Date</span></div><div class="sig"><div></div><div></div></div>
<div class="sig" style="margin-top:6mm;grid-template-columns:1fr"><span>May your name appear as reviewer in the app?  ☐ Yes  ☐ No</span></div>
</section>'''
    return f'<!doctype html><html><head><meta charset="utf-8"><title>Med100 review — {E(system)}</title><style>{CSS}</style></head><body>{body}</body></html>'

SLUG = lambda s: re.sub(r'[^a-z]+', '-', s.lower()).strip('-')

async def main(src, outdir):
    from playwright.async_api import async_playwright
    days = json.load(open(src))
    os.makedirs(outdir, exist_ok=True)
    by = {}
    for d in days: by.setdefault(d['system'], []).append(d)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--allow-file-access-from-files'])
        pg = await b.new_page()
        for system, ds in by.items():
            ds.sort(key=lambda d: d['day'])
            hp = os.path.join(outdir, f'Med100-review-{SLUG(system)}.html')
            open(hp, 'w').write(pack_html(system, ds))
            await pg.goto('file://' + hp); await pg.wait_for_timeout(400)
            await pg.pdf(path=hp[:-5] + '.pdf', format='A4', print_background=True, display_header_footer=True,
                header_template='<span></span>',
                footer_template=f'<div style="font:7pt Inter,sans-serif;color:#888;width:100%;padding:0 16mm;display:flex;justify-content:space-between"><span>Med100 · {E(system)} review pack · The Tract</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
                margin={'top': '16mm', 'bottom': '18mm', 'left': '16mm', 'right': '16mm'})
            os.remove(hp)
            print(system, len(ds))
        await b.close()

if __name__ == '__main__':
    asyncio.run(main(sys.argv[1], sys.argv[2]))
