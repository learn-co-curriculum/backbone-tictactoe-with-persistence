(function() {
	var GameView = app.GameView = Backbone.View.extend({

		events: {
			"click" : "handleClick",
			"click #lastGame" : "showLastGame"
		},

		initialize : function() {
			this.game = new app.Game();
			this.game.on("X", this.drawX, this);
			this.game.on("O", this.drawO, this);
			this.game.on("tie", this.tie, this);
			this.game.on("win", this.win, this);
			this.render();
			this.addIds();
		},

		render : function() {
			var rows = this.createRowArray(3, '<tr>');
			var cells = this.createColumnArray(3, '<td></td>');
			this.$el.append("<table border='1' cellpadding='40'></table>")
			this.$el.find('table').append(rows);
			this.$el.find('tr').append(cells);
			this.$el.append('<button id="lastGame">Show Me Last Games Results!</button>')
			$("#container").append(this.$el)
		},

		addIds : function() {
		  $('td').each(function(i, cell) {
		    $(cell).attr('id', i);
		  })
		},

		createRowArray : function(size, element) {
		  return this.createArray(size, element)
		},

		createColumnArray : function(size, element) {
		  return this.createArray(size, element)
		},

		createArray : function(size, element) {
		  return Array.apply(null, new Array(size)).map(String.prototype.valueOf,element)
		},

		handleClick : function(e) {
			var id = Number($(e.target).attr("id"));
			this.game.doTurn(id);
		},

		drawX : function(id) {
			this.drawMark(id, "X");
		},

		drawMark : function(id, mark) {
			this.$("#" + id).html(mark);
		},
		
		drawO : function(id) {
			this.drawMark(id, "O");
		},

		tie : function() {
			alert("You Tied!");
			this.clearBoard();
		},

		win : function(player) {
			alert("Player " + player + " Won!");
			this.clearBoard();
		},

		clearBoard : function() {
			$("td").html("");
		},
		showLastGame : function() {
			alert(this.game.lastGameString());
		}
	})
})();