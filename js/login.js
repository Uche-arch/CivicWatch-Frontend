document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from submitting the default way

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const response = await fetch(
    "https://civicwatch-backend.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

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
