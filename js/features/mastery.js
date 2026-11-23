// "AI Mastery Mode" — the question-and-feedback experience. No AI
// backend exists yet (would need a secure server-side endpoint, not a
// frontend API key — never put one there); this release uses the
// curated local question bank in data/questions.js, which is real and
// functional, just not AI-generated. The integration boundary for a
// real AI-generated question stream later is this module's
// `getQuestionsForTopic()` call — swapping that for a server call
// later doesn't change anything else here.
import { getDay } from '../data/curriculum.js';
import { getQuestionsForTopic } from '../data/questions.js';
import { submitQuizAttempt } from '../core/sync.js';
import { state } from '../state.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';

export function renderMastery(root, dayParam) {
  const day = getDay(dayParam);
  const questions = day ? getQuestionsForTopic(day.topicId) : [];
  let index = 0;
  let correctCount = 0;
  const missed = [];
  let answered = false;

  function paint() {
    if (!day || questions.length === 0) {
      root.innerHTML = `<div class="empty-state">No questions available for this topic yet.</div>`;
      return;
    }
    if (index >= questions.length) {
      root.innerHTML = summaryTemplate(day, correctCount, questions.length, missed);
      wireSummary();
      return;
    }
    const q = questions[index];
    root.innerHTML = questionTemplate(q, index, questions.length);
    wireQuestion(q);
  }

  function wireQuestion(q) {
    root.querySelectorAll('[data-option]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (answered) return;
        answered = true;
        const selected = Number(btn.dataset.option);
        const isCorrect = selected === q.correct;
        if (isCorrect) correctCount++;
        else missed.push(q);

        root.querySelectorAll('[data-option]').forEach((b, i) => {
          b.disabled = true;
          if (i === q.correct) b.classList.add('correct');
          else if (i === selected) b.classList.add('incorrect');
        });
        root.querySelector('#explanation').classList.remove('hidden');
        const nextBtn = root.querySelector('#btn-next');
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = index === questions.length - 1 ? 'See Results' : 'Next Question';

        if (state.user) {
          try {
            await submitQuizAttempt(state.user.uid, {
              topicId: day.topicId,
              mcqId: q.id,
              selectedOption: selected,
              isCorrect,
            });
          } catch (error) {
            console.error('Failed to submit quiz attempt:', error);
          }
        }
      });
    });
    const next = root.querySelector('#btn-next');
    if (next) {
      next.addEventListener('click', () => {
        index++;
        answered = false;
        paint();
      });
    }
  }

  function wireSummary() {
    const btnTeach = root.querySelector('#btn-teach-it');
    if (btnTeach) btnTeach.addEventListener('click', () => navigate(`/teaching/${day.day}`));
    const btnBack = root.querySelector('#btn-back-topic');
    if (btnBack) btnBack.addEventListener('click', () => navigate(`/topic/${day.day}`));
  }

  paint();
}

function questionTemplate(q, index, totalCount) {
  return `
    <div class="card">
      <div class="card-title">Question ${index + 1} of ${totalCount}</div>
      <p style="font-size:var(--fs-md);margin-bottom:var(--sp-4);">${esc(q.stem)}</p>
      ${q.options
        .map((opt, i) => `<button class="mcq-option" data-option="${i}">${esc(opt)}</button>`)
        .join('')}
      <div id="explanation" class="success-banner hidden" style="margin-top:var(--sp-3);">
        <strong>Explanation:</strong> ${esc(q.explanation)}
      </div>
    </div>
    <button id="btn-next" class="btn btn-outline hidden">Next</button>
  `;
}

function summaryTemplate(day, correctCount, totalCount, missed) {
  const pct = Math.round((correctCount / totalCount) * 100);
  return `
    <div class="card" style="text-align:center;">
      <div class="card-title">Results — ${esc(day.title)}</div>
      <div style="font-size:var(--fs-2xl);font-weight:800;color:var(--color-brand);">${correctCount}/${totalCount}</div>
      <p style="color:var(--color-text-secondary);">${pct}% correct</p>
    </div>
    ${
      missed.length
        ? `<div class="card">
             <div class="card-title">Review These Concepts</div>
             <ul>${missed.map((q) => `<li style="margin-bottom:var(--sp-2);">• ${esc(q.explanation)}</li>`).join('')}</ul>
           </div>`
        : `<div class="success-banner">Perfect score — strong grasp of this topic.</div>`
    }
    <button id="btn-teach-it" class="btn btn-primary" style="margin-bottom:var(--sp-2);">Now Teach It Back</button>
    <button id="btn-back-topic" class="btn btn-ghost">Back to Topic</button>
  `;
}
