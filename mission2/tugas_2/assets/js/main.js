const char = document.getElementById('charizard');
const pokeball = document.getElementById('pokeball');
const playerScore = document.getElementById('score');

let score = 0;
let interval = null;
let totalScore = ()=>{
    score++
    playerScore.innerHTML = `Score: ${score}`;
}

function jump(){
    if(char.classList != 'animate'){
        char.classList.add('animate');
    }
    setTimeout(function(){
        char.classList.remove('animate');
    },500);
    interval = setInterval(totalScore, 100);
}

const ifHitpokeball = setInterval(function(){
    const charTop = parseInt(window.getComputedStyle(char).getPropertyValue('top'))
    const pokeballLeft = parseInt(window.getComputedStyle(pokeball).getPropertyValue('left'))
    if (pokeballLeft < 70 && pokeballLeft > 0 && charTop >= 70){
        pokeball.style.animation = 'none';
        pokeball.style.display = 'none';
        if (confirm("Charizard kamu nabrak, mau ulangi lagi??")) {
            window.location.reload();
        }
    }
});
