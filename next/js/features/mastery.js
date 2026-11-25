// Question Practice — a focused exam-style session using the curated local MCQ bank.
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
  let showReview = false;
  const answers = questions.map(() => null);
  const saveStates = questions.map(() => state.user ? 'idle' : 'local');

  function answeredCount() {
    return answers.filter((answer) => answer !== null).length;
  }

  function correctCount() {
    return answers.reduce((total, answer, i) =>
      total + (answer !== null && answer === questions[i].correct ? 1 : 0), 0);
  }

  function paint() {
    if (!day || questions.length === 0) {
      root.innerHTML = pageHeading(day) + `
        <div class="exam-empty">
          <span class="exam-empty-mark">—</span>
          <h3>Questions are being prepared</h3>
          <p>There are no published questions for this topic yet. We won't substitute unrelated questions.</p>
          <button id="btn-back-topic" class="btn btn-outline">Back to topic</button>
        </div>`;
      root.querySelector('#btn-back-topic')?.addEventListener('click', () => navigate(`/topic/${day?.day ?? ''}`));
      return;
    }

    if (showReview) {
      root.innerHTML = pageHeading(day) + reviewTemplate(day, questions, answers, correctCount(), saveStates);
      wireReview();
      return;
    }

    root.innerHTML = pageHeading(day) + examTemplate(questions, index, answers, saveStates, answeredCount(), correctCount());
    wireExam();
  }

  function wireExam() {
    root.querySelectorAll('[data-question-jump]').forEach((button) => {
      button.addEventListener('click', () => {
        index = Number(button.dataset.questionJump);
        paint();
      });
    });

    root.querySelectorAll('[data-option]').forEach((button) => {
      button.addEventListener('click', async () => {
        if (answers[index] !== null) return;
        const selected = Number(button.dataset.option);
        answers[index] = selected;
        const currentIndex = index;
        const q = questions[currentIndex];

        // Paint immediately so the chosen answer is locked and feedback is visible.
        paint();
        if (!state.user) return;

        saveStates[currentIndex] = 'saving';
        paint();
        try {
          await submitQuizAttempt(state.user.uid, {
            topicId: day.topicId,
            mcqId: q.id,
            selectedOption: selected,
            isCorrect: selected === q.correct,
          });
          saveStates[currentIndex] = 'saved';
        } catch (error) {
          console.error('Failed to submit quiz attempt:', error);
          saveStates[currentIndex] = 'failed';
        }
        // Do not steal focus or move the learner after a network response.
        if (!showReview && index === currentIndex) paint();
      });
    });

    root.querySelector('#btn-retry-save')?.addEventListener('click', async () => {
      const q = questions[index];
      const selected = answers[index];
      if (selected === null || !state.user) return;
      saveStates[index] = 'saving';
      paint();
      try {
        await submitQuizAttempt(state.user.uid, {
          topicId: day.topicId,
          mcqId: q.id,
          selectedOption: selected,
          isCorrect: selected === q.correct,
        });
        saveStates[index] = 'saved';
      } catch (error) {
        console.error('Retry failed:', error);
        saveStates[index] = 'failed';
      }
      paint();
    });

    root.querySelector('#btn-previous')?.addEventListener('click', () => {
      if (index > 0) { index--; paint(); }
    });
    root.querySelector('#btn-next')?.addEventListener('click', () => {
      if (index < questions.length - 1) { index++; paint(); }
      else { showReview = true; paint(); }
    });
    root.querySelector('#btn-finish')?.addEventListener('click', () => {
      showReview = true;
      paint();
    });
  }

  function wireReview() {
    root.querySelector('#btn-retry-review')?.addEventListener('click', () => {
      showReview = false;
      const firstMissed = answers.findIndex((answer, i) => answer !== null && answer !== questions[i].correct);
      index = firstMissed >= 0 ? firstMissed : 0;
      paint();
    });
    root.querySelector('#btn-teach-it')?.addEventListener('click', () => navigate(`/teaching/${day.day}`));
    root.querySelector('#btn-back-topic')?.addEventListener('click', () => navigate(`/topic/${day.day}`));
  }

  paint();
}

function pageHeading(day) {
  return `
    <div class="page-heading">
      <span class="page-eyebrow">ACTIVE RECALL · DAY ${day?.day ?? ''}</span>
      <h2>Question practice</h2>
      <p>${esc(day?.title || 'Topic questions')} — Work through the question set, then review every answer.</p>
    </div>
  `;
}

