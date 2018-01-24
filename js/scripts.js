


var Game = {
  countTurn: 1,
  turnPoints: 0,
  currentPlayer: undefined,
  resetGame: function(){
    this.turnPoints = 0;
    player1.points = 0;
    player2.points = 0;
  },

  getPlayerNames: function(player1Name, player2Name) {
    player1.name = player1Name;
    player2.name = player2Name;
  },

  changeCurrentPlayer: function() {
    if (this.countTurn % 2 === 1) {
      this.currentPlayer = player1;
    } else {
      this.currentPlayer = player2;
    };
    this.countTurn++;
    this.turnPoints = 0;
  },
  checkIfWin: function(){
    if (player1.points >= 100 || player2.points >= 100){
      return true;
    }
  }
};

var player1 = {
  name: '',
  points: 0
};

var player2 = {
  name: '',
  points: 0
};

var Die = {
  value: 0,
  roll: function(){
    this.value = Math.ceil(Math.random() * 6);
    if (this.value === 1){
      this.value = 0;
      Game.changeCurrentPlayer();
      updateGame();
      $("#activePlayer").text(Game.currentPlayer.name + "'s turn!");
    }else{
      Game.turnPoints += this.value;
    };
  },
  hold: function(){
    Game.currentPlayer.points += Game.turnPoints;
  }
};

var updateGame = function(){
  $("#turnTotal").text(Game.turnPoints);
  $("#player1NameDisplay").text(player1.points);
  $("#player2NameDisplay").text(player2.points);
  if (Game.checkIfWin()){
    $("#gameContainer").hide();
    $("#winnerContainer").show();
    $("#winner").text(Game.currentPlayer.name + " wins!");
  };
}
$(document).ready(function() {
  var startGame = function() {
    $("#gameContainer, #activePlayerDisplay, #dieContainerDisplay, #totalPoints, #resetContainer").show();
    $("#nameInputForm").hide();
    $("#startGame").hide();
    $("#winnerContainer").hide();
    $("#player1NameDisplay").text(player1.name);
    $("#player2NameDisplay").text(player2.name);
    Game.changeCurrentPlayer();
    $("#activePlayer").text(Game.currentPlayer.name + "'s turn!");
  };

  $("#nameInputForm").submit(function(event) {
    var player1Name = $("#player1Name").val();
    var player2Name = $("#player2Name").val();
    Game.getPlayerNames(player1Name, player2Name);
    startGame();
    event.preventDefault();
  });

  $("#startGame").click(function() {
    $("#formContainer").show();
    $("#instructionsContainer").hide();
    $(this).hide();
  });

  $("#roll").click(function(){
    Die.roll();
    // Display value and image.
    $("#turnTotal").text(Game.turnPoints);
  });

  $("#hold").click(function(){
    Die.hold();
    updateGame();
    Game.changeCurrentPlayer();
    $("#activePlayer").text(Game.currentPlayer.name + "'s turn!");
    $("#turnTotal").text(Game.turnPoints);
  });

  $("#reset").click(function(){
    if(confirm("Are you sure you want to reset the game?")){
      location.reset();
    };
  });

  $("#playAgain").click(function(){
    startGame();
  });

  $("#showInstructions").click(function(){
    $("#instructionsContainer").toggle();
  });

  $("#hideInstructions").click(function(){
    $("#instructionsContainer").hide();
  });

});
