const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PORT = 3001
const dbURI = 'mongodb://localhost:27017/todo'
mongoose.connect(dbURI)
    .then(() => app.listen(PORT))

const app = express();
const todoSchema = Schema(
    {
    id: { type: Number},
    text: { type: String},
    checked: { type: Boolean }
    }
) 

const TD = mongoose.model('Todo', todoSchema);

app.use(express.json());

app.get('/add', (req, res) => {
    const newTodo = new TD(req.query)
    newTodo.save()
     .then(() => res.send({ msg: "Success" }))
     .catch((err) => res.json({ error: err }))
})

app.get('/todos', (req, res) => {
    TD.find()
        .then((result) => res.json(result))  //res.json(result)
        .catch((err) => res.json({ error: err }))
})



module.exports = TD;

