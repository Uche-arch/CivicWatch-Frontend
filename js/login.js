// const loginForm = document.getElementById("loginForm");
// const loginError = document.getElementById("loginError");

// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   loginError.style.display = "none"; // hide error message initially

//   const username = document.getElementById("loginUsername").value.trim();
//   const password = document.getElementById("loginPassword").value.trim();

//   if (!username || !password) {
//     loginError.textContent = "Please fill in both fields.";
//     loginError.style.display = "block";
//     return;
//   }

//   try {
//     const response = await fetch(
//       "https://civicwatch-backend-v2.onrender.com/api/auth/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       }
//     );

//     const data = await response.json();

//     if (response.ok) {
//       // Clear any error message
//       loginError.style.display = "none";

//       // Store JWT token and username
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.username);

//       // Redirect to home page
//       window.location.href = "index.html";
//     } else {
//       loginError.textContent = "Invalid credentials";
//       loginError.style.display = "block";
//     }
//   } catch (error) {
//     loginError.textContent = "Something went wrong. Please try again.";
//     loginError.style.display = "block";
//     console.error(error);
//   }
// });



const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const loginBtn = loginForm.querySelector("button[type='submit']");

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

  // Store original text
  const originalText = loginBtn.textContent;
  loginBtn.textContent = "Loading...";
  loginBtn.disabled = true;

  try {
    const response = await fetch(
      "https://civicwatch-backend-v2.onrender.com/api/auth/login",
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
      loginError.textContent = "Incorrect username or password.";
      loginError.style.display = "block";

      // Reset button
      loginBtn.textContent = originalText;
      loginBtn.disabled = false;
    }
  } catch (error) {
    loginError.textContent = "Something went wrong. Please try again.";
    loginError.style.display = "block";
    console.error(error);

    // Reset button
    loginBtn.textContent = originalText;
    loginBtn.disabled = false;
  }
});


const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  const icon = togglePassword.querySelector("i");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
});

// js/login.js

// // Forgot Password Submission
// document.getElementById("forgotForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const username = document.getElementById("forgotUsername").value;
//   const email = document.getElementById("forgotEmail").value;

//   try {
//     const res = await fetch(
//       "https://civicwatch-backend-v2.onrender.com/api/auth/forgot-password",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email }),
//       }
//     );

//     const data = await res.json();
//     const msg = document.getElementById("forgotMessage");
//     msg.style.color = res.ok ? "green" : "red";
//     msg.textContent = data.message;
//   } catch (err) {
//     console.error(err);
//   }
// });


// Forgot Password Submission
const forgotForm = document.getElementById("forgotForm");
const forgotBtn = forgotForm.querySelector("button[type='submit']");
const forgotMsg = document.getElementById("forgotMessage");

forgotForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("forgotUsername").value.trim();
  const email = document.getElementById("forgotEmail").value.trim();

  // Save original button text
  const originalText = forgotBtn.textContent;
  forgotBtn.textContent = "Sending...";
  forgotBtn.disabled = true;
  forgotMsg.textContent = "";

  try {
    const res = await fetch(
      "https://civicwatch-backend-v2.onrender.com/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      }
    );

    const data = await res.json();
    forgotMsg.style.color = res.ok ? "green" : "red";
    forgotMsg.textContent = data.message;

    // Reset button
    forgotBtn.textContent = originalText;
    forgotBtn.disabled = false;
  } catch (err) {
    console.error(err);
    forgotMsg.style.color = "red";
    forgotMsg.textContent = "Something went wrong. Please try again.";

    // Reset button
    forgotBtn.textContent = originalText;
    forgotBtn.disabled = false;
  }
});

