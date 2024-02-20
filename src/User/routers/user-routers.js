import express from 'express';
import UserController from '../controllers/user-controllers.js';
import verifytoken from '../../middleware/authentication.js'
import profileController from '../controllers/profile-controllers.js';
import peopleController from '../controllers/people-controllers.js';
import multerController from '../../middleware/multer.js';

const router = new express.Router();

router.post('/register',multerController.upload,UserController.registerUser);
router.post('/login',UserController.loginUser)
router.post('/logout',verifytoken,UserController.logout)
router.post('/edit',profileController.upload.single('profilePic'),verifytoken,profileController.editeUser)
router.post('/profile',verifytoken,profileController.profile)
router.post('/search',peopleController.searchUser)
router.post('/info',peopleController.getuserinfo)
router.post('/remove',verifytoken,peopleController.deleteFriend)
router.post('/add',verifytoken,peopleController.addFriend)
router.post('/friends',verifytoken,profileController.getFriends)
export default router;