export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', (e) => {

            console.log(e.key);

            const key = e.key === ' ' ? 'Enter' : e.key;

            if ((
                key === 'ArrowDown'
                || key === 'ArrowUp'
                || key === 'ArrowLeft'
                || key === 'ArrowRight'
                || key === 'Enter'
            ) && this.keys.indexOf(key) === -1) {
                this.keys.push(key);
            } else if (key === 'd') {
                this.game.debug = !this.game.debug;
            }

            if (!this.game.init) {
                this.game.init = true;
            }
        });

        window.addEventListener('keyup', (e) => {

            const key = e.key === ' ' ? 'Enter' : e.key;

            if (
                key === 'ArrowDown'
                || key === 'ArrowUp'
                || key === 'ArrowLeft'
                || key === 'ArrowRight'
                || key === 'Enter'
            ) {
                this.keys.splice(this.keys.indexOf(key), 1);
            }
        });
    }
}