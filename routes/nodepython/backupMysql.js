console.log("backup script initiated")

var fs = require('fs');
var PythonShell = require('python-shell');
var oneDay = 1000 * 60 * 60 * 24;

function runBackup() {

    if (fs.existsSync('./routes/python/mySQLbackup.py')) {
        PythonShell.run('./routes/python/mySQLbackup.py', function () {
            console.log('backup ran')
        });
    } else {
        console.log('file does not exist')
    }
}


runBackup();
setInterval(function () {
    runBackup();
}, oneDay);
