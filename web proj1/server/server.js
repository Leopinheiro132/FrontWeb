const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const messages = require("./msgs")

const app = express();
app.use(bodyParser.json());
app.use(cors())

let messageId = messages.length;

app.get("/api/v1/getallmsg", async (req, res) => {
    try {
        await res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar mensagens." });
    }
});

app.get("/api/v1/getmsgbyid/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const message = await messages.find(msg => msg.id === id);
        if (!message) {
            res.status(404).json({ error: "Mensagem não encontrada." });
        } else {
            res.status(200).json(message);
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar mensagem." });
    }
});

app.delete("/api/v1/deletemsg/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = await messages.findIndex(msg => msg.id === id);
        if (index === -1) {
            res.status(404).json({ error: "Mensagem não encontrada." });
        } else {
            messages.splice(index, 1);
            res.status(200).json({ message: "Mensagem deletada com sucesso." });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar mensagem." });
    }
});

// Rota para adicionar uma nova mensagem
app.post("/api/v1/upmsg", async (req, res) => {
    try {
        const { usuario, msg } = req.body;
        console.log(usuario+"   "+ msg)
        const newMessage = {
            id: messageId++,
            usuario,
            msg
        };
        console.log(newMessage)
        await messages.push(newMessage);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: "Erro ao adicionar mensagem." });
    }
});

const PORT = 3301;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
