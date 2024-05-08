fetch('http://localhost:8080/eventos') //isso é uma função para exibir os dados dos eventos
.then(response => response.json())
.then(data => { //manipulando os dados recebidos
const eventosList1 = document.getElementById('eventos__gastronomicos')
const eventosList2 = document.getElementById('eventos__tecnologicos')
const eventosList3 = document.getElementById('eventos__aventuras')
const eventosList4 = document.getElementById('eventos__moda')
data.forEach(evento =>{ //iterando sobre os eventos recebidos
const eventoDiv = document.createElement('div');
eventoDiv
})
})