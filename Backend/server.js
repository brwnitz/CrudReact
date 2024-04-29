const http = require("http")
const sqlite3 = require("sqlite3").verbose()
const express = require("express");
const { userInfo } = require("os");
const cors = require('cors')

const db = new sqlite3.Database("produto.db")
const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

db.serialize(()=>{
    db.run(`
    CREATE TABLE IF NOT EXISTS Produtos(
        id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
        produto_nome TEXT,
        id_fornecedor INTEGER,
        id_categoria INTEGER,
        produto_unidade TEXT,
        produto_preco FLOAT
    )
    `)
})

process.on('SIGINT',()=>{
    db.close((err)=>{
        if(err){
            console.error(err)
        }else{
            console.log('Sqlite connection closed')
        }
        process.exit(0)
    })
})

app.listen(3000,()=>{
    console.log('Express server running on port 3000')
})

app.post('/produtos',(req,res)=>{
    const {produto_nome,id_fornecedor,id_categoria,produto_unidade,produto_preco} = req.body
    db.run(
        'INSERT INTO Produtos(produto_nome,id_fornecedor,id_categoria,produto_unidade,produto_preco) VALUES (?,?,?,?,?)',
        [produto_nome,id_fornecedor,id_categoria,produto_unidade,produto_preco],
        function (err){
            if(err){
                res.status(500).send('Erro criando o produto');
            }else{
                res.status(201).json({id:this.lastID,produto_nome,id_fornecedor,id_categoria,produto_unidade,produto_preco})
            }
        }
    )
})

app.get('/produtos',(req,res)=>{
    db.all('SELECT * FROM Produtos',(err,rows)=>{
        if(err) res.status(500).send('Erro ao retornar produtos')
        else res.json(rows) 
    })
})

app.get('/produtos/:id',(req,res)=>{
    const produtoId = req.params.id
    db.get('SELECT * FROM Produtos WHERE id_produto = ?', [produtoId], (err,row)=>{
        if(err) res.status(500).send('Erro ao retornar produto')
        else if(!row) res.status(404).send('Produto não encontrado')
        else res.json(row)
    })
})

app.put('/produtos/:id',(req,res)=>{
    const produtoId = req.params.id
    const {produto_nome,id_fornecedor,id_categoria,produto_unidade,produto_preco} = req.body

    db.run(
        `UPDATE Produtos SET
        produto_nome = ?,
        id_fornecedor = ?,
        id_categoria = ?,
        produto_unidade = ?,
        produto_preco = ?
        WHERE id_produto = ?`,
        [produto_nome,id_fornecedor,id_categoria,produto_unidade,produto_preco,produtoId],
        (err)=>{
            if(err) res.status(500).send('Erro atualizando produto')
            else res.status(200).send("Produto atualizado com sucesso");
        }
    )
})

app.delete('/produtos/:id',(req,res)=>{
    const produtoId = req.params.id
    db.run('DELETE FROM Produtos WHERE id_produto = ?',[produtoId],(err)=>{
        if(err) res.status(500).send('Erro deletando produto')
        else res.status(200).send('Produto deletado com sucesso')
    })
})