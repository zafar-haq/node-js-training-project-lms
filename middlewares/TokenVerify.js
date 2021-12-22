'use strict'
const jwt = require('jsonwebtoken')

module.exports.tokenVerify = function(req, res, next){
    jwt.verify(req.get('token'), 'sha256', function(err, decoded){
        if(err){
            res.status(400).json({error:'Please login first.'})
        }else{
            req.user = decoded.user
            next()
        }
    })
}