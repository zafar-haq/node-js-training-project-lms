'use strict'

const express = require('express')
const app = express()
const admin = require('./admin')
const student = require('./student')
const instructor = require('./instructor')
const courseMaterial = require('./courseMaterial')
const cors = require('cors')
var CryptoJS = require("crypto-js");

app.use(express.json())


app.use('/admin', admin)
app.use('/student', student)
app.use('/instructor', instructor)
app.use('/CourseMaterialRoute', courseMaterial)

app.use('/CourseMaterial', express.static('./CourseMaterial'))

app.use(cors())
app.get('/getEncrypted', (req, res) => {
    res.status(200).send(CryptoJS.AES.decrypt(req.query.input, "secret_key").toString(CryptoJS.enc.Utf8))
})

app.listen(8000, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("server started listening on 8000")
    }
})