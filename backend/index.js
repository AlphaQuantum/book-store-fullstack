import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "300404",//u can hack me, no problem
    database: "book_db"
})
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("backend bro")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM book";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO book (`title`,`desc`,`cover`,`price`) VALUES (?)";
    const values =
        [
            req.body.title,
            req.body.desc,
            req.body.cover,
            req.body.price
        ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book was succesfully added!")
    })
})

app.listen(8888, () => {
    console.log("Connection Established at http://localhost:8888/")
})