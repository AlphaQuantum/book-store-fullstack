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

app.get("/books/:id", (req, res) => {
    const q = "SELECT * FROM book WHERE id = ?";
    const bookId = req.params.id;
    db.query(q, bookId, (err, data) => {
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

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM book WHERE id = ?";

    db.query(q, bookId, (err, data) => {
        if (err) return res.json(err)
        return res.json("Book was succesfully deleted!")
    })
})

app.put("/books/:id", (req, res) => {
    const q = "UPDATE book SET `title` = ?,`desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";
    const bookId = req.params.id;
    const values =
        [
            req.body.title,
            req.body.desc,
            req.body.cover,
            req.body.price
        ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book was succesfully updated!")
    })
})


app.listen(8888, () => {
    console.log("Connection Established at http://localhost:8888/")
})