/**
 * Created by kylereden on 4/2/14.
 */

var http = require("http");
var url = require("url");

function start(route, handle){
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }).listen(8888);

    console.log('Server started');
}

exports.start = start;
