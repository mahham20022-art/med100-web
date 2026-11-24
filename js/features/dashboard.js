// Dashboard V2.0 — real user data only; presentation is isolated from state logic.
import { state, subscribe } from '../state.js';
import { computeStreaks } from '../core/streaks.js';
import { streakMessage } from '../data/demo-data.js';
import { getDay, getDayByTopicId } from '../data/curriculum.js';
import { relativeDay, relativeTime } from '../core/time.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';
import { dueFlashcards, overdueCount } from '../core/spaced-repetition.js';
import { icon } from '../core/icons.js';

const TOTAL_DAYS = 100;

export function renderDashboard(root) {
  const paint = () => { root.innerHTML = template(); wire(root); };
  paint();
  return subscribe(paint);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function welcomeSection() {
  const name = state.user?.isAnonymous ? 'Guest' : state.user?.email?.split('@')[0] || 'there';
  const dateStr = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  return `
    <p class="intro-kicker">MED100 · THE 100-DAY STUDY</p>
    <p class="intro-date">${esc(dateStr)}</p>
    <h2>${greeting()}, ${esc(name)}.</h2>
    <p class="intro-subtitle">A clear plan. A little progress, every day.</p>
  `;
}

function todaysMissionSection(nextDay, today, isDone) {
  if (isDone) return `<div class="card card-mission"><div class="card-title">Journey Complete</div><p>You've completed all 100 days. Revisit any topic any time from the Topics tab.</p></div>`;
  if (today.comingSoon) return `<div class="card card-mission"><div class="card-title">Today's Mission — Day ${nextDay}</div><p>This day's content isn't written yet.</p></div>`;
  return `
    <div class="card card-mission">
      <div class="card-title">Today's Mission <span style="opacity:.7">/ DAY ${String(nextDay).padStart(2,'0')}</span></div>
      <h3 style="font-family:var(--font-serif);font-size:clamp(25px,2.5vw,34px);font-weight:500;letter-spacing:-.04em;margin:18px 0 12px;max-width:520px;line-height:1.12">${esc(today.title)}</h3>
      <span class="pill">${esc(today.system)}</span><span class="pill" style="margin-left:5px">~15 min</span>
      <div><button id="btn-continue" class="btn btn-primary" style="margin-top:24px;width:auto;padding-left:22px;padding-right:22px">Continue today's learning <span aria-hidden="true">→</span></button></div>
    </div>`;
}

function journeySection(total, nextDay) {
  const radius = 80, circumference = 2 * Math.PI * radius;
  const fraction = Math.min(total / TOTAL_DAYS, 1), offset = circumference * (1 - fraction);
  const pct = Math.round(fraction * 100);
  return `
    <div class="card">
      <div class="card-title">The 100-Day Journey</div>
      <div class="ring" style="width:180px;height:180px">
        <svg viewBox="0 0 180 180" role="img" aria-label="${pct}% of the 100-day journey completed">
          <circle class="ring-track" cx="90" cy="90" r="${radius}"></circle>
          <circle class="ring-fill" cx="90" cy="90" r="${radius}" style="stroke-dasharray:${circumference};stroke-dashoffset:${offset}"></circle>
        </svg>
        <div class="ring-center"><span class="big">${Math.min(nextDay, TOTAL_DAYS)}</span><span class="small">of 100 days</span></div>
      </div>
      <p style="margin-top:14px;font-weight:700;color:var(--color-gold)">${pct}% completed</p>
      <p style="color:var(--color-text-secondary);font-size:var(--fs-sm)">${TOTAL_DAYS-total} days remaining</p>
    </div>`;
}

function momentumSection(current) {
  const sessionsCompleted = state.quizAttempts.length + state.teachingSessions.length;
  return `<div class="card"><div class="card-title">Learning Momentum</div><div class="stat-grid">
    <div class="stat-tile"><div class="value">${current}</div><div class="label">Day streak</div></div>
    <div class="stat-tile"><div class="value">${sessionsCompleted}</div><div class="label">Sessions completed</div></div>
  </div><p style="color:var(--color-text-secondary);font-size:var(--fs-sm);margin-top:12px">Last active: ${esc(relativeDay(state.lastActionDate))} — ${esc(streakMessage(current))}</p></div>`;
}

function dueReviewSection() {
  const due = dueFlashcards(), overdue = overdueCount();
  if (state.completedDays.length === 0) return '';
  return `<div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:16px"><div><div class="card-title" style="margin-bottom:5px">Due for Review</div><strong style="font-family:var(--font-serif);font-size:34px;font-weight:500">${due.length}</strong><span style="color:var(--color-text-secondary);font-size:var(--fs-sm)"> due${overdue ? `, ${overdue} overdue` : ''}</span></div>${due.length ? '<button id="btn-start-review" class="btn btn-primary" style="width:auto">Start review →</button>' : ''}</div>`;
}

function performanceSection() {
  if (!state.quizAttempts.length) return '';
  const total=state.quizAttempts.length, correct=state.quizAttempts.filter(a=>a.isCorrect).length, pct=Math.round(correct/total*100);
  const byTopic=new Map();
  for(const a of state.quizAttempts){const e=byTopic.get(a.topicId)||{total:0,correct:0};e.total++;if(a.isCorrect)e.correct++;byTopic.set(a.topicId,e);}
  const ranked=[...byTopic.entries()].filter(([,v])=>v.total>=2).map(([topicId,v])=>({title:getDayByTopicId(topicId)?.title||topicId,acc:v.correct/v.total})).sort((a,b)=>b.acc-a.acc);
  const strongest=ranked[0], weakest=ranked.length>1&&ranked[ranked.length-1].acc<.8?ranked[ranked.length-1]:null;
  return `<div class="card"><div class="card-title">Performance Snapshot</div><div class="stat-grid"><div class="stat-tile"><div class="value">${total}</div><div class="label">Questions answered</div></div><div class="stat-tile"><div class="value">${pct}%</div><div class="label">Correct</div></div></div>${strongest? `<p style="margin-top:12px;font-size:var(--fs-sm)">Strongest: <strong>${esc(strongest.title)}</strong> (${Math.round(strongest.acc*100)}%)</p>`:''}${weakest?`<p style="font-size:var(--fs-sm)">Needs work: <strong>${esc(weakest.title)}</strong> (${Math.round(weakest.acc*100)}%)</p>`:''}</div>`;
}

function quickAccessSection(nextDay) {
  const items=[{label:'Challenge',route:'/challenge',icon:'challenge'},{label:'Topics',route:'/topics',icon:'topics'},{label:'MCQ',route:`/mastery/${Math.min(nextDay,TOTAL_DAYS)}`,icon:'mcq'},{label:'Teaching',route:`/teaching/${Math.min(nextDay,TOTAL_DAYS)}`,icon:'teaching'},{label:'Review',route:'/reviews',icon:'review'},{label:'Notes',route:'/notes',icon:'notes'},{label:'Analytics',route:'/progress',icon:'analytics'},{label:'Profile',route:'/profile',icon:'profile'}];
  return `<div class="card"><div class="card-title">Your Workspace</div><div class="quick-grid">${items.map(it=>`<button data-quick="${it.route}" class="quick-tile"><span class="quick-tile-icon">${icon(it.icon)}</span><span class="quick-tile-label">${esc(it.label)}</span></button>`).join('')}</div></div>`;
}

function recentActivitySection() {
  const activities=[...state.quizAttempts.map(a=>({time:a.answeredAt,topicId:a.topicId,label:`Answered a question — ${a.isCorrect?'correct':'incorrect'}`})),...state.teachingSessions.map(s=>({time:s.completedAt,topicId:s.topicId,label:`Taught back "${s.topicTitle}" — scored ${s.masteryScore}`}))].filter(a=>typeof a.time==='number').sort((a,b)=>b.time-a.time).slice(0,5);
  if(!activities.length)return '';
  return `<div class="card"><div class="card-title">Recent Activity</div>${activities.map(a=>`<button data-activity-topic="${esc(a.topicId)}" class="row" style="width:100%;text-align:left;margin-bottom:6px"><div class="row-main"><div class="row-title">${esc(a.label)}</div><div class="row-sub">${esc(relativeTime(a.time))}</div></div><span aria-hidden="true">↗</span></button>`).join('')}</div>`;
}

function template() {
  const {current,total}=computeStreaks(state.completedDays), nextDay=Math.min(total+1,TOTAL_DAYS), today=getDay(nextDay), isDone=total>=TOTAL_DAYS;
  const due=dueReviewSection(), performance=performanceSection(), recent=recentActivitySection();
  return `<div class="dashboard-view"><section class="dashboard-welcome">${welcomeSection()}</section>
    <section class="dashboard-mission">${todaysMissionSection(nextDay,today,isDone)}</section>
    <section class="dashboard-journey">${journeySection(total,nextDay)}</section>
    <section class="dashboard-momentum">${momentumSection(current)}</section>
    ${due?`<section class="dashboard-due">${due}</section>`:''}
    ${performance?`<section class="dashboard-performance">${performance}</section>`:''}
    <section class="dashboard-quick">${quickAccessSection(nextDay)}</section>
    ${recent?`<section class="dashboard-recent">${recent}</section>`:''}</div>`;
}

function wire(root) {
  const cont=root.querySelector('#btn-continue');
  if(cont)cont.addEventListener('click',()=>{const {total}=computeStreaks(state.completedDays);navigate(`/topic/${Math.min(total+1,TOTAL_DAYS)}`);});
  const review=root.querySelector('#btn-start-review');if(review)review.addEventListener('click',()=>navigate('/reviews'));
  root.querySelectorAll('[data-quick]').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.quick)));
  root.querySelectorAll('[data-activity-topic]').forEach(btn=>btn.addEventListener('click',()=>{const day=getDayByTopicId(btn.dataset.activityTopic);if(day)navigate(`/topic/${day.day}`);}));
}
