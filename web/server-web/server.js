const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const sequelize = require('./database');
const Produtos = require('./models/Produto')

app.use(express.json());
app.use(cors());

app.get('/api/v1/produtos', async (req, res)=>{
    try {
        const produtos = await Produtos.findAll();
        return res.status(200).json(produtos)    
    } catch (error) {
        return res.status(500).json({msg: `${error}`})
    }
    
})

app.post('/api/v1/cadastro', async (req, res) => {
    const{valor ,desconto, nome, desc,img} = req.body;
    var resetdesc = desconto || 0;
    try {
        console.log(resetdesc)
        await Produtos.create({
            valor,
            resetdesc,
            nome,
            desc,
            img
        });
        return res.status(201).send('Produto criado com sucesso!');
        } catch (error) {
            return res.status(500).send(`Erro no cadastro ${error}`);
        }
    
});

app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`)
});