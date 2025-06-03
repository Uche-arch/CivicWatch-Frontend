const postsList = document.getElementById("postsList");

async function loadUserPosts() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must log in to view your posts.");
    window.location.href = "login.html"; // Redirect to login if not logged in
    return;
  }

  const res = await fetch(
    "https://civicwatch-backend.onrender.com/api/posts/my-posts",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const posts = await res.json();
    postsList.innerHTML = "";

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Convert line breaks into <br> tags
      const formattedContent = post.content.replace(/\n/g, "<br>");

      postElement.innerHTML = `
          <p><strong>${post.username}</strong>: ${formattedContent}</p>
          <button onclick="deletePost('${post._id}')">Delete</button>
        `;

      postsList.appendChild(postElement);
    });
  } else {
    alert("Failed to load your posts.");
  }
}

async function deletePost(postId) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://civicwatch-backend.onrender.com/api/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (res.ok) {
    alert("Post deleted successfully");
    loadUserPosts(); // Reload the list of posts
  } else {
    alert(data.msg);
  }
}

// Update UI when page loads
window.onload = loadUserPosts();
