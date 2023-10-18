import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import {
    FlyingEnemy,
    GroundEnemy,
    ClimbingEnemy,
} from './enemies.js';
import { UI } from './ui.js';

window.addEventListener('load', function() {

    document.querySelector('.loading').style.display = 'none';

    const canvas = document.getElementById('canvas1');
    const ctx = canvas1.getContext('2d');
    canvas.width = 496;
    canvas.height = 496;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 1.5;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 150;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = Infinity; // Max time per game
            this.lives = 3;
            this.energy = 100; // current player energy
            this.maxEnergy = 100;
            this.energyConsume = 0.5;
            this.energyRecover = 0.25;
            this.gameOver = false;
            this.init = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }

        update(deltaTime) {
            this.time += deltaTime;

            if (this.time > this.maxTime) {
                this.gameOver = true;
            }

            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // Handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0;
                this.addEnemy();
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach((enemy) => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            });

            // Handle particles
            this.particles.forEach((particle) => {
                particle.update(deltaTime);
                if (particle.markedForDeletion) {
                    this.particles.splice(this.particles.indexOf(particle), 1);
                }
            })

            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            // Handle collision sprite
            this.collisions.forEach((collision) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) {
                    this.collisions.splice(this.collisions.indexOf(collision), 1);
                }
            });

            // Handle floating messages
            this.floatingMessages.forEach((floatingMessage) => {
                floatingMessage.update(deltaTime);
            });

            this.floatingMessages = this.floatingMessages.filter((msg) => !msg.markedForDeletion);

        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);

            this.enemies.forEach((enemy) => {
                enemy.draw(context);
            });

            this.particles.forEach((particle) => {
                particle.draw(context);
            });

            this.collisions.forEach((collision) => {
                collision.draw(context);
            });

            this.floatingMessages.forEach((floatingMessage) => {
                floatingMessage.draw(context);
            });

            this.ui.draw(context);
        }

        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this));
            } else if (this.speed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }

            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);


    let lastTime = 0;
    function animate(timestamp) {

        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.update(deltaTime);
        game.draw(ctx);

        if (!game.gameOver) {
            requestAnimationFrame(animate);
        }
    }
    animate(0);
})
