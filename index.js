var express = require('express')
var mongo = require('mongodb').MongoClient
var route = require('./routes/routes')

var dbURL = 'mongodb://localhost:27017/local'
var app = express()

app.use(function(req, res, next){
    mongo.connect(dbURL,function(err, db){
        if (err) throw err
        req.database = db
        next()
    })
})

app.use(route)

app.use(function(req, res){
    req.database.close()
    res.status(404).send("Cannot find path, use either '/' or '/latest/'")
})

.listen(process.env.PORT || 8080)