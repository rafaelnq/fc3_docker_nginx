const express = require('express');
const mysql = require('mysql2');
const app = express();

const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

connection.query(
  `CREATE TABLE IF NOT EXISTS people (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255),
     PRIMARY KEY (id)
   )`
);

app.get('/', (req, res) => {
    const name = `User-${Math.floor(Math.random() * 9999)}`;
    connection.query(`INSERT INTO people(name) VALUES ('${name}')`);

    connection.query(`SELECT name FROM people`, (err, rows) => {
        if(err) throw err;

        let html = '<h1>Full Cycle Rocks!</h1>';
        html += '<ul>';

        rows.forEach(row => {
            html += `<li>${row.name}</li>`;
        });

        html += '</ul>';

        res.send(html);
    });
});

app.listen(3000, () => {
    console.log('Rodando na porta 3000');
});
