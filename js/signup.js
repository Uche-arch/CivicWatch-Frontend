const signupForm = document.getElementById("signupForm");
const signupError = document.getElementById("signupError");
const signupBtn = document.getElementById("signupBtn");

const usernameInput = document.getElementById("signupUsername");
const emailInput = document.getElementById("signupEmail");
const passwordInput = document.getElementById("signupPassword");
const repeatPasswordInput = document.getElementById("signupRepeatPassword");
const togglePassword = document.getElementById("togglePassword");

const passwordError = document.getElementById("passwordError");
const repeatPasswordError = document.getElementById("repeatPasswordError");
const usernameError = document.getElementById("usernameError");



// function validateUsername() {
//   const username = usernameInput.value.trim();

//   if (username.length < 5) {
//     usernameError.textContent = "Username must be at least 5 characters.";
//     usernameError.style.display = "block";
//     return false;
//   } else {
//     usernameError.style.display = "none";
//     return true;
//   }
// }

function validateUsername() {
  const username = usernameInput.value.trim();

  const validPattern = /^[a-zA-Z0-9._]{5,20}$/;

  // Check if all characters in the username are the same
  const allSameChar = /^([a-zA-Z0-9._])\1*$/.test(username);

  const isValid = validPattern.test(username) && !allSameChar;

  if (!isValid) {
    usernameError.textContent = "5–20 chars; letters, numbers, . _ only";
    usernameError.style.display = "block";
    return false;
  } else {
    usernameError.style.display = "none";
    return true;
  }
}




// Password validation function
function isPasswordStrong(password) {
  // Minimum 6 characters & at least one special character
  // Special characters = anything that is not a letter or number
  return password.length >= 6 && /[^a-zA-Z0-9]/.test(password);
}

function validatePassword() {
  const password = passwordInput.value;

  if (!isPasswordStrong(password)) {
    passwordError.textContent =
      "Password must be at least 6 characters and contain at least one special character.";
    passwordError.style.display = "block";
    return false;
  } else {
    passwordError.style.display = "none";
    return true;
  }
}


function validateRepeatPassword() {
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  if (repeatPassword && password !== repeatPassword) {
    repeatPasswordError.textContent = "Passwords do not match.";
    repeatPasswordError.style.display = "block";
    return false;
  } else {
    repeatPasswordError.style.display = "none";
    return true;
  }
}

// function validateForm() {
//   const username = usernameInput.value.trim();
//   const email = emailInput.value.trim();
//   const password = passwordInput.value;
//   const repeatPassword = repeatPasswordInput.value;

//   const usernameValid = username.length >= 5;
//   const passwordValid = isPasswordStrong(password);
//   const repeatPasswordValid = password === repeatPassword;

//   const allFieldsFilled = username && email && password && repeatPassword;

//   signupBtn.disabled = !(
//     allFieldsFilled &&
//     usernameValid &&
//     passwordValid &&
//     repeatPasswordValid
//   );
// }

function validateForm() {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  // Use the validateUsername() function which includes regex check and error display
  const usernameValid = validateUsername();
  const passwordValid = validatePassword();
  const repeatPasswordValid = validateRepeatPassword();

  const allFieldsFilled = username && email && password && repeatPassword;

  signupBtn.disabled = !(
    allFieldsFilled &&
    usernameValid &&
    passwordValid &&
    repeatPasswordValid
  );
}



// Event listeners
usernameInput.addEventListener("input", () => {
  validateUsername(); // shows/hides error
  // validateForm(); // just checks all statuses
});

emailInput.addEventListener("input", validateForm);

passwordInput.addEventListener("input", () => {
  validatePassword(); // shows/hides error
  validateRepeatPassword(); // update repeat password if needed
  validateForm();
});

repeatPasswordInput.addEventListener("input", () => {
  validateRepeatPassword(); // shows/hides error
  validateForm();
});


signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  signupError.style.display = "none";

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  console.log("Submitting form...");  

  try {
    const response = await fetch(
      "https://civicwatch-backend-v2.onrender.com/api/auth/signup",
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

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "🙈" : "👁️";
});

const toggleRepeatPassword = document.getElementById("toggleRepeatPassword");

toggleRepeatPassword.addEventListener("click", () => {
  const isPassword = repeatPasswordInput.type === "password";
  repeatPasswordInput.type = isPassword ? "text" : "password";
  toggleRepeatPassword.textContent = isPassword ? "🙈" : "👁️";
});








