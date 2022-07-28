//Inicializamos Variables, Arrays ,Clases y Objetos
let nombre,apellido,edad,salario,salarioinicial,porcentaje=0;
const formulario= document.querySelector('#formulario');
let gastos=[0],gastosinnecesarios=[0],gastostotales=0,gastostotalesE=0,gastostotalesI=0,gasto=0,gastoin=0,agregarsal=0,salariosagregados=[],diaE=0,diaI=0,m=0,n=0;
const DateTime = luxon.DateTime;
const fecha= DateTime.now();
class Persona {
    constructor(nombre,apellido,edad,salario){this.nombre=nombre,this.apellido=apellido,this.edad=edad,this.salario=salario;}
}

const setLocal=(nombre,valor)=>{
    localStorage.setItem(nombre,JSON.stringify(valor));
}
let persona= new Persona(nombre,apellido);
let compinicio=localStorage.getItem('persona');
//Pedimos los Datos
function PedirDatos(){
    if(compinicio!=undefined){
        formulario.remove();
        EmpezarApp();
    }
    formulario.addEventListener('input',(e)=>{
        if(e.target.classList.contains('input')){
            const valor=e.target.value;
            comprobarValor(e.target,valor);
        }
    })
}
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(nombre===undefined||apellido===undefined||edad===undefined||salario===undefined){
        mostrarAlerta("Hay campos incompletos o erroneos","Tienes campos incompletos o erroneos,verificialos nuevamente y vuelve a comenzar","warning","Reintentar");
    }else{
        if(nombre.length>=2&&apellido.length>=2&&nombre!=Number&&apellido!=Number&&edad>0&&edad!=isNaN&&edad!=""&&salario>0&&salario!=isNaN&&salario!=""){
            fetch("/usuarios.json")
                .then((response)=>response.json())
                .then((data)=>{
                    let val=0;
                    for (const persona of data) {
                        if(nombre===persona.nombre && apellido===persona.apellido){
                            mostrarAlerta("El usuario ya esta creado.","El usuario ingresado ya esta creado, ingrese uno nuevamente.","warning","Reintentar");
                            val=1;
                        }
                    }
                    if(val!=1){
                        mostrarAlerta("Te has registrado exitosamente","Excelente,te has registado exitosamente. ¡Es hora de comenzar!","success","Comenzar");
                        const persona= {nombre,apellido,edad,salario,salarioinicial};
                        const gastoss={gastostotales:gastostotales,gastostotalesE:gastostotalesE,gastostotalesI:gastostotalesI,diaE:diaE,diaI:diaI,m:m,n:n,porcentaje:porcentaje};
                        setLocal('persona',persona);
                        setLocal('gastos',gastoss);
                        setLocal('arraygasto',gastos);
                        setLocal('arraygastoin',gastosinnecesarios);
                        setLocal('arraysalario',salariosagregados);
                        setTimeout(() => {
                            EmpezarApp();
                            formulario.remove();
                        }, 3000);
                    }
                })
        }
    }
})
const comprobarValor = (e,valor) =>{
    document.querySelector('#boton').disabled=false;
    const esa=e=>{document.querySelector('#boton').disabled=e};
    const background=b=>{e.style.background=b};
    switch(e.id){
        case "input1":
            if(valor.length<=2||Number(valor)){
                esa('true');
                background('red');
            }else{background('white');
                nombre=valor;}
            break;
        case "input2":
            if(valor.length<=2||Number(valor)){
                esa('true');
                background('red');
            }else{background('white');
                apellido=valor;}
            break;
        case "input3":
            if(valor.length===""||isNaN(valor)||valor<=0){
                esa('true');
                background('red');
            }else{background('white');
                edad=valor;}
            break;
        case "input4":
            if(valor.length==""||isNaN(valor)||valor<0){
                esa('true');
                background('red');
            }else{background('white');
                salario=valor;
                salarioinicial=Number(valor)}
            break;
    }
}
const mostrarAlerta=(title,text,icon,button)=>{
    swal({
        title:title,
        text:text,
        icon:icon,
        button:button,
        duration:3000
    })
}


