/****************************
Operador de comparación $eq
*****************************/

//Campos simples
db.movies.find({ year: { $eq: 1930 } }).count()
db.movies.find({ "year": 1930 }).count()

//Campo objeto
db.movieDetails.find({ "tomato.userMeter": { $eq: 95 } }).count()
db.movieDetails.find({ "tomato.userMeter": { $eq: 95 } }, {title:1, tomato:1})
db.movieDetails.find({ "tomato.userMeter": 95 }).count()

//Elemento de un arreglo igual a un valor

db.movieDetails.find({ "countries": { $eq: "Italy" } }).count()
db.movieDetails.find({ countries: "Italy" }).count()

//Un arreglo igual a la expresión de consulta
db.movieDetails.find({ "countries": { $eq: ["Italy", "USA"] } }).count()
db.movieDetails.find({ "countries": ["Italy", "USA"] }).count()

/**********************************************
Operadores >, <, >=, <= $gt, $lt, $gte, $lte
***********************************************/
//Campos simples
db.movies.find({ year: { $gt: 2017 } }).count() //year>2017
db.movies.find({ year: { $lt: 1897 } }).count()

//Campo Objeto
db.movieDetails.find({ "imdb.rating": { $gt: 9.5 } }).count()

//Elemento de un arreglo mayor un valor
db.movieDetails.find({ "countries": { $gt: "Wi" } },{_id:0,countries:1}).count()

/*******************************************************
Operador $in:
El operador $in selecciona los documentos donde
el valor de un campo es igual a cualquier valor
en el arreglo especificado
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
*********************************************************/
//Campo Objeto
db.movieDetails.find({ "director": { $in: ["Jerome Robbins, Robert Wise"] } }).count()
db.movieDetails.find({ "director": { $in: ["Jerome Robbins", "Robert Wise"] } }).count()
db.movieDetails.find({ "director": { $in: ["Jerome Robbins"] } }).count()
db.movieDetails.find({ "director": { $in: ["Robert Wise"] } }).count()

//Elementos en un arreglo
db.movieDetails.find({ "actors": { $in: ["Henry Fonda", "Natalie Wood"] } }).count()

db.movieDetails.find({ $or:[ {actors:"Henry Fonda"}, {actors:"Natalie Wood"}]} ).count()
/*******************************************************
Operador no igual a: $ne
*********************************************************/
//Comparar un arregl completo
db.movieDetails.find({ "genres": { $ne: ["Action", "Adventure"] } }).count()
db.movieDetails.find({ "genres": { $ne: ["Action", "Adventure"] } }, { _id: 0, genres: 1 }).pretty()

/*******************************************************
Operador $nin:
{ field: { $nin: [ <value1>, <value2> ... <valueN> ]} }
Selecciona los documentos donde el valor del campo no está
en el arreglo especificado o el campo no existe.
*********************************************************/
db.movieDetails.find({ "ferro": { $nin: [1, 2] } }).count()
db.movieDetails.find({ "genres": { $nin: ["Western", "Drama"] } }).count()
db.movieDetails.find({ "genres": { $nin: ["Western", "Drama"] } }, { _id: 0, genres: 1 }).count()

db.movieDetails.find({ $or: [{ "genres": "Western" }, { "genres": "Drama" }] }).count()

//XOR. Películas que son Action o Adventure pero no ambas AB' + A'B
q1 = { "genres": { $ne: "Action" } }
q2 = { "genres": "Action" }
q3 = { "genres": { $ne: "Adventure" } }
q4 = { "genres": "Adventure" }
q5 = { $and: [q1, q4] }
q6 = { $and: [q2, q3] }
db.movieDetails.find(q5).count()
db.movieDetails.find({ $or: [q5, q6] }).count()
db.movieDetails.find({ $or: [q5, q6] }, { _id: 0, genres: 1 }).pretty()
