const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const PAGE_SIZE = 5;
let posts = [];
let currentPage = 1;
let currentPostId =null;

function renderTable(page) {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagePosts = posts.slice(start, end);

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

fetch(POSTS_URL)
  .then((response) => response.json())
  .then((data) => {
    posts = data;
    renderTable(currentPage);
    renderPagination();
  });

window.goToPage = goToPage;
