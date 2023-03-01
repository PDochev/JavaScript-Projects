const c = document.getElementById("sCanvas");
const ctx = sCanvas.getContext("2d");
const cHeight = sCanvas.height;
const cWidth = sCanvas.width;
const img = new Image();
img.src= 'court.jpeg'; 
const beep = new Audio('beep.wav');
let changedirection = false; 
let score1 = 0;  
let score2 = 0;  

      
//******************
//Objects
//******************
 
    class Paddle {
        constructor(x,y, speed=10){
          this.colour = 'black';
          this.xPos = x;
          this.yPos = y;
          this.width = 15;
          this.height = 80;
          this.speed = speed;
        }

        drawMe(){
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos,this.width, this.height);
        ctx.fillStyle = this.colour;
        ctx.fill()
        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 5;
        ctx.stroke();
        }
    } 


class Sphere {
    constructor() {
            this.radius = 10;
            this.colour = "blue";
            this.xPos = 300;//Math.random() * cWidth;
            this.yPos = 200;//Math.random() * cHeight;
            this.speedY = 0 ;// 8 * Math.random();
            this.speedX = 0 ;// 8 * Math.random();
        }
       
    drawMe() {
        //method to draw itself
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.colour;
        ctx.fill();
      
    }
    //method to move itself
    moveMe(){
        this.yPos += this.speedY;
        this.xPos += this.speedX;

                //bounce off the bottom wall
        if (this.yPos >cHeight-this.radius){
    this.speedY = - this.speedY;
   
    }           //bounce off the top wall
        else if(this.yPos<0+this.radius){
    this.speedY= -this.speedY;
    
        }

    //stop ball if hit right side
     if (this.xPos >cWidth){
            this.speedX =0;
            this.speedY =0;
            //this.xPos = cWidth;
            this.xPos = 300;
            this.yPos = 200;
            score1++;
            
            
            }
            //bounce off player 2 paddle
       else if (this.xPos >player2.xPos && (this.yPos > player2.yPos && this.yPos< (player2.yPos+player2.height) ) ){
    this.speedX = - this.speedX;
    beep.play();
    
    }

    if (this.xPos < 0){
            this.speedX =0;
            this.speedY =0;
            //this.xPos = cWidth;
            this.xPos = 300;
            this.yPos = 200;
            score2++;
            
            }
            
       else if (this.xPos < player1.xPos + player1.width && (this.yPos > player1.yPos && this.yPos< (player1.yPos+player1.height ) ) ){
    this.speedX = - this.speedX;
    beep.play();
    }
        
        
    // else if (ball.xPos > player1.xPos && (this.yPos > player1.yPos && this.yPos< (player1.yPos+player1.height ) ) ){
    // this.speedX = + this.speedX;
    //         beep.play();
    // }
    
        }
    }

    //******************
    // create game objects
    //******************

    const ball = new Sphere();

    let player1 = new Paddle(10,155);
    let player2 = new Paddle(575,155);
   

    //*********************
    // Deal with key presses
    // **********************

    const keysDown = []; //empty array to store which keys are being held down


window.addEventListener("keydown", function (event) {
   keysDown[event.keyCode] = true; //store the code for the key being pressed
});

window.addEventListener("keyup", function (event) {
 delete  keysDown[event.keyCode] ;
});

function checkKeys() {

    if (keysDown[90]) {
        if(player1.yPos > 0){
            player1.yPos -= player1.speed; //z
        }
    }
     
    if (keysDown[88]) {
        if(player1.yPos < (cHeight-player1.height) ){
            player1.yPos += player1.speed; //x
         }
    }

}

    //*********************
    // Make the score board
    // **********************

    function scoreBoard(){
        ctx.font = "60px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(score1,213,50);
        ctx.fillText(score2,353,50);
        
    }

    //*********************
    // launch the ball from the centre, left and right, on space bar
    // **********************

    window.addEventListener("keydown", function(event){
        if(event.keyCode == 32) {
            ball.xPos = 300;
            ball.yPos = 200;
            ball.speedY = 2 + 4 * Math.random();
            ball.speedX = 2 + 4 * Math.random();
            if(changedirection) {ball.speedX = - ball.speedX;}
            changedirection = !changedirection;
        
        }
    });
    function render() {
        requestAnimationFrame(render);
    
        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(img,0,0,600,400)
        ball.drawMe();
        ball.moveMe();
        player1.drawMe();
        player2.drawMe();
    
        checkKeys();
        scoreBoard();
       
        const damp = 0.76;//Math.random()
        player2.yPos = ball.yPos * damp ;

        //player2.yPos = ball.yPos - 10 + (ball.xPos/45);
        
        // if (player2.yPos = ball.yPos){
        //     player1.yPos != ball.yPos
        // }

        // if (player2.yPos = ball.yPos){
        //     player1.yPos != ball.yPos - 10
        // }
       
    }
    //let d = Math.random();
    // let d = Math.random();
    // let b = getRandomArbitrary();
    // function getRandomArbitrary(min=0.7,max=0.8 ) {
    //     return Math.random() * (max - min) + min;
    //         }

    render();