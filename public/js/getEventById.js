const infoEvento = document.getElementById("__info__");

const url = new URL(window.location.href);
const parametros = new URLSearchParams(url.search);
const id = parametros.get("id");
let evento = {};
let favoritos = [];
/**
 * Função que busca um evento pelo ID
 * e exibe as informações na tela
 * @param {string} id
 */
function getEventById(id) {
  getFavoritos();

  fetch(`http://localhost:8080/eventos/id/${id}`)
    .then((response) => response.json())
    .then((data) => {
      evento = data;
      const eventoDiv = document.createElement("div");

      eventoDiv.innerHTML = `
    <div class="container">
       
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title" id="eventTitle">Detalhes do evento - ${evento.nome}</h2>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-6">
                <img src="${evento.img ? evento.img : 'https://via.placeholder.com/600'}" alt="" id="eventImage" class="img-fluid">
              </div>
              <div class="col-12 col-md-6">
                <p class="card-text" id="eventDescription">${evento.descrição}</p>
                <p class="card-text" id="eventDate">Data: <label class="fw-bold">${evento.data}</label></p>
                <p class="card-text" id="eventPrice">Preço: <label class="fw-bold text-success">${evento.preco}</label></p>
                <p class="card-text" id="eventLocation">Endereço: <label class="fw-bold">${evento.endereço}</label></p>
                <p class="card-text text-decoration-underline text-primary" id="eventCategory">${evento.categoria}</p>
                <button class="btn btn-danger" onClick="favoritar(evento)">Favoritar</button>
              </div>

            </div>
          </div>
          <div class="card-footer">
            <a href="../index.html" class="btn btn-outline-danger">Voltar</a>
          </div>
        </div>
      </div>
    
      </div>
    </div>
  </div>
            `;
      infoEvento.appendChild(eventoDiv);
    })
    .catch((error) => console.error("Erro ao carregar os eventos:", error));
}

function getFavoritos() {
  fetch("http://localhost:8080/eventosFavoritos")
    .then((response) => response.json())
    .then((data) => {
      favoritos = data;
    })
    .catch((error) => console.error("Erro ao carregar os favoritos:", error));
}

function favoritar(evento) {

  if (favoritos.find((e) => e.id === evento.id)) {
    alert("Evento já favoritado!");
  } else {
    fetch(`http://localhost:8080/eventosFavoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Evento favoritado com sucesso!");
        console.log("Evento favoritado:", data);
      })
      .catch((error) => console.error("Erro ao favoritar o evento:", error));
  }
}


getEventById(id);