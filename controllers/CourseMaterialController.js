'use strict'
const path = require('path')
const multer = require('multer')

const CourseMaterialModel = require('../models').CourseMaterial

const create = async function (req, res) {
    let response = {message:'course material added.'}
    let status_code = 200
    try {
        await CourseMaterialModel.create({
            name: req.name,
            file: req.file.path,
            classId: req.classObj.id
        })
    }catch(e){
        response = {error: e.message}
        status_code = 500
    }

    res.status(status_code).json(response)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'CourseMaterial')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '50000000' }
}).single('file')


module.exports = {
    create, upload
}