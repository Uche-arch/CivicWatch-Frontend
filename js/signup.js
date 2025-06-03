document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from submitting the default way

  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value; // Get email value
  const password = document.getElementById("signupPassword").value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const response = await fetch(
    "https://civicwatch-backend.onrender.com/api/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }
  );

  const data = await response.json();

  if (response.ok) {
    alert("Signup successful!");
    window.location.href = "login.html"; // Redirect to login page after successful signup
  } else {
    alert(data.msg); // Show error message from the server
  }
});

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("signupPassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "🙈" : "👁️";
});

