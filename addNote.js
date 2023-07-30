import { renderTables } from "./app.js";
import { notes } from "./app.js";

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
  addNote(notes);
  closeAddNoteModal();
});

function extractDatesFromNote(note) {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return note.content.match(datePattern) || [];
};

export function addNote(notes) {
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
      createdAt: dayjs(new Date(Date.now())).format("MMMM DD, YYYY"),
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
