var body = document.getElementsByTagName('body')[0]

function handleDropDownMenu() {
    const menuContainer = document.querySelector(".menu-list-container");
    const menuButton = document.getElementById('button-menu')
    const isOpen = menuContainer.classList.toggle("dropdown-menu-open");
    menuButton.classList.toggle('rotate-button')
}


//carrossel:
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const slideWidth = slide.clientWidth; // Largura de cada slide
let currentIndex = 0; // Índice do slide atual

let startX = 0;
let currentX = 0;
let isDragging = false;

// Função para avançar para o próximo slide
const nextSlide = () => {
    currentIndex++;
    if (currentIndex >= slidesContainer.children.length) {
        currentIndex = 0; // Volta para o primeiro slide ao chegar ao último
    }
    const newPosition = currentIndex * slideWidth;
    slidesContainer.scrollTo({
        left: newPosition,
        behavior: "smooth",
    });
};

// Função para voltar ao slide anterior
const prevSlide = () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slidesContainer.children.length - 1; // Vai para o último slide
    }
    const newPosition = currentIndex * slideWidth;
    slidesContainer.scrollTo({
        left: newPosition,
        behavior: "smooth",
    });
};

// Eventos de toque (para dispositivos móveis)
slidesContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slidesContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", () => {
    if (!isDragging) return;
    const diff = currentX - startX;
    if (diff > 50) {
        prevSlide(); // Se deslizar para a direita
    } else if (diff < -50) {
        nextSlide(); // Se deslizar para a esquerda
    }
    isDragging = false;
});

setInterval(nextSlide, 4000);
