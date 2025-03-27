"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_js_1 = __importDefault(require("../controllers/studentController.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = express_1.default.Router();
console.log("express :==", express_1.default);
router.get('/', auth_js_1.isLogout, studentController_js_1.default.loadSingin);
router.post('/signin', studentController_js_1.default.SigninStudent);
router.post('/login', studentController_js_1.default.loginStudent);
router.get('/home', auth_js_1.islogin, studentController_js_1.default.homepageload);
router.get('/logout', auth_js_1.islogin, studentController_js_1.default.userLogOut);
router.get('/edit/:id', auth_js_1.islogin, studentController_js_1.default.editpageload);
router.post('/edit/:id', studentController_js_1.default.editStudent);
exports.default = router;
//# sourceMappingURL=student.js.map