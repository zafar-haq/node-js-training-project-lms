'use strict'

const ClassModel = require('../models').Class
const StudentModel = require('../models').Student

module.exports.checkAvailability = async function (req, res, next) {
    let response = { error: 'class not found' }
    let status_code = 400
    try {
        const classObj = await ClassModel.findByPk(req.body.classId)
        if (classObj) {
            response = { error: 'you are already enrolled in this class.' }
            const student = await StudentModel.findByPk(req.user.id)
            const classExist = await student.getClasses({ where: { id: req.body.classId } })
            if (classExist.length === 0) {
                response = { error: 'class is full' }
                if (classObj.enrolledStudents < classObj.strength) {
                    req.classObj = classObj
                    req.studentObj = student
                    next()
                } else {
                    res.status(status_code).json(response)
                }
            }else{
                res.status(status_code).json(response)
            }
        } else {
            res.status(status_code).json(response)
        }
    }catch(e){
        response = {error: e.message}
        status_code = 500
        res.status(status_code).json(response)
    }

}