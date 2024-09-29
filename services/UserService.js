
const User = require("../models/User.js");
const bcrypt = require("bcrypt")
const userValidations = require("../validation/UserValidation");
const ErrorHandler = require("../error/ErrorHandler.js")
const {generateToken} = require("../services/JwtToken.js") 
const queryBuilder = require("../util/QueryBuilder.js")

const createUser = async (req) => {
    try {
        let userData = req.body;
        let isValidPassword = userValidations.validatePassword(userData.password);
        if (isValidPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;
            const user = await User.create(userData);
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            return userWithoutPassword;
        } else {
            throw new ErrorHandler("Invalid password format", 400);
        }
    } catch (err) {
        throw new ErrorHandler(err.message, 500);
    }
};

const login = async (req) => {
    let data = req.body;
    try {
        let user = await User.findOne({ userName: data.userName })
        if (!user) {
            throw new ErrorHandler(`User ${data.userName} not found`, 404);
        }
        else {
            const isAuthorizedUser = await bcrypt.compare(data.password, user.password)
            if (!isAuthorizedUser) {
                throw new ErrorHandler("Invalid password", 400)
            }
            else {
                const tokenObj = {
                    //sub (subject of the JWT)– the user who requested the token which should be unique
                    sub: user.userName,
                    _id: user._id,
                    email: user.email,
                    role: user.role
                }
                const token = generateToken(tokenObj)
                const loginResponse = { token: token}
                return loginResponse;
            }
        }
    }
    catch (err) {
        throw new ErrorHandler(err.message, 500)
    }

}

const getAllUsers = async (req,res) =>{
    try{
        const {query,options} = queryBuilder(req)
        const users = User.find(query,null,options);
        if(!users){
            throw new ErrorHandler("User details not found", 404)
        }
        return users

    }
    catch(err){
        throw new ErrorHandler(err.message, 500)
    }
}

const getUserById = async(req) =>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user){
            throw new ErrorHandler("Requested User details not found", 404)
        }
        return user
    }
   catch(err){
    throw new ErrorHandler(err.message,500)
   }
}

const updateUserById = async(req) =>{
    try{
        const userDetails = req.body
        const updateUser = User.findByIdAndUpdate(req.params.id,{$set:userDetails},{new: true})
        if(!updateUser){
            throw new ErrorHandler("Requested User details not found", 404)
        }
        return updateUser
    }
   catch(err){
    throw new ErrorHandler(err.message, 500)
   }
}

const deleteUserById =async (req) =>{
    try{
        const userData = await User.findByIdAndDelete({_id: req.params})
        if(!userData){
            throw new ErrorHandler("Requested User details not found", 404);
        }
        return "User detail deleted successfully"
     }
    catch(err){
        throw new ErrorHandler(err.message, 500);
    }
   

}

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
};
