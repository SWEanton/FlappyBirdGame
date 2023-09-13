//anton funktion

let bottom = 0;
let left = 50;
let enemyId = 0;

export function createEnemy() {
    enemyId++
    let enemy = document.createElement("div");
    enemy.classList = "enemy";
    let enemyLeft = 600;
    let enemyBottom = Math.round(Math.round(Math.random() * 500)/10)*10;
    //console.log(enemyBottom);
    // Math.round(Math.floor(Math.random() * (500 - 1)/10)*10)


    enemy.style.left = enemyLeft + "px";
    enemy.style.bottom = enemyBottom + "px";
    enemy.id = enemyId;

    let move = setInterval(() => {
        enemyLeft -= 50;
        enemy.style.left = enemyLeft + "px";

        if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
            console.log("HIT");

            let dead = setInterval(() => {
                hero.style.backgroundColor = "red";

                let resurect = setInterval(() => {
                    hero.style.backgroundColor = "purple"
                    clearInterval(dead)
                }, 100)

            }, 100)
            
        
        }

        if (enemyLeft <= 0) {
            clearInterval(move);
            enemy.remove();
            createEnemy();
        }

    }, 50)

    game.appendChild(enemy);
}