var addNode = require('./cytoscapeSetup.js').addNode;

const commandPalette = document.getElementById('command-palette');

window.addEventListener('keydown', function(event) { // Listen for Ctrl+P or Cmd+P
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        commandPalette.focus();
    }
});

// Listen for input in the command palette
// ISN'T WORKING FOR NOW
// commandPalette.addEventListener('input', function() {
//     var input = commandPalette.value;
//     var matchingCommands = commands.filter(function(command) {
//         return command.toLowerCase().includes(input.toLowerCase());
//     });

//     // Display the matching commands to the user
//     console.log(matchingCommands);
// });

// Listen for Enter in the command palette
commandPalette.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let input = commandPalette.value;
        addNode(input);
        event.target.value = '';
    }
});