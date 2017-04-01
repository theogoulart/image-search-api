var router  = require('express').Router()
var mongo   = require('mongodb').MongoClient
var request = require('request')
var url     = require('url')

var options = {
    headers: {
        'Ocp-Apim-Subscription-key': process.env.IMAGEAPI_KEY
    },
    json: true
}

router.get('/imagesearch/:query', function(req, res){
    
    options.url = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+
                    req.params.query+'&count=10&offset='+((req.query.offset)?req.query.offset:'0');
    
    request.get(options,function(err, response, body){
        if (err) throw err
        
        var result = []
        
        body.value.forEach(function(val){
            
            var element = {}
            
            element.url = url.parse(val.contentUrl, true).query.r
            element.snippet = val.name
            element.thumbnail = val.thumbnailUrl
            element.context = val.hostPageDisplayUrl
            
            result.push(element)
        })
        
        req.database.collection('queries').insert({
            term: req.params.query,
            when: new Date().toISOString()
        }, function(err, doc){
            if(err) throw err
            req.database.close()
        })
        
        res.status(200).send(result)
    })
})

router.get('/latest/', function(req, res){
    
    req.database.collection('queries').find({},{_id: 0}).sort({when: -1}).limit(10).toArray(function(err, result){
        if(err) throw err
        
        res.status(200).send(result)
    })
})

module.exports = router