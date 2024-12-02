// URL para obter as turmas cadastradas
const classRoomUrl = "http://localhost:5287/api/ClassRoom";

// Função para buscar as turmas e preencher o select
async function fetchAndPopulateClassRooms() {
    const classRoomSelect = document.getElementById("classRoom");

    try {
        const response = await fetch(classRoomUrl);
        if (!response.ok) {
            throw new Error(`Erro ao carregar turmas: ${response.status}`);
        }

        const classRooms = await response.json();

        // Limpa o select antes de preenchê-lo
        classRoomSelect.innerHTML = "";

        // Adiciona as opções disponíveis no select
        classRooms.forEach(classRoom => {
            const option = document.createElement("option");
            option.value = JSON.stringify(classRoom); // Armazena o objeto como string
            option.textContent = `${classRoom.shift} - ${classRoom.description}`; // Turno e descrição
            classRoomSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        alert("Erro ao carregar as turmas. Tente novamente mais tarde.");
    }
}

// Função para criar o estudante
async function createStudent(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const studentUrl = "http://localhost:5287/api/Student";

    // Captura os valores do formulário
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const registrationNumber = document.getElementById("registrationNumber").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const selectedClassRoom = JSON.parse(document.getElementById("classRoom").value); // Decodifica o objeto

    // Monta o objeto no formato esperado
    const studentData = {
        id: 0, // Novo registro, ID é 0 ou pode ser omitido
        name: name,
        cpf: cpf,
        registrationNumber: registrationNumber,
        address: address,
        phone: phone,
        isActive: true, // Valor fixo para criação
        role: 0, // Sempre "Estudante"
        classRoom: {
            id: selectedClassRoom.id,
            description: selectedClassRoom.description,
            shift: selectedClassRoom.shift
        }
    };

    try {
        // Envia a requisição ao backend
        const response = await fetch(studentUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentData),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Erro ao cadastrar estudante:", error);
            alert(`Erro: ${error.title || "Falha no cadastro"}`);
            return;
        }

        alert("Estudante cadastrado com sucesso!");
        document.getElementById("student-form").reset(); // Reseta o formulário
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        alert("Erro ao cadastrar o estudante. Tente novamente.");
    }
}

// Inicializa o carregamento das turmas ao carregar a página
document.addEventListener("DOMContentLoaded", fetchAndPopulateClassRooms);

// Adiciona o evento ao formulário para criar o estudante ao submeter
document.getElementById("student-form").addEventListener("submit", createStudent);
