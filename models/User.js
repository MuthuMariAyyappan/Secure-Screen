
const mongoose = require("mongoose");
const auditTrailPlugin = require("./AuditTrails.js")
const userValidations = require("../validation/UserValidation");
const autoGenerateId = require("../util/AutoGenerateId.js"); 
let emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

const userRole = Object.freeze({
    PARENT: 'PARENT',
    CHILD: 'CHILD'
  });
  
  
const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: userValidations.validateUserName,
            message: (props) => `${props.value} is not a valid username: ${props.reason}`
        }
    },
    password: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => emailRegex.test(value),
            message: props => `${props.value} is not a valid email address`
        }

    },
    role:{
        type: String,
        enum: Object.values(userRole),
        required: true
    }
    
})

UserSchema.plugin(auditTrailPlugin,{ userField: 'userName' })


// UserSchema.pre('save', async function(next) {
//     try {
       
//         // Auto-generate userId
//         const UserModel = this.model("User");
//         const data = await autoGenerateId(UserModel, this, "userId");
//         console.log("Added user id : ", data);
//         this.userId = data.userId;

//         next();
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = mongoose.model("User", UserSchema)