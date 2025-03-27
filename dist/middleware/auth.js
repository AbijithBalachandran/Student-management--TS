"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogout = exports.islogin = void 0;
const islogin = async (request, response, next) => {
    try {
        if (!request.session.student) {
            return response.redirect('/');
        }
        next();
    }
    catch (error) {
        console.log("Error in isLogin middlewre :", error);
        response.status(500).json();
    }
};
exports.islogin = islogin;
const isLogout = async (request, response, next) => {
    try {
        if (request.session.student) {
            return response.redirect('/home');
        }
        next();
    }
    catch (error) {
        console.error("Error occured in isLogout middlware :", error);
    }
};
exports.isLogout = isLogout;
//# sourceMappingURL=auth.js.map