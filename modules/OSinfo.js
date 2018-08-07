var os = require('os');
var colors = require('colors');
var timeFormat = require('./timeFormat.js');

function getOSinfo() {
    var type = os.type();
    if(type === 'Darwin') {
        type = 'OSX';
    } else if(type === 'Windows_NT') {
        type = 'Windows';
    }
    var release = os.release();
    var cpu = os.cpus()[0].model;
    var uptime = os.uptime();
    var userInfo = os.userInfo();
    console.log('System:'.red, type);
    console.log('Release:'.green, release);
    console.log('CPU model:'.yellow, cpu);
    console.log('Uptime: '.blue, timeFormat.print(uptime));
    console.log('User name:'.magenta, userInfo.username);
    console.log('Home dir:'.cyan, userInfo.homedir);
}

exports.print = getOSinfo;