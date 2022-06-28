//Usar la base de datos movieDetails
db = new Mongo().getDB("video");

//Eliminar las que no tienen titulo
db.movieDetails.remove({"title" : null});

//crear primerparcial y copiar movieDetails a la nueva coleccion
db.createCollection("primerparcial");
db.movieDetails.find().forEach( function(doc) { db.primerparcial.insert(doc); } );

//Cambiar todas las que dicen tomato null a tomato No existe
db.primerparcial.update({tomato: {$eq: null}}, {set: {tomato: 'No existe'}});

//Buscar todas las que tienen tomato No existe
db.primerparcial.find({tomato: 'No existe'});