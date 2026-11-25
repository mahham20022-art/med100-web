import { state, subscribe } from '../state.js';
import { CURRICULUM, getDay } from '../data/curriculum.js';
import { markDayComplete } from '../core/sync.js';
import { computeStreaks } from '../core/streaks.js';
import { esc, qsa } from '../core/dom.js';
import { navigate } from '../router.js';
import { beatLine } from '../core/rhythm.js';
import { readingMinutes } from './dashboard.js';

export function renderTopics(root) {
  let query = '';
  let systemFilter = 'all';
  let statusFilter = 'available';
  const published = CURRICULUM.filter((day) => !day.comingSoon);
  const systems = ['all', ...new Set(published.map((day) => day.system).filter(Boolean))];

  const paint = () => {
    root.innerHTML = listTemplate(systems);
    root.querySelector('#topic-search').value = query;
    root.querySelector('#system-filter').value = systemFilter;
    root.querySelector('#status-filter').value = statusFilter;
    wireList();
    applyFilter();
  };

  function applyFilter() {
    const normalized = query.trim().toLowerCase();
    const visible = [];
    qsa(root, '[data-topic-card]').forEach((card) => {
      const day = CURRICULUM.find((item) => item.day === Number(card.dataset.day));
      if (!day) return;
      const done = state.completedDays.includes(day.day);
      const searchable = [day.title, day.system, ...(day.objectives || [])].join(' ').toLowerCase();
      const matchesQuery = !normalized || searchable.includes(normalized);
      const matchesSystem = systemFilter === 'all' || day.system === systemFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && !day.comingSoon) ||
        (statusFilter === 'completed' && done) ||
        (statusFilter === 'upcoming' && day.comingSoon);
      const show = matchesQuery && matchesSystem && matchesStatus;
      card.classList.toggle('hidden', !show);
      if (show) visible.push(card);
    });

    qsa(root, '[data-system-section]').forEach((section) => {
      const hasVisible = section.querySelector('[data-topic-card]:not(.hidden)');
      section.classList.toggle('hidden', !hasVisible);
    });

    const result = root.querySelector('#library-result-count');
    if (result) result.textContent = `${visible.length} ${visible.length === 1 ? 'topic' : 'topics'}`;
    const empty = root.querySelector('#library-empty');
    if (empty) empty.classList.toggle('hidden', visible.length > 0);
  }

  function wireList() {
    const search = root.querySelector('#topic-search');
    root.querySelector('#btn-open-mock')?.addEventListener('click', () => navigate('/mock-exam'));
    search.addEventListener('input', () => {
      query = search.value;
      applyFilter();
    });
    root.querySelector('#system-filter').addEventListener('change', (event) => {
      systemFilter = event.target.value;
      applyFilter();
    });
    root.querySelector('#status-filter').addEventListener('change', (event) => {
      statusFilter = event.target.value;
      applyFilter();
    });
    qsa(root, '[data-topic-card]').forEach((card) => {
      card.addEventListener('click', () => navigate(`/topic/${card.dataset.day}`));
    });
  }

  paint();
  return subscribe(() => {
    // Keep the active search and filters while refreshing completion states.
    paint();
  });
}

