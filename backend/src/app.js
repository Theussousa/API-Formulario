import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import { createTables } from './Controller/Usuarios.js';

const app = express(); // Cria uma instância do aplicativo Express
app.use(express.json()); // Habilita o middleware para análise do corpo das requisições em JSON
app.use(cors()); // Habilita o middleware CORS para permitir solicitações de diferentes origens

import router from './routes.js'
app.use(router);

createTables().then(() => { // Chama a função createTables para criar as tabelas no banco de dados antes de iniciar o servidor
    app.listen(4000, () => {
        console.log('Api Rodando.');
    });
});

https.createServer({ // Cria um servidor HTTPS
    cert: fs.readFileSync('src/SLL/code.crt'),
    key: fs.readFileSync('src/SLL/code.key')
}, app).listen(4001, ()=> console.log("Rodando um https."));
