const infoEvento = document.getElementById("__info__");

function limitarDescricao(descricao, limite) {
    return descricao.length > limite
        ? descricao.substring(0, limite) + "..."
        : descricao;
}

function getFavoritos() {
    fetch("http://localhost:8080/eventosFavoritos")
        .then((response) => response.json())
        .then((data) => {
            const eventos = data;

            eventos.forEach((evento) => {
                const eventoDiv = document.createElement("div");
                eventoDiv.innerHTML = `
                    <div class="card" style=" width: 35rem; height: 400px;">
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-title"> ${evento.nome} </h4>
                            <p class="card-subtitle">${evento.categoria} // ${evento.classificação}</p>
                            <p class="card-text text-decoration-underline my-3 ">${evento.data}</p>
                            <p class="card-text">${limitarDescricao(evento.descrição, 250)}</p>
                            <p class="card-text fw-bold text-secondary">${evento.endereço}</p>
                            <a href="./evento.html?id=${evento.id}" class="btn btn-primary mt-auto w-50">Ir para pagina <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>`;
                infoEvento.appendChild(eventoDiv);
            })
        })
        .catch((error) => console.error("Erro ao carregar os favoritos:", error));
}

getFavoritos();