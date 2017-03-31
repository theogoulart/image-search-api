var router  = require('express').Router()
var request = require('request')

var options = {
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=cats&count=10&offset=0',
    headers: {
        'Ocp-Apim-Subscription-key': process.env.IMAGEAPI_KEY
    },
    json: true
}

router.get('/', function(req, res){
    
    request.get(options,function(err, response, body){
        if (err) throw err
        
        var result = []
        
        body.value.forEach(function(val){
            
            var element = {}
            
            element.url = val.contentUrl
            element.snippet = val.name
            element.thumbnail = val.thumbnailUrl
            element.context = val.hostPageDisplayUrl
            
            result.push(element)
        })
        res.status(200).send(result)
        req.database.close()
    })
})

router.get('/latest/', function(req, res){
    
    var result = {}
    
    result.term = ""
    result.when = ""
    
    req.database.close()
    res.status(200).send(result)
})

module.exports = router