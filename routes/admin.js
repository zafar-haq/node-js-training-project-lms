const express = require('express')
const router = express.Router()
const TokenVerify = require('../middlewares/TokenVerify')
const AssignInstructorMiddleware = require('../middlewares/AssignInstructorMiddleware')
const AdminController = require('../controllers/AdminController')

router.post('/login', AdminController.login)

router.use(TokenVerify.tokenVerify) //middleware

router.post('/create/class', AdminController.createClass)
router.post('/create/:role', AdminController.createRole)
router.post('/assign/instructor',AssignInstructorMiddleware.verifyClassAndInstructor, AdminController.assignInstructor)


module.exports = router;