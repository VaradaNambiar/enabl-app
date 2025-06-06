const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const PAGE_SIZE = 5;
let posts = [];
let currentPage = 1;
let currentPostId = null;
let data = null;
let data_exists = false;

function renderTable(page) {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  let data_json = data_exists? posts : JSON.parse(data);
  const pagePosts = data_json.slice(start, end);

  let html = "<table>";
  html += "<tr><th>ID</th><th>Title</th><th>Body</th></tr>";
  for (const post of pagePosts) {
    html += `<tr>
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td><a href="postpage.html?id=${post.id}" >${post.body}></a></td> 
        </tr>`;
  }
  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}

function renderPagination() {
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<button onclick="goToPage(${i})"${
      i === currentPage ? " disabled" : ""
    }>${i}</button>`;
  }
  document.getElementById("pagination").innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  renderTable(currentPage);
  renderPagination();
}

function initialize() {
  data = sessionStorage.getItem("data");
  if (data === null) {
    fetch(POSTS_URL)
      .then((response) => response.json())
      .then((content) => {
        posts = content;
        sessionStorage.setItem("data", JSON.stringify(posts));
        data = sessionStorage.getItem("data");
        renderTable(currentPage);
        renderPagination();
      });
  } else {
    data_exists=true;
    posts = JSON.parse(data);
    renderTable(currentPage);
    renderPagination();
  }
}
window.goToPage = goToPage;

window.addEventListener("DOMContentLoaded", initialize);
