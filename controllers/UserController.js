const userService = require('../services/UserService')

const registerUser = async (req, res) => {
    try {
        let user = await userService.createUser(req)
        console.log("user controller", user)
        return res.status(200).send(user)
    }
    catch (err) {
        console.log("register user", err)
        return res.status(err.statusCode).json(err)
    }
}

const login = async (req, res) => {
    try {
        const user = await userService.login(req)
        return res.status(200).send(user)
    }
    catch (err) {
        console.log("login user", err)
        return res.status(err.statusCode).json(err)
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserById(req)
        return res.status(200).send(updatedUser)
    }
    catch (err) {
        console.log("update user", err)
        return res.status(err.statusCode).json(err)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers(req)
        return res.status(200).send(users)
    }
    catch (err) {
        console.log("get all users", err)
        return res.status(err.statusCode).json(err)
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req)
        return res.status(200).send(user)
    }
    catch (err) {
        console.log("get user by Id", err)
        return res.status(err.statusCode).json(err)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const user = await userService.deleteUserById(req)
        return res.status(200).send(user)
    }
    catch (err) {
        console.log("create user", err)
        return res.status(err.statusCode).json(err)
    }
}

module.exports = {
    registerUser,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById
}