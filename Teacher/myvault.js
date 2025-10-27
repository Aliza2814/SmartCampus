const fileInput = document.getElementById("fileInput");
const uploadBox = document.querySelector(".upload-box");
const uploadBtn = document.querySelector(".upload-btn");
const docGrid = document.querySelector(".doc-grid");

// Load saved files from localStorage
let files = JSON.parse(localStorage.getItem("teacherVaultFiles")) || [];
renderFiles();

// ====== Upload from Button ======
uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const newFiles = Array.from(e.target.files);
  handleFiles(newFiles);
});

// ====== Drag & Drop ======
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("dragging");
});
uploadBox.addEventListener("dragleave", () => uploadBox.classList.remove("dragging"));
uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("dragging");
  const newFiles = Array.from(e.dataTransfer.files);
  handleFiles(newFiles);
});

// ====== Handle Uploads ======
function handleFiles(newFiles) {
  newFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileObj = {
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1) + " KB",
        data: e.target.result,
      };
      files.push(fileObj);
      saveFiles();
      renderFiles();
    };
    reader.readAsDataURL(file);
  });
}

// ====== Render Documents ======
function renderFiles() {
  docGrid.innerHTML = "";
  if (files.length === 0) {
    docGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:gray;">No files uploaded yet</p>`;
    return;
  }

  files.forEach((file, index) => {
    const icon = getFileIcon(file.type);
    const card = document.createElement("div");
    card.className = "doc-card";
    card.innerHTML = `
      <div class="doc-icon">${icon}</div>
      <p class="doc-name">${file.name}</p>
      <small style="color:#777;">${file.size}</small>
      <div class="doc-actions">
        <button class="view-btn">View</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    // View File
    card.querySelector(".view-btn").addEventListener("click", () => {
      const newTab = window.open();
      newTab.document.write(
        `<iframe src="${file.data}" width="100%" height="100%"></iframe>`
      );
    });
    // Delete File
    card.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm(`Delete ${file.name}?`)) {
        files.splice(index, 1);
        saveFiles();
        renderFiles();
      }
    });

    docGrid.appendChild(card);
  });
}

// ====== Helpers ======
function saveFiles() {
  localStorage.setItem("teacherVaultFiles", JSON.stringify(files));
}

function getFileIcon(type) {
  if (type.includes("image")) return "🖼️";
  if (type.includes("pdf")) return "📄";
  if (type.includes("presentation")) return "📊";
  if (type.includes("spreadsheet")) return "📈";
  if (type.includes("word")) return "📝";
  return "📁";
}
