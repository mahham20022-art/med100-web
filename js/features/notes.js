import { state, subscribe } from '../state.js';
import { addNote, deleteNote } from '../core/sync.js';
import { esc } from '../core/dom.js';
import { toast } from './guest-link.js';

export function renderNotes(root) {
  const paint = () => {
    root.innerHTML = template();
    wire();
  };

  function wire() {
    root.querySelector('#btn-add-note').addEventListener('click', async () => {
      const input = root.querySelector('#note-input');
      const text = input.value.trim();
      if (!text || !state.user) return;
      try {
        await addNote(state.user.uid, text);
        input.value = '';
      } catch (error) {
        console.error('Failed to add note:', error);
      }
    });
    root.querySelector('#btn-copy-notes')?.addEventListener('click', async () => {
      const md = '# Med100 notes\n\n' + state.notes.map((n) => `## ${n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}\n\n${n.text}\n`).join('\n');
      try { await navigator.clipboard.writeText(md); toast(`Copied ${state.notes.length} note${state.notes.length === 1 ? '' : 's'} as Markdown`); }
      catch { const t = document.createElement('textarea'); t.value = md; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); toast('Copied as Markdown'); }
    });
    root.querySelectorAll('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!state.user) return;
        try {
          await deleteNote(state.user.uid, btn.dataset.delete);
        } catch (error) {
          console.error('Failed to delete note:', error);
        }
      });
    });
  }

  paint();
  return subscribe(paint);
}

function template() {
  const list = state.notes.length
    ? state.notes
        .map(
          (n) => `
        <div class="row" style="align-items:flex-start;">
          <div class="row-main">
            <div style="white-space:pre-wrap;word-break:break-word;">${esc(n.text)}</div>
            <div class="row-sub">${n.createdAt ? new Date(n.createdAt).toLocaleString() : 'just now'}</div>
          </div>
          <button data-delete="${n.id}" class="btn-danger-ghost btn-sm">✕</button>
        </div>`,
        )
        .join('')
    : `<div class="empty-state">No notes yet — write your first one above.</div>`;

  return `
    <div class="page-heading">
      <span class="page-eyebrow">YOUR KNOWLEDGE SPACE</span>
      <h2>Notes</h2>
      <p>Capture the details worth coming back to.</p>
    </div>
    <div class="card">
      <textarea id="note-input" class="input" rows="3" placeholder="Write a note…" style="margin-bottom:var(--sp-3);"></textarea>
      <button id="btn-add-note" class="btn btn-primary">Add Note</button>
    </div>
    ${state.notes.length ? `<div style="display:flex;justify-content:flex-end;margin:-4px 0 8px"><button id="btn-copy-notes" class="btn btn-outline btn-sm" style="width:auto">Copy all as Markdown</button></div>` : ''}
    ${list}
  `;
}
