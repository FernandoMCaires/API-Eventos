const infoEvento = document.getElementById("__info__");

function getRandomEvent() {
    fetch(`http://localhost:8080/random`)
        .then((response) => response.json())
        .then((data) => {
            const evento = data;
            console.log("evento:", evento);

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
                <img src="https://via.placeholder.com/800" alt="" id="eventImage" class="img-fluid">
              </div>
              <div class="col-12 col-md-6">
                <p class="card-text" id="eventDescription">${evento.descrição}</p>
                <p class="card-text" id="eventDate">Data: <label class="fw-bold">${evento.data}</label></p>
                <p class="card-text" id="eventPrice">Preço: <label class="fw-bold text-success">${evento.preco}</label></p>
                <p class="card-text" id="eventLocation">Endereço: <label class="fw-bold">${evento.endereço}</label></p>
                <p class="card-text text-decoration-underline text-primary" id="eventCategory">${evento.categoria}</p>
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

getRandomEvent();