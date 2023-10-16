export class UI {
     constructor(game) {
        this.game = game;
        this.fontSize = 24;
        this.fontFamily = 'VT323';
        this.livesImage = document.getElementById('lives');
        this.backgroundColor = 'rgba(0,0,0,0.5)';
     }

     draw(context) {

         context.save();

         context.shadowOffsetX = 2;
         context.shadowOffsetY = 2;
         context.shadowColor = 'white';
         context.shadowBlur = 0;

         context.fillStyle = this.game.fontColor;


         // Lives
         for (let index = 0; index < this.game.lives; index++) {
               context.drawImage(
                  this.livesImage,
                  20 + index * 40,
                  95,
                  32,
                  32
               );
         }

         // Game over messages
         if (this.game.gameOver) {
               context.textAlign = 'center';
               context.font = this.fontSize * 3 + 'px ' + this.fontFamily;

               context.fillStyle = this.backgroundColor;
               context.fillRect(0, 0, this.game.width, this.game.height);

               context.fillStyle = 'white';
               context.shadowColor = 'black';

               context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5 - 20);
               context.font = this.fontSize * 1.2 + 'px ' + this.fontFamily;
               context.fillText('Refresh browser to retry', this.game.width * 0.5, this.game.height * 0.5 + 20);
         }

         context.font = this.fontSize * 1.2 + 'px ' + this.fontFamily;
         context.textAlign = 'left';

         // Score
         context.fillText(`Score: ` + this.game.score, 20, 50);

         // Timer
         context.font = this.fontSize + 'px ' + this.fontFamily;
         context.fillText(`Time: ` + (this.game.time * 0.001).toFixed(1), 20, 80);


         // Game guides
         if (!this.game.init) {
            context.textAlign = 'center';
            context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;

            context.fillText('ARROW KEYS TO MOVE', this.game.width * 0.5, this.game.height * 0.5 - 15);

            context.fillText('SPACE OR ENTER TO ATTACK', this.game.width * 0.5, this.game.height * 0.5 + 15);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
      }


         context.restore();
     }
}