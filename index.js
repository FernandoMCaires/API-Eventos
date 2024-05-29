const express = require('express');
const cors = require('cors');
const eventos = require('./eventos.json'); // Importação dos dados de eventos.
const path = require('path');

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

// ENDPOINT PARA BUSCA POR NOME
app.get('/eventos/busca/:nome', (req, resp) => {
    // TRATAEMNTO DE ERRO
    try{
        // DECLARANDO VARIÁVEIS 
        // PEGANDO O NOME E COLOCANDO EM MINUSCULO
        const nome = req.params.nome.toLowerCase();
        let dados = eventos;
        let busca = [];
        let nomeEvento = '';


        // LAÇO DE REPETIÇÃO PARA TODOS EVENTOS
        for(let i = 0; i < dados.length; i++){

            // PEGANDO O NOME DO EVENTO E SEPERANDO EM INDÍCES DE ARRAY
            nomeEvento = dados[i].nome;
            nomeEvento = nomeEvento.split(' ');

            // COMPARANDO COM O ARRAY, SE TIVER O NOME DE BUSCA, IRÁ ADICIONAR PARA O ARRAY "BUSCA"
            for(let j = 0; j < nomeEvento.length; j++){
                if(nomeEvento[j].toLowerCase() == nome){
                    busca.push(dados[i]);
                }
            }
        }

        resp.send(busca);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



// BUSCA POR ID

app.get('/eventos/id/:id', (req, resp) => {
    try{
        const {id} = req.params;
        let dados = eventos;
        
        dados.forEach(item => {
            if(Number(item.id) == Number(id)){
                console.log(Number(item.id));
                resp.json(item);
            }
        })
        
        throw new Error(`Não foi encontrado nenhum item com o ID ${id}`)

    }catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

app.get('/random', (req, res) => {
    try{
        const random = Math.floor(Math.random() * eventos.length);
        res.json(eventos[random]);
    } catch (err) {
        res.status(400).send({
            erro: err.message
        })
    }
})


//Inicialização do servidor Express:
app.listen(PORT,()=>{
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});