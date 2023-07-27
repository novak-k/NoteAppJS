import { initialNotes } from './initialNotes.js';
import { renderNotesTable } from './renderNote.js';
import { renderSummaryTable } from './renderSummary.js';

let notes = [...initialNotes];

function init() {
  renderTables(notes);

  const addNoteBtn = document.querySelector('#addNoteBtn');
  addNoteBtn.addEventListener('click', addNote);

  document.getElementById("edit_form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("ip_name").value;
    const content = document.getElementById("ip_content").value;
    const id = document.getElementById("ip_note_id").value;

    console.log("Name:", name);
    console.log("Content:", content);
    console.log("ID:", id);
  })
}

function renderTables() {
  renderNotesTable(notes);
  renderSummaryTable(notes);
}

function extractDatesFromNote(note) {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return note.content.match(datePattern) || [];
}

function openAddNoteModal() {
  const modal = document.getElementById("note_modal_add");
  const contentInput = document.getElementById("noteContent");
  const contentTitleInput = document.getElementById("noteName");
  const categoryInput = document.getElementById("noteCategory");

  contentInput.value = '';
  contentTitleInput.value = '';
  categoryInput.value = 'Task';

  modal.style.display = "block";
}

function closeAddNoteModal() {
  const modal = document.getElementById("note_modal_add");
  modal.style.display = "none";
}

document.getElementById("addNoteBtn").addEventListener("click", () => {
  openAddNoteModal();
});

document.getElementById("saveNoteBtn").addEventListener("click", () => {
  addNote();
  closeAddNoteModal();
});

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

export function editNote(note, row) {
  const modal = document.getElementById("note_modal_edit");

  const nameInput = document.getElementById("ip_name");
  const contentInput = document.getElementById("ip_content");
  const categoryInput = document.getElementById("ip_category");

  nameInput.value = note.name;
  contentInput.value = note.content;
  categoryInput.value = note.category;

  modal.style.display = "block";

  const saveButton = document.getElementById("edit_save_button");
  saveButton.onclick = () => {
    row.cells[0].textContent = nameInput.value;
    row.cells[2].textContent = contentInput.value;
    row.cells[3].textContent = categoryInput.value;

    nameInput.value = '';
    contentInput.value = '';
    categoryInput.value = '';
    document.getElementById("ip_note_id").value = '';

    modal.style.display = "none";
  };
}

document.getElementById("notesTable").addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-pencil")) {
    const row = event.target.parentNode.parentNode;
    const noteData = {
      name: row.cells[0].textContent,
      content: row.cells[2].textContent,
      category: row.cells[3].textContent,
    };

    editNote(noteData, row);
  }
});

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
