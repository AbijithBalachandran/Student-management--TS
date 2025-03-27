import express from 'express';

import studentController from "../controllers/studentController";
import { islogin,isLogout } from "../middleware/auth";

const router = express.Router();


router.get('/',isLogout,studentController.loadSingin);
router.post('/signin',studentController.SigninStudent);
router.post('/login',studentController.loginStudent);
router.get('/home',islogin,studentController.homepageload);
router.get('/logout',islogin,studentController.userLogOut);
router.get('/edit/:id',islogin,studentController.editpageload);
router.post('/edit/:id',studentController.editStudent);

export default router;