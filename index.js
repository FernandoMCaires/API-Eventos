const express = require('express');
const cors = require('cors');
const eventos = require('./eventos.json'); // Importação dos dados de eventos.
const path = require('path');
const { log } = require('console');

const app = express();
const PORT = 8080;


///Configurar middleware do CORS para permitir solicitações de diferentes origens
app.use(cors()); //adiciona o middleware CORS ao aplicativo Express

//Define o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Definindo rota para os eventos:
app.get('/eventos', (req, res)=>{
    res.json(eventos); // Retorna os dados dos filmes como uma resposta JSON
});


app.get('/eventos/busca/:nome', (req, resp) => {
    try{
        const nome = req.params.nome.toLowerCase();
        let dados = eventos;
        let busca = [];
        let nomeEvento = '';

        for(let i = 0; i < dados.length; i++){

            nomeEvento = dados[i].nome;
            nomeEvento = nomeEvento.split(' ');

            for(let j = 0; j < nomeEvento.length; j++){
                if(nomeEvento[j].toLowerCase() == nome){
                    busca.push(dados[i]);
                }
            }
        }

        resp.send(busca);

    }catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//Inicialização do servidor Express:
app.listen(PORT,()=>{
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});