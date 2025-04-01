import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuário padrão do XAMPP
    password: '', // Senha padrão geralmente é vazia
    database: 'users',
    port: 3306   // Altere se necessário
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL!');

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
        console.log('Tabela criada ou já existente.');

        const insertUser = `INSERT INTO users (nome, idade, email) VALUES ('${nome}', ${idade}, '${email}')`;

        connection.query(insertUser, (err, result) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                return;
            }
            console.log('Usuário inserido com sucesso!');
        });

        connection.end();
    });
});
