var fightOrSkip = function() {
  //ASK PLAYER IF THEYD LIKE TO FIGHT OR SKIP USING fightOrSkip FUNCTION
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // conditional recursive FUNCTION CALL
  if (promptFight === "" || promptFight === null) {
    window.alert("you need to provide a valid answer! Please try again.");
  // USE RETURN TO CALL IT AGAIN AND STOP THE REST OF THIS FUNCTION FROM RUNNING
    return fightOrSkip();
  }

  // CONVERT promptFight TO ALL LOWERCASE SO WE CAN CHECK WITH LESS OPTIONS
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    
    // CONFIRM PLAYER WANTS TO SKIP
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // IF YES (TRUE), THEN LEAVE FIGHT
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");

    // SUBTRACT MONEY FROM playerMoney FOR SKIPPING, BUT DONT LET THEM GO INTO THE NEGATIVE
    playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);

    //RETURN TRUE IF PLAYER WANTS TO LEAVE
    return true;
    }
  }
  return false;

};

var fight = function(enemy) {
    // repeat and execute as long as the enemy-robot is alive 
while (playerInfo.health > 0 && enemy.health > 0) {
  
  // ASK PLAYER IF THEYD LIKE TO FIGHT OR SKIP USING fightOrSkip FUNCTION
  if (fightOrSkip()) {
    // IF TRUE, LEAVE FIGHT BY BREAKING LOOP
    break;
  }
  var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // CHECK PLAYERS HEALTH
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
       
        // LEAVE WHILE() LOOP IF PLAYER IS DEAD
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
  };

  // FUNCTION TO START A NEW GAME
var startGame = function() {
    // RESET PLAYER STATS
    playerInfo.reset();
    
    for (var i = 0; i < enemyInfo.length; i++) {
      if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
        var pickedEnemyObj = enemyInfo[i];
  
        pickedEnemyObj.health = randomNumber(40, 60);
  
        fight(pickedEnemyObj);

        // IF PLAYER IS STILL ALIVE AND WE'RE NOT AT THE LAST ENEMY IN THE ARRAY
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

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

    // CHECK localStorage FOR HIGH SCORE, IF IT'S NOT THERE USE 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
      highScore = 0;
    }

    // IF PLAYER HAS MORE MONEY THEN THE highScore, PLAYER HAS A NEW HIGHSCORE!
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);

      alert(playerInfo.name + " now has highscore of " + playerInfo.money + "!");
    }
    else {
      alert(playerInfo.name + " did not beat the highscore of " + highScore + " .Maybe next time!");
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
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
          playerInfo.refillHealth();
          break;

        case 2:
          playerInfo.upgradeAttack();
          break;
        
          case 3:
          window.alert("Leaving the store.");
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
          shop();
          break;
      }
  };

  // FUNCTION TO GENERATE A RANDOM NUMERIC VALUE
  var randomNumber = function(min, max) {
      var value = Math.floor(Math.random() * (max - min + 1) + min);

      return value;
  };

  var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// FUNCTION TO SET NAME
var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// START GAME WHEN PAGE LOADS
startGame();