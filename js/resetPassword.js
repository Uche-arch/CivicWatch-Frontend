// const form = document.getElementById("resetForm");
// const msg = document.getElementById("resetMessage");
// const modal = document.getElementById("successModal");

// const params = new URLSearchParams(window.location.search);
// const token = params.get("token");

// const newPasswordInput = document.getElementById("newPassword");

// // Create Confirm Password input
// const confirmPasswordInput = document.createElement("input");
// confirmPasswordInput.type = "password";
// confirmPasswordInput.id = "confirmPassword";
// confirmPasswordInput.placeholder = "Confirm Password";
// confirmPasswordInput.required = true;

// // Wrap input with toggle icon
// function wrapWithIcon(input, iconId) {
//   const wrapper = document.createElement("div");
//   wrapper.classList.add("password-wrapper");

//   const icon = document.createElement("span");
//   icon.className = "toggle-icon";
//   icon.id = iconId;
//   icon.textContent = "👁️";

//   // Insert wrapper before input and then append input and icon
//   input.parentNode.insertBefore(wrapper, input);
//   wrapper.appendChild(input);
//   wrapper.appendChild(icon);
// }

// // Initial setup
// wrapWithIcon(newPasswordInput, "toggleNewPassword");
// form.insertBefore(confirmPasswordInput, form.querySelector("button"));
// wrapWithIcon(confirmPasswordInput, "toggleConfirmPassword");

// // Toggle password visibility with emoji change
// function setupToggle(toggleId, inputEl) {
//   const toggleIcon = document.getElementById(toggleId);

//   toggleIcon.addEventListener("click", () => {
//     const isHidden = inputEl.type === "password";
//     inputEl.type = isHidden ? "text" : "password";
//     toggleIcon.textContent = isHidden ? "🙈" : "👁️";
//   });
// }

// setupToggle("toggleNewPassword", newPasswordInput);
// setupToggle("toggleConfirmPassword", confirmPasswordInput);

// // Password strength check
// function isPasswordStrong(password) {
//   return password.length >= 6 && /[^a-zA-Z0-9]/.test(password);
// }

// // Validate passwords
// function validatePasswords() {
//   const password = newPasswordInput.value.trim();
//   const confirmPassword = confirmPasswordInput.value.trim();

//   if (!isPasswordStrong(password)) {
//     msg.textContent = "Use 6+ chars & 1 special character.";
//     msg.style.color = "red";
//     return false;
//   }

//   if (password !== confirmPassword) {
//     msg.textContent = "Passwords don't match.";
//     msg.style.color = "red";
//     return false;
//   }

//   msg.textContent = "";
//   return true;
// }

// newPasswordInput.addEventListener("input", validatePasswords);
// confirmPasswordInput.addEventListener("input", validatePasswords);

// // Submit handler
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const password = newPasswordInput.value.trim();

//   if (!validatePasswords()) return;

//   try {
//     const res = await fetch(
//       "https://civicwatch-backend-v2.onrender.com/api/auth/reset-password",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, newPassword: password }),
//       }
//     );

//     const data = await res.json();

//     if (res.ok) {
//       form.style.display = "none";
//       modal.style.display = "block";
//       setTimeout(() => {
//         window.location.href = "login.html";
//       }, 4000);
//     } else {
//       msg.textContent = data.message || "Reset failed.";
//       msg.style.color = "red";
//     }
//   } catch (err) {
//     msg.textContent = "Something went wrong.";
//     msg.style.color = "red";
//   }
// });


const form = document.getElementById("resetForm");
const msg = document.getElementById("resetMessage");
const modal = document.getElementById("successModal");

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

const newPasswordInput = document.getElementById("newPassword");

// Create Confirm Password input
const confirmPasswordInput = document.createElement("input");
confirmPasswordInput.type = "password";
confirmPasswordInput.id = "confirmPassword";
confirmPasswordInput.placeholder = "Confirm Password";
confirmPasswordInput.required = true;

// Wrap input with toggle icon
function wrapWithIcon(input, iconId) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("password-wrapper");

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-eye toggle-icon";
  icon.id = iconId;

  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);
  wrapper.appendChild(icon);
}

// Initial setup
wrapWithIcon(newPasswordInput, "toggleNewPassword");
form.insertBefore(confirmPasswordInput, form.querySelector("button"));
wrapWithIcon(confirmPasswordInput, "toggleConfirmPassword");

// Toggle password visibility
function setupToggle(toggleId, inputEl) {
  const toggleIcon = document.getElementById(toggleId);

  toggleIcon.addEventListener("click", () => {
    const isHidden = inputEl.type === "password";
    inputEl.type = isHidden ? "text" : "password";
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
  });
}

setupToggle("toggleNewPassword", newPasswordInput);
setupToggle("toggleConfirmPassword", confirmPasswordInput);

// Password strength check
function isPasswordStrong(password) {
  return password.length >= 6 && /[^a-zA-Z0-9]/.test(password);
}

// Validate passwords
function validatePasswords() {
  const password = newPasswordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!isPasswordStrong(password)) {
    msg.textContent = "Use 6+ chars & 1 special character.";
    msg.style.color = "red";
    return false;
  }

  if (password !== confirmPassword) {
    msg.textContent = "Passwords don't match.";
    msg.style.color = "red";
    return false;
  }

  msg.textContent = "";
  return true;
}

newPasswordInput.addEventListener("input", validatePasswords);
confirmPasswordInput.addEventListener("input", validatePasswords);

// Submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = newPasswordInput.value.trim();

  if (!validatePasswords()) return;

  try {
    const res = await fetch(
      "https://civicwatch-backend-v2.onrender.com/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      form.style.display = "none";
      modal.style.display = "block";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 4000);
    } else {
      msg.textContent = data.message || "Reset failed.";
      msg.style.color = "red";
    }
  } catch (err) {
    msg.textContent = "Something went wrong.";
    msg.style.color = "red";
  }
});

