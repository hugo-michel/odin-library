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

	this.status = function () {
		this.read == true ? (this.read = false) : (this.read = true);
	};
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

		let btnChange = document.createElement("button");
		btnChange.setAttribute("class", "btnChange");
		btnChange.textContent = "C";

		newCard.appendChild(newP);
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
		});
	});
}

function changeStatus() {
	BTNCHANGE.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			myLibrary[index].status();
			btn.previousElementSibling.textContent = `${myLibrary[index].title} by ${myLibrary[index].author}, ${myLibrary[index].pages} pages, read : ${myLibrary[index].read}`;
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
