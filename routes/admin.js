const express = require('express')
const router = express.Router()
const TokenVerify = require('../middlewares/TokenVerify')
const AssignInstructorMiddleware = require('../middlewares/AssignInstructorMiddleware')
const AdminController = require('../controllers/AdminController')
const { body } = require('express-validator')

/**
 * @api {post} /admin/login session login
 * @apiName adminLogin
 * @apiGroup Admin
 *
 * @apiBody {String} Email admin's unique email.
 *
 * @apiSuccess {String} success Success message.
 * @apiSuccess {String} token  Token for the Admin.
 */
router.post('/login', AdminController.login)

router.use(TokenVerify.tokenVerify) //middleware

/**
 * @api {post} /admin/create/class create a class
 * @apiName createClass
 * @apiGroup Admin
 *
 * @apiBody {String} course_name name of the course
 * @apiBody {Integer} strength strength of the class
 *
 * @apiSuccess {String} success Success message.
 */
router.post('/create/class', body('course_name', 'course name is required').exists(), body('strength').exists().isInt() , AdminController.createClass)

/**
 * @api {post} /admin/create/:role create a role i.e. student, instructor
 * @apiName createRole
 * @apiGroup Admin
 *
 * @apiParam {String} role role to be created
 *
 * @apiBody {String} name name of the role
 * @apiBody {String} email unique email of the role
 * @apiBody {String} password password of the role
 *
 * @apiSuccess {String} success Success message.
 */
router.post('/create/:role', body('email', 'email must be valid').exists().isEmail(), body('password', 'password must be greater than 5 characters').isLength({min:5}), AdminController.createRole)

/**
 * @api {post} /admin/assign/instructor assign intructor to a class
 * @apiName assignInstructor
 * @apiGroup Admin
 *
 * @apiBody {Integer} classId id of the class to which an instructor is to be assigned
 * @apiBody {Integer} instructorId id of the instructor who is being assigned to the class
 *
 * @apiSuccess {String} success Success message.
 * @apiError (400 ClassNotFound) error Class not found.
 * @apiError (400 InstructorNotFound)error Instructor not found.
 */
router.post('/assign/instructor',AssignInstructorMiddleware.verifyClassAndInstructor, AdminController.assignInstructor)


module.exports = router;