new Vue({
  el: '#app',
  data: {
    player: { maxHp: 100, hp: 100 },
    monster: { maxHp: 100, hp: 100 },
    gameIsRunning: false,
    turns: [],
    disableOptions: false
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.player.hp = this.player.maxHp;
      this.monster.hp = this.monster.maxHp;
      this.turns = [];
    },
    playerAct: function (action) {
      // PLAYER'S TURN
      if (action === 'attack') this.attack(1, 10);
      else if (action === 'specialAttack') this.attack(10, 20);
      else if (action === 'heal') this.heal(5, 15);

      var vm = this;
      // CHECK WIN STATE
      if (this.monster.hp <= 0) {
        setTimeout(function () {
          vm.gameIsRunning = false;
          alert('You won!');
        }, 500);
      } else {
        this.disableOptions = true;
        // MONSTER'S TURN
        setTimeout(function () {
          vm.monsterAttack(5, 15);
          vm.disableOptions = false;
          // CHECK LOST STATE
          if (vm.player.hp <= 0) {
            setTimeout(function () {
              vm.gameIsRunning = false;
              alert('You lost :(');
            }, 500);
          }
        }, 500);
      }
    },
    attack: function (min, max) {
      var damage = this.getRndInteger(min, max);
      this.monster.hp -= damage;
      if (this.monster.hp < 0) this.monster.hp = 0;
      this.addTurn(true, 'PLAYER HITS MONSTER FOR ' + damage);
    },
    monsterAttack: function (min, max) {
      var damage = this.getRndInteger(min, max);
      this.player.hp -= damage;
      if (this.player.hp <= 0) this.player.hp = 0;
      this.addTurn(false, 'MONSTER HITS PLAYER FOR ' + damage);
    },
    heal: function (min, max) {
      if (this.player.hp < this.player.maxHp) {
        var amount = this.getRndInteger(min, max);
        this.player.hp += amount;
        if (this.player.hp > this.player.maxHp) this.player.hp = this.player.maxHp;
        this.addTurn(true, 'PLAYER HEALS FOR ' + amount);
      } else {
        this.addTurn(true, 'PLAYER HEALS FOR 0');
      }
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    addTurn: function (isPlayer, text) {
      this.turns.unshift({ isPlayer, text });
    },
    /**
     * Returns a random number between min and max (both included).
     * @param {Number} min
     * @param {Number} max
     */
    getRndInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
});
