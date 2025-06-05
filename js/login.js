const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  loginError.style.display = "none"; // hide error message initially

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    loginError.textContent = "Please fill in both fields.";
    loginError.style.display = "block";
    return;
  }

  try {
    const response = await fetch(
      "https://civicwatch-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Clear any error message
      loginError.style.display = "none";

      // Store JWT token and username
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      // Redirect to home page
      window.location.href = "index.html";
    } else {
      loginError.textContent = "Invalid credentials";
      loginError.style.display = "block";
    }
  } catch (error) {
    loginError.textContent = "Something went wrong. Please try again.";
    loginError.style.display = "block";
    console.error(error);
  }
});

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "🙈" : "👁️";
});


// js/login.js

// Forgot Password Submission
document.getElementById("forgotForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("forgotUsername").value;
  const email = document.getElementById("forgotEmail").value;

  try {
    const res = await fetch(
      "https://civicwatch-backend.onrender.com/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      }
    );

    const data = await res.json();
    const msg = document.getElementById("forgotMessage");
    msg.style.color = res.ok ? "green" : "red";
    msg.textContent = data.message;
  } catch (err) {
    console.error(err);
  }
});
