document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar o envio do formulário padrão
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const evento = document.getElementById('evento').value;
    
    // Validações básicas
    if (nome === '' || email === '' || evento === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    if (!isValidEmail(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Enviar os dados para o back-end...
    fetch('http://localhost:4000/registros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, evento })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados de inscrição');
        }
        return response.json();
    })
    .then(data => {
        // Tratar a resposta do back-end, se necessário.
        console.log(data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}