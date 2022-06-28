var client = new Mongo()

//Nos conectamos a a base de datos Maori
var db = client.getDB("maori")


//Creamos un objeto colección. El objeto AuthoritiesCollection
const AuthoritiesCollection = db.getCollection("Business_demography_enterprises_Authorities");

// Documento para la proyección
var proyeccion = {_id:0, Year:1,Enterprises:1}

//Documento para la selección para el campo Industry != Total
var seleccion1 = {Industry:{$ne:"Total"}}

//Obtenemos todos los documentos para el campo Industry !=Total
var noTotales =AuthoritiesCollection.find(seleccion1, proyeccion)

////Documento para la selección para el campo Industry = Total
var seleccion2 = {Industry:{$eq:"Total"}}
var totales =AuthoritiesCollection.find(seleccion2, proyeccion)
print(totales.toArray())

/******************************************************************
 * Tenemos ahora que sumarizar los campos no totales por año
 * Para eso debemos hacer una agrupación por año, lo que podemos
 * realizar con la etapa $group del marco de trabajo de agregación
 * o escribir código para realizar la misma operación
 * Lo hacemos de las dos formas.
 * Si lo hacemos con javascript necesitamos un estructura cuyos valores
 * sean tuplas del tipo, (Year, Suma). Eso es un mapa.
 * Escribimos una función que vamos a aplicar a cada documento para
 * crear el mapa. La llave de cada tupla será el año y el valor la suma
 * de todos los enterprises que no son totales.
 *******************************************************************/
var mapaNoTotales = new Map()

var iterador = function(doc){
    var value =doc["Enterprises"]
    var key =doc["Year"]
    key =key.toString()
    if (mapaNoTotales.has(key)){
        var suma =parseInt((mapaNoTotales.get(key))) +parseInt(value)
        mapaNoTotales.set(key,suma )
    } else
        mapaNoTotales.set(key,value)
}

/*********************************************************************
 * Recorremos el cursor noTotales para llenar el mapa. Aplicamos a cada
 * documento la función iterador
 **********************************************************************/
noTotales.forEach(iterador)


/****************************************************************
 * Realizamos la comparación entre los objetos JSON creados para
 * los campos no totales con los de los campos totales.
 * Necesitamos iterar a totales. Lo podemos hacer de varias formas
 * Aquí lo hacemos convirtiendo a totales en uun arreglo con la
 * función toArray()
 ****************************************************************/

for(var doc of totales.toArray()){
    var year =doc["Year"].toString()
    var enterprises = doc["Enterprises"]
    var value = mapaNoTotales.get(year)
    if(value ==enterprises){
        print("Correcto para el year", year, value)
    }else{
        print("Incorrecto para el year", year, value, enterprises)
    }

}
