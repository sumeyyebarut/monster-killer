const ATTACK_VALUE=10;
const MONSTER_ATTACK_VALUE=17;
const STRONG_ATTACK_VALUE=14;
const HEAL_VALUE=20;

const MODE_ATTACK='ATTACK';//0
const MODE_STRONG_ATTACK='STRONG_ATTACK';//1
const LOG_EVENT_PLAYER_ATTACK='PLAYER_ATTACK';
const LOG_EVENT_STRONG_PLAYER_ATTACK='STRONG_PLAYER_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';


const enteredValue=prompt('Maximum life for you and monster.','100');

let battleLog=[];
let chosenMaxLife=parseInt(enteredValue);
if(isNaN(chosenMaxLife)||chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealht=chosenMaxLife;
let currentPlayerHealht=chosenMaxLife;
let hasBonusLife=true;

adjustHealthBars(chosenMaxLife);
function writeLog(event,value,finalMonsterHealt,finalPlayerHealht){
    let logEntry= {
        event:event,
        value:value,
        finalMonsterHealt:finalMonsterHealt,
        finalPlayerHealht:finalPlayerHealht
    }
    if(event===LOG_EVENT_PLAYER_ATTACK){
       logEntry.target='MONSTER';
    }else if(event===LOG_EVENT_STRONG_PLAYER_ATTACK){
        logEntry.target='MONSTER';
    }else if(event===LOG_EVENT_MONSTER_ATTACK){
        logEntry.target='PLAYER';
    }else if(event===LOG_EVENT_PLAYER_HEAL){
        logEntry.target='PLAYER';
    }else if (event===LOG_EVENT_GAME_OVER){ let logEntry= {
        event:event,
        value:value,
        finalMonsterHealt:finalMonsterHealt,
        finalPlayerHealht:finalPlayerHealht
    }}
    battleLog.push(logEntry);

}
function reset(){
     currentMonsterHealht=chosenMaxLife;
     currentPlayerHealht=chosenMaxLife;
     resetGame(chosenMaxLife);
};

function EndRound(){
    const initialPlayerHealt=currentPlayerHealht;
    const playerDamage=dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealht-=playerDamage;
    writeLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealht,currentPlayerHealht);

    if(currentMonsterHealht<=0&&hasBonusLife){
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealht=initialPlayerHealt;
    }

    if(currentMonsterHealht<=0&& currentPlayerHealht>0){
        alert('You won');
        writeLog(LOG_EVENT_GAME_OVER,'PLAYER WON',currentMonsterHealht,currentPlayerHealht);

    }else if (currentPlayerHealht<=0&&currentMonsterHealht>0) {
        alert('You Lost');
        writeLog(LOG_EVENT_MONSTER_ATTACK,'MONSTER WON',currentMonsterHealht,currentPlayerHealht);

    }else if (currentMonsterHealht<=0&& currentPlayerHealht<=0){
        alert('You have a draw');
        writeLog(LOG_EVENT_MONSTER_ATTACK,'A DRAW',currentMonsterHealht,currentPlayerHealht);

    };
    if(currentMonsterHealht<=0||currentPlayerHealht<=0){
        reset();
    }
};
function monsterAttack(mode){
    const maxDamage= mode==='MODE_ATTACK'? ATTACK_VALUE:STRONG_ATTACK_VALUE;    
    const logEvent =mode==='MODE_ATTACK'? STRONG_ATTACK_VALU:LOG_EVENT_STRONG_PLAYER_ATTACK;

    // if(mode===MODE_ATTACK){
    //     maxDamage=ATTACK_VALUE;
    //     logEvent=LOG_EVENT_PLAYER_ATTACK;
    // }else if(mode===MODE_STRONG_ATTACK){
    //     maxDamage=STRONG_ATTACK_VALUE;
    //     logEvent=LOG_EVENT_STRONG_PLAYER_ATTACK;
    // }
    const damage=dealMonsterDamage(maxDamage);
    currentMonsterHealht-=damage;
    writeLog(logEvent,damage,currentMonsterHealht,currentPlayerHealht);

    EndRound();
};

function attackHandler(){
   monsterAttack(MODE_ATTACK);
};
function strongAttackHandler(){
    monsterAttack(MODE_STRONG_ATTACK);
};
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
    writeLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealht,currentPlayerHealht);

    EndRound();
};
function printLogHandler(){
    console.log(battleLog);
};
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);