var matrix = []

var side = 60;
var n = 50
var m = 50

for (let i = 0; i < n; i++) {
    matrix.push([])
    for (let j = 0; j < m; j++) {
        matrix[i].push(0)
    }
}
function characters(index, count) {
    for (let a = 0; a < count; a++) {
        var v = Math.floor(random(0, n))
        var w = Math.floor(random(0, m))
        matrix[v][w] = index
    }
}
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let waterArr = []
let lavaArr = []

function setup() {
    characters(1, 50)
    characters(2, 20)
    characters(3, 20)
    characters(4, 1)
    characters(5, 1)
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

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
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("black");
            }
            else if (matrix[y][x] == 4) {
                fill("blue")
            }
            else if (matrix[y][x] == 5) {
                fill("orange")
            }


            rect(x * side, y * side, side, side);
        }
    }
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
}