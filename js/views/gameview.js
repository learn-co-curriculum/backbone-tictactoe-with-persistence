(function() {
  app.GameView = Backbone.View.extend({
    events: {
      "click": "handleClick"
    },
    initialize: function() {
      this.game = new app.Game();
      this.game.on("X", this.drawX, this);
      this.game.on("O", this.drawO, this);
      this.game.on("tie", this.tie, this);
      this.game.on("win", this.win, this);
      this.render();
    },
    render: function() {
      var html = '<div id="message"></div><table border="1" cellpadding="40"><tbody><tr><td id="0"></td><td id="1"></td><td id="2"></td></tr><tr><td id="3"></td><td id="4"></td><td id="5"></td></tr><tr><td id="6"></td><td id="7"></td><td id="8"></td></tr></tbody></table><button id="lastGame">Show Me Last Games Results!</button><div id="lastGameBox"></div></body>';
      this.$el.append(html);
      $("#container").append(this.$el);
    },
    handleClick: function(e) {
      var idString = e.target.id;
      if (idString == "lastGame") {
        this.drawLastGame()
      } else {
        var id = Number(idString);
        this.game.doTurn(id);
      }
    },
    drawLastGame: function() {
      var html = this.game.formatPastGame();
      this.$("#lastGameBox").html(html);
    },
    drawX: function(id) {
      this.drawMark(id, "X");
    },
    drawO: function(id) {
      this.drawMark(id, "O");
    },
    drawMark: function(id, mark) {
      this.$("#" + id).html(mark);
    },
    message: function(message) {
      this.$("#message").html(message)
    },
    tie: function() {
      this.message("Tie game");
      this.clearBoard();
    },
    win: function() {
      this.message("Player " + this.game.player() + " Wins!");
      this.clearBoard();
    },
    clearBoard: function() {
      this.$("td").html("");
      var tempBoard = this.game.get("board");
      this.game.set("pastBoard", tempBoard);
      this.game.set("board", [null, null, null, null, null, null, null, null, null]);
      this.game.set("turns", 0);
    }
  })
})();