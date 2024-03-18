let myGamePiece;
let colliderArray = [];
let updateArray = [];
let datos;
let nombre;
let imagen;
let departamentos;
let permisos;
//let permisosId;
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
let personaId = urlParams.get('id');
async function recibirDatos() {
    const response = await fetch('http://localhost:2727/get/id/' + personaId);
    const data = await response.json();
    //console.log(data);
    const datos = data[0];
    return (datos);
}
async function recibirDepartamentos() {
    const response = await fetch('http://localhost:2727/get/departamentos');
    const data = await response.json();
    //console.log(data);

    return (data);
}
async function recibirPermisos(id) {
    const response = await fetch('http://localhost:2727/get/permisos');
    const data = await response.json();
    //console.log(data);

    return (data);
}
async function recepcionesIniciales() {
    try {
        datos = await recibirDatos();
        nombre = datos.nombre;
        imagen = datos.url_img;
        departamentos = await recibirDepartamentos();
        permisos = await recibirPermisos();
        //console.log(permisos);
        startGame();
    } catch (error) {
        console.error('Error al obtener el nombre:', error);
    }
}

function startGame() {
    myGameArea.start();//empieza la funcion de start en myGameArea(crea el fondo)
    //console.log(permisos);
    let alfMeds = { //medidas de alfombra
        ancho: 120,
        alto: myGameArea.canvas.height
    };
    alfombra = new bComponent(alfMeds.ancho, alfMeds.alto, "./img/alfombra.png", (myGameArea.canvas.width / 2) - alfMeds.ancho / 2, myGameArea.canvas.height - alfMeds.alto)

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
    secretaria.name = "secretaria";
    let charMeds = {
        ancho: 60,
        alto: 90
    }
    myGamePiece = new component(charMeds.ancho, charMeds.alto, imagen, (myGameArea.canvas.width / 2) - charMeds.ancho / 2, myGameArea.canvas.height - charMeds.alto);// crea un objeto tipo component (width,heigh, color, posicionx, posiciony)
    //(myGameArea.canvas.width/2)-charMeds.ancho/2 ,myGameArea.canvas.height-charMeds.alto
    myGamePiece.name = nombre;
    let puertaMeds = {
        ancho: 90,
        alto: 135
    }
    let sensorMeds = {
        ancho: 30,
        alto: 30
    }
    puerta1 = new component(puertaMeds.ancho, puertaMeds.alto, "./img/puerta.png", 232, 120.9, puertaMeds.ancho, puertaMeds.alto, true, "puerta")
    //sensor1 = new bComponent(sensorMeds.ancho, sensorMeds.alto, "./img/lector.png", 322, 181)
    puerta1.puerta = departamentos[0].nombre_dept;
    puerta1.recibirCodigos();
    console.log(puerta1.puerta + ": " + puerta1.codigo)

    puerta2 = new component(puertaMeds.ancho, puertaMeds.alto, "./img/puerta.png", 638, 120.9, puertaMeds.ancho, puertaMeds.alto, true, "puerta")
    //sensor2 = new bComponent(sensorMeds.ancho, sensorMeds.alto, "./img/lector.png", 728, 181)
    puerta2.puerta = departamentos[2].nombre_dept;
    puerta2.recibirCodigos();
    console.log(puerta2.puerta + ": " + puerta2.codigo)

    puerta3 = new component(puertaMeds.ancho, puertaMeds.alto, "./img/puerta.png", 1044, 120.9, puertaMeds.ancho, puertaMeds.alto, true, "puerta")
    //sensor3 = new bComponent(sensorMeds.ancho, sensorMeds.alto, "./img/lector.png", 1134, 181)
    puerta3.puerta = departamentos[1].nombre_dept;
    puerta3.recibirCodigos();
    console.log(puerta3.puerta + ": " + puerta3.codigo)



    let bocadilloMeds = {
        ancho: 170,
        alto: 120
    }
    bocadillo = new bComponent(bocadilloMeds.ancho, bocadilloMeds.alto, "./img/bocadillo.png")

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
function bComponent(width, height, imageSrc, x, y, cW, cH, movible, name) {

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.multspeed = 2;
    this.x = x;
    this.xObjetivo = x - width;
    this.activo = false;
    this.y = y;
    this.cW = cW;
    this.cH = cH;
    this.image = new Image();
    this.image.src = imageSrc;
    this.movible = movible;
    this.name = name
    this.puerta;
    this.codigo = [];
    this.colliderPropio = [
        new collider(this.x, this.y, this.x, this.y + this.cH),//origen-vertical
        new collider(this.x, this.y, this.x + this.cW, this.y),//origen-horizontal
        new collider(this.x + this.cW, this.y + this.cH, this.x + this.cW, this.y),//destino-horizontal
        new collider(this.x + this.cW, this.y + this.cH, this.x, this.y + this.cH)//destino-vertical
    ];
    colliderArray.push(this.colliderPropio);
    /* this.col00 = {x: this.x, y: this.y};//arriba izquierda
    this.col01 = {x: this.x + this.width, y: this.y};  //arriba derecha
    this.col10 = {x: this.x, y: this.y + this.height}; // abaja izquierda
    this.col11 = {x: this.x + this.width, y: this.y + this.height}; //abajo derecha */

    this.update = function () {
        if (this.movible) {
            let newColliderPropio = [
                new collider(this.x, this.y, this.x, this.y + cH),//origen-vertical
                new collider(this.x, this.y, this.x + cW, this.y),//origen-horizontal
                new collider(this.x + cW, this.y + cH, this.x + cW, this.y),//destino-horizontal
                new collider(this.x + cW, this.y + cH, this.x, this.y + cH)//destino-vertical
            ]
            let index = colliderArray.indexOf(this.colliderPropio)
            //console.log(colliderArray.indexOf(this.colliderPropio))
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

function component(width, height, imageSrc, x, y, cW, cH, movible, name) {

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.multspeed = 2;
    this.x = x;
    this.xObjetivo = x - width;
    this.activo = false;
    this.y = y;
    this.cW = cW;
    this.cH = cH;
    this.image = new Image();
    this.image.src = imageSrc;
    this.movible = movible;
    this.name = name
    this.puerta;
    this.codigo = [];
    this.colliderPropio = [
        new collider(this.x, this.y, this.x, this.y + this.cH),//origen-vertical
        new collider(this.x, this.y, this.x + this.cW, this.y),//origen-horizontal
        new collider(this.x + this.cW, this.y + this.cH, this.x + this.cW, this.y),//destino-horizontal
        new collider(this.x + this.cW, this.y + this.cH, this.x, this.y + this.cH)//destino-vertical
    ];
    colliderArray.push(this.colliderPropio);
    /* this.col00 = {x: this.x, y: this.y};//arriba izquierda
    this.col01 = {x: this.x + this.width, y: this.y};  //arriba derecha
    this.col10 = {x: this.x, y: this.y + this.height}; // abaja izquierda
    this.col11 = {x: this.x + this.width, y: this.y + this.height}; //abajo derecha */

    this.checkDistance = function () {
        if (this.name == "puerta") {
            let x1 = this.x + this.width / 2//punto medio de la puerta
            let y1 = this.y + this.height / 2; //altura de la puerta
            let x2 = myGamePiece.x + myGamePiece.width / 2 //punto medio del personaje
            let y2 = myGamePiece.y//altura del personaje
            let dX = x1 - x2;
            let dY = y1 - y2;
            let distancia = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
            //console.log(distancia)
            if (distancia < 70 && myGamePiece.y > this.y + this.height / 2 && !this.activo) {
                ctx = myGameArea.context;
                ctx.drawImage(bocadillo.image, this.x + this.width * 1.1, this.y - bocadillo.height - 10 + this.height / 2.5, bocadillo.width, bocadillo.height);
                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                ctx.fillText("¡Bienvenido a monlab!", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 10 + this.height / 2.5,)
                ctx.fillText("Para entrar a", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 25 + this.height / 2.5,)
                ctx.fillText("\"" + this.puerta + "\"", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 40 + this.height / 2.5,)
                ctx.fillText("porfavor acerque la", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 55 + this.height / 2.5,)
                ctx.fillText("tarjeta al lector", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 70 + this.height / 2.5,)
                //console.log(leerTarjeta(this.codigo));
                this.lectura();
                 
                
                
                /* if (leerTarjeta(this.codigo)) {//condicion de recibir el json
                    this.activo = true;
                } */

            }
            if (this.activo && this.x != this.xObjetivo) {
                //console.log(this.xObjetivo+" "+this.x)
                this.speedX = -1;
            }
            if (this.x == this.xObjetivo) {
                this.speedX = 0;
                let index = colliderArray.indexOf(this.colliderPropio)
                if (index != -1) {
                    colliderArray.splice(index, 1)
                }
            }

        }
        else if (this.name == "secretaria") {
            let x1 = this.x + this.width / 2//punto medio de la puerta
            let y1 = this.y + this.height / 2; //altura de la puerta
            let x2 = myGamePiece.x + myGamePiece.width / 2 //punto medio del personaje
            let y2 = myGamePiece.y//altura del personaje
            let dX = x1 - x2;
            let dY = y1 - y2;
            let distancia = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
            //console.log(distancia)
            if (distancia < 100 && myGamePiece.y > this.y + this.height / 2) {
                ctx = myGameArea.context;
                ctx.drawImage(bocadillo.image, this.x + this.width * 1.1, this.y - bocadillo.height - 10 + this.height / 2.5, bocadillo.width, bocadillo.height);
                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                ctx.fillText("¡Bienvenido a monlab!", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 10 + this.height / 2.5,)
                ctx.fillText(myGamePiece.name, bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 25 + this.height / 2.5,)
                ctx.fillText("¿Quiere resgistrar a alguien?", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 40 + this.height / 2.5,)
                ctx.fillText("Pulse \"E\"", bocadillo.width / 20 + this.x + this.width * 1.1, this.y - bocadillo.height + 55 + this.height / 2.5,)
            }
        }


    };
    this.lectura = async function () {
        let respuesta = false;
        try {
            const response = await fetch('http://localhost:2728/data');
            if (!response.ok) {
                throw new Error('No se pudo obtener el JSON');
            }
            const jsonData = await response.json();
            //console.log(jsonData);
            
            this.codigo.forEach(element => {
                
                let recibido = "["+jsonData.card_id+"]";
                console.log(element+": "+recibido);
                if (element == recibido){
                    console.log("hola");
                    respuesta = true;
                    
                }
            });
            if(respuesta || myGameArea.keys[69]){
                console.log("permiso condecido");
                this.activo = true;
            };
            
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener los datos JSON');
        }
    }

    this.update = function () {
        if (this.movible) {
            let newColliderPropio = [
                new collider(this.x, this.y, this.x, this.y + cH),//origen-vertical
                new collider(this.x, this.y, this.x + cW, this.y),//origen-horizontal
                new collider(this.x + cW, this.y + cH, this.x + cW, this.y),//destino-horizontal
                new collider(this.x + cW, this.y + cH, this.x, this.y + cH)//destino-vertical
            ]
            let index = colliderArray.indexOf(this.colliderPropio)
            //console.log(colliderArray.indexOf(this.colliderPropio))
            if (index !== -1) {
                colliderArray[index] = newColliderPropio;
                this.colliderPropio = newColliderPropio;
            }
        }
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    updateArray.push(this);
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.recibirCodigos = function () {
        permisos.forEach(element => {
            if (element.nombre_dept == this.puerta) {
                this.codigo.push(element.tarjeta);
            };

        });
    }

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
    //console.log(myGameArea.keys)
    if (myGameArea.keys && (myGameArea.keys[16])) { myGamePiece.multspeed = 4; }//shift
    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) { myGamePiece.speedX = -2 * myGamePiece.multspeed; }
    if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68])) { myGamePiece.speedX = 2 * myGamePiece.multspeed; }
    if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) { myGamePiece.speedY = -2 * myGamePiece.multspeed; }
    if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) { myGamePiece.speedY = 2 * myGamePiece.multspeed; }


    alfombra.update();

    //puerta1.update();
    //acttualizar los colliders segun la posicion de la puerta
    //puerta2.update();
    //puerta3.update();

    //myWall.update();




    updateArray.sort(function (a, b) { return ((a.y + a.height) - (b.y + b.height)) });

    colliderArray.forEach(element => {
        element.forEach(subElement => {
            subElement.draw();
            subElement.checkCollision(myGamePiece);
        })

    });

    updateArray.forEach(element => {

        element.newPos();
        element.update();
        //element.checkDistance();
    });
    //sensor1.update();
    //sensor2.update();
    //sensor3.update();
    puerta1.checkDistance();

    puerta2.checkDistance();

    puerta3.checkDistance();

    secretaria.checkDistance();

    //secretaria.update();
    //escritorio.update();
    //myGamePiece.newPos();
    //myGamePiece.update();



}
function imagenFrame() {

    secretariaspr += 1
    if (secretariaspr > 21) {
        secretariaspr = 1;
    }
    secretaria.image.src = "img/secretaria/secre" + secretariaspr + ".png"
}

async function leerTarjeta(codigos) {
    

}


