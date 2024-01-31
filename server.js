// express app and port
const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const PORT = 3001;

const app = express();

// dependencies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// made landing page here
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
// render the data from the notes page here
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
  
app.get('/api/notes', (req, res) => {
    res.json(noteData)
});

app.post('/api/notes', (req, res) => { // i got this info to match from the index.js line 39! i had to write the data and push it into the array, and then convert it to a string using JSON stringify.
    req.body.id = Math.floor(Math.random() * 10000000)
    noteData.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData))
    res.json(noteData)
});

app.delete('/api/notes/:id', (req, res) => { //using for loop in order to render the id in the array. !!splice splice!!
    for (let i = 0; i < noteData.length; i++) {
        if ( noteData[i].id == req.params.id ) {
            noteData.splice( i, 1 )
        }
    }  
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData)) // had to convert id into string as well so did that for delete button.
    res.json(noteData)
}), 

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


