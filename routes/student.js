const express = require('express')
const router = express.Router()
const TokenVerify = require('../middlewares/TokenVerify')
const enrollMiddleware = require('../middlewares/EnrollMiddleware')
const StudentController = require('../controllers/StudentController')

router.post('/login', StudentController.login)

router.use(TokenVerify.tokenVerify)

router.post('/enroll', enrollMiddleware.checkAvailability, StudentController.enroll)

module.exports = router