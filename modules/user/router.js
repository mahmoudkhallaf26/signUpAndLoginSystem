const { auth } = require('../../common/auth')
const { endpoint } = require('../../common/endpoint')
const { upload } = require('../../common/image')
const handValp = require('../../common/valhandel')
const { getAllUser, addUser, ubdatename, deleteuser, confirmemail, profile, signin, editprofile } = require('./controller/controller')
const { signupval } = require('./user.val')

const router = require('express').Router()
router.get('/getalluser',auth(endpoint.getAllUser),getAllUser)
router.post('/adduser',handValp(signupval),addUser)
router.patch('/updatename/:id',ubdatename)
router.delete('/deleteUser/:id',deleteuser)
router.get('/user/confirm/:token',confirmemail)
router.get('/user/profile',auth(endpoint.profile),profile)
router.post('/login',signin)
router.patch('/user/profile/pic',upload.array('image',15),auth(endpoint.profile), editprofile)
module.exports = router

