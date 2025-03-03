import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
    name:{
        type:String,
        require : true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:String,
        require:true,
    },
    password:{
      type:String,
      require:true
    },
    is_admin:{
        type:Boolean,
        require:true,
        default:false
    },
},{
    timestamps:true
});

export const StudentsModel = mongoose.model('students',studentsSchema);