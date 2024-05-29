const eventosList1 = document.getElementById("eventos__gastronomicos");
const eventosList2 = document.getElementById("eventos__busca");
const buttons = document.getElementById("__groups-btn__");

function limitarDescricao(descricao, limite) {
  return descricao.length > limite
    ? descricao.substring(0, limite) + "..."
    : descricao;
}

function Main() {
  fetch("http://localhost:8080/eventos") //isso é uma função para exibir os dados dos eventos
    .then((response) => response.json())
    .then((data) => {
      //manipulando os dados recebidos
      data.forEach((evento) => {
        //iterando sobre os eventos recebidos
        const eventoDiv = document.createElement("div");

        eventoDiv.innerHTML = `
        <div class="card" style="
        width: 35rem;
        height: 400px;">
        <div class="card-body d-flex flex-column">
        <h4 class="card-title"> ${evento.nome} </h4>
        <p class="card-subtitle">${evento.categoria} // ${evento.classificação}</p>
        <p class="card-text text-decoration-underline my-3 ">${evento.data}</p>
        <p class="card-text">${limitarDescricao(evento.descrição, 250)}</p>
        <p class="card-text fw-bold text-secondary">${evento.endereço}</p>
        <a href="./pages/evento.html?id=${evento.id}" class="btn btn-primary mt-auto w-50">Ir para pagina <i class="bi bi-arrow-right"></i></a>
        </div>
        </div>
    `;

        eventosList1.appendChild(eventoDiv);
      });
    })
    .catch((error) => console.error("Erro ao carregar os filmes:", error));
}

function buscar() {
  const textBusca = document.getElementById("buscaNome").value;
  fetch(`http://localhost:8080/eventos/busca/${textBusca}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((evento) => {
        console.log(evento);
        console.log(data);
        
        if (data) {
          const eventoBusca = document.createElement("div");
          eventoBusca.innerHTML = `
          <div class="card" style="
          width: 35rem;
          height: 400px;">
          <div class="card-body d-flex flex-column">
          <h4 class="card-title"> ${evento.nome} </h4>
          <p class="card-subtitle">${evento.categoria} // ${evento.classificação}</p>
          <p class="card-text text-decoration-underline my-3 ">${evento.data}</p>
          <p class="card-text">${limitarDescricao(evento.descrição, 250)}</p>
          <p class="card-text fw-bold text-secondary">${evento.endereço}</p>
          <a href="./pages/evento.html?id=${evento.id}" class="btn btn-primary mt-auto w-50">Ir para pagina <i class="bi bi-arrow-right"></i></a>
          </div>
          </div>
          `;
          const button = document.createElement("div");
          button.innerHTML = `
          <a id="btnLimparBusca" class="btn btn-outline-danger" href="./index.html">
                Limpar
          </a>
          `;

          eventosList1.innerHTML = "";
          eventosList2.innerHTML = "";
          eventosList2.appendChild(eventoBusca);
          buttons.appendChild(button);
        } else {
         

        }
      }
      );
    })
    .catch((error) => console.error("Erro ao carregar os filmes:", error));
}

Main();
