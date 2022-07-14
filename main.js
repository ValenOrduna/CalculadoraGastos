//Inicializamos Variables, Arrays ,Clases y Objetos
let nombre;
let apellido;
let edad;
let salario;
let salarioinicial;
let porcentaje=0;
let personas=[
    {nombre:"Valentin",apellido:"Orduña"},
    {nombre:"Dario",apellido:"Orduña"},
    {nombre:"Agustin",apellido:"Orduña"},
    {nombre:"Magali",apellido:"Zibana"},
]
let inputnom= document.querySelector('#inputnombre');
let inputap= document.querySelector('#inputapellido');
let inputedad= document.querySelector('#inputedad');
let inputsal= document.querySelector('#inputsalario');
let boton= document.querySelector('#comenzar');
const formulario= document.querySelector('#formulario');
let gastos=[0];
let gastosinnecesarios=[0];
let gastostotales=0;
let gastostotalesE=0;
let gastostotalesI=0;
let gasto=0;
let gastoin=0;
let agregarsal=0;
let salariosagregados=[];
let diaE=0;
let diaI=0;
let m=0;
let n=0;

class Persona {
    constructor(nombre,apellido,edad,salario){
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.salario=salario;
    }
}
let persona= new Persona(nombre,apellido);
let picado=localStorage.getItem('persona');
//Pedimos los Datos
function PedirDatos(){
    if(picado!=undefined){
        formulario.remove();
        EmpezarApp();
    }
    document.addEventListener('DOMContentLoaded',IniciarApp)
    inputnom.onchange=()=>{
        nombre=inputnom.value;
        inputnom.style.background='white';
        inputnom.style.color='black';
    }
    inputap.onchange=()=>{
        apellido=inputap.value;
        inputap.style.background='white';
        inputap.style.color='black';
    }
    inputedad.onchange=()=>{
        edad=inputedad.value;
        inputedad.style.background='white';
        inputedad.style.color='black';
    }
    inputsal.onchange=()=>{
        salario=Number(inputsal.value);
        salarioinicial=Number(inputsal.value);
        inputsal.style.background='white';
        inputsal.style.color='black';
    } 
    Boton();
}
//Deshablitiamos Boton Comenzar
function IniciarApp(){
    boton.classList.remove('desabilitar');
    boton.disabled=false;
}

//Funcion de Enviar Boton
function Boton (){
    formulario.addEventListener('submit',ControlarDatos);
}

//Controlamos los datos obtenidos
function ControlarDatos(e){
    e.preventDefault();
    if (inputnom.value.length<=2||Number(inputnom.value)){
        inputnom.style.background='#ed1652';
        inputnom.style.color='white';
        PedirDatos();
    }
    if (inputap.value.length<3||Number(inputap.value)){
        inputap.style.background='#ed1652';
        inputap.style.color='white';
        PedirDatos();
    }
    if (inputedad.value<=0||isNaN(inputedad.value)||inputedad.value===""){
        inputedad.style.background='#ed1652';
        inputedad.style.color='white';
        PedirDatos();
    }
    if (inputsal.value<0||isNaN(inputsal.value)||inputsal.value===""){
        inputsal.style.background='#ed1652';
        inputsal.style.color='white';
        PedirDatos();
    }
    if(inputnom.value.length>=2&&inputap.value.length>=2&&inputnom.value!=Number&&inputap.value!=Number&&inputedad.value>0&&inputedad!=isNaN&&inputedad!=""&&inputsal.value>0&&inputsal!=isNaN&&inputsal!=""){
        Empezar();
    }
}



//Empezamos la aplicacion
function Empezar(){
    if(nombre!==''&&apellido!==''&&edad!==''&&salario!==''){
        let val;
        for (const persona of personas) {
            if(nombre===persona.nombre && apellido===persona.apellido){
                MostrarAlerta('El usuario ya esta registrado','error');
                val=1;
            }
        }
        if(val!=1){
            console.log(personas);
            MostrarAlerta('Te has registrado exitosamente!!');
            const persona={nombre:nombre,apellido:apellido,edad:edad,salario:salario,salarioinicial:salarioinicial};
            localStorage.setItem('persona',JSON.stringify(persona));
            const gastoss={gastostotales:gastostotales,gastostotalesE:gastostotalesE,gastostotalesI:gastostotalesI,diaE:diaE,diaI:diaI,m:m,n:n,porcentaje:porcentaje,dias:1};
            localStorage.setItem('gastos',JSON.stringify(gastoss));
            localStorage.setItem('arraygasto',JSON.stringify(gastos));
            localStorage.setItem('arraygastoin',JSON.stringify(gastosinnecesarios));
            localStorage.setItem('arraysalario',JSON.stringify(salariosagregados));
            setTimeout(() => {
                formulario.remove();
                EmpezarApp();
            }, 3000); 
        } 
    }
    setTimeout(()=>{
        formulario.reset();
        IniciarApp();
    },3000)  
}

