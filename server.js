var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

var messages = [];

app.use(express.static("."));

app.get('/', function (req, res) {

    res.redirect('index.html');

});

server.listen(3000);
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var messages = [];
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');

});

server.listen(3000);

function main() {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    function handleSubmit() {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
        var p = document.createElement('p');

p.innerText = msg;
chatDiv.appendChild(p);
input.value = "";
}

socket.on('display message', handleMessage);
}  

window.onload = main;

    button.onclick = handleSubmit;

    let random = require("./random");