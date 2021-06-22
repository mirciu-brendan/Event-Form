const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "password",
    database: "event_form"
});

app.post('/create', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const date = req.body.date;

    db.query('INSERT INTO members (firstName, lastName, email, date) VALUES (?,?,?,?)',
    [firstName, lastName, email, date],
    (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send("Values inserted");
        };
    }
    );
});

app.listen(3001, () => {
    console.log("Your server is runnih at port 3001!!!!")
})