
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

//display genres
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



//select

const selectUrl = "http://localhost:5287/api/LiteraryGenre"

function fetchAndDisplaySelectGenre(url) {
    const genreSelect = document.getElementsByClassName('form-select')[0]

    fetch(url)
        .then(response => response.json(response))
        .then(data => {
            data.map(el => {
                console.log(el)
                let option = document.createElement('option')
                option.textContent = el.name
                genreSelect.appendChild(option)
            })
        })
}

fetchAndDisplaySelectGenre(selectUrl)


//     fetch(url)
//         .then(response => response.json(response))
//         .then(data => {
//             data.map(genre => {
//                 let genreCard = document.createElement("div")
//                 genreCard.classList.add("genre-card")
//                 let h3 = document.createElement("h3")
//                 h3.innerText = genre.name
//                 genreCard.appendChild(h3)
//                 genreContainer.appendChild(genreCard)
//             })
//         })
// }

// <!DOCTYPE html>
// <html lang="pt-BR">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Formulário de Sucos</title>
// </head>
// <body>
//     <h1>Pedido de Sucos</h1>
//     <form id="form-succo">
//         <label for="fruta">Fruta:</label>
//         <input type="text" id="fruta" name="fruta" required>
//         <br><br>
//         <label for="quantidade">Quantidade:</label>
//         <input type="number" id="quantidade" name="quantidade" required>
//         <br><br>
//         <label for="cliente">Nome do Cliente:</label>
//         <input type="text" id="cliente" name="cliente" required>
//         <br><br>
//         <button type="submit">Enviar Pedido</button>
//     </form>

//     <script>
//         document.getElementById('form-succo').addEventListener('submit', async function(event) {
//             event.preventDefault(); // Impede o envio padrão do formulário

//             const fruta = document.getElementById('fruta').value;
//             const quantidade = document.getElementById('quantidade').value;
//             const cliente = document.getElementById('cliente').value;

//             const url = 'https://exemplo.com/api/sucos'; // URL da API
//             const dados = {
//                 fruta: fruta,
//                 quantidade: quantidade,
//                 cliente: cliente
//             };

//             try {
//                 const response = await fetch(url, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(dados)
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Erro: ${response.status}`);
//                 }

//                 const resultado = await response.json();
//                 console.log('Sucesso:', resultado);
//                 alert('Pedido enviado com sucesso!'); // Notificação de sucesso
//             } catch (error) {
//                 console.error('Erro ao enviar dados:', error);
//                 alert('Erro ao enviar o pedido. Tente novamente.');
//             }
//         });
//     </script>
// </body>
// </html>
