let container = document.getElementsByClassName("book-container")[0]
const paramns = new URLSearchParams(window.location.search)
const id = paramns.get("id")

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:5287/api/Book/${id}`)
        .then(response => response.json())
        .then(book => {

            let bookCard = document.createElement("div")
            let bookDetails = document.createElement("div")
            let title = document.createElement("h1")
            let publicationYear = document.createElement("h3")
            let authors = document.createElement("h2")
            let publisher = document.createElement("h3")
            let isbn = document.createElement("h3")
            let literaryGenre = document.createElement("h2")
            let description = document.createElement("p")
            let img = document.createElement("img")
            let button = document.createElement("button")
            title.textContent = book.title
            img.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDJvhbUIPa09Bpuf4_zBPzTP9noLhwoysvt6JXsJWV8essbMLW3VsAw01apJuoaRUAijcN1TVX12aMPlb3lLCY4UvQugvoSvmR19E8Cg9BHeOmPco85CQR-WE79CxzFdklRFqUY8auGH0/s1600/Conhe%25C3%25A7a+os+4+Tipos+de+Capas+de+Livro+que+os+Designers+Normalmente+Desenvolvem+-+Arquiteto+Vers%25C3%25A1til+-+Rafael+Nascimento+%252812%2529.jpg"
            description.textContent = book.summary
            button.textContent = "Reservar"
            publisher.textContent = book.publisher
            publicationYear.textContent = book.publicationYear
            authors.textContent = book.authors
            isbn.textContent = book.isbn
            literaryGenre.textContent = book.literaryGenre.name
            container.appendChild(bookCard)
            container.appendChild(bookDetails)
            bookCard.appendChild(img)
            bookDetails.appendChild(title)
            bookDetails.appendChild(publicationYear)
            bookDetails.appendChild(authors)
            bookDetails.appendChild(publisher)
            bookDetails.appendChild(isbn)
            bookDetails.appendChild(literaryGenre)
            bookDetails.appendChild(description)
            bookDetails.appendChild(button)
        })
})


// {
//   "id": 1,
//   "publisher": "string",
//   "title": "Dracula",
//   "isbn": "string",
//   "authors": [
//     "string"
//   ],
//   "publicationYear": 9999,
//   "summary": "string",
//   "quantity": 2147483647,
//   "literaryGenre": {
//     "id": 2,
//     "name": "Terror"
//   }
// }