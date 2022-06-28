var maori= new Mongo()
var video = new Mongo()

var dbmaori=maori.getDB("maori")
var dbvideo=video.getDB("video")



 /*   
    
    dbvideo.movieDetails.aggregate([
  {
    $match:{ year: {$gte: 1960 }}
  },
  {
    $group: {
      _id: null,
      year : {},
      count: {$sum: 1}
    }
  }
])

*/

dbvideo.movieDetails.aggregate([
  {
    "$bucket": {
      "groupBy": "$runtime",
      "boundaries": [45, 100, 150, 200, Infinity],
      default: "null",
      output: {
          "count": {$sum: 1}
      }
    }
  }
])


