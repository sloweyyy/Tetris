class Music {
    constructor() {
        this.song = new Audio();
        this.song.src = '../src/background.mp3';
        this.trigger();
        this.play();
    }

    trigger() {
        document.querySelector('canvas').click();
    }

    play() {
        this.song.play();
    }

    stop() {
        this.song.pause();
    }

    turn() {
        const state = !this.song.paused;
        if (state)
            this.stop();
        else
            this.play();
    }
};