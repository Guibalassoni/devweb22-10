const express = require('express');
const { v4: uuidv4 } = require('uuid'); 
const app = express();
const PORT = 3000;

app.use(express.json()); 

let pessoas = []; 

app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;
    const newPessoa = { id: uuidv4(), nome, celular };
    pessoas.push(newPessoa);
    res.status(201).json(newPessoa);
});

app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;
    const index = pessoas.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).send('Pessoa não encontrada');
    pessoas[index] = { id, nome, celular };
    res.json(pessoas[index]);
});

app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const index = pessoas.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).send('Pessoa não encontrada');
    pessoas.splice(index, 1);
    res.status(204).send(); 
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
