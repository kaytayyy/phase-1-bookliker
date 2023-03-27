const baseUrl = "http://localhost:3000/"
const booksUrl = baseUrl + 'books/'
const userUrl = baseUrl + 'users/'

function fetchBooks() {
    fetch(booksUrl)
    .then(response => response.json())
    .then(booksData => renderBooks(booksData))
}

fetchBooks()

const renderBooks = (books) => {
    books.forEach(book => renderBookLi(book))
}

const renderBookLi = book => {
    const listUl = document.getElementById("list")
    
    const bookLi = document.createElement("li")
    listUl.appendChild(bookLi)
    bookLi.textContent = book.title

    bookLi.onclick = () => showBookInformation(book)
}

function clearHTMLElement(element) {
    while(element.firstChild)
    element.firstChild.remove()
}

function showBookInformation(book) {
    const showPanelDiv = document.getElementById('show-panel')

    const titleH1 = document.createElement('h1')
    showPanelDiv.appendChild(titleH1)
    titleH1.textContent = book.title
    
    
    showPanelDiv.appendChild(titleH1)

    let bookImage = document.createElement('img')
    showPanelDiv.appendChild(bookImage)
    bookImage.src = book.img_url

    if (book.subtitle) {
        let bookSubtitleH3 = document.createElement('h3')
        showPanelDiv.appendChild(bookSubtitleH3)
        bookSubtitleH3.textContent = book.subtitle
    }

    let bookAuthorH4 =document.createElement('h4')
    showPanelDiv.appendChild(bookAuthorH4)
    bookAuthorH4.textContent = "By" + book.author

    let bookDescP = document.createElement('p')
    showPanelDiv.appendChild(bookDescP)
    bookDescP.textContent = book.description

    let userUl = document.createElement('ul')
    showPanelDiv.appendChild(userUl)
    

    book.users.forEach(user => renderUserLi(user, userUl))

    let br = document.createElement('br')
    showPanelDiv.appendChild(br)

    let likeButton = document.createElement('button')
    showPanelDiv.appendChild(likeButton)
    likeButton.textContent = "Like"

    likeButton.onclick = (event) => clickToLikeBook(userUl)

}

function renderUserLi(user, userUl) {
    let userLi = document.createElement('li')
    userUl.appendChild(userLi)
    userLi.textContent = user.username
}

const clickToLikeBook = (userUl) => {
    fetch(usersUrl)
    .then(response => response.json())
    .then(usersData => { 
        let currentUser = usersData.find(user => user.id === 8)
    renderUserLi(currentUser, userUl)
    })
}
