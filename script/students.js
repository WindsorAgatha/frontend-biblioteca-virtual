const apiBaseUrl = "http://localhost:5287/api/Student";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
            throw new Error("Erro ao carregar os estudantes.");
        }

        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar os estudantes.");
    }
});

function displayStudents(students) {
    const studentsContainer = document.getElementById("students-container");

    students.forEach(student => {
        const studentCard = document.createElement("div");
        studentCard.classList.add("student-card");

        // Exibindo a foto de placeholder e outros detalhes do estudante
        studentCard.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="Foto do estudante">
            <h3>${student.name}</h3>
            <p><strong>Matrícula:</strong> ${student.registrationNumber}</p>
            <p><strong>Turma:</strong> ${student.classRoom.description} (${student.classRoom.shift})</p>
            <button onclick="viewStudentDetails(${student.id})">Detalhes</button>
        `;

        studentsContainer.appendChild(studentCard);
    });
}

function viewStudentDetails(id) {
    window.location.href = `student-details.html?id=${id}`;
}
