import { createEnemy } from './modules/enemySpawner.mjs';

let hero = document.getElementById("hero");
let game = document.getElementById("game");

let top = 50;
let bottom = 0;
let left = 50;

var jumping = 0;
var counter = 0;

setInterval(function(){
    var heroTop =
	parseInt(window.getComputedStyle(hero).getPropertyValue("top"));
    hero.style.top = (heroTop+3)+"px";
},10);

document.addEventListener("keydown", (e) => {
    console.log("e", e.key);
    if (e.repeat) { return }
    else if (e.key == " "){
	jump();
    }
})

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
	var heroTop = parseInt(window.getComputedStyle(hero).getPropertyValue("top"));
        if((heroTop>6)&&(jumpCount<15)){
            hero.style.top = (heroTop-8)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
	jumpCount++;
    },10);
}


createEnemy();