//Mostramos Alerta en caso de ingresar usuario creado o usuario registrado
function MostrarAlerta(mensaje,tipo){
    const error= document.createElement('p');
    error.textContent=mensaje;
    if(tipo=='error'){   
        error.classList.add('error');
    }else {
        error.classList.add('ok');
    }
    formulario.appendChild(error);
    
    setTimeout(() => {
        error.remove();
    }, 3000);
}


//Empezamos aplicacion y creamos la estructura correspondiente
function EmpezarApp(){
    let valor2=JSON.parse(localStorage.getItem('gastos'));
    let valor=JSON.parse(localStorage.getItem('persona'));
    gasto=0;
    gastoin=0;
    agregarsal=0;
    let divpadre= document.createElement('div');
    divpadre.classList.add('divpadre');
    let divdatos= document.createElement('div');
    divdatos.classList.add('divgastos');
    let divestadisticas= document.createElement('div');
    divestadisticas.classList.add('divestadisticas');
    divdatos.innerHTML=`<p class="titulo"> Agregar Gastos o Salario del DIA: ${valor2.dias}</p>
                        <form id="AgregarDatos">
                            <h3 class="tituloagregar">AGREGAR GASTO</h3>
                            <input id="inputgasto"class="input" type="text" placeholder="Agregar Gasto">
                            <h3 class="tituloagregar">AGREGAR GASTO INNECESARIO</h3>
                            <input id="inputgastoin" class="input" type="text" placeholder="Agregar Gasto Innecesario">
                            <h3 class="tituloagregar">AGREGAR SALARIO</h3>
                            <input id="inputagregarsal" class="input" type="text" placeholder="Agregar Salario">
                            <button id="agregar">
                                <span class="shadow"></span>
                                <span class="edge"></span>
                                <span class="front text"> Agregar
                                </span>
                            </button> 
                        </form>`;
    divestadisticas.innerHTML=`<div class="divbotonestadisticas"><button id="esa" class="botonestadiscticas">Ver estadísticas</button></div>
                            <p class="estadistica">Gastos Totales = $${valor2.gastostotales}</p>
                            <p class="estadistica">Gastos Totales Esenciales = $${valor2.gastostotalesE}</p>
                            <p class="estadistica">Gastos Totales Innecesarios = $${valor2.gastostotalesI}</p>
                            <p class="estadistica">Día con más Gastos Esenciales = DIA: ${valor2.diaE} $${valor2.m}</p>
                            <p class="estadistica" id="est1">Día con más Gastos Innecesarios = DIA: ${valor2.diaI} $${valor2.n} </p>
                            <div class="contenedorsalario">
                                <p class="estadistica">Salario Actual = $${valor.salario}</p>
                            </div>`;
    document.body.appendChild(divpadre);
    divpadre.appendChild(divdatos);
    divpadre.appendChild(divestadisticas);
    const inputgasto= document.querySelector('#inputgasto');
    inputgasto.onchange=()=>{
        gasto=Number(inputgasto.value); 
    };
    const inputgastoin= document.querySelector('#inputgastoin');
    inputgastoin.onchange=()=>{
        gastoin=Number(inputgastoin.value);
    }
    const inputagregarsal= document.querySelector('#inputagregarsal');
    inputagregarsal.onchange=()=>{
        agregarsal=Number(inputagregarsal.value);
    }
    const divv=document.querySelector('#esa');
    divv.addEventListener('click',VerEstadisticas);
    porcentaje=gastostotalesI;
    gastostotalesE=0;
    gastostotalesI=0;
    ComprobarSalario(valor);
    Agregar();
}

