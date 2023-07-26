import { editNote } from './app.js';
import { toggleArchive } from './app.js';
import { removeNote } from './app.js';

function createNoteHeader() {
  const rowHeader = document.createElement('tr');

  const nameCell = document.createElement('th');
  nameCell.textContent = 'Title';

  const dateCell = document.createElement('th');
  dateCell.textContent = 'Created Date';

  const contentCell = document.createElement('th');
  contentCell.textContent = 'Contetnt';

  const categoryCell = document.createElement('th');
  categoryCell.textContent = 'Category';

  const datesCell = document.createElement('th');
  datesCell.textContent = 'Date';

  const iconCell = document.createElement('th');
  iconCell.textContent = 'Actions';

  rowHeader.appendChild(nameCell);
  rowHeader.appendChild(dateCell);
  rowHeader.appendChild(contentCell);
  rowHeader.appendChild(categoryCell);
  rowHeader.appendChild(datesCell);
  rowHeader.appendChild(iconCell);

  return rowHeader;
}

function createNoteRow(note) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('td');
  nameCell.textContent = note.name;

  const dateCell = document.createElement('td');
  dateCell.textContent = note.createdAt;

  const contentCell = document.createElement('td');
  contentCell.textContent = note.content;

  const categoryCell = document.createElement('td');
  categoryCell.textContent = note.category;

  const datesCell = document.createElement('td');
  datesCell.textContent = note.dates?.join(', ');

  const iconCell = document.createElement('td');

  const editIcon = document.createElement('i');
  editIcon.className = 'fa fa-pencil';
  editIcon.addEventListener('click', () => {
    editNote(note);
    console.log('Edit clicked for note:', note);
  });

  const archiveIcon = document.createElement('i');
  archiveIcon.className = 'fa fa-archive';
  archiveIcon.addEventListener('click', () => {
    toggleArchive(note);
    console.log('Archive clicked for note:', note);
  });

  const unarchiveIcon = document.createElement('i');
  unarchiveIcon.className = 'fa fa-undo';
  unarchiveIcon.addEventListener('click', () => {
    toggleArchive(note);
    console.log('Unarchive clicked for note:', note);
  });

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa fa-trash';
  deleteIcon.addEventListener('click', () => {
    removeNote(note);
    console.log('Archive clicked for note:', note);
  });

  if (note.archived) {
    iconCell.appendChild(unarchiveIcon);
  } else {
    iconCell.appendChild(editIcon);
    iconCell.appendChild(archiveIcon);
    iconCell.appendChild(deleteIcon);
  }

  row.appendChild(nameCell);
  row.appendChild(dateCell);
  row.appendChild(contentCell);
  row.appendChild(categoryCell);
  row.appendChild(datesCell);
  row.appendChild(iconCell);

  return row;
}

export function renderNotesTable(notes) {
  const notesTable = document.querySelector('#notesTable');
  notesTable.innerHTML = '';

  const header = createNoteHeader();
  notesTable.appendChild(header);

  const tableRows = notes.map(createNoteRow);
  tableRows.forEach(row => notesTable.appendChild(row));
}
