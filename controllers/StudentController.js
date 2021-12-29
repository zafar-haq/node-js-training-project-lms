'use strict'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ValidationError } = require('sequelize')

const StudentModel = require('../models').Student
const Instructor = require('../models').Instructor
const CourseMaterial = require('../models').CourseMaterial


module.exports = {
    login : async function (req, res) {
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

    },


    enroll : async function (req, res) {

        let response = { message: 'Student enrolled successfully' }
        let status_code = 200
        try {
            await req.classObj.addStudent(req.studentObj)
            await req.classObj.increment('enrolledStudents')

        } catch (e) {
            response = { error: e.message }
            status_code = 500
        }

        res.status(status_code).json(response) //
    },


    getClasses : async function (req, res) {

        let response = { data: {} }
        let status_code = 200
        try {
            const student = await StudentModel.findByPk(req.user.id)
            const classes = await student.getClasses({
                attributes: ['id', 'course_name', 'strength', 'enrolledStudents'], joinTableAttributes: [],
                include: [
                    {
                        model: Instructor,
                        attributes: ['name', 'email', 'name']
                    }
                ]
            });
            response = { data: classes }
        } catch (e) {
            response = { error: e.message }
            status_code = 500
        }
        res.status(status_code).json(response)

    },


    updateDetails : async function (req, res) {
        let response = { message: 'details updated successfully' }
        let status_code = 200
        try {
            let data_to_update = {}
            if (req.body.hasOwnProperty('name')) {
                data_to_update.name = req.body.name
            }
            if (req.body.hasOwnProperty('password')) {
                data_to_update.password = await bcrypt.hash(req.body.password, 10)
            }
            StudentModel.update(data_to_update, { where: { id: req.user.id } })
        } catch (e) {
            if (e instanceof ValidationError) {
                response = { error: e.errors[0].message }
                status_code = 400
            } else {
                response = { error: e.message }
                status_code = 500
            }
        }

        res.status(status_code).json(response)
    },


    getCourseMaterial : async function (req, res) {
        let response = { data: {} }
        let status_code = 200
        try {
            console.log(req.body.classId)
            let courseMaterial = await CourseMaterial.findAll({where:{classId:req.body.classId}})
            response.data = courseMaterial
        } catch (e) {
            response = { error: e.message }
            status_code = 500
        }
        res.status(status_code).json(response)
    }

}