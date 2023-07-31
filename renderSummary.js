function createCell(text, isHeader = false) {
  const cell = isHeader ? document.createElement('th') : document.createElement('td');
  cell.textContent = text;

  return cell;
}

function createSummaryHeader() {
  const rowHeader = document.createElement('tr');

  const headers = ['Category', 'Active', 'Archived'];

  headers.forEach((headerText) => {
    const headerCell = createCell(headerText, true);
    rowHeader.appendChild(headerCell);
  });

  return rowHeader;
}

function filterNotesByCategory(notes, category) {
  return notes.filter((note) => note.category === category);
}

function createSummaryRow(category, notes) {
  const categoryNotes = filterNotesByCategory(notes, category);

  const activeNotes = categoryNotes.filter(note => !note.archived);
  const archivedNotes = categoryNotes.filter(note => note.archived);

  const row = document.createElement('tr');

  const categoryCell = createCell(category);
  const activeCell = createCell(activeNotes.length);
  const archivedCell = createCell(archivedNotes.length);

  row.appendChild(categoryCell);
  row.appendChild(activeCell);
  row.appendChild(archivedCell);

  return row;
}

export function renderSummaryTable(notes) {
  const summaryTable = document.querySelector('#summaryTable');
  summaryTable.innerHTML = '';

  const header = createSummaryHeader();
  summaryTable.appendChild(header);

  const categories = ['Task', 'Random Thought', 'Idea'];
  const tableRows = categories.map(category => createSummaryRow(category, notes));
  tableRows.forEach(row => summaryTable.appendChild(row));
}
