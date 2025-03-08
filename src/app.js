import anime from "animejs";
import Swal from "sweetalert2";
import "./styles.css";
import "./components/note.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const archivedNotesContainer = document.getElementById(
    "archived-notes-container"
  );
  const loadingIndicator = document.getElementById("loading-indicator");

  // Fungsi untuk menampilkan indikator loading
  function showLoading() {
    loadingIndicator.style.display = "block";
  }

  // Fungsi untuk menyembunyikan indikator loading
  function hideLoading() {
    loadingIndicator.style.display = "none";
  }

  // Fungsi untuk menampilkan pesan error
  function showError(message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }

  // Fungsi untuk mengambil data catatan dari API
  async function fetchNotes() {
    showLoading();
    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
      const data = await response.json();
      console.log("Fetched notes:", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      showError("Failed to fetch notes. Please try again later.");
      return [];
    } finally {
      hideLoading();
    }
  }

  // Fungsi untuk mengambil data catatan yang diarsipkan dari API
  async function fetchArchivedNotes() {
    showLoading();
    try {
      const response = await fetch(
        "https://notes-api.dicoding.dev/v2/notes/archived"
      );
      const data = await response.json();
      console.log("Fetched archived notes:", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching archived notes:", error);
      showError("Failed to fetch archived notes. Please try again later.");
      return [];
    } finally {
      hideLoading();
    }
  }

  // Fungsi untuk menambahkan catatan baru ke API
  async function addNoteToAPI(note) {
    showLoading();
    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      console.log("Added note:", data.data);
      Swal.fire("Success", "Note added successfully!", "success");
      return data.data;
    } catch (error) {
      console.error("Error adding note:", error);
      showError("Failed to add note. Please try again later.");
      return null;
    } finally {
      hideLoading();
    }
  }

  // Fungsi untuk menghapus catatan dari API
  async function deleteNoteFromAPI(noteId) {
    showLoading();
    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
        method: "DELETE",
      });
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting note:", error);
      showError("Failed to delete note. Please try again later.");
    } finally {
      hideLoading();
    }
  }

  // Fungsi untuk mengarsipkan catatan dari API
  async function archiveNoteFromAPI(noteId) {
    showLoading();
    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`, {
        method: "POST",
      });
      Swal.fire("Archived!", "Your note has been archived.", "success");
    } catch (error) {
      console.error("Error archiving note:", error);
      showError("Failed to archive note. Please try again later.");
    } finally {
      hideLoading();
    }
  }

  // Fungsi untuk mengembalikan catatan dari arsip di API
  async function unarchiveNoteFromAPI(noteId) {
    showLoading();
    try {
      await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`,
        {
          method: "POST",
        }
      );
      Swal.fire("Unarchived!", "Your note has been unarchived.", "success");
    } catch (error) {
      console.error("Error unarchiving note:", error);
      showError("Failed to unarchive note. Please try again later.");
    } finally {
      hideLoading();
    }
  }

  // Fungsi untuk merender catatan
  function renderNotes(notes, container) {
    console.log("Rendering notes:", notes);
    container.innerHTML = "";
    notes.forEach((note) => {
      const noteElement = document.createElement("app-note");
      noteElement.setAttribute("id", note.id);
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("content", note.body);
      container.appendChild(noteElement);

      noteElement.addEventListener("note-deleted", async (event) => {
        const noteId = event.detail.id;
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
          await deleteNoteFromAPI(noteId);
          const updatedNotes = await fetchNotes();
          renderNotes(updatedNotes, notesContainer);
        }
      });

      noteElement.addEventListener("note-edit", (event) => {
        const { id, title, content } = event.detail;
        const editForm = document.createElement("form");
        editForm.classList.add("edit-form");
        editForm.innerHTML = `
          <input type="text" id="edit-title" value="${title}" required>
          <textarea id="edit-content" required>${content}</textarea>
          <button type="submit">Save Changes</button>
        `;
        container.innerHTML = "";
        container.appendChild(editForm);

        editForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const updatedTitle = editForm.querySelector("#edit-title").value;
          const updatedContent = editForm.querySelector("#edit-content").value;
          await addNoteToAPI({ id, title: updatedTitle, body: updatedContent });
          Swal.fire("Success", "Notes successfully changed!", "success");
          const updatedNotes = await fetchNotes();
          renderNotes(updatedNotes, notesContainer);
        });
      });

      noteElement.addEventListener("note-archived", async (event) => {
        const noteId = event.detail.id;
        await archiveNoteFromAPI(noteId);
        const updatedNotes = await fetchNotes();
        renderNotes(updatedNotes, notesContainer);
        const archivedNotes = await fetchArchivedNotes();
        renderNotes(archivedNotes, archivedNotesContainer);
      });

      noteElement.addEventListener("note-unarchived", async (event) => {
        const noteId = event.detail.id;
        await unarchiveNoteFromAPI(noteId);
        const updatedNotes = await fetchNotes();
        renderNotes(updatedNotes, notesContainer);
        const archivedNotes = await fetchArchivedNotes();
        renderNotes(archivedNotes, archivedNotesContainer);
      });
    });
    animateNotes();
  }

  // Fungsi untuk animasi catatan
  function animateNotes() {
    anime({
      targets: ".note",
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
      delay: anime.stagger(100),
    });
  }

  // Inisialisasi catatan
  async function initNotes() {
    const notes = await fetchNotes();
    renderNotes(notes, notesContainer);
    const archivedNotes = await fetchArchivedNotes();
    renderNotes(archivedNotes, archivedNotesContainer);
  }

  initNotes();

  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.toLowerCase();
    const notes = await fetchNotes();
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query)
    );
    renderNotes(filteredNotes, notesContainer);
  });

  document.addEventListener("note-added", async (event) => {
    const newNote = {
      title: event.detail.title,
      body: event.detail.content,
    };
    await addNoteToAPI(newNote);
    const updatedNotes = await fetchNotes();
    renderNotes(updatedNotes, notesContainer);
  });
});
