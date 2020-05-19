let canvas = document.getElementById('board');
let c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

document.addEventListener('keydown', e => {
    if((e.key == "d" || e.key == "ArrowRight") && snake.move != 'left'){
        snake.move = 'right';
    }
    else if((e.key == "w" || e.key == "ArrowUp") && snake.move != 'down'){
        snake.move = 'up';
    }
    else if((e.key == "s" || e.key == "ArrowDown") && snake.move != 'up'){
        snake.move = 'down';
    }
    else if((e.key == "a" || e.key == "ArrowLeft") && snake.move != 'right'){
        snake.move = 'left';
    }
})

//snake array
//[{0, 0}, {0, 1}, {0, 2}]

function roundToCube(val){
    return Math.round(val / cubeWidth) * cubeWidth;
}

class Snake{
    constructor(x, y, length, color){
        this.x = x;
        this.y = y;
        this.length = 1;
        this.color = color;
        this.bodyParts = new Array(length).fill({'x': 0, 'y': 0});
        this.move = '';
        this.increment = cubeWidth
        this.bonusX = roundToCube((canvas.width-cubeWidth)*Math.random())
        this.bonusY = roundToCube((canvas.height-cubeHeight)*Math.random())
    } 

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.bonusX, this.bonusY, cubeWidth, cubeHeight)
        c.fillStyle = this.color;
        for(let i =0; i < this.bodyParts.length; i++){
            c.fillRect(roundToCube(this.bodyParts[i].x), roundToCube(this.bodyParts[i].y), cubeWidth, cubeHeight);
        }
    }

    update(){
        switch(this.move){
            case 'right':
                this.x+=this.increment;
                break;
            case 'left':
                this.x-=this.increment;
                break;
            case 'up':
                this.y-=this.increment;
                break;
            case 'down':
                this.y+=this.increment
                break;
        }

        if(this.length < 3){
            this.grow();
        }

        if(this.bodyParts.length != this.length){
            this.bodyParts.push({'x': this.x, 'y': this.y})
        }
        else{
            this.bodyParts.shift();
            this.bodyParts.push({'x': this.x, 'y': this.y})
        }

        console.log(roundToCube(this.x), this.bonusX, this)

        if(roundToCube(this.x) == this.bonusX && roundToCube(this.y) == this.bonusY){
            this.grow();
            this.bonusX = roundToCube((canvas.width-cubeWidth)*Math.random())
            this.bonusY = roundToCube((canvas.height-cubeHeight)*Math.random())
        }

        this.draw()
    }

    grow(){
        this.length++;
    }
}

let cubeWidth = cubeHeight = canvas.width/50;

let snake = new Snake(roundToCube(canvas.width/2), roundToCube(canvas.height/2), 1, 'green')


let boardWidth = canvas.width/100;
let boardHeight = canvas.height/boardWidth;

let board = new Array(Math.floor(boardHeight)).fill(new Array(Math.floor(50)));

console.log(board)

let animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i =0; i < canvas.height-cubeHeight; i+=cubeHeight){
        for(let j = 0; j < canvas.width-cubeWidth; j+=cubeWidth){
            c.beginPath();
            c.rect(j, i, cubeWidth, cubeHeight);
            c.stroke();
        }
    }

    snake.update();
}

setInterval(animate, 50);