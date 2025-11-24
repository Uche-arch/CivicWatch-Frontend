const writePostBtn = document.getElementById("writePostBtn");
const postForm = document.getElementById("postForm");
const submitPost = document.getElementById("submitPost");
const postsList = document.getElementById("postsList");
const postingModal = document.getElementById("postingModal");

writePostBtn.onclick = () => postForm.classList.toggle("hidden");


// function formatTimeAgo(dateString) {
//   const now = new Date();
//   const postDate = new Date(dateString);
//   let secondsAgo = Math.floor((now - postDate) / 1000);

//   // Prevent negative values
//   if (secondsAgo < 0) secondsAgo = 0;

//   if (secondsAgo < 60)
//     return `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`;
//   const minutes = Math.floor(secondsAgo / 60);
//   if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
//   const days = Math.floor(hours / 24);
//   return `${days} day${days !== 1 ? "s" : ""} ago`;
// }

function formatTimeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  let secondsAgo = Math.floor((now - postDate) / 1000);

  // Prevent negative values (future timestamps)
  if (secondsAgo < 0) secondsAgo = 0;

  if (secondsAgo < 60) {
    return secondsAgo === 0 ? "Just now" : `${secondsAgo}s ago`;
  }

  const minutes = Math.floor(secondsAgo / 60);
  if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return days === 1 ? "Yesterday" : `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}


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
    const res = await fetch(
      "https://civicwatch-backend-v2.onrender.com/api/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      }
    );

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
  const res = await fetch(
    "https://civicwatch-backend-v2.onrender.com/api/posts"
  );
  const posts = await res.json();

  postsList.innerHTML = "";
  const currentUser = localStorage.getItem("username");

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    // Convert line breaks into <br> elements
    const formattedContent = post.content.replace(/\n/g, "<br>");
    const formattedTime = formatTimeAgo(post.createdAt);

    postElement.innerHTML = `
      <small style="opacity: 0.7; font-size: 10px;">${formattedTime}</small>
      <p style="font-size: 15px;">${formattedContent}</p>
      <strong style="font-size: 13px; text-align: right; display: block;">- ${post.username}</strong>
    `;

    postsList.appendChild(postElement);
  });
}

// function formatTimeAgo(dateString) {
//   const now = new Date();
//   const postDate = new Date(dateString);
//   const secondsAgo = Math.floor((now - postDate) / 1000);

//   if (secondsAgo < 60)
//     return `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`;
//   const minutes = Math.floor(secondsAgo / 60);
//   if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
//   const days = Math.floor(hours / 24);
//   return `${days} day${days !== 1 ? "s" : ""} ago`;
// }


// Update UI when page loads
window.onload = () => {
  loadPosts();
  const token = localStorage.getItem("token");
  if (token) {
    writePostBtn.classList.remove("hidden");
  }
};
