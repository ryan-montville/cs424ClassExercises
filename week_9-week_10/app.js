let booksList = [];
let booksToDisplay = [];
let years = [];

let booksContainer = document.getElementById('books-container');
let searchForm = document.getElementById('search');

function createMessage(message, location, type) {
    let messageWrapper = document.getElementById(location);
    messageWrapper.innerHTML = '';
    let messageDiv = document.createElement('div');
    if (type === 'check_circle') {
        messageDiv.setAttribute('class', 'success message');
        messageDiv.setAttribute('aria-live', 'polite');
        console.log(message);
    } else if (type === 'error') {
        messageDiv.setAttribute('class', 'error message');
        messageDiv.setAttribute('role', 'alert');
        console.error(message);
    } else if (type === 'delete' || type === 'warn') {
        messageDiv.setAttribute('class', 'warn message');
        messageDiv.setAttribute('aria-live', 'polite');
        console.warn(message);
    } else {
        messageDiv.setAttribute('class', 'info message');
        messageDiv.setAttribute('aria-live', 'polite');
        console.log(message);
    }
    let icon = document.createElement('span');
    icon.setAttribute('class', 'material-symbols-outlined');
    let iconName = document.createTextNode(type);
    icon.appendChild(iconName);
    messageDiv.appendChild(icon);
    let messageText = document.createTextNode(message);
    messageDiv.appendChild(messageText);
    let closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('class', 'material-symbols-outlined');
    let closeIcon = document.createTextNode('close');
    closeButton.appendChild(closeIcon)
    closeButton.addEventListener('click', () => messageWrapper.innerHTML = '');
    messageDiv.appendChild(closeButton);
    messageWrapper.appendChild(messageDiv);
}

function searchBooks() {
    let formData = new FormData(searchForm);
    let searchTerm = formData.get('searchInput');
    if (searchTerm === null || searchTerm.toString().trim() === '') {
        createMessage("Please do not leave to search field empty.", "message", "error");
    } else {
        booksToDisplay = booksList.filter(book => {
            return book['bookTitle'].toLowerCase().includes(searchTerm.toString().trim().toLowerCase());
        });
        console.log(booksToDisplay.length);
        displayBooks();
    }
}

function loadYears(bokList) {
    bokList.forEach(book => {
        let year = new Date(book['dateRead']).getFullYear();
        if (!years.includes(year)) {
            years.push(year);
        }
    });
    years.sort();
    let filerYearsCard = document.getElementById('filter-year');
    let allYearsButton = document.createElement('button');
    allYearsButton.setAttribute('type', 'button');
    let allYearsText = document.createTextNode('All');
    allYearsButton.appendChild(allYearsText);
    allYearsButton.addEventListener('click', () => {
        filterForYear('all');
    })
    filerYearsCard.appendChild(allYearsButton);
    years.forEach(year => {
        let yearButton = document.createElement('button');
        let buttonText = document.createTextNode(year);
        yearButton.appendChild(buttonText);
        yearButton.setAttribute('type', 'button');
        yearButton.addEventListener('click', () => {
            filterForYear(year);

        });
        filerYearsCard.appendChild(yearButton);
    });

}

function filterForYear(year) {
    if (year === 'all') {
        booksToDisplay = booksList;
    } else {
        const yearToFilter = new Date(year, 0, 1).getFullYear();
        booksToDisplay = booksList.filter(book => {
            const bookYear = new Date(book['dateRead']).getFullYear();
            return bookYear === yearToFilter;
        });
    }
    displayBooks();
}

async function loadData() {
    console.log("Fetching data from JSON and putting in local storage");
    try {
        //Fetch books data from books.json
        let response = await fetch('books.json');
        if (!response.ok) {
            createMessage(`Error loading the data. Status: ${response.status}`, 'message', 'error');
        }
        let data = await response.json();
        booksList = data;
        booksToDisplay = data;
        displayBooks();
        loadYears(booksList);
    } catch (error) {
        createMessage(error, 'message', 'error');
    }
}

function displayBooks() {
    booksContainer.innerHTML = '';
    booksToDisplay.forEach(book => {
        let bookCard = document.createElement('article');
        bookCard.setAttribute('class', 'book card');
        let bookCover = document.createElement('img');
        bookCover.setAttribute('src', book['cover']);
        bookCover.setAttribute('alt', book['bookTitle']);
        bookCard.appendChild(bookCover);
        let infoSection = document.createElement('section');
        let bookTitleH2 = document.createElement('h2');
        let bookTitle = document.createTextNode(book['bookTitle']);
        bookTitleH2.appendChild(bookTitle);
        infoSection.appendChild(bookTitleH2);
        let authorH3 = document.createElement('h3');
        let authorName = document.createTextNode(`By: ${book['authors'].join(' ')}`);
        authorH3.appendChild(authorName);
        infoSection.appendChild(authorH3);
        const date = new Date(book['dateRead']);
        let readDateP = document.createElement('p');
        let readDate = document.createTextNode(`Date Read: ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`);
        readDateP.appendChild(readDate);
        infoSection.appendChild(readDateP);
        bookCard.appendChild(infoSection);
        booksContainer.appendChild(bookCard);
    });
    createMessage(`Loaded ${booksToDisplay.length} books`, 'message', 'check_circle');

}

loadData();
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchBooks();
})