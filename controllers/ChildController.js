const childService = require("../services/ChildService")

const createChildren = async (req,res) =>{
    try {
        const children = await childService.createChildren(req)
        return res.status(200).send(children)
    }
    catch(err){
        console.log("create children",err)
        return res.status(err.statusCode).json(err)
    }
}

const updateChild = async (req,res) =>{
    try {
        const updatedChild = await childService.updateChildDetails(req)
        return res.status(200).send(updatedChild)
    }
    catch(err){
        console.log("update child",err)
        return res.status(err.statusCode).json(err)
    }
}

const getAllChildren = async (req,res) =>{
    try {
        const children = await childService.getAllChildrenDetails(req)
        return res.status(200).send(children)
    }
    catch(err){
        console.log("get all children",err)
        return res.status(err.statusCode).json(err)
    }
}

const getChildById= async (req,res) =>{
    try {
        const child = await childService.getChildDetailsById(req)
        return res.status(200).send(child)
    }
    catch(err){
        console.log("get child by Id",err)
        return res.status(err.statusCode).json(err)
    }
}

const deleteChildById = async (req,res) =>{
    try {
        const child = await childService.deleteChildDetailsById(req)
        return res.status(200).send(child)
    }
    catch(err){
        console.log("create children",err)
        return res.status(err.statusCode).json(err)
    }
}

module.exports ={
    createChildren,
    deleteChildById,
    getAllChildren,
    getChildById,
    updateChild
}