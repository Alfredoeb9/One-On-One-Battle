const expNeededToLevel = {
  1: 20,
  2: 40,
  3: 60,
  4: 80,
  5: 100,
};

class BattleStage {
  constructor(round, player1, enemy, turn) {
    this.round = round;
    this.player1 = player1;
    this.enemy = enemy;
    this.turn = "player";
  }

  get currentRound() {
    return this.round;
  }

  start(player1, enemy) {
    this.round++;
    if (player1.speed < enemy.speed) {
      this.turn = "enemy";
    }

    return new BattleStage(this.round, player1, enemy, this.turn);
  }

  attack(player1, player2) {
    while (player1.health >= 0 || player2.health >= 0) {
      if (player1.health <= 0) {
        console.log("winning");
        return this.winner(player2);
      }

      if (player2.health <= 0) {
        console.log("winnerrrr");
        return this.winner(player1);
      }
      if (this.turn == "player") {
        const unluckyCounter = Math.floor(Math.random());
        const attackCounter = Math.random() + player1.attack - unluckyCounter;
        player2.health = Math.floor(player2.health - attackCounter);
        this.turn = "enemy";
      } else {
        const unluckyCounter = Math.floor(Math.random());
        const attackCounter = Math.random() + player2.attack - unluckyCounter;

        player1.health = Math.floor(player1.health - attackCounter);
        this.turn = "player";
      }
    }
  }

  winner(player) {
    return player;
  }
}
// create a simple player charcter
// create a attack stat ✅
// create a defense stat ✅
// create a speed stat ✅
// allow player to level up ✅
// create a randomizer to pick which stat to level up ✅
// allow player to attack ✅
//
class Player {
  constructor(
    name,
    type,
    exp,
    level,
    health = 100,
    speed = 0,
    attack = 0,
    defense = 0
  ) {
    this.name = name;
    this.type = type;
    this.exp = exp;
    this.level = level;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
    this.health = health;

    if (type === "fighter") {
      this.attack = 5;
      this.defense = 5;
      this.speed = 5;
      this.health = 120;
    } else if (type === "warrior") {
      this.attack = 7;
      this.defense = 6;
      this.speed = 3;
      this.health = 130;
    }
  }

  get currentLevel() {
    return this.level;
  }

  randomStat() {
    return Math.floor(Math.random() * 3);
  }

  awardExp(otherExp) {
    this.exp += Number(otherExp);

    if (this.exp >= Object.values(expNeededToLevel)[this.level]) {
      let stat = this.randomStat();
      if (stat == 0) {
        this.speed += 1;
      } else if (stat == 1) {
        this.attack += 1;
      } else if (stat == 2) {
        this.defense += 1;
      }
      this.level += 1;
    }
    return this.exp;
  }
}

const player1 = new Player("fighter 1", "fighter", 0, 0);
const player2 = new Player("warrior 2", "warrior", 0, 0);

const battle1 = new BattleStage(0, player1, player2, 0);

player1.awardExp(20);
player1.awardExp(20);
battle1.start(player1, player2);
battle1.attack(player1, player2);

console.log(battle1);
