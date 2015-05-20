'use strict';

describe('board', function() {
  describe( "#initialize", function() {
    it("should set the game property of the view to be an instance of the game model", function() {
      var gameView = new app.GameView();
      expect(gameView.game).not.toBeUndefined();
    });     
  });

  describe("#wire up event listeners", function() {
    describe( "#initialize", function() {
      it("should wire up the X event listeners on the model", function() {
        var spy = spyOn(app.GameView.prototype, "drawX");
        var gameView = new app.GameView;
        gameView.game.trigger("X");
        expect(spy).toHaveBeenCalled();
      });
      it("should wire up the O event listeners on the model", function() {
        var spy = spyOn(app.GameView.prototype, "drawO");
        var gameView = new app.GameView;
        gameView.game.trigger("O");
        expect(spy).toHaveBeenCalled();
      });
      it("should wire up the tie event listeners on the model", function() {
        var spy = spyOn(app.GameView.prototype, "tie");
        var gameView = new app.GameView;
        gameView.game.trigger("tie");
        expect(spy).toHaveBeenCalled();
      });
      it("should wire up the win event listeners on the model", function() {
        var spy = spyOn(app.GameView.prototype, "win")
        var gameView = new app.GameView;
        gameView.game.trigger("win");
        expect(spy).toHaveBeenCalled();
      });     
    });
  })

  describe("#last parts of initialization", function() {
    var gameView;
    beforeEach(function() {
      gameView = new app.GameView;
    });
    describe( "#initialize", function() {
      it("should call render", function() {
        spyOn(gameView, "render");
        gameView.initialize();
        expect(gameView.render).toHaveBeenCalled();
      });     
    });
  })

  describe("test rendering, adding ids and handling clicks", function() {
    var gameView;
    beforeEach(function() {
      setFixtures('<div id="container"></div>'); 
      gameView = new app.GameView;
    });
    describe( "#render", function() {
      it("should create a board in HTML when its initialized with one button and a div with the id 'lastGameBox'", function() {
        expect($("#container")).toContainHtml('<div id="message"></div><table border="1" cellpadding="40"><tbody><tr><td id="0"></td><td id="1"></td><td id="2"></td></tr><tr><td id="3"></td><td id="4"></td><td id="5"></td></tr><tr><td id="6"></td><td id="7"></td><td id="8"></td></tr></tbody></table><button id="lastGame">Show Me Last Games Results!</button><div id="lastGameBox"></div></body>');
      });     
    });

    describe( "#drawO", function() {
      it("should draw an O on the clicked element", function() {
        gameView.drawO(3)
        expect($("#3").text()).toEqual("O")
      });     
    });

    describe( "#drawX", function() {
      it("should draw an X on the clicked element", function() {
        gameView.drawX(3)
        expect($("#3").text()).toEqual("X")
      });     
    });
  })

  describe( "#handleClick", function() {
    it("should tell the game what element was clicked", function() {
      setFixtures('<div id="container"></div>'); 
      var spy = spyOn(app.Game.prototype, "doTurn");
      var gameView = new app.GameView;
      $("#3").click();
      expect(spy).toHaveBeenCalledWith(3)    
    });

    it("the game's board matches the table", function() {
      setFixtures('<div id="container"></div>'); 
      var gameView = new app.GameView;
      $("#0").click();
      $("#1").click();
      $("#4").click();
      $("#8").click();
      $("#2").click();
      $("#6").click();
      $("#7").click();
      $("#3").click();
      var tempBoard = gameView.game.get("board");
      [0,4,2,7].forEach(function(space) {
        expect(tempBoard[space]).toEqual("X");
        expect($("#" + space).text()).toEqual("X");
      });
      [1,8,6,3].forEach(function(space) {
        expect(tempBoard[space]).toEqual("O");
        expect($("#" + space).text()).toEqual("O");
      });
    });
  });

  describe( "#win", function() {
    it("gets called when there is a winner", function() {
      setFixtures('<div id="container"></div>');
      var spy = spyOn(app.GameView.prototype, "win");
      var gameView = new app.GameView;
      $("#0").click();
      $("#3").click();
      $("#1").click();
      $("#4").click();
      $("#2").click();
      expect(spy).toHaveBeenCalled()    
    });
    it("displays a message about Player X in the message div on horizontal win", function() {
      setFixtures('<div id="container"></div>');
      var gameView = new app.GameView;
      $("#0").click();
      $("#3").click();
      $("#1").click();
      $("#4").click();
      $("#2").click();
      expect($("#message").text()).toEqual("Player X Wins!");  
    });
    it("displays a message about Player O in the message div on diagonal win", function() {
      setFixtures('<div id="container"></div>');
      var gameView = new app.GameView;
      $("#3").click();
      $("#0").click();
      $("#1").click();
      $("#4").click();
      $("#2").click();
      $("#8").click();
      expect($("#message").text()).toEqual("Player O Wins!");  
    });
    it("clears the table after a person wins, resets turns to 0, clears the board", function() {
      setFixtures('<div id="container"></div>');
      var gameView = new app.GameView;
      $("#3").click();
      $("#0").click();
      $("#1").click();
      $("#4").click();
      $("#2").click();
      $("#8").click();
      expect($("#message").text()).toEqual("Player O Wins!");
      for(var i=0;i<9;i++){
        expect($("#" + i).text()).toEqual("");
      }
      var tempBoard = gameView.game.get("board");
      tempBoard.forEach(function(square) {
        expect(square).toEqual(null);
      });
      expect(gameView.game.get("turns")).toEqual(0);
    });
  });
  describe( "#tie", function() {
   it("displays a message the tie in the message div", function() {
      setFixtures('<div id="container"></div>');
      var gameView = new app.GameView;
      $("#0").click();
      $("#1").click();
      $("#4").click();
      $("#8").click();
      $("#2").click();
      $("#6").click();
      $("#7").click();
      $("#3").click();
      $("#5").click();
      expect($("#message").text()).toEqual("Tie game");  
    });
    it("clears the table after a person wins, resets turns to 0, clears the board", function() {
      setFixtures('<div id="container"></div>');
      var gameView = new app.GameView;
      $("#0").click();
      $("#1").click();
      $("#4").click();
      $("#8").click();
      $("#2").click();
      $("#6").click();
      $("#7").click();
      $("#3").click();
      $("#5").click();
      expect($("#message").text()).toEqual("Tie game");
      for(var i=0;i<9;i++){
        expect($("#" + i).text()).toEqual("");
      }
      var tempBoard = gameView.game.get("board");
      tempBoard.forEach(function(square) {
        expect(square).toEqual(null);
      });
      expect(gameView.game.get("turns")).toEqual(0);
    });
  });

  describe( "#showLastGame", function() {
    it("displays results of the last game if last game X won diagonally", function() {
      setFixtures('<body><div id="container"></div></body>');
      var gameView = new app.GameView;
      gameView.game.doTurn(0);
      gameView.game.doTurn(1);
      gameView.game.doTurn(4);
      gameView.game.doTurn(2);
      // _X_|_O_|_O_
      // ___|_X_|___
      //    |   |   
      gameView.game.doTurn(8);
      // _X_|_O_|_O_
      // ___|_X_|___
      //    |   | X 
      expect($("#message").html()).toEqual("Player X Wins!");
      // ___|___|___
      // ___|___|___
      //    |   |  
      $("td").each(function() {
        expect($(this).html()).toEqual("");
      });
      gameView.game.doTurn(8);
      gameView.game.doTurn(0);
      gameView.game.doTurn(6);
      gameView.game.doTurn(7);
      // _O_|___|___
      // ___|___|___
      //  X | O | X
      $("#lastGame").click();
      // X O O
      // - X -
      // - - X
      expect($("#lastGameBox").html()).toEqual("XOO<br>-X-<br>--X");
    });
    it("displays results of the last game if last game was a tie", function() {
      setFixtures('<body><div id="container"></div></body>');
      var gameView = new app.GameView;
      gameView.game.doTurn(0);
      gameView.game.doTurn(1);
      gameView.game.doTurn(2);
      gameView.game.doTurn(3);
      gameView.game.doTurn(5);
      gameView.game.doTurn(4);
      gameView.game.doTurn(6);
      gameView.game.doTurn(8);
      gameView.game.doTurn(7);
      // _X_|_O_|_X_
      // _O_|_O_|_X_
      //  X | X | O
      expect($("#message").html()).toEqual("Tie game");
      // __|__|__
      // __|__|__
      //   |  | 
      $("td").each(function() {
        expect($(this).html()).toEqual("");
      });
      // ___|___|___
      // ___|___|___
      //    | X | O
      gameView.game.doTurn(7);
      gameView.game.doTurn(8);
      expect($("#7").html()).toEqual("X");
      expect($("#8").html()).toEqual("O");

      // Show Me Last Games Results! (gets clicked)
      $("#lastGame").click();

      // X O X
      // O O X
      // X X O
      expect($("#lastGameBox").html()).toEqual("XOX<br>OOX<br>XXO");
    });
  });
});
