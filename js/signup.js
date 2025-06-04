const signupForm = document.getElementById("signupForm");
const signupError = document.getElementById("signupError");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  signupError.style.display = "none"; // hide error message initially

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !email || !password) {
    signupError.textContent = "Please fill in all fields.";
    signupError.style.display = "block";
    return;
  }

  try {
    const response = await fetch(
      "https://civicwatch-backend.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      signupError.style.display = "none";

      const modal = document.getElementById("successModal");
      modal.style.display = "block";

      setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "login.html";
      }, 3000);
    } else {
      signupError.textContent = data.msg || "Signup failed.";
      signupError.style.display = "block";
    }
  } catch (error) {
    signupError.textContent = "Something went wrong. Please try again.";
    signupError.style.display = "block";
    console.error(error);
  }
});

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("signupPassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "🙈" : "👁️";
});
