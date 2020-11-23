const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PORT = 8080
const app = express();
const dbURI = 'mongodb://localhost:27017/todo'

const todoSchema = Schema(
    {
    id: { type: Number},
    text: { type: String},
    checked: { type: Boolean }
    }
) 

const TD = mongoose.model('Todo', todoSchema);

mongoose.connect(dbURI)
    .then(() => app.listen(PORT))

app.use(express.json());

app.post('/add', (req, res) => {
    const newTodo = new TD()
    newTodo.id = req.body.id
    newTodo.text = req.body.text
    newTodo.checked = req.body.checked
    newTodo.save()
     .then(() => res.send({ msg: "Success" }))
     .catch((err) => res.json({ error: err }))
})

app.put('/update/:id/:check', (req, res) => {
    TD.findOneAndUpdate({
        id: req.params.id
    }, {$set:{ checked: req.params.check }},
    (err, newTD) => {
        if (err) res.status(204)
        else res.send({ msg: "Success"})
    }
)})

app.get('/todos', (req, res) => {
    TD.find()
        .then((result) => res.json(result))  //res.json(result)
        .catch((err) => res.json({ error: err }))
})

app.get('/:id', (req, res) => {
    console.log(req.params.id);
})

app.delete('/del/:id', (req, res) => {
    const num = Number(req.params.id)
    TD.findOneAndDelete ({
        id: num
    }, (err, obj) => {
        if (err) res.json({ msg: "Error"})
        else res.json({ msg: "SUCCESS"})
    }
)})

app.delete('/delcompleted', (req, res) => {
    TD.deleteMany({
        checked: true
    }, (err) => {
        if (err) res.json({ msg: "Error"})
        else res.json({ msg: "SUCCESS"})
    }
)})

app.put('/checkall', (req, res) => {
    TD.updateMany({ checked: false }, {$set: {checked: true}},
        (err, o) => {
            if (err) res.json({ msg: "Error"})
            else res.json({ msg: "SUCCESS"})
        })
})

app.put('/uncheckall', (req, res) => {
    TD.updateMany({ checked: true }, {$set: {checked: false}},
        (err, o) => {
            if (err) res.json({ msg: "Error"})
            else res.json({ msg: "SUCCESS"})
        })
})
    // TD.updateMany({
    //     id: req.params.id
    // }, {$set:{ checked: req.params.check }},
    // (err, newTD) => {
    //     if (err) res.status(204)
    //     else res.send({ msg: "Success"})
    // }}


app.get('/fun', (req, res) => {
    res.send("HEllo")
})

module.exports = TD;