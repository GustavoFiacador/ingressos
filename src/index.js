const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');

const ingressosPorClienteId = {};
id = 0;

const {
    v4: uuidv4
} = require('uuid');
const funcoes = {
    ClienteDeletadoComIngressos: (dados) => {
        delete ingressosPorClienteId[dados.id];
    }
};

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
});

app.post('/clientes/:id/ingressos', async(req, res) => {
    const idObs = uuidv4();
    const {
        descricao
    } = req.body;

    const ingressosDoCliente =
        ingressosPorClienteId[req.params.id] || [];
    ingressosDoCliente.push({
        id: idObs,
        descricao
    });
    ingressosPorClienteId[req.params.id] =
        ingressosDoCliente;
    await axios.post('http://localhost:10000/eventos', {
        tipo: "IngressoCriado",
        dados: {
            id: idObs,
            descricao,
            clienteId: req.params.id
        }
    })
    res.status(201).send(ingressosDoCliente);
});

app.get('/clientes/:id/ingressos', (req, res) => {
    res.send(ingressosPorClienteId[req.params.id] || []);
});

app.get('/ingressos', (req, res) => {
    res.send(ingressosPorClienteId || []);
});

app.delete('/clientes/:id/ingressos', (req, res) => {
    const idDeletar = req.params.id;
    const length = ingressosPorClienteId[req.params.id].length
    ingressosPorClienteId[req.params.id].splice(length-1, 1)
    axios.post("http://localhost:10000/eventos", {
        tipo: "IngressoDeletado",
        dados: idDeletar
    });
    res.send(ingressosPorClienteId[req.params.id] || []);
});
app.listen(5000, (() => {
    console.log('Ingressos. Porta 5000');
}));