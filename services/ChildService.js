const Child = require('../models/Child')
const ErrorHandler = require("../error/ErrorHandler")
const { Types: { ObjectId } } = require('mongoose');


const createChildren = async (req) => {
    try {
        const childrenData = req.body;
        //while verifying the token itself the token is decoded and added as one of the request param 
        const userData = req.decodedToken
        // Get the current date once to use for all calculations
        const now = new Date();

        // Add parentId, createdBy, modifiedBy, modifiedDate and createdDate to each child object because mongoose 
        //does not support insertMany directly for pre or post hooks
        const childrenWithMetadata = childrenData.map(child => {
            // Calculate age
            let ageDiffMs = now - new Date(child.dateOfBirth).getTime();
            let ageDate = new Date(ageDiffMs);
            let age = Math.abs(ageDate.getUTCFullYear() - 1970);
            //sub: is te key field for who you create token, here user name
            return {
                ...child,
                parentId: new ObjectId(userData._id),
                createdBy: userData.sub,
                createdDate: now,
                modifiedBy: userData.sub,
                modifiedDate: now,
                age: age
            };
        });

        // Insert children data with metadata
        const createdChildren = await Child.insertMany(childrenWithMetadata);

        // Fetch the inserted children and populate the parentId field
        const populatedChildren = await Child.find({ _id: { $in: createdChildren.map(child => child._id) } })
                                             .populate('parentId',["_id","userName","role","email"]);

        return populatedChildren;
    }
    catch (err) {
        throw new ErrorHandler(err.message, 500);
    }
}


const updateChildDetails = async (req) =>{
    try {
        const childrenData = req.body;
        const userData = req.decodedToken
        const now = new Date();
        let ageDiffMs = now - new Date(childrenData.dateOfBirth).getTime();
        let ageDate = new Date(ageDiffMs);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);
        
        const childDetailsWithMetaData  = { ...childrenData, parentId: new ObjectId(userData._id),
            modifiedBy: userData.sub,
            modifiedDate: now,
            age: age
        }
        
        const updatedChild = await Child.findOneAndUpdate(req.params.id,{$set:childDetailsWithMetaData},{new: true})
                                        .populate('parentId',["_id","userName","role","email"]);
        return updatedChild;
    }
    catch (err) {
        throw new ErrorHandler(err.message, 500);
    }
}

const getAllChildrenDetails =async (req) =>{
    try{
        const userData = req.decodedToken
        const childrenData = await Child.find({parentId: userData._id})
        if(!childrenData){
            throw new ErrorHandler("Children details not found", 404);
        }
        return childrenData
     }
    catch(err){
        throw new ErrorHandler(err.message, 500);
    }
   

}

const getChildDetailsById =async (req) =>{
    try{
        const {id} = req.params
        const childData = await Child.findById(id)
        if(!childData){
            throw new ErrorHandler("Requested Child details not found", 404);
        }
        return childData
     }
    catch(err){
        throw new ErrorHandler(err.message, 500);
    }
   

}

const deleteChildDetailsById =async (req) =>{
    try{
        const childData = await Child.findByIdAndDelete({_id: req.params})
        if(!childData){
            throw new ErrorHandler("Requested Child details not found", 404);
        }
        return "Child detail deleted successfully"
     }
    catch(err){
        throw new ErrorHandler(err.message, 500);
    }
   

}

module.exports = {
    createChildren,
    updateChildDetails,
    getAllChildrenDetails,
    getChildDetailsById,
    deleteChildDetailsById
}