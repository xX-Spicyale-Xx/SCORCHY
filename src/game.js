class NumberPuzzle {
    constructor(player) {
        this.player = player;
        this.state = [[1, 2, 3],
                      [4, 5, 6],
                      [7, 8, 0]]

        for (let i = 0; i < 1000; i++){
            direction = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)]
            this.move(direction);
        }
    }

    getState(){
        return this.state;
    }

    move(direction) {
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                if (this.state[row][column] == 0){
                    switch (direction) {
                        case 'up':
                            if (row == 2){
                                return;
                            }
                            this.state[row][column] = this.state[row + 1][column];
                            this.state[row + 1][column] = 0;
                            return;

                        case 'down':
                            if (row == 0){
                                return;
                            }
                            this.state[row][column] = this.state[row - 1][column];
                            this.state[row - 1][column] = 0;
                            return;

                        case 'left':
                            if (column == 2){
                                return;
                            }
                            this.state[row][column] = this.state[row][column + 1];
                            this.state[row][column + 1] = 0;
                            
                        case 'right':
                            if (column == 0){
                                return;
                            }
                            this.state[row][column] = this.state[row][column - 1];
                            this.state[row][column - 1] = 0;
                            return;
                    }
                }
            }
        }
    }
}