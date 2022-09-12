const express = require('express');
const app = express(); //exoress는 함수이므로 반환값을 변수에 저장
const dotenv = require("dotenv").config();
const mysql = require('mysql');

app.use(express.json());

const port = 3000;

const con = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

con.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

//Opening a server
app.listen(3000, function () {
    console.log("✅ Express Server On Port 3000 Starts");
});

//GET
app.get('/api/users', (req, res) => {
    console.log(req);
    con.query('SELECT * FROM users', function callback(error, result) {
        if (error) throw error;
        return res.send({ error: false, data: result, message: "success" });
    });
});

// POST
app.post('/api/user', (req, res) => {
    const id = req.query.user_id;
    const username = req.query.user_name;
    const pw = req.query.user_pw;

    const sql = "INSERT INTO users(user_id, user_name, user_pw) VALUES (?)";
    const value = [id, username, pw];

    con.query(sql, [value], (err, result) => {
        if (err) throw err;
        console.log('1 rescord inserted');
        return res.send({ err: false, result: result });
    });
});

//PUT
app.put('/api/user', (req, res) => {
    const id = req.query.user_id;
    const username = req.query.user_name;
    const pw = req.query.user_pw;
    if (!id) {
        return res.status(400).send({ error: true, message: "No UserID" });
    }

    const sql = "UPDATE users SET user_name = ?, user_pw = ? WHERE user_id = ?";
    con.query(sql, [username, pw, id], (err, result) => {
        if (err) throw err;
        return res.send({ error: false, result: result });
    });
});


//DELETE 
app.delete('/api/user/:userid', (req, res) => {
    const userid = req.params.userid;
    if (!userid) {
        return res.status(400).send({ error: true, message: "No userID" });
    }

    const sql = "DELETE FROM users WHERE user_id = ?";
    con.query(sql, [userid], (err, result) => {
        if (err) throw err;
        return res.status(200).send({ error: false, result: result });
    });
});

