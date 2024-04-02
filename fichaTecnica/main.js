let numero;
let datos;
let permisos;
let departamentos = "";
let ids;
let index = 0;

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
async function recibirIds(){
    const response = await fetch('http://localhost:2727/get/allId/');
    const data = await response.json();
    //console.log(data);
    const datos = data;
    return(datos); 
}
async function recibirDepartamentos(id){
    const response = await fetch('http://localhost:2727/get/permisos/'+id);
    const data = await response.json();
    //console.log(data);
    const datos = data;
    return(datos); 
}

async function recepcionesIniciales() {
    try {
        numero = await recibirRegistros();
        ids = await recibirIds();
        datos = await recibirDatos(ids[index][0]);
        permisos = await recibirDepartamentos(ids[index][0]);
        //console.log(permisos)
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
    document.getElementById("portrait").src = datos[0].url_img;
    if(datos[0].nombre_cargo == "Director"){
        document.getElementById("body").style.backgroundImage = "url('./fichaTecnica/monlab_jefes.png')"
    }else{
        document.getElementById("body").style.backgroundImage = "url('./fichaTecnica/monlabfons.png')"
    }
    document.getElementById("correo").innerHTML = datos[0].correo;
    document.getElementById("telefono").innerHTML = datos[0].telefono;
    permisos.forEach(element => {
        console.log(element.nombre_dept)
        departamentos += element.nombre_dept;
        if(element != permisos[permisos.length -1]){
           departamentos += ", "
        }
        //console.log(departamentos)
    });
    document.getElementById("id").innerHTML = departamentos;
    departamentos = "";
    document.getElementById("dni").innerHTML = datos[0].DNI;
}
function zonaTrabajo(id) {
    window.location.href = "../zonaTrabajo.html?id=" + encodeURIComponent(id)
}
async function cambio(suma) {
    //console.log(index)
    index += suma;
    if (index <0){
        index = numero-1;
    }
    else if (index > numero-1){
        index = 0;
    }
    datos = await recibirDatos(ids[index][0]);
    permisos = await recibirDepartamentos(ids[index][0])
    imprimeFicha();
}
document.getElementById("btn").addEventListener("click",function () {zonaTrabajo(ids[index][0]); });
document.getElementById("btnIz").addEventListener("click",function () {cambio(-1); });
document.getElementById("btnDer").addEventListener("click",function () {cambio(+1); });