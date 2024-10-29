
//carrossel

var body = document.getElementById("body")

function toggleTheme() {
    body.classList.toggle("night-mode")
}

function handleSignInModal() {
    body.classList.toggle("modal-toggle")
}

const slidesContainer = document.getElementById("slides-container")
const slide = document.querySelector(".slide")
const prevButtom = document.getElementById("slide-arrow-prev")
const nextButtom = document.getElementById("slide-arrow-next")


document.addEventListener("DOMContentLoaded", () => {
    const slideWidth = slide.clientWidth // Largura de cada slide
    const slidesContainer = document.getElementById('slides-container') // Container dos slides
    let currentIndex = 0 // Índice do slide atual

    // Função para avançar para o próximo slide
    const nextSlide = () => {
        currentIndex++
        if (currentIndex >= slidesContainer.children.length) {
            currentIndex = 0 // Volta para o primeiro slide ao chegar ao último
        }
        const newPosition = currentIndex * slideWidth
        slidesContainer.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        })
    }

    // Rotação automática a cada 4 segundos
    setInterval(nextSlide, 4000)
})

//api



const livrosUrl = "http://localhost:5287/api/Book"

function fetchAndDisplayLivros(endpoint) {
    let div_container = document.getElementsByClassName("container")[0]

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.map(element => {
                let card = document.createElement("div")
                card.classList.add("card")
                let divCover = document.createElement("div")
                divCover.classList.add("div-cover")
                let img = document.createElement("img")
                img.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDJvhbUIPa09Bpuf4_zBPzTP9noLhwoysvt6JXsJWV8essbMLW3VsAw01apJuoaRUAijcN1TVX12aMPlb3lLCY4UvQugvoSvmR19E8Cg9BHeOmPco85CQR-WE79CxzFdklRFqUY8auGH0/s1600/Conhe%25C3%25A7a+os+4+Tipos+de+Capas+de+Livro+que+os+Designers+Normalmente+Desenvolvem+-+Arquiteto+Vers%25C3%25A1til+-+Rafael+Nascimento+%252812%2529.jpg"
                let a = document.createElement("a")
                a.classList.add("detalhes")
                a.textContent = "Detalhes"
                divCover.appendChild(img)
                divCover.appendChild(a)
                card.appendChild(divCover)
                div_container.appendChild(card)
            })
        })

}

fetchAndDisplayLivros(livrosUrl)


const genreUrl = "http://localhost:5287/api/LiteraryGenre"

function fetchAndDisplayGenre(url) {
    const genreContainer = document.getElementsByClassName('genre-container')[0]

    fetch(url)
        .then(response => response.json(response))
        .then(data => {
            data.map(genre => {
                let genreCard = document.createElement("div")
                genreCard.classList.add("genre-card")
                let h3 = document.createElement("h3")
                h3.innerText = genre.name
                genreCard.appendChild(h3)
                genreContainer.appendChild(genreCard)
            })
        })
}

fetchAndDisplayGenre(genreUrl)

