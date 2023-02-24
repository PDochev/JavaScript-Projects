const p1 = {
    score: 0 ,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Display")
}

const p2 = {
    score: 0 ,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Display")
}

const resetScore = document.querySelector("#reset")
const selectScore = document.querySelector("#selectScore")

let winningScore = 5;
let gameOver = false;
const diff = (a, b) => {
    return Math.abs(a - b);
}

function updateScore(player, opponent){
    if(!gameOver){
        player.score += 1;
    }
    if(player.score === winningScore && diff(player.score,opponent.score) < 2){
        gameOver = true;
        player.display.classList.add("has-text-success")
        opponent.display.classList.add("has-text-danger")
        player.button.disabled = true;
        opponent.button.disabled = true;

    }
    
    player.display.textContent = player.score;
}



p1.button.addEventListener('click' , function(){
    updateScore(p1,p2)
})

p2.button.addEventListener('click' , function(){
    updateScore(p2,p1)
})

selectScore.addEventListener('change' , function(){
    winningScore = parseInt(this.value)
    reset()
})

resetScore.addEventListener('click' ,reset)

function reset(){
    gameOver = false;
    for(let p of [p1,p2]){
        p.score = 0
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success','has-text-danger')
        p.button.disabled = false;
    }
    
    
}