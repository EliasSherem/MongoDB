var client = new Mongo()



//nos conectamos a la base de datos maori
var db = client.getDB("Maori")
var doc = {"a":null, "b":2};
var doc2 = {"b": 2};
var arr = [doc, doc2]



// creamos un objeto coleccion. el objeto AuthoritiesCollection
var colecciones = db.getCollectionNames();
var arrColecciones = new Array();



for(var key in colecciones){
arrColecciones.push(db.getCollection(colecciones[key]));
}
for(var i in arrColecciones){
arrColecciones[i].insertMany(arr)
}
const Authorities = db.getCollection("Business_demography_enterprises_Auhtorities");
Authorities.deleteMany({$and:[{"a":null}, {"a":{$exists:true}}]})
Authorities.find({"b":2}).count()