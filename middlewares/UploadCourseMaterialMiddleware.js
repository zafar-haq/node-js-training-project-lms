'use strict'

const ClassModel = require('../models').Class

module.exports.checkClassExists = async function(req, res, next){
    const classObj = await ClassModel.findByPk(req.params.classId)
    if(classObj){
        req.classObj = classObj
        next()
    }else{
        res.status(400).json({error:'class not found'})
    }
}