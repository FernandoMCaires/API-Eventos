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

//Inicialização do servidor Express:
app.listen(PORT,()=>{
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});