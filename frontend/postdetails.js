const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
let post;

fetch(`${POSTS_URL}/${postId}`)
  .then((response) => response.json())
  .then((data) => {
    post = data;
    buildPostDetails(post);
    buildEditButtons();
  });

let is_edit_button_disabled = false;
let is_input_field = false;

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

  fetch(`${POSTS_URL}/${post.id}`, {
    method: "PATCH",
    body: JSON.stringify({ title: post.title }),
  }).then((response) => response.json())
};


buildPostDetails(post);
buildEditButtons();
