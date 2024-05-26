
const textBusca = document.getElementById('buscaNome');

function Main(){    
    fetch('http://localhost:8080/eventos') //isso é uma função para exibir os dados dos eventos
        .then(response => response.json())
        .then(data => { //manipulando os dados recebidos
            const eventosList1 = document.getElementById('eventos__gastronomicos')
            data.forEach(evento => { //iterando sobre os eventos recebidos
                const eventoDiv = document.createElement('div');
                eventoDiv.innerHTML = `
                <h4 class='card_title'> ${evento.nome} </h4>
                <div class='card_info_all>
                    <p class='card_info'>${evento.categoria}</p>
                    <p class='card_info_classificacao'>${evento.classificação}</p>
                    <p class='card_info'>${evento.data}</p>
                </div>
                <div class='card_info_desc'>
                    <p>${evento.descrição} </p>
                </div>
                <div class='card_info_end'>
                    <p>${evento.endereço}</p>
                </div>
                <a> Ir para pagina >>> </a>
                `;
    
                eventosList1.appendChild(eventoDiv);
            })
        }).catch(error => console.error('Erro ao carregar os filmes:', error));
}    



function buscar(){
    console.log(textBusca.value())

    btnBusca.addEventListener('click', (e) => {
        e.preventDefault();
        let data = textBusca.value;

        if(data == ''){
            window.alert('Digite o nome de algum evento para pesquisar!');
        }
    })
}



Main();