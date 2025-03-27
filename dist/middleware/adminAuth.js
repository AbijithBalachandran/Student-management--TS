"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_adminlogout = exports.is_adminlogin = void 0;
//   export const  isAdminlogin = async(request:express.Request,response:express.Response,next:NextFunction):Promise<void>=>{
//         try {
//             if(request.session.admin){
//                 const currentUser = await StudentsModel.findById({_id:request.session.admin});
//                 if (currentUser?.is_admin) {
//                     return response.redirect('/admin/adHome');
//                 }
//             }
//             if(!request.session.admin){
//                return response.redirect('/admin/login');
//             }
//                 next();
//         } catch (error) {
//            console.log("Error in isLogin middlewre :",error);
//            response.status(500).json()
//         }
//     }
const is_adminlogin = async (request, response, next) => {
    try {
        if (request.session.admin) {
            next();
        }
        else {
            response.redirect('/admin');
            return;
        }
    }
    catch (error) {
        throw new Error;
    }
};
exports.is_adminlogin = is_adminlogin;
const is_adminlogout = async (request, response, next) => {
    try {
        if (request.session.admin) {
            response.redirect('/admin/adHome');
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        throw new Error;
    }
};
exports.is_adminlogout = is_adminlogout;
//# sourceMappingURL=adminAuth.js.map