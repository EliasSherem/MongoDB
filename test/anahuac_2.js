/*********************************************************
Operador $all
El operador $all selecciona los documentos donde el valor
de un campo está en un arreglo que contiene todos los
elementos especificados.
{ tags: { $all: [ "ssl" , "security" ] } }
**********************************************************/
db.movieDetails.find({writers:{$all:["Sergio Leone", "Sergio Donati"]}}).count()
db.movieDetails.find({$and: [ { writers: "Sergio Leone" }, { writers: "Sergio Donati" } ]}).count()
db.movieDetails.find({writers:["Sergio Leone", "Sergio Donati"]}).count()


//Arreglos anidados. Un nuevo documento
db.movieDetails.insert({borrame: [[1,2], 3]})
db.movieDetails.find({borrame:[[1,2], 3]}).pretty()
db.movieDetails.find({borrame:{$all:[[1,2]]}}).count()
db.movieDetails.deleteMany({borrame:[[1,2], 3]})

//Insertar el campo borrame en los documentos existentes
db.movieDetails.update({},
{$set : {borrame:[[1,2], 3]}},
{upsert:false, multi:true})

//Eliminar el campo borrame de todos los documentos
db.movieDetails.update({},{$unset: {borrame:1}}, {multi: true})

/*********************************************************
Operador $elemMatch
El operador $elemMatch hace match con los documentos que
contienen un campo arreglo con al menos un elemento que
matchea todos los criterios de consulta especificado.
{ <field>: { $elemMatch: { <query1>, <query2>, ... } } }
**********************************************************/
db.movieDetails.find({countries:"Italy"}).count()
db.movieDetails.find( { "countries": { $elemMatch: { $eq:["Italy" ,"USA"]} } }).count()
db.movieDetails.find({$and: [{countries:"Italy"},{countries:"USA"}]}).count()
db.movieDetails.find( { "countries": { $elemMatch: { $eq:"Italy"} } }).count()
db.movieDetails.find( { "countries": { $elemMatch: { $eq:"USA"} } }).count()

//Insertar dos documentos en una colección prueba y borrarlos después
db.prueba.insert({ _id: 1, results: [ 82, 85, 88 ] })
db.prueba.insert({ _id: 2, results: [ 75, 88, 89 ] });

db.prueba.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } }).pretty()
db.prueba.drop()

/*********************************************************
Operador $size
El operador $size matchea cualquier arreglo con el número de
elementos especificado por el argumento
{ field: { $size: n } }
**********************************************************/
db.movieDetails.find({actors:{$size:4}}).count()