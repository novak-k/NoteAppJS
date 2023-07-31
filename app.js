import { initialNotes } from './initialNotes.js';
import { addNote } from './addNote.js';
import { renderNotesTable } from './renderNote.js';
import { renderSummaryTable } from './renderSummary.js';

export let notes = [...initialNotes];

function init() {
  renderTables(notes);

  const addNoteBtn = document.querySelector('#addNoteBtn');
  addNoteBtn.addEventListener('click', addNote);
}

export function renderTables() {
  renderNotesTable(notes);
  renderSummaryTable(notes);
}

export function toggleArchive(note) {
  const rows = document.querySelectorAll('tr')

  for (let el of rows) {
    if (el.getAttribute('data-id') === note.id.toString()) {

      for (let c of el.cells) {
        if (note.archived) {
          c.style.textDecoration = 'none'
        } else {
          c.style.textDecoration = 'line-through'
        }
      }
    }
  }

  note.archived = !note.archived;

  renderTables();
}

export function removeNote(note) {
  const index = notes.indexOf(note);
  if (index !== -1) {
    notes.splice(index, 1);
    renderTables();
  }
}

init();
