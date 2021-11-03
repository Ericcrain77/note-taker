const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
// const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/db/db.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    const existingNote = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
    const newNote = req.body;
    newNote.id = uniqid();
    existingNote.push(newNote);

    fs.writeFileSync('./Developdb/db.json', JSON.stringify(existingNote));
    res.json(existingNote);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});