const fs = require('fs');

// Obter todas as tarefas
exports.getAll = async (req, res) => {
    const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
    const data = JSON.parse(dataJson);
    return res.send(data.tarefas);
}

// Obter uma tarefa pelo seu id
exports.getById = async (req, res) => {
    // Obter o id da tarefa solicitada
    const id = req.params.id;
    // Ler o arquivo JSON local de dados
    const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
    // Analisar para JSON
    const data = JSON.parse(dataJson);
    // Encontrar a tarefa pelo seu id
    const tarefa = data.tarefas.find(tarefa => tarefa.id == id);
    // Manejar el caso en que la tarea no existe
    if (!tarefa) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    // Retornar a tarefa
    res.send(tarefa);
}

// Criar uma nova tarefa
exports.create = async (req, res) => {
    // Obter as propriedades da tarefa solicitada
    const { titulo, categoria, descricao, dataLimite } = req.body;
    // Ler o arquivo JSON local de dados
    const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
    // Analisar para JSON
    const data = JSON.parse(dataJson);
    // Adicionar ao array de tarefas
    const novaTarefa = { id: Date.now(), titulo, categoria, descricao, dataLimite, concluida: false };
    data.tarefas.push(novaTarefa);
    // Atualizar o banco de dados local
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    // Retornar a nova tarefa
    return res.status(201).send(novaTarefa);
}

// Atualizar uma tarefa existente
exports.update = async (req, res) => {
    const { id, titulo,  categoria, descricao, dataLimite, concluida } = req.body;
    // Ler o arquivo JSON local de dados
    const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
    // Analisar para JSON
    const data = JSON.parse(dataJson);
    // Encontrar a tarefa a ser atualizada pelo seu id
    const tarefa = data.tarefas.find(t => t.id == id);
    // Atualizar propriedades
    tarefa.titulo = titulo;
    tarefa.descricao = descricao;
    tarefa.categoria = categoria;
    tarefa.dataLimite = dataLimite;
    tarefa.concluida = concluida;
    // Atualizar o banco de dados local
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    // Retornar a tarefa atualizada
    return res.send(tarefa);
}

// Excluir uma tarefa pelo seu id
exports.delete = async (req, res) => {
    // Obter o id da tarefa solicitada
    const id = req.params.id;
    // Ler o arquivo JSON local de dados
    const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
    // Analisar para JSON
    const data = JSON.parse(dataJson);
    // Encontrar a tarefa a ser excluída pelo seu id
    const tarefaIndex = data.tarefas.findIndex(t => t.id == id);
    // Excluir a tarefa
    data.tarefas.splice(tarefaIndex, 1);
    // Atualizar o banco de dados local
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    // Retornar "ok"
    return res.status(200).send("ok");
}
