"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_js_1 = __importDefault(require("./router/student.js"));
const admin_js_1 = __importDefault(require("./router/admin.js"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const consfig_js_1 = __importDefault(require("./config/consfig.js"));
const express_session_1 = __importDefault(require("express-session"));
const nocache_1 = __importDefault(require("nocache"));
const app = (0, express_1.default)();
app.use((0, nocache_1.default)());
app.use((0, express_session_1.default)({
    secret: consfig_js_1.default,
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
const MONGO_URL = "mongodb://127.0.0.1:27017";
mongoose_1.default.connect(MONGO_URL, {
    dbName: "node-typescript-app"
}).then(() => {
    console.log("Database is connected");
}).catch((error) => {
    console.log(error);
});
app.use('/admin', admin_js_1.default);
app.use('/', student_js_1.default);
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
//# sourceMappingURL=index.js.map