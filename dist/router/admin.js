"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const adminAuth_1 = require("../middleware/adminAuth");
const router = express_1.default.Router();
router.get('/', adminAuth_1.is_adminlogout, adminController_1.default.adminLogin);
router.post('/login', adminController_1.default.verifyAdmin);
router.get('/adHome', adminAuth_1.is_adminlogin, adminController_1.default.homepageload);
router.get('/logout', adminAuth_1.is_adminlogin, adminController_1.default.adminLogOut);
router.get('/dashbord', adminAuth_1.is_adminlogin, adminController_1.default.getAllStudents);
router.get('/newStudent', adminController_1.default.newstudent);
router.post('/newStudent', adminController_1.default.addnewStudent);
router.get('/delete-student/:id', adminController_1.default.deleteStudent);
router.get('/updateStudent/:id', adminAuth_1.is_adminlogin, adminController_1.default.editpageload);
router.post('/updateStudent/:id', adminController_1.default.updateStudent);
// router.get("*",(request:express.Request,response:express.Response)=>{  
//     response.redirect('/admin');
// });
exports.default = router;
//# sourceMappingURL=admin.js.map