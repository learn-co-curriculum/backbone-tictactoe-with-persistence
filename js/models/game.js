(function() {
	app = {};
	app.Game = Backbone.Model.extend({
		defaults : {
			turn : 0,
			board : [null, null, null,
							null, null, null, 
							null, null, null],
			winningCombos : [[0,1,2], [3,4,5], [6,7,8],
								 [0,3,6], [1,4,7], [2,5,8], 
								 [0,4,8], [2,4,6]]
		},

		hasMark: function(id){
			if (this.get("board")[id]){
				return true;
			}
		},

		updateState : function() {
			if (this.hasMark(id)){
				return false;
			} else {
				var board = this.get("board")
				board[id] = this.player();
				this.set("board", board);
				this.trigger(this.player(), id);
			}
			return true;
		},


		tie : function() {
			for (var i = 0; i < this.get("board").length; i++) {
				if (!this.hasMark(i)) {
					return false;
				}
			}
			return true;
		},

		checkFor3: function(combo) {
			for(var i = 0; i < combo.length; i++) {
				if (this.get("board")[combo[i]] != this.player()) {
					return false;
				}
			}
			return true;
		},

		gameOver : function() {
			if (this.winnerCheck()) {
				this.set("endStatus", "win");
				return true;
			} else if (this.tie()) {
				this.set("endStatus", "tie");
				return true;
			} else {
				return false;
			}
		},

		player : function() {
			for(var i = 0; i < this.get("winningCombos").length; i++) {
				if (this.checkFor3(this.get("winningCombos")[i]) == true) {
					return true;
				}
			}
			return false;
		},

		addTurn: function(){
			var turn = this.get("turn");
			this.set("turn", turn + 1);
		},

		doTurn : function() {
			// Add mark to virtual board
			if (this.updateState(id)){
				
				// Check for winner
				if (this.gameOver()) {
					// Alert for winner (view)
					this.trigger(this.get("endStatus"), this.player());
				}

				// Increment turn
				this.addTurn();
			}
		}	


	})
})();