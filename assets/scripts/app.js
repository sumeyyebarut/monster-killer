const ATTACK_VALUE=10;
const MONSTER_ATTACK_VALUE=15;
const STRONG_ATTACK_VALUE=17;

let chosenMaxLife=100;
let currentMonsterHealht=chosenMaxLife;
let currentPlayerHealht=chosenMaxLife;


adjustHealthBars(chosenMaxLife);

function monsterAttack(mode){
    let maxDamage;
    if(mode==='ATTACK'){
        maxDamage=ATTACK_VALUE;
    }else if(mode==='STRONG_ATTACK'){
        maxDamage=STRONG_ATTACK_VALUE;
    }
    const damage=dealMonsterDamage(maxDamage);
    currentMonsterHealht-=damage;
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

function attackHandler(){
   monsterAttack('ATTACK');
};
function strongAttackHandler(){
    monsterAttack('STRONG_ATTACK');

}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);