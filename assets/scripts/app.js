const ATTACK_VALUE=10;
const MONSTER_ATTACK_VALUE=17;
const STRONG_ATTACK_VALUE=14;
const HEAL_VALUE=20;

let chosenMaxLife=100;
let currentMonsterHealht=chosenMaxLife;
let currentPlayerHealht=chosenMaxLife;


adjustHealthBars(chosenMaxLife);
function EndRound(){
    const playerDamage=dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealht-=playerDamage;
    if(currentMonsterHealht<=0&& currentPlayerHealht>0){
        alert('You won');
    }else if (currentPlayerHealht<=0&&currentMonsterHealht>0) {
        alert('You Lost');
    }else if (currentMonsterHealht<=0&& currentPlayerHealht<=0){
        alert('You have a draw')
    };
}
function monsterAttack(mode){
    let maxDamage;
    if(mode==='ATTACK'){
        maxDamage=ATTACK_VALUE;
    }else if(mode==='STRONG_ATTACK'){
        maxDamage=STRONG_ATTACK_VALUE;
    }
    const damage=dealMonsterDamage(maxDamage);
    currentMonsterHealht-=damage;
    EndRound();
}

function attackHandler(){
   monsterAttack('ATTACK');
};
function strongAttackHandler(){
    monsterAttack('STRONG_ATTACK');

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