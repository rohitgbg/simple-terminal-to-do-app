const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes');

var titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: "t"
};

var bodyOptions = {
    describe: 'description/body of note',
    demand: true,
    alias: "b"
};

var argv = yargs
    .command('add', "add a note", {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'list all notes')
    .command('read', 'Read your note ', {
        title: titleOptions
    })
    .command('remove', 'remove note by title', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];
console.log('You are requisting for: ' + command);


if (command == "add") {
    var note = notes.addNote(argv.title, argv.body);

    if (note) {
        console.log("Note created");
        notes.printNotes(note);
    } else {
        console.log("Faild to create note, already existed");
    }

} else if (command == "list") {
    var allNotes = notes.getAll();
    console.log("Total notes: " + allNotes.length);
    allNotes.forEach((note) => notes.printNotes(note));
} else if (command == "read") {
    var readNote = notes.getNote(argv.title);
    if (readNote) {
        console.log("Here is your note");
        notes.printNotes(readNote);
    } else {
        console.log("Note not found");
    }

} else if (command == "remove") {
    var removeNote = notes.removeNote(argv.title);
    var message = removeNote ? "Note removed successfully" : "Note not removed or not found";
    console.log(message);

} else {
    console.log('Please enter a valid command')
}