let books = JSON.parse(localStorage.getItem("books")) || [];

function addBook(){
let title = document.getElementById("title").value;
let pdf = document.getElementById("pdf").value;

if(title && pdf){
books.push({title, pdf});
localStorage.setItem("books", JSON.stringify(books));
showBooks();

document.getElementById("title").value="";
document.getElementById("pdf").value="";
}
}

function showBooks(){
let box = document.getElementById("bookList");
box.innerHTML = "";

books.forEach((b,i)=>{
box.innerHTML += `
<div class="book">
  <h3>${b.title}</h3>

  <div class="actions">
    <button class="read" onclick="window.open('${b.pdf}','_blank')">Read</button>
    <button class="download" onclick="downloadFile('${b.pdf}')">Download</button>
    <button class="delete" onclick="deleteBook(${i})">Delete</button>
  </div>
</div>
`;
});
}

function deleteBook(i){
books.splice(i,1);
localStorage.setItem("books", JSON.stringify(books));
showBooks();
}

function searchBooks(){
let value = document.getElementById("search").value.toLowerCase();

let filtered = books.filter(b =>
b.title.toLowerCase().includes(value)
);

let box = document.getElementById("bookList");
box.innerHTML = "";

filtered.forEach((b,i)=>{
box.innerHTML += `
<div class="book">
  <h3>${b.title}</h3>
  <button class="read" onclick="window.open('${b.pdf}')">Read</button>
  <button class="download" onclick="downloadFile('${b.pdf}')">Download</button>
</div>
`;
});
}

function downloadFile(url){
let a = document.createElement("a");
a.href = url;
a.download = "";
a.click();
}

showBooks();