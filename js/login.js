document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from submitting the default way

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Store the JWT token and username in localStorage
    localStorage.setItem("token", data.token); 
    localStorage.setItem("username", data.username); 

    // Redirect to the home page after successful login
    window.location.href = "index.html";
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


// js/login.js


// Forgot Password Submission
document.getElementById('forgotForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('forgotUsername').value;
  const email = document.getElementById('forgotEmail').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email }),
    });

    const data = await res.json();
    const msg = document.getElementById('forgotMessage');
    msg.style.color = res.ok ? 'green' : 'red';
    msg.textContent = data.message;
  } catch (err) {
    console.error(err);
  }
});
