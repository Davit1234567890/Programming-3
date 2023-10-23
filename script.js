let socket = io()
var side = 60;
var n = 50;
var m = 50;
let grasscolor = "green"
let grasseatercolor = "yellow"
let predatorcolor = "black"
let watercolor = "blue"
let lavacolor = "orange"
let gq = document.getElementById("gq")

function setup() {
    frameRate(20);
    createCanvas(n * side, m * side);
    background('#acacac');
}

function drawmatrix(data) {
    matrix = data.matrix
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(grasscolor);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill(grasseatercolor);
            }
            else if (matrix[y][x] == 3) {
                fill(predatorcolor);
            }
            else if (matrix[y][x] == 4) {
                fill(watercolor)
            }
            else if (matrix[y][x] == 5) {
                fill(lavacolor)
            }


            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("matrix", drawmatrix)

let qanakobj = {

}

socket.on("grassqanak", qanakobj)

gq.innerHTML(qanakobj.Grass)