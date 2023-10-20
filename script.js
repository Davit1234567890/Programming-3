let socket = io()
var side = 60;
var n = 50;
var m = 50;

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
}

socket.on("matrix", drawmatrix)