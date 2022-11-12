class Brick {
    constructor(tetris, row, col, shape) {
        this.tetris = tetris;
        this.row = row;
        this.col = col;
        this.map = BRICK_SHAPES[shape];
        this.pixels = [];
        this.color = PIXEL_COLOR;
        this.init();
    }

    init() {
        this.pixels = this.mapToPixels(this.map);
    }

    mapToPixels(map = []) {
        let pixels = [];
        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[0].length; col++) {
                if (map[row][col] == B) {
                    let newPixel = new Pixel(this.tetris, this.row+row, this.col+col, PIXEL_COLOR);
                    pixels.push(newPixel);
                }
            }
        }
        return pixels;
    }

    addNewBrickToBoard() {
        this.pixels.forEach(pixel => {
            if (pixel.row >= 0)
                this.tetris.board.map[pixel.row][pixel.col] = B;
        });
        this.tetris.board.update();
    }

    canMoveLeft() {
        let doesCanMoveLeft = true;
        this.pixels.forEach(pixel => {
            if (!pixel.canMoveLeft())
                doesCanMoveLeft = false;
        })
        return doesCanMoveLeft;
    }

    moveLeft() {
        if (this.canMoveLeft()) {
            this.col--;
            this.pixels.forEach(pixel => pixel.moveLeft());
        }
    }

    canMoveRight() {
        let doesCanMoveRight = true;
        this.pixels.forEach(pixel => {
            if (!pixel.canMoveRight())
                doesCanMoveRight = false;
        })
        return doesCanMoveRight;
    }

    moveRight() {
        if (this.canMoveRight()) {
            this.col++;
            this.pixels.forEach(pixel => pixel.moveRight());
        }
    }

    canFall() {
        let doesCanFall = true;
        this.pixels.forEach(pixel => {
            if (!pixel.canFall())
                doesCanFall = false;
        })
        return doesCanFall;
    }

    fall() {
        if (this.canFall()) {
            this.row++;
            this.pixels.forEach(pixel => pixel.fall());
        } else {
            this.addNewBrickToBoard();
            this.tetris.createNewBrick();
        }
    }

    drop() {
        while(this.canFall()) {
            this.row++;
            this.pixels.forEach(pixel => pixel.fall());
        }
    }

    canRotate(map) {
        let doesCanRotate = true;
        let newPixels = this.mapToPixels(map);
        newPixels.forEach(pixel => {
            if (!this.tetris.board.isEmptyCell(pixel.row, pixel.col))
                doesCanRotate = false;
        });
        return doesCanRotate;
    }

    rotate() {
        let newMap = [];
        for(let i = 0; i < this.map[0].length; i++) {
            let row = this.map.map(e => e[i]).reverse();
            newMap.push(row);
        }

        if (this.canRotate(newMap)) {
            this.map = newMap;
            this.pixels = this.mapToPixels(newMap);
        }
    }

    update() {
        this.fall();
    }

    draw() {
        this.pixels.forEach(pixel => pixel.draw());
    }
};