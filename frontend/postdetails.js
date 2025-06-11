const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

let data, post;
let posts=[];

let is_edit_button_disabled = false;
let is_input_field = false;

function editTitle() {
  if (is_edit_button_disabled) return;
  is_edit_button_disabled = true;
  is_input_field = true;
  buildPostDetails(post, is_input_field);
  buildEditButtons();
}

function saveTitle() {
  if (!is_edit_button_disabled) return;
  is_edit_button_disabled = false;
  is_input_field = false;
  const newTitle = document.querySelector("#post-title input").value;
  post.title = newTitle;
  buildPostDetails(post, is_input_field);
  buildEditButtons();
  for (let i = 0; i <= posts.length; i++) {
    if (posts[i].id == post.id) {
      posts[i] = post;
      sessionStorage.setItem("data", JSON.stringify(posts));

      break;
    }
  }

  fetch(`${POSTS_URL}/${post.id}`, {
    method: "PATCH",
    body: JSON.stringify({ title: post.title }),
  }).then((response) => response.json());
  window.location.href = "main.html";
}

function buildPostDetails(post, is_input_field) {
  let html = `<div id="post-title"><h2>`;
  if (is_input_field) {
    html += `<input type="text" id="title-input" value="${post.title}">`;
  } else {
    html += `${post.title}`;
  }
  html += `</h2></div>`;
  html += `<p>${post.body}</p>`;
  document.getElementById("post-details").innerHTML = html;
}

function buildEditButtons() {
  document.getElementById("edit-buttons").innerHTML = `
        <button id="edit-button" onclick="editTitle()" ${
          is_edit_button_disabled ? " disabled" : ""
        }>Edit Title</button>
        <button id="save-button" onclick="saveTitle()">Save</button>
        <button id="new-post" onclick="createNewPost()">New Post</button>
    `;
}

function createNewPost() {
  window.location.href = "new_post_dialog.html";
}

function initializePostDetails() {
  data = sessionStorage.getItem("data");

  if (!data) {
    let html = `<h1> Error! </h1>`;
    document.getElementById("post-details").innerHTML = html;
    return;
  }
  posts = JSON.parse(data);
  post = null;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == postId) {
      post = posts[i];
      break;
    }
  }
  if (!post) {
    document.getElementById("post-details").innerHTML =
      "<h1>Post not found!</h1>";
  } else {
    buildPostDetails(post);
    buildEditButtons();
    analyzePostBody(post);
  }
}

function analyzePostBody(post) {
  fetch("http://localhost:3001/api/posts/analyse", {
    // Node.js backend endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      document.getElementById("analysis-result").innerText = `Word Count: ${
        result.wordCount
      }, Sentiment: ${result.sentiments}, Keywords: ${result.keywords.join(
        ", "
      )}`;
    })
    .catch((err) => {
      document.getElementById("analysis-result").innerText = "Analysis failed." + err.message;
    });
}

window.addEventListener("DOMContentLoaded", initializePostDetails);
