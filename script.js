function Game(){
    this.numRows = 3;
    this.numCols = 3;
    this.board = [];
    this.blankIndex = 0;
    this.won = false;
    //this.boardShuffled = false;
    this.numTiles = this.numRows * this.numCols;
}

Game.prototype.execute = function(){
    this.initialize_board();
    this.create_HTML_Board();
    this.shuffle_board();
}

Game.prototype.isWon = function(){
    for(let i = 0; i < this.numTiles; i++){
        if(i != this.board[i])
            return false;
    }
    return true;
}

Game.prototype.initialize_board = function(){
    var tmpSize = prompt('Enter Board Size (e.g. 3 = (3x3 board)');
    if(tmpSize > 0){
        this.numRows = tmpSize;
        this.numCols = tmpSize;
        this.numTiles = tmpSize*tmpSize;
    }
    for(let i = 0; i < this.numTiles; i++){
        if(i == 0)
            this.board.push(i);
        else
            this.board.push(i);
    }
    
    //console.log(this);
}

Game.prototype.display_board = function() {
    
}

Game.prototype.create_HTML_Board = function() {

    var table = document.createElement('table');
    table.setAttribute('width', '' + 100 * this.numRows + 'px');
    table.setAttribute('height', '' + 100 * this.numCols + 'px');
    table.setAttribute('border', "2px '#000' solid");
    var tableBody = document.createElement('tbody');
    
    var row;
    for(let i = 0; i < this.numRows; i++){
        row = document.createElement('tr');
        for(let j = 0; j < this.numCols; j++){
            var cell = document.createElement('td');
            cell.setAttribute('class', 'other');
            cell.setAttribute('id', this.board[this.numRows * i + j]);
            //cell.appendChild(document.createTextNode(board[this.numRows * i + j]));
            cell.innerHTML = this.board[this.numRows*i+j];
            row.append(cell);
        }
        tableBody.append(row);
    }

    table.append(tableBody);
    document.getElementById('board').append(table);
}

Game.prototype.shuffle_board = function(){
    
    var direction_dict = {
        0: 'left',
        1: 'up',
        2: 'right',
        3: 'down',
    }
    
    
    for(let i = 0; i < Math.pow(this.numRows, 4); i++){
        var f = Math.floor(3.99 * Math.random());
        this.swap(direction_dict[f], vector_dict);
    }
    
}

var vector_dict = {
    'left': ['col > 0', -1, 0],
    'up': ['row > 0', -1, 1],
    'right': ['col < this.numRows - 1', 1, 0],
    'down': ['row < this.numRows - 1', 1, 1],
}

Game.prototype.swap = function(callback, vector_dict){
    var row = parseInt(this.blankIndex / this.numRows);
    var col = this.blankIndex % this.numRows;
    var tmp, tmp2;
    
    if(this.won == true){
        //console.log("Game Over!");
        return;
    }
    
    var vals = vector_dict[callback];
    
    if(eval(vals[0])){
        tmp2 = this.board[this.blankIndex];
        this.board[this.blankIndex] = this.board[this.blankIndex + vals[1]*Math.pow(this.numRows, vals[2])];
        this.board[this.blankIndex + vals[1]*Math.pow(this.numRows, vals[2])] = tmp2;

        tmp = document.getElementById(this.blankIndex).innerHTML;
        document.getElementById(this.blankIndex).innerHTML = document.getElementById(this.blankIndex + vals[1]*Math.pow(this.numRows, vals[2])).innerHTML;
        document.getElementById(this.blankIndex + vals[1]*Math.pow(this.numRows, vals[2])).innerHTML = tmp;

        document.getElementById(this.blankIndex).className = 'other';
        document.getElementById(this.blankIndex + vals[1]*Math.pow(this.numRows, vals[2])).className = 'blank';
        this.blankIndex = this.blankIndex + vals[1]*Math.pow(this.numRows, vals[2]);
    }
    
    //console.log('Blank Index: ' + this.blankIndex + ' | Action: ' + callback + ' | Class Name: ' + document.getElementById(this.blankIndex).className);
}

var game = new Game();
game.execute();

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            game.swap('left', vector_dict);
            break;
        case 38:
            game.swap('up', vector_dict);
            break;
        case 39:
            game.swap('right', vector_dict);
            break;
        case 40:
            game.swap('down', vector_dict);
            break;
    }
    
    //game.create_HTML_Board();
    if(game.isWon()){
        if(game.won == false){
            var youWon = document.createElement('div');
            youWon.innerHTML = 'You Won!';
            document.getElementById('board').append(youWon);
        }
        game.won = true;
    }
};