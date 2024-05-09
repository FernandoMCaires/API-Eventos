fetch('http://localhost:8080/eventos') //isso é uma função para exibir os dados dos eventos
    .then(response => response.json())
    .then(data => { //manipulando os dados recebidos
        const eventosList1 = document.getElementById('eventos__gastronomicos')
        data.forEach(evento => { //iterando sobre os eventos recebidos
            const eventoDiv = document.createElement('div');
            eventoDiv.innerHTML = `
            <h2>${evento.nome}</h2>
            <p>${evento.idade}, ${evento.sexo}</p>
            `;

            eventosList1.appendChild(eventoDiv);
        })
    }).catch(error => console.error('Erro ao carregar os filmes:', error));