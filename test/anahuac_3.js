/************************************************************
Operador posicional $
Limita el contenido de un arreglo a partir de los resultados
de una consulta para que se proyecte solamente el primer
elemento que hace match con el documento de consulta.
Puede ser usado para actualizar un elemento de un
arreglo en operaciones de update.
Utilice $ en el documento de proyección de los métodos
find o findOne, cuando solamente se necesita un
elemento particular del arreglo.
*************************************************************/

db = new Mongo().getDB("test"); // Una nueva conexión a test
//Crear la colección estudiante en la base de datos test
db.createCollection("estudiante")
db.getCollectionNames() // Mostrar las colecciones

var students = [
{
"name": "Mary", "year": NumberInt(2019), "major": "Math", "gpa": 1,
"summary": { "_id": 1, "semester": 1, "grades": [70, 87, 90] }
},

 {
"name": "Tom", "year": NumberInt(2019), "major": "English", "gpa": 2,
"summary": { "_id": 2, "semester": 1, "grades": [90, 88, 92] }
},
{
"name": "John", "year": NumberInt(2019), "major": "Computer Science", "gpa": 2,
"summary": { "_id": 3, "semester": 1, "grades": [85, 100, 90] }
},
{
"name": "Jack", "year": NumberInt(2019), "major": "History", "gpa": 2,
"summary": { "_id": 4, "semester": 2, "grades": [79, 85, 80] }
},
{
"name": "Donald", "year": NumberInt(2019), "major": "History", "gpa": 3,
"summary": { "_id": 5, "semester": 2, "grades": [88, 88, 92] }
},
{
"name": "Dylan", "year": NumberInt(2019), "major": "Math", "gpa": 1,
"summary": { "_id": 6, "semester": 2, "grades": [95, 90, 96] }
}
]
for (let doc of students) {
db.estudiante.insert(doc);
}

//Utilizar la proyección { "grades.$": 1 }
db.estudiante.find({
"summary.semester": 1,
"summary.grades": { $gte: 101 }
}, { _id: 0, name: 1, "summary.grades.$": 1 })

/************************************************************
Operador posicional $elemMatch
Limita el contenido de un campo arreglo a partir del resultado
de la consulta que contiene solamente el primer elemento que
hace match con la condición $elemMatch.
Diferencia con el operador $
El operador $ proyecta el primer elemento del arreglo
que hace match basado en alguna condición del query.
El operador $elemMatch tiene un argumento de condición
explícito. Esto permite proyectar basado en una condición
y no en la consulta,o también podemos proyectar basado
en múltiples campos en los documentos que están
embebidos en el arreglo.
Lo usamos para establecer asociaciones entre campos
múltiples con la misma estructura anidada.
*************************************************************/

//Nos conectamos a la base de datos test
db = new Mongo().getDB("test");

//Creamos una nueva colección schools
db.createCollection("schools")

//Creamos los documentos que vamos a insertar en la colección
zip = [
{
_id: 1,
zipcode: "63109",
students: [
{ name: "john", school: 102, age: 10 },
{ name: "jess", school: 102, age: 11 },
{ name: "jeff", school: 108, age: 15 }
]
},
{
_id: 2,
zipcode: "63110",
students: [
{ name: "ajax", school: 100, age: 7 },
{ name: "achilles", school: 100, age: 8 },
]
},
{
_id: 3,
zipcode: "63109",
students: [
{ name: "ajax", school: 100, age: 7 },
{ name: "achilles", school: 100, age: 8 },
]
},
{
_id: 4,
zipcode: "63109",
students: [
{ name: "barney", school: 102, age: 7 },
{ name: "ruth", school: 102, age: 16 },
]
}

]
//Insertamos los elementos en la colección

for (let doc of zip) {
db.schools.insert(doc)
}

//Búsqueda con elemMatch
/*******************************************************************
* The following find() operation queries for all documents where
* the value of the zipcode field is 63109. The projection includes
* the first matching element of the students array where the
* school field has a value of 102 and the age field is greater
* than 10:
********************************************************************/

db.schools.find({ zipcode: "63109" },
{students: { $elemMatch: { _id:0, school: 102, age: { $gt: 10 } } } })

/********************************************************************************
Resultado:
{ "_id" : 1, "students" : [ { "name" : "jess", "school" : 102, "age" : 11 } ] }
{ "_id" : 3 }
{ "_id" : 4, "students" : [ { "name" : "ruth", "school" : 102, "age" : 16 } ] }
*********************************************************************************/

/********************************************************************
Operador de proyección $slice
Controla el número de items del arreglo que retorna una
consulta.
No debe confundirse con el modificador $slice que se utiliza
para limitar el tamaño de un arreglo durante una actualizacion
con el operador $push.
db.collection.find( { field: value }, { array: {$slice: count } } );
La operación anterior selecciona los documentosque tienen el valor
value en el campo field y retorna el número de elementos especificado
por el valor de count del arreglo almacenado en el campo array.
Si count tiene un valor mayor que el número de elementos en el campo
array, la consulta retorna todos los elementos en el array
*********************************************************************/
db.schools.find({ zipcode: "63109" },{students:{$slice:1}})

//En la base de datos video.
db = new Mongo().getDB("video")

var schematodo = db.movieDetails.findOne()
//Ver el resultado de la siguiente consulta
db.getCollectionInfos({name:"movieDetails"})

for (var key in schematodo) { print (key, typeof key) ; }
db.movieDetails.find({writers:"Sergio Leone"})
db.movieDetails.find({writers:"Sergio Leone"}, {plot:0,actors:{$slice:1}})

//Usar ahora la base de datos test y la colección students
//use test
info=db.getCollectionInfos({name:"students"})
printjson(info)