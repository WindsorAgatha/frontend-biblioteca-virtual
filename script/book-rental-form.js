document.getElementById('rental-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Processar autores (caso seja um campo separado por vírgulas)
    data.book = {
        ...data.book,
        authors: data.book.authors.split(',').map(author => author.trim())
    };

    console.log(data); // Verificar os dados no console

    // Enviar os dados via POST
    fetch('/api/rentals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        alert('Aluguel criado com sucesso!');
        console.log(result);
    })
    .catch(error => {
        alert('Erro ao criar aluguel.');
        console.error(error);
    });
});
