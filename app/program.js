var OSinfo = require('../modules/OSinfo.js');

process.stdin.setEncoding('utf-8');

process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if (input !== null) {
        var instruction = input.toString().trim();
        switch (instruction) {
            case '/version':
                console.log(process.versions.node);
                break;
            case '/lang':
                console.log(process.env.lang);
                break;
            case '/sayhello':
                console.log('hello!');
                break;
            case '/getOSinfo':
                OSinfo.print();
                break;
            case '/exit':
                console.log('Quitting app!');
                process.exit();
                break;
            default:
                process.stderr.write('Wrong instruction!\n');
        }
    }
});