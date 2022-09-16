const app = require('express').Router();
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
// const fs = require('fs');
const uuid = require('../helpers/uuid');


app.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data)))
});

app.post('/', (req, res) => {
    console.log(req.body);
    const {title, text} = req.body;
    if(req.body) {
        const note = {title, text, id: uuid()};
        readAndAppend(note, './db/db.json');
        res.json('Note added');
    } else {
        res.error('Note did not add')
    }
});

module.exports = app;