"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    is_admin: {
        type: Boolean,
        require: true,
        default: false
    },
}, {
    timestamps: true
});
exports.StudentsModel = mongoose_1.default.model('students', studentsSchema);
//# sourceMappingURL=studentsModel.js.map