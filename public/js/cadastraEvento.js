let eventos = [];
function getEvents() {
    fetch('http://localhost:8080/eventos')
        .then((response) => response.json())
        .then((data) => {
            eventos = data;
            console.log("eventos", eventos);
        })
        .catch((error) => console.error('Erro ao buscar eventos:', error));
}
getEvents();

function cadastrarEvento() {
    const formValues = {
        id: eventos.length + 1,
        nome: document.getElementById('inputNome').value,
        categoria: document.getElementById('inputCategoria').value,
        classificação: document.getElementById('inputClassificacao').value,
        descrição: document.getElementById('inputDescricao').value,
        endereço: document.getElementById('inputLocal').value,
        data: `${inverterData(`${document.getElementById('inputInitialData').value}`)} // ${inverterData(`${document.getElementById('inputEndData').value}`)}`,
        preco: moneyFormat(`${document.getElementById('inputPrice').value}`),
        img: document.getElementById('inputImagem').value,
    };
    
    if (!formValues.nome || !formValues.categoria || !formValues.classificação || !formValues.descrição || !formValues.endereço || !formValues.data || !formValues.preco || !formValues.img) {
        alert('Preencha todos os campos!');
        return;
    } else {  
        console.log(formValues);
        fetch('http://localhost:8080/eventos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert(data.sucesso,)
            window.location.href = './cadastrarEvento.html';
            
        })
        .catch((error) => console.error('Erro ao cadastrar evento:', error));
    }
}
    
    function inverterData(data) {
    const dataSplit = data.split('-');
    return `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`;
}

function moneyFormat(number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(number));
}