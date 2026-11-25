import { getQuestionBank, getQuestionBankSystems } from '../data/questions.js';
import { submitQuizAttempt } from '../core/sync.js';
import { state } from '../state.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';

export function renderMockExam(root) {
  let system = 'all';
  let difficulty = 'all';
  let length = 20;
  let duration = 30;
  let questions = [];
  let answers = [];
  let saves = [];
  let index = 0;
  let startedAt = 0;
  let deadline = 0;
  let remaining = duration * 60;
  let finished = false;
  let interval = null;
  const preventExit = (event) => { if (!finished) { event.preventDefault(); event.returnValue = ''; } };

  const bank = getQuestionBank();
  const systems = getQuestionBankSystems();

  function paintSetup() {
    root.innerHTML = `
      <div class="page-heading">
        <span class="page-eyebrow">MED100 · EXAM SIMULATION</span>
        <h2>Mock examination</h2>
        <p>A timed, mixed-topic assessment. Answers and explanations remain hidden until you submit or time expires.</p>
      </div>
      <section class="mock-intro">
        <span class="mock-kicker">THE QUESTION BANK</span>
        <strong>${bank.length}</strong>
        <p>published questions across ${systems.length} clinical disciplines</p>
        <small>Questions are drawn from the current Med100 curated bank. This is a learning assessment, not a validated licensing examination.</small>
      </section>
      <section class="mock-setup">
        <label><span>CLINICAL DISCIPLINE</span><select id="mock-system"><option value="all">All disciplines</option>${systems.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select></label>
        <label><span>DIFFICULTY</span><select id="mock-difficulty"><option value="all">All levels</option><option>Foundational</option><option>Intermediate</option><option>Advanced</option></select></label>
        <label><span>QUESTION COUNT</span><select id="mock-length"><option value="10">10 questions</option><option value="20" selected>20 questions</option><option value="30">30 questions</option></select></label>
        <label><span>TIME LIMIT</span><select id="mock-duration"><option value="15">15 minutes</option><option value="30" selected>30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></label>
        <div id="mock-availability" class="mock-availability">Available questions: ${bank.length}</div>
        <button id="mock-start" class="btn btn-primary">Start mock examination</button>
      </section>
      <p class="mock-footnote">Once started, the timer cannot be paused. Your answers are recorded individually to your account when signed in. A connection failure is shown clearly and can be retried.</p>
    `;
    root.querySelector('#mock-system').value = system;
    root.querySelector('#mock-difficulty').value = difficulty;
    root.querySelector('#mock-length').value = String(length);
    root.querySelector('#mock-duration').value = String(duration);
    const updateAvailability = () => {
      const available = getQuestionBank({system:root.querySelector('#mock-system').value,difficulty:root.querySelector('#mock-difficulty').value}).length;
      root.querySelector('#mock-availability').textContent = `Available questions: ${available}`;
      root.querySelector('#mock-start').disabled = available === 0;
      root.querySelector('#mock-length').querySelectorAll('option').forEach(o => { o.disabled = Number(o.value) > available; });
      if (Number(root.querySelector('#mock-length').value) > available) {
        const fallback = [30,20,10].find(n=>n<=available) || 10;
        root.querySelector('#mock-length').value = String(fallback);
      }
    };
    ['#mock-system','#mock-difficulty'].forEach(sel => root.querySelector(sel).addEventListener('change', updateAvailability));
    root.querySelector('#mock-start').addEventListener('click', () => {
      system = root.querySelector('#mock-system').value;
      difficulty = root.querySelector('#mock-difficulty').value;
      length = Number(root.querySelector('#mock-length').value);
      duration = Number(root.querySelector('#mock-duration').value);
      startExam();
    });
    updateAvailability();
  }

  function startExam() {
    const pool = getQuestionBank({system,difficulty});
    questions = [...pool].sort(() => Math.random() - 0.5).slice(0,length);
    answers = questions.map(() => null);
    saves = questions.map(() => state.user ? 'idle' : 'local');
    index = 0;
    startedAt = Date.now();
    deadline = startedAt + duration * 60000;
    remaining = duration * 60;
    finished = false;
    paintExam();
    window.addEventListener('beforeunload', preventExit);
    interval = setInterval(() => {
      remaining = Math.max(0,Math.ceil((deadline-Date.now())/1000));
      const clock = root.querySelector('#mock-clock');
      if (clock) {
        clock.textContent = formatTime(remaining);
        clock.classList.toggle('is-urgent',remaining<=300);
      }
      if (remaining <= 0) finishExam(true);
    },1000);
  }

  function paintExam() {
    if (finished) return paintResults();
    const q = questions[index];
    const answered = answers.filter(a=>a!==null).length;
    root.innerHTML = `
      <div class="mock-exam-top">
        <div><span class="mock-kicker">TIMED ASSESSMENT</span><h2>Mock examination</h2><small>${esc(system==='all'?'All disciplines':system)} · ${questions.length} questions</small></div>
        <div class="mock-clock" id="mock-clock">${formatTime(remaining)}</div>
      </div>
      <div class="mock-progress"><span style="width:${Math.round(answered/questions.length*100)}%"></span></div>
      <div class="mock-session-line"><span>${answered} of ${questions.length} answered</span><span>Question ${index+1} / ${questions.length}</span></div>
      <div class="mock-number-grid">${questions.map((item,i)=>`<button type="button" data-jump="${i}" class="${i===index?'active':''} ${answers[i]!==null?'answered':''}">${i+1}</button>`).join('')}</div>
      <section class="mock-question">
        <div class="mock-question-meta"><span>${esc(q.system)}</span><span>${esc(q.difficulty)}</span></div>
        <h3>${esc(q.stem)}</h3>
        <div class="mock-options">${q.options.map((o,i)=>`<button type="button" data-answer="${i}" class="${answers[index]===i?'chosen':''}" ${answers[index]!==null?'disabled':''}><b>${String.fromCharCode(65+i)}</b><span>${esc(o)}</span></button>`).join('')}</div>
      </section>
      <div class="mock-controls">
        <button id="mock-prev" class="btn btn-outline" ${index===0?'disabled':''}>Previous</button>
        <button id="mock-next" class="btn btn-primary">${index===questions.length-1?'Review answers':'Next question'}</button>
      </div>
      <div class="mock-submit-row"><span>${state.user?'Your selected answers are saved as you go.':'Guest session · answers are not saved to an account.'}</span><button id="mock-submit">Submit examination</button></div>
      ${saves[index]==='failed'?'<p class="mock-save-error">This answer has not synced. You can retry without answering again.</p><button id="mock-retry-current" class="mock-retry-save">Retry saving this answer</button>':''}
      ${saves[index]==='saving'?'<p class="mock-save-state">Saving answer…</p>':''}
    `;
    root.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>{index=Number(b.dataset.jump);paintExam();}));
    root.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>chooseAnswer(Number(b.dataset.answer))));
    root.querySelector('#mock-prev').addEventListener('click',()=>{if(index>0){index--;paintExam();}});
    root.querySelector('#mock-next').addEventListener('click',()=>{if(index<questions.length-1){index++;paintExam();}else paintExamReviewPrompt();});
    root.querySelector('#mock-submit').addEventListener('click',()=>confirmFinish());
    root.querySelector('#mock-retry-current')?.addEventListener('click',()=>retrySave(index));
  }

  async function chooseAnswer(selected) {
    if(answers[index]!==null || finished) return;
    const current=index,q=questions[current];
    answers[current]=selected;
    if(!state.user){paintExam();return;}
    saves[current]='saving';
    paintExam();
    try{
      await submitQuizAttempt(state.user.uid,{topicId:q.topicId,mcqId:q.id,selectedOption:selected,isCorrect:selected===q.correct});
      saves[current]='saved';
    }catch(error){console.error('Mock exam attempt save failed:',error);saves[current]='failed';}
    if(finished) updateSavedStatus(current);
    else if(index===current) paintExam();
  }

  function paintExamReviewPrompt() {
    const unanswered=answers.filter(a=>a===null).length;
    root.innerHTML=`<div class="mock-confirm"><h2>Review before submission</h2><p>You have ${unanswered} unanswered question(s). You can return to them or submit now.</p><button id="mock-return" class="btn btn-outline">Return to questions</button><button id="mock-confirm-submit" class="btn btn-primary">Submit and see results</button></div>`;
    root.querySelector('#mock-return').addEventListener('click',()=>paintExam());
    root.querySelector('#mock-confirm-submit').addEventListener('click',()=>finishExam(false));
  }

  function confirmFinish() {
    const unanswered=answers.filter(a=>a===null).length;
    const msg=unanswered ? `You have ${unanswered} unanswered questions. Submit now?` : 'Submit your examination and view results?';
    if(window.confirm(msg)) finishExam(false);
  }

  function finishExam(timedOut) {
    if(finished) return;
    finished=true;
    window.removeEventListener('beforeunload', preventExit);
    if(interval){clearInterval(interval);interval=null;}
    remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));
    paintResults(timedOut);
  }

  async function retrySave(i) {
    const q=questions[i], selected=answers[i];
    if(!state.user || selected===null || saves[i]==='saving' || saves[i]==='saved') return;
    saves[i]='saving';
    if(finished) updateSavedStatus(i); else if(index===i) paintExam();
    try {
      await submitQuizAttempt(state.user.uid,{topicId:q.topicId,mcqId:q.id,selectedOption:selected,isCorrect:selected===q.correct});
      saves[i]='saved';
    } catch(error) {
      console.error('Mock exam retry failed:',error);
      saves[i]='failed';
    }
    if(finished) updateSavedStatus(i); else if(index===i) paintExam();
  }

  function updateSavedStatus(i) {
    const el=document.getElementById('mock-save-'+i);
    if(el) el.textContent=saves[i]==='saved'?'Saved':saves[i]==='failed'?'Not synced — attempt needs retry':saves[i]==='saving'?'Saving…':saves[i]==='local'?'Guest · not saved':'Not answered';
    const old=root.querySelector('[data-retry-save="'+i+'"]');
    if(saves[i]==='failed' && !old) {
      const host=el?.parentElement;
      if(host) {
        const b=document.createElement('button');
        b.type='button'; b.className='mock-retry-save'; b.dataset.retrySave=String(i); b.textContent='Retry save';
        b.addEventListener('click',()=>retrySave(i)); host.append(b);
      }
    } else if(saves[i]!=='failed' && old) old.remove();
  }
  function paintResults(timedOut=false) {
    const answered=answers.filter(a=>a!==null).length;
    const correct=answers.reduce((sum,a,i)=>sum+(a!==null&&a===questions[i].correct?1:0),0);
    const pct=answered?Math.round(correct/answered*100):0;
    root.innerHTML=`
      <section class="mock-results">
        <span class="mock-kicker">${timedOut?'TIME EXPIRED':'EXAMINATION SUBMITTED'}</span>
        <h2>Assessment results</h2>
        <div class="mock-score"><strong>${correct}<small> / ${questions.length}</small></strong><span>${pct}% of attempted questions correct</span></div>
        <div class="mock-result-stats"><div><b>${answered}</b><span>Answered</span></div><div><b>${questions.length-answered}</b><span>Unanswered</span></div><div><b>${questions.filter((q,i)=>answers[i]!==null&&answers[i]!==q.correct).length}</b><span>Incorrect</span></div></div>
        <p>${state.user?'Individual answered questions were submitted to your quiz-attempt history.':'This guest result exists only for this session and has not been saved.'} ${saves.includes('failed')?'Some answers could not be synced; see their status below.':''}</p>
      </section>
      <section class="mock-review"><div class="mock-review-heading">DETAILED ANSWER REVIEW</div>
      ${questions.map((q,i)=>{const a=answers[i],ok=a!==null&&a===q.correct;return `
        <article class="mock-review-item">
          <div class="mock-review-meta"><span>Q${i+1} · ${esc(q.system)} · ${esc(q.difficulty)}</span><b class="${a===null?'unanswered':ok?'right':'wrong'}">${a===null?'Unanswered':ok?'Correct':'Incorrect'}</b></div>
          <h3>${esc(q.stem)}</h3>
          <p class="mock-answer-line"><span>Your answer</span><b>${a===null?'—':esc(q.options[a])}</b></p>
          <p class="mock-answer-line correct-line"><span>Correct answer</span><b>${esc(q.options[q.correct])}</b></p>
          <p class="mock-explanation">${esc(q.explanation)}</p>
          <small class="mock-save-state" id="mock-save-${i}">${saves[i]==='saved'?'Saved':saves[i]==='failed'?'Not synced — attempt needs retry':saves[i]==='local'?'Guest · not saved':saves[i]==='saving'?'Still saving':'Not answered'}</small>
          ${saves[i]==='failed'?`<button type="button" class="mock-retry-save" data-retry-save="${i}">Retry save</button>`:''}
        </article>`;}).join('')}
      </section>
      <div class="mock-result-actions"><button id="mock-new" class="btn btn-primary">Start another mock exam</button><button id="mock-home" class="btn btn-outline">Back to dashboard</button></div>
    `;
    root.querySelector('#mock-new').addEventListener('click',()=>{if(interval)clearInterval(interval);paintSetup();});
    root.querySelector('#mock-home').addEventListener('click',()=>navigate('/dashboard'));
    root.querySelectorAll('[data-retry-save]').forEach(b=>b.addEventListener('click',()=>retrySave(Number(b.dataset.retrySave))));
  }

  paintSetup();
  return () => { window.removeEventListener('beforeunload', preventExit); if(interval) clearInterval(interval); };
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
}
