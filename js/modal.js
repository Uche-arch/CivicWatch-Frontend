const toggleForgotBtn = document.getElementById("toggleForgot");
const forgotModal = document.getElementById("forgotModal");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModal");

function openModal() {
  forgotModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeModal() {
  forgotModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
  document.body.style.overflow = "auto";
  // Clear form & message on close
  document.getElementById("forgotForm").reset();
  document.getElementById("forgotMessage").textContent = "";
}

toggleForgotBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

closeModalBtn.addEventListener("click", closeModal);

// Also close modal if clicking outside modal box (on overlay)
modalOverlay.addEventListener("click", closeModal);
