const jwt = require("jsonwebtoken")
const ErrorHandler = require("../error/ErrorHandler")

function generateToken(userData) {
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
}



const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization-token'];
    if (!authHeader) {
        return res.status(401).json(new ErrorHandler("Authorization Token is required", 401));
    } else {
        let token = authHeader.split(' ')[1];
        try {
            // Verify the token
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.decodedToken = decodedToken; // Store the decoded token in the request object
            console.log("decodedToken",decodedToken)
            next(); 
        } catch (err) {
            console.error("Token verification error:", err);
            return res.status(400).json(new ErrorHandler("Invalid token", 400));
        }
    }
};



module.exports = {
    generateToken,verifyToken
}
