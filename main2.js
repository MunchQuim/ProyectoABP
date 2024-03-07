
let myGamePiece;
let colliderArray = [];

function startGame() {
    myGameArea.start();

    let alfMeds = {
        ancho: 120,
        alto: myGameArea.canvas.height
    };
    alfombra = new component(alfMeds.ancho, alfMeds.alto, "./img/alfombra.png", (myGameArea.canvas.width / 2) - alfMeds.ancho / 2, myGameArea.canvas.height - alfMeds.alto);

    let escritorioMeds = {
        ancho: 151 * 2,
        alto: 58 * 2
    };
    escritorio = new component(escritorioMeds.ancho, escritorioMeds.alto, "./img/escritorio.svg", (myGameArea.canvas.width / 2) - escritorioMeds.ancho / 2, 400, escritorioMeds.ancho, escritorioMeds.alto);

    let secretariaMeds = {
        ancho: 24 * 2,
        alto: 50 * 2
    };
    let paredMeds = {
        ancho: 1366,
        alto: 256
    };
    myWall = new component(paredMeds.ancho, paredMeds.alto, "./img/pared.svg", 0, 0);

    secretaria = new component(secretariaMeds.ancho, secretariaMeds.alto, "img/secretaria/secre1.svg", (myGameArea.canvas.width / 2) - secretariaMeds.ancho / 2, 340, secretariaMeds.ancho, secretariaMeds.alto);

    let charMeds = {
        ancho: 60,
        alto: 90
    };
    myGamePiece = new component(charMeds.ancho, charMeds.alto, "./img/chad.jpg", (myGameArea.canvas.width / 2) - charMeds.ancho / 2, myGameArea.canvas.height - charMeds.alto);
}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1366;
        this.canvas.height = 768;
        this.context = this.canvas.getContext("2d");
        this.canvas.id = "fondo";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameId = requestAnimationFrame(updateGameArea);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = myGameArea.keys || [];
            myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        });
        this.colliderPropio = [
            new collider(0, 0, 0, this.canvas.height),
            new collider(0, 0, this.canvas.width, 0),
            new collider(this.canvas.width, this.canvas.height, this.canvas.width, 0),
            new collider(this.canvas.width, this.canvas.height, 0, this.canvas.height)
        ];
        colliderArray.push(this.colliderPropio);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
function component(width, height, imageSrc, x, y, cW, cH) {

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.multspeed = 2;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;

    this.colliderPropio = [
        new collider(this.x, this.y, this.x, this.y + cH),//origen-vertical
        new collider(this.x, this.y, this.x + cW, this.y),//origen-horizontal
        new collider(this.x + cW, this.y + cH, this.x + cW, this.y),//destino-horizontal
        new collider(this.x + cW, this.y + cH, this.x, this.y + cH)//destino-vertical
    ]
    colliderArray.push(this.colliderPropio);
    /* this.col00 = {x: this.x, y: this.y};//arriba izquierda
    this.col01 = {x: this.x + this.width, y: this.y};  //arriba derecha
    this.col10 = {x: this.x, y: this.y + this.height}; // abaja izquierda
    this.col11 = {x: this.x + this.width, y: this.y + this.height}; //abajo derecha */



    this.update = function () {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };

}
function collider(A0, A1, B0, B1) {

    this.pointA = { x: A0, y: A1 };
    this.pointB = { x: B0, y: B1 };
    //this.color = "blue";
    this.lineWidth = 2;

    this.checkCollision = function (gameObject) {
        // Verificar colisión con el componente controlado
        if (
            gameObject.x + gameObject.speedX < Math.max(this.pointA.x, this.pointB.x) &&
            gameObject.x + gameObject.speedX + gameObject.width > Math.min(this.pointA.x, this.pointB.x) &&
            gameObject.y + gameObject.speedY + 2 * gameObject.height / 3 < Math.max(this.pointA.y, this.pointB.y) &&
            gameObject.y + gameObject.speedY + gameObject.height > Math.min(this.pointA.y, this.pointB.y)

        ) {
            // Hay colisión, implementa la lógica de respuesta a la colisión aquí
            gameObject.speedX = 0;
            gameObject.speedY = 0;
            console.log("Colisión detectada: ");
        }
    };

    this.draw = function () {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.moveTo(this.pointA.x, this.pointA.y);
        ctx.lineTo(this.pointB.x, this.pointB.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.closePath();
    };
}
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.multspeed = 2;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if (myGameArea.keys && myGameArea.keys[16]) { myGamePiece.multspeed = 4; } // Shift
    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) { myGamePiece.speedX = -2 * myGamePiece.multspeed; } // Left or A
    if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68])) { myGamePiece.speedX = 2 * myGamePiece.multspeed; } // Right or D
    if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) { myGamePiece.speedY = -2 * myGamePiece.multspeed; } // Up or W
    if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) { myGamePiece.speedY = 2 * myGamePiece.multspeed; } // Down or S

    alfombra.update();
    myWall.update();
    colliderArray.forEach(element => {
        element.forEach(subElement => {
            subElement.draw();
            subElement.checkCollision(myGamePiece);
        });
    });
    secretaria.update();
    escritorio.update();
    myGamePiece.newPos();
    myGamePiece.update();

    myGameArea.frameId = requestAnimationFrame(updateGameArea);
}

function stopGame() {
    cancelAnimationFrame(myGameArea.frameId);
}