//Empezamos aplicacion y creamos la estructura correspondiente
function EmpezarApp(){
    setTimeout(() => {
        document.body.removeAttribute("data-aos","flip-up") 
    }, 450);
    document.title="Calculadora de Gastos - Mis Gastos";
    let valor2=JSON.parse(localStorage.getItem('gastos')),valor=JSON.parse(localStorage.getItem('persona')),divpadre= document.createElement('div');
    gasto=0,gastoin=0,agregarsal=0;
    divpadre.classList.add('divpadre');
    let divdatos= document.createElement('div'),divestadisticas= document.createElement('div');
    divdatos.classList.add('divgastos'),divestadisticas.classList.add('divestadisticas');
    divdatos.innerHTML=`<p class="titulo"> Agregar Gastos o Salario del DIA: <span class="dato">${fecha.toLocaleString()}</span></p>
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
    divestadisticas.innerHTML=`<div class="divbotonestadisticas"><button id="btnestadisctica" class="botonestadiscticas">Ver estadísticas</button></div>
                            <p class="estadistica">Gastos Totales = $${valor2.gastostotales}</p>
                            <p class="estadistica">Gastos Totales Esenciales = $${valor2.gastostotalesE}</p>
                            <p class="estadistica">Gastos Totales Innecesarios = $${valor2.gastostotalesI}</p>
                            <p class="estadistica">Día con más Gastos Esenciales = DIA: <span class="dato">${valor2.diaE}</span> $${valor2.m}</p>
                            <p class="estadistica" id="est1">Día con más Gastos Innecesarios = DIA: <span class="dato">${valor2.diaI}</span> $${valor2.n} </p>
                            <div class="contenedorsalario">
                                <p class="estadistica">Salario Actual = $${valor.salario}</p>
                            </div>`;
    const cerrarsesion=document.createElement('div');
    cerrarsesion.classList.add('cerrarsesion');
    cerrarsesion.innerHTML=`<button id="cerrarsesion" class="botoncerrarsesion">Cerrar Sesión</button>`;
    document.body.appendChild(divpadre);
    divpadre.appendChild(divdatos);
    divpadre.appendChild(divestadisticas);
    document.body.appendChild(cerrarsesion);
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
    const divv=document.querySelector('#btnestadisctica');
    divv.addEventListener('click',VerEstadisticas)
    const finalizarsesion=document.querySelector('#cerrarsesion');
    finalizarsesion.addEventListener('click',CerrarSesion);
    porcentaje=gastostotalesI;
    gastostotalesE=0,gastostotalesI=0;
    ComprobarSalario(valor);
    Agregar();
}

//Funcion de Ver Estadisticas
function VerEstadisticas(){
    let arraysalario=JSON.parse(localStorage.getItem('arraysalario'));
    let valor2=JSON.parse(localStorage.getItem('gastos'));
    let valor=JSON.parse(localStorage.getItem('persona'));
    const divdatos= document.querySelector('.divgastos');
    divdatos.innerHTML=`<img id="volver" src="/media/flecha.svg" width="40px">
                        <p data-aos="flip-left" class="estadistica">Tu Nombre: <span class="dato">${valor.nombre}</span><img id="edit1" class="editar" src="/media/editar.svg" width="20px"</p>
                        <p data-aos="flip-left" class="estadistica">Tu Apellido: <span class="dato">${valor.apellido}</span><img id="edit2" class="editar" src="/media/editar.svg" width="20px"</p>
                        <p data-aos="flip-left" class="estadistica">Tu Edad: <span class="dato">${valor.edad}</span> Años<img id="edit3" class="editar" src="/media/editar.svg" width="20px"</p>
                        <p data-aos="flip-left" class="estadistica">Tu Salario Inicial: <span class="dato">$${valor.salarioinicial}</span></p>
                        <p data-aos="flip-left" class="estadistica">Tus Salarios Agregados: <Veces class="dato">${arraysalario.length}</p>`;
    const divestadisticas= document.querySelector('.divestadisticas');
    let total=0,mensaje;
    arraysalario.forEach(function(a){total += a;});
    let totalsalario=valor.salarioinicial+total;
    valor2.porcentaje=valor2.gastostotalesI/totalsalario*100;
    valor2.porcentaje>=30 ? mensaje="Por lo tanto, te recomendamos no seguir Gastando Innecesariamente." : mensaje="Por lo tanto, todavía puedes seguir realizando Gastos Innecesarios.";
    divestadisticas.innerHTML=`<p data-aos="flip-up" class="estadistica">Salario Total Agregado: <span class="dato">$${totalsalario}</span></p>
                        <p data-aos="flip-up" class="estadistica">Porcentaje de Gastos Innecesarios en relación a tu Total Agregado es de <span class="dato">${parseInt(valor2.porcentaje)}%</span>. ${mensaje}</p>`;
    const volver=document.querySelector('#volver');
    volver.addEventListener('click',Volver);
    divdatos.addEventListener('click',(e)=>{
        if(e.target.classList.contains('editar')){
            switch (e.target.id) {
                case "edit1":
                    swal("Ingresa tu nombre aquí:", {
                        content: "input",
                    })
                    .then((value) => {
                        if(value.length<=2||Number(value)){
                            swal('El nombre ingresado no es correcto, vuelve a intentarlo nuevamente.')
                        }else{
                            swal(`Perfecto, ahora tu Nombre es ${value}`);
                            valor.nombre=value;
                            localStorage.setItem('persona',JSON.stringify(valor));
                        } 
                    });
                    break;
                case "edit2":
                    swal("Ingresa tu apellido aquí:", {
                        content: "input",
                    })
                    .then((value) => {
                        value.length<3||Number(value) ? swal('El apellido ingresado no es correcto,vuelve a intentarlo nuevamente.') : swal(`Perfecto, ahora tu Apellido es ${value}`);
                        if(value.length<3||Number(value)){
                            swal('El apellido ingresado no es correcto,vuelve a intentarlo nuevamente.');
                        }else{
                            swal(`Perfecto, ahora tu Apellido es ${value}`);
                            valor.apellido=value;
                            localStorage.setItem('persona',JSON.stringify(valor))
                        } 
                    });
                    break;
                case "edit3":
                    swal("Ingresa tu edad aquí:", {
                        content: "input",
                    })
                    .then((value) => {
                        if(value<=0||isNaN(value)||value===""){
                            swal('La edad ingresada no es correcta,vuelve a intentarlo nuevamente.');
                        }else{
                            swal(`Perfecto, ahora tu Edad es ${value}`);
                            valor.edad=value;
                            localStorage.setItem('persona',JSON.stringify(valor));
                        }
                    });
                    break;
            }
        }
    })
}

//Funcion Volver
function Volver(){
    document.body.setAttribute("data-aos","flip-left")
    const borrar= document.querySelector('.divpadre');
    const borrar2= document.querySelector('.cerrarsesion');
    borrar.remove();
    borrar2.remove();
    EmpezarApp();
}

function CerrarSesion(){
    swal({
        title: "¿Estás seguro?",
        text: "Los datos ingresados no se guardaran si cierras sesión.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("¡Has cerrado sesión exitosamente!", {
            icon: "success",
        })
        setTimeout(() => {
            const borrar= document.querySelector('.divpadre');
            borrar.remove();
            const borrar2= document.querySelector('.cerrarsesion');
            borrar2.remove();
            localStorage.removeItem('persona');
            window.location.reload();
        }, 2500);
        }
    });
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
    let valor=JSON.parse(localStorage.getItem('persona')),valor2=JSON.parse(localStorage.getItem('gastos')),arraygasto=JSON.parse(localStorage.getItem('arraygasto')),arraygastoin=JSON.parse(localStorage.getItem('arraygastoin')),arraysalario=JSON.parse(localStorage.getItem('arraysalario'));
    arraygasto.push(gasto);
    arraygastoin.push(gastoin);
    localStorage.setItem('arraygasto',JSON.stringify(arraygasto));
    localStorage.setItem('arraygastoin',JSON.stringify(arraygastoin));
    valor.salario=valor.salario-gasto-gastoin;
    valor.salario+=agregarsal;
    VerificarSaldoAgregado(arraysalario);
    SumarGastos(valor2,arraygasto,arraygastoin);
    MasGastos(valor2,arraygasto,arraygastoin);
    const borrar= document.querySelector('.divpadre');
    const cerrarsesion= document.querySelector('.cerrarsesion');
    localStorage.setItem('persona',JSON.stringify(valor));
    localStorage.setItem('gastos',JSON.stringify(valor2));
    localStorage.setItem('arraysalario',JSON.stringify(arraysalario));
    localStorage.setItem('arraygasto',JSON.stringify(arraygasto));
    localStorage.setItem('arraygastoin',JSON.stringify(arraygastoin));
    Toastify({
        text: "¡Gasto y Salario agregado!",
        duration: 4000,
        position: 'left',
        gravity:'bottom',
        style: {
            background: '#B2EDEF',
            color:'black',
            border:'2px solid black'
        }
        
    }).showToast();
    setTimeout(() => {
        borrar.remove();
        cerrarsesion.remove();
        EmpezarApp();
    }, 300);
}

//Sumamos los gastos
function SumarGastos(valor2,arraygasto,arraygastoin){
    let unirarray=arraygasto.concat(arraygastoin);
    gastostotales=0,gastoin=0,gastostotalesE=0;
    for(let index in unirarray){
        gastostotales+=unirarray[index];
    }
    for (let i in arraygasto){
        gastostotalesE+=arraygasto[i];
    }
    for(let e in arraygastoin){
        gastostotalesI+=arraygastoin[e];
    }
    valor2.gastostotales=gastostotales,valor2.gastostotalesE=gastostotalesE,valor2.gastostotalesI=gastostotalesI;
}

//Detectamos dias con mas gastos
function MasGastos(valor2,arraygasto,arraygastoin){
    m=Math.max(...arraygasto);
    n=Math.max(...arraygastoin);
    valor2.diaE===fecha.toLocaleString() && (valor2.m+=gasto);
    valor2.diaI===fecha.toLocaleString() && (valor2.n+=gastoin);
    if(m>valor2.m){
        valor2.m=m;
        valor2.diaE= fecha.toLocaleString();
    }
    if(m>valor2.n){
        valor2.n=n;
        valor2.diaI= fecha.toLocaleString();
    }
}

//Verficamos Saldo para agregarlo al Array de Saldos Agregados
function VerificarSaldoAgregado (arraysalario){
    if(agregarsal>=1){
        arraysalario.push(agregarsal);
    }
}

//Comenzamos la app
PedirDatos();