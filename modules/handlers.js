const fs = require('fs');
const url = require('url');
const formidable = require('formidable');

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.startStylesheet = function(request, response) {
    fs.readFile('templates/start.css', function(error, css) {
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(css);
        response.end();
    });
}

const showTemplate = (pictureName) => { 
    return (`
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <link rel="stylesheet" type="text/css" href="show.css">
        </head>
        <body>
            <h1>Wgrany plik</h1>
            <div class="image-holder">
                <img src='show?picture=${pictureName}'>
            </div>
            <p>Adres twojego pliku: http://localhost:9000/show?picture=${pictureName}</p>
        </body>
        </html>
    `)
};

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    const form = new formidable.IncomingForm();
    form.uploadDir = "./temp";
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, 'pictures/'+files.upload.name);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(showTemplate(files.upload.name));
        response.end();
    });
}

exports.show = function(request, response) {
    console.log("Rozpoczynam obsługę żądania show.");
    const pictureURL = url.parse(request.url, true);
    fs.readFile(`./pictures/${pictureURL.query.picture}`, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/jpg"});
        response.write(file, "binary");
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

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}
