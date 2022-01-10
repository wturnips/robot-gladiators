var playerName = window.prompt("What is your robots name?");
var playerHealth = 65;
var playerAttack = 15;
var playerMoney = 20;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 15;

var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = playerMoney - 10;
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      // CHECK PLAYERS HEALTH
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
       
        // LEAVE WHILE() LOOP IF PLAYER IS DEAD
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
    }
  };

  // FUNCTION TO START A NEW GAME
var startGame = function() {
    
    // RESET PLAYER STATS
    playerHealth = 65;
    playerAttack = 15;
    playerMoney = 10;
    
    for (var i = 0; i < enemyNames.length; i++) {
      if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
        var pickedEnemyName = enemyNames[i];
  
        enemyHealth = 50;
  
        fight(pickedEnemyName);

        // IF PLAYER IS STILL ALIVE AND WE'RE NOT AT THE LAST ENEMY IN THE ARRAY
        if (playerHealth > 0 && i < enemyNames.length - 1) {

            // ASK IF PLAYER WANTS TO USE STORE BEFORE NEXT ROUND
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            // IF YES, TAKE PLAYER TO store() FUNCTION
            if (storeConfirm);
            shop();
        }
      }
      else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
    }
     // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

// FUNCTION TO END THE ENTIRE GAME
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    
    // IF PLAYER IS STILL ALIVE, PLAYER WINS!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

  // ASK PLAYER IF THEYD LIKE TO PLAY AGAIN
var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
    // RESTART THE GAME
    startGame();
  } 
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
  };

  // SHOP FUNCTION
  var shop = function() {

    // ASK PLAYER WHAT THEYD LIKE TO DO
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // USE SWITCH TO CARRY OUT ACTION
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
          if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
      
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
          }
          else {
            window.alert("You don't have enough money!");
          }
      
          break;
        case "UPGRADE": // new case
        case "upgrade":
          if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
      
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
          }
          else {
            window.alert("You don't have enough money!");
          }
      
          break;
        case "LEAVE": // new case
        case "leave":
          window.alert("Leaving the store.");
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
          shop();
          break;
      }
  };

// START GAME WHEN PAGE LOADS
startGame();