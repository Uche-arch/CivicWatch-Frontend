const writePostBtn = document.getElementById("writePostBtn");
const postForm = document.getElementById("postForm");
const submitPost = document.getElementById("submitPost");
const postsList = document.getElementById("postsList");
const postingModal = document.getElementById("postingModal");

writePostBtn.onclick = () => postForm.classList.toggle("hidden");

submitPost.onclick = async () => {
  const content = document.getElementById("postContent").value;
  const token = localStorage.getItem("token");

  if (!content.trim()) {
    alert("Please write something before posting.");
    return;
  }

  // Show loading modal
  postingModal.classList.remove("hidden");

  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    if (res.ok) {
      loadPosts();
      postForm.classList.add("hidden");
      document.getElementById("postContent").value = ""; // Clear input
    } else {
      alert(data.msg || "Failed to post.");
    }
  } catch (err) {
    alert("Something went wrong while posting.");
  } finally {
    // Hide modal no matter what
    postingModal.classList.add("hidden");
  }
};

// Function to load posts
async function loadPosts() {
  const res = await fetch("http://localhost:5000/api/posts");
  const posts = await res.json();

  postsList.innerHTML = "";
  const currentUser = localStorage.getItem("username");

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    // Convert line breaks into <br> elements
    const formattedContent = post.content.replace(/\n/g, "<br>");

    postElement.innerHTML = `
      <p>${formattedContent}</p>
      <strong>_${post.username}</strong>
    `;

    postsList.appendChild(postElement);
  });
}

// Update UI when page loads
window.onload = () => {
  loadPosts();
  const token = localStorage.getItem("token");
  if (token) {
    writePostBtn.classList.remove("hidden");
  }
};
