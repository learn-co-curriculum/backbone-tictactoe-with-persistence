'use strict';

describe('game', function() {
  var game;
  beforeEach(function() {
    game = new app.Game();
  });

  describe("default attributes", function() {
    it("sets an attribute, board, to an array of 9 elements", function() {
      expect(game.get("board").length).toEqual(9);
    });
  });

  describe("#player", function() {
    it("returns X if turn is even, O if turn is odd", function() {
      expect(game.player()).toEqual("X");
      game.set("turn", 1);
      expect(game.player()).toEqual("O");
      game.set("turn", 2);
      expect(game.player()).toEqual("X");
    });
  });

  describe( "#updateState", function() {
    it("adds the mark of the player that moved into the correct index in the array", function() {
      game.updateState(0);
      expect(game.get("board")[0]).toEqual("X");
    });
  });

  describe( "#doTurn Part 1", function() {
    it("calls on `updateState()` to update the board", function() {
      game.doTurn(0);
      expect(game.get("board")[0]).toEqual("X");
    });
    it("double-checking that `updateState()` was called", function() {
      spyOn(game, "updateState");
      game.doTurn(1);
      expect(game.updateState).toHaveBeenCalledWith(1);
    });
    it("calls on `gameOver()`", function() {
      spyOn(game, "gameOver");
      game.doTurn(3);
      expect(game.gameOver).toHaveBeenCalled();
    });
    it("the *final* thing it does is to increment turn by one", function() {
      var turnCount = game.get("turn");
      game.doTurn(8);
      expect(game.get("turn")).toEqual(turnCount + 1);
      game.doTurn(7);
      game.doTurn(6);
      expect(game.get("turn")).toEqual(turnCount + 3);
    });
  });

  describe( "#winnerCheck", function() {
    it("returns winning combo on the board for the current player (vertical)", function() {
      game.updateState(0);
      expect(game.winnerCheck()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      
      game.updateState(1);
      expect(game.winnerCheck()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      
      game.updateState(3);
      expect(game.winnerCheck()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      
      game.updateState(8);
      expect(game.winnerCheck()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      
      game.updateState(6);
      expect(game.winnerCheck()).toBe(true);
      //  _O_|_X_|_2_
      //  _O_|_4_|_5_
      //   O | 7 | X 
    });
  });

  describe( "#gameOver", function() {
    it("calls on `winnerCheck()` to see if there's a winner", function() {
      spyOn(game, "winnerCheck");
      game.updateState(0);
      game.set("turn", game.get("turn") + 1);
      game.updateState(1);
      game.set("turn", game.get("turn") + 1);
      game.updateState(3);
      game.set("turn", game.get("turn") + 1);
      game.updateState(8);
      game.set("turn", game.get("turn") + 1);
      game.updateState(6);
      game.gameOver();
      expect(game.winnerCheck).toHaveBeenCalled();
    });
    it("returns true if there is a winning combo on the board or a tie, else false", function() {
      game.updateState(0);
      expect(game.gameOver()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      
      game.updateState(1);
      expect(game.gameOver()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      
      game.updateState(3);
      expect(game.gameOver()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      
      game.updateState(8);
      expect(game.gameOver()).toBe(false);
      game.set("turn", game.get("turn") + 1);
      //  _X_|_O_|_2_
      //  _X_|_4_|_5_
      //   6 | 7 | O
      
      game.updateState(6);
      expect(game.gameOver()).toBe(true);
      //  _X_|_O_|_2_
      //  _X_|_4_|_5_
      //   X | 7 | O 
    });
    it("calls on `tie()` to return true if there's a tie", function() {
      game.updateState(0);
      game.set("turn", game.get("turn") + 1);
      game.updateState(1);
      game.set("turn", game.get("turn") + 1);
      game.updateState(3);
      game.set("turn", game.get("turn") + 1);
      game.updateState(8);
      game.set("turn", game.get("turn") + 1);
      game.updateState(2);
      game.set("turn", game.get("turn") + 1);
      game.updateState(6);
      game.set("turn", game.get("turn") + 1);
      game.updateState(7);
      game.set("turn", game.get("turn") + 1);
      game.updateState(4);
      game.set("turn", game.get("turn") + 1);
      game.updateState(5);
      game.set("turn", game.get("turn") + 1);
      expect(game.gameOver()).toBe(true);
      //  _X_|_O_|_X_
      //  _X_|_O_|_X_
      //   O | X | O  
    });
    it("double-checking that it calls on `tie()`", function() {
      spyOn(game, "tie");
      
      game.updateState(0);
      game.set("turn", game.get("turn") + 1);
      game.updateState(1);
      game.set("turn", game.get("turn") + 1);
      game.updateState(3);
      game.set("turn", game.get("turn") + 1);
      game.updateState(8);
      game.set("turn", game.get("turn") + 1);
      game.updateState(2);
      game.set("turn", game.get("turn") + 1);
      game.updateState(6);
      game.set("turn", game.get("turn") + 1);
      game.updateState(7);
      game.set("turn", game.get("turn") + 1);
      game.updateState(4);
      game.set("turn", game.get("turn") + 1);
      game.updateState(5);

      game.gameOver();
      expect(game.tie).toHaveBeenCalled();
    });
  });

  describe("#doTurn Part 2", function() {
    it("when doTurn is passed a number between 0-8, trigger is called and passed the player and the number", function() {
      spyOn(game, "trigger");
      game.doTurn(0);
      expect(game.trigger).toHaveBeenCalledWith("X", 0);
      game.doTurn(3);
      expect(game.trigger).toHaveBeenCalledWith("O", 3);
    });
    it("when player X wins horizontally, trigger is called on the game and passed two params: 'win' and 'X'", function() {
      spyOn(game, "trigger");
      game.doTurn(0);
      game.doTurn(4);
      game.doTurn(1);
      game.doTurn(3);
      game.doTurn(2);
      expect(game.trigger).toHaveBeenCalledWith("win", "X");
    });
    it("when player X wins vertically, trigger is called on the game and passed two params: 'win' and 'X'", function() {
      spyOn(game, "trigger");
      game.doTurn(0);
      game.doTurn(1);
      game.doTurn(2);
      game.doTurn(3);
      game.doTurn(4);
      game.doTurn(5);
      game.doTurn(6);
      expect(game.trigger).toHaveBeenCalledWith("win", "X");
    });
    it("when player X wins diagonally, trigger is called on the game and passed two params: 'win' and 'X'", function() {
      spyOn(game, "trigger");
      game.doTurn(0);
      game.doTurn(1);
      game.doTurn(4);
      game.doTurn(2);
      game.doTurn(8);
      expect(game.trigger).toHaveBeenCalledWith("win", "X");
    });
    it("when player O wins horizontally, trigger is called on the game and passed two params: 'win' and 'O'", function() {
      spyOn(game, "trigger");
      game.doTurn(6);
      game.doTurn(3);
      game.doTurn(8);
      game.doTurn(4);
      game.doTurn(2);
      game.doTurn(5);
      expect(game.trigger).toHaveBeenCalledWith("win", "O");
    });
    it("when player O wins vertically, trigger is called on the game and passed two params: 'win' and 'O'", function() {
      spyOn(game, "trigger");
      game.doTurn(0);
      game.doTurn(2);
      game.doTurn(4);
      game.doTurn(5);
      game.doTurn(1);
      game.doTurn(8);
      expect(game.trigger).toHaveBeenCalledWith("win", "O");
    });
    it("when player O wins diagonally, trigger is called on the game and passed two params: 'win' and 'O'", function() {
      spyOn(game, "trigger");
      game.doTurn(3);
      game.doTurn(2);
      game.doTurn(0);
      game.doTurn(4);
      game.doTurn(7);
      game.doTurn(6);
      expect(game.trigger).toHaveBeenCalledWith("win", "O");
    });
    it("when the board is full but there are no winners, trigger is called on the game and passed two params: 'tie' and 'X'", function() {
      spyOn(game, "trigger");
      game.doTurn(0);
      game.doTurn(1);
      game.doTurn(4);
      game.doTurn(8);
      game.doTurn(2);
      game.doTurn(6);
      game.doTurn(7);
      game.doTurn(3);
      // _X_|_O_|_X_
      // _O_|_X_|_5_
      //  O | X | O
      var tempBoard = game.get("board");
      [0,4,2,7].forEach(function(space) {
        expect(tempBoard[space]).toEqual("X");
      });
      [1,8,6,3].forEach(function(space) {
        expect(tempBoard[space]).toEqual("O");
      });
      game.doTurn(5);
      expect(game.trigger).toHaveBeenCalledWith("tie", "X");
    });
  });
});