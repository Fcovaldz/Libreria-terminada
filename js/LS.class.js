class LocalStorageOperation {
    //Propiedades
    //Metodos
    static almacenarLibro(infoLibro){
        let arrayLibros = this.obtenerLS();
        arrayLibros.push(infoLibro);
        // console.log(arrayLibros);
        localStorage.setItem("Libros",JSON.stringify(arrayLibros));
    }

    static obtenerLS(){
        if(localStorage.getItem('Libros') === null){
            // console.log("Vacío");
            return [];
        }else {
            // console.log("Si hay libros");
            return JSON.parse(localStorage.getItem('Libros'));
        }
    }
    static LimpiarStorage(){
        localStorage.clear();
        this.ultimoid();
    }
    static BorrarLibro(idLibro){
        let arrayLibros = this.obtenerLS();
        let arregloNuevo = [];
        console.log(arrayLibros);

        for(let i = 0; i<arrayLibros.length; i++){
            if(idLibro != arrayLibros[i].id){
                 arregloNuevo.push(arrayLibros[i]);
        }
    }
        console.log(arregloNuevo);
        localStorage.clear();
        if(arregloNuevo.length > 0){
        localStorage.setItem('Libros', JSON.stringify(arregloNuevo));
        }
    }

    static ultimoid(){
        let arrayLibros = this.obtenerLS()
        if(arrayLibros == 0){

         return 0;
        }else{
        return (arrayLibros[arrayLibros.length -1].id);
    }
}

    static BuscarTitulo(titulo){
        //titulo Viene de app.js y es el valor de un input
        // para nuestro método, titulo será nuestro párametro de Búsqueda
        //console.log('titulo')
        let arrayLibros = this.obtenerLS();
        let resultado = '';

        // Iteramos nuestro array de Libros mediante un ciclo 

        // Ponemos i < arrayLibros.length para evitar una vuelta mas en el ciclo

        for(let i = 0; i < arrayLibros.length; i++){
            if(arrayLibros[i].titulo.toLowerCase() == titulo){
                resultado = arrayLibros[i];
            }

        }
        return resultado;
    }

    static validaTitulo(titulo, autor) { 
        let arrayLibros = this.obtenerLS();
        let band = 0;

        for (let i = 0; i< arrayLibros.length; i++){
            if((titulo == arrayLibros[i].titulo.trim().toLowerCase()) && (autor == arrayLibros[i].autor.trim().toLowerCase())){
                band = 1;
            }
        }
        return band;
    }

    static modificarLibro(titulo, autor){
        
    }


}