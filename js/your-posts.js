const postsList = document.getElementById("postsList");

async function loadUserPosts() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must log in to view your posts.");
    window.location.href = "login.html"; // Redirect to login if not logged in
    return;
  }

  try {
    const res = await fetch(
      "https://civicwatch-backend.onrender.com/api/posts/my-posts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to load your posts.");
    }

    const posts = await res.json();
    postsList.innerHTML = "";

    if (posts.length === 0) {
      postsList.innerHTML = `<p>No posts to show.</p>`;
      return;
    }

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Convert line breaks into <br> tags
      const formattedContent = post.content.replace(/\n/g, "<br>");
      const formattedTime = formatTimeAgo(post.createdAt);

      postElement.innerHTML = `
          <p><strong>${post.username}</strong>: ${formattedContent}</p>
          <button onclick="deletePost('${post._id}')">Delete</button>
      <small style="opacity: 0.7">${formattedTime}</small>

        `;

      postsList.appendChild(postElement);
    });
  } catch (error) {
    postsList.innerHTML = `<p>Failed to load posts. Please try again later.</p>`;
    console.error(error);
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
    const modal = document.getElementById("successModal");
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
      loadUserPosts(); // Reload the list of posts
    }, 3000);
  } else {
    alert(data.msg);
  }
}

function formatTimeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const secondsAgo = Math.floor((now - postDate) / 1000);

  if (secondsAgo < 60)
    return `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(secondsAgo / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

// Call loadUserPosts when the page loads
window.onload = loadUserPosts;
