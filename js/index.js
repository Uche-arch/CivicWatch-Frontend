// js/index.js

// Function to update the UI based on login status
function updateUI() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userMenu = document.getElementById("userMenu");
  const userBtn = document.getElementById("userBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const dropdown = document.getElementById("dropdown");

  // If the user is logged in (token and username exist)
  if (token && username) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    userMenu.classList.remove("hidden");
    userBtn.textContent = `${username} ▼`;
    logoutBtn.style.display = "inline-block"; // Show logout button for logged-in users
  } else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    userMenu.classList.add("hidden");
    logoutBtn.style.display = "none"; // Hide logout button for guests
  }

  // Add event listener to userBtn to toggle the dropdown visibility
  userBtn?.addEventListener("click", () => {
    dropdown.classList.toggle("hidden"); // Toggle the 'hidden' class for dropdown
  });
}

// Call updateUI on page load
window.onload = () => {
  // Call updateUI to check if user is logged in or not
  updateUI();
};

// Logout functionality
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  // Clear localStorage
  localStorage.clear();

  // Update the UI after logout (without reloading the page)
  updateUI();
});
