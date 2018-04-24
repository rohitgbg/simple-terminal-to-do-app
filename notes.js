const fs = require("fs");

var fetchNotes = () => {
    try {
        var existingData = fs.readFileSync('notes-data.json');
        return JSON.parse(existingData);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var notesObj = {
        title: title,
        body: body,
        date: new Date()
    }
    var duplicateNotes = notes.filter((note) => note.title == title);
    if (duplicateNotes.length == 0) {
        notes.push(notesObj);
        saveNotes(notes);
        return notesObj;
    }
};

var getAll = () => {

    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var filterNotes = notes.filter((note) => note.title == title);
    return filterNotes[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var removeNote = notes.filter((note) => note.title != title);
    saveNotes(removeNote);
    return notes.length !== removeNote.length;
};

var printNotes = (note) => {
    console.log("--------------------------------------------------");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log("---------------------------------------------------");
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    printNotes
};