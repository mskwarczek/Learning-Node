const http = require('http');
const url = require('url');
const colors = require('colors');
const handlers = require('./handlers');

function start() {
    function onRequest(request, response) {
        console.log("Odebrano zapytanie.");
        console.log("Zapytanie " + request.url + " odebrane.");
        const parsedURL = url.parse(request.url, true);
        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        switch (parsedURL.pathname) {
            case '/':
            case '/start':
                handlers.welcome(request, response);
                break;
            case '/start.css':
                handlers.startStylesheet(request, response);
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
                break;
            case '/show.css':
                handlers.showStylesheet(request, response);
                break;
            default:
                handlers.error(request, response);
        }
    }
    http.createServer(onRequest).listen(9000);

    console.log("Uruchomiono serwer! (http://localhost:9000/)".green);
}

exports.start = start;