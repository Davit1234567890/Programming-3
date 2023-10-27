let socket = io()
var side = 60;
var n = 25;
var m = 25;
let grasscolor = "green"
let grasseatercolor = "yellow"
let predatorcolor = "black"
let watercolor = "blue"
let lavacolor = "orange"
let huntercolor  = "Bisque"
let Winter = document.getElementById("Winter")
let Spring = document.getElementById("Spring")
let Summer = document.getElementById("Summer")
let Autumn = document.getElementById("Autumn")
let QanakEl = document.getElementById("qanakEl")

function Winterr() {
    grasscolor = "white"
    watercolor = "Aqua"
}

Winter.addEventListener("click", Winterr)

function Springg() {
    grasscolor = "lime"
    watercolor = "blue"
}

Spring.addEventListener("click", Springg)

function Summerr() {
    grasscolor = "green"
    watercolor = "blue"
}

Summer.addEventListener("click", Summerr)

function Autumnn() {
    grasscolor = "orangered"
    watercolor = "blue"
}

Autumn.addEventListener("click", Autumnn)

function setup() {
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
            else if (matrix[y][x] == 6) {
                fill(huntercolor)
            }

            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("matrix", drawmatrix)

function mouseClicked() {

    console.log(mouseX, mouseY);
    
    }
 
    socket.on("static", function(qanak) {
        norobj = qanak
        console.log(norobj)
        QanakEl.innerText = qanak.WaterQanak + " " + qanak.GrassQanak
    })