function examTemplate(questions, index, answers, saveStates, answered, correct) {
  const q = questions[index];
  const selected = answers[index];
  const isAnswered = selected !== null;
  const percent = Math.round((answered / questions.length) * 100);
  const save = saveStates[index];
  const status = save === 'saved'
    ? '<span class="exam-sync exam-sync-saved">Saved to your account</span>'
    : save === 'saving'
      ? '<span class="exam-sync">Saving attempt…</span>'
      : save === 'failed'
        ? '<span class="exam-sync exam-sync-error">Not synced — retry below</span>'
        : save === 'local'
          ? '<span class="exam-sync">Practice only · sign in to save attempts</span>'
          : '<span class="exam-sync">Answer to record this attempt</span>';

  return `
    <section class="exam-overview">
      <div class="exam-overview-top">
        <div><span class="exam-overline">SESSION PROGRESS</span><strong>${answered}<small> / ${questions.length} answered</small></strong></div>
        <div class="exam-score-preview"><span>Correct so far</span><strong>${correct}</strong></div>
      </div>
      <div class="exam-progress-track" role="progressbar" aria-label="Questions answered" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${answered}"><span style="width:${percent}%"></span></div>
      <div class="exam-question-map" aria-label="Question navigation">
        ${questions.map((item, i) => `<button type="button" data-question-jump="${i}" class="${i === index ? 'is-current' : ''} ${answers[i] !== null ? (answers[i] === item.correct ? 'is-correct' : 'is-incorrect') : ''}" aria-label="Go to question ${i + 1}" aria-current="${i === index ? 'step' : 'false'}">${String(i + 1).padStart(2, '0')}</button>`).join('')}
      </div>
    </section>

    <section class="exam-question-panel">
      <div class="exam-question-meta"><span>QUESTION ${String(index + 1).padStart(2, '0')}</span><span>${isAnswered ? 'ANSWER RECORDED' : 'SINGLE BEST ANSWER'}</span></div>
      <h3>${esc(q.stem)}</h3>
      <div class="exam-options">
        ${q.options.map((option, i) => {
          const chosen = selected === i;
          const correctOption = isAnswered && i === q.correct;
          const wrongChosen = chosen && selected !== q.correct;
          return `<button type="button" class="exam-option ${correctOption ? 'is-correct' : ''} ${wrongChosen ? 'is-incorrect' : ''} ${chosen ? 'is-selected' : ''}" data-option="${i}" ${isAnswered ? 'disabled' : ''}>
            <span class="exam-option-letter">${String.fromCharCode(65 + i)}</span>
            <span class="exam-option-text">${esc(option)}</span>
            <span class="exam-option-mark">${correctOption ? '✓' : wrongChosen ? '×' : ''}</span>
          </button>`;
        }).join('')}
      </div>
      ${isAnswered ? `
        <div class="exam-explanation ${selected === q.correct ? 'is-right' : 'is-wrong'}">
          <div class="exam-explanation-heading">${selected === q.correct ? 'Correct answer' : 'Review this answer'}</div>
          <p>${esc(q.explanation)}</p>
        </div>
        <div class="exam-save-row">${status}${save === 'failed' ? '<button id="btn-retry-save" class="exam-retry">Retry save</button>' : ''}</div>
      ` : ''}
      <div class="exam-navigation">
        <button id="btn-previous" class="btn btn-ghost" ${index === 0 ? 'disabled' : ''}>← Previous</button>
        ${index === questions.length - 1
          ? `<button id="btn-finish" class="btn btn-primary" ${answered === 0 ? 'disabled' : ''}>Review session</button>`
          : `<button id="btn-next" class="btn btn-primary">${isAnswered ? 'Next question →' : 'Skip for now →'}</button>`}
      </div>
      <p class="exam-navigation-hint">You can move between questions at any time. Unanswered questions remain marked.</p>
    </section>
  `;
}

function reviewTemplate(day, questions, answers, correct, saveStates) {
  const total = questions.length;
  const attempted = answers.filter((answer) => answer !== null).length;
  const pct = attempted ? Math.round((correct / attempted) * 100) : 0;
  const missed = questions.filter((q, i) => answers[i] !== null && answers[i] !== q.correct).length;
  return `
    <section class="exam-results">
      <div class="exam-results-kicker">SESSION COMPLETE · DAY ${day.day}</div>
      <h3>${esc(day.title)}</h3>
      <div class="exam-results-score"><strong>${correct}<small> / ${total}</small></strong><span>${pct}% of attempted questions correct</span></div>
      <div class="exam-results-stats">
        <div><strong>${attempted}</strong><span>Answered</span></div>
        <div><strong>${total - attempted}</strong><span>Unanswered</span></div>
        <div><strong>${missed}</strong><span>Incorrect</span></div>
      </div>
      <p class="exam-results-note">${total - attempted ? 'Unanswered questions are not counted as incorrect. Review the full set below.' : 'Review each explanation to reinforce the underlying concepts.'}</p>
    </section>
    <section class="exam-review-list">
      <div class="exam-review-heading"><span>ANSWER REVIEW</span><strong>${total} questions</strong></div>
      ${questions.map((q, i) => {
        const selected = answers[i];
        const isCorrect = selected !== null && selected === q.correct;
        return `
          <article class="exam-review-item">
            <div class="exam-review-item-head"><span>QUESTION ${String(i + 1).padStart(2, '0')}</span><strong class="${selected === null ? 'is-unanswered' : isCorrect ? 'is-right' : 'is-wrong'}">${selected === null ? 'Not answered' : isCorrect ? 'Correct' : 'Incorrect'}</strong></div>
            <h4>${esc(q.stem)}</h4>
            <div class="exam-review-answer"><span>Your answer</span><strong>${selected === null ? '—' : esc(q.options[selected])}</strong></div>
            <div class="exam-review-answer is-key"><span>Correct answer</span><strong>${esc(q.options[q.correct])}</strong></div>
            <p>${esc(q.explanation)}</p>
            <div class="exam-review-save">${saveStates[i] === 'saved' ? 'Attempt saved' : saveStates[i] === 'failed' ? 'Attempt not synced' : saveStates[i] === 'local' ? 'Local practice only' : saveStates[i] === 'saving' ? 'Saving…' : 'Not answered'}</div>
          </article>`;
      }).join('')}
    </section>
    <div class="exam-review-actions">
      <button id="btn-retry-review" class="btn btn-outline">Review missed questions</button>
      <button id="btn-teach-it" class="btn btn-primary">Teach it back</button>
      <button id="btn-back-topic" class="btn btn-ghost">Back to topic</button>
    </div>
  `;
}
