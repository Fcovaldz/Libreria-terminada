const autor = document.getElementById("inputAutor");
const titulo = document.getElementById("inputTitulo");
const tabla = document.getElementById("tbody");
const inputBuscar = document.getElementById("inputBuscar");


const libro = new Libro();

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,100}$/;

function eventListener(){
    document.getElementById("btnAdd").addEventListener("click",prepararLibro);
    tabla.addEventListener("click",acciones);
    document.getElementById('btn-vaciar').addEventListener('click', vaciarLibreria)
    document.getElementById('btnBuscar').addEventListener('click', BuscarLibro)
}

EventListener();
prepararDom();

function prepararLibro(){
let id = Number(LocalStorageOperation.ultimoid());
 id++;


    //console.log(ultimoId)

    if((autor.value != "" && titulo.value != "") && (patern.test(autor.value) && patern.test(titulo.value))){

        //Arreglo tipo objeto
        
        const infoLibro = {
            id: id,
            titulo: titulo.value.trim(),
            autor: autor.value.trim(),

        }
        
        let validarExistencia = LocalStorageOperation.validaTitulo(infoLibro.titulo.trim().toLowerCase(), infoLibro.autor.trim().toLowerCase());
        if(validarExistencia == 0){

            let tr = libro.agregar(infoLibro);
            tabla.appendChild(tr);
            LocalStorageOperation.almacenarLibro(infoLibro)
        

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha agregado el libro',
            showConfirmButton: false,
            timer: 1000
          })
        autor.value = "";
        titulo.value = "";
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Libro no Existente',
            showConfirmButton: false,
            timer: 1000
          })
        }
    }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Datos no validos',
                    showConfirmButton: false,
                    timer: 1000
                  })

    }
    
    
}

function acciones(event){
    if(event.target.tagName === 'I' || event.target.tagName === 'BUTTON'){
        if(event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")){
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
              })
        }
        // libro.eliminar(event.target.tagName);
    }
}

function prepararDom(){
    const librosLS = LocalStorageOperation.obtenerLS();
    //console.log(librosLS);

    for(let i = 0; i < librosLS.length; i++){
        let tr = Libro.agregar(librosLS[i]);
        //console.log(librosLS[i]);
        //const instanciaLibro = new Libro();
        tabla.appendChild(tr);
    }
}
function vaciarLibreria(){
    console.log(tabla.firstChild)
    while(tabla.firstChild){
        tabla.firstChild.remove()

    }
    LocalStorageOperation.limpiarStorage();
}

function BuscarLibro(event){
    
    event.preventDefault()

    //Validar que el imput tenga texto

    if(inputBuscar.value != ''){

        let resultadoBusqueda = LocalStorageOperation.BuscarTitulo(inputBuscar.value.trim().toLowerCase());
        //console.log(resultado);
    
    
    
    if(resultadoBusqueda != ''){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Busqueda Exitosa',
            text: `El libro ${resultadoBusqueda.titulo} tiene el id ${resultadoBusqueda.id} y fue escrito por ${resultadoBusqueda.autor}`,
            showConfirmButton: false,
            timer:1500
        })
        // Cuando la busqueda no genera resultados regresa un '' y se imprime una alerta de error 
    }else{
                Swal.fire({
                    icon: 'error',
                    title: 'oh no...',
                   
                    text: `No existe un libro con titulo ${inputBuscar.value}`,
                    
                })

             }
        }
    inputBuscar.value = '';
}