let myLibrary = [];
const TITLE = document.querySelector("#title");
const AUTHOR = document.querySelector("#author");
const PAGES = document.querySelector("#pages");
const READ = document.querySelector("#read");
const ADDBOOK = document.querySelector("#add-book");
const FORM = document.querySelector("#form");
const SHOWBOOK = document.querySelector("#showBook");
let BTNDELETE = document.querySelectorAll(".btnDelete");
let BTNCHANGE = document.querySelectorAll(".btnChange");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#open");
const closeButton = document.querySelector("#close");

showButton.addEventListener("click", () => {
	dialog.showModal();
});

closeButton.addEventListener("click", (event) => {
	event.preventDefault();
	dialog.close();
});

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.status = function() {
	this.read == true ? (this.read = false) : (this.read = true);
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

		let newTitleDiv = document.createElement("div");
		let newAuthorDiv = document.createElement("div");
		let newPagesDiv = document.createElement("div");
		let newReadDiv = document.createElement("div");

		newTitleDiv.textContent = `Titre : ${book.title}`;
		newAuthorDiv.textContent = `Author : ${book.author}`;
		newPagesDiv.textContent = `Pages : ${book.pages}`;
		newReadDiv.textContent = `Read : ${book.read}`;

		let btnDelete = document.createElement("button");
		btnDelete.setAttribute("class", "btnDelete");
		btnDelete.textContent = "Delete book";

		let btnChange = document.createElement("button");
		btnChange.setAttribute("class", "btnChange");
		btnChange.textContent = "Change status";

		newCard.appendChild(newTitleDiv);
		newCard.appendChild(newAuthorDiv);
		newCard.appendChild(newPagesDiv);
		newCard.appendChild(newReadDiv);

		newCard.appendChild(btnChange);
		newCard.appendChild(btnDelete);

		SHOWBOOK.appendChild(newCard);
	});
}

function deleteBook() {
	BTNDELETE.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			btn.parentElement.remove();
			myLibrary.splice(index, 1);
			showBook();
			BTNDELETE = document.querySelectorAll(".btnDelete");
			BTNCHANGE = document.querySelectorAll(".btnChange");
			changeStatus();
            deleteBook();
		});
	});
}

function changeStatus() {
	BTNCHANGE.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			myLibrary[index].status();
			btn.previousElementSibling.textContent = `Read : ${myLibrary[index].read}`;
		});
	});
}

ADDBOOK.addEventListener("click", (event) => {
	event.preventDefault();
	addBookToLibrary();
	showBook();
	BTNDELETE = document.querySelectorAll(".btnDelete");
	BTNCHANGE = document.querySelectorAll(".btnChange");
	deleteBook();
	changeStatus();
	dialog.close();
});
