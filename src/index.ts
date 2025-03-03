import express from "express";
import mongoose from "mongoose";
import student_Router from "./router/student";
import admin_Router from "./router/admin";
import morgan from "morgan";
import path from "path";
import sessionSecret from "./config/consfig";

import session from "express-session";

import nocache  from "nocache";

const app  = express();

app.use(nocache());

app.use(session({
    secret:sessionSecret,
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false},
}))


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(morgan("dev")); 

app.set('view engine','ejs');
app.set('views', [
    path.join(__dirname, 'views/student'),
    path.join(__dirname, 'views/admin')
]);


app.use(express.static(path.join(__dirname, "public")));


const MONGO_URL ="mongodb://127.0.0.1:27017";
mongoose.connect(MONGO_URL,{
    dbName:"node-typescript-app"
}).then(()=>{
    console.log("Database is connected");

}).catch((error)=>{
    console.log(error)
});

app.use('/admin',admin_Router);
app.use('/',student_Router);

app.listen(3000,()=>{
    console.log('http://localhost:3000');
});