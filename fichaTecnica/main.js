let numero;
let datos;
async function recibirRegistros(){
    const response = await fetch('http://localhost:2727/get/count');
    const data = await response.json();
    //console.log(data);
    const numero = data;
    return(numero); 
}
async function recibirDatos(id){
    const response = await fetch('http://localhost:2727/get/id/'+id);
    const data = await response.json();
    //console.log(data);
    const datos = data;
    return(datos); 
}
async function recepcionesIniciales() {
    try {
        numero = await recibirRegistros();
        datos = await recibirDatos(1);
        console.log(datos[0].id_empleado)
        imprimeFicha();
    } catch (error) {
        console.error('Error al obtener el nombre:', error);
    }
}

function imprimeFicha() {
    document.getElementById("nombre").innerHTML = datos[0].nombre;
    document.getElementById("apellido").innerHTML = datos[0].apellido;
    document.getElementById("departamento").innerHTML = datos[0].nombre_dept;
    document.getElementById("cargo").innerHTML = datos[0].nombre_cargo;
    document.getElementById("correo").innerHTML = datos[0].correo;
    document.getElementById("telefono").innerHTML = datos[0].telefono;
    document.getElementById("dni").innerHTML = datos[0].DNI;
}
function zonaTrabajo(id) {
    window.location.href = "../zonaTrabajo.html?id=" + encodeURIComponent(id)
}
async function cambio(num) {
    console.log("hola")
    if (num <1){
        num = numero;
    }
    else if (num > numero){
        num = 1;
    }
    datos = await recibirDatos(num);
    imprimeFicha();
}
document.getElementById("btn").addEventListener("click",function () {zonaTrabajo(datos[0].id_empleado); });
document.getElementById("btnIz").addEventListener("click",function () {cambio(datos[0].id_empleado -1); });
document.getElementById("btnDer").addEventListener("click",function () {cambio(datos[0].id_empleado +1); });