function listTemplate(systems) {
  const completed = state.completedDays.length;
  const publishedCount = CURRICULUM.filter((day) => !day.comingSoon).length;
  const { current } = computeStreaks(state.completedDays);
  const options = systems.map((system) =>
    `<option value="${esc(system)}">${system === 'all' ? 'All disciplines' : esc(system)}</option>`,
  ).join('');

  const grouped = systems.filter((system) => system !== 'all').map((system) => {
    const days = CURRICULUM.filter((day) => !day.comingSoon && day.system === system);
    if (!days.length) return '';
    const cards = days.map((day) => topicCard(day)).join('');
    return `
      <section class="library-discipline" data-system-section>
        <div class="library-discipline-heading">
          <h3>${esc(system)}</h3>
          <span>${days.length} ${days.length === 1 ? 'topic' : 'topics'}</span>
        </div>
        <div class="library-topic-list">${cards}</div>
      </section>
    `;
  }).join('');

  const upcoming = CURRICULUM.filter((day) => day.comingSoon).map((day) => topicCard(day)).join('');

  return `
    <section class="library-intro">
      <div class="library-intro-copy">
        <span class="page-eyebrow">THE MED100 LIBRARY · 100-DAY CURRICULUM</span>
        <h2>Explore medicine.</h2>
        <p>A structured collection of clinical topics. Choose a subject, work through its core concepts, then test what you know.</p>
      </div>
      <div class="library-intro-note">
        <span class="library-note-kicker">YOUR STUDY RECORD</span>
        <strong>${completed}<small> / 100</small></strong>
        <span>days completed</span>
      </div>
    </section>

    <div class="library-exam-cta"><div><strong>Ready to test your knowledge?</strong><span>Take a timed assessment across the published question bank.</span></div><button type="button" id="btn-open-mock" class="btn btn-primary">Take mock exam →</button></div>

    <section class="library-statline" aria-label="Curriculum overview">
      <div><strong>${publishedCount}</strong><span>Published topics</span></div>
      <div><strong>${CURRICULUM.length}</strong><span>Planned days</span></div>
      <div><strong>${current}</strong><span>Current streak</span></div>
    </section>

    <section class="library-controls" aria-label="Find a topic">
      <label class="library-search-wrap">
        <span class="library-control-label">SEARCH THE LIBRARY</span>
        <input id="topic-search" class="input" type="search" placeholder="Search a condition, concept or discipline…" autocomplete="off">
      </label>
      <div class="library-filter-row">
        <label>
          <span class="library-control-label">DISCIPLINE</span>
          <select id="system-filter" class="input">${options}</select>
        </label>
        <label>
          <span class="library-control-label">SHOW</span>
          <select id="status-filter" class="input">
            <option value="available" selected>Published topics</option>
            <option value="completed">Completed topics</option>
            <option value="upcoming">Coming soon</option>
            <option value="all">All curriculum days</option>
          </select>
        </label>
      </div>
      <div class="library-results-line"><span id="library-result-count">${publishedCount} topics</span><span>SELECT A TOPIC TO BEGIN</span></div>
    </section>

    <div id="library-empty" class="library-empty hidden">
      <span class="library-empty-mark">—</span>
      <h3>No topics match this view.</h3>
      <p>Try another search term or change the filters.</p>
    </div>
    <div class="library-groups">${grouped}${upcoming ? `<section class="library-discipline hidden" data-system-section><div class="library-discipline-heading"><h3>In development</h3><span>${CURRICULUM.length - publishedCount} planned days</span></div><div class="library-topic-list">${upcoming}</div></section>` : ''}</div>
  `;
}

function topicCard(day) {
  const isDone = state.completedDays.includes(day.day);
  const isUpcoming = Boolean(day.comingSoon);
  const label = isUpcoming ? 'Coming soon' : isDone ? 'Completed' : 'Study topic';
  const meta = isUpcoming ? 'Content in development' : `${day.system} · ${(day.objectives || []).length} learning objectives`;
  return `
    <button class="library-topic-card ${isUpcoming ? 'is-upcoming' : ''}" data-topic-card data-day="${day.day}" type="button" aria-label="Day ${day.day}: ${esc(day.title)} — ${label}">
      <span class="library-topic-index">${String(day.day).padStart(2, '0')}</span>
      <span class="library-topic-copy">
        <strong>${esc(day.title)}</strong>
        <small>${esc(meta)}</small>
      </span>
      <span class="library-topic-status ${isDone ? 'is-done' : isUpcoming ? 'is-pending' : ''}">${isDone ? '✓ Completed' : label}</span>
      <span class="library-topic-arrow" aria-hidden="true">↗</span>
    </button>
  `;
}

export function renderTopicDetail(root, dayParam) {
  const day = getDay(dayParam);
  if (!day) {
    root.innerHTML = '<div class="empty-state">Topic not found.</div>';
    return;
  }

  const paint = () => {
    root.innerHTML = detailTemplate(day);
    wireDetail(day);
  };
  paint();
  return subscribe(paint);
}

