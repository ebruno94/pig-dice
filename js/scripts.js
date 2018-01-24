


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

var defaultDisplay = function() {
  $("#formContainer, #activePlayerDisplay, #dieContainerDisplay, #totalPoints, #instructionsContainer, #resetContainer, #winnerContainer").addClass("hidden");
  $("#player2TurnTotal").addClass("opaqueHidden");
};

var updateGame = function(){
  $(".turnTotal").text(Game.turnPoints);
  $("#player1NameDisplay").text(player1.points);
  $("#player2NameDisplay").text(player2.points);
  $(".playerTurnTotal").toggleClass("opaqueHidden");
  if (Game.checkIfWin()){
    $("#gameContainer").addClass("hidden");
    $("#winnerContainer").removeClass("hidden");
    $("#winner").text(Game.currentPlayer.name + " wins!");
  };
}

var startGame = function() {
  $("#gameContainer, #activePlayerDisplay, #dieContainerDisplay, #totalPoints, #resetContainer").removeClass("hidden");
  $("#nameInputForm").addClass("hidden");
  $("#startGame").addClass("hidden");
  $("#winnerContainer").addClass("hidden");
  $("#player1NameDisplay").text(player1.name);
  $("#player2NameDisplay").text(player2.name);
  Game.changeCurrentPlayer();
  $("#activePlayer").text(Game.currentPlayer.name + "'s turn!");
};

$(document).ready(function() {

  defaultDisplay();

  $("#nameInputForm").submit(function(event) {
    var player1Name = $("#player1Name").val();
    var player2Name = $("#player2Name").val();
    Game.getPlayerNames(player1Name, player2Name);
    startGame();
    event.preventDefault();
  });

  $("#startGame").click(function() {
    $("#formContainer").removeClass("hidden");
    $("#instructionsContainer").addClass("hidden");
    $(this).addClass("hidden");
  });

  $("#roll").click(function(){
    Die.roll();
    // Display value and image.
    $(".turnTotal").text(Game.turnPoints);
  });

  $("#hold").click(function(){
    Die.hold();
    updateGame();
    Game.changeCurrentPlayer();
    $("#activePlayer").text(Game.currentPlayer.name + "'s turn!");
    $(".turnTotal").text(Game.turnPoints);

  });

  $(".reset").click(function(){
    if(confirm("Are you sure you want to reset the game?")){
      location.reload();
    };
  });

  $("#playAgain").click(function(){
    startGame();
  });

  $("#showInstructions").click(function(){
    $("#instructionsContainer").toggle();
  });

  $("#hideInstructions").click(function(){
    $("#instructionsContainer").addClass("hidden");
  });

});
