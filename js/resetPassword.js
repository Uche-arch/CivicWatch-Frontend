// js/reset-password.js

const form = document.getElementById("resetForm");
const msg = document.getElementById("resetMessage");
const modal = document.getElementById("successModal");

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("newPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      form.style.display = "none";
      modal.style.display = "block";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 4000);
    } else {
      msg.style.color = "red";
      msg.textContent = data.message;
    }
  } catch (err) {
    msg.textContent = "Something went wrong.";
  }
});
