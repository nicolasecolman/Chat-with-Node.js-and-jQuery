//Review /*global*\/ requires the Assume a browser option.*/
/*global ipServidorChatNodeJs*/
/*global portServidorChatNodeJs*/
/*global portServidorWebNodeJs*/

//Required modules
require("./config.js");
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var io = require("socket.io");

/**
 * Web server
 */

var mimeTypes = {
    "html": "text/html",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

http.createServer(function (request, response) {
    "use strict";
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    /*fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            var extension = path.extname(filename).substr(1);
            var mimeType = mimeTypes[extension] || "application/octet-stream";
            response.writeHead(200, {"Content-Type": mimeType});
            response.write(file, "binary");
            response.end();
        });
    });*/
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("{}", "binary");
            response.end();
}).listen(portServidorWebNodeJs);

console.log("Server running at http://" + ipServidorChatNodeJs + ":" + portServidorWebNodeJs + "/");

/**
 * Messages server
 */

//Review: Redefinition of 'io'
//var io = require("socket.io").listen(portServidorChatNodeJs);
const _io = require('socket.io')(portServidorChatNodeJs);

_io.sockets.on("connection", function (socket) {
    "use strict";
    socket.on("nuevomsj", function (data) {
        _io.sockets.emit("news", data);
    });
});