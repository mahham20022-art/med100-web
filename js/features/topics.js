import { state, subscribe } from '../state.js';
import { CURRICULUM, getDay } from '../data/curriculum.js';
import { markDayComplete } from '../core/sync.js';
import { computeStreaks } from '../core/streaks.js';
import { esc, qsa } from '../core/dom.js';
import { navigate } from '../router.js';

export function renderTopics(root) {
  let query = '';
  let systemFilter = 'all';
  const systems = ['all', ...new Set(CURRICULUM.filter((d) => !d.comingSoon).map((d) => d.system))];

  const paint = () => {
    root.innerHTML = listTemplate(systems, systemFilter);
    applyFilter();
    wireList();
  };

  function applyFilter() {
    qsa(root, '[data-day]').forEach((row) => {
      const day = CURRICULUM.find((d) => d.day === Number(row.dataset.day));
      const matchesQuery = !query || day.title.toLowerCase().includes(query) || day.system.toLowerCase().includes(query);
      const matchesSystem = systemFilter === 'all' || day.system === systemFilter;
      row.classList.toggle('hidden', !(matchesQuery && matchesSystem));
    });
  }

  function wireList() {
    const search = root.querySelector('#topic-search');
    search.addEventListener('input', () => {
      query = search.value.trim().toLowerCase();
      applyFilter();
    });
    root.querySelector('#system-filter').addEventListener('change', (e) => {
      systemFilter = e.target.value;
      applyFilter();
    });
    qsa(root, '[data-day]').forEach((row) => {
      row.addEventListener('click', () => navigate(`/topic/${row.dataset.day}`));
    });
  }

  paint();
  return subscribe(() => {
    // Only completion state changes visually (badges); re-paint keeps it simple.
    paint();
  });
}

function listTemplate(systems, systemFilter) {
  const rows = CURRICULUM.map((d) => {
    const isDone = state.completedDays.includes(d.day);
    return `
      <button class="row ${d.comingSoon ? 'muted' : ''}" data-day="${d.day}" style="width:100%;text-align:left;">
        <div class="row-badge ${isDone ? 'done' : ''}">${isDone ? '✓' : d.day}</div>
        <div class="row-main">
          <div class="row-title">${esc(d.title)}</div>
          <div class="row-sub">Day ${d.day} · ${esc(d.system)}</div>
        </div>
      </button>`;
  }).join('');

  const options = systems
    .map((s) => `<option value="${esc(s)}" ${s === systemFilter ? 'selected' : ''}>${s === 'all' ? 'All systems' : esc(s)}</option>`)
    .join('');

  return `
    <input id="topic-search" class="input" type="search" placeholder="Search topics…" style="margin-bottom:var(--sp-3);">
    <select id="system-filter" class="input" style="margin-bottom:var(--sp-4);">${options}</select>
    ${rows}
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

function detailTemplate(day) {
  if (day.comingSoon) {
    return `
      <div class="card">
        <span class="pill">Day ${day.day}</span>
        <h2 style="margin-top:var(--sp-3);">Coming soon</h2>
        <p style="color:var(--color-text-secondary);margin-top:var(--sp-2);">
          This day’s content hasn’t been written yet. The 100-day structure is ready for it —
          there’s nothing fake displayed in its place.
        </p>
      </div>
    `;
  }

  const isDone = state.completedDays.includes(day.day);
  const { total } = computeStreaks(state.completedDays);
  const isCurrent = day.day === total + 1 && !isDone;

  return `
    <span class="pill">${esc(day.system)}</span>
    <h2 style="margin:var(--sp-2) 0 var(--sp-4);font-size:var(--fs-xl);">${esc(day.title)}</h2>

    <div class="card">
      <div class="card-title">Learning Objectives</div>
      <ul>${day.objectives.map((o) => `<li style="margin-bottom:var(--sp-2);">• ${esc(o)}</li>`).join('')}</ul>
    </div>

    <div class="card">
      <div class="card-title">Core Material</div>
      <div style="white-space:pre-wrap;line-height:1.65;">${esc(day.coreContent)}</div>
    </div>

    <div class="card">
      <div class="card-title">Key Concepts</div>
      <ul>${day.keyConcepts.map((k) => `<li style="margin-bottom:var(--sp-2);">• ${esc(k)}</li>`).join('')}</ul>
    </div>

    <div class="card" style="border-left:3px solid var(--color-gold);">
      <div class="card-title" style="color:var(--color-gold);">Clinical Pearls</div>
      <ul>${day.clinicalPearls.map((p) => `<li style="margin-bottom:var(--sp-2);">★ ${esc(p)}</li>`).join('')}</ul>
    </div>

    <button id="btn-mastery" class="btn btn-outline" style="margin-bottom:var(--sp-2);">Test Yourself — AI Mastery Mode</button>
    <button id="btn-teach" class="btn btn-outline" style="margin-bottom:var(--sp-4);">Teach It Back — Teaching Mode</button>

    ${
      isDone
        ? `<div class="success-banner">✓ Marked complete</div>`
        : isCurrent
          ? `<button id="btn-complete" class="btn btn-primary">Mark This Day Complete</button>`
          : ''
    }
  `;
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
