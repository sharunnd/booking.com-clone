import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { UserType } from "../shared/types"


const UserSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String},

})

UserSchema.pre("save",async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next();
})

const User = mongoose.model<UserType>("User",UserSchema)

export default User