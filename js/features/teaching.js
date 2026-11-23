// Teaching Mode. No secure server-side AI endpoint exists yet to
// actually evaluate an explanation (and a frontend API key would be a
// real security hole, not a shortcut) — so this release is a genuine,
// clearly-labeled SELF-assessment rubric, not a simulated AI score.
// Swapping this for real AI evaluation later only means replacing
// `scoreSelfAssessment()`'s UI with a call to a server endpoint; the
// rest (submission shape, Firestore write) stays the same.
import { getDay } from '../data/curriculum.js';
import { TEACHING_DIMENSIONS } from '../data/demo-data.js';
import { submitTeachingSession } from '../core/sync.js';
import { state } from '../state.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';

const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition || null;

export function renderTeaching(root, dayParam) {
  const day = getDay(dayParam);
  if (!day || day.comingSoon) {
    root.innerHTML = `<div class="empty-state">No topic content to teach yet.</div>`;
    return;
  }

  let recognizer = null;
  let listening = false;

  function paint() {
    root.innerHTML = inputTemplate(day);
    wireInput();
  }

  function wireInput() {
    const textarea = root.querySelector('#explanation-input');
    const btnMic = root.querySelector('#btn-mic');
    const btnSubmit = root.querySelector('#btn-submit-explanation');

    if (btnMic) {
      btnMic.addEventListener('click', () => {
        if (!SpeechRecognitionCtor) return;
        if (listening) {
          recognizer.stop();
          return;
        }
        recognizer = new SpeechRecognitionCtor();
        recognizer.continuous = true;
        recognizer.interimResults = false;
        recognizer.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          textarea.value = (textarea.value + ' ' + transcript).trim();
        };
        recognizer.onerror = (event) => console.error('Speech recognition error:', event.error);
        recognizer.onend = () => {
          listening = false;
          btnMic.textContent = '🎤 Start Speaking';
          btnMic.classList.remove('btn-primary');
          btnMic.classList.add('btn-outline');
        };
        recognizer.start();
        listening = true;
        btnMic.textContent = '⏹ Stop';
        btnMic.classList.remove('btn-outline');
        btnMic.classList.add('btn-primary');
      });
    }

    btnSubmit.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (text.length < 20) {
        root.querySelector('#teach-error').classList.remove('hidden');
        return;
      }
      renderAssessment(day, text);
    });
  }

  function renderAssessment(day, explanationText) {
    root.innerHTML = assessmentTemplate(day);
    wireAssessment(day, explanationText);
  }

  function wireAssessment(day, explanationText) {
    const sliders = root.querySelectorAll('[data-dimension]');
    const updateOverall = () => {
      const scores = Array.from(sliders).map((s) => Number(s.value));
      const overall = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      root.querySelector('#overall-score').textContent = overall;
      sliders.forEach((s) => {
        const fill = root.querySelector(`[data-fill="${s.dataset.dimension}"]`);
        const num = root.querySelector(`[data-num="${s.dataset.dimension}"]`);
        if (fill) fill.style.width = s.value + '%';
        if (num) num.textContent = s.value;
      });
    };
    sliders.forEach((s) => s.addEventListener('input', updateOverall));
    updateOverall();

    root.querySelector('#btn-submit-assessment').addEventListener('click', async () => {
      const scores = {};
      sliders.forEach((s) => (scores[s.dataset.dimension] = Number(s.value)));
      const missingConcepts = root.querySelector('#missing-concepts').value
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const overall = Math.round(
        Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length,
      );

      if (state.user) {
        try {
          await submitTeachingSession(state.user.uid, {
            topicId: day.topicId,
            topicTitle: day.title,
            mode: SpeechRecognitionCtor ? 'voice' : 'written',
            explanationText,
            accuracyScore: scores.accuracy,
            clinicalReasoningScore: scores.clinicalReasoning,
            completenessScore: scores.completeness,
            confidenceScore: scores.confidence,
            missingConceptsJson: JSON.stringify(missingConcepts),
            hallucinationsJson: JSON.stringify([]),
            feedback: 'Self-assessed (no AI evaluation backend configured yet).',
            masteryScore: overall,
          });
        } catch (error) {
          console.error('Failed to submit teaching session:', error);
        }
      }

      root.innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="card-title">Mastery Score (self-assessed)</div>
          <div style="font-size:var(--fs-2xl);font-weight:800;color:var(--color-brand);">${overall}</div>
        </div>
        <button id="btn-done-teach" class="btn btn-primary">Back to Topic</button>
      `;
      root.querySelector('#btn-done-teach').addEventListener('click', () => navigate(`/topic/${day.day}`));
    });
  }

  paint();
}

function inputTemplate(day) {
  return `
    <span class="pill">${esc(day.system)}</span>
    <h2 style="margin:var(--sp-2) 0 var(--sp-4);font-size:var(--fs-lg);">Explain: ${esc(day.title)}</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:var(--sp-4);">
      Explain this topic as if teaching a colleague who has never seen it. Write at least a
      few sentences covering the core mechanism and why it matters clinically.
    </p>
    ${
      SpeechRecognitionCtor
        ? `<button id="btn-mic" class="btn btn-outline" style="margin-bottom:var(--sp-3);">🎤 Start Speaking</button>`
        : ''
    }
    <textarea id="explanation-input" class="input" rows="8" placeholder="Start explaining…"></textarea>
    <div id="teach-error" class="error-banner hidden" style="margin-top:var(--sp-3);">Write a bit more before submitting — at least a couple of sentences.</div>
    <button id="btn-submit-explanation" class="btn btn-primary" style="margin-top:var(--sp-4);">Submit Explanation</button>
  `;
}

function assessmentTemplate(day) {
  return `
    <div class="card">
      <div class="card-title">Self-Assessment — ${esc(day.title)}</div>
      <p style="color:var(--color-text-secondary);font-size:var(--fs-sm);margin-bottom:var(--sp-4);">
        No AI evaluation is connected yet. Rate your own explanation honestly on each dimension —
        this is a real self-assessment, not a simulated score.
      </p>
      ${TEACHING_DIMENSIONS.map(
        (dim) => `
          <div style="margin-bottom:var(--sp-4);">
            <div class="score-bar-row" style="margin-bottom:var(--sp-1);">
              <span class="label">${esc(dim.label)}</span>
              <div class="score-bar-track"><div class="score-bar-fill" data-fill="${dim.key}" style="width:60%;"></div></div>
              <span class="num" data-num="${dim.key}">60</span>
            </div>
            <input type="range" min="0" max="100" value="60" data-dimension="${dim.key}" style="width:100%;">
            <p style="font-size:var(--fs-xs);color:var(--color-text-secondary);margin-top:2px;">${esc(dim.prompt)}</p>
          </div>`,
      ).join('')}
    </div>

    <div class="card" style="text-align:center;">
      <div class="card-title">Overall Mastery Score</div>
      <div style="font-size:var(--fs-2xl);font-weight:800;color:var(--color-brand);"><span id="overall-score">60</span></div>
    </div>

    <div class="card">
      <div class="card-title">Missing Concepts (optional)</div>
      <textarea id="missing-concepts" class="input" rows="3" placeholder="One per line…"></textarea>
    </div>

    <button id="btn-submit-assessment" class="btn btn-primary">Save Mastery Score</button>
  `;
}
