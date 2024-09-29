const mongoose = require('mongoose')
const auditTrailPlugin = require("./AuditTrails.js")
const autoGenerateId = require('../util/AutoGenerateId.js')

const ChildSchema = new mongoose.Schema({
    // childId:{
    //     type: Number,
    //     unique: true,
    // },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    age:{
        type: Number,
        min: 5,
        max: 100
    }
})

ChildSchema.plugin(auditTrailPlugin, { userField: 'modifiedBy' })

module.exports = mongoose.model("Child", ChildSchema)