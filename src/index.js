"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var student_1 = require("./router/student");
var admin_1 = require("./router/admin");
var morgan_1 = require("morgan");
var path_1 = require("path");
var consfig_1 = require("./config/consfig");
var express_session_1 = require("express-session");
var nocache_1 = require("nocache");
var app = (0, express_1.default)();
app.use((0, nocache_1.default)());
app.use((0, express_session_1.default)({
    secret: consfig_1.default,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.set('view engine', 'ejs');
app.set('views', [
    path_1.default.join(__dirname, 'views/student'),
    path_1.default.join(__dirname, 'views/admin')
]);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
var MONGO_URL = "mongodb://127.0.0.1:27017";
mongoose_1.default.connect(MONGO_URL, {
    dbName: "node-typescript-app"
}).then(function () {
    console.log("Database is connected");
}).catch(function (error) {
    console.log(error);
});
app.use('/admin', admin_1.default);
app.use('/', student_1.default);
app.listen(3000, function () {
    console.log('http://localhost:3000');
});
