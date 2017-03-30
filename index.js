var express = require('express')

var app = express()

app.get('/', function(req, res){
    
    var result = {}
    
    result.url = ""
    result.snippet = ""
    result.thumbnail = ""
    result.context = ""
    
    res.status(200).send(result)
})

app.get('/latest/', function(req, res){
    
    var result = {}
    
    result.term = ""
    result.when = ""
    
    res.status(200).send(result)
})

.listen(process.env.PORT || 8080)