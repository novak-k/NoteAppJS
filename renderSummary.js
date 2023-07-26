function createSummaryHeader() {
  const rowHeader = document.createElement('tr');

  const categoryCell = document.createElement('th');
  categoryCell.textContent = 'Category';

  const activeCell = document.createElement('th');
  activeCell.textContent = 'Active';

  const archivedCell = document.createElement('th');
  archivedCell.textContent = 'Archived';

  rowHeader.appendChild(categoryCell);
  rowHeader.appendChild(activeCell);
  rowHeader.appendChild(archivedCell);

  return rowHeader;
}

function filterNotesByCategory(notes, category) {
  return notes.filter((note) => note.category === category);
}

function createSummaryRow(category, notes) {
  const activeNotes = filterNotesByCategory(notes, category).filter(note => !note.archived);
  const archivedNotes = filterNotesByCategory(notes, category).filter(note => note.archived);

  const row = document.createElement('tr');

  const categoryCell = document.createElement('td');
  categoryCell.textContent = category;

  const activeCell = document.createElement('td');
  activeCell.textContent = activeNotes.length;

  const archivedCell = document.createElement('td');
  archivedCell.textContent = archivedNotes.length;

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
