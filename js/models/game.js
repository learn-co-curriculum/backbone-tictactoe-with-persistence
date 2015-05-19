(function() {
  app = {};
  app.Game = Backbone.Model.extend({
    defaults: function (){ return {
      turn: 0,
      board: [
        null, null, null,
        null, null, null, 
        null, null, null
      ],
      winningCombos: [
        [0,3,6],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,5,8], 
        [0,4,8],
        [2,4,6]
      ],
      wayGameEnded: null,
      pastBoard: null
    }},
    updateState: function(id) {
      var tempBoard = this.get("board");
      tempBoard[id] = this.player();
      this.set("board", tempBoard);
      this.trigger(this.player(), id);
    },
    tie: function() {
      var spotsFilled = 0;
      this.get("board").forEach(function(element) {
        if (element) spotsFilled += 1;
      });
      return spotsFilled >= 9;
    },
    gameOver: function() {
      if (this.winnerCheck()) {
        this.set("wayGameEnded", "win");
        return true;  
      } else if (this.tie()) {
        this.set("wayGameEnded", "tie");
        return true;
      } else {
        return false;
      }
    },
    formatPastGame: function() {
      var past = this.get("pastBoard");
      var temp = [];
      past.forEach(function(element, i) {
        if (typeof element == "string") {
          temp.push(element);
        } else {
          temp.push("-");
        }
        if (i == 2 || i == 5) temp.push("<br>");
      });
      return temp;
    },
    player: function() {
      return this.get("turn") % 2 == 0 ? "X": "O"
    },
    playerLocations: function() {
      var locations = [];
      var playerz = this.player();
      var tempBoard = this.get("board");
      tempBoard.forEach(function(piece, i) {
        if (piece == playerz) locations.push(i);
      });
      return locations;
    },
    winnerCheck: function() {
      var locations = this.playerLocations();
      var winner = false;
      this.get("winningCombos").forEach(function(combo) {
        var wonThis = true;
        combo.forEach(function(id) {
          if ($.inArray(id, locations) < 0) wonThis = false;
        });
        if (wonThis) winner = true;
      });
      return winner;
    },
    incrementTurn: function() {
      var tempTurn = this.get("turn");
      this.set("turn", tempTurn + 1);
      return this.get("turn");
    },
    doTurn: function(id) {
      this.updateState(id);
      if (this.gameOver()) {
        var tieOrWin = this.get("wayGameEnded");
        this.trigger(tieOrWin, this.player());
      } else {
        this.incrementTurn();
      }
    } 
  })
})();