class Pixel 
{
    constructor(tetris, row, col, color) {
        this.tetris = tetris;
        this.row = row;
        this.col = col;
        this.color = color;
        this.size = PIXEL_SIZE;
    }

    addPixelToBoard() {
        this.tetris.board.map[this.row][this.col] = B;
    }

    isHitLeft() {
        return this.col == 0;
    }

    canMoveLeft() {
        if (this.isHitLeft())
            return false;
        if (!this.tetris.board.isEmptyCell(this.row, this.col-1))
            return false;
        return true;
    }

    moveLeft() {
        if (this.canMoveLeft())
            this.col--;
    }

    isHitRight() {
        return this.col == COL - 1;
    }

    canMoveRight() {
        if (this.isHitRight())
            return false;
        if (!this.tetris.board.isEmptyCell(this.row, this.col+1))
            return false;
        return true;
    }

    moveRight() {
        if (this.canMoveRight())
            this.col++;
    }

    isHitBottom() {
        return this.row == ROW-1;
    }

    canFall() {
        if (this.row < 0)
            return true;
        if (this.isHitBottom())
            return false;
        if (!this.tetris.board.isEmptyCell(this.row+1, this.col))
            return false;
        return true;
    }

    fall() {
        if (this.canFall())
            this.row++;
        else
            this.addPixelToBoard();
    }

    drop() {
        while (this.canFall()) {
            this.fall();
        }
    }

    draw() {
        const x = this.row * this.size;
        const y = this.col * this.size;
        // Set color
        this.tetris.ctx.fillStyle = this.color;
        this.tetris.ctx.strokeStyle = this.color;
        this.tetris.ctx.lineWidth = 1; 
        // Draw outline
        this.tetris.ctx.strokeRect(y+2, x+2, this.size-4, this.size-4); 
        // Draw area
        this.tetris.ctx.fillRect(y+5, x+5, this.size-10, this.size-10);
    }
};