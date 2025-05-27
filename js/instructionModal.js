document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("instructionModal");
  const closeBtn = document.getElementById("closeInstructionModal");

  if (!localStorage.getItem("instructionModalSeen") && modal && closeBtn) {
    modal.classList.remove("hidden");

    closeBtn.onclick = () => {
      modal.classList.add("hidden");
      localStorage.setItem("instructionModalSeen", "true");
    };
  }

  const userBtn = document.getElementById("userBtn");
  const dropdown = document.getElementById("dropdown");

  userBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent outside click from immediately closing it

    dropdown.style.display =
      dropdown.style.display === "flex" ? "none" : "flex";
  });
});
