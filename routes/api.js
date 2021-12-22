'use strict'

const express = require('express')
const app = express()
const admin = require('./admin')
const student = require('./student')

app.use(express.json())

app.use('/admin', admin)
app.use('/student', student)

app.listen(8000, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("server started listening on 8000")
    }
})