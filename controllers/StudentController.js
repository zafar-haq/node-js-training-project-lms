'use strict'

const StudentModel = require('../models').Student
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ValidationError } = require('sequelize')

module.exports.login = async function (req, res) {
    let response = { error: "user not found." }
    let status_code = 400

    const student = await StudentModel.findOne({
        where: { email: req.body.email }
    })

    if (student) {
        let result = await bcrypt.compare(req.body.password, student.password)
        if (result === true) {
            response = { success: "user logged in successfully.", token: jwt.sign({ user: { id: student.id, email: student.email } }, 'sha256', { expiresIn: '2h' }) }
            status_code = 200
        } else {
            response = { error: "wrong password." }
        }
    }

    res.status(status_code).json(response)

}



module.exports.enroll = async function (req, res) {

    let response = {message: 'Student enrolled successfully'}
    let status_code = 200
    try {
        const student = await StudentModel.findByPk(req.user.id)
        await req.classObj.addStudent(student)

    } catch (e) {
        response = { error: e.message }
        status_code = 500
    }

    res.status(status_code).json(response) //
}