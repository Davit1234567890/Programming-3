var express = require("express");

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("../Programming-3"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

let random = require("./random");

grassArr = []
grassEaterArr = []
predatorArr = []
waterArr = []
lavaArr = []

let LivingCreature = require("./LivingCreature")
let Grass = require("./Grass")
let GrassEater = require("./GrassEater")
let Predator = require("./predator")
let Water = require("./water")
let Lava = require("./lava")

let cl = false

io.on("connection", function (socket) {
    if (cl) {
        setInterval(drawserver, 200)
        cl = true
    }
    startGame()
})

let intervalID

let time = 1000

function startGame() {
    clearInterval(intervalID)
    intervalID = setInterval(() => {
        GenerateMatrix()
    }, time);
}

matrix = []

var n = 50;
var m = 50;

function characters(index, count) {
    for (let a = 0; a < count; a++) {
        var v = Math.floor(Math.random() * n)
        var w = Math.floor(Math.random() * n)
        matrix[v][w] = index
    }
}

function GenerateMatrix() {
    for (let i = 0; i < n; i++) {
        matrix.push([])
        for (let j = 0; j < m; j++) {
            matrix[i].push(0)
        }
    }
    characters(1, 300)
    characters(2, 70)
    characters(3, 50)
    characters(4, 5)
    characters(5, 5)
    return matrix;
}

matrix = GenerateMatrix()

for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var grEa = new GrassEater(x, y, 1);
            grassEaterArr.push(grEa)
        }
        else if (matrix[y][x] == 3) {
            var pre = new Predator(x, y, 1);
            predatorArr.push(pre)
        }
        else if (matrix[y][x] == 4) {
            var wat = new Water(x, y, 1)
            waterArr.push(wat)
        }
        else if (matrix[y][x] == 5) {
            var lav = new Lava(x, y, 1)
            waterArr.push(lav)
        }
    }
}

function drawserver() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].drink()
    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in waterArr) {
        waterArr[i].eat()
    }
    for (var i in lavaArr) {
        lavaArr[i].eat()
    }
    for (var i in lavaArr) {
        lavaArr[i].eat2()
    }

    let sendData = {
        matrix: matrix
    }

    io.emit("matrix", sendData)
}

setInterval(drawserver, 500)

let qanak = {
    Grass: grassArr.length,
    GrassEater: grassEaterArr.length,
    Predator: predatorArr.length,
    Water: waterArr.length,
    Lava: lavaArr.length
}

fs.writeFile("stats.json", JSON.stringify(qanak))
io.emit("grassqanak", qanak)