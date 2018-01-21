
//Servidor para la pantalla de chat

var sys = require("util"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs"),
    io = require("socket.io");

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
            //response.sendHeader(404, {"Content-Type": "text/plain"});
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
            //response.close();
            response.end();  
        });  
    });  
}).listen(8888);

//Deprecated
//sys.puts("Server running at http://localhost:8888/");
console.log("Server running at http://localhost:8888/");


//Servidor para los envios de mensajes del chat

var io = require('socket.io').listen(8889);

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('nuevomsj', function (data) {
    console.log(data);
    //socket.emit('news', data);   //Con esto lo mando a uno solo pero quiero mandarselo a todos los clientes
    io.sockets.emit('news', data);
  });
});        