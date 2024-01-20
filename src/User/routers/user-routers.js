import express from 'express';
import UserController from '../controllers/user-controllers.js';
import verifytoken from '../../middleware/authentication.js'
import profileController from '../controllers/profile-controllers.js';
import peopleController from '../controllers/people-controllers.js';

const router = new express.Router();

router.get('/register',UserController.upload.single('profilePic'),UserController.registerUser);
router.get('/login',UserController.loginUser)
router.get('/edit',verifytoken,profileController.upload.single('profilePic'),verifytoken,profileController.editeUser)
router.get('/profile',verifytoken,profileController.profile)
router.get('/search',peopleController.searchUser)
router.get('/add',verifytoken,peopleController.addFriend)
router.get('/friends',verifytoken,profileController.getFriends)
export default router;