// Turn the curriculum's plain-text core material into real structure:
// paragraphs, bulleted lines ("- ") and numbered lines ("1. ").
function proseHtml(text) {
  const out = [];
  let list = null;
  const close = () => { if (list) { out.push(`<${list.tag}>${list.items.join('')}</${list.tag}>`); list = null; } };
  for (const raw of String(text || '').split('\n')) {
    const line = raw.trim();
    if (!line) { close(); continue; }
    const b = line.match(/^[-•]\s+(.*)$/), n = line.match(/^\d+[.)]\s+(.*)$/);
    if (b || n) {
      const tag = b ? 'ul' : 'ol';
      if (!list || list.tag !== tag) { close(); list = { tag, items: [] }; }
      list.items.push(`<li>${emph(esc((b || n)[1]))}</li>`);
    } else { close(); out.push(`<p>${emph(esc(line))}</p>`); }
  }
  close();
  return out.join('');
}
// "Term — explanation" and "Term: explanation" lead-ins become bold terms.
function emph(html) {
  html = html.replace(/&gt;=/g, '≥').replace(/&lt;=/g, '≤');
  return html.replace(/^([^.—:]{2,48}?)(\s+—\s+|:\s+)/, '<strong>$1</strong>$2');
}

const PEARL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13h4l2-5 3 10 3-13 2 8h6"/></svg>';

function detailTemplate(day) {
  const back = `<a class="back-link" href="#/topics">← All topics</a>`;
  if (day.comingSoon) {
    return `<div class="topic">${back}<div class="soon">
      <span class="eyebrow">Day ${String(day.day).padStart(2, '0')}</span>
      <svg class="topic-beat" viewBox="0 0 300 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0,24 L300,24"/></svg>
      <h2>This day is being written.</h2>
      <p>The 100-day structure is in place; this topic’s content isn’t published yet. Nothing is shown in its place.</p>
    </div></div>`;
  }

  const isDone = state.completedDays.includes(day.day);
  const { total } = computeStreaks(state.completedDays);
  const isCurrent = day.day === total + 1 && !isDone;
  const mins = readingMinutes(day);
  const pad = String(day.day).padStart(2, '0');

  return `<article class="topic">
    ${back}
    <div class="topic-kicker"><b>Day ${pad}</b><span>${esc(day.system)}</span><span>≈ ${mins} min</span></div>
    <h1>${esc(day.title)}</h1>
    <svg class="topic-beat" viewBox="0 0 300 34" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${beatLine(300, 3).replace(/,(\d+(?:\.\d+)?)/g, (m, y) => ',' + (+y - 7).toFixed(1))}"/></svg>
    ${isDone ? '<div class="topic-status"><span class="ok">✓ Day complete</span><span>· written into your rhythm</span></div>' : ''}

    <section class="sec"><div class="sec-h"><span>01</span><h2>By the end you can</h2></div>
      <ol class="objectives">${day.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ol></section>

    <section class="sec"><div class="sec-h"><span>02</span><h2>Core material</h2></div>
      <div class="prose">${proseHtml(day.coreContent)}</div></section>

    <section class="sec"><div class="sec-h"><span>03</span><h2>Key concepts</h2></div>
      <ul class="concepts">${day.keyConcepts.map((k) => `<li>${emph(esc(k))}</li>`).join('')}</ul></section>

    <section class="sec"><div class="sec-h"><span>04</span><h2>Clinical pearls</h2></div>
      <div class="pearls">${day.clinicalPearls.map((p) => `<div class="pearl">${PEARL}${esc(p)}</div>`).join('')}</div></section>

    <div class="topic-actions">
      <button id="btn-mastery" class="btn btn-outline">Test yourself</button>
      <button id="btn-teach" class="btn btn-outline">Teach it back</button>
      ${isDone ? '' : isCurrent ? `<button id="btn-complete" class="btn btn-signal wide"><span class="dot" style="background:#fff;box-shadow:none"></span>Write day ${day.day} into my rhythm</button>` : ''}
    </div>
  </article>`;
}

function wireDetail(day) {
  const btnMastery = document.getElementById('btn-mastery');
  const btnTeach = document.getElementById('btn-teach');
  const btnComplete = document.getElementById('btn-complete');
  if (btnMastery) btnMastery.addEventListener('click', () => navigate(`/mastery/${day.day}`));
  if (btnTeach) btnTeach.addEventListener('click', () => navigate(`/teaching/${day.day}`));
  if (btnComplete) {
    btnComplete.addEventListener('click', async () => {
      if (!state.user) return;
      btnComplete.disabled = true;
      try {
        await markDayComplete(state.user.uid, day.day, state.hasStartedAt);
      } catch (error) {
        console.error('Failed to mark day done:', error);
        btnComplete.disabled = false;
      }
    });
  }
}
