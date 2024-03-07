let myLibrary = [
	{ title: "The Hobbit", author: "JRR Tolkien", pages: 320, read: true },
	{ title: "Les fourmis", author: "Bernard Werber", pages: 560, read: false },
];
const TITLE = document.querySelector("#title");
const AUTHOR = document.querySelector("#author");
const PAGES = document.querySelector("#pages");
const READ = document.querySelector("#read");
const ADDBOOK = document.querySelector("#add-book");
const FORM = document.querySelector("#form");
const SHOWBOOK = document.querySelector("#showBook");
let BTNDELETE = document.querySelectorAll(".btnDelete");

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

function showBook() {
	while (SHOWBOOK.firstChild) {
		SHOWBOOK.firstChild.remove();
	}

	myLibrary.forEach((book) => {
		let newCard = document.createElement("div");
		newCard.setAttribute("class", "card");
		let content = `${book.title} by ${book.author}, ${book.pages} pages, read : ${book.read}`;

		let newP = document.createElement("p");
		newP.textContent = content;

		let btnDelete = document.createElement("button");
		btnDelete.setAttribute("class", "btnDelete");
		btnDelete.textContent = "X";

		newCard.appendChild(newP);
		newCard.appendChild(btnDelete);

		SHOWBOOK.appendChild(newCard);
		BTNDELETE = document.querySelectorAll(".btnDelete");
	});
}

function deleteBook() {
	BTNDELETE.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			btn.parentElement.remove();
			myLibrary.splice(index, 1);
			BTNDELETE = document.querySelectorAll(".btnDelete");
		});
	});
}

ADDBOOK.addEventListener("click", () => {
	addBookToLibrary();
	showBook();
	deleteBook();
});

(window.onload = showBook()), deleteBook();
