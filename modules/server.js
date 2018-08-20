var http = require('http');
var colors = require('colors');
var handlers = require('./handlers');

function start() {
    function onRequest(request, response) {
        console.log("Odebrano zapytanie.");
        console.log("Zapytanie " + request.url + " odebrane.");
        var requestUrl = request.url.split("?")[0];
        console.log("Zapytanie po cięciu: " + requestUrl);
        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        if (requestUrl.includes('pictures')) requestUrl = '/pictures=';
        console.log("Zapytanie po IFie: " + requestUrl);
        switch (requestUrl) {
            case '/':
            case '/start':
                handlers.welcome(request, response);
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
            case '/show.js':
                handlers.showScript(request, response);
                break;
            case '/pictures=':
                handlers.pictures(request, response);
            default:
                handlers.error(request, response);
        }
    }
    http.createServer(onRequest).listen(9000);

    console.log("Uruchomiono serwer!".green);
}

exports.start = start;