var router = require('express').Router()

router.get('/', function(req, res){
    
    var result = {}
    
    result.url = ""
    result.snippet = ""
    result.thumbnail = ""
    result.context = ""
    
    req.database.close()
    res.status(200).send(result)
})

router.get('/latest/', function(req, res){
    
    var result = {}
    
    result.term = ""
    result.when = ""
    
    req.database.close()
    res.status(200).send(result)
})

module.exports = router