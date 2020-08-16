/**
 * Returns a random number between min and max (both included).
 * @param {Number} min
 * @param {Number} max
 */
const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

new Vue({
  el: '#app',
  data: {
    player: { maxHp: 100, hp: 100 },
    monster: { maxHp: 100, hp: 100 },
    battleLog: [],
    gameState: 'newgame' /* 'playing' | 'won' | 'lost' */
  },
  methods: {
    playerAct: function (action) {
      switch (action) {
        case 'attack':
          this.attack();
          break;
        case 'specialAttack':
          this.attack(10, 20);
          break;
        case 'heal':
          this.heal();
          break;
      }
      if (this.monster.hp <= 0) {
        this.gameState = 'won';
      } else {
        // setTimeout(this.monsterAttack, 500);
        this.monsterAttack();
        if (this.player.hp <= 0) gameState = 'lost';
      }
    },

    heal: function (min = 5, max = 15) {
      if (this.player.hp < this.player.maxHp) {
        let amount = getRndInteger(min, max);
        this.player.hp += amount;
        if (this.player.hp > this.player.maxHp) this.player.hp = this.player.maxHp;
        this.updateBattleLog(`PLAYER HEALS FOR ${amount}`, 'player');
      } else {
        this.updateBattleLog(`PLAYER HEALS FOR 0`, 'player');
      }
    },

    attack: function (min = 1, max = 10) {
      let amount = getRndInteger(min, max);
      this.monster.hp -= amount;
      if (this.monster.hp < 0) this.monster.hp = 0;
      this.updateBattleLog(`PLAYER HITS MONSTER FOR ${amount}`, 'player');
    },

    updateBattleLog: function (msg, subject) {
      this.battleLog.push({ msg, subject });
      setTimeout(this.scrollToEnd, 1);
    },

    scrollToEnd: function () {
      var container = this.$el.querySelector('#battle-log');
      container.scrollTop = container.scrollHeight;
    },

    monsterAttack: function (min = 1, max = 10) {
      let amount = getRndInteger(min, max);
      this.player.hp -= amount;
      if (this.player.hp <= 0) {
        this.player.hp = 0;
        this.gameState = 'lost';
      }
      this.updateBattleLog(`MONSTER HITS PLAYER FOR ${amount}`, 'monster');
    },

    reset: function () {
      this.gameState = 'playing';
      this.player.hp = 100;
      this.monster.hp = 100;
      this.battleLog = [];
    }
  }
});
