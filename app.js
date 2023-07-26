import { initialNotes } from './initialNotes.js';
import { renderNotesTable } from './renderNote.js';
import { renderSummaryTable } from './renderSummary.js';

let notes = [...initialNotes];

function init() {
  renderTables(notes);

  const addNoteBtn = document.querySelector('#addNoteBtn');
  addNoteBtn.addEventListener('click', addNote);

  const notesTable = document.querySelector('#notesTable');
  notesTable.addEventListener('click', handleNotesTableClick);
}

function renderTables() {
  renderNotesTable(notes);
  renderSummaryTable(notes);
}

function extractDatesFromNote(note) {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return note.content.match(datePattern) || [];
}

function addNote() {
  try {
    const contentInput = document.querySelector('#noteContent');
    const contentTitleInput = document.querySelector('#noteName');
    const categoryInput = document.querySelector('#noteCategory');
    const content = contentInput.value.trim();
    const contentName = contentTitleInput.value.trim();
    const category = categoryInput.value;

    if (!content || !contentName) {
      alert('Please enter some content and title for the note.');
      return;
    }

    const dates = extractDatesFromNote({ content });

    const newNote = {
      id: notes.length + 1,
      createdAt: dayjs(new Date(Date.now())).format("YYYY-MM-DD HH:MM"),
      content,
      name: contentName,
      category,
      dates: dates,
      archived: false,
      icons: notes.icons,
    };

    notes.push(newNote);

    contentInput.value = '';
    contentTitleInput.value = '';
    categoryInput.value = 'Task';

    renderTables(notes);

  } catch (error) {
    console.error('Error adding note:', error);
  }
}

function handleNotesTableClick(event) {
  const target = event.target;
  if (target.classList.contains('fa-pencil')) {
    const row = target.closest('tr');
    const noteId = Number(row.dataset.noteId);
    const note = notes.find((note) => note.id === noteId);
    editNote(note);
  } else if (target.classList.contains('fa-archive') || target.classList.contains('fa-undo')) {
    const row = target.closest('tr');
    const noteId = Number(row.dataset.noteId);
    const note = notes.find((note) => note.id === noteId);
    toggleArchive(note);
  }
}

export function editNote(note) {
  const newContent = prompt('Enter the new content for the note:', note.content);
  if (newContent !== null) {
    note.content = newContent.trim();
    note.name = newContent.trim();
    renderTables();
  }
}

export function toggleArchive(note) {
  const action = note.archived ? 'unarchive' : 'archive';
  const confirmation = confirm(`Are you sure you want to ${action} this note?`);
  if (confirmation) {
    note.archived = !note.archived;
    renderTables();
  }
}

export function removeNote(note) {
  const index = notes.indexOf(note);
  if (index !== -1) {
    notes.splice(index, 1);
    renderTables();
  }
}

init();
