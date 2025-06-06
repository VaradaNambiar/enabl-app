const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
let input_title = "";
let input_content = "";
let data;
let posts = [];

function buildNewPostDialog() {
  let html = "<p>Title: ";
  html += `<input name="title" type="text" value="${input_title}"></p>`;
  document.getElementById("new-post-title").innerHTML = html;

  html = "<p>Content: ";
  html += `<input type="text" value="${input_content}"</p>`;
  document.getElementById("new-post-content").innerHTML += html;

  let button_html = `
  <button id="save-new-post" onclick="saveNewPost()">Save</button>
  <button id="cancel-new-post" onclick="cancelNewPost()">Cancel</button>`;
  document.getElementById("new-post-buttons").innerHTML = button_html;
}

function saveNewPost() {
  data = sessionStorage.getItem("data");
  if (data === null) {
    let html = `<h2>Error retrieving data!</h2>`;
    document.getElementById("new-post").innerHTML = html;
    return;
  }
  posts = JSON.parse(data);

  input_title = document.querySelector("#new-post-title input").value;
  input_content = document.querySelector("#new-post-content input").value;
  posts.push({
    id : posts.length + 1,
    title : input_title,
    body : input_content
  });
  sessionStorage.setItem("data", JSON.stringify(posts));

  fetch(POSTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input_title,
      body: input_content,
    }),
  }).then((response) => response.json());
  window.location.href = "main.html";
}

function cancelNewPost(){
  document.querySelector("#new-post-title input").value = "";
  document.querySelector("#new-post-content input").value = "";
}
window.addEventListener("DOMContentLoaded", buildNewPostDialog());
