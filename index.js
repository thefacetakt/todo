var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3011;
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/client'));

var tasks = {};
var lastTask = -1;
io.on('connection', function(socket) {
    for (i in tasks) {
        socket.emit('new task', {
            text : tasks[i],
            id: i
        });
    }
    socket.on('new task', function(text) {
        tasks[++lastTask] = text;
        console.log(text);
        io.sockets.emit('new task', {
            text : text,
            id : lastTask
        });
    });

    socket.on('change', function(data) {
        console.log(data);
        tasks[data.id] = data.text;
        socket.broadcast.emit('change', data);
    });

    socket.on('delete', function(id) {
        console.log(id);
        delete tasks[id];
        io.sockets.emit('delete', id);
    });
});