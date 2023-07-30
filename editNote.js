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
