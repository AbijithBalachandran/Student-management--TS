import express, { NextFunction, request, Request , Response } from "express";



  export const  islogin = async(request:express.Request,response:express.Response,next:NextFunction):Promise<void>=>{
        try {
            if(!request.session.student){
               return response.redirect('/');
            }
                next();
            
        } catch (error) {
           console.log("Error in isLogin middlewre :",error);
           response.status(500).json()
        }
    }


export const isLogout = async(request:express.Request,response:express.Response,next:NextFunction):Promise<void>=>{
    try {
        if (request.session.student) {
            return response.redirect('/home');
        }
        next();
    } catch (error) {
        console.error("Error occured in isLogout middlware :",error);
    }
}    


