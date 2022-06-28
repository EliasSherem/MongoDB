db = new Mongo().getDB("video"); 
//utilizar la base de datos movieDetails

// eliminar peliculas que no tienen el campo title en movieDetails
//inciso 2
db.movieDetails.remove({"title" : null});

//inciso 1
//crear coleccion llamada primer parcial con campos title y tomato
db.createCollection("primerparcial");
db.movieDetails.copyTo('primerparcial');

db.primerparcial.find().pretty();

//contar cantidad de peliculas de movieDetails
var contarmovies = db.movieDetails.find().count()
print(contarmovies)

//contar de primerparcial
var contarprimerparcial = db.primerparcial.find().count()
print(contarprimerparcial)

//ambas tienen 2296

// Mostrar las colecciones ya aparece primerparcial
db.getCollectionNames() 

//inciso 3
//ya que se copio todo ahora vamos a cambiar el campo tomato a no existe en primerparcial
db.primerparcial.update({tomato: {$eq: null}}, {$set: {tomato: 'No existe'}})

//inciso4
//obtener de primer parcial donde el campo tomato tenga el valor de no existe
db.primerparcial.find({tomato:"No existe"})
db.primerparcial.find({tomato:"No existe"}).count()

