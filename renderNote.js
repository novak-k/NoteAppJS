import { editNote } from './editNote.js';
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
  row.setAttribute('data-id', note.id)

  const nameCell = document.createElement('td');
  nameCell.textContent = note.name;
  if (note.archived) {
    nameCell.style.textDecoration = 'line-through';
  };

  const dateCell = document.createElement('td');
  dateCell.textContent = note.createdAt;
  if (note.archived) {
    dateCell.style.textDecoration = 'line-through';
  };

  const contentCell = document.createElement('td');
  contentCell.textContent = note.content;
  if (note.archived) {
    contentCell.style.textDecoration = 'line-through';
  };

  const categoryCell = document.createElement('td');
  categoryCell.textContent = note.category;
  if (note.archived) {
    categoryCell.style.textDecoration = 'line-through';
  };

  const datesCell = document.createElement('td');
  datesCell.textContent = note.dates?.join(', ');
  if (note.archived) {
    datesCell.style.textDecoration = 'line-through';
  };

  const iconCell = document.createElement('td');

  const editIcon = document.createElement('i');
  editIcon.className = 'fa fa-pencil';
  editIcon.addEventListener('click', () => {
    editNote(note, row);
  });

  const archiveIcon = document.createElement('i');
  archiveIcon.className = 'fa fa-archive';
  archiveIcon.addEventListener('click', () => {
    toggleArchive(note);
  });

  const unarchiveIcon = document.createElement('i');
  unarchiveIcon.className = 'fa fa-undo';
  unarchiveIcon.addEventListener('click', () => {
    toggleArchive(note);
  });

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa fa-trash';
  deleteIcon.addEventListener('click', () => {
    removeNote(note);
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
