const myLibrary = [];
const TITLE = document.querySelector("#title");
const AUTHOR = document.querySelector("#author");
const PAGES = document.querySelector("#pages");
const READ = document.querySelector("#read");
const ADDBOOK = document.querySelector("#add-book");
const FORM = document.querySelector("#form");

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary() {
	let title = TITLE.value;
	let author = AUTHOR.value;
	let pages = PAGES.value;
	let read;
	if (READ.checked) {
		read = true;
	} else {
		read = false;
	}
	let newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	TITLE.value = "";
	AUTHOR.value = "";
	PAGES.value = "";
	READ.checked = false;
}

ADDBOOK.addEventListener("click", addBookToLibrary);
