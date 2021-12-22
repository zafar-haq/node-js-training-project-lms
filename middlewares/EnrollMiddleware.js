'use strict'

const ClassModel = require('../models').Class

module.exports.checkAvailability = async function (req, res, next) {
    let response = { error: 'class not found' }
    let status_code = 400

    const classObj = await ClassModel.findByPk(req.body.classId)
    if (classObj) {
        response = { error: 'class is full' }
        status_code = 400
        if (classObj.enrolledStudents < classObj.strength) {
            req.classObj = classObj
            next()
        } else {
            res.status(status_code).json(response)
        }
    } else {
        res.status(status_code).json(response)
    }

}