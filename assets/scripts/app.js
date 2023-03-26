const ATTACK_VALUE=10;
const MONSTER_ATTACK_VALUE=17;
const STRONG_ATTACK_VALUE=14;
const HEAL_VALUE=20;

const MODE_ATTACK='ATTACK';//0
const MODE_STRONG_ATTACK='STRONG_ATTACK';//1


const enteredValue=prompt('Maximum life for you and monster.','100');


let chosenMaxLife=parseInt(enteredValue);
if(isNaN(chosenMaxLife)||chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealht=chosenMaxLife;
let currentPlayerHealht=chosenMaxLife;
let hasBonusLife=true;

adjustHealthBars(chosenMaxLife);

function reset(){
     currentMonsterHealht=chosenMaxLife;
     currentPlayerHealht=chosenMaxLife;
     resetGame(chosenMaxLife);
}

function EndRound(){
    const initialPlayerHealt=currentPlayerHealht;
    const playerDamage=dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealht-=playerDamage;
    if(currentMonsterHealht<=0&&hasBonusLife){
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealht=initialPlayerHealt;
    }

    if(currentMonsterHealht<=0&& currentPlayerHealht>0){
        alert('You won');
    }else if (currentPlayerHealht<=0&&currentMonsterHealht>0) {
        alert('You Lost');
    }else if (currentMonsterHealht<=0&& currentPlayerHealht<=0){
        alert('You have a draw')
    };
    if(currentMonsterHealht<=0||currentPlayerHealht<=0){
        reset();
    }
}
function monsterAttack(mode){
    let maxDamage;
    if(mode===MODE_ATTACK){
        maxDamage=ATTACK_VALUE;
    }else if(mode===MODE_STRONG_ATTACK){
        maxDamage=STRONG_ATTACK_VALUE;
    }
    const damage=dealMonsterDamage(maxDamage);
    currentMonsterHealht-=damage;
    EndRound();
}

function attackHandler(){
   monsterAttack(MODE_ATTACK);
};
function strongAttackHandler(){
    monsterAttack(MODE_STRONG_ATTACK);

}
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealht>=chosenMaxLife-HEAL_VALUE){
        alert('Your life is max');
        healValue=chosenMaxLife-currentPlayerHealht;
    }else {
        healValue=HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealht+=healValue;
    EndRound();
}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);