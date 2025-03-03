import express, { Request , Response } from "express";
import { StudentsModel } from "../db/studentsModel";
import bcrypt from "bcryptjs";
import session from "express-session";
import { request } from "http";

declare module "express-session"{
interface SessionData{
        student?:{
            _id:string;
            
        }
    }
}


class StudentCondroller{
    
// ================================ Password hashing +========================================================================
  
  
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


// ==============================================Login and sign page for Students= ===================================================

loadSingin = async (request:express.Request,response:express.Response)=>{
    try {
        response.render('signin',{message:""});
        return;
    } catch (error) {
        console.error("Error Loading sign-in page:",error);
        response.sendStatus(5000).json({message:'server Error'});
        return;
    }
}




//============================================ Sign in Student ====================================================================

  SigninStudent = async (request:express.Request,response:express.Response):Promise<void>=>{
       try {
           const {name,email,mobile,password,doj} = request.body;

           console.log("Received request body:", request.body);
           console.log("Type of password:", typeof password);
             console.log('recieved password :',password)

           if (!password) {
            response.status(400).json({ message: "Password is required" });
            return;
        }
           const existingStudent = await StudentsModel.findOne({email});
           if (existingStudent) {
             response.render('signin',{message:"Email already registered ! please login"});
             return;
           }
           const hashedPassword = await this.securePassword(password)
           const student = new StudentsModel({
               name,
               email,
               mobile,
               password:hashedPassword,
               doj
        });
        await student.save();
        
        if(student){
            request.session.student = {_id:student.id.toString()};
            response.redirect('/home');
            return;
        }else{
            response.render('signin',{message:"Register Failed"});
            return;
        }

    } catch (error) {
         console.log("Error Signing In",error)
         response.sendStatus(400).json({message:"Bad Request"});   
         return;
    }
}


// ++====================================================login verification +++++++++++=====================================================================


loginStudent = async (request:express.Request , response:express.Response):Promise<void>=>{
    try {
        const {email ,password} = request.body;
          
    
        if(!email || !password){
            response.status(400).json({message:"Email and password requiered"});
            return;
        }

        const  student = await StudentsModel.findOne({email});

        if(!student){
            response.render('signin',{message:"Student not found"});
            return;
        }
     
        const passwordMatch = await bcrypt.compare(password ||"", student.password||"");

        if(!passwordMatch){
            response.status(401).json({message:"Invalid Credentials"});
            return;
        }

        request.session.student ={_id:student._id.toString()};

        response.redirect('/home');
        return;
    } catch (error) {
        console.error("Erro Login In :",error);
        response.status(500).json({message:"Internal server Error"});
        return;
    }
}


//==============================Render Home page =================================================================

 homepageload = async(request:express.Request,response:express.Response):Promise<void>=>{
    try {
         const id = request.session.student;
         const student = await StudentsModel.findOne({_id:id});
        if(!student){
            response.render('home',{message:'student not found'});
            return;
         }
         response.render('home',{student});
         return
    } catch (error) {
        console.error(error);
        response.status(500).json({message:"Internal Server Error"});
    }
 }

//==================================Load edit page =======================================================================

editpageload = async(request:express.Request,response:express.Response):Promise<void>=>{
    try {
        const id = request.params.id;
        const student = await StudentsModel.findById(id);
        if (!student) {
           return response.redirect('/home');
        }else{
            response.render('edit',{student});
            return;
        }
    } catch (error) {
        console.error('Error occured editpage load :',error);

    }
}

 //===================================Edit User ==========================================================================

 editStudent = async(request:express.Request,response:express.Response):Promise<void>=>{
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
             response.redirect('/home');
             return;
        }
        
    } catch (error) {
        console.error('Error occured in Edit :',error);
        response.status(500).json({message:'Internal Server Error'})
    }
 }



// ==================================== Student _ Logout ===================================================================


userLogOut = async(request:express.Request,response:express.Response):Promise<void>=>{
    try {
        request.session.destroy((err)=>{
            if(err){
                console.error("Error desdroying session:",session);
                return response.status(500).send("Logout failed");
            }
            response.render("signin",{logout:"Logout successfully ...!"});
        });
     
    } catch (error) {
        console.error("Unexpected Error:",error);
        response.status(500).send("An error occured");
    }
}


}

export default new StudentCondroller();