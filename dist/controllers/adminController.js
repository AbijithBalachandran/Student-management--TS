"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentsModel_1 = require("../db/studentsModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class adminController {
    constructor() {
        //====================================Secure paassword ==========================================================
        this.securePassword = async (password) => {
            try {
                if (!password || typeof password !== "string") {
                    throw new Error('Password is required for hashing');
                }
                console.log("Type of password:", typeof password);
                const saltRouds = 10;
                return await bcryptjs_1.default.hash(password, saltRouds);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        };
        //==========================Get login page for admin ======================================================================
        this.adminLogin = async (request, response) => {
            try {
                response.render('login');
                return;
            }
            catch (error) {
                console.error('server side error:', error);
                response.sendStatus(500);
                return;
            }
        };
        //===============================Login Verification =======================================================================
        this.verifyAdmin = async (request, response) => {
            try {
                const { email, password } = request.body;
                const admin = await studentsModel_1.StudentsModel.findOne({ email: email });
                if (!admin) {
                    return response.render('login', { message: "Email and Password are incorrect" });
                }
                const passwordMatch = await bcryptjs_1.default.compare(password || "", admin.password || "");
                if (!passwordMatch || !admin.is_admin) {
                    return response.render('login', { message: "Email and Password are incorrect" });
                }
                request.session.admin = { _id: admin.id.toString() };
                console.log("Session Before Redirect:", request.session);
                //          request.session.save(() => {
                //         console.log("Redirecting to /home");
                //         response.render('adHome',{admin});
                // })
                request.session.save((err) => {
                    if (err) {
                        console.error("Session save error:", err);
                        return response.status(500).send("Internal Server Error");
                    }
                    console.log("Session saved, redirecting to /admin/home");
                    response.redirect('/admin/adhome');
                });
            }
            catch (error) {
                console.error("Server Side Error:", error);
                response.status(500).send("Internal Server Error");
            }
        };
        //=============================================homepageload ================================================================
        this.homepageload = async (request, response) => {
            try {
                if (!request.session.admin) {
                    console.log("No admin session found, redirecting to login");
                    return response.redirect('/admin/login');
                }
                const id = request.session.admin;
                const admin = await studentsModel_1.StudentsModel.findById(id);
                if (!admin) {
                    response.redirect('/admin/login');
                }
                response.render('adHome', { admin });
            }
            catch (error) {
                console.error('server side error:', error);
                response.sendStatus(500);
            }
        };
        // =========================geting the all students +++++++++++++++++++++++++++++++++++++++=================================
        this.getAllStudents = async (request, response) => {
            try {
                const students = await studentsModel_1.StudentsModel.find();
                response.render('dashbord', { students });
                return;
            }
            catch (error) {
                response.sendStatus(400);
                return;
            }
        };
        //=============================================== Logout ===============================================================
        this.adminLogOut = async (request, response) => {
            try {
                request.session.destroy((error) => {
                    if (error) {
                        response.status(500).send('logout failed');
                    }
                    response.render('login', { message: "logout succesfully..!" });
                });
            }
            catch (error) {
                console.error("Unexpected Error:", error);
                response.status(500).send("An error occured");
            }
        };
        // ==============================add new student page++++++==============================================
        this.newstudent = async (request, response) => {
            try {
                response.render('newStudent');
            }
            catch (error) {
                console.error(error);
            }
        };
        //=====================================add new Student details ======================================================
        this.addnewStudent = async (request, response) => {
            try {
                const { name, email, mobile, password } = request.body;
                const sPassword = await this.securePassword(password);
                const student = new studentsModel_1.StudentsModel({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: sPassword,
                    is_admin: false
                });
                const studentData = await student.save();
                if (studentData) {
                    response.redirect('/admin/dashbord');
                }
                else {
                    response.render('newStudent', { message: 'something wrong' });
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        //===================================================edit page load  =========================================================
        this.editpageload = async (request, response) => {
            try {
                const id = request.params.id;
                const student = await studentsModel_1.StudentsModel.findById(id);
                if (!student) {
                    return response.redirect('/admin/dashbord');
                }
                else {
                    response.render('updateStudent', { student });
                    return;
                }
            }
            catch (error) {
                console.error('Error occured editpage load :', error);
            }
        };
        // =======================================================Update Students =========================================================
        this.updateStudent = async (request, response) => {
            try {
                const { id } = request.params;
                const { name, email, mobile, doj } = request.body;
                const student = await studentsModel_1.StudentsModel.findById(id);
                if (!student) {
                    response.status(400).json({ message: "Student not found" });
                    return;
                }
                if (student) {
                    student.name = name;
                    student.email = email;
                    student.mobile = mobile;
                    await student.save();
                    response.redirect('/admin/dashbord');
                    return;
                }
            }
            catch (error) {
            }
        };
        //  +===============================================Delete Students +=======================================================================
        this.deleteStudent = async (request, response) => {
            try {
                const { id } = request.params;
                await studentsModel_1.StudentsModel.deleteOne({ _id: id });
                response.redirect('/admin/dashbord');
                return;
            }
            catch (error) {
                response.status(400).json({ message: "An error occured" });
                return;
            }
        };
    }
}
exports.default = new adminController();
//# sourceMappingURL=adminController.js.map