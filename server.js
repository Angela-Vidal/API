import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'; // Importando o pacote CORS

// Criando o app do Express
const app = express();

// Habilitando CORS para permitir requisições de qualquer origem
app.use(cors()); // Isso permite todas as origens

app.use(express.json());

// Conectando ao MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',  // Nome do banco de dados
    port: 3306
});

// Conectando ao banco de dados MySQL e criando a tabela, se não existir
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('✅ Conectado ao MySQL!');
    
    // Criando a tabela de usuários (caso não exista)
    const createTable = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        idade INT,
        email VARCHAR(100) UNIQUE
    )`;

    connection.query(createTable, (err, result) => {
        if (err) {
            console.error('Erro ao criar tabela:', err);
            return;
        }
        console.log('Tabela de usuários criada ou já existente.');
    });
});

// Rota POST para criar um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, idade, email } = req.body;

    // Inserindo o novo usuário na tabela
    const insertUser = `INSERT INTO users (nome, idade, email) VALUES ('${nome}', ${idade}, '${email}')`;

    connection.query(insertUser, (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário no MySQL:', err);
            return res.status(500).send('Erro ao criar usuário');
        }
        res.status(201).send('Usuário criado com sucesso!');
    });
});

// Rota GET para listar todos os usuários
app.get('/usuarios', (req, res) => {
    const getUsers = 'SELECT * FROM users';

    connection.query(getUsers, (err, result) => {
        if (err) {
            console.error('Erro ao buscar usuários no MySQL:', err);
            return res.status(500).send('Erro ao buscar usuários');
        }
        res.status(200).json(result); // Retorna os usuários como JSON
    });
});

// Rota PUT para editar um usuário
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params; // ID do usuário a ser editado
    const { nome, idade, email } = req.body;

    const updateUser = `UPDATE users SET nome = '${nome}', idade = ${idade}, email = '${email}' WHERE id = ${id}`;

    connection.query(updateUser, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário no MySQL:', err);
            return res.status(500).send('Erro ao editar usuário');
        }
        res.send('Usuário atualizado com sucesso!');
    });
});

// Rota DELETE para excluir um usuário
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params; // ID do usuário a ser excluído

    const deleteUser = `DELETE FROM users WHERE id = ${id}`;

    connection.query(deleteUser, (err, result) => {
        if (err) {
            console.error('Erro ao excluir usuário no MySQL:', err);
            return res.status(500).send('Erro ao excluir usuário');
        }
        res.send('Usuário excluído com sucesso!');
    });
});

// Iniciando o servidor Express na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
