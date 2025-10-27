// ===== 1. SEARCH FILTER =====
const searchInput = document.getElementById("search");
const docCards = document.querySelectorAll(".doc-card");

searchInput?.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  docCards.forEach(card => {
    const name = card.querySelector(".doc-name").textContent.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// ===== 2. FILE UPLOAD (Browse Button) =====
const browseBtn = document.querySelector(".upload-btn");
const fileInput = document.getElementById("fileInput");
const docGrid = document.querySelector(".doc-grid");

browseBtn?.addEventListener("click", () => fileInput.click());

fileInput?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) addFileCard(file.name, URL.createObjectURL(file));
});

// ===== 3. DRAG & DROP SIMULATION =====
const uploadBox = document.querySelector(".upload-box");

uploadBox?.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("dragover");
});

uploadBox?.addEventListener("dragleave", () => {
  uploadBox.classList.remove("dragover");
});

uploadBox?.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file) addFileCard(file.name, URL.createObjectURL(file));
});

// ===== 4. ADD FILE CARD FUNCTION =====
function addFileCard(fileName, fileUrl = "#") {
  const newCard = document.createElement("div");
  newCard.className = "doc-card";
  newCard.innerHTML = `
    <div class="doc-icon"><i class="fa-solid fa-file"></i></div>
    <p class="doc-name">${fileName}</p>
    <div class="doc-actions">
        <button class="view-btn">View</button>
        <button class="delete-btn">Delete</button>
    </div>
  `;
  // Store the file URL for viewing
  newCard.dataset.fileUrl = fileUrl;
  docGrid.prepend(newCard);
  showToast(`${fileName} uploaded successfully`);
}

// ===== 5. DELETE FILE =====
docGrid?.addEventListener("click", (e) => {
  const card = e.target.closest(".doc-card");

  if (e.target.classList.contains("delete-btn")) {
    const fileName = card.querySelector(".doc-name").textContent;
    card.style.opacity = "0";
    setTimeout(() => card.remove(), 300);
    showToast(`${fileName} deleted`);
  }

  // ===== 6. VIEW FILE =====
  if (e.target.classList.contains("view-btn")) {
    const fileUrl = card.dataset.fileUrl;
    if (fileUrl && fileUrl !== "#") {
      window.open(fileUrl, "_blank");
    } else {
      showToast("This file cannot be viewed (demo placeholder)");
    }
  }
});

// ===== 7. SIMPLE TOAST MESSAGE =====
function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease";
  document.body.appendChild(toast);
  setTimeout(() => (toast.style.opacity = "1"), 50);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}
