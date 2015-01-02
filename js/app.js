// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (start == 'yes') {
        this.sprite = 'images/enemy-bug.png';
    }
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

       return y_position;
    }

    //top    = 50
    //middle = 140
    //bottom = 230
    this.speed = (Math.floor((Math.random() + 1) * 51));
    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    //checkCollisions();
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.sprite) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 900;
    this.y = 400;
    
}

Player.prototype.update = function(dt) {
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var start = 'no';

var  follow = false;

Player.prototype.handleInput = function(keyCode) {

    if (keyCode == 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    else if (keyCode == 'up' && this.y > 30) {
        this.y = this.y - 83;
    }
    else if (keyCode == 'right' && this.x < 556) {
        this.x = this.x + 100;
    }
    else if (keyCode == 'down' && this.y < 355) {
        this.y = this.y + 83;
    }
    else if (keyCode == 'enter' && start == 'no') {
        this.x = this.x - 700;
        start = 'yes';
    }
}

Player.prototype.follow = function() {
    prize.x = this.x;
    prize.y = this.y;
}
var Prize = function () {
    this.sprite = 'images/Gem Blue.png';
    this.x = 530;
    this.y = 30;
}

Prize.prototype.update = function() {
    //Check if player has gotton to the gem. If so, gem follows player.
    if (follow == true) {
        player.follow();
    }
    //check for player win
    if (this.y > 300) {
        //allEnemies = [];
        ctx.font = 'bold 50px Trebuchet MS, sans-serif';
        ctx.fillStyle = '#FFD700';
        ctx.fillText('You Win!', 707/2, 303);
        ctx.font = 'bold 50px Trebuchet MS, sans-serif';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeText('You Win!', 707/2, 303);
    }
}

Prize.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50.5, 85.5);
}

// Now instantiate your objects.
var player = new Player();

var prize = new Prize();

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//generate enemies
generate = function() {
    for (var i = 0; i < 2; i++) {
        e = new Enemy;
        e.push;
        allEnemies.push(e);
    }
}

//figure out which block entity is in
function which_block(x, y) {
    var row;
    var col;
    if (x < 0) {
        row = -1;
        col = -1;
    } else {
        for (var i=0; i<8; i++) {

            if (y < i*83 -60) {break};
                row = i;
        }

        for (var i=0; i<8; i++) {
            if (x + 60 < i*100) {break};
                col = i;
        }  
    }
    return [row, col];
}

//https://piazza.com/class/i23vpy8h7l27la?cid=343
function checkCollisions() {
    //Check if player occupies the same tile as an enemy
    for (var i = 0; i < allEnemies.length; i++) {
        if (String(which_block(allEnemies[i].x, allEnemies[i].y)) === String(which_block(player.x, player.y))) {
            //reset player and enemies
            allEnemies = [];
            generate();
            player.x = 200;
            player.y = 400;
        }
    }
    if (player.x == 500 && player.y == -15) {
        follow = true;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function title() {
    ctx.textAlign = "center";
    ctx.textBaseline = "Middle";
    ctx.font = 'bold 50px Trebuchet MS, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText('Press ENTER to start', 707/2, 303);
    ctx.font = 'bold 50px Trebuchet MS, sans-serif';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeText('Press ENTER to start', 707/2, 303);
}