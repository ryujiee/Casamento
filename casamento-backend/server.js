const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

const confirmarPresencaFilePath = path.join(__dirname, 'database', 'confirmar-presenca.json');
const itensFilePath = path.join(__dirname, 'database', 'itens.json');

// Função para ler o arquivo JSON
function readConfirmarPresenca() {
    try {
        const data = fs.readFileSync(confirmarPresencaFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Função para salvar o nome no arquivo JSON
function saveConfirmarPresenca(data) {
    fs.writeFileSync(confirmarPresencaFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Função para ler os itens
function readItens() {
    try {
        const data = fs.readFileSync(itensFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Função para salvar os itens
function saveItens(data) {
    fs.writeFileSync(itensFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Rota para obter o cronograma
app.get('/cronograma', (req, res) => {
    const cronogramaFilePath = path.join(__dirname, 'database', 'cronograma.json');

    fs.readFile(cronogramaFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao ler o cronograma' });
        }

        const cronograma = JSON.parse(data);
        res.status(200).json(cronograma);
    });
});
// Rota para obter os itens da lista de casamento
app.get('/itens', (req, res) => {
    const itens = readItens();
    res.status(200).json(itens);
});

// Rota para confirmar pagamento
app.post('/confirmar-pagamento', (req, res) => {
    const { valor } = req.body;
    let itens = readItens();
    let valorRestante = valor;

    // Atualizar o progresso dos itens
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        const valorFaltante = item.valor - (item.progresso / 100) * item.valor;

        if (valorRestante > 0 && valorRestante >= valorFaltante) {
            item.progresso = 100;
            valorRestante -= valorFaltante;
        } else if (valorRestante > 0 && valorRestante < valorFaltante) {
            item.progresso += (valorRestante / item.valor) * 100;
            valorRestante = 0;
        }
    }

    // Salvar os itens atualizados
    saveItens(itens);

    res.status(200).json({ sucesso: true, itensAtualizados: itens });
});

// Rota para confirmar presença
app.post('/confirmar-presenca', (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ message: 'Nome é obrigatório!' });
    }
    const confirmacoes = readConfirmarPresenca();
    const nomeJaConfirmado = confirmacoes.some(confirmacao => confirmacao.nome === nome);
    if (nomeJaConfirmado) {
        return res.status(400).json({ message: 'Este nome já confirmou presença!' });
    }
    confirmacoes.push({ nome, confirmado: true });
    saveConfirmarPresenca(confirmacoes);
    res.status(200).json({ message: 'Presença confirmada!' });
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
