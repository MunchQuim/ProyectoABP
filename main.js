let myGamePiece;
let colliderArray = [];
function startGame() {
    myGameArea.start();//empieza la funcion de start en myGameArea(crea el fondo)

    let alfMeds = { //medidas de alfombra
        ancho: 120,
        alto: myGameArea.canvas.height
    };
    alfombra = new component(alfMeds.ancho, alfMeds.alto, "./img/alfombra.png", (myGameArea.canvas.width / 2) - alfMeds.ancho / 2, myGameArea.canvas.height - alfMeds.alto)

    let escritorioMeds = {
        ancho: 151 * 2,
        alto: 58 * 2
    }
    escritorio = new component(escritorioMeds.ancho, escritorioMeds.alto, "./img/escritorio.svg", (myGameArea.canvas.width / 2) - escritorioMeds.ancho / 2, 400, escritorioMeds.ancho, escritorioMeds.alto)

    let secretariaMeds = {
        ancho: 24 * 2,
        alto: 50 * 2
    }
    let paredMeds = {
        ancho: 1366,
        alto: 256
    }
    myWall = new component(paredMeds.ancho, paredMeds.alto, "./img/pared.png", 0, 0)
    myWall.colliderPropio = [
        new collider(0, paredMeds.alto, 231, paredMeds.alto),
        new collider(323, paredMeds.alto, 637, paredMeds.alto),
        new collider(728, paredMeds.alto, 1043, paredMeds.alto),
        new collider(1134, paredMeds.alto, paredMeds.ancho, paredMeds.alto)
    ]
    colliderArray.push(myWall.colliderPropio);


    secretaria = new component(secretariaMeds.ancho, secretariaMeds.alto, "img/secretaria/secre1.png", (myGameArea.canvas.width / 2) - secretariaMeds.ancho / 2, 340, secretariaMeds.ancho, secretariaMeds.alto)

    let charMeds = {
        ancho: 60,
        alto: 90
    }
    myGamePiece = new component(charMeds.ancho, charMeds.alto, "./img/chad.jpg", (myGameArea.canvas.width / 2) - charMeds.ancho / 2, myGameArea.canvas.height - charMeds.alto);// crea un objeto tipo component (width,heigh, color, posicionx, posiciony)
    //(myGameArea.canvas.width/2)-charMeds.ancho/2 ,myGameArea.canvas.height-charMeds.alto

    let puertaMeds = {
        ancho: 90,
        alto: 135
    }
    puerta1 = new component(puertaMeds.ancho, puertaMeds.alto, "./img/puerta.png", 232, 121,puertaMeds.ancho, puertaMeds.alto,true)
    puerta2 = new component(puertaMeds.ancho, puertaMeds.alto, "./img/puerta.png", 638, 121,puertaMeds.ancho, puertaMeds.alto,true)
    puerta3 = new component(puertaMeds.ancho, puertaMeds.alto, "./img/puerta.png", 1044, 121,puertaMeds.ancho, puertaMeds.alto,true)

}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1366;
        this.canvas.height = 768;
        this.context = this.canvas.getContext("2d");
        this.canvas.id = ("fondo");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 1000 / 60);//le asigno un intervalo que ejecuta updateGameArea 60 veces por segundo
        this.frameInterval = setInterval(imagenFrame, 1000 / 15)
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
        this.colliderPropio = [
            new collider(0, 0, 0, this.canvas.height),
            new collider(0, 0, this.canvas.width, 0),
            new collider(this.canvas.width, this.canvas.height, this.canvas.width, 0),
            new collider(this.canvas.width, this.canvas.height, 0, this.canvas.height)]

        colliderArray.push(this.colliderPropio);
    },

    clear: function () {//funcion que borra el frame anterior para que no stackee copias
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
function component(width, height, imageSrc, x, y, cW, cH, movible) {

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.multspeed = 2;
    this.x = x;
    this.y = y;
    this.cW = cW;
    this.cH = cH;
    this.image = new Image();
    this.image.src = imageSrc;
    this.movible = movible;
    this.colliderPropio = [
        new collider(this.x, this.y, this.x, this.y + this.cH),//origen-vertical
        new collider(this.x, this.y, this.x + this.cW, this.y),//origen-horizontal
        new collider(this.x + this.cW, this.y + this.cH, this.x + this.cW, this.y),//destino-horizontal
        new collider(this.x + this.cW, this.y + this.cH, this.x, this.y + this.cH)//destino-vertical
    ]
    colliderArray.push(this.colliderPropio);
    /* this.col00 = {x: this.x, y: this.y};//arriba izquierda
    this.col01 = {x: this.x + this.width, y: this.y};  //arriba derecha
    this.col10 = {x: this.x, y: this.y + this.height}; // abaja izquierda
    this.col11 = {x: this.x + this.width, y: this.y + this.height}; //abajo derecha */



    this.update = function () {
        if(this.movible){
            let newColliderPropio = [
                new collider(this.x, this.y, this.x, this.y + cH),//origen-vertical
                new collider(this.x, this.y, this.x + cW, this.y),//origen-horizontal
                new collider(this.x + cW, this.y + cH, this.x + cW, this.y),//destino-horizontal
                new collider(this.x + cW, this.y + cH, this.x, this.y + cH)//destino-vertical
            ]
            let index = colliderArray.indexOf(this.colliderPropio)
            console.log(colliderArray.indexOf(this.colliderPropio))
            if (index !== -1) {
                colliderArray[index] = newColliderPropio;
                this.colliderPropio = newColliderPropio;
            }
        }
        



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
        //ctx.stroke();
        ctx.closePath();
    };
}
let secretariaspr = 1;
let updateCount = 1;
function updateGameArea() {//funcion que llama al clear y update de sus respectivos diccionarios
    /* console.log(document.getElementById("fondo")) */
    myGameArea.clear();
    myGamePiece.multspeed = 2;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    /* console.log(myGameArea.keys) */
    if (myGameArea.keys && (myGameArea.keys[16])) { myGamePiece.multspeed = 4; }//shift
    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) { myGamePiece.speedX = -2 * myGamePiece.multspeed; }
    if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68])) { myGamePiece.speedX = 2 * myGamePiece.multspeed; }
    if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) { myGamePiece.speedY = -2 * myGamePiece.multspeed; }
    if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) { myGamePiece.speedY = 2 * myGamePiece.multspeed; }


    alfombra.update();

    puerta1.update();
    //acttualizar los colliders segun la posicion de la puerta
    puerta2.update();
    puerta3.update();

    myWall.update();
    colliderArray.forEach(element => {
        element.forEach(subElement => {
            subElement.draw();
            subElement.checkCollision(myGamePiece);
        })

    });


    //console.log(colliderArray[6][0].pointA)

    secretaria.update();
    escritorio.update();
    myGamePiece.newPos();
    myGamePiece.update();
    updateCount++;
    if (updateCount > 3) {
        updateCount = 1;
    }
}
function imagenFrame() {

    secretariaspr += 1
    if (secretariaspr > 21) {
        secretariaspr = 1;
    }
    secretaria.image.src = "img/secretaria/secre" + secretariaspr + ".png"


}



