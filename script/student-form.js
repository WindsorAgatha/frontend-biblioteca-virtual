const apiUrl = "http://localhost:5287/api/Student";
const classRoomUrl = "http://localhost:5287/api/ClassRoom";

// Obtém o ID da URL (caso exista)
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get("id");

// Função para carregar as turmas disponíveis
async function loadClassRooms() {
    try {
        const response = await fetch(classRoomUrl);
        if (!response.ok) throw new Error(`Erro ao carregar turmas: ${response.status}`);
        const classRooms = await response.json();

        const select = document.getElementById("classRoom");
        classRooms.forEach(classRoom => {
            const option = document.createElement("option");
            option.value = classRoom.id;
            option.textContent = `${classRoom.description} - ${classRoom.shift}`;
            option.dataset.description = classRoom.description;
            option.dataset.shift = classRoom.shift;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar turmas:", error);
        alert("Não foi possível carregar as turmas.");
    }
}

// Função para carregar os dados do estudante para edição (caso exista um ID)
async function loadStudentData(id) {
    if (!id) return; // Se não há ID, é um cadastro
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error(`Erro ao carregar estudante: ${response.status}`);
        const student = await response.json();

        // Preenche os campos do formulário com os dados do estudante
        document.getElementById("name").value = student.name;
        document.getElementById("cpf").value = student.cpf;
        document.getElementById("registrationNumber").value = student.registrationNumber;
        document.getElementById("address").value = student.address;
        document.getElementById("phone").value = student.phone;

        // Define o valor do select de turma
        const classRoomSelect = document.getElementById("classRoom");
        classRoomSelect.value = student.classRoom.id;
        classRoomSelect.dataset.description = student.classRoom.description;
        classRoomSelect.dataset.shift = student.classRoom.shift;

        // Atualiza o título do formulário
        document.getElementById("form-title").textContent = "Edição de Estudante";
    } catch (error) {
        console.error("Erro ao carregar dados do estudante:", error);
        alert("Não foi possível carregar os dados do estudante para edição.");
    }
}

// Função para salvar os dados (POST ou PUT)
async function saveStudent(event) {
    event.preventDefault();

    // Obtém os dados do formulário
    const classRoomSelect = document.getElementById("classRoom");
    const studentData = {
        name: document.getElementById("name").value,
        cpf: document.getElementById("cpf").value,
        registrationNumber: document.getElementById("registrationNumber").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        isActive: true,
        role: 0, // Valor fixo para estudante
        classRoom: {
            id: classRoomSelect.value,
            description: classRoomSelect.options[classRoomSelect.selectedIndex].dataset.description,
            shift: classRoomSelect.options[classRoomSelect.selectedIndex].dataset.shift
        }
    };

    try {
        let method = "POST"; // Por padrão, é um novo registro
        let url = apiUrl;

        if (studentId) { // Se há ID, é uma edição
            method = "PUT";
            url = `${apiUrl}/${studentId}`;
            studentData.id = parseInt(studentId);
        }

        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) throw new Error(`Erro ao salvar estudante: ${response.status}`);

        alert("Estudante salvo com sucesso!");
        window.location.href = "/students"; // Redireciona para a lista de estudantes
    } catch (error) {
        console.error("Erro ao salvar estudante:", error);
        alert("Não foi possível salvar os dados do estudante.");
    }
}

// Inicializa o formulário
document.getElementById("student-form").addEventListener("submit", saveStudent);
loadClassRooms(); // Carrega as turmas
if (studentId) loadStudentData(studentId); // Carrega os dados do estudante se for edição
