const apps = require('express').Router();
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
// const fs = require('fs');
const uuid = require('../helpers/uuid');


apps.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data)))
});

apps.delete('/:id', async (req, res) => {
    const deleteNote = req.params.id;
    let readFile = await readFromFile('./db/db.json');
    readFile = JSON.parse(readFile);
    readFile = readFile.filter(others => others.id !== deleteNote);
    writeToFile('./db/db.json', readFile);
    res.json('You deleted your note');
})

apps.post('/', (req, res) => {
    console.log(req.body);
    const {title, text} = req.body;
    if(req.body) {
        const note = {title, text, id: uuid(),};
        readAndAppend(note, './db/db.json');
        res.json('Note added');
    } else {
        res.error('Note did not add')
    }
});

module.exports = apps;