const ATTACK_VALUE = 13; // 플레이어의 공격력
const STRONG_ATTACK_VALUE = 20; //강한 공력
const MONSTER_ATTACK_VALUE = 15; //강한 공력
const HEAL_VALUE = 15; //힐량


const MODE_ATTACK = 'ATTACK'; //0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK' //1
const LOG_EVENT_PLAYER_ATTACK='PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK='PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';

let chosenMaxLife;

try{
  chosenMaxLife = getMaxLifeValues();
}catch(error){
  console.log(error);
  chosenMaxLife = 100;
  alert('기본값으로 게임이 시작됩니다.')
}
 
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;  
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHander() {
  attackMonster(MODE_STRONG_ATTACK);
}
 
function attackMonster(mode) {
  let maxDamage = mode === MODE_ATTACK?ATTACK_VALUE:STRONG_ATTACK_VALUE;
  let logEvent = mode ===MODE_ATTACK?LOG_EVENT_PLAYER_ATTACK:LOG_EVENT_PLAYER_STRONG_ATTACK;
  
  writeToLog(logEvent,maxDamage,currentMonsterHealth,currentPlayerHealth);
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function healHandler() {
  let heal;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than yout max initial health");
    heal = chosenMaxLife - currentMonsterHealth;
  } else {
    heal = HEAL_VALUE;
  }
  increasePlayerHealth(heal);
  currentPlayerHealth += heal;
  writeToLog(LOG_EVENT_PLAYER_HEAL,heal,currentMonsterHealth,currentPlayerHealth);
  endRound();
}

function endRound() {
  const initalPlayerLife = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);

  if(currentPlayerHealth <= 0 && hasBonusLife == true){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initalPlayerLife;
    setPlayerHealth(initalPlayerLife);
    alert("you would be dead but you bouns life saved you");

  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
    writeToLog(LOG_EVENT_GAME_OVER,'WON',currentMonsterHealth,currentPlayerHealth);
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
    writeToLog(LOG_EVENT_GAME_OVER,'LOST',currentMonsterHealth,currentPlayerHealth);
    reset();
  } else if (currentMonsterHealth == 0 && currentPlayerHealth == 0) {
    alert('Draw!');
    writeToLog(LOG_EVENT_GAME_OVER,'DRAW',currentMonsterHealth,currentPlayerHealth);
    reset();
  }
}

function reset(){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function writeToLog(ev,val,monsterHeadlth,playerHealth){
  let  logEntry = {
    event : ev,
    value : val,
    finalMonsterHealth: monsterHeadlth,
    finalPlayerHealth:playerHealth
  };
  if(ev ===LOG_EVENT_PLAYER_ATTACK && ev ===LOG_EVENT_PLAYER_STRONG_ATTACK){
    logEntry.target = 'MONSTER'
  }else{
    logEntry.target = 'PLAYER'
  }
    battleLog.push(logEntry);
}

function printLogHandler(){
  for(let i = 0; i<3;i++){
    console.log('-------------------------------------');
  }
  let i = 0;
  for(const logEntry of battleLog){
    console.log(`#${i}`);
    for(const key in logEntry){
      console.log(`${key} :::: ${logEntry[key]}`);
      
    }
    i++;
  }
}

function getMaxLifeValues(){
  const startLife = prompt('Maximum life you and the monster.','100'); //사용자에게 초기 값 입력 받기
  let parsedValue = parseInt(startLife); //Life 값

  if(isNaN(parsedValue)||parsedValue <= 0){
    throw{message:'숫자가 아닌 값 또는 0 또는 음수를 입력하셨습니다.'}
    chosenMaxLife = 100;
    alert('숫자가 아닌 값 또는 0 또는 음수를 입력하여 기본값으로 시작합니다.')
  }
  return parsedValue

}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHander);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click',printLogHandler);
