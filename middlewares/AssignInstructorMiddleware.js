
const InstructorModel = require('../models').Instructor
const ClassModel = require('../models').Class

module.exports.verifyClassAndInstructor = async function(req, res, next){

    response = {error: 'class not found.'}
    status_code = 400
    const classObj = await ClassModel.findByPk(req.body.classId)
    if(classObj){
        response = {error: 'instructor not found.'}
        const instructorObj = await InstructorModel.findByPk(req.body.instructorId)
        if(instructorObj){
            req.instructorObj = instructorObj
            req.classObj = classObj
            next()
        }
    }
    res.status(status_code).json(response)
}