//Funcion de Ver Estadisticas
function VerEstadisticas(){
    let arraysalario=JSON.parse(localStorage.getItem('arraysalario'));
    let valor2=JSON.parse(localStorage.getItem('gastos'));
    let valor=JSON.parse(localStorage.getItem('persona'));
    const divdatos= document.querySelector('.divgastos');
    divdatos.innerHTML=`<img id="volver" src="/media/flecha.png" width="40px">
                        <p class="estadistica">Tu Nombre: <span class="dato">${valor.nombre}</span></p>
                        <p class="estadistica">Tu Apellido: <span class="dato">${valor.apellido}</span></p>
                        <p class="estadistica">Tu Edad: <span class="dato">${valor.edad}</span> Años</p>
                        <p class="estadistica">Tu Salario Inicial: <span class="dato">$${valor.salarioinicial}</span></p>
                        <p class="estadistica">Tus Salarios Agregados: <Veces class="dato">${arraysalario.length} Veces</p>`;
    const divestadisticas= document.querySelector('.divestadisticas');
    let total=0,mensaje;
    arraysalario.forEach(function(a){total += a;});
    let totalsalario=valor.salarioinicial+total;
    valor2.porcentaje=valor2.gastostotalesI/totalsalario*100;
    if(valor2.porcentaje>=30){
        mensaje="Por lo tanto te recomendamos no seguir Gastando Innecesariamente";
    }else{
        mensaje="Por lo tanto todavia puedes seguir realizando Gastos Innecesarios";
    }
    divestadisticas.innerHTML=`<p class="estadistica">Salario Total Agregado: <span class="dato">$${totalsalario}</span></p>
                        <p class="estadistica">Porcentaje de Gastos Innecesario en relacion a tu Total Agregado es de <span class="dato">${parseInt(valor2.porcentaje)}%</span>. ${mensaje}</p>`;
    const volver=document.querySelector('#volver');
    volver.addEventListener('click',Volver);
}

//Funcion Volver
function Volver(){
    const borrar= document.querySelector('.divpadre');
    borrar.remove();
    EmpezarApp();
}

//Comprobamos salario
function ComprobarSalario(valor){
    if(valor.salario<=0){
        inputgasto.disabled=true;
        inputgastoin.disabled=true;
        inputgasto.setAttribute('placeholder','Debes agregar salario');
        inputgastoin.setAttribute('placeholder','Debes agregar salario');
    }
}

//Funcion Boton Agregar
function Agregar(){
    const agregar= document.querySelector('#AgregarDatos');
    agregar.addEventListener('submit',AgregarGastos);
}

//Agregamos los gastos a los Arrays
function AgregarGastos(e){
    e.preventDefault();
    let valor=JSON.parse(localStorage.getItem('persona'));
    let valor2=JSON.parse(localStorage.getItem('gastos'));
    const arraygasto=JSON.parse(localStorage.getItem('arraygasto'));
    const arraygastoin=JSON.parse(localStorage.getItem('arraygastoin'));
    let arraysalario=JSON.parse(localStorage.getItem('arraysalario'));
    arraygasto.push(gasto);
    arraygastoin.push(gastoin);
    localStorage.setItem('arraygasto',arraygasto);
    localStorage.setItem('arraygastoin',arraygastoin);
    valor.salario=valor.salario-gasto-gastoin;
    valor.salario+=agregarsal;
    VerificarSaldoAgregado(arraysalario);
    SumarGastos(valor2,arraygasto,arraygastoin);
    MasGastos(valor2,arraygasto,arraygastoin);
    const cuadrado= document.createElement('div');
    cuadrado.classList.add('cuadrado');
    cuadrado.innerHTML=`<p class="textocuadrado">GASTO Y SALARIO AGREGADO!</p>`;
    const borrar= document.querySelector('.divpadre');
    document.body.appendChild(cuadrado);
    borrar.style.filter='blur(2px)';
    valor2.dias++;
    localStorage.setItem('persona',JSON.stringify(valor));
    localStorage.setItem('gastos',JSON.stringify(valor2));
    localStorage.setItem('arraygasto',JSON.stringify(arraygasto));
    localStorage.setItem('arraygastoin',JSON.stringify(arraygastoin));
    localStorage.setItem('arraysalario',JSON.stringify(arraysalario));
    setTimeout(() => {
        cuadrado.remove()
        borrar.remove();
        EmpezarApp();
    }, 2000);
}

//Sumamos los gastos
function SumarGastos(valor2,arraygasto,arraygastoin){
    let unirarray=arraygasto.concat(arraygastoin);
    for (let index = 0; index < unirarray.length; index++) {
        valor2.gastostotales+=unirarray[index];
    }
    for (let i = 0; i < arraygasto.length; i++) {
        valor2.gastostotalesE+=arraygasto[i];
    }
    for (let e = 0; e < arraygastoin.length; e++) {
        valor2.gastostotalesI+=arraygastoin[e];
    }
}

//Detectamos dias con mas gastos
function MasGastos(valor2,arraygasto,arraygastoin){
    valor2.m=Math.max(...arraygasto);
    valor2.n=Math.max(...arraygastoin);
    valor2.diaE= arraygasto.indexOf(valor2.m);
    valor2.diaI= arraygastoin.indexOf(valor2.n);
}

//Verficamos Saldo para agregarlo al Array de Saldos Agregados
function VerificarSaldoAgregado (arraysalario){
    if(agregarsal>=1){
        arraysalario.push(agregarsal);
    }
}

//Comenzamos la app
PedirDatos();
