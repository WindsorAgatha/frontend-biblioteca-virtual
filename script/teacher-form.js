const apiBaseUrl = "http://localhost:5287/api";
const teacherForm = document.getElementById("teacher-form");
const classRoomsContainer = document.getElementById("classRooms-container");

// Fetch turmas para o formulário de checkbox
async function fetchClassRooms() {
    try {
        const response = await fetch(`${apiBaseUrl}/ClassRoom`);
        if (!response.ok) {
            throw new Error("Erro ao buscar as turmas.");
        }
        const classRooms = await response.json();
        populateClassRoomsCheckboxes(classRooms);
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar turmas.");
    }
}

// Preencher com checkboxes
function populateClassRoomsCheckboxes(classRooms) {
    classRooms.forEach((classRoom) => {
        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox-container");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = classRoom.id;
        checkbox.id = `classRoom-${classRoom.id}`;
        checkbox.dataset.description = classRoom.description;
        checkbox.dataset.shift = classRoom.shift;

        const label = document.createElement("label");
        label.setAttribute("for", checkbox.id);
        label.textContent = `${classRoom.description} (${classRoom.shift})`;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        classRoomsContainer.appendChild(checkboxContainer);
    });
}

// Salvar professor (POST)
async function saveTeacher(teacherData) {
    try {
        const response = await fetch(`${apiBaseUrl}/Teacher`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacherData),
        });
        if (!response.ok) {
            throw new Error("Erro ao salvar o professor.");
        }
        alert("Professor cadastrado com sucesso!");
        teacherForm.reset();
    } catch (error) {
        console.error(error);
        alert("Erro ao salvar professor.");
    }
}

// Montar dados e enviar no submit
teacherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedCheckboxes = Array.from(classRoomsContainer.querySelectorAll("input:checked"));
    const classRoomIds = selectedCheckboxes.map((checkbox) => parseInt(checkbox.value));
    const classRoomsDto = selectedCheckboxes.map((checkbox) => ({
        id: parseInt(checkbox.value),
        description: checkbox.dataset.description,
        shift: checkbox.dataset.shift,
    }));

    const teacherData = {
        id: 0, // ID será gerado pelo backend
        name: document.getElementById("name").value,
        cpf: document.getElementById("cpf").value,
        registrationNumber: document.getElementById("registrationNumber").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value || null,
        isActive: true, // Sempre true para novos professores
        role: 1, // Papel padrão (ajustar conforme necessário)
        classRoomIds: classRoomIds,
        classRoomsDto: classRoomsDto,
    };

    saveTeacher(teacherData);
});

// Inicializar o formulário
document.addEventListener("DOMContentLoaded", fetchClassRooms);
