const apiBaseUrl = "http://localhost:5287/api/Teacher";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
            throw new Error("Erro ao carregar os professores.");
        }

        const teachers = await response.json();
        displayTeachers(teachers);
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar os professores.");
    }
});

function displayTeachers(teachers) {
    const teachersContainer = document.getElementById("teachers-container");

    teachers.forEach(teacher => {
        const teacherCard = document.createElement("div");
        teacherCard.classList.add("teacher-card");

        // Aqui estamos utilizando uma foto de placeholder
        teacherCard.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="Foto do professor">
            <h3>${teacher.name}</h3>
            <p><strong>Matrícula:</strong> ${teacher.registrationNumber}</p>
            <p><strong>Turma(s):</strong> ${teacher.classRoomsDto.map(classroom => classroom.description).join(', ')}</p>
            <button onclick="viewTeacherDetails(${teacher.id})">Detalhes</button>
        `;

        teachersContainer.appendChild(teacherCard);
    });
}

function viewTeacherDetails(id) {
    window.location.href = `teacher-details.html?id=${id}`;
}
