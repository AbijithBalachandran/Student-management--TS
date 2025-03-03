
import express, { Request , Response } from "express";
import { StudentsModel } from "../db/studentsModel";
import bcrypt from "bcryptjs";
import session from "express-session";
import { request } from "http";


declare module "express-session"{
interface SessionData{
        admin?:{
            _id:string;
            
        }
    }
}


class adminController{
//====================================Secure paassword ==========================================================
     securePassword = async (password:string|undefined|null):Promise<string>=>{
            try {
                if (!password || typeof password !== "string") {
                    throw new Error('Password is required for hashing');
                    
                } 
                console.log("Type of password:", typeof password);
                const saltRouds = 10
                return await bcrypt.hash(password,saltRouds);
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

//==========================Get login page for admin ======================================================================

adminLogin = async(request:express.Request , response:express.Response):Promise<void>=>{

    try {
        response.render('login');
        return;
    } catch (error) {
        console.error('server side error:',error);
        response.sendStatus(500)
        return;
    }
}


//===============================Login Verification =======================================================================

verifyAdmin = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const { email, password } = request.body;

        const admin = await StudentsModel.findOne({ email: email });

        if (!admin) {
            return response.render('login', { message: "Email and Password are incorrect" });
        }

        const passwordMatch = await bcrypt.compare(password || "", admin.password || "");
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

    } catch (error) {
        console.error("Server Side Error:", error);
        response.status(500).send("Internal Server Error");
    }
};
 

//=============================================homepageload ================================================================

homepageload = async(request:express.Request , response:express.Response):Promise<void>=>{
    try {

        if (!request.session.admin) {
            console.log("No admin session found, redirecting to login");
            return response.redirect('/admin/login');  
        }

        const id = request.session.admin;

        const admin = await StudentsModel.findById(id);
        if (!admin) {
          response.redirect('/admin/login');  
        }
        response.render('adHome',{admin});
    } catch (error) {
        console.error('server side error:',error);
        response.sendStatus(500);
    }
}




// =========================geting the all students +++++++++++++++++++++++++++++++++++++++=================================

getAllStudents = async(request:express.Request , response : express.Response ):Promise<void>=>{

    try {
        const students = await StudentsModel.find();
         response.render('dashbord',{students});
         return;
    } catch (error) {
      response.sendStatus(400);
      return;
    }
}




//=============================================== Logout ===============================================================

adminLogOut = async(request:express.Request,response:express.Response):Promise<void>=>{

    try {
        request.session.destroy((error)=>{
            if (error) {
                response.status(500).send('logout failed');
            }
            response.render('login',{message:"logout succesfully..!"});
        });
          
    } catch (error) {
        console.error("Unexpected Error:",error);
        response.status(500).send("An error occured");
    }
}



// ==============================add new student page++++++==============================================

newstudent = async(request:express.Request,response:express.Response):Promise<void>=>{
    try {
        response.render('newStudent');
    } catch (error) {
        console.error(error);
    }
}

//=====================================add new Student details ======================================================

addnewStudent = async(request:express.Request , response:express.Response):Promise<void>=>{
    
    try {
        const {name,email,mobile,password} = request.body;
        
        const sPassword = await this.securePassword(password);

        const student = new StudentsModel({
            name:name,
            email:email,
            mobile:mobile,
            password:sPassword,
            is_admin:false
        });

        const studentData =await student.save();

        if(studentData){
            response.redirect('/admin/dashbord');
        }else{
            response.render('newStudent',{message:'something wrong'});
        }
        
    } catch (error) {
        console.error(error);
    }
}

//===================================================edit page load  =========================================================

editpageload = async(request:express.Request,response:express.Response):Promise<void>=>{
    try {
        const id = request.params.id;
        const student = await StudentsModel.findById(id);
        if (!student) {
           return response.redirect('/admin/dashbord');
        }else{
            response.render('updateStudent',{student});
            return;
        }
    } catch (error) {
        console.error('Error occured editpage load :',error);

    }
}

// =======================================================Update Students =========================================================

updateStudent = async (request:express.Request,response:express.Response):Promise<void>=>{
    try {
        const {id} = request.params;
        const {name,email, mobile,doj} =request.body;
        const student = await StudentsModel.findById(id);
        if(!student){
             response.status(400).json({message:"Student not found"});
             return;
        }
        if(student){
            student.name = name;
            student.email = email;
            student.mobile = mobile;

            await student.save();
             response.redirect('/admin/dashbord');
             return;
        }
    } catch (error) {
        
    }
}


//  +===============================================Delete Students +=======================================================================

deleteStudent = async (request:express.Request , response:express.Response):Promise<void>=>{
    try {
        const {id} = request.params;
        await StudentsModel.deleteOne({_id:id});

         response.redirect('/admin/dashbord');
         return;
    } catch (error) {
         response.status(400).json({message:"An error occured"});
         return;
    }
}

}


export default new adminController();