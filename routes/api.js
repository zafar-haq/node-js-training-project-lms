'use strict'

const express = require('express')
const app = express()
const admin = require('./admin')
const student = require('./student')
const instructor = require('./instructor')
const courseMaterial = require('./courseMaterial')

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/admin', admin)
app.use('/student', student)
app.use('/instructor', instructor)
app.use('/CourseMaterialRoute', courseMaterial)

app.use('/CourseMaterial', express.static('./CourseMaterial'))

app.listen(8000, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("server started listening on 8000")
    }
})