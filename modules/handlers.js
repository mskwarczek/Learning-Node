var fs = require('fs');
var formidable = require('formidable');

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

// ================================================================


exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "./temp";
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, 'pictures/'+files.upload.name);
        response.writeHead(301, {
            Location: '/show?filename='+files.upload.name}
        );
        response.end();
    });
}

exports.show = function(request, response) {
    fs.readFile('templates/show.html', function(error, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.showStylesheet = function(request, response) {
    fs.readFile('templates/show.css', function(error, css) {
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(css);
        response.end();
    });
}

exports.showScript = function(request, response) {
    fs.readFile('templates/show.js', function(error, javascript) {
        response.writeHead(200, {"Content-Type": "text/javascript"});
        response.write(javascript);
        response.end();
    });
}

exports.pictures = function(request, response) {
    console.log('req url ' + request.url);
    var image = request.url.split("=")[1];
    console.log('req url ' + image);
    console.log("inside pictures");
    fs.readFile(image, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/jpg"});
        response.write(file, "binary");
        response.end();
    });
}



/*
exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "./temp";
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, files.upload.name);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.show = function(request, response) {
    fs.readFile(files.upload.name, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}
*/
exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}