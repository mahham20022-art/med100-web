// About Med100 and its limits. Plain statement of what the app is and is not.
export function renderAbout(root) {
  root.innerHTML = `
    <div class="page-heading">
      <span class="page-eyebrow">ABOUT</span>
      <h2>What Med100 is, and is not</h2>
    </div>
    <div class="card prose about">
      <p><strong>Med100 is an educational study aid.</strong> It is not a medical curriculum, a clinical guideline or medical advice, and it does not replace your training programme, your supervisors or your hospital's protocols.</p>
      <p><strong>Content.</strong> Each day is written as a foundational outline of mechanisms, classifications and clinical reasoning. Every topic page says whether it has been clinically reviewed against its listed sources. Until it has, treat it as notes to check, not as a reference. Medicine changes and mistakes are possible: check doses, thresholds and management against current guidelines before you act on anything.</p>
      <p><strong>Questions.</strong> The question bank is curated for practice. It is not a validated licensing examination and its scores do not predict exam results.</p>
      <p><strong>Teaching Mode.</strong> You rate your own explanation. No AI grades it.</p>
      <p><strong>Your data.</strong> Progress, notes and answers are stored in your Med100 account. As a guest they are tied to this browser only; link a Google account from Profile to keep them.</p>
      <p><strong>Found an error?</strong> Write to <a href="mailto:contact@thetract.org?subject=Med100%20content">contact@thetract.org</a> with the day and the line. Corrections are made and dated on the page.</p>
    </div>`;
}
