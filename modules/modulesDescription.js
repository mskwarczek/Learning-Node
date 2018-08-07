var fs = require('fs');

function writeModulesContent () {
    fs.readdir('./modules', 'utf8', function(err, data) {
        if (err) throw err;
        fs.writeFile('./modules-content.txt', 'Content of modules dir:\n - ' + data.toString().replace(/,/g, '\n - '), function(err) {
            if (err) throw err;
            console.log('Saved!\n');
            fs.readFile('./modules-content.txt', 'utf-8', function(err, data) {
                if (err) throw err;
                console.log(data);
            });
        });
    });
}

exports.write = writeModulesContent;