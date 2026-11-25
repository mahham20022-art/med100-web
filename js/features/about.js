// About Med100 and its limits. Plain statement of what the app is and is not.
export function renderAbout(root) {
  root.innerHTML = `
    <div class="page-heading">
      <span class="page-eyebrow">ABOUT</span>
      <h2>What Med100 is, and is not</h2>
    </div>
    <div class="card publisher">
      <a class="pub-tract" href="https://thetract.org" target="_blank" rel="noopener">
        <svg viewBox="0 0 100 100" aria-hidden="true"><rect x="1.5" y="1.5" width="97" height="97" rx="16" fill="#14212E"/><path d="M18 27H82M44 27V64a14 14 0 0 0 14 14H70" stroke="#F5F6F3" stroke-width="7" fill="none"/><circle cx="75" cy="78" r="5.5" fill="#B66C4E"/></svg>
        <span><b>The Tract</b><small>Independent Neurology Press</small></span>
      </a>
      <p>Med100 is published by <a href="https://thetract.org" target="_blank" rel="noopener">The Tract</a>, a free, independent neurology library: no ads, no subscriptions.</p>
      <div class="profile-row"><span>Editor</span><span>Dr Mohamed Najm<br><small class="muted-s">Neurologist, neurocritical care and neurological emergencies</small></span></div>
      <div class="profile-row"><span>Website</span><a href="https://thetract.org" target="_blank" rel="noopener">thetract.org</a></div>
      <div class="profile-row" style="border-bottom:none"><span>Contact</span><a href="mailto:contact@thetract.org">contact@thetract.org</a></div>
    </div>
    <div class="card prose about">
      <p><strong>Med100 is an educational study aid.</strong> It is not a medical curriculum, a clinical guideline or medical advice, and it does not replace your training programme, your supervisors or your hospital's protocols.</p>
      <p><strong>Content.</strong> Each day is written as a foundational outline of mechanisms, classifications and clinical reasoning. Every topic page says whether it has been clinically reviewed against its listed sources. Until it has, treat it as notes to check, not as a reference. Medicine changes and mistakes are possible: check doses, thresholds and management against current guidelines before you act on anything.</p>
      <p><strong>How it is written.</strong> Topics and questions are drafted with AI assistance from the guidelines and papers listed under each topic. The editor then checks each topic against those sources; only then does the page say so, with the date. Source editions were last brought up to date in November 2026. Med100 is a daily framework for building core understanding, not a stand-alone clinical reference: it leaves out doses, protocols and most trial detail on purpose.</p>
      <p><strong>Questions.</strong> The question bank is curated for practice. It is not a validated licensing examination and its scores do not predict exam results.</p>
      <p><strong>Teaching Mode.</strong> You rate your own explanation. No AI grades it.</p>
      <p><strong>Your data.</strong> Progress, notes and answers are stored in your Med100 account. As a guest they are tied to this browser only; link a Google account from Profile to keep them.</p>
      <p><strong>Found an error?</strong> Write to <a href="mailto:contact@thetract.org?subject=Med100%20content">contact@thetract.org</a> with the day and the line. Corrections are made and dated on the page.</p>
    </div>`;
}
