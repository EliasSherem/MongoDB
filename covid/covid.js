var cursor=db.countries.aggregate([
    {$match:{country:'MEX'}},
    {
        $project:{datos:'$DatosDiarios',_id:0}
    }
])
var x=cursor.next()

var arreglo_fechas=[]
var i=0
var deaths=0
for (var doc of x.datos){
    var objeto={fecha:doc.date, fallecimientos:doc.new_deaths}
    arreglo_fechas.push(objeto)
    i++;
    if(doc.new_deaths){
        deaths=deaths+doc.new_deaths
    }
}
var promedio=deaths/i
print('promedio= '+promedio)