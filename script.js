let hero = document.getElementById("hero");
let game = document.getElementById("game");
let score = document.getElementById("score");

let bottom = 0;
let left = 50;

//var backgroundMusic = new Audio("FlappyBirdNextLevel.wav");
//backgroundMusic.play();

var ohMyGod = new Audio ("omg.m4a");

let enemyId = 0;

var jumping = 0;
function gamePage() {
  createEnemy();
  let gravity = setInterval(() => {
    var heroTop = parseInt(
      window.getComputedStyle(hero).getPropertyValue("top")
    );
    if(jumping==0){
	hero.style.top = (heroTop+5)+"px";
    }
    if (heroTop > 550) {
      gameOver();
	clearInterval(gravity);
    }
    hero.style.top = heroTop + 3 + "px";
  }, 10);
  var jumpSound = new Audio("bounce.m4a")
  document.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    } else if (e.key == " ") {
	jumpSound.play();
      jump();
    }

  });
}
  function jump() {
    //jumpSound.play();
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
      var heroTop = parseInt(
        window.getComputedStyle(hero).getPropertyValue("top")
      );
      if ((heroTop > 6) && (jumpCount < 15)) {
        hero.style.top = (heroTop - 8) + "px";
      }
      if (jumpCount > 20) {
        clearInterval(jumpInterval);
        jumping = 0;
        jumpCount = 0;
      }
      jumpCount++;
    }, 10);
  }

function startScreen() {
  let start = document.getElementById("startScreen");
  let startBtn = document.getElementById("startBtn");
  let wrapper = document.getElementById("wrapper");
  let game = document.getElementById("game");
  wrapper.style.display = "none";
  start.style.display = "flex";
  game.style.display = "none";
  gameOverScreenBody.style.display = "none";

  startBtn.addEventListener("click", () => {

    start.style.display = "none";
    game.style.display = "block";
    gamePage();
	hero.style.top = 0 + "px";
  });
}

function gameOver() {
  ohMyGod.play();
  let wrapper = document.getElementById("wrapper");
  let game = document.getElementById("game");
  game.style.display = "none";
  wrapper.style.display = "block";
  gameOverScreenBody.style.display = "block";
  gameOverText.innerText = "GAME OVER";
  pressXToTryAgain.innerText = "Score = " + enemyId;
  quitGameBtn.innerText = "Restart"; 
  quitGameBtn.addEventListener("click", () => {
    window.location.reload();
  });
}
function createEnemy() {
  var heroTop = parseInt(
      window.getComputedStyle(hero).getPropertyValue("top")
    );

  enemyId++;
  let score = document.getElementById("score");
  let enemy = document.createElement("div");
  enemy.classList = "enemy";
  let enemyUnder = document.createElement("div");
  enemyUnder.classList = "enemyUnder";
  let enemyLeft = 600;
  let enemyBottom = Math.round(Math.round(Math.random() * 300) / 10) * 10;

  enemy.style.left = enemyLeft + "px";
  enemy.style.height = enemyBottom + "px";
  enemy.id = enemyId;

  enemyUnder.style.left = enemyLeft + "px";
  enemyUnder.style.height = 420 - enemyBottom + "px";
  enemyUnder.id = "enemyUnder id is" + enemyId;

  let move = setInterval(() => {
    enemyLeft -= 30;
    enemy.style.left = enemyLeft + "px";
    enemyUnder.style.left = enemyLeft + "px";

    if (enemyLeft <= 0) {
      clearInterval(move);
      enemy.remove();
      enemyUnder.remove();
      createEnemy();
	score.innerText = "score = " + enemyId;
      console.log("hero top is", heroTop, "enemy bottom is", enemyBottom);
	if (heroTop < (enemyBottom - 120)) {
		console.log("hit over")
		gameOver();
		} else if (heroTop > (enemyBottom + 120)) {
		console.log("hit under");
		gameOver();
	}
    } 
  }, 50);
  
  game.appendChild(enemy);
  game.appendChild(enemyUnder);
}
startScreen();
