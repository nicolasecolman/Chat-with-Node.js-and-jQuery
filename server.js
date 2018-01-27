//Required modules
var sys = require("util"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs"),
    io = require("socket.io");

require("./config.js"); 

/**
 * Web server
 */

var mimeTypes = {
    'html': 'text/html', 
    'png': 'image/png',
    'js': 'text/javascript', 
    'css': 'text/css'
};
        
http.createServer(function(request, response) {  
    var uri = url.parse(request.url).pathname;  
    var filename = path.join(process.cwd(), uri);  
    fs.exists(filename, function(exists) {  
        if(!exists) {  
            response.writeHead(404, {"Content-Type": "text/html"});  
            response.write("404 Not Found\n");  
            response.end();  
            return;  
        }  
  
        fs.readFile(filename, "binary", function(err, file) {  
            if(err) {  
                response.writeHead(500, {"Content-Type": "text/plain"});  
                response.write(err + "\n");  
                response.end();  
                return;  
            }  
  
            var extension = path.extname(filename).substr(1);
            var mimeType = mimeTypes[extension] || 'application/octet-stream';
            response.writeHead(200, {'Content-Type': mimeType});
              
            response.write(file, "binary");
            response.end();  
        });  
    });  
}).listen(portServidorWebNodeJs);

console.log("Server running at http://" + ipServidorChatNodeJs + ":" + portServidorWebNodeJs + "/");

/**
 * Messages server
 */

var io = require('socket.io').listen(portServidorChatNodeJs);

io.sockets.on('connection', function (socket) {
    socket.on('nuevomsj', function (data) {
        io.sockets.emit('news', data);
    });
});        