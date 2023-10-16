class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }

    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.97;
        if (this.size < 0.5) {
            this.markedForDeletion = true;
        }
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 10;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 20 + 30;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 2;
        this.gravity = 0;
        this.color = 'rgba(0,0,0,0.2)';
    }

    update() {
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}

export class Boom extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 20 + 30;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 2;
        this.gravity = 0;
        this.color = 'rgba(0,0,0,0.2)';
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }

    update() {
        super.update();
        this.angle += this.va;
        this.gravity += 0.1;
        this.y += this.gravity;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y + this.size);
        context.rotate(this.angle);
        context.fillStyle = this.color;
        context.fillRect(-this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 10;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
        this.color = 'rgba(0,0,0,0.2)';
    }

    update() {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 10);
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y + this.size);
        context.rotate(this.angle);
        context.fillStyle = this.color;
        context.fillRect(-this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();
    }
}