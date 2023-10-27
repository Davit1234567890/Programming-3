var express = require("express");

grassArr = []
grassEaterArr = []
predatorArr = []
waterArr = []
lavaArr = []
hunterArr = []

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

let qanakobj = {
    GrassQanak: grassArr.length,
    GrassEaterQanak: grassEaterArr.length,
    PredatorQanak: predatorArr.length,
    WaterQanak: waterArr.length,
    LavaQanak: lavaArr.length,
    HunterQanak: hunterArr.length
}



app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

let random = require("./random");
let Grass = require("./Grass")
let GrassEater = require("./GrassEater")
let Predator = require("./predator")
let Water = require("./water")
let Lava = require("./lava")
let Hunter = require("./Hunter")

let cl = false

io.on("connection", function (socket) {
    if (cl) {
        setInterval(drawserver, 1000)
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

var n = 25;
var m = 25;

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
    characters(1, 15)
    characters(2, 10)
    characters(3, 5)
    characters(4, 5)
    characters(5, 5)
    characters(6,7)
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
        else if (matrix[y][x] == 6) {
            var hunt = new Hunter(x, y, 1)
            hunterArr.push(hunt)
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
    for(var i in hunterArr){
        hunterArr[i].move()
    }
    for(var i in hunterArr){
        hunterArr[i].eat()
    }
    fs.writeFileSync("stats.json", JSON.stringify(qanakobj))
    io.emit("static", qanakobj)
    let sendData = {
        matrix: matrix
    }

    io.emit("matrix", sendData)
}

setInterval(drawserver, 1000)