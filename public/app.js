const textBusca = document.getElementById("buscaNome");

function Main() {
  function limitarDescricao(descricao, limite) {
    return descricao.length > limite
      ? descricao.substring(0, limite) + "..."
      : descricao;
  }
  fetch("http://localhost:8080/eventos") //isso é uma função para exibir os dados dos eventos
    .then((response) => response.json())
    .then((data) => {
      //manipulando os dados recebidos
      const eventosList1 = document.getElementById("eventos__gastronomicos");
      data.forEach((evento) => {
        //iterando sobre os eventos recebidos
        const eventoDiv = document.createElement("div");

        eventoDiv.innerHTML = `
        <div class="card" style="
        width: 35rem;
        height: 400px;
        ">
        
        <div class="card-body d-flex flex-column">
          <h4 class="card-title"> ${evento.nome} </h4>
          <p class="card-subtitle">${evento.categoria} // ${
          evento.classificação
        }</p>
          <p class="card-text text-decoration-underline my-3 ">${
            evento.data
          }</p>
          <p class="card-text">${limitarDescricao(evento.descrição, 250)}</p>
          <p class="card-text fw-bold text-secondary">${evento.endereço}</p>
          <a href="#" class="btn btn-primary mt-auto w-50">Ir para pagina <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
      `;

        eventosList1.appendChild(eventoDiv);
      });
    })
    .catch((error) => console.error("Erro ao carregar os filmes:", error));
}

function buscar() {
  console.log(textBusca.value());

  btnBusca.addEventListener("click", (e) => {
    e.preventDefault();
    let data = textBusca.value;

    if (data == "") {
      window.alert("Digite o nome de algum evento para pesquisar!");
    }
  });
}

Main();
