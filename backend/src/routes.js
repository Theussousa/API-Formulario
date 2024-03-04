import { Router } from "express";
import { getEventoById, updateEvento, deleteEvento, createRegistro, getRegistrosByEventoId, deleteRegistro, selectEventos, insertEvento} from "./Controller/Usuarios.js";

const router = Router();

// Rota para verificar se a API está rodando
router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "API Rodando."
    })
});

// Rotas para eventos
router.get('/eventos', selectEventos); // Obter todos os eventos
router.post('/eventos', insertEvento); // Criar um novo evento
router.get('/eventos/:id', getEventoById); // Obter um evento pelo ID
router.put('/eventos/:id', updateEvento); // Atualizar um evento pelo ID
router.delete('/eventos/:id', deleteEvento); // Deletar um evento pelo ID

// Rotas para registros
router.post('/registros', createRegistro); // Criar um novo registro
router.get('/eventos/:evento_id/registros', getRegistrosByEventoId); // Obter registros por ID do evento
router.delete('/registros/:id', deleteRegistro); // Deletar um registro pelo ID

export default router;
