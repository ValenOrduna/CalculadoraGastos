//Inicializamos Variables, Arrays ,Clases y Objetos
let nombre;
let apellido;
let edad;
let salario;
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


//Pedimos los Datos
function PedirDatos(){
    document.addEventListener('DOMContentLoaded',IniciarApp)
    inputnom.onchange=()=>{
        nombre=inputnom.value;
        ValidarDatos(nombre);
    }
    inputap.onchange=()=>{
        apellido=inputap.value;
        ValidarDatos(apellido);
    }
    inputedad.onchange=()=>{
        edad=inputedad.value;
        ValidarDatos(edad);
    }
    inputsal.onchange=()=>{
        salario=inputsal.value;
        ValidarDatos(salario);
    }
    Boton();
}
//Deshablitiamos Boton Comenzar
function IniciarApp(){
    boton.classList.remove('desabilitar');
    boton.disabled=false;
}

//Validamos los Datos Enviados
function ValidarDatos(validar){
    
    switch(validar){
        case nombre:
            if(validar===""||validar===" "||Number(validar)){
                inputnom.style.background='red';
            }else {
                inputnom.style.background='white'; 
            }
            break;
        case apellido:
            if(validar===""||validar===" "||Number(validar)){
                inputap.style.background='red';

            }else{
                inputap.style.background='white';
            } 
            break;
        case edad:
            if(validar===""||validar===" "||isNaN(validar)||validar<=0){
                inputedad.style.background='red';
            }else{
                inputedad.style.background='white';
            } 
            break;
        case salario:
            if(validar===""||validar===" "||isNaN(validar)||validar<=0){
                inputsal.style.background='red';

            }else{
                inputsal.style.background='white';
            } 
            break;
    }
}

//Funcion de Enviar Boton
function Boton (){
    formulario.addEventListener('submit',Empezar);
}

//Empezamos la aplicacion
function Empezar(e){
    e.preventDefault();
    if(nombre!==''&&apellido!==''&&edad!==''&&salario!==''){
        let val;
        for (const persona of personas) {
            if(nombre===persona.nombre && apellido===persona.apellido){
                MostrarAlerta('El usuario ya esta registrado','error');
                val=1;
            }
        }
        if(val!=1){
            const persona={nombre:nombre,apellido:apellido};
            personas.push(persona);
            console.log(personas);
            MostrarAlerta('Te has registrado exitosamente!!')
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
    gasto=0;
    gastoin=0;
    agregarsal=0;
    let divpadre= document.createElement('div');
    divpadre.classList.add('divpadre');
    let divdatos= document.createElement('div');
    divdatos.classList.add('divgastos');
    let divestadisticas= document.createElement('div');
    divestadisticas.classList.add('divestadisticas');
    divdatos.innerHTML=`<p class="titulo"> Agregar Gastos o Salario del DIA: ${gastos.length}</p>
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
    divestadisticas.innerHTML=`<p class="estadistica">Gastos Totales = $${gastostotales}</p>
                            <p class="estadistica">Gastos Totales Esenciales = $${gastostotalesE}</p>
                            <p class="estadistica">Gastos Totales Innecesarios = $${gastostotalesI}</p>
                            <p class="estadistica">Dia con mas Gasto Ensencial = DIA: ${diaE} $${m}</p>
                            <p class="estadistica" id="est1">Dia con mas Gasto Innecesario = DIA: ${diaI} $${n} </p>
                            <div class="contenedorsalario">
                                <p class="estadistica">Salario Actual = $${salario}</p>
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
    gastostotalesE=0;
    gastostotalesI=0;
    ComprobarSalario();
    Agregar();
}

//Comprobamos salario
function ComprobarSalario(){
    if(salario<=0){
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
    gastos.push(gasto);
    gastosinnecesarios.push(gastoin);
    salario=salario-gasto-gastoin;
    salario+=agregarsal;
    SumarGastos();
    MasGastos();
    let borrar= document.querySelector('.divpadre');
    borrar.remove();
    EmpezarApp();
}

//Sumamos los gastos
function SumarGastos(){
    let unirarray=gastos.concat(gastosinnecesarios);
    gastostotales=0;
    for (let index = 0; index < unirarray.length; index++) {
        gastostotales+=unirarray[index];
    }
    for (let i = 0; i < gastos.length; i++) {
        gastostotalesE+=gastos[i];
    }
    for (let e = 0; e < gastos.length; e++) {
        gastostotalesI+=gastosinnecesarios[e];
    }
}

//Detectamos dias con mas gastos
function MasGastos(){
    m=Math.max(...gastos);
    n=Math.max(...gastosinnecesarios);
    diaE= gastos.indexOf(m);
    diaI= gastosinnecesarios.indexOf(n);
}

//Comenzamos la app
PedirDatos();
