import { openDb } from "../configDB.js";

// Função para criar as tabelas Eventos e Registros.
export async function createTables() {
    const db = await openDb();
  
    await db.exec('CREATE TABLE IF NOT EXISTS Eventos (id INTEGER PRIMARY KEY, nome TEXT, data TEXT, hora TEXT, local TEXT, descricao TEXT)');
    
    await db.exec('CREATE TABLE IF NOT EXISTS Registros (id INTEGER PRIMARY KEY, evento_id INTEGER, nome TEXT, email TEXT, FOREIGN KEY (evento_id) REFERENCES Eventos(id))');
}

// CRUD para a tabela de Eventos
// Função para criar um evento
export async function createEvento(req, res) {
    const evento = req.body;
    const db = await openDb();
    await db.run('INSERT INTO Eventos (nome, data, hora, local, descricao) VALUES (?,?,?,?,?)', [evento.nome, evento.data, evento.hora, evento.local, evento.descricao]);
    res.json({ "statusCode": 200 });
}

// Função para selecionar todos os eventos
export async function selectEventos(req, res) {
    const db = await openDb();
    const eventos = await db.all('SELECT * FROM Eventos');
    res.json(eventos);
}

// Função para inserir um evento
export async function insertEvento(req, res) {
    const evento = req.body;
    const db = await openDb();
    await db.run('INSERT INTO Eventos (nome, data, hora, local, descricao) VALUES (?,?,?,?,?)', [evento.nome, evento.data, evento.hora, evento.local, evento.descricao]);
    res.json({ "statusCode": 200 });
}

// Função para obter um evento pelo seu ID
export async function getEventoById(req, res) {
    const { id } = req.params;
    const db = await openDb();
    const evento = await db.get('SELECT * FROM Eventos WHERE id = ?', [id]);
    if (evento) {
        res.json(evento);
    } else {
        res.status(404).json({ "error": "Evento não encontrado" });
    }
}

// Função para atualizar um evento pelo seu ID
export async function updateEvento(req, res) {
    const { id } = req.params;
    const evento = req.body;
    const db = await openDb();
    await db.run('UPDATE Eventos SET nome = ?, data = ?, hora = ?, local = ?, descricao = ? WHERE id = ?', [evento.nome, evento.data, evento.hora, evento.local, evento.descricao, id]);
    res.json({ "statusCode": 200 });
}

// Função para deletar um evento pelo seu ID
export async function deleteEvento(req, res) {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM Eventos WHERE id = ?', [id]);
    res.json({ "statusCode": 200 });
}

// CRUD para a tabela de Registros
// Função para criar um registro de participante em um evento
export async function createRegistro(req, res) {
    const registro = req.body;
    const db = await openDb();
    await db.run('INSERT INTO Registros (evento_id, nome, email) VALUES (?,?,?)', [registro.evento_id, registro.nome, registro.email]);
    res.json({ "statusCode": 200 });
}

// Função para obter todos os registros de participantes de um evento pelo ID do evento
export async function getRegistrosByEventoId(req, res) {
    const { evento_id } = req.params;
    const db = await openDb();
    const registros = await db.all('SELECT * FROM Registros WHERE evento_id = ?', [evento_id]);
    res.json(registros);
}

// Função para deletar um registro de participante pelo seu ID
export async function deleteRegistro(req, res) {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM Registros WHERE id = ?', [id]);
    res.json({ "statusCode": 200 });
}
