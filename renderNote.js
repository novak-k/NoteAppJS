import { editNote } from './editNote.js';
import { toggleArchive, removeNote } from './app.js';

function createCell(text, isArchived = false) {
  const cell = document.createElement('td');
  cell.textContent = text;
  if (isArchived) {
    cell.style.textDecoration = 'line-through';
  }
  return cell;
}

function createIcon(className, clickHandler) {
  const icon = document.createElement('i');
  icon.className = className;
  icon.addEventListener('click', clickHandler);
  return icon;
}

function createNoteRow(note) {
  const row = document.createElement('tr');
  row.setAttribute('data-id', note.id);

  const nameCell = createCell(note.name, note.archived);
  const dateCell = createCell(note.createdAt, note.archived);
  const contentCell = createCell(note.content, note.archived);
  const categoryCell = createCell(note.category, note.archived);
  const datesCell = createCell(note.dates?.join(', '), note.archived);

  const iconCell = document.createElement('td');

  if (note.archived) {
    iconCell.appendChild(createIcon('fa fa-undo', () => toggleArchive(note)));
  } else {
    iconCell.appendChild(createIcon('fa fa-pencil', () => editNote(note, row)));
    iconCell.appendChild(createIcon('fa fa-archive', () => toggleArchive(note)));
    iconCell.appendChild(createIcon('fa fa-trash', () => removeNote(note)));
  }

  row.appendChild(nameCell);
  row.appendChild(dateCell);
  row.appendChild(contentCell);
  row.appendChild(categoryCell);
  row.appendChild(datesCell);
  row.appendChild(iconCell);

  return row;
}

function createNoteHeader() {
  const rowHeader = document.createElement('tr');

  const headers = ['Title', 'Created Date', 'Content', 'Category', 'Date', 'Actions'];

  headers.forEach((headerText) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    rowHeader.appendChild(headerCell);
  });

  return rowHeader;
}

export function renderNotesTable(notes) {
  const notesTable = document.querySelector('#notesTable');
  notesTable.innerHTML = '';

  const header = createNoteHeader();
  notesTable.appendChild(header);

  const tableRows = notes.map(createNoteRow);
  tableRows.forEach((row) => notesTable.appendChild(row));
}
