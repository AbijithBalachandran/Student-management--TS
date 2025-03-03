import express from "express";
import adminController from "../controllers/adminController";
import {is_adminlogin,is_adminlogout} from "../middleware/adminAuth"
const router = express.Router();


router.get('/',is_adminlogout,adminController.adminLogin);
router.post('/login',adminController.verifyAdmin);
router.get('/adHome',is_adminlogin,adminController.homepageload);
router.get('/logout',is_adminlogin,adminController.adminLogOut);
router.get('/dashbord',is_adminlogin,adminController.getAllStudents)
router.get('/newStudent',adminController.newstudent);
router.post('/newStudent',adminController.addnewStudent);
router.get('/delete-student/:id',adminController.deleteStudent);

router.get('/updateStudent/:id',is_adminlogin,adminController.editpageload);
router.post('/updateStudent/:id',adminController.updateStudent);


// router.get("*",(request:express.Request,response:express.Response)=>{  
//     response.redirect('/admin');
// });

export default router;