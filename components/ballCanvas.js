class BallCanvas extends HTMLElement {
    constructor() {
        super();
    }

    addBall() {
        while (this.balls.length >= 100)
            this.balls.pop();
        this.balls.push(
        {  
            x: this.w * Math.random(),
            y: this.h * Math.random(),
            velX: Math.random() * 4,
            velY: Math.random() * 4,
            r: Math.random() * 10 + 10,
            color: "#" + Math.floor(Math.random()*16777215).toString(16)
        });
        this.countLabel.textContent = "Count: " + this.balls.length;
    }

    update() {
        const c = this.context;
        c.fillStyle = "#432837";
        c.fillRect(0, 0, this.w, this.h);

        for (const ball of this.balls)
        {
            ball.x += ball.velX;
            ball.y += ball.velY;

            if (ball.y < ball.r) ball.velY = Math.abs(ball.velY);
            if (ball.y > this.h - ball.r) ball.velY = -Math.abs(ball.velY);
            if (ball.x < ball.r) ball.velX = Math.abs(ball.velX);
            if (ball.x > this.w - ball.r) ball.velX = -Math.abs(ball.velX);

            c.fillStyle = "white";
            c.beginPath();
            c.arc(ball.x, ball.y, ball.r + 2, 0, 2 * Math.PI);
            c.fill();

            c.fillStyle = ball.color;
            c.beginPath();
            c.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
            c.fill();

            c.fillStyle = "white";
            c.textAlign = "center";
            c.fillText("OwO", ball.x, ball.y);
        }
    }

    connectedCallback() {
        this.w = this.getAttribute("w");
        this.h = this.getAttribute("h");
        if (!this.w)
            this.w = 256;
        if (!this.h)
            this.h = 128;
        this.balls = [];

        const div = document.createElement("div");
        div.className = "round-panel--heading wrap-panel--vertical";

        const bdiv = document.createElement("div");
        bdiv.className = "wrap-panel";

        this.countLabel = document.createElement("p");
        this.addBall();
        bdiv.appendChild(this.countLabel);

        this.canvas = document.createElement("canvas");
        this.canvas.style = "border-radius: 12px;";
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.canvas.appendChild(document.createTextNode("You browser doesn't support Canvas elements :3"));
        this.context = this.canvas.getContext("2d");

        const resetButton = document.createElement("button");
        resetButton.appendChild(document.createTextNode("Reset"));
        bdiv.appendChild(resetButton);

        const addButton = document.createElement("button");
        addButton.appendChild(document.createTextNode("Add Ball"));
        bdiv.appendChild(addButton);

        const me = this;
        resetButton.onclick = function() { me.balls = []; me.addBall(); };
        addButton.onclick = function() { me.addBall(); };
        window.setInterval(function() { me.update(); }, 16);

        div.appendChild(this.canvas);
        div.appendChild(bdiv);
        this.appendChild(div);
    }
}

customElements.define('ball-canvas', BallCanvas);