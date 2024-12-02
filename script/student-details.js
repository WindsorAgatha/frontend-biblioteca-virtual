const apiBaseUrl = "http://localhost:5287/api/Student";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("id");

    // Verifica se o ID do estudante foi fornecido na URL
    if (!studentId) {
        alert("ID do estudante não fornecido!");
        window.location.href = "students-list.html"; // Redireciona para a lista
        return;
    }

    try {
        // Fazendo o fetch para obter os dados do estudante
        const response = await fetch(`${apiBaseUrl}/${studentId}`);
        if (!response.ok) {
            throw new Error("Erro ao carregar os detalhes do estudante.");
        }

        const student = await response.json();
        displayStudentDetails(student);  // Função que exibe os detalhes do estudante
        
        // Registra o evento de clique para editar
        document.getElementById("edit-button").addEventListener("click", () => {
            window.location.href = `student-form.html?id=${studentId}`;  // Redireciona para a página de edição
        });

        // Registra o evento de clique para deletar
        document.getElementById("delete-button").addEventListener("click", () => {
            deleteStudent(student);  // Chama a função de deletar passando o objeto completo do estudante
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar os detalhes do estudante.");
    }
});

// Função para exibir os detalhes do estudante na página
function displayStudentDetails(student) {
    const studentCard = document.getElementById("student-card");
    studentCard.innerHTML = `
        <img src="https://via.placeholder.com/150" alt="Foto do estudante">
        <h2>${student.name}</h2>
        <p><strong>Matrícula:</strong> ${student.registrationNumber}</p>
        <p><strong>CPF:</strong> ${student.cpf}</p>
        <p><strong>Endereço:</strong> ${student.address}</p>
        <p><strong>Telefone:</strong> ${student.phone}</p>
        <p><strong>Turma:</strong> ${student.classRoom.description} (${student.classRoom.shift})</p>
    `;
}

// Função para deletar (soft-delete) o estudante
function deleteStudent(student) {
    const confirmation = confirm("Você tem certeza que deseja deletar este estudante?");
    if (confirmation) {
        // Modifica o campo isActive para false
        student.isActive = false;

        // Fazendo o PUT com o objeto completo do estudante
        fetch(`http://localhost:5287/api/Student/${student.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student), // Envia o objeto completo, alterando apenas isActive
        })
            .then((response) => {
                if (response.ok) {
                    alert("Estudante deletado com sucesso!");
                    window.location.href = "students-list.html"; // Redireciona para a lista de estudantes
                } else {
                    return response.json().then((error) => {
                        console.error("Erro ao deletar estudante:", error);
                        alert("Ocorreu um erro ao deletar o estudante.");
                    });
                }
            })
            .catch((error) => {
                console.error("Erro de rede:", error);
                alert("Ocorreu um erro de rede. Tente novamente.");
            });
    }
}
