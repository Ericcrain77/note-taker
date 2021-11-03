const express = require('express');
const fs = require('fs');


const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Develop'));

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

    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(existingNote));
    res.json(existingNote);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});