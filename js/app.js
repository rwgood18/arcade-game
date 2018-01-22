// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    if (start === true) {
        this.sprite = 'images/enemy-bug.png';
    }
    this.x = (-300 + Math.random() * 101);
    var y_position;
    hash();
    this.y = y_position;
    //generate random number which hashes to one of three
    //possible enemy start positions
    //top    = 50
    //middle = 140
    //bottom = 230
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
    this.speed = (Math.floor((Math.random() + 1) * 351));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.sprite) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 900;
    this.y = 400;
};

Player.prototype.update = function(dt) {
  // player update code coudl go here  
};

Player.prototype.render = function() {
    //draw player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    //dictate player movement based on keyboard input
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
    else if (keyCode == 'enter' && start === false) {
        this.x = this.x - 700;
        start = true;
    }
};

//make the gem follows the player once he gets it
Player.prototype.follow = function() {
    prize.x = this.x;
    prize.y = this.y;
};


var Prize = function () {
    this.sprite = 'images/Gem Blue.png';
    this.x = 530;
    this.y = 30;
};

Prize.prototype.update = function() {
    //check if player has gotton to the gem
    if (follow === true) {
        //gem follows player
        player.follow();
    }
};

Prize.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50.5, 85.5);
    //check for player win
    if (this.y > 300) {
        follow = false;
        //drop gem
        if (game_over === false) {
            this.x = this.x + 30;
            this.y = this.y +143;
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "Middle";
        ctx.font = 'bold 50px Trebuchet MS, sans-serif';
        ctx.fillStyle = '#FFD700';
        ctx.fillText('You Win!', 353.5, 303);
        ctx.font = 'bold 50px Trebuchet MS, sans-serif';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeText('You Win!', 353.5, 303);
        game_over = true;
    }
};

//create global variables
var start = false;

var  follow = false;

var game_over = false;

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
};

//figure out which block entity is in
function which_block(x, y) {
    var row;
    var col;
    if (x < 0) {
        row = -1;
        col = -1;
    } else {
        for (var i=0; i<8; i++) {

            if (y < i*83 -60) {break;}
                row = i;
        }
        for (i=0; i<8; i++) {
            if (x + 60 < i*100) {break;}
                col = i;
        }  
    }
    return [row, col];
}

function checkCollisions() {
    //Check if player occupies the same tile as an enemy
    for (var i = 0; i < allEnemies.length; i++) {
        if (String(which_block(allEnemies[i].x, allEnemies[i].y)) === String(which_block(player.x, player.y))) {
            //reset player and enemies and drop gem
            if (follow === true) {
                follow = false;
                prize.x = player.x;
                prize.y = player.y;
            }
            allEnemies = [];
            generate();
            player.x = 200;
            player.y = 400;
        }
    }
    //check if player occupies same block as gem
    if (String(which_block(player.x, player.y)) == String(which_block(prize.x, prize.y - 30))) { 
        //gem follow player
        if (game_over === false) {
            follow = true;
        }
    }
}

//reload page after two seconds
function refresh() {
    setTimeout(function() {location.reload();}, 2000);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
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

//draw instructions for game
function title() {
    ctx.textAlign = "center";
    ctx.textBaseline = "Middle";
    ctx.lineWidth = 2;
    ctx.font = 'bold 30px Trebuchet MS, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText('Use the arrow keys to bring the gem back', 353.5, 166.65);
    ctx.fillText('from the other side of the road', 353.5, 210.65);
    ctx.font = 'bold 30px Trebuchet MS, sans-serif';
    ctx.strokeStyle = '#000000';
    ctx.strokeText('Use the arrow keys to bring the gem back', 353.5, 166.65);
    ctx.strokeText('from the other side of the road', 353.5, 210.65);
    ctx.lineWidth = 3;
    ctx.font = 'bold 50px Trebuchet MS, sans-serif';
    ctx.fillText('Press ENTER to start', 707/2, 333.3);
    ctx.font = 'bold 50px Trebuchet MS, sans-serif';
    ctx.strokeText('Press ENTER to start', 707/2, 333.3);
}