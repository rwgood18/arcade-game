// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = (-300 + Math.random() * 101);
    var y_position;
    hash();
    this.y = y_position;
    function hash() {
       number = Math.floor(Math.random() * 101) * 4;
       if (number < 100) {
        y_position = 50;
       } else if (number > 100 && number < 300) {
        y_position = 140;
       } else if (number > 200) {
        y_position = 230;
       }
       console.log(number);
       return y_position;
    }

    //top    = 50
    //middle = 140
    //bottom = 230
    this.speed = (Math.floor((Math.random() + 1) * 41) * 3);//(function get_speed() {
                 //   number = Math.floor(Math.random()*101);
                 //   if (number < 50) {
                 //       get_speed();
                 //   } else {
                 //       return number;
                 //   }
                 //})();

    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;

    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 140;
    
}

Player.prototype.update = function(dt) {
    //this.pos * dt;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {

    if (keyCode == 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    else if (keyCode == 'up' && this.y > 90) {
        this.y = this.y - 100;
    }
    else if (keyCode == 'right' && this.x < 556) {
        this.x = this.x + 100;
    }
    else if (keyCode == 'down' && this.y < 305) {
        this.y = this.y + 100;
    }
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

generate = function() {
    for (var i = 0; i < 2; i++) {
        e = new Enemy;
        e.push;
        allEnemies.push(e);
    }
}


    



var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//console.log(allEnemies);